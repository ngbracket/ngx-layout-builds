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
class ClassDirective extends BaseDirective2 {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ClassDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i2.NgClass, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0", type: ClassDirective, inputs: { klass: ["class", "klass"] }, usesInheritance: true, ngImport: i0 }); }
}
export { ClassDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ClassDirective, decorators: [{
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
class DefaultClassDirective extends ClassDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: DefaultClassDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0", type: DefaultClassDirective, selector: "\n  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n", inputs: { ngClass: "ngClass", "ngClass.xs": "ngClass.xs", "ngClass.sm": "ngClass.sm", "ngClass.md": "ngClass.md", "ngClass.lg": "ngClass.lg", "ngClass.xl": "ngClass.xl", "ngClass.lt-sm": "ngClass.lt-sm", "ngClass.lt-md": "ngClass.lt-md", "ngClass.lt-lg": "ngClass.lt-lg", "ngClass.lt-xl": "ngClass.lt-xl", "ngClass.gt-xs": "ngClass.gt-xs", "ngClass.gt-sm": "ngClass.gt-sm", "ngClass.gt-md": "ngClass.gt-md", "ngClass.gt-lg": "ngClass.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
export { DefaultClassDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: DefaultClassDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL2NsYXNzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFHTCxRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEdBR2YsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUVwQyxNQUNhLGNBQWUsU0FBUSxjQUFjO0lBR2hEOzs7T0FHRztJQUNILElBQ0ksS0FBSyxDQUFDLEdBQVc7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxZQUNFLFVBQXNCLEVBQ3RCLE1BQWtCLEVBQ2xCLE9BQXdCLEVBQ3hCLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ2hDLFNBQW9CLEVBQ21CLGVBQXdCO1FBRS9ELEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUZILG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBbkI5QyxrQkFBYSxHQUFHLFNBQVMsQ0FBQztRQXNCM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsNkZBQTZGO1lBQzdGLDJFQUEyRTtZQUMzRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUNoQyxlQUFlLEVBQ2YsZUFBZSxFQUNmLFVBQVUsRUFDVixTQUFTLENBQ1YsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVrQixlQUFlLENBQUMsS0FBVTtRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLGtCQUFrQjtJQUNsQixxRUFBcUU7SUFFckU7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzhHQW5EVSxjQUFjO2tHQUFkLGNBQWM7O1NBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTOzswQkFxQkwsUUFBUTs7MEJBQUksSUFBSTs0Q0FaZixLQUFLO3NCQURSLEtBQUs7dUJBQUMsT0FBTzs7QUErQ2hCLE1BQU0sTUFBTSxHQUFHO0lBQ2IsU0FBUztJQUNULFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7Q0FDaEIsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7O0NBSWhCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFDYSxxQkFBc0IsU0FBUSxjQUFjO0lBRHpEOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzhHQUZZLHFCQUFxQjtrR0FBckIscUJBQXFCOztTQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE5nQ2xhc3MgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBDbGFzc0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIGltcGxlbWVudHMgRG9DaGVjayB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ25nQ2xhc3MnO1xuXG4gIC8qKlxuICAgKiBDYXB0dXJlIGNsYXNzIGFzc2lnbm1lbnRzIHNvIHdlIGNhY2hlIHRoZSBkZWZhdWx0IGNsYXNzZXNcbiAgICogd2hpY2ggYXJlIG1lcmdlZCB3aXRoIGFjdGl2YXRlZCBzdHlsZXMgYW5kIHVzZWQgYXMgZmFsbGJhY2tzLlxuICAgKi9cbiAgQElucHV0KCdjbGFzcycpXG4gIHNldCBrbGFzcyh2YWw6IHN0cmluZykge1xuICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLmtsYXNzID0gdmFsO1xuICAgIHRoaXMuc2V0VmFsdWUodmFsLCAnJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAga2V5VmFsdWVEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdDbGFzc0luc3RhbmNlOiBOZ0NsYXNzXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIG51bGwhLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIGlmICghdGhpcy5uZ0NsYXNzSW5zdGFuY2UpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBOZ0NsYXNzIERpcmVjdGl2ZSBpbnN0YW5jZSBvbmx5IGlmIGBuZ0NsYXNzPVwiXCJgIGhhcyBOT1QgYmVlbiBkZWZpbmVkIG9uXG4gICAgICAvLyB0aGUgc2FtZSBob3N0IGVsZW1lbnQ7IHNpbmNlIHRoZSByZXNwb25zaXZlIHZhcmlhdGlvbnMgbWF5IGJlIGRlZmluZWQuLi5cbiAgICAgIHRoaXMubmdDbGFzc0luc3RhbmNlID0gbmV3IE5nQ2xhc3MoXG4gICAgICAgIGl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAga2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBlbGVtZW50UmVmLFxuICAgICAgICByZW5kZXJlcjJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuc2V0VmFsdWUoJycsICcnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLm5nQ2xhc3MgPSB2YWx1ZTtcbiAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZS5uZ0RvQ2hlY2soKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBMaWZlY3ljbGUgSG9va3NcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLyoqXG4gICAqIEZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5vblB1c2ggYW5kIG5nT25DaGFuZ2VzKCkgdXBkYXRlc1xuICAgKi9cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLm5nRG9DaGVjaygpO1xuICB9XG59XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ25nQ2xhc3MnLFxuICAnbmdDbGFzcy54cycsXG4gICduZ0NsYXNzLnNtJyxcbiAgJ25nQ2xhc3MubWQnLFxuICAnbmdDbGFzcy5sZycsXG4gICduZ0NsYXNzLnhsJyxcbiAgJ25nQ2xhc3MubHQtc20nLFxuICAnbmdDbGFzcy5sdC1tZCcsXG4gICduZ0NsYXNzLmx0LWxnJyxcbiAgJ25nQ2xhc3MubHQteGwnLFxuICAnbmdDbGFzcy5ndC14cycsXG4gICduZ0NsYXNzLmd0LXNtJyxcbiAgJ25nQ2xhc3MuZ3QtbWQnLFxuICAnbmdDbGFzcy5ndC1sZycsXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW25nQ2xhc3NdLCBbbmdDbGFzcy54c10sIFtuZ0NsYXNzLnNtXSwgW25nQ2xhc3MubWRdLCBbbmdDbGFzcy5sZ10sIFtuZ0NsYXNzLnhsXSxcbiAgW25nQ2xhc3MubHQtc21dLCBbbmdDbGFzcy5sdC1tZF0sIFtuZ0NsYXNzLmx0LWxnXSwgW25nQ2xhc3MubHQteGxdLFxuICBbbmdDbGFzcy5ndC14c10sIFtuZ0NsYXNzLmd0LXNtXSwgW25nQ2xhc3MuZ3QtbWRdLCBbbmdDbGFzcy5ndC1sZ11cbmA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCByZXNwb25zaXZlIHN1cHBvcnQgZm9yIG5nQ2xhc3MuXG4gKiBUaGlzIG1haW50YWlucyB0aGUgY29yZSBmdW5jdGlvbmFsaXR5IG9mICduZ0NsYXNzJyBhbmQgYWRkcyByZXNwb25zaXZlIEFQSVxuICogTm90ZTogdGhpcyBjbGFzcyBpcyBhIG5vLW9wIHdoZW4gcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRDbGFzc0RpcmVjdGl2ZSBleHRlbmRzIENsYXNzRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==