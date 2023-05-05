/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { asapScheduler, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, } from 'rxjs/operators';
import { mergeAlias } from '../add-alias';
import { MediaChange } from '../media-change';
import { coerceArray } from '../utils/array';
import { sortDescendingPriority } from '../utils/sort';
import * as i0 from "@angular/core";
import * as i1 from "../breakpoints/break-point-registry";
import * as i2 from "../match-media/match-media";
import * as i3 from "../media-marshaller/print-hook";
/**
 * MediaObserver enables applications to listen for 1..n mediaQuery activations and to determine
 * if a mediaQuery is currently activated.
 *
 * Since a breakpoint change will first deactivate 1...n mediaQueries and then possibly activate
 * 1..n mediaQueries, the MediaObserver will debounce notifications and report ALL *activations*
 * in 1 event notification. The reported activations will be sorted in descending priority order.
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw MediaChange
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * Note: Developers should note that only mediaChange activations (not de-activations)
 *       are announced by the MediaObserver.
 *
 *  @usage
 *
 *  // RxJS
 *  import { filter } from 'rxjs/operators';
 *  import { MediaObserver } from '@ngbracket/ngx-layout';
 *
 *  @Component({ ... })
 *  export class AppComponent {
 *    status: string = '';
 *
 *    constructor(mediaObserver: MediaObserver) {
 *      const media$ = mediaObserver.asObservable().pipe(
 *        filter((changes: MediaChange[]) => true)   // silly noop filter
 *      );
 *
 *      media$.subscribe((changes: MediaChange[]) => {
 *        let status = '';
 *        changes.forEach( change => {
 *          status += `'${change.mqAlias}' = (${change.mediaQuery}) <br/>` ;
 *        });
 *        this.status = status;
 *     });
 *
 *    }
 *  }
 */
class MediaObserver {
    constructor(breakpoints, matchMedia, hook) {
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.hook = hook;
        /** Filter MediaChange notifications for overlapping breakpoints */
        this.filterOverlaps = false;
        this.destroyed$ = new Subject();
        this._media$ = this.watchActivations();
    }
    /**
     * Completes the active subject, signalling to all complete for all
     * MediaObserver subscribers
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    // ************************************************
    // Public Methods
    // ************************************************
    /**
     * Observe changes to current activation 'list'
     */
    asObservable() {
        return this._media$;
    }
    /**
     * Allow programmatic query to determine if one or more media query/alias match
     * the current viewport size.
     * @param value One or more media queries (or aliases) to check.
     * @returns Whether any of the media queries match.
     */
    isActive(value) {
        const aliases = splitQueries(coerceArray(value));
        return aliases.some((alias) => {
            const query = toMediaQuery(alias, this.breakpoints);
            return query !== null && this.matchMedia.isActive(query);
        });
    }
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Register all the mediaQueries registered in the BreakPointRegistry
     * This is needed so subscribers can be auto-notified of all standard, registered
     * mediaQuery activations
     */
    watchActivations() {
        const queries = this.breakpoints.items.map((bp) => bp.mediaQuery);
        return this.buildObservable(queries);
    }
    /**
     * Only pass/announce activations (not de-activations)
     *
     * Since multiple-mediaQueries can be activation in a cycle,
     * gather all current activations into a single list of changes to observers
     *
     * Inject associated (if any) alias information into the MediaChange event
     * - Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
     * - Exclude print activations that do not have an associated mediaQuery
     *
     * NOTE: the raw MediaChange events [from MatchMedia] do not
     *       contain important alias information; as such this info
     *       must be injected into the MediaChange
     */
    buildObservable(mqList) {
        const hasChanges = (changes) => {
            const isValidQuery = (change) => change.mediaQuery.length > 0;
            return changes.filter(isValidQuery).length > 0;
        };
        const excludeOverlaps = (changes) => {
            return !this.filterOverlaps
                ? changes
                : changes.filter((change) => {
                    const bp = this.breakpoints.findByQuery(change.mediaQuery);
                    return bp?.overlapping ?? true;
                });
        };
        const ignoreDuplicates = (previous, current) => {
            if (previous.length !== current.length) {
                return false;
            }
            const previousMqs = previous.map((mc) => mc.mediaQuery);
            const currentMqs = new Set(current.map((mc) => mc.mediaQuery));
            const difference = new Set(previousMqs.filter((mq) => !currentMqs.has(mq)));
            return difference.size === 0;
        };
        /**
         */
        return this.matchMedia.observe(this.hook.withPrintQuery(mqList)).pipe(filter((change) => change.matches), debounceTime(0, asapScheduler), switchMap((_) => of(this.findAllActivations())), map(excludeOverlaps), filter(hasChanges), distinctUntilChanged(ignoreDuplicates), takeUntil(this.destroyed$));
    }
    /**
     * Find all current activations and prepare single list of activations
     * sorted by descending priority.
     */
    findAllActivations() {
        const mergeMQAlias = (change) => {
            const bp = this.breakpoints.findByQuery(change.mediaQuery);
            return mergeAlias(change, bp);
        };
        const replaceWithPrintAlias = (change) => this.hook.isPrintEvent(change) ? this.hook.updateEvent(change) : change;
        return this.matchMedia.activations
            .map((query) => new MediaChange(true, query))
            .map(replaceWithPrintAlias)
            .map(mergeMQAlias)
            .sort(sortDescendingPriority);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: MediaObserver, deps: [{ token: i1.BreakPointRegistry }, { token: i2.MatchMedia }, { token: i3.PrintHook }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: MediaObserver, providedIn: 'root' }); }
}
export { MediaObserver };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: MediaObserver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BreakPointRegistry }, { type: i2.MatchMedia }, { type: i3.PrintHook }]; } });
/**
 * Find associated breakpoint (if any)
 */
