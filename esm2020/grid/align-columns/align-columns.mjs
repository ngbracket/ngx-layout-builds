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
const DEFAULT_MAIN = 'start';
const DEFAULT_CROSS = 'stretch';
export class GridAlignColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
}
GridAlignColumnsStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAlignColumnsStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignColumnsStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAlignColumnsDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align-columns';
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
        this.styleCache = this.inline ? alignColumnsInlineCache : alignColumnsCache;
        this.addStyles(value, { inline: this.inline });
    }
}
GridAlignColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAlignColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAlignColumnsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignColumnsDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridAlignColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; }, propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignColumnsCache = new Map();
const alignColumnsInlineCache = new Map();
const inputs = [
    'gdAlignColumns',
    'gdAlignColumns.xs',
    'gdAlignColumns.sm',
    'gdAlignColumns.md',
    'gdAlignColumns.lg',
    'gdAlignColumns.xl',
    'gdAlignColumns.lt-sm',
    'gdAlignColumns.lt-md',
    'gdAlignColumns.lt-lg',
    'gdAlignColumns.lt-xl',
    'gdAlignColumns.gt-xs',
    'gdAlignColumns.gt-sm',
    'gdAlignColumns.gt-md',
    'gdAlignColumns.gt-lg',
];
const selector = `
  [gdAlignColumns],
  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],
  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],
  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],
  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],
  [gdAlignColumns.gt-lg]
`;
/**
 * 'column alignment' CSS Grid styling directive
 * Configures the alignment in the column direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-19
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-21
 */
