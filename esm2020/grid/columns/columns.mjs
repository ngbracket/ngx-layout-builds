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
const AUTO_SPECIFIER = '!';
export class GridColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        input = input || DEFAULT_VALUE;
        let auto = false;
        if (input.endsWith(AUTO_SPECIFIER)) {
            input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
            auto = true;
        }
        const css = {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-columns': '',
            'grid-template-columns': '',
        };
        const key = auto ? 'grid-auto-columns' : 'grid-template-columns';
        css[key] = input;
        return css;
    }
}
GridColumnsStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridColumnsStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnsStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridColumnsDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-columns';
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
        this.styleCache = this.inline ? columnsInlineCache : columnsCache;
        this.addStyles(value, { inline: this.inline });
    }
}
GridColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridColumnsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridColumnsDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; }, propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const columnsCache = new Map();
const columnsInlineCache = new Map();
const inputs = [
    'gdColumns',
    'gdColumns.xs',
    'gdColumns.sm',
    'gdColumns.md',
    'gdColumns.lg',
    'gdColumns.xl',
    'gdColumns.lt-sm',
    'gdColumns.lt-md',
    'gdColumns.lt-lg',
    'gdColumns.lt-xl',
    'gdColumns.gt-xs',
    'gdColumns.gt-sm',
    'gdColumns.gt-md',
    'gdColumns.gt-lg',
];
const selector = `
  [gdColumns],
  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],
  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],
  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]
`;
/**
 * 'grid-template-columns' CSS Grid styling directive
 * Configures the sizing for the columns in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
export class DefaultGridColumnsDirective extends GridColumnsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridColumnsDirective, selector: "\n  [gdColumns],\n  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],\n  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],\n  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]\n", inputs: { gdColumns: "gdColumns", "gdColumns.xs": "gdColumns.xs", "gdColumns.sm": "gdColumns.sm", "gdColumns.md": "gdColumns.md", "gdColumns.lg": "gdColumns.lg", "gdColumns.xl": "gdColumns.xl", "gdColumns.lt-sm": "gdColumns.lt-sm", "gdColumns.lt-md": "gdColumns.lt-md", "gdColumns.lt-lg": "gdColumns.lt-lg", "gdColumns.lt-xl": "gdColumns.lt-xl", "gdColumns.gt-xs": "gdColumns.gt-xs", "gdColumns.gt-sm": "gdColumns.gt-sm", "gdColumns.gt-md": "gdColumns.gt-md", "gdColumns.gt-lg": "gdColumns.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9jb2x1bW5zL2NvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNkJBQTZCLENBQUM7OztBQUVyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0IsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBTzNCLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxZQUFZO0lBQ3ZELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBeUI7UUFDbEQsS0FBSyxHQUFHLEtBQUssSUFBSSxhQUFhLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNsQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksR0FBRyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sR0FBRyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMvQyxtQkFBbUIsRUFBRSxFQUFFO1lBQ3ZCLHVCQUF1QixFQUFFLEVBQUU7U0FDNUIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1FBQ2pFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFakIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztvSEFsQlUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQXVCbEMsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGNBQWM7SUFZdEQsWUFDRSxVQUFzQixFQUN0QixZQUFxQyxFQUNyQyxNQUFrQixFQUNsQixPQUF3QjtRQUV4QixLQUFLLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFqQmhDLGtCQUFhLEdBQUcsY0FBYyxDQUFDO1FBU3hDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQWpCRCxJQUNJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEdBQVk7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBYUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFN0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O2lIQTdCVSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxTQUFTOzJMQUtKLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQTZCbkIsTUFBTSxZQUFZLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDN0QsTUFBTSxrQkFBa0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVuRSxNQUFNLE1BQU0sR0FBRztJQUNiLFdBQVc7SUFDWCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixpQkFBaUI7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsb0JBQW9CO0lBRHJFOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzt3SEFGWSwyQkFBMkI7NEdBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUR2QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJ25vbmUnO1xuY29uc3QgQVVUT19TUEVDSUZJRVIgPSAnISc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbHVtbnNQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR3JpZENvbHVtbnNTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRDb2x1bW5zUGFyZW50KSB7XG4gICAgaW5wdXQgPSBpbnB1dCB8fCBERUZBVUxUX1ZBTFVFO1xuICAgIGxldCBhdXRvID0gZmFsc2U7XG4gICAgaWYgKGlucHV0LmVuZHNXaXRoKEFVVE9fU1BFQ0lGSUVSKSkge1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgaW5wdXQuaW5kZXhPZihBVVRPX1NQRUNJRklFUikpO1xuICAgICAgYXV0byA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgZGlzcGxheTogcGFyZW50LmlubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG4gICAgICAnZ3JpZC1hdXRvLWNvbHVtbnMnOiAnJyxcbiAgICAgICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnOiAnJyxcbiAgICB9O1xuICAgIGNvbnN0IGtleSA9IGF1dG8gPyAnZ3JpZC1hdXRvLWNvbHVtbnMnIDogJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyc7XG4gICAgY3NzW2tleV0gPSBpbnB1dDtcblxuICAgIHJldHVybiBjc3M7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZENvbHVtbnNEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtY29sdW1ucyc7XG5cbiAgQElucHV0KCdnZElubGluZScpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICB9XG4gIHByb3RlY3RlZCBfaW5saW5lID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZUJ1aWxkZXI6IEdyaWRDb2x1bW5zU3R5bGVCdWlsZGVyLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gY29sdW1uc0lubGluZUNhY2hlIDogY29sdW1uc0NhY2hlO1xuICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlLCB7IGlubGluZTogdGhpcy5pbmxpbmUgfSk7XG4gIH1cbn1cblxuY29uc3QgY29sdW1uc0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgY29sdW1uc0lubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZENvbHVtbnMnLFxuICAnZ2RDb2x1bW5zLnhzJyxcbiAgJ2dkQ29sdW1ucy5zbScsXG4gICdnZENvbHVtbnMubWQnLFxuICAnZ2RDb2x1bW5zLmxnJyxcbiAgJ2dkQ29sdW1ucy54bCcsXG4gICdnZENvbHVtbnMubHQtc20nLFxuICAnZ2RDb2x1bW5zLmx0LW1kJyxcbiAgJ2dkQ29sdW1ucy5sdC1sZycsXG4gICdnZENvbHVtbnMubHQteGwnLFxuICAnZ2RDb2x1bW5zLmd0LXhzJyxcbiAgJ2dkQ29sdW1ucy5ndC1zbScsXG4gICdnZENvbHVtbnMuZ3QtbWQnLFxuICAnZ2RDb2x1bW5zLmd0LWxnJyxcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RDb2x1bW5zXSxcbiAgW2dkQ29sdW1ucy54c10sIFtnZENvbHVtbnMuc21dLCBbZ2RDb2x1bW5zLm1kXSwgW2dkQ29sdW1ucy5sZ10sIFtnZENvbHVtbnMueGxdLFxuICBbZ2RDb2x1bW5zLmx0LXNtXSwgW2dkQ29sdW1ucy5sdC1tZF0sIFtnZENvbHVtbnMubHQtbGddLCBbZ2RDb2x1bW5zLmx0LXhsXSxcbiAgW2dkQ29sdW1ucy5ndC14c10sIFtnZENvbHVtbnMuZ3Qtc21dLCBbZ2RDb2x1bW5zLmd0LW1kXSwgW2dkQ29sdW1ucy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIHNpemluZyBmb3IgdGhlIGNvbHVtbnMgaW4gdGhlIGdyaWRcbiAqIFN5bnRheDogPGNvbHVtbiB2YWx1ZT4gW2F1dG9dXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2NvbXBsZXRlLWd1aWRlLWdyaWQvI2FydGljbGUtaGVhZGVyLWlkLTEzXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEdyaWRDb2x1bW5zRGlyZWN0aXZlIGV4dGVuZHMgR3JpZENvbHVtbnNEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19