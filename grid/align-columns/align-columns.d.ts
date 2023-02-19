import { ElementRef } from '@angular/core';
import { BaseDirective2, MediaMarshaller, StyleBuilder, StyleDefinition, StyleUtils } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
export interface GridAlignColumnsParent {
    inline: boolean;
}
export declare class GridAlignColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input: string, parent: GridAlignColumnsParent): StyleDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridAlignColumnsStyleBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GridAlignColumnsStyleBuilder>;
}
export declare class GridAlignColumnsDirective extends BaseDirective2 {
    protected DIRECTIVE_KEY: string;
    get inline(): boolean;
    set inline(val: boolean);
    protected _inline: boolean;
    constructor(elementRef: ElementRef, styleBuilder: GridAlignColumnsStyleBuilder, styler: StyleUtils, marshal: MediaMarshaller);
    protected updateWithValue(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridAlignColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GridAlignColumnsDirective, never, never, { "inline": "gdInline"; }, {}, never, never, false, never>;
}
/**
 * 'column alignment' CSS Grid styling directive
 * Configures the alignment in the column direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-19
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-21
 */
export declare class DefaultGridAlignColumnsDirective extends GridAlignColumnsDirective {
    protected inputs: string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultGridAlignColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefaultGridAlignColumnsDirective, "  [gdAlignColumns],  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],  [gdAlignColumns.gt-lg]", never, { "gdAlignColumns": "gdAlignColumns"; "gdAlignColumns.xs": "gdAlignColumns.xs"; "gdAlignColumns.sm": "gdAlignColumns.sm"; "gdAlignColumns.md": "gdAlignColumns.md"; "gdAlignColumns.lg": "gdAlignColumns.lg"; "gdAlignColumns.xl": "gdAlignColumns.xl"; "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm"; "gdAlignColumns.lt-md": "gdAlignColumns.lt-md"; "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg"; "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl"; "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs"; "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm"; "gdAlignColumns.gt-md": "gdAlignColumns.gt-md"; "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg"; }, {}, never, never, false, never>;
}
