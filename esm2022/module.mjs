/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID, } from '@angular/core';
import { BREAKPOINT, DEFAULT_CONFIG, LAYOUT_CONFIG, SERVER_TOKEN, } from '@ngbracket/ngx-layout/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { GridModule } from '@ngbracket/ngx-layout/grid';
import * as i0 from "@angular/core";
/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
class FlexLayoutModule {
    /**
     * Initialize the FlexLayoutModule with a set of config options,
     * which sets the corresponding tokens accordingly
     */
    static withConfig(configOptions, 
    // tslint:disable-next-line:max-line-length
    breakpoints = []) {
        return {
            ngModule: FlexLayoutModule,
            providers: configOptions.serverLoaded
                ? [
                    {
                        provide: LAYOUT_CONFIG,
                        useValue: { ...DEFAULT_CONFIG, ...configOptions },
                    },
                    { provide: BREAKPOINT, useValue: breakpoints, multi: true },
                    { provide: SERVER_TOKEN, useValue: true },
                ]
                : [
                    {
                        provide: LAYOUT_CONFIG,
                        useValue: { ...DEFAULT_CONFIG, ...configOptions },
                    },
                    { provide: BREAKPOINT, useValue: breakpoints, multi: true },
                ],
        };
    }
    constructor(serverModuleLoaded, platformId) {
        if (isPlatformServer(platformId) && !serverModuleLoaded) {
            console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: FlexLayoutModule, deps: [{ token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule], exports: [FlexModule, ExtendedModule, GridModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule, FlexModule, ExtendedModule, GridModule] }); }
}
export { FlexLayoutModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-ea322f4", ngImport: i0, type: FlexLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FlexModule, ExtendedModule, GridModule],
                    exports: [FlexModule, ExtendedModule, GridModule],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFFTCxVQUFVLEVBQ1YsY0FBYyxFQUVkLGFBQWEsRUFDYixZQUFZLEdBQ2IsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFeEQ7Ozs7O0dBS0c7QUFDSCxNQUlhLGdCQUFnQjtJQUMzQjs7O09BR0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUNmLGFBQWtDO0lBQ2xDLDJDQUEyQztJQUMzQyxjQUF5QyxFQUFFO1FBRTNDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxhQUFhLENBQUMsWUFBWTtnQkFDbkMsQ0FBQyxDQUFDO29CQUNFO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixRQUFRLEVBQUUsRUFBRSxHQUFHLGNBQWMsRUFBRSxHQUFHLGFBQWEsRUFBRTtxQkFDbEQ7b0JBQ0QsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDM0QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7aUJBQzFDO2dCQUNILENBQUMsQ0FBQztvQkFDRTt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxhQUFhLEVBQUU7cUJBQ2xEO29CQUNELEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQzVEO1NBQ04sQ0FBQztJQUNKLENBQUM7SUFFRCxZQUN3QixrQkFBMkIsRUFDNUIsVUFBa0I7UUFFdkMsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQ1YsMEVBQTBFLENBQzNFLENBQUM7U0FDSDtJQUNILENBQUM7OEdBeENVLGdCQUFnQixrQkFnQ2pCLFlBQVksYUFDWixXQUFXOytHQWpDVixnQkFBZ0IsWUFIakIsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVLGFBQ3RDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVTsrR0FFckMsZ0JBQWdCLFlBSGpCLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUN0QyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVU7O1NBRXJDLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUo1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbEQ7OzBCQWlDSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUNuQixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBCcmVha1BvaW50LFxuICBCUkVBS1BPSU5ULFxuICBERUZBVUxUX0NPTkZJRyxcbiAgTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgTEFZT1VUX0NPTkZJRyxcbiAgU0VSVkVSX1RPS0VOLFxufSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZE1vZHVsZSB9IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9leHRlbmRlZCc7XG5pbXBvcnQgeyBGbGV4TW9kdWxlIH0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2ZsZXgnO1xuaW1wb3J0IHsgR3JpZE1vZHVsZSB9IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9ncmlkJztcblxuLyoqXG4gKiBGbGV4TGF5b3V0TW9kdWxlIC0tIHRoZSBtYWluIGltcG9ydCBmb3IgYWxsIHV0aWxpdGllcyBpbiB0aGUgQW5ndWxhciBMYXlvdXQgbGlicmFyeVxuICogKiBXaWxsIGF1dG9tYXRpY2FsbHkgcHJvdmlkZSBGbGV4LCBHcmlkLCBhbmQgRXh0ZW5kZWQgbW9kdWxlcyBmb3IgdXNlIGluIHRoZSBhcHBsaWNhdGlvblxuICogKiBDYW4gYmUgY29uZmlndXJlZCB1c2luZyB0aGUgc3RhdGljIHdpdGhDb25maWcgbWV0aG9kLCBvcHRpb25zIHZpZXdhYmxlIG9uIHRoZSBXaWtpJ3NcbiAqICAgQ29uZmlndXJhdGlvbiBwYWdlXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtGbGV4TW9kdWxlLCBFeHRlbmRlZE1vZHVsZSwgR3JpZE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtGbGV4TW9kdWxlLCBFeHRlbmRlZE1vZHVsZSwgR3JpZE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEZsZXhMYXlvdXRNb2R1bGUge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmxleExheW91dE1vZHVsZSB3aXRoIGEgc2V0IG9mIGNvbmZpZyBvcHRpb25zLFxuICAgKiB3aGljaCBzZXRzIHRoZSBjb3JyZXNwb25kaW5nIHRva2VucyBhY2NvcmRpbmdseVxuICAgKi9cbiAgc3RhdGljIHdpdGhDb25maWcoXG4gICAgY29uZmlnT3B0aW9uczogTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgYnJlYWtwb2ludHM6IEJyZWFrUG9pbnQgfCBCcmVha1BvaW50W10gPSBbXVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZsZXhMYXlvdXRNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IGNvbmZpZ09wdGlvbnMuc2VydmVyTG9hZGVkXG4gICAgICAgID8gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBMQVlPVVRfQ09ORklHLFxuICAgICAgICAgICAgICB1c2VWYWx1ZTogeyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnT3B0aW9ucyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgcHJvdmlkZTogQlJFQUtQT0lOVCwgdXNlVmFsdWU6IGJyZWFrcG9pbnRzLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBwcm92aWRlOiBTRVJWRVJfVE9LRU4sIHVzZVZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogTEFZT1VUX0NPTkZJRyxcbiAgICAgICAgICAgICAgdXNlVmFsdWU6IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZ09wdGlvbnMgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHByb3ZpZGU6IEJSRUFLUE9JTlQsIHVzZVZhbHVlOiBicmVha3BvaW50cywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgICBdLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFNFUlZFUl9UT0tFTikgc2VydmVyTW9kdWxlTG9hZGVkOiBib29sZWFuLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKSAmJiAhc2VydmVyTW9kdWxlTG9hZGVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdXYXJuaW5nOiBGbGV4IExheW91dCBsb2FkZWQgb24gdGhlIHNlcnZlciB3aXRob3V0IEZsZXhMYXlvdXRTZXJ2ZXJNb2R1bGUnXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19