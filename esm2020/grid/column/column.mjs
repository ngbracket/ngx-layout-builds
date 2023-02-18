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
const DEFAULT_VALUE = 'auto';
export class GridColumnStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-column': input || DEFAULT_VALUE };
    }
}
GridColumnStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridColumnStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridColumnDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-column';
        this.styleCache = columnCache;
        this.init();
    }
}
GridColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridColumnDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnDirective, decorators: [{
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
export class DefaultGridColumnDirective extends GridColumnDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridColumnDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridColumnDirective, selector: "\n  [gdColumn],\n  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],\n  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],\n  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]\n", inputs: { gdColumn: "gdColumn", "gdColumn.xs": "gdColumn.xs", "gdColumn.sm": "gdColumn.sm", "gdColumn.md": "gdColumn.md", "gdColumn.lg": "gdColumn.lg", "gdColumn.xl": "gdColumn.xl", "gdColumn.lt-sm": "gdColumn.lt-sm", "gdColumn.lt-md": "gdColumn.lt-md", "gdColumn.lt-lg": "gdColumn.lt-lg", "gdColumn.lt-xl": "gdColumn.lt-xl", "gdColumn.gt-xs": "gdColumn.gt-xs", "gdColumn.gt-sm": "gdColumn.gt-sm", "gdColumn.gt-md": "gdColumn.gt-md", "gdColumn.gt-lg": "gdColumn.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridColumnDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL2NvbHVtbi9jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXJDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUc3QixNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUN0RCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzttSEFIVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQURULE1BQU07MkZBQ25CLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUFjO0lBR3JELFlBQ0UsVUFBc0IsRUFDdEIsWUFBb0MsRUFDcEMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUmhDLGtCQUFhLEdBQUcsYUFBYSxDQUFDO1FBWTlCLGVBQVUsR0FBRyxXQUFXLENBQUM7UUFIMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Z0hBWFUsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsU0FBUzs7QUFpQlYsTUFBTSxXQUFXLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFNUQsTUFBTSxNQUFNLEdBQUc7SUFDYixVQUFVO0lBQ1YsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0NBQ2pCLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsbUJBQW1CO0lBRG5FOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzt1SEFGWSwwQkFBMEI7MkdBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9WQUxVRSA9ICdhdXRvJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29sdW1uU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXMoaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiB7ICdncmlkLWNvbHVtbic6IGlucHV0IHx8IERFRkFVTFRfVkFMVUUgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWNvbHVtbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZUJ1aWxkZXI6IEdyaWRDb2x1bW5TdHlsZUJ1aWxkZXIsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlclxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3R5bGVDYWNoZSA9IGNvbHVtbkNhY2hlO1xufVxuXG5jb25zdCBjb2x1bW5DYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnZ2RDb2x1bW4nLFxuICAnZ2RDb2x1bW4ueHMnLFxuICAnZ2RDb2x1bW4uc20nLFxuICAnZ2RDb2x1bW4ubWQnLFxuICAnZ2RDb2x1bW4ubGcnLFxuICAnZ2RDb2x1bW4ueGwnLFxuICAnZ2RDb2x1bW4ubHQtc20nLFxuICAnZ2RDb2x1bW4ubHQtbWQnLFxuICAnZ2RDb2x1bW4ubHQtbGcnLFxuICAnZ2RDb2x1bW4ubHQteGwnLFxuICAnZ2RDb2x1bW4uZ3QteHMnLFxuICAnZ2RDb2x1bW4uZ3Qtc20nLFxuICAnZ2RDb2x1bW4uZ3QtbWQnLFxuICAnZ2RDb2x1bW4uZ3QtbGcnLFxuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtnZENvbHVtbl0sXG4gIFtnZENvbHVtbi54c10sIFtnZENvbHVtbi5zbV0sIFtnZENvbHVtbi5tZF0sIFtnZENvbHVtbi5sZ10sIFtnZENvbHVtbi54bF0sXG4gIFtnZENvbHVtbi5sdC1zbV0sIFtnZENvbHVtbi5sdC1tZF0sIFtnZENvbHVtbi5sdC1sZ10sIFtnZENvbHVtbi5sdC14bF0sXG4gIFtnZENvbHVtbi5ndC14c10sIFtnZENvbHVtbi5ndC1zbV0sIFtnZENvbHVtbi5ndC1tZF0sIFtnZENvbHVtbi5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtY29sdW1uJyBDU1MgR3JpZCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgbmFtZSBvciBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZ3JpZFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yNlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgR3JpZENvbHVtbkRpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=