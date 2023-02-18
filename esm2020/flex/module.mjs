/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbrackets/ngx-layout/core';
import { DefaultFlexAlignDirective } from './flex-align/flex-align';
import { FlexFillDirective } from './flex-fill/flex-fill';
import { DefaultFlexOffsetDirective } from './flex-offset/flex-offset';
import { DefaultFlexOrderDirective } from './flex-order/flex-order';
import { DefaultFlexDirective } from './flex/flex';
import { DefaultLayoutAlignDirective } from './layout-align/layout-align';
import { DefaultLayoutGapDirective } from './layout-gap/layout-gap';
import { DefaultLayoutDirective } from './layout/layout';
import * as i0 from "@angular/core";
const ALL_DIRECTIVES = [
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    DefaultLayoutAlignDirective,
    DefaultFlexOrderDirective,
    DefaultFlexOffsetDirective,
    FlexFillDirective,
    DefaultFlexAlignDirective,
    DefaultFlexDirective,
];
/**
 * *****************************************************************
 * Define module for the Flex API
 * *****************************************************************
 */
export class FlexModule {
}
FlexModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FlexModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: FlexModule, declarations: [DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        DefaultLayoutAlignDirective,
        DefaultFlexOrderDirective,
        DefaultFlexOffsetDirective,
        FlexFillDirective,
        DefaultFlexAlignDirective,
        DefaultFlexDirective], imports: [CoreModule, BidiModule], exports: [DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        DefaultLayoutAlignDirective,
        DefaultFlexOrderDirective,
        DefaultFlexOffsetDirective,
        FlexFillDirective,
        DefaultFlexAlignDirective,
        DefaultFlexDirective] });
FlexModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexModule, imports: [CoreModule, BidiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule, BidiModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25ELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUV6RCxNQUFNLGNBQWMsR0FBRztJQUNyQixzQkFBc0I7SUFDdEIseUJBQXlCO0lBQ3pCLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsb0JBQW9CO0NBQ3JCLENBQUM7QUFFRjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLFVBQVU7O3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkFyQnJCLHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6QixvQkFBb0IsYUFVVixVQUFVLEVBQUUsVUFBVSxhQWpCaEMsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLG9CQUFvQjt3R0FjVCxVQUFVLFlBSlgsVUFBVSxFQUFFLFVBQVU7MkZBSXJCLFVBQVU7a0JBTHRCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9jb3JlJztcblxuaW1wb3J0IHsgRGVmYXVsdEZsZXhBbGlnbkRpcmVjdGl2ZSB9IGZyb20gJy4vZmxleC1hbGlnbi9mbGV4LWFsaWduJztcbmltcG9ydCB7IEZsZXhGaWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9mbGV4LWZpbGwvZmxleC1maWxsJztcbmltcG9ydCB7IERlZmF1bHRGbGV4T2Zmc2V0RGlyZWN0aXZlIH0gZnJvbSAnLi9mbGV4LW9mZnNldC9mbGV4LW9mZnNldCc7XG5pbXBvcnQgeyBEZWZhdWx0RmxleE9yZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9mbGV4LW9yZGVyL2ZsZXgtb3JkZXInO1xuaW1wb3J0IHsgRGVmYXVsdEZsZXhEaXJlY3RpdmUgfSBmcm9tICcuL2ZsZXgvZmxleCc7XG5pbXBvcnQgeyBEZWZhdWx0TGF5b3V0QWxpZ25EaXJlY3RpdmUgfSBmcm9tICcuL2xheW91dC1hbGlnbi9sYXlvdXQtYWxpZ24nO1xuaW1wb3J0IHsgRGVmYXVsdExheW91dEdhcERpcmVjdGl2ZSB9IGZyb20gJy4vbGF5b3V0LWdhcC9sYXlvdXQtZ2FwJztcbmltcG9ydCB7IERlZmF1bHRMYXlvdXREaXJlY3RpdmUgfSBmcm9tICcuL2xheW91dC9sYXlvdXQnO1xuXG5jb25zdCBBTExfRElSRUNUSVZFUyA9IFtcbiAgRGVmYXVsdExheW91dERpcmVjdGl2ZSxcbiAgRGVmYXVsdExheW91dEdhcERpcmVjdGl2ZSxcbiAgRGVmYXVsdExheW91dEFsaWduRGlyZWN0aXZlLFxuICBEZWZhdWx0RmxleE9yZGVyRGlyZWN0aXZlLFxuICBEZWZhdWx0RmxleE9mZnNldERpcmVjdGl2ZSxcbiAgRmxleEZpbGxEaXJlY3RpdmUsXG4gIERlZmF1bHRGbGV4QWxpZ25EaXJlY3RpdmUsXG4gIERlZmF1bHRGbGV4RGlyZWN0aXZlLFxuXTtcblxuLyoqXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGVmaW5lIG1vZHVsZSBmb3IgdGhlIEZsZXggQVBJXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlLCBCaWRpTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQUxMX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbLi4uQUxMX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TW9kdWxlIHt9XG4iXX0=