function toMediaQuery(query, locator) {
    const bp = locator.findByAlias(query) ?? locator.findByQuery(query);
    return bp?.mediaQuery ?? null;
}
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries
        .flatMap((query) => query.split(','))
        .map((query) => query.trim());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWVkaWEtb2JzZXJ2ZXIvbWVkaWEtb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU0xQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFDSCxNQUNhLGFBQWE7SUFJeEIsWUFDWSxXQUErQixFQUMvQixVQUFzQixFQUN0QixJQUFlO1FBRmYsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBVztRQU4zQixtRUFBbUU7UUFDbkUsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUEwSU4sZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFuSWhELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJ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RUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUMxQixHQUFHLENBQUMsWUFBWSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OEdBeklVLGFBQWE7a0hBQWIsYUFBYSxjQURBLE1BQU07O1NBQ25CLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBZ0psQzs7R0FFRztBQUNILFNBQVMsWUFBWSxDQUNuQixLQUFhLEVBQ2IsT0FBMkI7SUFFM0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sRUFBRSxFQUFFLFVBQVUsSUFBSSxJQUFJLENBQUM7QUFDaEMsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsWUFBWSxDQUFDLE9BQWlCO0lBQ3JDLE9BQU8sT0FBTztTQUNYLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlYm91bmNlVGltZSxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2VVbnRpbCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtZXJnZUFsaWFzIH0gZnJvbSAnLi4vYWRkLWFsaWFzJztcbmltcG9ydCB7XG4gIEJyZWFrUG9pbnRSZWdpc3RyeSxcbiAgT3B0aW9uYWxCcmVha1BvaW50LFxufSBmcm9tICcuLi9icmVha3BvaW50cy9icmVhay1wb2ludC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXRjaE1lZGlhIH0gZnJvbSAnLi4vbWF0Y2gtbWVkaWEvbWF0Y2gtbWVkaWEnO1xuaW1wb3J0IHsgTWVkaWFDaGFuZ2UgfSBmcm9tICcuLi9tZWRpYS1jaGFuZ2UnO1xuaW1wb3J0IHsgUHJpbnRIb29rIH0gZnJvbSAnLi4vbWVkaWEtbWFyc2hhbGxlci9wcmludC1ob29rJztcblxuaW1wb3J0IHsgY29lcmNlQXJyYXkgfSBmcm9tICcuLi91dGlscy9hcnJheSc7XG5pbXBvcnQgeyBzb3J0RGVzY2VuZGluZ1ByaW9yaXR5IH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XG5cbi8qKlxuICogTWVkaWFPYnNlcnZlciBlbmFibGVzIGFwcGxpY2F0aW9ucyB0byBsaXN0ZW4gZm9yIDEuLm4gbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyBhbmQgdG8gZGV0ZXJtaW5lXG4gKiBpZiBhIG1lZGlhUXVlcnkgaXMgY3VycmVudGx5IGFjdGl2YXRlZC5cbiAqXG4gKiBTaW5jZSBhIGJyZWFrcG9pbnQgY2hhbmdlIHdpbGwgZmlyc3QgZGVhY3RpdmF0ZSAxLi4ubiBtZWRpYVF1ZXJpZXMgYW5kIHRoZW4gcG9zc2libHkgYWN0aXZhdGVcbiAqIDEuLm4gbWVkaWFRdWVyaWVzLCB0aGUgTWVkaWFPYnNlcnZlciB3aWxsIGRlYm91bmNlIG5vdGlmaWNhdGlvbnMgYW5kIHJlcG9ydCBBTEwgKmFjdGl2YXRpb25zKlxuICogaW4gMSBldmVudCBub3RpZmljYXRpb24uIFRoZSByZXBvcnRlZCBhY3RpdmF0aW9ucyB3aWxsIGJlIHNvcnRlZCBpbiBkZXNjZW5kaW5nIHByaW9yaXR5IG9yZGVyLlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyB0aGUgQnJlYWtQb2ludCBSZWdpc3RyeSB0byBpbmplY3QgYWxpYXMgaW5mb3JtYXRpb24gaW50byB0aGUgcmF3IE1lZGlhQ2hhbmdlXG4gKiBub3RpZmljYXRpb24uIEZvciBjdXN0b20gbWVkaWFRdWVyeSBub3RpZmljYXRpb25zLCBhbGlhcyBpbmZvcm1hdGlvbiB3aWxsIG5vdCBiZSBpbmplY3RlZCBhbmRcbiAqIHRob3NlIGZpZWxkcyB3aWxsIGJlICcnLlxuICpcbiAqIE5vdGU6IERldmVsb3BlcnMgc2hvdWxkIG5vdGUgdGhhdCBvbmx5IG1lZGlhQ2hhbmdlIGFjdGl2YXRpb25zIChub3QgZGUtYWN0aXZhdGlvbnMpXG4gKiAgICAgICBhcmUgYW5ub3VuY2VkIGJ5IHRoZSBNZWRpYU9ic2VydmVyLlxuICpcbiAqICBAdXNhZ2VcbiAqXG4gKiAgLy8gUnhKU1xuICogIGltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbiAqICBpbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0JztcbiAqXG4gKiAgQENvbXBvbmVudCh7IC4uLiB9KVxuICogIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICogICAgc3RhdHVzOiBzdHJpbmcgPSAnJztcbiAqXG4gKiAgICBjb25zdHJ1Y3RvcihtZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyKSB7XG4gKiAgICAgIGNvbnN0IG1lZGlhJCA9IG1lZGlhT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAqICAgICAgICBmaWx0ZXIoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHRydWUpICAgLy8gc2lsbHkgbm9vcCBmaWx0ZXJcbiAqICAgICAgKTtcbiAqXG4gKiAgICAgIG1lZGlhJC5zdWJzY3JpYmUoKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHtcbiAqICAgICAgICBsZXQgc3RhdHVzID0gJyc7XG4gKiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKCBjaGFuZ2UgPT4ge1xuICogICAgICAgICAgc3RhdHVzICs9IGAnJHtjaGFuZ2UubXFBbGlhc30nID0gKCR7Y2hhbmdlLm1lZGlhUXVlcnl9KSA8YnIvPmAgO1xuICogICAgICAgIH0pO1xuICogICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICogICAgIH0pO1xuICpcbiAqICAgIH1cbiAqICB9XG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTWVkaWFPYnNlcnZlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBGaWx0ZXIgTWVkaWFDaGFuZ2Ugbm90aWZpY2F0aW9ucyBmb3Igb3ZlcmxhcHBpbmcgYnJlYWtwb2ludHMgKi9cbiAgZmlsdGVyT3ZlcmxhcHMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYnJlYWtwb2ludHM6IEJyZWFrUG9pbnRSZWdpc3RyeSxcbiAgICBwcm90ZWN0ZWQgbWF0Y2hNZWRpYTogTWF0Y2hNZWRpYSxcbiAgICBwcm90ZWN0ZWQgaG9vazogUHJpbnRIb29rXG4gICkge1xuICAgIHRoaXMuX21lZGlhJCA9IHRoaXMud2F0Y2hBY3RpdmF0aW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgYWN0aXZlIHN1YmplY3QsIHNpZ25hbGxpbmcgdG8gYWxsIGNvbXBsZXRlIGZvciBhbGxcbiAgICogTWVkaWFPYnNlcnZlciBzdWJzY3JpYmVyc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQdWJsaWMgTWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogT2JzZXJ2ZSBjaGFuZ2VzIHRvIGN1cnJlbnQgYWN0aXZhdGlvbiAnbGlzdCdcbiAgICovXG4gIGFzT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbWVkaWEkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93IHByb2dyYW1tYXRpYyBxdWVyeSB0byBkZXRlcm1pbmUgaWYgb25lIG9yIG1vcmUgbWVkaWEgcXVlcnkvYWxpYXMgbWF0Y2hcbiAgICogdGhlIGN1cnJlbnQgdmlld3BvcnQgc2l6ZS5cbiAgICogQHBhcmFtIHZhbHVlIE9uZSBvciBtb3JlIG1lZGlhIHF1ZXJpZXMgKG9yIGFsaWFzZXMpIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyBXaGV0aGVyIGFueSBvZiB0aGUgbWVkaWEgcXVlcmllcyBtYXRjaC5cbiAgICovXG4gIGlzQWN0aXZlKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFsaWFzZXMgPSBzcGxpdFF1ZXJpZXMoY29lcmNlQXJyYXkodmFsdWUpKTtcbiAgICByZXR1cm4gYWxpYXNlcy5zb21lKChhbGlhcykgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b01lZGlhUXVlcnkoYWxpYXMsIHRoaXMuYnJlYWtwb2ludHMpO1xuICAgICAgcmV0dXJuIHF1ZXJ5ICE9PSBudWxsICYmIHRoaXMubWF0Y2hNZWRpYS5pc0FjdGl2ZShxdWVyeSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gSW50ZXJuYWwgTWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIHRoZSBtZWRpYVF1ZXJpZXMgcmVnaXN0ZXJlZCBpbiB0aGUgQnJlYWtQb2ludFJlZ2lzdHJ5XG4gICAqIFRoaXMgaXMgbmVlZGVkIHNvIHN1YnNjcmliZXJzIGNhbiBiZSBhdXRvLW5vdGlmaWVkIG9mIGFsbCBzdGFuZGFyZCwgcmVnaXN0ZXJlZFxuICAgKiBtZWRpYVF1ZXJ5IGFjdGl2YXRpb25zXG4gICAqL1xuICBwcml2YXRlIHdhdGNoQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgcXVlcmllcyA9IHRoaXMuYnJlYWtwb2ludHMuaXRlbXMubWFwKChicCkgPT4gYnAubWVkaWFRdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRPYnNlcnZhYmxlKHF1ZXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9ubHkgcGFzcy9hbm5vdW5jZSBhY3RpdmF0aW9ucyAobm90IGRlLWFjdGl2YXRpb25zKVxuICAgKlxuICAgKiBTaW5jZSBtdWx0aXBsZS1tZWRpYVF1ZXJpZXMgY2FuIGJlIGFjdGl2YXRpb24gaW4gYSBjeWNsZSxcbiAgICogZ2F0aGVyIGFsbCBjdXJyZW50IGFjdGl2YXRpb25zIGludG8gYSBzaW5nbGUgbGlzdCBvZiBjaGFuZ2VzIHRvIG9ic2VydmVyc1xuICAgKlxuICAgKiBJbmplY3QgYXNzb2NpYXRlZCAoaWYgYW55KSBhbGlhcyBpbmZvcm1hdGlvbiBpbnRvIHRoZSBNZWRpYUNoYW5nZSBldmVudFxuICAgKiAtIEV4Y2x1ZGUgbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyBmb3Igb3ZlcmxhcHBpbmcgbVFzLiBMaXN0IGJvdW5kZWQgbVEgcmFuZ2VzIG9ubHlcbiAgICogLSBFeGNsdWRlIHByaW50IGFjdGl2YXRpb25zIHRoYXQgZG8gbm90IGhhdmUgYW4gYXNzb2NpYXRlZCBtZWRpYVF1ZXJ5XG4gICAqXG4gICAqIE5PVEU6IHRoZSByYXcgTWVkaWFDaGFuZ2UgZXZlbnRzIFtmcm9tIE1hdGNoTWVkaWFdIGRvIG5vdFxuICAgKiAgICAgICBjb250YWluIGltcG9ydGFudCBhbGlhcyBpbmZvcm1hdGlvbjsgYXMgc3VjaCB0aGlzIGluZm9cbiAgICogICAgICAgbXVzdCBiZSBpbmplY3RlZCBpbnRvIHRoZSBNZWRpYUNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZE9ic2VydmFibGUobXFMaXN0OiBzdHJpbmdbXSk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2VbXT4ge1xuICAgIGNvbnN0IGhhc0NoYW5nZXMgPSAoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgY29uc3QgaXNWYWxpZFF1ZXJ5ID0gKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+XG4gICAgICAgIGNoYW5nZS5tZWRpYVF1ZXJ5Lmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gY2hhbmdlcy5maWx0ZXIoaXNWYWxpZFF1ZXJ5KS5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgY29uc3QgZXhjbHVkZU92ZXJsYXBzID0gKGNoYW5nZXM6IE1lZGlhQ2hhbmdlW10pID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5maWx0ZXJPdmVybGFwc1xuICAgICAgICA/IGNoYW5nZXNcbiAgICAgICAgOiBjaGFuZ2VzLmZpbHRlcigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBicCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5UXVlcnkoY2hhbmdlLm1lZGlhUXVlcnkpO1xuICAgICAgICAgICAgcmV0dXJuIGJwPy5vdmVybGFwcGluZyA/PyB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgaWdub3JlRHVwbGljYXRlcyA9IChcbiAgICAgIHByZXZpb3VzOiBNZWRpYUNoYW5nZVtdLFxuICAgICAgY3VycmVudDogTWVkaWFDaGFuZ2VbXVxuICAgICk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHByZXZpb3VzLmxlbmd0aCAhPT0gY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2aW91c01xcyA9IHByZXZpb3VzLm1hcCgobWMpID0+IG1jLm1lZGlhUXVlcnkpO1xuICAgICAgY29uc3QgY3VycmVudE1xcyA9IG5ldyBTZXQoY3VycmVudC5tYXAoKG1jKSA9PiBtYy5tZWRpYVF1ZXJ5KSk7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlID0gbmV3IFNldChcbiAgICAgICAgcHJldmlvdXNNcXMuZmlsdGVyKChtcSkgPT4gIWN1cnJlbnRNcXMuaGFzKG1xKSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBkaWZmZXJlbmNlLnNpemUgPT09IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqL1xuICAgIHJldHVybiB0aGlzLm1hdGNoTWVkaWEub2JzZXJ2ZSh0aGlzLmhvb2sud2l0aFByaW50UXVlcnkobXFMaXN0KSkucGlwZShcbiAgICAgIGZpbHRlcigoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4gY2hhbmdlLm1hdGNoZXMpLFxuICAgICAgZGVib3VuY2VUaW1lKDAsIGFzYXBTY2hlZHVsZXIpLFxuICAgICAgc3dpdGNoTWFwKChfKSA9PiBvZih0aGlzLmZpbmRBbGxBY3RpdmF0aW9ucygpKSksXG4gICAgICBtYXAoZXhjbHVkZU92ZXJsYXBzKSxcbiAgICAgIGZpbHRlcihoYXNDaGFuZ2VzKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGlnbm9yZUR1cGxpY2F0ZXMpLFxuICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGN1cnJlbnQgYWN0aXZhdGlvbnMgYW5kIHByZXBhcmUgc2luZ2xlIGxpc3Qgb2YgYWN0aXZhdGlvbnNcbiAgICogc29ydGVkIGJ5IGRlc2NlbmRpbmcgcHJpb3JpdHkuXG4gICAqL1xuICBwcml2YXRlIGZpbmRBbGxBY3RpdmF0aW9ucygpOiBNZWRpYUNoYW5nZVtdIHtcbiAgICBjb25zdCBtZXJnZU1RQWxpYXMgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4ge1xuICAgICAgY29uc3QgYnA6IE9wdGlvbmFsQnJlYWtQb2ludCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5UXVlcnkoXG4gICAgICAgIGNoYW5nZS5tZWRpYVF1ZXJ5XG4gICAgICApO1xuICAgICAgcmV0dXJuIG1lcmdlQWxpYXMoY2hhbmdlLCBicCk7XG4gICAgfTtcbiAgICBjb25zdCByZXBsYWNlV2l0aFByaW50QWxpYXMgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT5cbiAgICAgIHRoaXMuaG9vay5pc1ByaW50RXZlbnQoY2hhbmdlKSA/IHRoaXMuaG9vay51cGRhdGVFdmVudChjaGFuZ2UpIDogY2hhbmdlO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hNZWRpYS5hY3RpdmF0aW9uc1xuICAgICAgLm1hcCgocXVlcnkpID0+IG5ldyBNZWRpYUNoYW5nZSh0cnVlLCBxdWVyeSkpXG4gICAgICAubWFwKHJlcGxhY2VXaXRoUHJpbnRBbGlhcylcbiAgICAgIC5tYXAobWVyZ2VNUUFsaWFzKVxuICAgICAgLnNvcnQoc29ydERlc2NlbmRpbmdQcmlvcml0eSk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IF9tZWRpYSQ6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2VbXT47XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG59XG5cbi8qKlxuICogRmluZCBhc3NvY2lhdGVkIGJyZWFrcG9pbnQgKGlmIGFueSlcbiAqL1xuZnVuY3Rpb24gdG9NZWRpYVF1ZXJ5KFxuICBxdWVyeTogc3RyaW5nLFxuICBsb2NhdG9yOiBCcmVha1BvaW50UmVnaXN0cnlcbik6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBicCA9IGxvY2F0b3IuZmluZEJ5QWxpYXMocXVlcnkpID8/IGxvY2F0b3IuZmluZEJ5UXVlcnkocXVlcnkpO1xuICByZXR1cm4gYnA/Lm1lZGlhUXVlcnkgPz8gbnVsbDtcbn1cblxuLyoqXG4gKiBTcGxpdCBlYWNoIHF1ZXJ5IHN0cmluZyBpbnRvIHNlcGFyYXRlIHF1ZXJ5IHN0cmluZ3MgaWYgdHdvIHF1ZXJpZXMgYXJlIHByb3ZpZGVkIGFzIGNvbW1hXG4gKiBzZXBhcmF0ZWQuXG4gKi9cbmZ1bmN0aW9uIHNwbGl0UXVlcmllcyhxdWVyaWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHF1ZXJpZXNcbiAgICAuZmxhdE1hcCgocXVlcnkpID0+IHF1ZXJ5LnNwbGl0KCcsJykpXG4gICAgLm1hcCgocXVlcnkpID0+IHF1ZXJ5LnRyaW0oKSk7XG59XG4iXX0=