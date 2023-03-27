/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';
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
class FlexModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexModule, declarations: [DefaultLayoutDirective,
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
            DefaultFlexDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexModule, imports: [CoreModule, BidiModule] }); }
}
export { FlexModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule, BidiModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25ELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUV6RCxNQUFNLGNBQWMsR0FBRztJQUNyQixzQkFBc0I7SUFDdEIseUJBQXlCO0lBQ3pCLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsb0JBQW9CO0NBQ3JCLENBQUM7QUFFRjs7OztHQUlHO0FBRUgsTUFLYSxVQUFVO3FIQUFWLFVBQVU7c0hBQVYsVUFBVSxpQkFyQnJCLHNCQUFzQjtZQUN0Qix5QkFBeUI7WUFDekIsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QiwwQkFBMEI7WUFDMUIsaUJBQWlCO1lBQ2pCLHlCQUF5QjtZQUN6QixvQkFBb0IsYUFVVixVQUFVLEVBQUUsVUFBVSxhQWpCaEMsc0JBQXNCO1lBQ3RCLHlCQUF5QjtZQUN6QiwyQkFBMkI7WUFDM0IseUJBQXlCO1lBQ3pCLDBCQUEwQjtZQUMxQixpQkFBaUI7WUFDakIseUJBQXlCO1lBQ3pCLG9CQUFvQjtzSEFjVCxVQUFVLFlBSlgsVUFBVSxFQUFFLFVBQVU7O1NBSXJCLFVBQVU7a0dBQVYsVUFBVTtrQkFMdEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztvQkFDakMsT0FBTyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRGbGV4QWxpZ25EaXJlY3RpdmUgfSBmcm9tICcuL2ZsZXgtYWxpZ24vZmxleC1hbGlnbic7XG5pbXBvcnQgeyBGbGV4RmlsbERpcmVjdGl2ZSB9IGZyb20gJy4vZmxleC1maWxsL2ZsZXgtZmlsbCc7XG5pbXBvcnQgeyBEZWZhdWx0RmxleE9mZnNldERpcmVjdGl2ZSB9IGZyb20gJy4vZmxleC1vZmZzZXQvZmxleC1vZmZzZXQnO1xuaW1wb3J0IHsgRGVmYXVsdEZsZXhPcmRlckRpcmVjdGl2ZSB9IGZyb20gJy4vZmxleC1vcmRlci9mbGV4LW9yZGVyJztcbmltcG9ydCB7IERlZmF1bHRGbGV4RGlyZWN0aXZlIH0gZnJvbSAnLi9mbGV4L2ZsZXgnO1xuaW1wb3J0IHsgRGVmYXVsdExheW91dEFsaWduRGlyZWN0aXZlIH0gZnJvbSAnLi9sYXlvdXQtYWxpZ24vbGF5b3V0LWFsaWduJztcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRHYXBEaXJlY3RpdmUgfSBmcm9tICcuL2xheW91dC1nYXAvbGF5b3V0LWdhcCc7XG5pbXBvcnQgeyBEZWZhdWx0TGF5b3V0RGlyZWN0aXZlIH0gZnJvbSAnLi9sYXlvdXQvbGF5b3V0JztcblxuY29uc3QgQUxMX0RJUkVDVElWRVMgPSBbXG4gIERlZmF1bHRMYXlvdXREaXJlY3RpdmUsXG4gIERlZmF1bHRMYXlvdXRHYXBEaXJlY3RpdmUsXG4gIERlZmF1bHRMYXlvdXRBbGlnbkRpcmVjdGl2ZSxcbiAgRGVmYXVsdEZsZXhPcmRlckRpcmVjdGl2ZSxcbiAgRGVmYXVsdEZsZXhPZmZzZXREaXJlY3RpdmUsXG4gIEZsZXhGaWxsRGlyZWN0aXZlLFxuICBEZWZhdWx0RmxleEFsaWduRGlyZWN0aXZlLFxuICBEZWZhdWx0RmxleERpcmVjdGl2ZSxcbl07XG5cbi8qKlxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERlZmluZSBtb2R1bGUgZm9yIHRoZSBGbGV4IEFQSVxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgQmlkaU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgRmxleE1vZHVsZSB7fVxuIl19