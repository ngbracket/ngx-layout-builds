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
export class GridRowStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-row': input || DEFAULT_VALUE };
    }
}
GridRowStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridRowStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridRowStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridRowStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridRowStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridRowDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-row';
        this.styleCache = rowCache;
        this.init();
    }
}
GridRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridRowDirective, deps: [{ token: i0.ElementRef }, { token: GridRowStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridRowDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridRowDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridRowStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; } });
const rowCache = new Map();
const inputs = [
    'gdRow',
    'gdRow.xs',
    'gdRow.sm',
    'gdRow.md',
    'gdRow.lg',
    'gdRow.xl',
    'gdRow.lt-sm',
    'gdRow.lt-md',
    'gdRow.lt-lg',
    'gdRow.lt-xl',
    'gdRow.gt-xs',
    'gdRow.gt-sm',
    'gdRow.gt-md',
    'gdRow.gt-lg',
];
const selector = `
  [gdRow],
  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],
  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],
  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]
`;
/**
 * 'grid-row' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
export class DefaultGridRowDirective extends GridRowDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridRowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridRowDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridRowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridRowDirective, selector: "\n  [gdRow],\n  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],\n  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],\n  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]\n", inputs: { gdRow: "gdRow", "gdRow.xs": "gdRow.xs", "gdRow.sm": "gdRow.sm", "gdRow.md": "gdRow.md", "gdRow.lg": "gdRow.lg", "gdRow.xl": "gdRow.xl", "gdRow.lt-sm": "gdRow.lt-sm", "gdRow.lt-md": "gdRow.lt-md", "gdRow.lt-lg": "gdRow.lt-lg", "gdRow.lt-xl": "gdRow.lt-xl", "gdRow.gt-xs": "gdRow.gt-xs", "gdRow.gt-sm": "gdRow.gt-sm", "gdRow.gt-md": "gdRow.gt-md", "gdRow.gt-lg": "gdRow.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridRowDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL3Jvdy9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXJDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUc3QixNQUFNLE9BQU8sbUJBQW9CLFNBQVEsWUFBWTtJQUNuRCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNoRCxDQUFDOztnSEFIVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUROLE1BQU07MkZBQ25CLG1CQUFtQjtrQkFEL0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFjO0lBR2xELFlBQ0UsVUFBc0IsRUFDdEIsWUFBaUMsRUFDakMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUmhDLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBWTNCLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFIdkMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7NkdBWFUsZ0JBQWdCO2lHQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsU0FBUzs7QUFpQlYsTUFBTSxRQUFRLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFekQsTUFBTSxNQUFNLEdBQUc7SUFDYixPQUFPO0lBQ1AsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtDQUNkLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsZ0JBQWdCO0lBRDdEOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOztvSEFGWSx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQURuQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9WQUxVRSA9ICdhdXRvJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93U3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXMoaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiB7ICdncmlkLXJvdyc6IGlucHV0IHx8IERFRkFVTFRfVkFMVUUgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkUm93RGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLXJvdyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZUJ1aWxkZXI6IEdyaWRSb3dTdHlsZUJ1aWxkZXIsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlclxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3R5bGVDYWNoZSA9IHJvd0NhY2hlO1xufVxuXG5jb25zdCByb3dDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnZ2RSb3cnLFxuICAnZ2RSb3cueHMnLFxuICAnZ2RSb3cuc20nLFxuICAnZ2RSb3cubWQnLFxuICAnZ2RSb3cubGcnLFxuICAnZ2RSb3cueGwnLFxuICAnZ2RSb3cubHQtc20nLFxuICAnZ2RSb3cubHQtbWQnLFxuICAnZ2RSb3cubHQtbGcnLFxuICAnZ2RSb3cubHQteGwnLFxuICAnZ2RSb3cuZ3QteHMnLFxuICAnZ2RSb3cuZ3Qtc20nLFxuICAnZ2RSb3cuZ3QtbWQnLFxuICAnZ2RSb3cuZ3QtbGcnLFxuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtnZFJvd10sXG4gIFtnZFJvdy54c10sIFtnZFJvdy5zbV0sIFtnZFJvdy5tZF0sIFtnZFJvdy5sZ10sIFtnZFJvdy54bF0sXG4gIFtnZFJvdy5sdC1zbV0sIFtnZFJvdy5sdC1tZF0sIFtnZFJvdy5sdC1sZ10sIFtnZFJvdy5sdC14bF0sXG4gIFtnZFJvdy5ndC14c10sIFtnZFJvdy5ndC1zbV0sIFtnZFJvdy5ndC1tZF0sIFtnZFJvdy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtcm93JyBDU1MgR3JpZCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgbmFtZSBvciBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZ3JpZFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yNlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkUm93RGlyZWN0aXZlIGV4dGVuZHMgR3JpZFJvd0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=