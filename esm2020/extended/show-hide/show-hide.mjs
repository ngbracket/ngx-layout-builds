/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isPlatformServer } from '@angular/common';
import { Directive, Inject, Injectable, PLATFORM_ID, } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, SERVER_TOKEN, StyleBuilder, } from '@ngbrackets/ngx-layout/core';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ngbrackets/ngx-layout/core";
export class ShowHideStyleBuilder extends StyleBuilder {
    buildStyles(show, parent) {
        const shouldShow = show === 'true';
        return {
            display: shouldShow
                ? parent.display || (parent.isServer ? 'initial' : '')
                : 'none',
        };
    }
}
ShowHideStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ShowHideStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
ShowHideStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ShowHideStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ShowHideStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class ShowHideDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal, layoutConfig, platformId, serverModuleLoaded) {
        super(elementRef, styleBuilder, styler, marshal);
        this.layoutConfig = layoutConfig;
        this.platformId = platformId;
        this.serverModuleLoaded = serverModuleLoaded;
        this.DIRECTIVE_KEY = 'show-hide';
        /** Original DOM Element CSS display style */
        this.display = '';
        this.hasLayout = false;
        this.hasFlexChild = false;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    ngAfterViewInit() {
        this.trackExtraTriggers();
        const children = Array.from(this.nativeElement.children);
        for (let i = 0; i < children.length; i++) {
            if (this.marshal.hasValue(children[i], 'flex')) {
                this.hasFlexChild = true;
                break;
            }
        }
        if (DISPLAY_MAP.has(this.nativeElement)) {
            this.display = DISPLAY_MAP.get(this.nativeElement);
        }
        else {
            this.display = this.getDisplayStyle();
            DISPLAY_MAP.set(this.nativeElement, this.display);
        }
        this.init();
        // set the default to show unless explicitly overridden
        const defaultValue = this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY, '');
        if (defaultValue === undefined || defaultValue === '') {
            this.setValue(true, '');
        }
        else {
            this.triggerUpdate();
        }
    }
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fxShow')
     * Then conditionally override with the mq-activated Input's current value
     */
    ngOnChanges(changes) {
        Object.keys(changes).forEach((key) => {
            if (this.inputs.indexOf(key) !== -1) {
                const inputKey = key.split('.');
                const bp = inputKey.slice(1).join('.');
                const inputValue = changes[key].currentValue;
                let shouldShow = inputValue !== ''
                    ? inputValue !== 0
                        ? coerceBooleanProperty(inputValue)
                        : false
                    : true;
                if (inputKey[0] === 'fxHide') {
                    shouldShow = !shouldShow;
                }
                this.setValue(shouldShow, bp);
            }
        });
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *  Watch for these extra triggers to update fxShow, fxHide stylings
     */
    trackExtraTriggers() {
        this.hasLayout = this.marshal.hasValue(this.nativeElement, 'layout');
        ['layout', 'layout-align'].forEach((key) => {
            this.marshal
                .trackValue(this.nativeElement, key)
                .pipe(takeUntil(this.destroySubject))
                .subscribe(this.triggerUpdate.bind(this));
        });
    }
    /**
     * Override accessor to the current HTMLElement's `display` style
     * Note: Show/Hide will not change the display to 'flex' but will set it to 'block'
     * unless it was already explicitly specified inline or in a CSS stylesheet.
     */
    getDisplayStyle() {
        return this.hasLayout ||
            (this.hasFlexChild && this.layoutConfig.addFlexToParent)
            ? 'flex'
            : this.styler.lookupStyle(this.nativeElement, 'display', true);
    }
    /** Validate the visibility value and then update the host's inline display style */
    updateWithValue(value = true) {
        if (value === '') {
            return;
        }
        const isServer = isPlatformServer(this.platformId);
        this.addStyles(value ? 'true' : 'false', {
            display: this.display,
            isServer,
        });
        if (isServer && this.serverModuleLoaded) {
            this.nativeElement.style.setProperty('display', '');
        }
        this.marshal.triggerUpdate(this.parentElement, 'layout-gap');
    }
}
ShowHideDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ShowHideDirective, deps: [{ token: i0.ElementRef }, { token: ShowHideStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: LAYOUT_CONFIG }, { token: PLATFORM_ID }, { token: SERVER_TOKEN }], target: i0.ɵɵFactoryTarget.Directive });
ShowHideDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: ShowHideDirective, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ShowHideDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: ShowHideStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }]; } });
const DISPLAY_MAP = new WeakMap();
const inputs = [
    'fxShow',
    'fxShow.print',
    'fxShow.xs',
    'fxShow.sm',
    'fxShow.md',
    'fxShow.lg',
    'fxShow.xl',
    'fxShow.lt-sm',
    'fxShow.lt-md',
    'fxShow.lt-lg',
    'fxShow.lt-xl',
    'fxShow.gt-xs',
    'fxShow.gt-sm',
    'fxShow.gt-md',
    'fxShow.gt-lg',
    'fxHide',
    'fxHide.print',
    'fxHide.xs',
    'fxHide.sm',
    'fxHide.md',
    'fxHide.lg',
    'fxHide.xl',
    'fxHide.lt-sm',
    'fxHide.lt-md',
    'fxHide.lt-lg',
    'fxHide.lt-xl',
    'fxHide.gt-xs',
    'fxHide.gt-sm',
    'fxHide.gt-md',
    'fxHide.gt-lg',
];
const selector = `
  [fxShow], [fxShow.print],
  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],
  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],
  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],
  [fxHide], [fxHide.print],
  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],
  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],
  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]
`;
/**
 * 'show' Layout API directive
 */