export class DefaultGridAlignColumnsDirective extends GridAlignColumnsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAlignColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAlignColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAlignColumnsDirective, selector: "\n  [gdAlignColumns],\n  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],\n  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],\n  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],\n  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],\n  [gdAlignColumns.gt-lg]\n", inputs: { gdAlignColumns: "gdAlignColumns", "gdAlignColumns.xs": "gdAlignColumns.xs", "gdAlignColumns.sm": "gdAlignColumns.sm", "gdAlignColumns.md": "gdAlignColumns.md", "gdAlignColumns.lg": "gdAlignColumns.lg", "gdAlignColumns.xl": "gdAlignColumns.xl", "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md": "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md": "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
function buildCss(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
            css['align-content'] = 'center';
            break;
        case 'space-around':
            css['align-content'] = 'space-around';
            break;
        case 'space-between':
            css['align-content'] = 'space-between';
            break;
        case 'space-evenly':
            css['align-content'] = 'space-evenly';
            break;
        case 'end':
            css['align-content'] = 'end';
            break;
        case 'start':
            css['align-content'] = 'start';
            break;
        case 'stretch':
            css['align-content'] = 'stretch';
            break;
        default: // default main axis
            css['align-content'] = DEFAULT_MAIN;
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
            css['align-items'] = 'start';
            break;
        case 'center':
            css['align-items'] = 'center';
            break;
        case 'end':
            css['align-items'] = 'end';
            break;
        case 'stretch':
            css['align-items'] = 'stretch';
            break;
        default: // 'stretch'
            // default cross axis
            css['align-items'] = DEFAULT_CROSS;
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hbGlnbi1jb2x1bW5zL2FsaWduLWNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNkJBQTZCLENBQUM7OztBQUVyQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBT2hDLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxZQUFZO0lBQzVELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBOEI7UUFDdkQsT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsWUFBWSxJQUFJLGFBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RSxDQUFDOzt5SEFIVSw0QkFBNEI7NkhBQTVCLDRCQUE0QixjQURmLE1BQU07MkZBQ25CLDRCQUE0QjtrQkFEeEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxjQUFjO0lBWTNELFlBQ0UsVUFBc0IsRUFDdEIsWUFBMEMsRUFDMUMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBakJoQyxrQkFBYSxHQUFHLG9CQUFvQixDQUFDO1FBUzlDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFD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O1FBQ1IsS0FBSyxRQUFRO1lBQ1gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUM5QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsU0FBUyxZQUFZO1lBQ3JCLHFCQUFxQjtZQUNuQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ25DLE1BQU07S0FDVDtJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWpELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX01BSU4gPSAnc3RhcnQnO1xuY29uc3QgREVGQVVMVF9DUk9TUyA9ICdzdHJldGNoJztcblxuZXhwb3J0IGludGVyZmFjZSBHcmlkQWxpZ25Db2x1bW5zUGFyZW50IHtcbiAgaW5saW5lOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEdyaWRBbGlnbkNvbHVtbnNTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRBbGlnbkNvbHVtbnNQYXJlbnQpIHtcbiAgICByZXR1cm4gYnVpbGRDc3MoaW5wdXQgfHwgYCR7REVGQVVMVF9NQUlOfSAke0RFRkFVTFRfQ1JPU1N9YCwgcGFyZW50LmlubGluZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZ3JpZC1hbGlnbi1jb2x1bW5zJztcblxuICBASW5wdXQoJ2dkSW5saW5lJylcbiAgZ2V0IGlubGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5saW5lO1xuICB9XG4gIHNldCBpbmxpbmUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5faW5saW5lID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gIH1cbiAgcHJvdGVjdGVkIF9pbmxpbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlQnVpbGRlcjogR3JpZEFsaWduQ29sdW1uc1N0eWxlQnVpbGRlcixcbiAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0eWxlQ2FjaGUgPSB0aGlzLmlubGluZSA/IGFsaWduQ29sdW1uc0lubGluZUNhY2hlIDogYWxpZ25Db2x1bW5zQ2FjaGU7XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHsgaW5saW5lOiB0aGlzLmlubGluZSB9KTtcbiAgfVxufVxuXG5jb25zdCBhbGlnbkNvbHVtbnNDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGFsaWduQ29sdW1uc0lubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZEFsaWduQ29sdW1ucycsXG4gICdnZEFsaWduQ29sdW1ucy54cycsXG4gICdnZEFsaWduQ29sdW1ucy5zbScsXG4gICdnZEFsaWduQ29sdW1ucy5tZCcsXG4gICdnZEFsaWduQ29sdW1ucy5sZycsXG4gICdnZEFsaWduQ29sdW1ucy54bCcsXG4gICdnZEFsaWduQ29sdW1ucy5sdC1zbScsXG4gICdnZEFsaWduQ29sdW1ucy5sdC1tZCcsXG4gICdnZEFsaWduQ29sdW1ucy5sdC1sZycsXG4gICdnZEFsaWduQ29sdW1ucy5sdC14bCcsXG4gICdnZEFsaWduQ29sdW1ucy5ndC14cycsXG4gICdnZEFsaWduQ29sdW1ucy5ndC1zbScsXG4gICdnZEFsaWduQ29sdW1ucy5ndC1tZCcsXG4gICdnZEFsaWduQ29sdW1ucy5ndC1sZycsXG5dO1xuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtnZEFsaWduQ29sdW1uc10sXG4gIFtnZEFsaWduQ29sdW1ucy54c10sIFtnZEFsaWduQ29sdW1ucy5zbV0sIFtnZEFsaWduQ29sdW1ucy5tZF0sXG4gIFtnZEFsaWduQ29sdW1ucy5sZ10sIFtnZEFsaWduQ29sdW1ucy54bF0sIFtnZEFsaWduQ29sdW1ucy5sdC1zbV0sXG4gIFtnZEFsaWduQ29sdW1ucy5sdC1tZF0sIFtnZEFsaWduQ29sdW1ucy5sdC1sZ10sIFtnZEFsaWduQ29sdW1ucy5sdC14bF0sXG4gIFtnZEFsaWduQ29sdW1ucy5ndC14c10sIFtnZEFsaWduQ29sdW1ucy5ndC1zbV0sIFtnZEFsaWduQ29sdW1ucy5ndC1tZF0sXG4gIFtnZEFsaWduQ29sdW1ucy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2NvbHVtbiBhbGlnbm1lbnQnIENTUyBHcmlkIHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBDb25maWd1cmVzIHRoZSBhbGlnbm1lbnQgaW4gdGhlIGNvbHVtbiBkaXJlY3Rpb25cbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMTlcbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMjFcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEdyaWRBbGlnbkNvbHVtbnNEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuXG5mdW5jdGlvbiBidWlsZENzcyhhbGlnbjogc3RyaW5nLCBpbmxpbmU6IGJvb2xlYW4pOiBTdHlsZURlZmluaXRpb24ge1xuICBjb25zdCBjc3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSxcbiAgICBbbWFpbkF4aXMsIGNyb3NzQXhpc10gPSBhbGlnbi5zcGxpdCgnICcpO1xuXG4gIC8vIE1haW4gYXhpc1xuICBzd2l0Y2ggKG1haW5BeGlzKSB7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ2NlbnRlcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzcGFjZS1hcm91bmQnOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtYXJvdW5kJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwYWNlLWJldHdlZW4nOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtYmV0d2Vlbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzcGFjZS1ldmVubHknOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtZXZlbmx5JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdlbmQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RhcnQnOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3RhcnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyZXRjaCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzdHJldGNoJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IC8vIGRlZmF1bHQgbWFpbiBheGlzXG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9IERFRkFVTFRfTUFJTjtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gQ3Jvc3MtYXhpc1xuICBzd2l0Y2ggKGNyb3NzQXhpcykge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9ICdzdGFydCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gJ2NlbnRlcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlbmQnOlxuICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gJ2VuZCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9ICdzdHJldGNoJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IC8vICdzdHJldGNoJ1xuICAgIC8vIGRlZmF1bHQgY3Jvc3MgYXhpc1xuICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gREVGQVVMVF9DUk9TUztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY3NzWydkaXNwbGF5J10gPSBpbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnO1xuXG4gIHJldHVybiBjc3M7XG59XG4iXX0=