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
const FLEX_FILL_CSS = {
    margin: 0,
    width: '100%',
    height: '100%',
    'min-width': '100%',
    'min-height': '100%',
};
export class FlexFillStyleBuilder extends StyleBuilder {
    buildStyles(_input) {
        return FLEX_FILL_CSS;
    }
}
FlexFillStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexFillStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
FlexFillStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexFillStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexFillStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
export class FlexFillDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.styleCache = flexFillCache;
        this.addStyles('');
    }
}
FlexFillDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexFillDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexFillStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
FlexFillDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: FlexFillDirective, selector: "[fxFill], [fxFlexFill]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexFillDirective, decorators: [{
            type: Directive,
            args: [{ selector: `[fxFill], [fxFlexFill]` }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexFillStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const flexFillCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1maWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2ZsZXgtZmlsbC9mbGV4LWZpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXJDLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLE1BQU0sRUFBRSxDQUFDO0lBQ1QsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFlBQVksRUFBRSxNQUFNO0NBQ3JCLENBQUM7QUFHRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUNwRCxXQUFXLENBQUMsTUFBYztRQUN4QixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOztpSEFIVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQURQLE1BQU07MkZBQ25CLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBT2xDOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGNBQWM7SUFDbkQsWUFDRSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFrQyxFQUNsQyxPQUF3QjtRQUV4QixLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFJL0IsZUFBVSxHQUFHLGFBQWEsQ0FBQztRQUg1QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7OzhHQVRVLGlCQUFpQjtrR0FBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7O0FBZWpELE1BQU0sYUFBYSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBGTEVYX0ZJTExfQ1NTID0ge1xuICBtYXJnaW46IDAsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICAnbWluLXdpZHRoJzogJzEwMCUnLFxuICAnbWluLWhlaWdodCc6ICcxMDAlJyxcbn07XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmxleEZpbGxTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhfaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiBGTEVYX0ZJTExfQ1NTO1xuICB9XG59XG5cbi8qKlxuICogJ2Z4RmlsbCcgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogIE1heGltaXplcyB3aWR0aCBhbmQgaGVpZ2h0IG9mIGVsZW1lbnQgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKlxuICogIE5PVEU6IGZ4RmlsbCBpcyBOT1QgcmVzcG9uc2l2ZSBBUEkhIVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6IGBbZnhGaWxsXSwgW2Z4RmxleEZpbGxdYCB9KVxuZXhwb3J0IGNsYXNzIEZsZXhGaWxsRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgIHN0eWxlQnVpbGRlcjogRmxleEZpbGxTdHlsZUJ1aWxkZXIsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuYWRkU3R5bGVzKCcnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gZmxleEZpbGxDYWNoZTtcbn1cblxuY29uc3QgZmxleEZpbGxDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbiJdfQ==