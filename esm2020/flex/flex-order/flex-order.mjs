/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbrackets/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbrackets/ngx-layout/core";
export class FlexOrderStyleBuilder extends StyleBuilder {
    buildStyles(value) {
        return { order: (value && parseInt(value, 10)) || '' };
    }
}
FlexOrderStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOrderStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
FlexOrderStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOrderStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOrderStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'fxFlexOrder',
    'fxFlexOrder.xs',
    'fxFlexOrder.sm',
    'fxFlexOrder.md',
    'fxFlexOrder.lg',
    'fxFlexOrder.xl',
    'fxFlexOrder.lt-sm',
    'fxFlexOrder.lt-md',
    'fxFlexOrder.lt-lg',
    'fxFlexOrder.lt-xl',
    'fxFlexOrder.gt-xs',
    'fxFlexOrder.gt-sm',
    'fxFlexOrder.gt-md',
    'fxFlexOrder.gt-lg',
];
const selector = `
  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],
  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],
  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],
  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]
`;
/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
export class FlexOrderDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'flex-order';
        this.styleCache = flexOrderCache;
        this.init();
    }
}
FlexOrderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOrderDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexOrderStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
FlexOrderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: FlexOrderDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOrderDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexOrderStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const flexOrderCache = new Map();
export class DefaultFlexOrderDirective extends FlexOrderDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultFlexOrderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultFlexOrderDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultFlexOrderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultFlexOrderDirective, selector: "\n  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],\n  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],\n  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],\n  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]\n", inputs: { fxFlexOrder: "fxFlexOrder", "fxFlexOrder.xs": "fxFlexOrder.xs", "fxFlexOrder.sm": "fxFlexOrder.sm", "fxFlexOrder.md": "fxFlexOrder.md", "fxFlexOrder.lg": "fxFlexOrder.lg", "fxFlexOrder.xl": "fxFlexOrder.xl", "fxFlexOrder.lt-sm": "fxFlexOrder.lt-sm", "fxFlexOrder.lt-md": "fxFlexOrder.lt-md", "fxFlexOrder.lt-lg": "fxFlexOrder.lt-lg", "fxFlexOrder.lt-xl": "fxFlexOrder.lt-xl", "fxFlexOrder.gt-xs": "fxFlexOrder.gt-xs", "fxFlexOrder.gt-sm": "fxFlexOrder.gt-sm", "fxFlexOrder.gt-md": "fxFlexOrder.gt-md", "fxFlexOrder.gt-lg": "fxFlexOrder.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultFlexOrderDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9mbGV4LW9yZGVyL2ZsZXgtb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBR3JDLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZO0lBQ3JELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3pELENBQUM7O2tIQUhVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFPbEMsTUFBTSxNQUFNLEdBQUc7SUFDYixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0NBQ3BCLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsY0FBYztJQUdwRCxZQUNFLEtBQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLFlBQW1DLEVBQ25DLE9BQXdCO1FBRXhCLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQVIvQixrQkFBYSxHQUFHLFlBQVksQ0FBQztRQVk3QixlQUFVLEdBQUcsY0FBYyxDQUFDO1FBSDdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7OytHQVhVLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFNBQVM7O0FBaUJWLE1BQU0sY0FBYyxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRy9ELE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxrQkFBa0I7SUFEakU7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O3NIQUZZLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmxleE9yZGVyU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXModmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB7IG9yZGVyOiAodmFsdWUgJiYgcGFyc2VJbnQodmFsdWUsIDEwKSkgfHwgJycgfTtcbiAgfVxufVxuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdmeEZsZXhPcmRlcicsXG4gICdmeEZsZXhPcmRlci54cycsXG4gICdmeEZsZXhPcmRlci5zbScsXG4gICdmeEZsZXhPcmRlci5tZCcsXG4gICdmeEZsZXhPcmRlci5sZycsXG4gICdmeEZsZXhPcmRlci54bCcsXG4gICdmeEZsZXhPcmRlci5sdC1zbScsXG4gICdmeEZsZXhPcmRlci5sdC1tZCcsXG4gICdmeEZsZXhPcmRlci5sdC1sZycsXG4gICdmeEZsZXhPcmRlci5sdC14bCcsXG4gICdmeEZsZXhPcmRlci5ndC14cycsXG4gICdmeEZsZXhPcmRlci5ndC1zbScsXG4gICdmeEZsZXhPcmRlci5ndC1tZCcsXG4gICdmeEZsZXhPcmRlci5ndC1sZycsXG5dO1xuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtmeEZsZXhPcmRlcl0sIFtmeEZsZXhPcmRlci54c10sIFtmeEZsZXhPcmRlci5zbV0sIFtmeEZsZXhPcmRlci5tZF0sXG4gIFtmeEZsZXhPcmRlci5sZ10sIFtmeEZsZXhPcmRlci54bF0sIFtmeEZsZXhPcmRlci5sdC1zbV0sIFtmeEZsZXhPcmRlci5sdC1tZF0sXG4gIFtmeEZsZXhPcmRlci5sdC1sZ10sIFtmeEZsZXhPcmRlci5sdC14bF0sIFtmeEZsZXhPcmRlci5ndC14c10sIFtmeEZsZXhPcmRlci5ndC1zbV0sXG4gIFtmeEZsZXhPcmRlci5ndC1tZF0sIFtmeEZsZXhPcmRlci5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2ZsZXgtb3JkZXInIGZsZXhib3ggc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIHBvc2l0aW9uYWwgb3JkZXJpbmcgb2YgdGhlIGVsZW1lbnQgaW4gYSBzb3J0ZWQgbGF5b3V0IGNvbnRhaW5lclxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL2FsbWFuYWMvcHJvcGVydGllcy9vL29yZGVyL1xuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBGbGV4T3JkZXJEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2ZsZXgtb3JkZXInO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgc3R5bGVCdWlsZGVyOiBGbGV4T3JkZXJTdHlsZUJ1aWxkZXIsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0eWxlQ2FjaGUgPSBmbGV4T3JkZXJDYWNoZTtcbn1cblxuY29uc3QgZmxleE9yZGVyQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZsZXhPcmRlckRpcmVjdGl2ZSBleHRlbmRzIEZsZXhPcmRlckRpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=