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
const DEFAULT_VALUE = 'initial';
export class GridAutoStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        let [direction, dense] = (input || DEFAULT_VALUE).split(' ');
        if (direction !== 'column' &&
            direction !== 'row' &&
            direction !== 'dense') {
            direction = 'row';
        }
        dense = dense === 'dense' && direction !== 'dense' ? ' dense' : '';
        return {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-flow': direction + dense,
        };
    }
}
GridAutoStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAutoStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
GridAutoStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAutoStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAutoStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAutoDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this._inline = false;
        this.DIRECTIVE_KEY = 'grid-auto';
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
        this.styleCache = this.inline ? autoInlineCache : autoCache;
        this.addStyles(value, { inline: this.inline });
    }
}
GridAutoDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAutoDirective, deps: [{ token: i0.ElementRef }, { token: GridAutoStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
GridAutoDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: GridAutoDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridAutoDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: GridAutoStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }]; }, propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const autoCache = new Map();
const autoInlineCache = new Map();
const inputs = [
    'gdAuto',
    'gdAuto.xs',
    'gdAuto.sm',
    'gdAuto.md',
    'gdAuto.lg',
    'gdAuto.xl',
    'gdAuto.lt-sm',
    'gdAuto.lt-md',
    'gdAuto.lt-lg',
    'gdAuto.lt-xl',
    'gdAuto.gt-xs',
    'gdAuto.gt-sm',
    'gdAuto.gt-md',
    'gdAuto.gt-lg',
];
const selector = `
  [gdAuto],
  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],
  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],
  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]
`;
/**
 * 'grid-auto-flow' CSS Grid styling directive
 * Configures the auto placement algorithm for the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-23
 */
