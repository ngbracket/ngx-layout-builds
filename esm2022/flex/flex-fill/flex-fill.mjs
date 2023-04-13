/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
const FLEX_FILL_CSS = {
    margin: 0,
    width: '100%',
    height: '100%',
    'min-width': '100%',
    'min-height': '100%',
};
class FlexFillStyleBuilder extends StyleBuilder {
    buildStyles(_input) {
        return FLEX_FILL_CSS;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: FlexFillStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: FlexFillStyleBuilder, providedIn: 'root' }); }
}
export { FlexFillStyleBuilder };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: FlexFillStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
class FlexFillDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.styleCache = flexFillCache;
        this.addStyles('');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: FlexFillDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexFillStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-rc.0", type: FlexFillDirective, selector: "[fxFill], [fxFlexFill]", usesInheritance: true, ngImport: i0 }); }
}
export { FlexFillDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.0", ngImport: i0, type: FlexFillDirective, decorators: [{
            type: Directive,
            args: [{ selector: `[fxFill], [fxFlexFill]` }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexFillStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const flexFillCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1maWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2ZsZXgtZmlsbC9mbGV4LWZpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBRXBDLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLE1BQU0sRUFBRSxDQUFDO0lBQ1QsS0FBSyxFQUFFLE1BQU07SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFlBQVksRUFBRSxNQUFNO0NBQ3JCLENBQUM7QUFFRixNQUNhLG9CQUFxQixTQUFRLFlBQVk7SUFDcEQsV0FBVyxDQUFDLE1BQWM7UUFDeEIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzttSEFIVSxvQkFBb0I7dUhBQXBCLG9CQUFvQixjQURQLE1BQU07O1NBQ25CLG9CQUFvQjtnR0FBcEIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFPbEM7Ozs7O0dBS0c7QUFDSCxNQUNhLGlCQUFrQixTQUFRLGNBQWM7SUFDbkQsWUFDRSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFrQyxFQUNsQyxPQUF3QjtRQUV4QixLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFJL0IsZUFBVSxHQUFHLGFBQWEsQ0FBQztRQUg1QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7bUhBVFUsaUJBQWlCO3VHQUFqQixpQkFBaUI7O1NBQWpCLGlCQUFpQjtnR0FBakIsaUJBQWlCO2tCQUQ3QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFOztBQWVqRCxNQUFNLGFBQWEsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBGTEVYX0ZJTExfQ1NTID0ge1xuICBtYXJnaW46IDAsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICAnbWluLXdpZHRoJzogJzEwMCUnLFxuICAnbWluLWhlaWdodCc6ICcxMDAlJyxcbn07XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmxleEZpbGxTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhfaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiBGTEVYX0ZJTExfQ1NTO1xuICB9XG59XG5cbi8qKlxuICogJ2Z4RmlsbCcgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogIE1heGltaXplcyB3aWR0aCBhbmQgaGVpZ2h0IG9mIGVsZW1lbnQgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKlxuICogIE5PVEU6IGZ4RmlsbCBpcyBOT1QgcmVzcG9uc2l2ZSBBUEkhIVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6IGBbZnhGaWxsXSwgW2Z4RmxleEZpbGxdYCB9KVxuZXhwb3J0IGNsYXNzIEZsZXhGaWxsRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgIHN0eWxlQnVpbGRlcjogRmxleEZpbGxTdHlsZUJ1aWxkZXIsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuYWRkU3R5bGVzKCcnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gZmxleEZpbGxDYWNoZTtcbn1cblxuY29uc3QgZmxleEZpbGxDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbiJdfQ==