/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from '@ngbracket/ngx-layout/core';
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
class ExtendedModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: ExtendedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: ExtendedModule, declarations: [DefaultShowHideDirective,
            DefaultClassDirective,
            DefaultStyleDirective,
            DefaultImgSrcDirective], imports: [CoreModule], exports: [DefaultShowHideDirective,
            DefaultClassDirective,
            DefaultStyleDirective,
            DefaultImgSrcDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: ExtendedModule, imports: [CoreModule] }); }
}
export { ExtendedModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: ExtendedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9leHRlbmRlZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFdEQsTUFBTSxjQUFjLEdBQUc7SUFDckIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsc0JBQXNCO0NBQ3ZCLENBQUM7QUFFRjs7OztHQUlHO0FBRUgsTUFLYSxjQUFjOzhHQUFkLGNBQWM7K0dBQWQsY0FBYyxpQkFqQnpCLHdCQUF3QjtZQUN4QixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLHNCQUFzQixhQVVaLFVBQVUsYUFicEIsd0JBQXdCO1lBQ3hCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsc0JBQXNCOytHQWNYLGNBQWMsWUFKZixVQUFVOztTQUlULGNBQWM7MkZBQWQsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3JCLFlBQVksRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDO29CQUNqQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5pbXBvcnQgeyBEZWZhdWx0Q2xhc3NEaXJlY3RpdmUgfSBmcm9tICcuL2NsYXNzL2NsYXNzJztcbmltcG9ydCB7IERlZmF1bHRJbWdTcmNEaXJlY3RpdmUgfSBmcm9tICcuL2ltZy1zcmMvaW1nLXNyYyc7XG5pbXBvcnQgeyBEZWZhdWx0U2hvd0hpZGVEaXJlY3RpdmUgfSBmcm9tICcuL3Nob3ctaGlkZS9zaG93LWhpZGUnO1xuaW1wb3J0IHsgRGVmYXVsdFN0eWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9zdHlsZS9zdHlsZSc7XG5cbmNvbnN0IEFMTF9ESVJFQ1RJVkVTID0gW1xuICBEZWZhdWx0U2hvd0hpZGVEaXJlY3RpdmUsXG4gIERlZmF1bHRDbGFzc0RpcmVjdGl2ZSxcbiAgRGVmYXVsdFN0eWxlRGlyZWN0aXZlLFxuICBEZWZhdWx0SW1nU3JjRGlyZWN0aXZlLFxuXTtcblxuLyoqXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGVmaW5lIG1vZHVsZSBmb3IgdGhlIEV4dGVuZGVkIEFQSVxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29yZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkFMTF9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRNb2R1bGUge31cbiJdfQ==