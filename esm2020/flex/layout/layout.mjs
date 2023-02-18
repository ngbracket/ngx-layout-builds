/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Injectable, } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, } from '@ngbrackets/ngx-layout/core';
import { buildLayoutCSS } from '@ngbrackets/ngx-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "@ngbrackets/ngx-layout/core";
export class LayoutStyleBuilder extends StyleBuilder {
    buildStyles(input, { display }) {
        const css = buildLayoutCSS(input);
        return {
            ...css,
            display: display === 'none' ? display : css.display,
        };
    }
}
LayoutStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
LayoutStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'fxLayout',
    'fxLayout.xs',
    'fxLayout.sm',
    'fxLayout.md',
    'fxLayout.lg',
    'fxLayout.xl',
    'fxLayout.lt-sm',
    'fxLayout.lt-md',
    'fxLayout.lt-lg',
    'fxLayout.lt-xl',
    'fxLayout.gt-xs',
    'fxLayout.gt-sm',
    'fxLayout.gt-md',
    'fxLayout.gt-lg',
];
const selector = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export class LayoutDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal, _config) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this._config = _config;
        this.DIRECTIVE_KEY = 'layout';
        this.init();
    }
    updateWithValue(input) {
        const detectLayoutDisplay = this._config.detectLayoutDisplay;
        const display = detectLayoutDisplay
            ? this.styler.lookupStyle(this.nativeElement, 'display')
            : '';
        this.styleCache = cacheMap.get(display) ?? new Map();
        cacheMap.set(display, this.styleCache);
        if (this.currentValue !== input) {
            this.addStyles(input, { display });
            this.currentValue = input;
        }
    }
}
LayoutDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: LayoutStyleBuilder }, { token: i1.MediaMarshaller }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Directive });
LayoutDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: LayoutDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: LayoutStyleBuilder }, { type: i1.MediaMarshaller }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }]; } });
export class DefaultLayoutDirective extends LayoutDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultLayoutDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultLayoutDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultLayoutDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultLayoutDirective, selector: "\n  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],\n  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],\n  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],\n  [fxLayout.gt-md], [fxLayout.gt-lg]\n", inputs: { fxLayout: "fxLayout", "fxLayout.xs": "fxLayout.xs", "fxLayout.sm": "fxLayout.sm", "fxLayout.md": "fxLayout.md", "fxLayout.lg": "fxLayout.lg", "fxLayout.xl": "fxLayout.xl", "fxLayout.lt-sm": "fxLayout.lt-sm", "fxLayout.lt-md": "fxLayout.lt-md", "fxLayout.lt-lg": "fxLayout.lt-lg", "fxLayout.lt-xl": "fxLayout.lt-xl", "fxLayout.gt-xs": "fxLayout.gt-xs", "fxLayout.gt-sm": "fxLayout.gt-sm", "fxLayout.gt-md": "fxLayout.gt-md", "fxLayout.gt-lg": "fxLayout.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultLayoutDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const cacheMap = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2xheW91dC9sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEVBRWQsYUFBYSxFQUViLFlBQVksR0FHYixNQUFNLDZCQUE2QixDQUFDO0FBRXJDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7O0FBT3ZFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxZQUFZO0lBQ2xELFdBQVcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxPQUFPLEVBQXNCO1FBQ3hELE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPO1lBQ0wsR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU87U0FDcEQsQ0FBQztJQUNKLENBQUM7OytHQVBVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBREwsTUFBTTsyRkFDbkIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFXbEMsTUFBTSxNQUFNLEdBQUc7SUFDYixVQUFVO0lBQ1YsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0NBQ2pCLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUVILE1BQU0sT0FBTyxlQUFnQixTQUFRLGNBQWM7SUFHakQsWUFDRSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFnQyxFQUNoQyxPQUF3QixFQUNPLE9BQTRCO1FBRTNELEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUZqQixZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQVAxQyxrQkFBYSxHQUFHLFFBQVEsQ0FBQztRQVUxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRWtCLGVBQWUsQ0FBQyxLQUFhO1FBQzlDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxtQkFBbUI7WUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyRCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs0R0ExQlUsZUFBZSxvSUFRaEIsYUFBYTtnR0FSWixlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFNBQVM7OzBCQVNMLE1BQU07MkJBQUMsYUFBYTs7QUFzQnpCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxlQUFlO0lBRDNEOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzttSEFGWSxzQkFBc0I7dUdBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7QUFNL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBPbkNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIExheW91dENvbmZpZ09wdGlvbnMsXG4gIExBWU9VVF9DT05GSUcsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbmltcG9ydCB7IGJ1aWxkTGF5b3V0Q1NTIH0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0U3R5bGVEaXNwbGF5IHtcbiAgcmVhZG9ubHkgZGlzcGxheTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExheW91dFN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHsgZGlzcGxheSB9OiBMYXlvdXRTdHlsZURpc3BsYXkpIHtcbiAgICBjb25zdCBjc3MgPSBidWlsZExheW91dENTUyhpbnB1dCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmNzcyxcbiAgICAgIGRpc3BsYXk6IGRpc3BsYXkgPT09ICdub25lJyA/IGRpc3BsYXkgOiBjc3MuZGlzcGxheSxcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2Z4TGF5b3V0JyxcbiAgJ2Z4TGF5b3V0LnhzJyxcbiAgJ2Z4TGF5b3V0LnNtJyxcbiAgJ2Z4TGF5b3V0Lm1kJyxcbiAgJ2Z4TGF5b3V0LmxnJyxcbiAgJ2Z4TGF5b3V0LnhsJyxcbiAgJ2Z4TGF5b3V0Lmx0LXNtJyxcbiAgJ2Z4TGF5b3V0Lmx0LW1kJyxcbiAgJ2Z4TGF5b3V0Lmx0LWxnJyxcbiAgJ2Z4TGF5b3V0Lmx0LXhsJyxcbiAgJ2Z4TGF5b3V0Lmd0LXhzJyxcbiAgJ2Z4TGF5b3V0Lmd0LXNtJyxcbiAgJ2Z4TGF5b3V0Lmd0LW1kJyxcbiAgJ2Z4TGF5b3V0Lmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4TGF5b3V0XSwgW2Z4TGF5b3V0LnhzXSwgW2Z4TGF5b3V0LnNtXSwgW2Z4TGF5b3V0Lm1kXSxcbiAgW2Z4TGF5b3V0LmxnXSwgW2Z4TGF5b3V0LnhsXSwgW2Z4TGF5b3V0Lmx0LXNtXSwgW2Z4TGF5b3V0Lmx0LW1kXSxcbiAgW2Z4TGF5b3V0Lmx0LWxnXSwgW2Z4TGF5b3V0Lmx0LXhsXSwgW2Z4TGF5b3V0Lmd0LXhzXSwgW2Z4TGF5b3V0Lmd0LXNtXSxcbiAgW2Z4TGF5b3V0Lmd0LW1kXSwgW2Z4TGF5b3V0Lmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnbGF5b3V0JyBmbGV4Ym94IHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBEZWZpbmVzIHRoZSBwb3NpdGlvbmluZyBmbG93IGRpcmVjdGlvbiBmb3IgdGhlIGNoaWxkIGVsZW1lbnRzOiByb3cgb3IgY29sdW1uXG4gKiBPcHRpb25hbCB2YWx1ZXM6IGNvbHVtbiBvciByb3cgKGRlZmF1bHQpXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWxtYW5hYy9wcm9wZXJ0aWVzL2YvZmxleC1kaXJlY3Rpb24vXG4gKlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBMYXlvdXREaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2xheW91dCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVVdGlsczogU3R5bGVVdGlscyxcbiAgICBzdHlsZUJ1aWxkZXI6IExheW91dFN0eWxlQnVpbGRlcixcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgQEluamVjdChMQVlPVVRfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IExheW91dENvbmZpZ09wdGlvbnNcbiAgKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVVdGlscywgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKGlucHV0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBkZXRlY3RMYXlvdXREaXNwbGF5ID0gdGhpcy5fY29uZmlnLmRldGVjdExheW91dERpc3BsYXk7XG4gICAgY29uc3QgZGlzcGxheSA9IGRldGVjdExheW91dERpc3BsYXlcbiAgICAgID8gdGhpcy5zdHlsZXIubG9va3VwU3R5bGUodGhpcy5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScpXG4gICAgICA6ICcnO1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IGNhY2hlTWFwLmdldChkaXNwbGF5KSA/PyBuZXcgTWFwKCk7XG4gICAgY2FjaGVNYXAuc2V0KGRpc3BsYXksIHRoaXMuc3R5bGVDYWNoZSk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50VmFsdWUgIT09IGlucHV0KSB7XG4gICAgICB0aGlzLmFkZFN0eWxlcyhpbnB1dCwgeyBkaXNwbGF5IH0pO1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSBpbnB1dDtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0TGF5b3V0RGlyZWN0aXZlIGV4dGVuZHMgTGF5b3V0RGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxudHlwZSBDYWNoZU1hcCA9IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj47XG5jb25zdCBjYWNoZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBDYWNoZU1hcD4oKTtcbiJdfQ==