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
const ROW_DEFAULT = 'stretch';
const COL_DEFAULT = 'stretch';
export class GridAlignStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return buildCss(input || ROW_DEFAULT);
    }
}
GridAlignStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAlignStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAlignDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align';
        this.styleCache = alignCache;
        this.init();
    }
}
GridAlignDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAlignDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAlignDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAlignDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridAlignStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; } });
const alignCache = new Map();
const inputs = [
    'gdGridAlign',
    'gdGridAlign.xs',
    'gdGridAlign.sm',
    'gdGridAlign.md',
    'gdGridAlign.lg',
    'gdGridAlign.xl',
    'gdGridAlign.lt-sm',
    'gdGridAlign.lt-md',
    'gdGridAlign.lt-lg',
    'gdGridAlign.lt-xl',
    'gdGridAlign.gt-xs',
    'gdGridAlign.gt-sm',
    'gdGridAlign.gt-md',
    'gdGridAlign.gt-lg',
];
const selector = `
  [gdGridAlign],
  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],
  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],
  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]
`;
/**
 * 'align' CSS Grid styling directive for grid children
 *  Defines positioning of child elements along row and column axis in a grid container
 *  Optional values: {row-axis} values or {row-axis column-axis} value pairs
 *
 *  @see https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-self
 *  @see https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-self
 */
