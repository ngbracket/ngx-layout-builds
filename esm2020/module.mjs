/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID, } from '@angular/core';
import { BREAKPOINT, DEFAULT_CONFIG, LAYOUT_CONFIG, SERVER_TOKEN, } from '@ngbrackets/ngx-layout/core';
import { ExtendedModule } from '@ngbrackets/ngx-layout/extended';
import { FlexModule } from '@ngbrackets/ngx-layout/flex';
import { GridModule } from '@ngbrackets/ngx-layout/grid';
import * as i0 from "@angular/core";
/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
export class FlexLayoutModule {
    constructor(serverModuleLoaded, platformId) {
        if (isPlatformServer(platformId) && !serverModuleLoaded) {
            console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
        }
    }
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
}
FlexLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexLayoutModule, deps: [{ token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule });
FlexLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule], exports: [FlexModule, ExtendedModule, GridModule] });
FlexLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule, FlexModule, ExtendedModule, GridModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexLayoutModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFFTCxVQUFVLEVBQ1YsY0FBYyxFQUVkLGFBQWEsRUFDYixZQUFZLEdBQ2IsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFekQ7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sZ0JBQWdCO0lBK0IzQixZQUN3QixrQkFBMkIsRUFDNUIsVUFBa0I7UUFFdkMsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQ1YsMEVBQTBFLENBQzNFLENBQUM7U0FDSDtJQUNILENBQUM7SUF2Q0Q7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDZixhQUFrQztJQUNsQywyQ0FBMkM7SUFDM0MsY0FBeUMsRUFBRTtRQUUzQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUUsYUFBYSxDQUFDLFlBQVk7Z0JBQ25DLENBQUMsQ0FBQztvQkFDRTt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsUUFBUSxFQUFFLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxhQUFhLEVBQUU7cUJBQ2xEO29CQUNELEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQzNELEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2lCQUMxQztnQkFDSCxDQUFDLENBQUM7b0JBQ0U7d0JBQ0UsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFFBQVEsRUFBRSxFQUFFLEdBQUcsY0FBYyxFQUFFLEdBQUcsYUFBYSxFQUFFO3FCQUNsRDtvQkFDRCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2lCQUM1RDtTQUNOLENBQUM7SUFDSixDQUFDOzs2R0E3QlUsZ0JBQWdCLGtCQWdDakIsWUFBWSxhQUNaLFdBQVc7OEdBakNWLGdCQUFnQixZQUhqQixVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsYUFDdEMsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVOzhHQUVyQyxnQkFBZ0IsWUFIakIsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQ3RDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVTsyRkFFckMsZ0JBQWdCO2tCQUo1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbEQ7OzBCQWlDSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUNuQixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBCcmVha1BvaW50LFxuICBCUkVBS1BPSU5ULFxuICBERUZBVUxUX0NPTkZJRyxcbiAgTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgTEFZT1VUX0NPTkZJRyxcbiAgU0VSVkVSX1RPS0VOLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRNb2R1bGUgfSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2V4dGVuZGVkJztcbmltcG9ydCB7IEZsZXhNb2R1bGUgfSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2ZsZXgnO1xuaW1wb3J0IHsgR3JpZE1vZHVsZSB9IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvZ3JpZCc7XG5cbi8qKlxuICogRmxleExheW91dE1vZHVsZSAtLSB0aGUgbWFpbiBpbXBvcnQgZm9yIGFsbCB1dGlsaXRpZXMgaW4gdGhlIEFuZ3VsYXIgTGF5b3V0IGxpYnJhcnlcbiAqICogV2lsbCBhdXRvbWF0aWNhbGx5IHByb3ZpZGUgRmxleCwgR3JpZCwgYW5kIEV4dGVuZGVkIG1vZHVsZXMgZm9yIHVzZSBpbiB0aGUgYXBwbGljYXRpb25cbiAqICogQ2FuIGJlIGNvbmZpZ3VyZWQgdXNpbmcgdGhlIHN0YXRpYyB3aXRoQ29uZmlnIG1ldGhvZCwgb3B0aW9ucyB2aWV3YWJsZSBvbiB0aGUgV2lraSdzXG4gKiAgIENvbmZpZ3VyYXRpb24gcGFnZVxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbRmxleE1vZHVsZSwgRXh0ZW5kZWRNb2R1bGUsIEdyaWRNb2R1bGVdLFxuICBleHBvcnRzOiBbRmxleE1vZHVsZSwgRXh0ZW5kZWRNb2R1bGUsIEdyaWRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TGF5b3V0TW9kdWxlIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZsZXhMYXlvdXRNb2R1bGUgd2l0aCBhIHNldCBvZiBjb25maWcgb3B0aW9ucyxcbiAgICogd2hpY2ggc2V0cyB0aGUgY29ycmVzcG9uZGluZyB0b2tlbnMgYWNjb3JkaW5nbHlcbiAgICovXG4gIHN0YXRpYyB3aXRoQ29uZmlnKFxuICAgIGNvbmZpZ09wdGlvbnM6IExheW91dENvbmZpZ09wdGlvbnMsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGJyZWFrcG9pbnRzOiBCcmVha1BvaW50IHwgQnJlYWtQb2ludFtdID0gW11cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxGbGV4TGF5b3V0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBjb25maWdPcHRpb25zLnNlcnZlckxvYWRlZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogTEFZT1VUX0NPTkZJRyxcbiAgICAgICAgICAgICAgdXNlVmFsdWU6IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZ09wdGlvbnMgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHByb3ZpZGU6IEJSRUFLUE9JTlQsIHVzZVZhbHVlOiBicmVha3BvaW50cywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgICAgIHsgcHJvdmlkZTogU0VSVkVSX1RPS0VOLCB1c2VWYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IExBWU9VVF9DT05GSUcsXG4gICAgICAgICAgICAgIHVzZVZhbHVlOiB7IC4uLkRFRkFVTFRfQ09ORklHLCAuLi5jb25maWdPcHRpb25zIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBwcm92aWRlOiBCUkVBS1BPSU5ULCB1c2VWYWx1ZTogYnJlYWtwb2ludHMsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChTRVJWRVJfVE9LRU4pIHNlcnZlck1vZHVsZUxvYWRlZDogYm9vbGVhbixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkgJiYgIXNlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2FybmluZzogRmxleCBMYXlvdXQgbG9hZGVkIG9uIHRoZSBzZXJ2ZXIgd2l0aG91dCBGbGV4TGF5b3V0U2VydmVyTW9kdWxlJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==