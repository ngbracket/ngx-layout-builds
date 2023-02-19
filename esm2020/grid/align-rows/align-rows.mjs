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
export class GridAlignRowsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
}
GridAlignRowsStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignRowsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAlignRowsStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignRowsStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignRowsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAlignRowsDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align-rows';
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
        this.styleCache = this.inline ? alignRowsInlineCache : alignRowsCache;
        this.addStyles(value, { inline: this.inline });
    }
}
GridAlignRowsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignRowsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignRowsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAlignRowsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAlignRowsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignRowsDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridAlignRowsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; }, propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignRowsCache = new Map();
const alignRowsInlineCache = new Map();
const inputs = [
    'gdAlignRows',
    'gdAlignRows.xs',
    'gdAlignRows.sm',
    'gdAlignRows.md',
    'gdAlignRows.lg',
    'gdAlignRows.xl',
    'gdAlignRows.lt-sm',
    'gdAlignRows.lt-md',
    'gdAlignRows.lt-lg',
    'gdAlignRows.lt-xl',
    'gdAlignRows.gt-xs',
    'gdAlignRows.gt-sm',
    'gdAlignRows.gt-md',
    'gdAlignRows.gt-lg',
];
const selector = `
  [gdAlignRows],
  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],
  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],
  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],
  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],
  [gdAlignRows.gt-lg]
`;
/**
 * 'row alignment' CSS Grid styling directive
 * Configures the alignment in the row direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-18
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-20
 */
