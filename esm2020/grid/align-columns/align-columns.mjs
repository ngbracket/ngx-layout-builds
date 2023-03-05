/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Injectable, Input } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
const DEFAULT_MAIN = 'start';
const DEFAULT_CROSS = 'stretch';
export class GridAlignColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
}
GridAlignColumnsStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: GridAlignColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAlignColumnsStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: GridAlignColumnsStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: GridAlignColumnsStyleBuilder, decorators: [{
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
GridAlignColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: GridAlignColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAlignColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: GridAlignColumnsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: GridAlignColumnsDirective, decorators: [{
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
DefaultGridAlignColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultGridAlignColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAlignColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: DefaultGridAlignColumnsDirective, selector: "\n  [gdAlignColumns],\n  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],\n  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],\n  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],\n  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],\n  [gdAlignColumns.gt-lg]\n", inputs: { gdAlignColumns: "gdAlignColumns", "gdAlignColumns.xs": "gdAlignColumns.xs", "gdAlignColumns.sm": "gdAlignColumns.sm", "gdAlignColumns.md": "gdAlignColumns.md", "gdAlignColumns.lg": "gdAlignColumns.lg", "gdAlignColumns.xl": "gdAlignColumns.xl", "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md": "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md": "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultGridAlignColumnsDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hbGlnbi1jb2x1bW5zL2FsaWduLWNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNEJBQTRCLENBQUM7OztBQUVwQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBT2hDLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxZQUFZO0lBQzVELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBOEI7UUFDdkQsT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsWUFBWSxJQUFJLGFBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RSxDQUFDOzt5SEFIVSw0QkFBNEI7NkhBQTVCLDRCQUE0QixjQURmLE1BQU07MkZBQ25CLDRCQUE0QjtrQkFEeEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxjQUFjO0lBWTNELFlBQ0UsVUFBc0IsRUFDdEIsWUFBMEMsRUFDMUMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBakJoQyxrQkFBYSxHQUFHLG9CQUFvQixDQUFDO1FBUzlDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFD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O1FBQ1IsS0FBSyxRQUFRO1lBQ1gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUM5QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsU0FBUyxZQUFZO1lBQ25CLHFCQUFxQjtZQUNyQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ25DLE1BQU07S0FDVDtJQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWpELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5cbmNvbnN0IERFRkFVTFRfTUFJTiA9ICdzdGFydCc7XG5jb25zdCBERUZBVUxUX0NST1NTID0gJ3N0cmV0Y2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBbGlnbkNvbHVtbnNQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduQ29sdW1uc1N0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogR3JpZEFsaWduQ29sdW1uc1BhcmVudCkge1xuICAgIHJldHVybiBidWlsZENzcyhpbnB1dCB8fCBgJHtERUZBVUxUX01BSU59ICR7REVGQVVMVF9DUk9TU31gLCBwYXJlbnQuaW5saW5lKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQWxpZ25Db2x1bW5zRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWFsaWduLWNvbHVtbnMnO1xuXG4gIEBJbnB1dCgnZ2RJbmxpbmUnKVxuICBnZXQgaW5saW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmxpbmU7XG4gIH1cbiAgc2V0IGlubGluZSh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2lubGluZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVCdWlsZGVyOiBHcmlkQWxpZ25Db2x1bW5zU3R5bGVCdWlsZGVyLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gYWxpZ25Db2x1bW5zSW5saW5lQ2FjaGUgOiBhbGlnbkNvbHVtbnNDYWNoZTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSwgeyBpbmxpbmU6IHRoaXMuaW5saW5lIH0pO1xuICB9XG59XG5cbmNvbnN0IGFsaWduQ29sdW1uc0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgYWxpZ25Db2x1bW5zSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQWxpZ25Db2x1bW5zJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLnhzJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLnNtJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLm1kJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmxnJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLnhsJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmx0LXNtJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmx0LW1kJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmx0LWxnJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmx0LXhsJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmd0LXhzJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmd0LXNtJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmd0LW1kJyxcbiAgJ2dkQWxpZ25Db2x1bW5zLmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkQWxpZ25Db2x1bW5zXSxcbiAgW2dkQWxpZ25Db2x1bW5zLnhzXSwgW2dkQWxpZ25Db2x1bW5zLnNtXSwgW2dkQWxpZ25Db2x1bW5zLm1kXSxcbiAgW2dkQWxpZ25Db2x1bW5zLmxnXSwgW2dkQWxpZ25Db2x1bW5zLnhsXSwgW2dkQWxpZ25Db2x1bW5zLmx0LXNtXSxcbiAgW2dkQWxpZ25Db2x1bW5zLmx0LW1kXSwgW2dkQWxpZ25Db2x1bW5zLmx0LWxnXSwgW2dkQWxpZ25Db2x1bW5zLmx0LXhsXSxcbiAgW2dkQWxpZ25Db2x1bW5zLmd0LXhzXSwgW2dkQWxpZ25Db2x1bW5zLmd0LXNtXSwgW2dkQWxpZ25Db2x1bW5zLmd0LW1kXSxcbiAgW2dkQWxpZ25Db2x1bW5zLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnY29sdW1uIGFsaWdubWVudCcgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIGFsaWdubWVudCBpbiB0aGUgY29sdW1uIGRpcmVjdGlvblxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xOVxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yMVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkQWxpZ25Db2x1bW5zRGlyZWN0aXZlIGV4dGVuZHMgR3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQ3NzKGFsaWduOiBzdHJpbmcsIGlubGluZTogYm9vbGVhbik6IFN0eWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IGNzczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9LFxuICAgIFttYWluQXhpcywgY3Jvc3NBeGlzXSA9IGFsaWduLnNwbGl0KCcgJyk7XG5cbiAgLy8gTWFpbiBheGlzXG4gIHN3aXRjaCAobWFpbkF4aXMpIHtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnY2VudGVyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwYWNlLWFyb3VuZCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzcGFjZS1hcm91bmQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3BhY2UtYmV0d2Vlbic6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzcGFjZS1iZXR3ZWVuJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwYWNlLWV2ZW5seSc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzcGFjZS1ldmVubHknO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ2VuZCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzdGFydCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ3N0cmV0Y2gnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gZGVmYXVsdCBtYWluIGF4aXNcbiAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gREVGQVVMVF9NQUlOO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBDcm9zcy1heGlzXG4gIHN3aXRjaCAoY3Jvc3NBeGlzKSB7XG4gICAgY2FzZSAnc3RhcnQnOlxuICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gJ3N0YXJ0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSAnY2VudGVyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZCc6XG4gICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSAnZW5kJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmV0Y2gnOlxuICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gJ3N0cmV0Y2gnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gJ3N0cmV0Y2gnXG4gICAgICAvLyBkZWZhdWx0IGNyb3NzIGF4aXNcbiAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9IERFRkFVTFRfQ1JPU1M7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNzc1snZGlzcGxheSddID0gaW5saW5lID8gJ2lubGluZS1ncmlkJyA6ICdncmlkJztcblxuICByZXR1cm4gY3NzO1xufVxuIl19