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
    /**
     * Capture class assignments so we cache the default classes
     * which are merged with activated styles and used as fallbacks.
     */
    set klass(val) {
        this.ngClassInstance.klass = val;
        this.setValue(val, '');
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: ClassDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i2.NgClass, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.3", type: ClassDirective, inputs: { klass: ["class", "klass"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: ClassDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }, { type: i2.NgClass, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }], propDecorators: { klass: [{
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DefaultClassDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.3", type: DefaultClassDirective, selector: "\n  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n", inputs: { ngClass: "ngClass", "ngClass.xs": "ngClass.xs", "ngClass.sm": "ngClass.sm", "ngClass.md": "ngClass.md", "ngClass.lg": "ngClass.lg", "ngClass.xl": "ngClass.xl", "ngClass.lt-sm": "ngClass.lt-sm", "ngClass.lt-md": "ngClass.lt-md", "ngClass.lt-lg": "ngClass.lt-lg", "ngClass.lt-xl": "ngClass.lt-xl", "ngClass.gt-xs": "ngClass.gt-xs", "ngClass.gt-sm": "ngClass.gt-sm", "ngClass.gt-md": "ngClass.gt-md", "ngClass.gt-lg": "ngClass.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: DefaultClassDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL2NsYXNzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFHTCxRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEdBR2YsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUdwQyxNQUFNLE9BQU8sY0FBZSxTQUFRLGNBQWM7SUFHaEQ7OztPQUdHO0lBQ0gsSUFDSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELFlBQ0UsVUFBc0IsRUFDdEIsTUFBa0IsRUFDbEIsT0FBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsU0FBb0IsRUFDbUIsZUFBd0I7UUFFL0QsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRkgsb0JBQWUsR0FBZixlQUFlLENBQVM7UUFuQjlDLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBc0IzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6Qiw2RkFBNkY7WUFDN0YsMkVBQTJFO1lBQzNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQ2hDLGVBQWUsRUFDZixlQUFlLEVBQ2YsVUFBVSxFQUNWLFNBQVMsQ0FDVixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRWtCLGVBQWUsQ0FBQyxLQUFVO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxxRUFBcUU7SUFDckUsa0JBQWtCO0lBQ2xCLHFFQUFxRTtJQUVyRTs7T0FFRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUM7OEdBbkRVLGNBQWM7a0dBQWQsY0FBYzs7MkZBQWQsY0FBYztrQkFEMUIsU0FBUzs7MEJBcUJMLFFBQVE7OzBCQUFJLElBQUk7eUNBWmYsS0FBSztzQkFEUixLQUFLO3VCQUFDLE9BQU87O0FBK0NoQixNQUFNLE1BQU0sR0FBRztJQUNiLFNBQVM7SUFDVCxZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0NBQ2hCLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7OztDQUloQixDQUFDO0FBRUY7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxjQUFjO0lBRHpEOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzhHQUZZLHFCQUFxQjtrR0FBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQURqQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgTmdDbGFzcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIENsYXNzRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnbmdDbGFzcyc7XG5cbiAgLyoqXG4gICAqIENhcHR1cmUgY2xhc3MgYXNzaWdubWVudHMgc28gd2UgY2FjaGUgdGhlIGRlZmF1bHQgY2xhc3Nlc1xuICAgKiB3aGljaCBhcmUgbWVyZ2VkIHdpdGggYWN0aXZhdGVkIHN0eWxlcyBhbmQgdXNlZCBhcyBmYWxsYmFja3MuXG4gICAqL1xuICBASW5wdXQoJ2NsYXNzJylcbiAgc2V0IGtsYXNzKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2Uua2xhc3MgPSB2YWw7XG4gICAgdGhpcy5zZXRWYWx1ZSh2YWwsICcnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcixcbiAgICBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBrZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICByZW5kZXJlcjI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByb3RlY3RlZCByZWFkb25seSBuZ0NsYXNzSW5zdGFuY2U6IE5nQ2xhc3NcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgbnVsbCEsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgaWYgKCF0aGlzLm5nQ2xhc3NJbnN0YW5jZSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIE5nQ2xhc3MgRGlyZWN0aXZlIGluc3RhbmNlIG9ubHkgaWYgYG5nQ2xhc3M9XCJcImAgaGFzIE5PVCBiZWVuIGRlZmluZWQgb25cbiAgICAgIC8vIHRoZSBzYW1lIGhvc3QgZWxlbWVudDsgc2luY2UgdGhlIHJlc3BvbnNpdmUgdmFyaWF0aW9ucyBtYXkgYmUgZGVmaW5lZC4uLlxuICAgICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2UgPSBuZXcgTmdDbGFzcyhcbiAgICAgICAgaXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBrZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIGVsZW1lbnRSZWYsXG4gICAgICAgIHJlbmRlcmVyMlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5zZXRWYWx1ZSgnJywgJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2UubmdDbGFzcyA9IHZhbHVlO1xuICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLm5nRG9DaGVjaygpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIExpZmVjeWNsZSBIb29rc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogRm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lm9uUHVzaCBhbmQgbmdPbkNoYW5nZXMoKSB1cGRhdGVzXG4gICAqL1xuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2UubmdEb0NoZWNrKCk7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnbmdDbGFzcycsXG4gICduZ0NsYXNzLnhzJyxcbiAgJ25nQ2xhc3Muc20nLFxuICAnbmdDbGFzcy5tZCcsXG4gICduZ0NsYXNzLmxnJyxcbiAgJ25nQ2xhc3MueGwnLFxuICAnbmdDbGFzcy5sdC1zbScsXG4gICduZ0NsYXNzLmx0LW1kJyxcbiAgJ25nQ2xhc3MubHQtbGcnLFxuICAnbmdDbGFzcy5sdC14bCcsXG4gICduZ0NsYXNzLmd0LXhzJyxcbiAgJ25nQ2xhc3MuZ3Qtc20nLFxuICAnbmdDbGFzcy5ndC1tZCcsXG4gICduZ0NsYXNzLmd0LWxnJyxcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbbmdDbGFzc10sIFtuZ0NsYXNzLnhzXSwgW25nQ2xhc3Muc21dLCBbbmdDbGFzcy5tZF0sIFtuZ0NsYXNzLmxnXSwgW25nQ2xhc3MueGxdLFxuICBbbmdDbGFzcy5sdC1zbV0sIFtuZ0NsYXNzLmx0LW1kXSwgW25nQ2xhc3MubHQtbGddLCBbbmdDbGFzcy5sdC14bF0sXG4gIFtuZ0NsYXNzLmd0LXhzXSwgW25nQ2xhc3MuZ3Qtc21dLCBbbmdDbGFzcy5ndC1tZF0sIFtuZ0NsYXNzLmd0LWxnXVxuYDtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIHJlc3BvbnNpdmUgc3VwcG9ydCBmb3IgbmdDbGFzcy5cbiAqIFRoaXMgbWFpbnRhaW5zIHRoZSBjb3JlIGZ1bmN0aW9uYWxpdHkgb2YgJ25nQ2xhc3MnIGFuZCBhZGRzIHJlc3BvbnNpdmUgQVBJXG4gKiBOb3RlOiB0aGlzIGNsYXNzIGlzIGEgbm8tb3Agd2hlbiByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdENsYXNzRGlyZWN0aXZlIGV4dGVuZHMgQ2xhc3NEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19