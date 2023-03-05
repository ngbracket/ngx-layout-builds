/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgClass } from '@angular/common';
import { Directive, Input, Optional, Self, } from '@angular/core';
import { BaseDirective2, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
import * as i2 from "@angular/common";
export class ClassDirective extends BaseDirective2 {
    constructor(elementRef, styler, marshal, iterableDiffers, keyValueDiffers, renderer2, ngClassInstance) {
        super(elementRef, null, styler, marshal);
        this.ngClassInstance = ngClassInstance;
        this.DIRECTIVE_KEY = 'ngClass';
        if (!this.ngClassInstance) {
            // Create an instance NgClass Directive instance only if `ngClass=""` has NOT been defined on
            // the same host element; since the responsive variations may be defined...
            this.ngClassInstance = new NgClass(iterableDiffers, keyValueDiffers, elementRef, renderer2);
        }
        this.init();
        this.setValue('', '');
    }
    /**
     * Capture class assignments so we cache the default classes
     * which are merged with activated styles and used as fallbacks.
     */
    set klass(val) {
        this.ngClassInstance.klass = val;
        this.setValue(val, '');
    }
    updateWithValue(value) {
        this.ngClassInstance.ngClass = value;
        this.ngClassInstance.ngDoCheck();
    }
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    ngDoCheck() {
        this.ngClassInstance.ngDoCheck();
    }
}
ClassDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ClassDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i2.NgClass, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
ClassDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: ClassDirective, inputs: { klass: ["class", "klass"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ClassDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }, { type: i2.NgClass, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { klass: [{
                type: Input,
                args: ['class']
            }] } });
const inputs = [
    'ngClass',
    'ngClass.xs',
    'ngClass.sm',
    'ngClass.md',
    'ngClass.lg',
    'ngClass.xl',
    'ngClass.lt-sm',
    'ngClass.lt-md',
    'ngClass.lt-lg',
    'ngClass.lt-xl',
    'ngClass.gt-xs',
    'ngClass.gt-sm',
    'ngClass.gt-md',
    'ngClass.gt-lg',
];
const selector = `
  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],
  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],
  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]
`;
/**
 * Directive to add responsive support for ngClass.
 * This maintains the core functionality of 'ngClass' and adds responsive API
 * Note: this class is a no-op when rendered on the server
 */
export class DefaultClassDirective extends ClassDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultClassDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultClassDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultClassDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: DefaultClassDirective, selector: "\n  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n", inputs: { ngClass: "ngClass", "ngClass.xs": "ngClass.xs", "ngClass.sm": "ngClass.sm", "ngClass.md": "ngClass.md", "ngClass.lg": "ngClass.lg", "ngClass.xl": "ngClass.xl", "ngClass.lt-sm": "ngClass.lt-sm", "ngClass.lt-md": "ngClass.lt-md", "ngClass.lt-lg": "ngClass.lt-lg", "ngClass.lt-xl": "ngClass.lt-xl", "ngClass.gt-xs": "ngClass.gt-xs", "ngClass.gt-sm": "ngClass.gt-sm", "ngClass.gt-md": "ngClass.gt-md", "ngClass.gt-lg": "ngClass.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultClassDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL2NsYXNzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFHTCxRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEdBR2YsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUdwQyxNQUFNLE9BQU8sY0FBZSxTQUFRLGNBQWM7SUFhaEQsWUFDRSxVQUFzQixFQUN0QixNQUFrQixFQUNsQixPQUF3QixFQUN4QixlQUFnQyxFQUNoQyxlQUFnQyxFQUNoQyxTQUFvQixFQUNtQixlQUF3QjtRQUUvRCxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFGSCxvQkFBZSxHQUFmLGVBQWUsQ0FBUztRQW5COUMsa0JBQWEsR0FBRyxTQUFTLENBQUM7UUFzQjNDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLDZGQUE2RjtZQUM3RiwyRUFBMkU7WUFDM0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FDaEMsZUFBZSxFQUNmLGVBQWUsRUFDZixVQUFVLEVBQ1YsU0FBUyxDQUNWLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFoQ0Q7OztPQUdHO0lBQ0gsSUFDSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQTBCa0IsZUFBZSxDQUFDLEtBQVU7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSxrQkFBa0I7SUFDbEIscUVBQXFFO0lBRXJFOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7MkdBbkRVLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTOzswQkFxQkwsUUFBUTs7MEJBQUksSUFBSTs0Q0FaZixLQUFLO3NCQURSLEtBQUs7dUJBQUMsT0FBTzs7QUErQ2hCLE1BQU0sTUFBTSxHQUFHO0lBQ2IsU0FBUztJQUNULFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7Q0FDaEIsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7O0NBSWhCLENBQUM7QUFFRjs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGNBQWM7SUFEekQ7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O2tIQUZZLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOZ0NsYXNzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQ2xhc3NEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICduZ0NsYXNzJztcblxuICAvKipcbiAgICogQ2FwdHVyZSBjbGFzcyBhc3NpZ25tZW50cyBzbyB3ZSBjYWNoZSB0aGUgZGVmYXVsdCBjbGFzc2VzXG4gICAqIHdoaWNoIGFyZSBtZXJnZWQgd2l0aCBhY3RpdmF0ZWQgc3R5bGVzIGFuZCB1c2VkIGFzIGZhbGxiYWNrcy5cbiAgICovXG4gIEBJbnB1dCgnY2xhc3MnKVxuICBzZXQga2xhc3ModmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZS5rbGFzcyA9IHZhbDtcbiAgICB0aGlzLnNldFZhbHVlKHZhbCwgJycpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyLFxuICAgIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIGtleVZhbHVlRGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHJlbmRlcmVyMjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJvdGVjdGVkIHJlYWRvbmx5IG5nQ2xhc3NJbnN0YW5jZTogTmdDbGFzc1xuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBudWxsISwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICBpZiAoIXRoaXMubmdDbGFzc0luc3RhbmNlKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2UgTmdDbGFzcyBEaXJlY3RpdmUgaW5zdGFuY2Ugb25seSBpZiBgbmdDbGFzcz1cIlwiYCBoYXMgTk9UIGJlZW4gZGVmaW5lZCBvblxuICAgICAgLy8gdGhlIHNhbWUgaG9zdCBlbGVtZW50OyBzaW5jZSB0aGUgcmVzcG9uc2l2ZSB2YXJpYXRpb25zIG1heSBiZSBkZWZpbmVkLi4uXG4gICAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZSA9IG5ldyBOZ0NsYXNzKFxuICAgICAgICBpdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIGtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgZWxlbWVudFJlZixcbiAgICAgICAgcmVuZGVyZXIyXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnNldFZhbHVlKCcnLCAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZS5uZ0NsYXNzID0gdmFsdWU7XG4gICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2UubmdEb0NoZWNrKCk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTGlmZWN5Y2xlIEhvb2tzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBGb3IgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kub25QdXNoIGFuZCBuZ09uQ2hhbmdlcygpIHVwZGF0ZXNcbiAgICovXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZS5uZ0RvQ2hlY2soKTtcbiAgfVxufVxuXG5jb25zdCBpbnB1dHMgPSBbXG4gICduZ0NsYXNzJyxcbiAgJ25nQ2xhc3MueHMnLFxuICAnbmdDbGFzcy5zbScsXG4gICduZ0NsYXNzLm1kJyxcbiAgJ25nQ2xhc3MubGcnLFxuICAnbmdDbGFzcy54bCcsXG4gICduZ0NsYXNzLmx0LXNtJyxcbiAgJ25nQ2xhc3MubHQtbWQnLFxuICAnbmdDbGFzcy5sdC1sZycsXG4gICduZ0NsYXNzLmx0LXhsJyxcbiAgJ25nQ2xhc3MuZ3QteHMnLFxuICAnbmdDbGFzcy5ndC1zbScsXG4gICduZ0NsYXNzLmd0LW1kJyxcbiAgJ25nQ2xhc3MuZ3QtbGcnLFxuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtuZ0NsYXNzXSwgW25nQ2xhc3MueHNdLCBbbmdDbGFzcy5zbV0sIFtuZ0NsYXNzLm1kXSwgW25nQ2xhc3MubGddLCBbbmdDbGFzcy54bF0sXG4gIFtuZ0NsYXNzLmx0LXNtXSwgW25nQ2xhc3MubHQtbWRdLCBbbmdDbGFzcy5sdC1sZ10sIFtuZ0NsYXNzLmx0LXhsXSxcbiAgW25nQ2xhc3MuZ3QteHNdLCBbbmdDbGFzcy5ndC1zbV0sIFtuZ0NsYXNzLmd0LW1kXSwgW25nQ2xhc3MuZ3QtbGddXG5gO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgcmVzcG9uc2l2ZSBzdXBwb3J0IGZvciBuZ0NsYXNzLlxuICogVGhpcyBtYWludGFpbnMgdGhlIGNvcmUgZnVuY3Rpb25hbGl0eSBvZiAnbmdDbGFzcycgYW5kIGFkZHMgcmVzcG9uc2l2ZSBBUElcbiAqIE5vdGU6IHRoaXMgY2xhc3MgaXMgYSBuby1vcCB3aGVuIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q2xhc3NEaXJlY3RpdmUgZXh0ZW5kcyBDbGFzc0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=