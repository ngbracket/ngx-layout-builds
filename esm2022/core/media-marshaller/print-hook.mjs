/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
import { mergeAlias } from '../add-alias';
import { MediaChange } from '../media-change';
import { LAYOUT_CONFIG } from '../tokens/library-config';
import { sortDescendingPriority } from '../utils/sort';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../breakpoints/break-point-registry";
const PRINT = 'print';
export const BREAKPOINT_PRINT = {
    alias: PRINT,
    mediaQuery: PRINT,
    priority: 1000
};
/**
 * PrintHook - Use to intercept print MediaQuery activations and force
 *             layouts to render with the specified print alias/breakpoint
 *
 * Used in MediaMarshaller and MediaObserver
 */
class PrintHook {
    constructor(breakpoints, layoutConfig, _document) {
        this.breakpoints = breakpoints;
        this.layoutConfig = layoutConfig;
        this._document = _document;
        // registeredBeforeAfterPrintHooks tracks if we registered the `beforeprint`
        //  and `afterprint` event listeners.
        this.registeredBeforeAfterPrintHooks = false;
        // isPrintingBeforeAfterEvent is used to track if we are printing from within
        // a `beforeprint` event handler. This prevents the typical `stopPrinting`
        // form `interceptEvents` so that printing is not stopped while the dialog
        // is still open. This is an extension of the `isPrinting` property on
        // browsers which support `beforeprint` and `afterprint` events.
        this.isPrintingBeforeAfterEvent = false;
        this.beforePrintEventListeners = [];
        this.afterPrintEventListeners = [];
        this.formerActivations = null;
        // Is this service currently in print mode
        this.isPrinting = false;
        this.queue = new PrintQueue();
        this.deactivations = [];
    }
    /** Add 'print' mediaQuery: to listen for matchMedia activations */
    withPrintQuery(queries) {
        return [...queries, PRINT];
    }
    /** Is the MediaChange event for any 'print' @media */
    isPrintEvent(e) {
        return e.mediaQuery.startsWith(PRINT);
    }
    /** What is the desired mqAlias to use while printing? */
    get printAlias() {
        return [...(this.layoutConfig.printWithBreakpoints ?? [])];
    }
    /** Lookup breakpoints associated with print aliases. */
    get printBreakPoints() {
        return this.printAlias
            .map(alias => this.breakpoints.findByAlias(alias))
            .filter(bp => bp !== null);
    }
    /** Lookup breakpoint associated with mediaQuery */
    getEventBreakpoints({ mediaQuery }) {
        const bp = this.breakpoints.findByQuery(mediaQuery);
        const list = bp ? [...this.printBreakPoints, bp] : this.printBreakPoints;
        return list.sort(sortDescendingPriority);
    }
    /** Update event with printAlias mediaQuery information */
    updateEvent(event) {
        let bp = this.breakpoints.findByQuery(event.mediaQuery);
        if (this.isPrintEvent(event)) {
            // Reset from 'print' to first (highest priority) print breakpoint
            bp = this.getEventBreakpoints(event)[0];
            event.mediaQuery = bp?.mediaQuery ?? '';
        }
        return mergeAlias(event, bp);
    }
    // registerBeforeAfterPrintHooks registers a `beforeprint` event hook so we can
    // trigger print styles synchronously and apply proper layout styles.
    // It is a noop if the hooks have already been registered or if the document's
    // `defaultView` is not available.
    registerBeforeAfterPrintHooks(target) {
        // `defaultView` may be null when rendering on the server or in other contexts.
        if (!this._document.defaultView || this.registeredBeforeAfterPrintHooks) {
            return;
        }
        this.registeredBeforeAfterPrintHooks = true;
        const beforePrintListener = () => {
            // If we aren't already printing, start printing and update the styles as
            // if there was a regular print `MediaChange`(from matchMedia).
            if (!this.isPrinting) {
                this.isPrintingBeforeAfterEvent = true;
                this.startPrinting(target, this.getEventBreakpoints(new MediaChange(true, PRINT)));
                target.updateStyles();
            }
        };
        const afterPrintListener = () => {
            // If we aren't already printing, start printing and update the styles as
            // if there was a regular print `MediaChange`(from matchMedia).
            this.isPrintingBeforeAfterEvent = false;
            if (this.isPrinting) {
                this.stopPrinting(target);
                target.updateStyles();
            }
        };
        // Could we have teardown logic to remove if there are no print listeners being used?
        this._document.defaultView.addEventListener('beforeprint', beforePrintListener);
        this._document.defaultView.addEventListener('afterprint', afterPrintListener);
        this.beforePrintEventListeners.push(beforePrintListener);
        this.afterPrintEventListeners.push(afterPrintListener);
    }
    /**
     * Prepare RxJS tap operator with partial application
     * @return pipeable tap predicate
     */
    interceptEvents(target) {
        return (event) => {
            if (this.isPrintEvent(event)) {
                if (event.matches && !this.isPrinting) {
                    this.startPrinting(target, this.getEventBreakpoints(event));
                    target.updateStyles();
                }
                else if (!event.matches && this.isPrinting && !this.isPrintingBeforeAfterEvent) {
                    this.stopPrinting(target);
                    target.updateStyles();
                }
                return;
            }
            this.collectActivations(target, event);
        };
    }
    /** Stop mediaChange event propagation in event streams */
    blockPropagation() {
        return (event) => {
            return !(this.isPrinting || this.isPrintEvent(event));
        };
    }
    /**
     * Save current activateBreakpoints (for later restore)
     * and substitute only the printAlias breakpoint
     */
    startPrinting(target, bpList) {
        this.isPrinting = true;
        this.formerActivations = target.activatedBreakpoints;
        target.activatedBreakpoints = this.queue.addPrintBreakpoints(bpList);
    }
    /** For any print de-activations, reset the entire print queue */
    stopPrinting(target) {
        target.activatedBreakpoints = this.deactivations;
        this.deactivations = [];
        this.formerActivations = null;
        this.queue.clear();
        this.isPrinting = false;
    }
    /**
     * To restore pre-Print Activations, we must capture the proper
     * list of breakpoint activations BEFORE print starts. OnBeforePrint()
     * is supported; so 'print' mediaQuery activations are used as a fallback
     * in browsers without `beforeprint` support.
     *
     * >  But activated breakpoints are deactivated BEFORE 'print' activation.
     *
     * Let's capture all de-activations using the following logic:
     *
     *  When not printing:
     *    - clear cache when activating non-print breakpoint
     *    - update cache (and sort) when deactivating
     *
     *  When printing:
     *    - sort and save when starting print
     *    - restore as activatedTargets and clear when stop printing
     */
    collectActivations(target, event) {
        if (!this.isPrinting || this.isPrintingBeforeAfterEvent) {
            if (!this.isPrintingBeforeAfterEvent) {
                // Only clear deactivations if we aren't printing from a `beforeprint` event.
                // Otherwise, this will clear before `stopPrinting()` is called to restore
                // the pre-Print Activations.
                this.deactivations = [];
                return;
            }
            if (!event.matches) {
                const bp = this.breakpoints.findByQuery(event.mediaQuery);
                // Deactivating a breakpoint
                if (bp) {
                    const hasFormerBp = this.formerActivations && this.formerActivations.includes(bp);
                    const wasActivated = !this.formerActivations && target.activatedBreakpoints.includes(bp);
                    const shouldDeactivate = hasFormerBp || wasActivated;
                    if (shouldDeactivate) {
                        this.deactivations.push(bp);
                        this.deactivations.sort(sortDescendingPriority);
                    }
                }
            }
        }
    }
    /** Teardown logic for the service. */
    ngOnDestroy() {
        if (this._document.defaultView) {
            this.beforePrintEventListeners.forEach(l => this._document.defaultView.removeEventListener('beforeprint', l));
            this.afterPrintEventListeners.forEach(l => this._document.defaultView.removeEventListener('afterprint', l));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: PrintHook, deps: [{ token: i1.BreakPointRegistry }, { token: LAYOUT_CONFIG }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: PrintHook, providedIn: 'root' }); }
}
export { PrintHook };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: PrintHook, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BreakPointRegistry }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
// ************************************************************************
// Internal Utility class 'PrintQueue'
// ************************************************************************
/**
 * Utility class to manage print breakpoints + activatedBreakpoints
 * with correct sorting WHILE printing
 */
