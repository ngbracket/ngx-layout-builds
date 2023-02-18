/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbrackets/ngx-layout/core';
import { DefaultGridAlignColumnsDirective } from './align-columns/align-columns';
import { DefaultGridAlignRowsDirective } from './align-rows/align-rows';
import { DefaultGridAreaDirective } from './area/area';
import { DefaultGridAreasDirective } from './areas/areas';
import { DefaultGridAutoDirective } from './auto/auto';
import { DefaultGridColumnDirective } from './column/column';
import { DefaultGridColumnsDirective } from './columns/columns';
import { DefaultGridGapDirective } from './gap/gap';
import { DefaultGridAlignDirective } from './grid-align/grid-align';
import { DefaultGridRowDirective } from './row/row';
import { DefaultGridRowsDirective } from './rows/rows';
import * as i0 from "@angular/core";
const ALL_DIRECTIVES = [
    DefaultGridAlignDirective,
    DefaultGridAlignColumnsDirective,
    DefaultGridAlignRowsDirective,
    DefaultGridAreaDirective,
    DefaultGridAreasDirective,
    DefaultGridAutoDirective,
    DefaultGridColumnDirective,
    DefaultGridColumnsDirective,
    DefaultGridGapDirective,
    DefaultGridRowDirective,
    DefaultGridRowsDirective,
];
/**
 * *****************************************************************
 * Define module for the CSS Grid API
 * *****************************************************************
 */
export class GridModule {
}
GridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: GridModule, declarations: [DefaultGridAlignDirective,
        DefaultGridAlignColumnsDirective,
        DefaultGridAlignRowsDirective,
        DefaultGridAreaDirective,
        DefaultGridAreasDirective,
        DefaultGridAutoDirective,
        DefaultGridColumnDirective,
        DefaultGridColumnsDirective,
        DefaultGridGapDirective,
        DefaultGridRowDirective,
        DefaultGridRowsDirective], imports: [CoreModule], exports: [DefaultGridAlignDirective,
        DefaultGridAlignColumnsDirective,
        DefaultGridAlignRowsDirective,
        DefaultGridAreaDirective,
        DefaultGridAreasDirective,
        DefaultGridAutoDirective,
        DefaultGridColumnDirective,
        DefaultGridColumnsDirective,
        DefaultGridGapDirective,
        DefaultGridRowDirective,
        DefaultGridRowsDirective] });
GridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridModule, imports: [CoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: GridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFdkQsTUFBTSxjQUFjLEdBQUc7SUFDckIseUJBQXlCO0lBQ3pCLGdDQUFnQztJQUNoQyw2QkFBNkI7SUFDN0Isd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6Qix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtDQUN6QixDQUFDO0FBRUY7Ozs7R0FJRztBQU9ILE1BQU0sT0FBTyxVQUFVOzt1R0FBVixVQUFVO3dHQUFWLFVBQVUsaUJBeEJyQix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsd0JBQXdCLGFBVWQsVUFBVSxhQXBCcEIseUJBQXlCO1FBQ3pCLGdDQUFnQztRQUNoQyw2QkFBNkI7UUFDN0Isd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHdCQUF3Qjt3R0FjYixVQUFVLFlBSlgsVUFBVTsyRkFJVCxVQUFVO2tCQUx0QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDckIsWUFBWSxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5pbXBvcnQgeyBEZWZhdWx0R3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYWxpZ24tY29sdW1ucy9hbGlnbi1jb2x1bW5zJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQWxpZ25Sb3dzRGlyZWN0aXZlIH0gZnJvbSAnLi9hbGlnbi1yb3dzL2FsaWduLXJvd3MnO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi9hcmVhL2FyZWEnO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRBcmVhc0RpcmVjdGl2ZSB9IGZyb20gJy4vYXJlYXMvYXJlYXMnO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRBdXRvRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRvL2F1dG8nO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbnMnO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRHYXBEaXJlY3RpdmUgfSBmcm9tICcuL2dhcC9nYXAnO1xuaW1wb3J0IHsgRGVmYXVsdEdyaWRBbGlnbkRpcmVjdGl2ZSB9IGZyb20gJy4vZ3JpZC1hbGlnbi9ncmlkLWFsaWduJztcbmltcG9ydCB7IERlZmF1bHRHcmlkUm93RGlyZWN0aXZlIH0gZnJvbSAnLi9yb3cvcm93JztcbmltcG9ydCB7IERlZmF1bHRHcmlkUm93c0RpcmVjdGl2ZSB9IGZyb20gJy4vcm93cy9yb3dzJztcblxuY29uc3QgQUxMX0RJUkVDVElWRVMgPSBbXG4gIERlZmF1bHRHcmlkQWxpZ25EaXJlY3RpdmUsXG4gIERlZmF1bHRHcmlkQWxpZ25Db2x1bW5zRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZEFsaWduUm93c0RpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRBcmVhRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZEFyZWFzRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZEF1dG9EaXJlY3RpdmUsXG4gIERlZmF1bHRHcmlkQ29sdW1uRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZENvbHVtbnNEaXJlY3RpdmUsXG4gIERlZmF1bHRHcmlkR2FwRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZFJvd0RpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRSb3dzRGlyZWN0aXZlLFxuXTtcblxuLyoqXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGVmaW5lIG1vZHVsZSBmb3IgdGhlIENTUyBHcmlkIEFQSVxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgR3JpZE1vZHVsZSB7fVxuIl19