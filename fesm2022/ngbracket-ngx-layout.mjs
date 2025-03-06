import { DEFAULT_CONFIG, LAYOUT_CONFIG, BREAKPOINT, SERVER_TOKEN } from '@ngbracket/ngx-layout/core';
export * from '@ngbracket/ngx-layout/core';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
export * from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
export * from '@ngbracket/ngx-layout/flex';
import { GridModule } from '@ngbracket/ngx-layout/grid';
export * from '@ngbracket/ngx-layout/grid';
import { isPlatformServer } from '@angular/common';
import * as i0 from '@angular/core';
import { PLATFORM_ID, Inject, NgModule, Version } from '@angular/core';

function provideFlexLayout(configOptions, breakpoints = []) {
    const providers = [
        {
            provide: LAYOUT_CONFIG,
            useValue: { ...DEFAULT_CONFIG, ...configOptions },
        },
        { provide: BREAKPOINT, useValue: breakpoints, multi: true },
    ];
    if (configOptions.serverLoaded) {
        providers.push({ provide: SERVER_TOKEN, useValue: true });
    }
    return providers;
}

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
    static withConfig(configOptions, breakpoints = []) {
        return {
            ngModule: FlexLayoutModule,
            providers: provideFlexLayout(configOptions, breakpoints),
        };
    }
    constructor(serverModuleLoaded, platformId) {
        if (isPlatformServer(platformId) && !serverModuleLoaded) {
            console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: FlexLayoutModule, deps: [{ token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.6", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule], exports: [FlexModule, ExtendedModule, GridModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule, FlexModule, ExtendedModule, GridModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: FlexLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FlexModule, ExtendedModule, GridModule],
                    exports: [FlexModule, ExtendedModule, GridModule],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });

/** Current version of Angular Flex-Layout. */
const VERSION = new Version('19.0.0-02e821b');

/**
 * @module
 * @description
 * Entry point for all public APIs of Angular Flex-Layout.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FlexLayoutModule, VERSION };
//# sourceMappingURL=ngbracket-ngx-layout.mjs.map
