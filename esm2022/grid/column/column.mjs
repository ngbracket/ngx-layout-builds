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
const DEFAULT_VALUE = 'auto';
class GridColumnStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-column': input || DEFAULT_VALUE };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: GridColumnStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: GridColumnStyleBuilder, providedIn: 'root' }); }
}
export { GridColumnStyleBuilder };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: GridColumnStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
class GridColumnDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-column';
        this.styleCache = columnCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: GridColumnDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-rc.0", type: GridColumnDirective, usesInheritance: true, ngImport: i0 }); }
}
export { GridColumnDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: GridColumnDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridColumnStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; } });
const columnCache = new Map();
const inputs = [
    'gdColumn',
    'gdColumn.xs',
    'gdColumn.sm',
    'gdColumn.md',
    'gdColumn.lg',
    'gdColumn.xl',
    'gdColumn.lt-sm',
    'gdColumn.lt-md',
    'gdColumn.lt-lg',
    'gdColumn.lt-xl',
    'gdColumn.gt-xs',
    'gdColumn.gt-sm',
    'gdColumn.gt-md',
    'gdColumn.gt-lg',
];
const selector = `
  [gdColumn],
  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],
  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],
  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]
`;
/**
 * 'grid-column' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
class DefaultGridColumnDirective extends GridColumnDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: DefaultGridColumnDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-rc.0", type: DefaultGridColumnDirective, selector: "\n  [gdColumn],\n  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],\n  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],\n  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]\n", inputs: { gdColumn: "gdColumn", "gdColumn.xs": "gdColumn.xs", "gdColumn.sm": "gdColumn.sm", "gdColumn.md": "gdColumn.md", "gdColumn.lg": "gdColumn.lg", "gdColumn.xl": "gdColumn.xl", "gdColumn.lt-sm": "gdColumn.lt-sm", "gdColumn.lt-md": "gdColumn.lt-md", "gdColumn.lt-lg": "gdColumn.lt-lg", "gdColumn.lt-xl": "gdColumn.lt-xl", "gdColumn.gt-xs": "gdColumn.gt-xs", "gdColumn.gt-sm": "gdColumn.gt-sm", "gdColumn.gt-md": "gdColumn.gt-md", "gdColumn.gt-lg": "gdColumn.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
export { DefaultGridColumnDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: DefaultGridColumnDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL2NvbHVtbi9jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBRXBDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUU3QixNQUNhLHNCQUF1QixTQUFRLFlBQVk7SUFDdEQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLElBQUksYUFBYSxFQUFFLENBQUM7SUFDbkQsQ0FBQzttSEFIVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQURULE1BQU07O1NBQ25CLHNCQUFzQjtnR0FBdEIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFPbEMsTUFDYSxtQkFBb0IsU0FBUSxjQUFjO0lBR3JELFlBQ0UsVUFBc0IsRUFDdEIsWUFBb0MsRUFDcEMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUmhDLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBWTlCLGVBQVUsR0FBRyxXQUFXLENBQUM7UUFIMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzttSEFYVSxtQkFBbUI7dUdBQW5CLG1CQUFtQjs7U0FBbkIsbUJBQW1CO2dHQUFuQixtQkFBbUI7a0JBRC9CLFNBQVM7O0FBaUJWLE1BQU0sV0FBVyxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTVELE1BQU0sTUFBTSxHQUFHO0lBQ2IsVUFBVTtJQUNWLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtDQUNqQixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7O0NBS2hCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFDYSwwQkFBMkIsU0FBUSxtQkFBbUI7SUFEbkU7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7bUhBRlksMEJBQTBCO3VHQUExQiwwQkFBMEI7O1NBQTFCLDBCQUEwQjtnR0FBMUIsMEJBQTBCO2tCQUR0QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJ2F1dG8nO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEdyaWRDb2x1bW5TdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHsgJ2dyaWQtY29sdW1uJzogaW5wdXQgfHwgREVGQVVMVF9WQUxVRSB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEdyaWRDb2x1bW5EaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtY29sdW1uJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlQnVpbGRlcjogR3JpZENvbHVtblN0eWxlQnVpbGRlcixcbiAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gY29sdW1uQ2FjaGU7XG59XG5cbmNvbnN0IGNvbHVtbkNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZENvbHVtbicsXG4gICdnZENvbHVtbi54cycsXG4gICdnZENvbHVtbi5zbScsXG4gICdnZENvbHVtbi5tZCcsXG4gICdnZENvbHVtbi5sZycsXG4gICdnZENvbHVtbi54bCcsXG4gICdnZENvbHVtbi5sdC1zbScsXG4gICdnZENvbHVtbi5sdC1tZCcsXG4gICdnZENvbHVtbi5sdC1sZycsXG4gICdnZENvbHVtbi5sdC14bCcsXG4gICdnZENvbHVtbi5ndC14cycsXG4gICdnZENvbHVtbi5ndC1zbScsXG4gICdnZENvbHVtbi5ndC1tZCcsXG4gICdnZENvbHVtbi5ndC1sZycsXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkQ29sdW1uXSxcbiAgW2dkQ29sdW1uLnhzXSwgW2dkQ29sdW1uLnNtXSwgW2dkQ29sdW1uLm1kXSwgW2dkQ29sdW1uLmxnXSwgW2dkQ29sdW1uLnhsXSxcbiAgW2dkQ29sdW1uLmx0LXNtXSwgW2dkQ29sdW1uLmx0LW1kXSwgW2dkQ29sdW1uLmx0LWxnXSwgW2dkQ29sdW1uLmx0LXhsXSxcbiAgW2dkQ29sdW1uLmd0LXhzXSwgW2dkQ29sdW1uLmd0LXNtXSwgW2dkQ29sdW1uLmd0LW1kXSwgW2dkQ29sdW1uLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnZ3JpZC1jb2x1bW4nIENTUyBHcmlkIHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBDb25maWd1cmVzIHRoZSBuYW1lIG9yIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBncmlkXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2NvbXBsZXRlLWd1aWRlLWdyaWQvI2FydGljbGUtaGVhZGVyLWlkLTI2XG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEdyaWRDb2x1bW5EaXJlY3RpdmUgZXh0ZW5kcyBHcmlkQ29sdW1uRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==