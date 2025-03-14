import { ElementRef } from '@angular/core';
import { BaseDirective2, MediaMarshaller, StyleBuilder, StyleDefinition, StyleUtils } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
export declare class GridAlignStyleBuilder extends StyleBuilder {
    buildStyles(input: string): {
        [key: string]: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<GridAlignStyleBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GridAlignStyleBuilder>;
}
export declare class GridAlignDirective extends BaseDirective2 {
    protected DIRECTIVE_KEY: string;
    protected inputs: string[];
    constructor(elementRef: ElementRef, styleBuilder: GridAlignStyleBuilder, styler: StyleUtils, marshal: MediaMarshaller);
    protected styleCache: Map<string, StyleDefinition>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridAlignDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GridAlignDirective, "  [gdGridAlign],  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]", never, { "gdGridAlign": { "alias": "gdGridAlign"; "required": false; }; "gdGridAlign.xs": { "alias": "gdGridAlign.xs"; "required": false; }; "gdGridAlign.sm": { "alias": "gdGridAlign.sm"; "required": false; }; "gdGridAlign.md": { "alias": "gdGridAlign.md"; "required": false; }; "gdGridAlign.lg": { "alias": "gdGridAlign.lg"; "required": false; }; "gdGridAlign.xl": { "alias": "gdGridAlign.xl"; "required": false; }; "gdGridAlign.lt-sm": { "alias": "gdGridAlign.lt-sm"; "required": false; }; "gdGridAlign.lt-md": { "alias": "gdGridAlign.lt-md"; "required": false; }; "gdGridAlign.lt-lg": { "alias": "gdGridAlign.lt-lg"; "required": false; }; "gdGridAlign.lt-xl": { "alias": "gdGridAlign.lt-xl"; "required": false; }; "gdGridAlign.gt-xs": { "alias": "gdGridAlign.gt-xs"; "required": false; }; "gdGridAlign.gt-sm": { "alias": "gdGridAlign.gt-sm"; "required": false; }; "gdGridAlign.gt-md": { "alias": "gdGridAlign.gt-md"; "required": false; }; "gdGridAlign.gt-lg": { "alias": "gdGridAlign.gt-lg"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * 'align' CSS Grid styling directive for grid children
 *  Defines positioning of child elements along row and column axis in a grid container
 *  Optional values: {row-axis} values or {row-axis column-axis} value pairs
 *
 *  @see https://css-tricks.com/snippets/css/complete-guide-grid/#prop-justify-self
 *  @see https://css-tricks.com/snippets/css/complete-guide-grid/#prop-align-self
 */
/**
 * @deprecated The DefaultGridAlignDirective will be removed in version 21.
 * Use GridAlignDirective directly instead.
 */
export declare class DefaultGridAlignDirective extends GridAlignDirective {
    protected inputs: string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultGridAlignDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefaultGridAlignDirective, "  [gdGridAlign],  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]", never, { "gdGridAlign": { "alias": "gdGridAlign"; "required": false; }; "gdGridAlign.xs": { "alias": "gdGridAlign.xs"; "required": false; }; "gdGridAlign.sm": { "alias": "gdGridAlign.sm"; "required": false; }; "gdGridAlign.md": { "alias": "gdGridAlign.md"; "required": false; }; "gdGridAlign.lg": { "alias": "gdGridAlign.lg"; "required": false; }; "gdGridAlign.xl": { "alias": "gdGridAlign.xl"; "required": false; }; "gdGridAlign.lt-sm": { "alias": "gdGridAlign.lt-sm"; "required": false; }; "gdGridAlign.lt-md": { "alias": "gdGridAlign.lt-md"; "required": false; }; "gdGridAlign.lt-lg": { "alias": "gdGridAlign.lt-lg"; "required": false; }; "gdGridAlign.lt-xl": { "alias": "gdGridAlign.lt-xl"; "required": false; }; "gdGridAlign.gt-xs": { "alias": "gdGridAlign.gt-xs"; "required": false; }; "gdGridAlign.gt-sm": { "alias": "gdGridAlign.gt-sm"; "required": false; }; "gdGridAlign.gt-md": { "alias": "gdGridAlign.gt-md"; "required": false; }; "gdGridAlign.gt-lg": { "alias": "gdGridAlign.gt-lg"; "required": false; }; }, {}, never, never, true, never>;
}
