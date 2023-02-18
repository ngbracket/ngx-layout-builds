/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Injectable, Input } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbrackets/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbrackets/ngx-layout/core";
const DEFAULT_VALUE = 'none';
const DELIMETER = '|';
export class GridAreasStyleBuiler extends StyleBuilder {
    buildStyles(input, parent) {
        const areas = (input || DEFAULT_VALUE)
            .split(DELIMETER)
            .map((v) => `"${v.trim()}"`);
        return {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-template-areas': areas.join(' '),
        };
    }
}
GridAreasStyleBuiler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreasStyleBuiler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAreasStyleBuiler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreasStyleBuiler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreasStyleBuiler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAreasDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'grid-areas';
        this._inline = false;
        this.init();
    }
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? areasInlineCache : areasCache;
        this.addStyles(value, { inline: this.inline });
    }
}
GridAreasDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreasDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridAreasStyleBuiler }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAreasDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAreasDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAreasDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridAreasStyleBuiler }, { type: i1.MediaMarshaller }]; }, propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const areasCache = new Map();
const areasInlineCache = new Map();
const inputs = [
    'gdAreas',
    'gdAreas.xs',
    'gdAreas.sm',
    'gdAreas.md',
    'gdAreas.lg',
    'gdAreas.xl',
    'gdAreas.lt-sm',
    'gdAreas.lt-md',
    'gdAreas.lt-lg',
    'gdAreas.lt-xl',
    'gdAreas.gt-xs',
    'gdAreas.gt-sm',
    'gdAreas.gt-md',
    'gdAreas.gt-lg',
];
const selector = `
  [gdAreas],
  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],
  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],
  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]
`;
/**
 * 'grid-template-areas' CSS Grid styling directive
 * Configures the names of elements within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-14
 */
export class DefaultGridAreasDirective extends GridAreasDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAreasDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAreasDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAreasDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAreasDirective, selector: "\n  [gdAreas],\n  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],\n  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],\n  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]\n", inputs: { gdAreas: "gdAreas", "gdAreas.xs": "gdAreas.xs", "gdAreas.sm": "gdAreas.sm", "gdAreas.md": "gdAreas.md", "gdAreas.lg": "gdAreas.lg", "gdAreas.xl": "gdAreas.xl", "gdAreas.lt-sm": "gdAreas.lt-sm", "gdAreas.lt-md": "gdAreas.lt-md", "gdAreas.lt-lg": "gdAreas.lt-lg", "gdAreas.lt-xl": "gdAreas.lt-xl", "gdAreas.gt-xs": "gdAreas.gt-xs", "gdAreas.gt-sm": "gdAreas.gt-sm", "gdAreas.gt-md": "gdAreas.gt-md", "gdAreas.gt-lg": "gdAreas.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAreasDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2dyaWQvYXJlYXMvYXJlYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNkJBQTZCLENBQUM7OztBQUVyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0IsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBT3RCLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxZQUFZO0lBQ3BELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBdUI7UUFDaEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDO2FBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFL0IsT0FBTztZQUNMLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDL0MscUJBQXFCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDdkMsQ0FBQztJQUNKLENBQUM7O2lIQVZVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFlbEMsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGNBQWM7SUFZcEQsWUFDRSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFrQyxFQUNsQyxPQUF3QjtRQUV4QixLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFqQi9CLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBU3RDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQWpCRCxJQUNJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEdBQVk7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBYUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFN0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OytHQTdCVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO3dMQUtKLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQTZCbkIsTUFBTSxVQUFVLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDM0QsTUFBTSxnQkFBZ0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVqRSxNQUFNLE1BQU0sR0FBRztJQUNiLFNBQVM7SUFDVCxZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0NBQ2hCLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsa0JBQWtCO0lBRGpFOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOztzSEFGWSx5QkFBeUI7MEdBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJ25vbmUnO1xuY29uc3QgREVMSU1FVEVSID0gJ3wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBcmVhc1BhcmVudCB7XG4gIGlubGluZTogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBHcmlkQXJlYXNTdHlsZUJ1aWxlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogR3JpZEFyZWFzUGFyZW50KSB7XG4gICAgY29uc3QgYXJlYXMgPSAoaW5wdXQgfHwgREVGQVVMVF9WQUxVRSlcbiAgICAgIC5zcGxpdChERUxJTUVURVIpXG4gICAgICAubWFwKCh2KSA9PiBgXCIke3YudHJpbSgpfVwiYCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogcGFyZW50LmlubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG4gICAgICAnZ3JpZC10ZW1wbGF0ZS1hcmVhcyc6IGFyZWFzLmpvaW4oJyAnKSxcbiAgICB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEdyaWRBcmVhc0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZ3JpZC1hcmVhcyc7XG5cbiAgQElucHV0KCdnZElubGluZScpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICB9XG4gIHByb3RlY3RlZCBfaW5saW5lID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVVdGlsczogU3R5bGVVdGlscyxcbiAgICBzdHlsZUJ1aWxkZXI6IEdyaWRBcmVhc1N0eWxlQnVpbGVyLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlclxuICApIHtcbiAgICBzdXBlcihlbFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZVV0aWxzLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0eWxlQ2FjaGUgPSB0aGlzLmlubGluZSA/IGFyZWFzSW5saW5lQ2FjaGUgOiBhcmVhc0NhY2hlO1xuICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlLCB7IGlubGluZTogdGhpcy5pbmxpbmUgfSk7XG4gIH1cbn1cblxuY29uc3QgYXJlYXNDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGFyZWFzSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQXJlYXMnLFxuICAnZ2RBcmVhcy54cycsXG4gICdnZEFyZWFzLnNtJyxcbiAgJ2dkQXJlYXMubWQnLFxuICAnZ2RBcmVhcy5sZycsXG4gICdnZEFyZWFzLnhsJyxcbiAgJ2dkQXJlYXMubHQtc20nLFxuICAnZ2RBcmVhcy5sdC1tZCcsXG4gICdnZEFyZWFzLmx0LWxnJyxcbiAgJ2dkQXJlYXMubHQteGwnLFxuICAnZ2RBcmVhcy5ndC14cycsXG4gICdnZEFyZWFzLmd0LXNtJyxcbiAgJ2dkQXJlYXMuZ3QtbWQnLFxuICAnZ2RBcmVhcy5ndC1sZycsXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkQXJlYXNdLFxuICBbZ2RBcmVhcy54c10sIFtnZEFyZWFzLnNtXSwgW2dkQXJlYXMubWRdLCBbZ2RBcmVhcy5sZ10sIFtnZEFyZWFzLnhsXSxcbiAgW2dkQXJlYXMubHQtc21dLCBbZ2RBcmVhcy5sdC1tZF0sIFtnZEFyZWFzLmx0LWxnXSwgW2dkQXJlYXMubHQteGxdLFxuICBbZ2RBcmVhcy5ndC14c10sIFtnZEFyZWFzLmd0LXNtXSwgW2dkQXJlYXMuZ3QtbWRdLCBbZ2RBcmVhcy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtdGVtcGxhdGUtYXJlYXMnIENTUyBHcmlkIHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBDb25maWd1cmVzIHRoZSBuYW1lcyBvZiBlbGVtZW50cyB3aXRoaW4gdGhlIGdyaWRcbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMTRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFyZWFzRGlyZWN0aXZlIGV4dGVuZHMgR3JpZEFyZWFzRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==