class PrintQueue {
    constructor() {
        /** Sorted queue with prioritized print breakpoints */
        this.printBreakpoints = [];
    }
    addPrintBreakpoints(bpList) {
        bpList.push(BREAKPOINT_PRINT);
        bpList.sort(sortDescendingPriority);
        bpList.forEach(bp => this.addBreakpoint(bp));
        return this.printBreakpoints;
    }
    /** Add Print breakpoint to queue */
    addBreakpoint(bp) {
        if (!!bp) {
            const bpInList = this.printBreakpoints.find(it => it.mediaQuery === bp.mediaQuery);
            if (bpInList === undefined) {
                // If this is a `printAlias` breakpoint, then append. If a true 'print' breakpoint,
                // register as highest priority in the queue
                this.printBreakpoints = isPrintBreakPoint(bp) ? [bp, ...this.printBreakpoints]
                    : [...this.printBreakpoints, bp];
            }
        }
    }
    /** Restore original activated breakpoints and clear internal caches */
    clear() {
        this.printBreakpoints = [];
    }
}
// ************************************************************************
// Internal Utility methods
// ************************************************************************
/** Only support intercept queueing if the Breakpoint is a print @media query */
function isPrintBreakPoint(bp) {
    return bp?.mediaQuery.startsWith(PRINT) ?? false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQtaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvY29yZS9tZWRpYS1tYXJzaGFsbGVyL3ByaW50LWhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFNUMsT0FBTyxFQUFDLGFBQWEsRUFBc0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFVekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLEtBQUssRUFBRSxLQUFLO0lBQ1osVUFBVSxFQUFFLEtBQUs7SUFDakIsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUNhLFNBQVM7SUFDcEIsWUFDYyxXQUErQixFQUNSLFlBQWlDLEVBQ3RDLFNBQWM7UUFGaEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQ1IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ3RDLGNBQVMsR0FBVCxTQUFTLENBQUs7UUErQzlDLDRFQUE0RTtRQUM1RSxxQ0FBcUM7UUFDN0Isb0NBQStCLEdBQUcsS0FBSyxDQUFDO1FBRWhELDZFQUE2RTtRQUM3RSwwRUFBMEU7UUFDMUUsMEVBQTBFO1FBQzFFLHNFQUFzRTtRQUN0RSxnRUFBZ0U7UUFDeEQsK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBRW5DLDhCQUF5QixHQUFlLEVBQUUsQ0FBQztRQUMzQyw2QkFBd0IsR0FBZSxFQUFFLENBQUM7UUFFMUMsc0JBQWlCLEdBQTZCLElBQUksQ0FBQztRQStJM0QsMENBQTBDO1FBQ2xDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsVUFBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDekIsa0JBQWEsR0FBaUIsRUFBRSxDQUFDO0lBOU16QyxDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLGNBQWMsQ0FBQyxPQUFpQjtRQUM5QixPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHNEQUFzRDtJQUN0RCxZQUFZLENBQUMsQ0FBYztRQUN6QixPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5REFBeUQ7SUFDekQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHdEQUF3RDtJQUN4RCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVO2FBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pELE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQWlCLENBQUM7SUFDakQsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxtQkFBbUIsQ0FBQyxFQUFDLFVBQVUsRUFBYztRQUMzQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUV6RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMERBQTBEO0lBQzFELFdBQVcsQ0FBQyxLQUFrQjtRQUM1QixJQUFJLEVBQUUsR0FBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTVFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixrRUFBa0U7WUFDbEUsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFtQkQsK0VBQStFO0lBQy9FLHFFQUFxRTtJQUNyRSw4RUFBOEU7SUFDOUUsa0NBQWtDO0lBQ2xDLDZCQUE2QixDQUFDLE1BQWtCO1FBQzlDLCtFQUErRTtRQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLCtCQUErQixFQUFFO1lBQ3ZFLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUM7UUFFNUMsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IseUVBQXlFO1lBQ3pFLCtEQUErRDtZQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO1lBQzlCLHlFQUF5RTtZQUN6RSwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQztRQUVGLHFGQUFxRjtRQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsTUFBa0I7UUFDaEMsT0FBTyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3ZCO3FCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7b0JBQ2hGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7Z0JBRUQsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMERBQTBEO0lBQzFELGdCQUFnQjtRQUNkLE9BQU8sQ0FBQyxLQUFrQixFQUFXLEVBQUU7WUFDckMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLGFBQWEsQ0FBQyxNQUFrQixFQUFFLE1BQTRCO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDckQsTUFBTSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELGlFQUFpRTtJQUN2RCxZQUFZLENBQUMsTUFBa0I7UUFDdkMsTUFBTSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxrQkFBa0IsQ0FBQyxNQUFrQixFQUFFLEtBQWtCO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFO2dCQUNwQyw2RUFBNkU7Z0JBQzdFLDBFQUEwRTtnQkFDMUUsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFFeEIsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUQsNEJBQTRCO2dCQUM1QixJQUFJLEVBQUUsRUFBRTtvQkFDTixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekYsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLElBQUksWUFBWSxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixFQUFFO3dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDakQ7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELHNDQUFzQztJQUN0QyxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUM5QixJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdHO0lBQ0gsQ0FBQztxSEE5TVUsU0FBUyxvREFHUixhQUFhLGFBQ2IsUUFBUTt5SEFKVCxTQUFTLGNBREcsTUFBTTs7U0FDbEIsU0FBUztrR0FBVCxTQUFTO2tCQURyQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBSXpCLE1BQU07MkJBQUMsYUFBYTs7MEJBQ3BCLE1BQU07MkJBQUMsUUFBUTs7QUFrTnRCLDJFQUEyRTtBQUMzRSxzQ0FBc0M7QUFDdEMsMkVBQTJFO0FBRTNFOzs7R0FHRztBQUNILE1BQU0sVUFBVTtJQUFoQjtRQUNFLHNEQUFzRDtRQUN0RCxxQkFBZ0IsR0FBaUIsRUFBRSxDQUFDO0lBNEJ0QyxDQUFDO0lBMUJDLG1CQUFtQixDQUFDLE1BQTRCO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLGFBQWEsQ0FBQyxFQUFzQjtRQUNsQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbkYsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUMxQixtRkFBbUY7Z0JBQ25GLDRDQUE0QztnQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDMUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdEM7U0FDRjtJQUNILENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsS0FBSztRQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBRUQsMkVBQTJFO0FBQzNFLDJCQUEyQjtBQUMzQiwyRUFBMkU7QUFFM0UsZ0ZBQWdGO0FBQ2hGLFNBQVMsaUJBQWlCLENBQUMsRUFBc0I7SUFDL0MsT0FBTyxFQUFFLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUM7QUFDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7bWVyZ2VBbGlhc30gZnJvbSAnLi4vYWRkLWFsaWFzJztcbmltcG9ydCB7TWVkaWFDaGFuZ2V9IGZyb20gJy4uL21lZGlhLWNoYW5nZSc7XG5pbXBvcnQge0JyZWFrUG9pbnR9IGZyb20gJy4uL2JyZWFrcG9pbnRzL2JyZWFrLXBvaW50JztcbmltcG9ydCB7TEFZT1VUX0NPTkZJRywgTGF5b3V0Q29uZmlnT3B0aW9uc30gZnJvbSAnLi4vdG9rZW5zL2xpYnJhcnktY29uZmlnJztcbmltcG9ydCB7QnJlYWtQb2ludFJlZ2lzdHJ5LCBPcHRpb25hbEJyZWFrUG9pbnR9IGZyb20gJy4uL2JyZWFrcG9pbnRzL2JyZWFrLXBvaW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7c29ydERlc2NlbmRpbmdQcmlvcml0eX0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEludGVyZmFjZSB0byBhcHBseSBQcmludEhvb2sgdG8gY2FsbCBhbm9ueW1vdXMgYHRhcmdldC51cGRhdGVTdHlsZXMoKWBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb29rVGFyZ2V0IHtcbiAgYWN0aXZhdGVkQnJlYWtwb2ludHM6IEJyZWFrUG9pbnRbXTtcbiAgdXBkYXRlU3R5bGVzKCk6IHZvaWQ7XG59XG5cbmNvbnN0IFBSSU5UID0gJ3ByaW50JztcbmV4cG9ydCBjb25zdCBCUkVBS1BPSU5UX1BSSU5UID0ge1xuICBhbGlhczogUFJJTlQsXG4gIG1lZGlhUXVlcnk6IFBSSU5ULFxuICBwcmlvcml0eTogMTAwMFxufTtcblxuLyoqXG4gKiBQcmludEhvb2sgLSBVc2UgdG8gaW50ZXJjZXB0IHByaW50IE1lZGlhUXVlcnkgYWN0aXZhdGlvbnMgYW5kIGZvcmNlXG4gKiAgICAgICAgICAgICBsYXlvdXRzIHRvIHJlbmRlciB3aXRoIHRoZSBzcGVjaWZpZWQgcHJpbnQgYWxpYXMvYnJlYWtwb2ludFxuICpcbiAqIFVzZWQgaW4gTWVkaWFNYXJzaGFsbGVyIGFuZCBNZWRpYU9ic2VydmVyXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFByaW50SG9vayBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIGJyZWFrcG9pbnRzOiBCcmVha1BvaW50UmVnaXN0cnksXG4gICAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZ09wdGlvbnMsXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgX2RvY3VtZW50OiBhbnkpIHtcbiAgfVxuXG4gIC8qKiBBZGQgJ3ByaW50JyBtZWRpYVF1ZXJ5OiB0byBsaXN0ZW4gZm9yIG1hdGNoTWVkaWEgYWN0aXZhdGlvbnMgKi9cbiAgd2l0aFByaW50UXVlcnkocXVlcmllczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFsuLi5xdWVyaWVzLCBQUklOVF07XG4gIH1cblxuICAvKiogSXMgdGhlIE1lZGlhQ2hhbmdlIGV2ZW50IGZvciBhbnkgJ3ByaW50JyBAbWVkaWEgKi9cbiAgaXNQcmludEV2ZW50KGU6IE1lZGlhQ2hhbmdlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGUubWVkaWFRdWVyeS5zdGFydHNXaXRoKFBSSU5UKTtcbiAgfVxuXG4gIC8qKiBXaGF0IGlzIHRoZSBkZXNpcmVkIG1xQWxpYXMgdG8gdXNlIHdoaWxlIHByaW50aW5nPyAqL1xuICBnZXQgcHJpbnRBbGlhcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFsuLi4odGhpcy5sYXlvdXRDb25maWcucHJpbnRXaXRoQnJlYWtwb2ludHMgPz8gW10pXTtcbiAgfVxuXG4gIC8qKiBMb29rdXAgYnJlYWtwb2ludHMgYXNzb2NpYXRlZCB3aXRoIHByaW50IGFsaWFzZXMuICovXG4gIGdldCBwcmludEJyZWFrUG9pbnRzKCk6IEJyZWFrUG9pbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMucHJpbnRBbGlhc1xuICAgICAgICAubWFwKGFsaWFzID0+IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5QWxpYXMoYWxpYXMpKVxuICAgICAgICAuZmlsdGVyKGJwID0+IGJwICE9PSBudWxsKSBhcyBCcmVha1BvaW50W107XG4gIH1cblxuICAvKiogTG9va3VwIGJyZWFrcG9pbnQgYXNzb2NpYXRlZCB3aXRoIG1lZGlhUXVlcnkgKi9cbiAgZ2V0RXZlbnRCcmVha3BvaW50cyh7bWVkaWFRdWVyeX06IE1lZGlhQ2hhbmdlKTogQnJlYWtQb2ludFtdIHtcbiAgICBjb25zdCBicCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5UXVlcnkobWVkaWFRdWVyeSk7XG4gICAgY29uc3QgbGlzdCA9IGJwID8gWy4uLnRoaXMucHJpbnRCcmVha1BvaW50cywgYnBdIDogdGhpcy5wcmludEJyZWFrUG9pbnRzO1xuXG4gICAgcmV0dXJuIGxpc3Quc29ydChzb3J0RGVzY2VuZGluZ1ByaW9yaXR5KTtcbiAgfVxuXG4gIC8qKiBVcGRhdGUgZXZlbnQgd2l0aCBwcmludEFsaWFzIG1lZGlhUXVlcnkgaW5mb3JtYXRpb24gKi9cbiAgdXBkYXRlRXZlbnQoZXZlbnQ6IE1lZGlhQ2hhbmdlKTogTWVkaWFDaGFuZ2Uge1xuICAgIGxldCBicDogT3B0aW9uYWxCcmVha1BvaW50ID0gdGhpcy5icmVha3BvaW50cy5maW5kQnlRdWVyeShldmVudC5tZWRpYVF1ZXJ5KTtcblxuICAgIGlmICh0aGlzLmlzUHJpbnRFdmVudChldmVudCkpIHtcbiAgICAgIC8vIFJlc2V0IGZyb20gJ3ByaW50JyB0byBmaXJzdCAoaGlnaGVzdCBwcmlvcml0eSkgcHJpbnQgYnJlYWtwb2ludFxuICAgICAgYnAgPSB0aGlzLmdldEV2ZW50QnJlYWtwb2ludHMoZXZlbnQpWzBdO1xuICAgICAgZXZlbnQubWVkaWFRdWVyeSA9IGJwPy5tZWRpYVF1ZXJ5ID8/ICcnO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZUFsaWFzKGV2ZW50LCBicCk7XG4gIH1cblxuXG4gIC8vIHJlZ2lzdGVyZWRCZWZvcmVBZnRlclByaW50SG9va3MgdHJhY2tzIGlmIHdlIHJlZ2lzdGVyZWQgdGhlIGBiZWZvcmVwcmludGBcbiAgLy8gIGFuZCBgYWZ0ZXJwcmludGAgZXZlbnQgbGlzdGVuZXJzLlxuICBwcml2YXRlIHJlZ2lzdGVyZWRCZWZvcmVBZnRlclByaW50SG9va3MgPSBmYWxzZTtcblxuICAvLyBpc1ByaW50aW5nQmVmb3JlQWZ0ZXJFdmVudCBpcyB1c2VkIHRvIHRyYWNrIGlmIHdlIGFyZSBwcmludGluZyBmcm9tIHdpdGhpblxuICAvLyBhIGBiZWZvcmVwcmludGAgZXZlbnQgaGFuZGxlci4gVGhpcyBwcmV2ZW50cyB0aGUgdHlwaWNhbCBgc3RvcFByaW50aW5nYFxuICAvLyBmb3JtIGBpbnRlcmNlcHRFdmVudHNgIHNvIHRoYXQgcHJpbnRpbmcgaXMgbm90IHN0b3BwZWQgd2hpbGUgdGhlIGRpYWxvZ1xuICAvLyBpcyBzdGlsbCBvcGVuLiBUaGlzIGlzIGFuIGV4dGVuc2lvbiBvZiB0aGUgYGlzUHJpbnRpbmdgIHByb3BlcnR5IG9uXG4gIC8vIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnQgYGJlZm9yZXByaW50YCBhbmQgYGFmdGVycHJpbnRgIGV2ZW50cy5cbiAgcHJpdmF0ZSBpc1ByaW50aW5nQmVmb3JlQWZ0ZXJFdmVudCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgYmVmb3JlUHJpbnRFdmVudExpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIGFmdGVyUHJpbnRFdmVudExpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgZm9ybWVyQWN0aXZhdGlvbnM6IEFycmF5PEJyZWFrUG9pbnQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gcmVnaXN0ZXJCZWZvcmVBZnRlclByaW50SG9va3MgcmVnaXN0ZXJzIGEgYGJlZm9yZXByaW50YCBldmVudCBob29rIHNvIHdlIGNhblxuICAvLyB0cmlnZ2VyIHByaW50IHN0eWxlcyBzeW5jaHJvbm91c2x5IGFuZCBhcHBseSBwcm9wZXIgbGF5b3V0IHN0eWxlcy5cbiAgLy8gSXQgaXMgYSBub29wIGlmIHRoZSBob29rcyBoYXZlIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIG9yIGlmIHRoZSBkb2N1bWVudCdzXG4gIC8vIGBkZWZhdWx0Vmlld2AgaXMgbm90IGF2YWlsYWJsZS5cbiAgcmVnaXN0ZXJCZWZvcmVBZnRlclByaW50SG9va3ModGFyZ2V0OiBIb29rVGFyZ2V0KSB7XG4gICAgLy8gYGRlZmF1bHRWaWV3YCBtYXkgYmUgbnVsbCB3aGVuIHJlbmRlcmluZyBvbiB0aGUgc2VydmVyIG9yIGluIG90aGVyIGNvbnRleHRzLlxuICAgIGlmICghdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgdGhpcy5yZWdpc3RlcmVkQmVmb3JlQWZ0ZXJQcmludEhvb2tzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlcmVkQmVmb3JlQWZ0ZXJQcmludEhvb2tzID0gdHJ1ZTtcblxuICAgIGNvbnN0IGJlZm9yZVByaW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAvLyBJZiB3ZSBhcmVuJ3QgYWxyZWFkeSBwcmludGluZywgc3RhcnQgcHJpbnRpbmcgYW5kIHVwZGF0ZSB0aGUgc3R5bGVzIGFzXG4gICAgICAvLyBpZiB0aGVyZSB3YXMgYSByZWd1bGFyIHByaW50IGBNZWRpYUNoYW5nZWAoZnJvbSBtYXRjaE1lZGlhKS5cbiAgICAgIGlmICghdGhpcy5pc1ByaW50aW5nKSB7XG4gICAgICAgIHRoaXMuaXNQcmludGluZ0JlZm9yZUFmdGVyRXZlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXJ0UHJpbnRpbmcodGFyZ2V0LCB0aGlzLmdldEV2ZW50QnJlYWtwb2ludHMobmV3IE1lZGlhQ2hhbmdlKHRydWUsIFBSSU5UKSkpO1xuICAgICAgICB0YXJnZXQudXBkYXRlU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGFmdGVyUHJpbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgIC8vIElmIHdlIGFyZW4ndCBhbHJlYWR5IHByaW50aW5nLCBzdGFydCBwcmludGluZyBhbmQgdXBkYXRlIHRoZSBzdHlsZXMgYXNcbiAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIHJlZ3VsYXIgcHJpbnQgYE1lZGlhQ2hhbmdlYChmcm9tIG1hdGNoTWVkaWEpLlxuICAgICAgdGhpcy5pc1ByaW50aW5nQmVmb3JlQWZ0ZXJFdmVudCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaXNQcmludGluZykge1xuICAgICAgICB0aGlzLnN0b3BQcmludGluZyh0YXJnZXQpO1xuICAgICAgICB0YXJnZXQudXBkYXRlU3R5bGVzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIENvdWxkIHdlIGhhdmUgdGVhcmRvd24gbG9naWMgdG8gcmVtb3ZlIGlmIHRoZXJlIGFyZSBubyBwcmludCBsaXN0ZW5lcnMgYmVpbmcgdXNlZD9cbiAgICB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVwcmludCcsIGJlZm9yZVByaW50TGlzdGVuZXIpO1xuICAgIHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2FmdGVycHJpbnQnLCBhZnRlclByaW50TGlzdGVuZXIpO1xuXG4gICAgdGhpcy5iZWZvcmVQcmludEV2ZW50TGlzdGVuZXJzLnB1c2goYmVmb3JlUHJpbnRMaXN0ZW5lcik7XG4gICAgdGhpcy5hZnRlclByaW50RXZlbnRMaXN0ZW5lcnMucHVzaChhZnRlclByaW50TGlzdGVuZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgUnhKUyB0YXAgb3BlcmF0b3Igd2l0aCBwYXJ0aWFsIGFwcGxpY2F0aW9uXG4gICAqIEByZXR1cm4gcGlwZWFibGUgdGFwIHByZWRpY2F0ZVxuICAgKi9cbiAgaW50ZXJjZXB0RXZlbnRzKHRhcmdldDogSG9va1RhcmdldCkge1xuICAgIHJldHVybiAoZXZlbnQ6IE1lZGlhQ2hhbmdlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1ByaW50RXZlbnQoZXZlbnQpKSB7XG4gICAgICAgIGlmIChldmVudC5tYXRjaGVzICYmICF0aGlzLmlzUHJpbnRpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0UHJpbnRpbmcodGFyZ2V0LCB0aGlzLmdldEV2ZW50QnJlYWtwb2ludHMoZXZlbnQpKTtcbiAgICAgICAgICB0YXJnZXQudXBkYXRlU3R5bGVzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWV2ZW50Lm1hdGNoZXMgJiYgdGhpcy5pc1ByaW50aW5nICYmICF0aGlzLmlzUHJpbnRpbmdCZWZvcmVBZnRlckV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zdG9wUHJpbnRpbmcodGFyZ2V0KTtcbiAgICAgICAgICB0YXJnZXQudXBkYXRlU3R5bGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sbGVjdEFjdGl2YXRpb25zKHRhcmdldCwgZXZlbnQpO1xuICAgIH07XG4gIH1cblxuICAvKiogU3RvcCBtZWRpYUNoYW5nZSBldmVudCBwcm9wYWdhdGlvbiBpbiBldmVudCBzdHJlYW1zICovXG4gIGJsb2NrUHJvcGFnYXRpb24oKSB7XG4gICAgcmV0dXJuIChldmVudDogTWVkaWFDaGFuZ2UpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiAhKHRoaXMuaXNQcmludGluZyB8fCB0aGlzLmlzUHJpbnRFdmVudChldmVudCkpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBjdXJyZW50IGFjdGl2YXRlQnJlYWtwb2ludHMgKGZvciBsYXRlciByZXN0b3JlKVxuICAgKiBhbmQgc3Vic3RpdHV0ZSBvbmx5IHRoZSBwcmludEFsaWFzIGJyZWFrcG9pbnRcbiAgICovXG4gIHByb3RlY3RlZCBzdGFydFByaW50aW5nKHRhcmdldDogSG9va1RhcmdldCwgYnBMaXN0OiBPcHRpb25hbEJyZWFrUG9pbnRbXSkge1xuICAgIHRoaXMuaXNQcmludGluZyA9IHRydWU7XG4gICAgdGhpcy5mb3JtZXJBY3RpdmF0aW9ucyA9IHRhcmdldC5hY3RpdmF0ZWRCcmVha3BvaW50cztcbiAgICB0YXJnZXQuYWN0aXZhdGVkQnJlYWtwb2ludHMgPSB0aGlzLnF1ZXVlLmFkZFByaW50QnJlYWtwb2ludHMoYnBMaXN0KTtcbiAgfVxuXG4gIC8qKiBGb3IgYW55IHByaW50IGRlLWFjdGl2YXRpb25zLCByZXNldCB0aGUgZW50aXJlIHByaW50IHF1ZXVlICovXG4gIHByb3RlY3RlZCBzdG9wUHJpbnRpbmcodGFyZ2V0OiBIb29rVGFyZ2V0KSB7XG4gICAgdGFyZ2V0LmFjdGl2YXRlZEJyZWFrcG9pbnRzID0gdGhpcy5kZWFjdGl2YXRpb25zO1xuICAgIHRoaXMuZGVhY3RpdmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZm9ybWVyQWN0aXZhdGlvbnMgPSBudWxsO1xuICAgIHRoaXMucXVldWUuY2xlYXIoKTtcbiAgICB0aGlzLmlzUHJpbnRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyByZXN0b3JlIHByZS1QcmludCBBY3RpdmF0aW9ucywgd2UgbXVzdCBjYXB0dXJlIHRoZSBwcm9wZXJcbiAgICogbGlzdCBvZiBicmVha3BvaW50IGFjdGl2YXRpb25zIEJFRk9SRSBwcmludCBzdGFydHMuIE9uQmVmb3JlUHJpbnQoKVxuICAgKiBpcyBzdXBwb3J0ZWQ7IHNvICdwcmludCcgbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyBhcmUgdXNlZCBhcyBhIGZhbGxiYWNrXG4gICAqIGluIGJyb3dzZXJzIHdpdGhvdXQgYGJlZm9yZXByaW50YCBzdXBwb3J0LlxuICAgKlxuICAgKiA+ICBCdXQgYWN0aXZhdGVkIGJyZWFrcG9pbnRzIGFyZSBkZWFjdGl2YXRlZCBCRUZPUkUgJ3ByaW50JyBhY3RpdmF0aW9uLlxuICAgKlxuICAgKiBMZXQncyBjYXB0dXJlIGFsbCBkZS1hY3RpdmF0aW9ucyB1c2luZyB0aGUgZm9sbG93aW5nIGxvZ2ljOlxuICAgKlxuICAgKiAgV2hlbiBub3QgcHJpbnRpbmc6XG4gICAqICAgIC0gY2xlYXIgY2FjaGUgd2hlbiBhY3RpdmF0aW5nIG5vbi1wcmludCBicmVha3BvaW50XG4gICAqICAgIC0gdXBkYXRlIGNhY2hlIChhbmQgc29ydCkgd2hlbiBkZWFjdGl2YXRpbmdcbiAgICpcbiAgICogIFdoZW4gcHJpbnRpbmc6XG4gICAqICAgIC0gc29ydCBhbmQgc2F2ZSB3aGVuIHN0YXJ0aW5nIHByaW50XG4gICAqICAgIC0gcmVzdG9yZSBhcyBhY3RpdmF0ZWRUYXJnZXRzIGFuZCBjbGVhciB3aGVuIHN0b3AgcHJpbnRpbmdcbiAgICovXG4gIGNvbGxlY3RBY3RpdmF0aW9ucyh0YXJnZXQ6IEhvb2tUYXJnZXQsIGV2ZW50OiBNZWRpYUNoYW5nZSkge1xuICAgIGlmICghdGhpcy5pc1ByaW50aW5nIHx8IHRoaXMuaXNQcmludGluZ0JlZm9yZUFmdGVyRXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5pc1ByaW50aW5nQmVmb3JlQWZ0ZXJFdmVudCkge1xuICAgICAgICAvLyBPbmx5IGNsZWFyIGRlYWN0aXZhdGlvbnMgaWYgd2UgYXJlbid0IHByaW50aW5nIGZyb20gYSBgYmVmb3JlcHJpbnRgIGV2ZW50LlxuICAgICAgICAvLyBPdGhlcndpc2UsIHRoaXMgd2lsbCBjbGVhciBiZWZvcmUgYHN0b3BQcmludGluZygpYCBpcyBjYWxsZWQgdG8gcmVzdG9yZVxuICAgICAgICAvLyB0aGUgcHJlLVByaW50IEFjdGl2YXRpb25zLlxuICAgICAgICB0aGlzLmRlYWN0aXZhdGlvbnMgPSBbXTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghZXZlbnQubWF0Y2hlcykge1xuICAgICAgICBjb25zdCBicCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5UXVlcnkoZXZlbnQubWVkaWFRdWVyeSk7XG4gICAgICAgIC8vIERlYWN0aXZhdGluZyBhIGJyZWFrcG9pbnRcbiAgICAgICAgaWYgKGJwKSB7XG4gICAgICAgICAgY29uc3QgaGFzRm9ybWVyQnAgPSB0aGlzLmZvcm1lckFjdGl2YXRpb25zICYmIHRoaXMuZm9ybWVyQWN0aXZhdGlvbnMuaW5jbHVkZXMoYnApO1xuICAgICAgICAgIGNvbnN0IHdhc0FjdGl2YXRlZCA9ICF0aGlzLmZvcm1lckFjdGl2YXRpb25zICYmIHRhcmdldC5hY3RpdmF0ZWRCcmVha3BvaW50cy5pbmNsdWRlcyhicCk7XG4gICAgICAgICAgY29uc3Qgc2hvdWxkRGVhY3RpdmF0ZSA9IGhhc0Zvcm1lckJwIHx8IHdhc0FjdGl2YXRlZDtcbiAgICAgICAgICBpZiAoc2hvdWxkRGVhY3RpdmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRpb25zLnB1c2goYnApO1xuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRpb25zLnNvcnQoc29ydERlc2NlbmRpbmdQcmlvcml0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFRlYXJkb3duIGxvZ2ljIGZvciB0aGUgc2VydmljZS4gKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3KSB7XG4gICAgICB0aGlzLmJlZm9yZVByaW50RXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChsID0+IHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50JywgbCkpO1xuICAgICAgdGhpcy5hZnRlclByaW50RXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChsID0+IHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FmdGVycHJpbnQnLCBsKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSXMgdGhpcyBzZXJ2aWNlIGN1cnJlbnRseSBpbiBwcmludCBtb2RlXG4gIHByaXZhdGUgaXNQcmludGluZyA9IGZhbHNlO1xuICBwcml2YXRlIHF1ZXVlID0gbmV3IFByaW50UXVldWUoKTtcbiAgcHJpdmF0ZSBkZWFjdGl2YXRpb25zOiBCcmVha1BvaW50W10gPSBbXTtcbn1cblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBJbnRlcm5hbCBVdGlsaXR5IGNsYXNzICdQcmludFF1ZXVlJ1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbi8qKlxuICogVXRpbGl0eSBjbGFzcyB0byBtYW5hZ2UgcHJpbnQgYnJlYWtwb2ludHMgKyBhY3RpdmF0ZWRCcmVha3BvaW50c1xuICogd2l0aCBjb3JyZWN0IHNvcnRpbmcgV0hJTEUgcHJpbnRpbmdcbiAqL1xuY2xhc3MgUHJpbnRRdWV1ZSB7XG4gIC8qKiBTb3J0ZWQgcXVldWUgd2l0aCBwcmlvcml0aXplZCBwcmludCBicmVha3BvaW50cyAqL1xuICBwcmludEJyZWFrcG9pbnRzOiBCcmVha1BvaW50W10gPSBbXTtcblxuICBhZGRQcmludEJyZWFrcG9pbnRzKGJwTGlzdDogT3B0aW9uYWxCcmVha1BvaW50W10pOiBCcmVha1BvaW50W10ge1xuICAgIGJwTGlzdC5wdXNoKEJSRUFLUE9JTlRfUFJJTlQpO1xuICAgIGJwTGlzdC5zb3J0KHNvcnREZXNjZW5kaW5nUHJpb3JpdHkpO1xuICAgIGJwTGlzdC5mb3JFYWNoKGJwID0+IHRoaXMuYWRkQnJlYWtwb2ludChicCkpO1xuXG4gICAgcmV0dXJuIHRoaXMucHJpbnRCcmVha3BvaW50cztcbiAgfVxuXG4gIC8qKiBBZGQgUHJpbnQgYnJlYWtwb2ludCB0byBxdWV1ZSAqL1xuICBhZGRCcmVha3BvaW50KGJwOiBPcHRpb25hbEJyZWFrUG9pbnQpIHtcbiAgICBpZiAoISFicCkge1xuICAgICAgY29uc3QgYnBJbkxpc3QgPSB0aGlzLnByaW50QnJlYWtwb2ludHMuZmluZChpdCA9PiBpdC5tZWRpYVF1ZXJ5ID09PSBicC5tZWRpYVF1ZXJ5KTtcblxuICAgICAgaWYgKGJwSW5MaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIGBwcmludEFsaWFzYCBicmVha3BvaW50LCB0aGVuIGFwcGVuZC4gSWYgYSB0cnVlICdwcmludCcgYnJlYWtwb2ludCxcbiAgICAgICAgLy8gcmVnaXN0ZXIgYXMgaGlnaGVzdCBwcmlvcml0eSBpbiB0aGUgcXVldWVcbiAgICAgICAgdGhpcy5wcmludEJyZWFrcG9pbnRzID0gaXNQcmludEJyZWFrUG9pbnQoYnApID8gW2JwLCAuLi50aGlzLnByaW50QnJlYWtwb2ludHNdXG4gICAgICAgICAgICA6IFsuLi50aGlzLnByaW50QnJlYWtwb2ludHMsIGJwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogUmVzdG9yZSBvcmlnaW5hbCBhY3RpdmF0ZWQgYnJlYWtwb2ludHMgYW5kIGNsZWFyIGludGVybmFsIGNhY2hlcyAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLnByaW50QnJlYWtwb2ludHMgPSBbXTtcbiAgfVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIEludGVybmFsIFV0aWxpdHkgbWV0aG9kc1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbi8qKiBPbmx5IHN1cHBvcnQgaW50ZXJjZXB0IHF1ZXVlaW5nIGlmIHRoZSBCcmVha3BvaW50IGlzIGEgcHJpbnQgQG1lZGlhIHF1ZXJ5ICovXG5mdW5jdGlvbiBpc1ByaW50QnJlYWtQb2ludChicDogT3B0aW9uYWxCcmVha1BvaW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBicD8ubWVkaWFRdWVyeS5zdGFydHNXaXRoKFBSSU5UKSA/PyBmYWxzZTtcbn1cbiJdfQ==