export class DefaultGridAlignRowsDirective extends GridAlignRowsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAlignRowsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignRowsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAlignRowsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAlignRowsDirective, selector: "\n  [gdAlignRows],\n  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],\n  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],\n  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],\n  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],\n  [gdAlignRows.gt-lg]\n", inputs: { gdAlignRows: "gdAlignRows", "gdAlignRows.xs": "gdAlignRows.xs", "gdAlignRows.sm": "gdAlignRows.sm", "gdAlignRows.md": "gdAlignRows.md", "gdAlignRows.lg": "gdAlignRows.lg", "gdAlignRows.xl": "gdAlignRows.xl", "gdAlignRows.lt-sm": "gdAlignRows.lt-sm", "gdAlignRows.lt-md": "gdAlignRows.lt-md", "gdAlignRows.lt-lg": "gdAlignRows.lt-lg", "gdAlignRows.lt-xl": "gdAlignRows.lt-xl", "gdAlignRows.gt-xs": "gdAlignRows.gt-xs", "gdAlignRows.gt-sm": "gdAlignRows.gt-sm", "gdAlignRows.gt-md": "gdAlignRows.gt-md", "gdAlignRows.gt-lg": "gdAlignRows.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
function buildCss(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
        case 'space-around':
        case 'space-between':
        case 'space-evenly':
        case 'end':
        case 'start':
        case 'stretch':
            css['justify-content'] = mainAxis;
            break;
        default: // default main axis
            css['justify-content'] = DEFAULT_MAIN;
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
        case 'center':
        case 'end':
        case 'stretch':
            css['justify-items'] = crossAxis;
            break;
        default: // 'stretch'
            // default cross axis
            css['justify-items'] = DEFAULT_CROSS;
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tcm93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hbGlnbi1yb3dzL2FsaWduLXJvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNEJBQTRCLENBQUM7OztBQUVwQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBT2hDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQ3pELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBMkI7UUFDcEQsT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLEdBQUcsWUFBWSxJQUFJLGFBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RSxDQUFDOztzSEFIVSx5QkFBeUI7MEhBQXpCLHlCQUF5QixjQURaLE1BQU07MkZBQ25CLHlCQUF5QjtrQkFEckMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBUWxDLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxjQUFjO0lBWXhELFlBQ0UsVUFBc0IsRUFDdEIsWUFBdUMsRUFDdkMsTUFBa0IsRUFDbEIsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBakJoQyxrQkFBYSxHQUFHLGlCQUFpQixDQUFDO1FBUzNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFTeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FB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Y2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5cbmNvbnN0IERFRkFVTFRfTUFJTiA9ICdzdGFydCc7XG5jb25zdCBERUZBVUxUX0NST1NTID0gJ3N0cmV0Y2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBbGlnblJvd3NQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduUm93c1N0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogR3JpZEFsaWduUm93c1BhcmVudCkge1xuICAgIHJldHVybiBidWlsZENzcyhpbnB1dCB8fCBgJHtERUZBVUxUX01BSU59ICR7REVGQVVMVF9DUk9TU31gLCBwYXJlbnQuaW5saW5lKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQWxpZ25Sb3dzRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWFsaWduLXJvd3MnO1xuXG4gIEBJbnB1dCgnZ2RJbmxpbmUnKVxuICBnZXQgaW5saW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmxpbmU7XG4gIH1cbiAgc2V0IGlubGluZSh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2lubGluZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVCdWlsZGVyOiBHcmlkQWxpZ25Sb3dzU3R5bGVCdWlsZGVyLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gYWxpZ25Sb3dzSW5saW5lQ2FjaGUgOiBhbGlnblJvd3NDYWNoZTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSwgeyBpbmxpbmU6IHRoaXMuaW5saW5lIH0pO1xuICB9XG59XG5cbmNvbnN0IGFsaWduUm93c0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgYWxpZ25Sb3dzSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQWxpZ25Sb3dzJyxcbiAgJ2dkQWxpZ25Sb3dzLnhzJyxcbiAgJ2dkQWxpZ25Sb3dzLnNtJyxcbiAgJ2dkQWxpZ25Sb3dzLm1kJyxcbiAgJ2dkQWxpZ25Sb3dzLmxnJyxcbiAgJ2dkQWxpZ25Sb3dzLnhsJyxcbiAgJ2dkQWxpZ25Sb3dzLmx0LXNtJyxcbiAgJ2dkQWxpZ25Sb3dzLmx0LW1kJyxcbiAgJ2dkQWxpZ25Sb3dzLmx0LWxnJyxcbiAgJ2dkQWxpZ25Sb3dzLmx0LXhsJyxcbiAgJ2dkQWxpZ25Sb3dzLmd0LXhzJyxcbiAgJ2dkQWxpZ25Sb3dzLmd0LXNtJyxcbiAgJ2dkQWxpZ25Sb3dzLmd0LW1kJyxcbiAgJ2dkQWxpZ25Sb3dzLmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkQWxpZ25Sb3dzXSxcbiAgW2dkQWxpZ25Sb3dzLnhzXSwgW2dkQWxpZ25Sb3dzLnNtXSwgW2dkQWxpZ25Sb3dzLm1kXSxcbiAgW2dkQWxpZ25Sb3dzLmxnXSwgW2dkQWxpZ25Sb3dzLnhsXSwgW2dkQWxpZ25Sb3dzLmx0LXNtXSxcbiAgW2dkQWxpZ25Sb3dzLmx0LW1kXSwgW2dkQWxpZ25Sb3dzLmx0LWxnXSwgW2dkQWxpZ25Sb3dzLmx0LXhsXSxcbiAgW2dkQWxpZ25Sb3dzLmd0LXhzXSwgW2dkQWxpZ25Sb3dzLmd0LXNtXSwgW2dkQWxpZ25Sb3dzLmd0LW1kXSxcbiAgW2dkQWxpZ25Sb3dzLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAncm93IGFsaWdubWVudCcgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIGFsaWdubWVudCBpbiB0aGUgcm93IGRpcmVjdGlvblxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xOFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yMFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkQWxpZ25Sb3dzRGlyZWN0aXZlIGV4dGVuZHMgR3JpZEFsaWduUm93c0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQ3NzKGFsaWduOiBzdHJpbmcsIGlubGluZTogYm9vbGVhbik6IFN0eWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IGNzczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9LFxuICAgIFttYWluQXhpcywgY3Jvc3NBeGlzXSA9IGFsaWduLnNwbGl0KCcgJyk7XG5cbiAgLy8gTWFpbiBheGlzXG4gIHN3aXRjaCAobWFpbkF4aXMpIHtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgIGNhc2UgJ3NwYWNlLWFyb3VuZCc6XG4gICAgY2FzZSAnc3BhY2UtYmV0d2Vlbic6XG4gICAgY2FzZSAnc3BhY2UtZXZlbmx5JzpcbiAgICBjYXNlICdlbmQnOlxuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snanVzdGlmeS1jb250ZW50J10gPSBtYWluQXhpcztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IC8vIGRlZmF1bHQgbWFpbiBheGlzXG4gICAgICBjc3NbJ2p1c3RpZnktY29udGVudCddID0gREVGQVVMVF9NQUlOO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBDcm9zcy1heGlzXG4gIHN3aXRjaCAoY3Jvc3NBeGlzKSB7XG4gICAgY2FzZSAnc3RhcnQnOlxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgY2FzZSAnZW5kJzpcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snanVzdGlmeS1pdGVtcyddID0gY3Jvc3NBeGlzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDogLy8gJ3N0cmV0Y2gnXG4gICAgICAvLyBkZWZhdWx0IGNyb3NzIGF4aXNcbiAgICAgIGNzc1snanVzdGlmeS1pdGVtcyddID0gREVGQVVMVF9DUk9TUztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY3NzWydkaXNwbGF5J10gPSBpbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnO1xuXG4gIHJldHVybiBjc3M7XG59XG4iXX0=