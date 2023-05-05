/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';
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
class GridModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-6ca1503", ngImport: i0, type: GridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-6ca1503", ngImport: i0, type: GridModule, declarations: [DefaultGridAlignDirective,
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
            DefaultGridRowsDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-6ca1503", ngImport: i0, type: GridModule, imports: [CoreModule] }); }
}
export { GridModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-6ca1503", ngImport: i0, type: GridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFdkQsTUFBTSxjQUFjLEdBQUc7SUFDckIseUJBQXlCO0lBQ3pCLGdDQUFnQztJQUNoQyw2QkFBNkI7SUFDN0Isd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6Qix3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtDQUN6QixDQUFDO0FBRUY7Ozs7R0FJRztBQUVILE1BS2EsVUFBVTs4R0FBVixVQUFVOytHQUFWLFVBQVUsaUJBeEJyQix5QkFBeUI7WUFDekIsZ0NBQWdDO1lBQ2hDLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsd0JBQXdCLGFBVWQsVUFBVSxhQXBCcEIseUJBQXlCO1lBQ3pCLGdDQUFnQztZQUNoQyw2QkFBNkI7WUFDN0Isd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsMEJBQTBCO1lBQzFCLDJCQUEyQjtZQUMzQix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHdCQUF3QjsrR0FjYixVQUFVLFlBSlgsVUFBVTs7U0FJVCxVQUFVOzJGQUFWLFVBQVU7a0JBTHRCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixZQUFZLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztvQkFDakMsT0FBTyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9jb3JlJztcblxuaW1wb3J0IHsgRGVmYXVsdEdyaWRBbGlnbkNvbHVtbnNEaXJlY3RpdmUgfSBmcm9tICcuL2FsaWduLWNvbHVtbnMvYWxpZ24tY29sdW1ucyc7XG5pbXBvcnQgeyBEZWZhdWx0R3JpZEFsaWduUm93c0RpcmVjdGl2ZSB9IGZyb20gJy4vYWxpZ24tcm93cy9hbGlnbi1yb3dzJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQXJlYURpcmVjdGl2ZSB9IGZyb20gJy4vYXJlYS9hcmVhJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQXJlYXNEaXJlY3RpdmUgfSBmcm9tICcuL2FyZWFzL2FyZWFzJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQXV0b0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0by9hdXRvJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4vY29sdW1uJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQ29sdW1uc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW5zJztcbmltcG9ydCB7IERlZmF1bHRHcmlkR2FwRGlyZWN0aXZlIH0gZnJvbSAnLi9nYXAvZ2FwJztcbmltcG9ydCB7IERlZmF1bHRHcmlkQWxpZ25EaXJlY3RpdmUgfSBmcm9tICcuL2dyaWQtYWxpZ24vZ3JpZC1hbGlnbic7XG5pbXBvcnQgeyBEZWZhdWx0R3JpZFJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vcm93L3Jvdyc7XG5pbXBvcnQgeyBEZWZhdWx0R3JpZFJvd3NEaXJlY3RpdmUgfSBmcm9tICcuL3Jvd3Mvcm93cyc7XG5cbmNvbnN0IEFMTF9ESVJFQ1RJVkVTID0gW1xuICBEZWZhdWx0R3JpZEFsaWduRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRBbGlnblJvd3NEaXJlY3RpdmUsXG4gIERlZmF1bHRHcmlkQXJlYURpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRBcmVhc0RpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRBdXRvRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZENvbHVtbkRpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRDb2x1bW5zRGlyZWN0aXZlLFxuICBEZWZhdWx0R3JpZEdhcERpcmVjdGl2ZSxcbiAgRGVmYXVsdEdyaWRSb3dEaXJlY3RpdmUsXG4gIERlZmF1bHRHcmlkUm93c0RpcmVjdGl2ZSxcbl07XG5cbi8qKlxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERlZmluZSBtb2R1bGUgZm9yIHRoZSBDU1MgR3JpZCBBUElcbiAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5BTExfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFsuLi5BTExfRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRNb2R1bGUge31cbiJdfQ==