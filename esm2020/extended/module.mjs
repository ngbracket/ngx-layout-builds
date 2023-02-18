/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbrackets/ngx-layout/core';
import { DefaultClassDirective } from './class/class';
import { DefaultImgSrcDirective } from './img-src/img-src';
import { DefaultShowHideDirective } from './show-hide/show-hide';
import { DefaultStyleDirective } from './style/style';
import * as i0 from "@angular/core";
const ALL_DIRECTIVES = [
    DefaultShowHideDirective,
    DefaultClassDirective,
    DefaultStyleDirective,
    DefaultImgSrcDirective,
];
/**
 * *****************************************************************
 * Define module for the Extended API
 * *****************************************************************
 */
export class ExtendedModule {
}
ExtendedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ExtendedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExtendedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: ExtendedModule, declarations: [DefaultShowHideDirective,
        DefaultClassDirective,
        DefaultStyleDirective,
        DefaultImgSrcDirective], imports: [CoreModule], exports: [DefaultShowHideDirective,
        DefaultClassDirective,
        DefaultStyleDirective,
        DefaultImgSrcDirective] });
ExtendedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ExtendedModule, imports: [CoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ExtendedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9leHRlbmRlZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFdEQsTUFBTSxjQUFjLEdBQUc7SUFDckIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsc0JBQXNCO0NBQ3ZCLENBQUM7QUFFRjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFqQnpCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHNCQUFzQixhQVVaLFVBQVUsYUFicEIsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsc0JBQXNCOzRHQWNYLGNBQWMsWUFKZixVQUFVOzJGQUlULGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixZQUFZLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztvQkFDakMsT0FBTyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRDbGFzc0RpcmVjdGl2ZSB9IGZyb20gJy4vY2xhc3MvY2xhc3MnO1xuaW1wb3J0IHsgRGVmYXVsdEltZ1NyY0RpcmVjdGl2ZSB9IGZyb20gJy4vaW1nLXNyYy9pbWctc3JjJztcbmltcG9ydCB7IERlZmF1bHRTaG93SGlkZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hvdy1oaWRlL3Nob3ctaGlkZSc7XG5pbXBvcnQgeyBEZWZhdWx0U3R5bGVEaXJlY3RpdmUgfSBmcm9tICcuL3N0eWxlL3N0eWxlJztcblxuY29uc3QgQUxMX0RJUkVDVElWRVMgPSBbXG4gIERlZmF1bHRTaG93SGlkZURpcmVjdGl2ZSxcbiAgRGVmYXVsdENsYXNzRGlyZWN0aXZlLFxuICBEZWZhdWx0U3R5bGVEaXJlY3RpdmUsXG4gIERlZmF1bHRJbWdTcmNEaXJlY3RpdmUsXG5dO1xuXG4vKipcbiAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZWZpbmUgbW9kdWxlIGZvciB0aGUgRXh0ZW5kZWQgQVBJXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQUxMX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbLi4uQUxMX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZE1vZHVsZSB7fVxuIl19