import { ElementRef } from '@angular/core';
import { BaseDirective2, MediaMarshaller, StyleBuilder, StyleDefinition, StyleUtils } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
export declare class FlexFillStyleBuilder extends StyleBuilder {
    buildStyles(_input: string): {
        margin: number;
        width: string;
        height: string;
        'min-width': string;
        'min-height': string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexFillStyleBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlexFillStyleBuilder>;
}
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
export declare class FlexFillDirective extends BaseDirective2 {
    constructor(elRef: ElementRef, styleUtils: StyleUtils, styleBuilder: FlexFillStyleBuilder, marshal: MediaMarshaller);
    protected styleCache: Map<string, StyleDefinition>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexFillDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FlexFillDirective, "[fxFill], [fxFlexFill]", never, {}, {}, never, never, true, never>;
}