export class DefaultGridAutoDirective extends GridAutoDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultGridAutoDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAutoDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultGridAutoDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultGridAutoDirective, selector: "\n  [gdAuto],\n  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],\n  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],\n  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]\n", inputs: { gdAuto: "gdAuto", "gdAuto.xs": "gdAuto.xs", "gdAuto.sm": "gdAuto.sm", "gdAuto.md": "gdAuto.md", "gdAuto.lg": "gdAuto.lg", "gdAuto.xl": "gdAuto.xl", "gdAuto.lt-sm": "gdAuto.lt-sm", "gdAuto.lt-md": "gdAuto.lt-md", "gdAuto.lt-lg": "gdAuto.lt-lg", "gdAuto.lt-xl": "gdAuto.lt-xl", "gdAuto.gt-xs": "gdAuto.gt-xs", "gdAuto.gt-sm": "gdAuto.gt-sm", "gdAuto.gt-md": "gdAuto.gt-md", "gdAuto.gt-lg": "gdAuto.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultGridAutoDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hdXRvL2F1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxHQUdiLE1BQU0sNkJBQTZCLENBQUM7OztBQUVyQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFPaEMsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7SUFDcEQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUFzQjtRQUMvQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3RCxJQUNFLFNBQVMsS0FBSyxRQUFRO1lBQ3RCLFNBQVMsS0FBSyxLQUFLO1lBQ25CLFNBQVMsS0FBSyxPQUFPLEVBQ3JCO1lBQ0EsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNuQjtRQUVELEtBQUssR0FBRyxLQUFLLEtBQUssT0FBTyxJQUFJLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRW5FLE9BQU87WUFDTCxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQy9DLGdCQUFnQixFQUFFLFNBQVMsR0FBRyxLQUFLO1NBQ3BDLENBQUM7SUFDSixDQUFDOztpSEFqQlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQXNCbEMsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGNBQWM7SUFZbkQsWUFDRSxVQUFzQixFQUN0QixZQUFrQyxFQUNsQyxNQUFrQixFQUNsQixPQUF3QjtRQUV4QixLQUFLLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFWekMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVQLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBUzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFuQkQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxHQUFZO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQWVELGdEQUFnRDtJQUNoRCxvQkFBb0I7SUFDcEIsZ0RBQWdEO0lBRTdCLGVBQWUsQ0FBQyxLQUFhO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OEdBN0JVLGlCQUFpQjtrR0FBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFNBQVM7d0xBR0osTUFBTTtzQkFEVCxLQUFLO3VCQUFDLFVBQVU7O0FBK0JuQixNQUFNLFNBQVMsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUMxRCxNQUFNLGVBQWUsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVoRSxNQUFNLE1BQU0sR0FBRztJQUNiLFFBQVE7SUFDUixXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0NBQ2YsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxpQkFBaUI7SUFEL0Q7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O3FIQUZZLHdCQUF3Qjt5R0FBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbmNvbnN0IERFRkFVTFRfVkFMVUUgPSAnaW5pdGlhbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZEF1dG9QYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR3JpZEF1dG9TdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRBdXRvUGFyZW50KSB7XG4gICAgbGV0IFtkaXJlY3Rpb24sIGRlbnNlXSA9IChpbnB1dCB8fCBERUZBVUxUX1ZBTFVFKS5zcGxpdCgnICcpO1xuICAgIGlmIChcbiAgICAgIGRpcmVjdGlvbiAhPT0gJ2NvbHVtbicgJiZcbiAgICAgIGRpcmVjdGlvbiAhPT0gJ3JvdycgJiZcbiAgICAgIGRpcmVjdGlvbiAhPT0gJ2RlbnNlJ1xuICAgICkge1xuICAgICAgZGlyZWN0aW9uID0gJ3Jvdyc7XG4gICAgfVxuXG4gICAgZGVuc2UgPSBkZW5zZSA9PT0gJ2RlbnNlJyAmJiBkaXJlY3Rpb24gIT09ICdkZW5zZScgPyAnIGRlbnNlJyA6ICcnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6IHBhcmVudC5pbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnLFxuICAgICAgJ2dyaWQtYXV0by1mbG93JzogZGlyZWN0aW9uICsgZGVuc2UsXG4gICAgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQXV0b0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgQElucHV0KCdnZElubGluZScpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICB9XG4gIHByb3RlY3RlZCBfaW5saW5lID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZ3JpZC1hdXRvJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlQnVpbGRlcjogR3JpZEF1dG9TdHlsZUJ1aWxkZXIsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlclxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zdHlsZUNhY2hlID0gdGhpcy5pbmxpbmUgPyBhdXRvSW5saW5lQ2FjaGUgOiBhdXRvQ2FjaGU7XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHsgaW5saW5lOiB0aGlzLmlubGluZSB9KTtcbiAgfVxufVxuXG5jb25zdCBhdXRvQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBhdXRvSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQXV0bycsXG4gICdnZEF1dG8ueHMnLFxuICAnZ2RBdXRvLnNtJyxcbiAgJ2dkQXV0by5tZCcsXG4gICdnZEF1dG8ubGcnLFxuICAnZ2RBdXRvLnhsJyxcbiAgJ2dkQXV0by5sdC1zbScsXG4gICdnZEF1dG8ubHQtbWQnLFxuICAnZ2RBdXRvLmx0LWxnJyxcbiAgJ2dkQXV0by5sdC14bCcsXG4gICdnZEF1dG8uZ3QteHMnLFxuICAnZ2RBdXRvLmd0LXNtJyxcbiAgJ2dkQXV0by5ndC1tZCcsXG4gICdnZEF1dG8uZ3QtbGcnLFxuXTtcbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RBdXRvXSxcbiAgW2dkQXV0by54c10sIFtnZEF1dG8uc21dLCBbZ2RBdXRvLm1kXSwgW2dkQXV0by5sZ10sIFtnZEF1dG8ueGxdLFxuICBbZ2RBdXRvLmx0LXNtXSwgW2dkQXV0by5sdC1tZF0sIFtnZEF1dG8ubHQtbGddLCBbZ2RBdXRvLmx0LXhsXSxcbiAgW2dkQXV0by5ndC14c10sIFtnZEF1dG8uZ3Qtc21dLCBbZ2RBdXRvLmd0LW1kXSwgW2dkQXV0by5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtYXV0by1mbG93JyBDU1MgR3JpZCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgYXV0byBwbGFjZW1lbnQgYWxnb3JpdGhtIGZvciB0aGUgZ3JpZFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yM1xuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkQXV0b0RpcmVjdGl2ZSBleHRlbmRzIEdyaWRBdXRvRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==