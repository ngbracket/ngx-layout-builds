import { LAYOUT_CONFIG, DEFAULT_CONFIG, BREAKPOINT, SERVER_TOKEN } from '@ngbracket/ngx-layout/core';
export * from '@ngbracket/ngx-layout/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
export * from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
export * from '@ngbracket/ngx-layout/flex';
import { GridModule } from '@ngbracket/ngx-layout/grid';
export * from '@ngbracket/ngx-layout/grid';
import { isPlatformServer } from '@angular/common';
import * as i0 from '@angular/core';
import { PLATFORM_ID, NgModule, Inject, Version } from '@angular/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
class FlexLayoutModule {
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
FlexLayoutModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexLayoutModule, deps: [{ token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.????FactoryTarget.NgModule });
FlexLayoutModule.??mod = i0.????ngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule], exports: [FlexModule, ExtendedModule, GridModule] });
FlexLayoutModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule, FlexModule, ExtendedModule, GridModule] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexLayoutModule, decorators: [{
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Current version of Angular Flex-Layout. */
const VERSION = new Version('15.1.3-c02812d');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FlexLayoutModule, VERSION };
//# sourceMappingURL=ngbracket-ngx-layout.mjs.map