export class DefaultGridAlignDirective extends GridAlignDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAlignDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAlignDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAlignDirective, selector: "\n  [gdGridAlign],\n  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],\n  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],\n  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]\n", inputs: { gdGridAlign: "gdGridAlign", "gdGridAlign.xs": "gdGridAlign.xs", "gdGridAlign.sm": "gdGridAlign.sm", "gdGridAlign.md": "gdGridAlign.md", "gdGridAlign.lg": "gdGridAlign.lg", "gdGridAlign.xl": "gdGridAlign.xl", "gdGridAlign.lt-sm": "gdGridAlign.lt-sm", "gdGridAlign.lt-md": "gdGridAlign.lt-md", "gdGridAlign.lt-lg": "gdGridAlign.lt-lg", "gdGridAlign.lt-xl": "gdGridAlign.lt-xl", "gdGridAlign.gt-xs": "gdGridAlign.gt-xs", "gdGridAlign.gt-sm": "gdGridAlign.gt-sm", "gdGridAlign.gt-md": "gdGridAlign.gt-md", "gdGridAlign.gt-lg": "gdGridAlign.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAlignDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
function buildCss(align = '') {
    const css = {}, [rowAxis, columnAxis] = align.split(' ');
    // Row axis
    switch (rowAxis) {
        case 'end':
            css['justify-self'] = 'end';
            break;
        case 'center':
            css['justify-self'] = 'center';
            break;
        case 'stretch':
            css['justify-self'] = 'stretch';
            break;
        case 'start':
            css['justify-self'] = 'start';
            break;
        default: // default row axis
            css['justify-self'] = ROW_DEFAULT;
            break;
    }
    // Column axis
    switch (columnAxis) {
        case 'end':
            css['align-self'] = 'end';
            break;
        case 'center':
            css['align-self'] = 'center';
            break;
        case 'stretch':
            css['align-self'] = 'stretch';
            break;
        case 'start':
            css['align-self'] = 'start';
            break;
        default: // default column axis
            css['align-self'] = COL_DEFAULT;
            break;
    }
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1hbGlnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9ncmlkLWFsaWduL2dyaWQtYWxpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXJDLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM5QixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFHOUIsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFlBQVk7SUFDckQsV0FBVyxDQUFDLEtBQWE7UUFDdkIsT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2tIQUhVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFRbEMsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGNBQWM7SUFHcEQsWUFDRSxVQUFzQixFQUN0QixZQUFtQyxFQUNuQyxNQUFrQixFQUNsQixPQUF3QjtRQUV4QixLQUFLLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFSaEMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFZN0IsZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUh6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzsrR0FYVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTOztBQWlCVixNQUFNLFVBQVUsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUUzRCxNQUFNLE1BQU0sR0FBRztJQUNiLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7Q0FDcEIsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxrQkFBa0I7SUFEakU7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O3NIQUZZLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztBQUsvQixTQUFTLFFBQVEsQ0FBQyxRQUFnQixFQUFFO0lBQ2xDLE1BQU0sR0FBRyxHQUE4QixFQUFFLEVBQ3ZDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFM0MsV0FBVztJQUNYLFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxLQUFLO1lBQ1IsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxRQUFRO1lBQ1gsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUM5QixNQUFNO1FBQ1IsU0FBUyxtQkFBbUI7WUFDMUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxNQUFNO0tBQ1Q7SUFFRCxjQUFjO0lBQ2QsUUFBUSxVQUFVLEVBQUU7UUFDbEIsS0FBSyxLQUFLO1lBQ1IsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxRQUFRO1lBQ1gsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUM3QixNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM5QixNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUM1QixNQUFNO1FBQ1IsU0FBUyxzQkFBc0I7WUFDN0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUNoQyxNQUFNO0tBQ1Q7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbmNvbnN0IFJPV19ERUZBVUxUID0gJ3N0cmV0Y2gnO1xuY29uc3QgQ09MX0RFRkFVTFQgPSAnc3RyZXRjaCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXMoaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiBidWlsZENzcyhpbnB1dCB8fCBST1dfREVGQVVMVCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWFsaWduJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlQnVpbGRlcjogR3JpZEFsaWduU3R5bGVCdWlsZGVyLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0eWxlQ2FjaGUgPSBhbGlnbkNhY2hlO1xufVxuXG5jb25zdCBhbGlnbkNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZEdyaWRBbGlnbicsXG4gICdnZEdyaWRBbGlnbi54cycsXG4gICdnZEdyaWRBbGlnbi5zbScsXG4gICdnZEdyaWRBbGlnbi5tZCcsXG4gICdnZEdyaWRBbGlnbi5sZycsXG4gICdnZEdyaWRBbGlnbi54bCcsXG4gICdnZEdyaWRBbGlnbi5sdC1zbScsXG4gICdnZEdyaWRBbGlnbi5sdC1tZCcsXG4gICdnZEdyaWRBbGlnbi5sdC1sZycsXG4gICdnZEdyaWRBbGlnbi5sdC14bCcsXG4gICdnZEdyaWRBbGlnbi5ndC14cycsXG4gICdnZEdyaWRBbGlnbi5ndC1zbScsXG4gICdnZEdyaWRBbGlnbi5ndC1tZCcsXG4gICdnZEdyaWRBbGlnbi5ndC1sZycsXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkR3JpZEFsaWduXSxcbiAgW2dkR3JpZEFsaWduLnhzXSwgW2dkR3JpZEFsaWduLnNtXSwgW2dkR3JpZEFsaWduLm1kXSwgW2dkR3JpZEFsaWduLmxnXSxbZ2RHcmlkQWxpZ24ueGxdLFxuICBbZ2RHcmlkQWxpZ24ubHQtc21dLCBbZ2RHcmlkQWxpZ24ubHQtbWRdLCBbZ2RHcmlkQWxpZ24ubHQtbGddLCBbZ2RHcmlkQWxpZ24ubHQteGxdLFxuICBbZ2RHcmlkQWxpZ24uZ3QteHNdLCBbZ2RHcmlkQWxpZ24uZ3Qtc21dLCBbZ2RHcmlkQWxpZ24uZ3QtbWRdLCBbZ2RHcmlkQWxpZ24uZ3QtbGddXG5gO1xuXG4vKipcbiAqICdhbGlnbicgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmUgZm9yIGdyaWQgY2hpbGRyZW5cbiAqICBEZWZpbmVzIHBvc2l0aW9uaW5nIG9mIGNoaWxkIGVsZW1lbnRzIGFsb25nIHJvdyBhbmQgY29sdW1uIGF4aXMgaW4gYSBncmlkIGNvbnRhaW5lclxuICogIE9wdGlvbmFsIHZhbHVlczoge3Jvdy1heGlzfSB2YWx1ZXMgb3Ige3Jvdy1heGlzIGNvbHVtbi1heGlzfSB2YWx1ZSBwYWlyc1xuICpcbiAqICBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2NvbXBsZXRlLWd1aWRlLWdyaWQvI3Byb3AtanVzdGlmeS1zZWxmXG4gKiAgQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNwcm9wLWFsaWduLXNlbGZcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFsaWduRGlyZWN0aXZlIGV4dGVuZHMgR3JpZEFsaWduRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxuZnVuY3Rpb24gYnVpbGRDc3MoYWxpZ246IHN0cmluZyA9ICcnKSB7XG4gIGNvbnN0IGNzczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9LFxuICAgIFtyb3dBeGlzLCBjb2x1bW5BeGlzXSA9IGFsaWduLnNwbGl0KCcgJyk7XG5cbiAgLy8gUm93IGF4aXNcbiAgc3dpdGNoIChyb3dBeGlzKSB7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGNzc1snanVzdGlmeS1zZWxmJ10gPSAnZW5kJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICBjc3NbJ2p1c3RpZnktc2VsZiddID0gJ2NlbnRlcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snanVzdGlmeS1zZWxmJ10gPSAnc3RyZXRjaCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICBjc3NbJ2p1c3RpZnktc2VsZiddID0gJ3N0YXJ0JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IC8vIGRlZmF1bHQgcm93IGF4aXNcbiAgICAgIGNzc1snanVzdGlmeS1zZWxmJ10gPSBST1dfREVGQVVMVDtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gQ29sdW1uIGF4aXNcbiAgc3dpdGNoIChjb2x1bW5BeGlzKSB7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGNzc1snYWxpZ24tc2VsZiddID0gJ2VuZCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgY3NzWydhbGlnbi1zZWxmJ10gPSAnY2VudGVyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmV0Y2gnOlxuICAgICAgY3NzWydhbGlnbi1zZWxmJ10gPSAnc3RyZXRjaCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICBjc3NbJ2FsaWduLXNlbGYnXSA9ICdzdGFydCc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiAvLyBkZWZhdWx0IGNvbHVtbiBheGlzXG4gICAgICBjc3NbJ2FsaWduLXNlbGYnXSA9IENPTF9ERUZBVUxUO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gY3NzO1xufVxuIl19