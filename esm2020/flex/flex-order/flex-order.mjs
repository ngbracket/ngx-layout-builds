/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
export class FlexOrderStyleBuilder extends StyleBuilder {
    buildStyles(value) {
        return { order: (value && parseInt(value, 10)) || '' };
    }
}
FlexOrderStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOrderStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
FlexOrderStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOrderStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOrderStyleBuilder, decorators: [{
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
FlexOrderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOrderDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexOrderStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
FlexOrderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: FlexOrderDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOrderDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexOrderStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const flexOrderCache = new Map();
export class DefaultFlexOrderDirective extends FlexOrderDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultFlexOrderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultFlexOrderDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultFlexOrderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: DefaultFlexOrderDirective, selector: "\n  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],\n  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],\n  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],\n  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]\n", inputs: { fxFlexOrder: "fxFlexOrder", "fxFlexOrder.xs": "fxFlexOrder.xs", "fxFlexOrder.sm": "fxFlexOrder.sm", "fxFlexOrder.md": "fxFlexOrder.md", "fxFlexOrder.lg": "fxFlexOrder.lg", "fxFlexOrder.xl": "fxFlexOrder.xl", "fxFlexOrder.lt-sm": "fxFlexOrder.lt-sm", "fxFlexOrder.lt-md": "fxFlexOrder.lt-md", "fxFlexOrder.lt-lg": "fxFlexOrder.lt-lg", "fxFlexOrder.lt-xl": "fxFlexOrder.lt-xl", "fxFlexOrder.gt-xs": "fxFlexOrder.gt-xs", "fxFlexOrder.gt-sm": "fxFlexOrder.gt-sm", "fxFlexOrder.gt-md": "fxFlexOrder.gt-md", "fxFlexOrder.gt-lg": "fxFlexOrder.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultFlexOrderDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9mbGV4LW9yZGVyL2ZsZXgtb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBR3BDLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZO0lBQ3JELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3pELENBQUM7O2tIQUhVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFPbEMsTUFBTSxNQUFNLEdBQUc7SUFDYixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0NBQ3BCLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsY0FBYztJQUdwRCxZQUNFLEtBQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLFlBQW1DLEVBQ25DLE9BQXdCO1FBRXhCLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQVIvQixrQkFBYSxHQUFHLFlBQVksQ0FBQztRQVk3QixlQUFVLEdBQUcsY0FBYyxDQUFDO1FBSDdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7OytHQVhVLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFNBQVM7O0FBaUJWLE1BQU0sY0FBYyxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRy9ELE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxrQkFBa0I7SUFEakU7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O3NIQUZZLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGbGV4T3JkZXJTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHsgb3JkZXI6ICh2YWx1ZSAmJiBwYXJzZUludCh2YWx1ZSwgMTApKSB8fCAnJyB9O1xuICB9XG59XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2Z4RmxleE9yZGVyJyxcbiAgJ2Z4RmxleE9yZGVyLnhzJyxcbiAgJ2Z4RmxleE9yZGVyLnNtJyxcbiAgJ2Z4RmxleE9yZGVyLm1kJyxcbiAgJ2Z4RmxleE9yZGVyLmxnJyxcbiAgJ2Z4RmxleE9yZGVyLnhsJyxcbiAgJ2Z4RmxleE9yZGVyLmx0LXNtJyxcbiAgJ2Z4RmxleE9yZGVyLmx0LW1kJyxcbiAgJ2Z4RmxleE9yZGVyLmx0LWxnJyxcbiAgJ2Z4RmxleE9yZGVyLmx0LXhsJyxcbiAgJ2Z4RmxleE9yZGVyLmd0LXhzJyxcbiAgJ2Z4RmxleE9yZGVyLmd0LXNtJyxcbiAgJ2Z4RmxleE9yZGVyLmd0LW1kJyxcbiAgJ2Z4RmxleE9yZGVyLmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4RmxleE9yZGVyXSwgW2Z4RmxleE9yZGVyLnhzXSwgW2Z4RmxleE9yZGVyLnNtXSwgW2Z4RmxleE9yZGVyLm1kXSxcbiAgW2Z4RmxleE9yZGVyLmxnXSwgW2Z4RmxleE9yZGVyLnhsXSwgW2Z4RmxleE9yZGVyLmx0LXNtXSwgW2Z4RmxleE9yZGVyLmx0LW1kXSxcbiAgW2Z4RmxleE9yZGVyLmx0LWxnXSwgW2Z4RmxleE9yZGVyLmx0LXhsXSwgW2Z4RmxleE9yZGVyLmd0LXhzXSwgW2Z4RmxleE9yZGVyLmd0LXNtXSxcbiAgW2Z4RmxleE9yZGVyLmd0LW1kXSwgW2Z4RmxleE9yZGVyLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnZmxleC1vcmRlcicgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgcG9zaXRpb25hbCBvcmRlcmluZyBvZiB0aGUgZWxlbWVudCBpbiBhIHNvcnRlZCBsYXlvdXQgY29udGFpbmVyXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWxtYW5hYy9wcm9wZXJ0aWVzL28vb3JkZXIvXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEZsZXhPcmRlckRpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZmxleC1vcmRlcic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVVdGlsczogU3R5bGVVdGlscyxcbiAgICBzdHlsZUJ1aWxkZXI6IEZsZXhPcmRlclN0eWxlQnVpbGRlcixcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVVdGlscywgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3R5bGVDYWNoZSA9IGZsZXhPcmRlckNhY2hlO1xufVxuXG5jb25zdCBmbGV4T3JkZXJDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmxleE9yZGVyRGlyZWN0aXZlIGV4dGVuZHMgRmxleE9yZGVyRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==