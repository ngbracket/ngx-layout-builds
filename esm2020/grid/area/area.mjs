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
export class GridAreaStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-area': input || DEFAULT_VALUE };
    }
}
GridAreaStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreaStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAreaStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreaStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreaStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAreaDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'grid-area';
        this.styleCache = gridAreaCache;
        this.init();
    }
}
GridAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreaDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridAreaStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAreaDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreaDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridAreaStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const gridAreaCache = new Map();
const inputs = [
    'gdArea',
    'gdArea.xs',
    'gdArea.sm',
    'gdArea.md',
    'gdArea.lg',
    'gdArea.xl',
    'gdArea.lt-sm',
    'gdArea.lt-md',
    'gdArea.lt-lg',
    'gdArea.lt-xl',
    'gdArea.gt-xs',
    'gdArea.gt-sm',
    'gdArea.gt-md',
    'gdArea.gt-lg',
];
const selector = `
  [gdArea],
  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],
  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],
  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]
`;
/**
 * 'grid-area' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-27
 */
export class DefaultGridAreaDirective extends GridAreaDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAreaDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAreaDirective, selector: "\n  [gdArea],\n  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],\n  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],\n  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]\n", inputs: { gdArea: "gdArea", "gdArea.xs": "gdArea.xs", "gdArea.sm": "gdArea.sm", "gdArea.md": "gdArea.md", "gdArea.lg": "gdArea.lg", "gdArea.xl": "gdArea.xl", "gdArea.lt-sm": "gdArea.lt-sm", "gdArea.lt-md": "gdArea.lt-md", "gdArea.lt-lg": "gdArea.lt-lg", "gdArea.lt-xl": "gdArea.lt-xl", "gdArea.gt-xs": "gdArea.gt-xs", "gdArea.gt-sm": "gdArea.gt-sm", "gdArea.gt-md": "gdArea.gt-md", "gdArea.gt-lg": "gdArea.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAreaDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hcmVhL2FyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXJDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUc3QixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUNwRCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNqRCxDQUFDOztpSEFIVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQURQLE1BQU07MkZBQ25CLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxjQUFjO0lBR25ELFlBQ0UsS0FBaUIsRUFDakIsVUFBc0IsRUFDdEIsWUFBa0MsRUFDbEMsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUi9CLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBWTVCLGVBQVUsR0FBRyxhQUFhLENBQUM7UUFINUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OEdBWFUsaUJBQWlCO2tHQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsU0FBUzs7QUFpQlYsTUFBTSxhQUFhLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFOUQsTUFBTSxNQUFNLEdBQUc7SUFDYixRQUFRO0lBQ1IsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztDQUNmLENBQUM7QUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsaUJBQWlCO0lBRC9EOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOztxSEFGWSx3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9WQUxVRSA9ICdhdXRvJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBHcmlkQXJlYVN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4geyAnZ3JpZC1hcmVhJzogaW5wdXQgfHwgREVGQVVMVF9WQUxVRSB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEdyaWRBcmVhRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWFyZWEnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgc3R5bGVCdWlsZGVyOiBHcmlkQXJlYVN0eWxlQnVpbGRlcixcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVVdGlscywgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3R5bGVDYWNoZSA9IGdyaWRBcmVhQ2FjaGU7XG59XG5cbmNvbnN0IGdyaWRBcmVhQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQXJlYScsXG4gICdnZEFyZWEueHMnLFxuICAnZ2RBcmVhLnNtJyxcbiAgJ2dkQXJlYS5tZCcsXG4gICdnZEFyZWEubGcnLFxuICAnZ2RBcmVhLnhsJyxcbiAgJ2dkQXJlYS5sdC1zbScsXG4gICdnZEFyZWEubHQtbWQnLFxuICAnZ2RBcmVhLmx0LWxnJyxcbiAgJ2dkQXJlYS5sdC14bCcsXG4gICdnZEFyZWEuZ3QteHMnLFxuICAnZ2RBcmVhLmd0LXNtJyxcbiAgJ2dkQXJlYS5ndC1tZCcsXG4gICdnZEFyZWEuZ3QtbGcnLFxuXTtcbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RBcmVhXSxcbiAgW2dkQXJlYS54c10sIFtnZEFyZWEuc21dLCBbZ2RBcmVhLm1kXSwgW2dkQXJlYS5sZ10sIFtnZEFyZWEueGxdLFxuICBbZ2RBcmVhLmx0LXNtXSwgW2dkQXJlYS5sdC1tZF0sIFtnZEFyZWEubHQtbGddLCBbZ2RBcmVhLmx0LXhsXSxcbiAgW2dkQXJlYS5ndC14c10sIFtnZEFyZWEuZ3Qtc21dLCBbZ2RBcmVhLmd0LW1kXSwgW2dkQXJlYS5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtYXJlYScgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIG5hbWUgb3IgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGdyaWRcbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMjdcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFyZWFEaXJlY3RpdmUgZXh0ZW5kcyBHcmlkQXJlYURpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=