export class DefaultShowHideDirective extends ShowHideDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultShowHideDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultShowHideDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultShowHideDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultShowHideDirective, selector: "\n  [fxShow], [fxShow.print],\n  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],\n  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],\n  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],\n  [fxHide], [fxHide.print],\n  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],\n  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],\n  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]\n", inputs: { fxShow: "fxShow", "fxShow.print": "fxShow.print", "fxShow.xs": "fxShow.xs", "fxShow.sm": "fxShow.sm", "fxShow.md": "fxShow.md", "fxShow.lg": "fxShow.lg", "fxShow.xl": "fxShow.xl", "fxShow.lt-sm": "fxShow.lt-sm", "fxShow.lt-md": "fxShow.lt-md", "fxShow.lt-lg": "fxShow.lt-lg", "fxShow.lt-xl": "fxShow.lt-xl", "fxShow.gt-xs": "fxShow.gt-xs", "fxShow.gt-sm": "fxShow.gt-sm", "fxShow.gt-md": "fxShow.gt-md", "fxShow.gt-lg": "fxShow.gt-lg", fxHide: "fxHide", "fxHide.print": "fxHide.print", "fxHide.xs": "fxHide.xs", "fxHide.sm": "fxHide.sm", "fxHide.md": "fxHide.md", "fxHide.lg": "fxHide.lg", "fxHide.xl": "fxHide.xl", "fxHide.lt-sm": "fxHide.lt-sm", "fxHide.lt-md": "fxHide.lt-md", "fxHide.lt-lg": "fxHide.lt-lg", "fxHide.lt-xl": "fxHide.lt-xl", "fxHide.gt-xs": "fxHide.gt-xs", "fxHide.gt-sm": "fxHide.gt-sm", "fxHide.gt-md": "fxHide.gt-md", "fxHide.gt-lg": "fxHide.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultShowHideDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1oaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9leHRlbmRlZC9zaG93LWhpZGUvc2hvdy1oaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFFTCxTQUFTLEVBRVQsTUFBTSxFQUNOLFVBQVUsRUFFVixXQUFXLEdBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGNBQWMsRUFFZCxhQUFhLEVBRWIsWUFBWSxFQUNaLFlBQVksR0FFYixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBUTNDLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxZQUFZO0lBQ3BELFdBQVcsQ0FBQyxJQUFZLEVBQUUsTUFBc0I7UUFDOUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFLLE1BQU0sQ0FBQztRQUNuQyxPQUFPO1lBQ0wsT0FBTyxFQUFFLFVBQVU7Z0JBQ2pCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxNQUFNO1NBQ1gsQ0FBQztJQUNKLENBQUM7O2lIQVJVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFhbEMsTUFBTSxPQUFPLGlCQUNYLFNBQVEsY0FBYztJQVV0QixZQUNFLFVBQXNCLEVBQ3RCLFlBQWtDLEVBQ2xD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O0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7Q0FDZixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7OztDQVNoQixDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsaUJBQWlCO0lBRC9EOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOztxSEFGWSx3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE9uQ2hhbmdlcyxcbiAgUExBVEZPUk1fSUQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIExheW91dENvbmZpZ09wdGlvbnMsXG4gIExBWU9VVF9DT05GSUcsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU0VSVkVSX1RPS0VOLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hvd0hpZGVQYXJlbnQge1xuICBkaXNwbGF5OiBzdHJpbmc7XG4gIGlzU2VydmVyOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFNob3dIaWRlU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXMoc2hvdzogc3RyaW5nLCBwYXJlbnQ6IFNob3dIaWRlUGFyZW50KSB7XG4gICAgY29uc3Qgc2hvdWxkU2hvdyA9IHNob3cgPT09ICd0cnVlJztcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogc2hvdWxkU2hvd1xuICAgICAgICA/IHBhcmVudC5kaXNwbGF5IHx8IChwYXJlbnQuaXNTZXJ2ZXIgPyAnaW5pdGlhbCcgOiAnJylcbiAgICAgICAgOiAnbm9uZScsXG4gICAgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBTaG93SGlkZURpcmVjdGl2ZVxuICBleHRlbmRzIEJhc2VEaXJlY3RpdmUyXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzXG57XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ3Nob3ctaGlkZSc7XG5cbiAgLyoqIE9yaWdpbmFsIERPTSBFbGVtZW50IENTUyBkaXNwbGF5IHN0eWxlICovXG4gIHByb3RlY3RlZCBkaXNwbGF5OiBzdHJpbmcgPSAnJztcbiAgcHJvdGVjdGVkIGhhc0xheW91dCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgaGFzRmxleENoaWxkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZUJ1aWxkZXI6IFNob3dIaWRlU3R5bGVCdWlsZGVyLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgQEluamVjdChMQVlPVVRfQ09ORklHKSBwcm90ZWN0ZWQgbGF5b3V0Q29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQEluamVjdChTRVJWRVJfVE9LRU4pIHByb3RlY3RlZCBzZXJ2ZXJNb2R1bGVMb2FkZWQ6IGJvb2xlYW5cbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIExpZmVjeWNsZSBNZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRyYWNrRXh0cmFUcmlnZ2VycygpO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMubmF0aXZlRWxlbWVudC5jaGlsZHJlbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMubWFyc2hhbC5oYXNWYWx1ZShjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCwgJ2ZsZXgnKSkge1xuICAgICAgICB0aGlzLmhhc0ZsZXhDaGlsZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChESVNQTEFZX01BUC5oYXModGhpcy5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgdGhpcy5kaXNwbGF5ID0gRElTUExBWV9NQVAuZ2V0KHRoaXMubmF0aXZlRWxlbWVudCkhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLmdldERpc3BsYXlTdHlsZSgpO1xuICAgICAgRElTUExBWV9NQVAuc2V0KHRoaXMubmF0aXZlRWxlbWVudCwgdGhpcy5kaXNwbGF5KTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgdG8gc2hvdyB1bmxlc3MgZXhwbGljaXRseSBvdmVycmlkZGVuXG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5tYXJzaGFsLmdldFZhbHVlKFxuICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5ESVJFQ1RJVkVfS0VZLFxuICAgICAgJydcbiAgICApO1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBkZWZhdWx0VmFsdWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnNldFZhbHVlKHRydWUsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyVXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9uIGNoYW5nZXMgdG8gYW55IEBJbnB1dCBwcm9wZXJ0aWVzLi4uXG4gICAqIERlZmF1bHQgdG8gdXNlIHRoZSBub24tcmVzcG9uc2l2ZSBJbnB1dCB2YWx1ZSAoJ2Z4U2hvdycpXG4gICAqIFRoZW4gY29uZGl0aW9uYWxseSBvdmVycmlkZSB3aXRoIHRoZSBtcS1hY3RpdmF0ZWQgSW5wdXQncyBjdXJyZW50IHZhbHVlXG4gICAqL1xuICBvdmVycmlkZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAodGhpcy5pbnB1dHMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBpbnB1dEtleSA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBicCA9IGlucHV0S2V5LnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IGNoYW5nZXNba2V5XS5jdXJyZW50VmFsdWU7XG4gICAgICAgIGxldCBzaG91bGRTaG93ID1cbiAgICAgICAgICBpbnB1dFZhbHVlICE9PSAnJ1xuICAgICAgICAgICAgPyBpbnB1dFZhbHVlICE9PSAwXG4gICAgICAgICAgICAgID8gY29lcmNlQm9vbGVhblByb3BlcnR5KGlucHV0VmFsdWUpXG4gICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgaWYgKGlucHV0S2V5WzBdID09PSAnZnhIaWRlJykge1xuICAgICAgICAgIHNob3VsZFNob3cgPSAhc2hvdWxkU2hvdztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFZhbHVlKHNob3VsZFNob3csIGJwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogIFdhdGNoIGZvciB0aGVzZSBleHRyYSB0cmlnZ2VycyB0byB1cGRhdGUgZnhTaG93LCBmeEhpZGUgc3R5bGluZ3NcbiAgICovXG4gIHByb3RlY3RlZCB0cmFja0V4dHJhVHJpZ2dlcnMoKSB7XG4gICAgdGhpcy5oYXNMYXlvdXQgPSB0aGlzLm1hcnNoYWwuaGFzVmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LCAnbGF5b3V0Jyk7XG5cbiAgICBbJ2xheW91dCcsICdsYXlvdXQtYWxpZ24nXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMubWFyc2hhbFxuICAgICAgICAudHJhY2tWYWx1ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsIGtleSlcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveVN1YmplY3QpKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMudHJpZ2dlclVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBhY2Nlc3NvciB0byB0aGUgY3VycmVudCBIVE1MRWxlbWVudCdzIGBkaXNwbGF5YCBzdHlsZVxuICAgKiBOb3RlOiBTaG93L0hpZGUgd2lsbCBub3QgY2hhbmdlIHRoZSBkaXNwbGF5IHRvICdmbGV4JyBidXQgd2lsbCBzZXQgaXQgdG8gJ2Jsb2NrJ1xuICAgKiB1bmxlc3MgaXQgd2FzIGFscmVhZHkgZXhwbGljaXRseSBzcGVjaWZpZWQgaW5saW5lIG9yIGluIGEgQ1NTIHN0eWxlc2hlZXQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RGlzcGxheVN0eWxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTGF5b3V0IHx8XG4gICAgICAodGhpcy5oYXNGbGV4Q2hpbGQgJiYgdGhpcy5sYXlvdXRDb25maWcuYWRkRmxleFRvUGFyZW50KVxuICAgICAgPyAnZmxleCdcbiAgICAgIDogdGhpcy5zdHlsZXIubG9va3VwU3R5bGUodGhpcy5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsIHRydWUpO1xuICB9XG5cbiAgLyoqIFZhbGlkYXRlIHRoZSB2aXNpYmlsaXR5IHZhbHVlIGFuZCB0aGVuIHVwZGF0ZSB0aGUgaG9zdCdzIGlubGluZSBkaXNwbGF5IHN0eWxlICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc1NlcnZlciA9IGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZScsIHtcbiAgICAgIGRpc3BsYXk6IHRoaXMuZGlzcGxheSxcbiAgICAgIGlzU2VydmVyLFxuICAgIH0pO1xuICAgIGlmIChpc1NlcnZlciAmJiB0aGlzLnNlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJycpO1xuICAgIH1cbiAgICB0aGlzLm1hcnNoYWwudHJpZ2dlclVwZGF0ZSh0aGlzLnBhcmVudEVsZW1lbnQhLCAnbGF5b3V0LWdhcCcpO1xuICB9XG59XG5cbmNvbnN0IERJU1BMQVlfTUFQOiBXZWFrTWFwPEhUTUxFbGVtZW50LCBzdHJpbmc+ID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhTaG93JyxcbiAgJ2Z4U2hvdy5wcmludCcsXG4gICdmeFNob3cueHMnLFxuICAnZnhTaG93LnNtJyxcbiAgJ2Z4U2hvdy5tZCcsXG4gICdmeFNob3cubGcnLFxuICAnZnhTaG93LnhsJyxcbiAgJ2Z4U2hvdy5sdC1zbScsXG4gICdmeFNob3cubHQtbWQnLFxuICAnZnhTaG93Lmx0LWxnJyxcbiAgJ2Z4U2hvdy5sdC14bCcsXG4gICdmeFNob3cuZ3QteHMnLFxuICAnZnhTaG93Lmd0LXNtJyxcbiAgJ2Z4U2hvdy5ndC1tZCcsXG4gICdmeFNob3cuZ3QtbGcnLFxuICAnZnhIaWRlJyxcbiAgJ2Z4SGlkZS5wcmludCcsXG4gICdmeEhpZGUueHMnLFxuICAnZnhIaWRlLnNtJyxcbiAgJ2Z4SGlkZS5tZCcsXG4gICdmeEhpZGUubGcnLFxuICAnZnhIaWRlLnhsJyxcbiAgJ2Z4SGlkZS5sdC1zbScsXG4gICdmeEhpZGUubHQtbWQnLFxuICAnZnhIaWRlLmx0LWxnJyxcbiAgJ2Z4SGlkZS5sdC14bCcsXG4gICdmeEhpZGUuZ3QteHMnLFxuICAnZnhIaWRlLmd0LXNtJyxcbiAgJ2Z4SGlkZS5ndC1tZCcsXG4gICdmeEhpZGUuZ3QtbGcnLFxuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtmeFNob3ddLCBbZnhTaG93LnByaW50XSxcbiAgW2Z4U2hvdy54c10sIFtmeFNob3cuc21dLCBbZnhTaG93Lm1kXSwgW2Z4U2hvdy5sZ10sIFtmeFNob3cueGxdLFxuICBbZnhTaG93Lmx0LXNtXSwgW2Z4U2hvdy5sdC1tZF0sIFtmeFNob3cubHQtbGddLCBbZnhTaG93Lmx0LXhsXSxcbiAgW2Z4U2hvdy5ndC14c10sIFtmeFNob3cuZ3Qtc21dLCBbZnhTaG93Lmd0LW1kXSwgW2Z4U2hvdy5ndC1sZ10sXG4gIFtmeEhpZGVdLCBbZnhIaWRlLnByaW50XSxcbiAgW2Z4SGlkZS54c10sIFtmeEhpZGUuc21dLCBbZnhIaWRlLm1kXSwgW2Z4SGlkZS5sZ10sIFtmeEhpZGUueGxdLFxuICBbZnhIaWRlLmx0LXNtXSwgW2Z4SGlkZS5sdC1tZF0sIFtmeEhpZGUubHQtbGddLCBbZnhIaWRlLmx0LXhsXSxcbiAgW2Z4SGlkZS5ndC14c10sIFtmeEhpZGUuZ3Qtc21dLCBbZnhIaWRlLmd0LW1kXSwgW2Z4SGlkZS5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ3Nob3cnIExheW91dCBBUEkgZGlyZWN0aXZlXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNob3dIaWRlRGlyZWN0aXZlIGV4dGVuZHMgU2hvd0hpZGVEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19