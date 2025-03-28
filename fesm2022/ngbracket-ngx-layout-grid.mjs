import * as i0 from '@angular/core';
import { Injectable, Input, Directive, NgModule } from '@angular/core';
import * as i1 from '@ngbracket/ngx-layout/core';
import { StyleBuilder, BaseDirective2, CoreModule } from '@ngbracket/ngx-layout/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const DEFAULT_MAIN$1 = 'start';
const DEFAULT_CROSS$1 = 'stretch';
class GridAlignColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss$2(input || `${DEFAULT_MAIN$1} ${DEFAULT_CROSS$1}`, parent.inline);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignColumnsStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$a = [
    'gdAlignColumns',
    'gdAlignColumns.xs',
    'gdAlignColumns.sm',
    'gdAlignColumns.md',
    'gdAlignColumns.lg',
    'gdAlignColumns.xl',
    'gdAlignColumns.lt-sm',
    'gdAlignColumns.lt-md',
    'gdAlignColumns.lt-lg',
    'gdAlignColumns.lt-xl',
    'gdAlignColumns.gt-xs',
    'gdAlignColumns.gt-sm',
    'gdAlignColumns.gt-md',
    'gdAlignColumns.gt-lg',
];
const selector$a = `
  [gdAlignColumns],
  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],
  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],
  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],
  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],
  [gdAlignColumns.gt-lg]
`;
class GridAlignColumnsDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align-columns';
        this.inputs = inputs$a;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? alignColumnsInlineCache : alignColumnsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAlignColumnsDirective, isStandalone: true, selector: "\n  [gdAlignColumns],\n  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],\n  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],\n  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],\n  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],\n  [gdAlignColumns.gt-lg]\n", inputs: { gdAlignColumns: "gdAlignColumns", "gdAlignColumns.xs": "gdAlignColumns.xs", "gdAlignColumns.sm": "gdAlignColumns.sm", "gdAlignColumns.md": "gdAlignColumns.md", "gdAlignColumns.lg": "gdAlignColumns.lg", "gdAlignColumns.xl": "gdAlignColumns.xl", "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md": "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md": "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignColumnsDirective, decorators: [{
            type: Directive,
            args: [{ inputs: inputs$a, selector: selector$a }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAlignColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignColumnsCache = new Map();
const alignColumnsInlineCache = new Map();
/**
 * 'column alignment' CSS Grid styling directive
 * Configures the alignment in the column direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-19
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-21
 */
/**
 * @deprecated The DefaultGridAlignColumnsDirective will be removed in version 21.
 * Use GridAlignColumnsDirective directly instead.
 */
class DefaultGridAlignColumnsDirective extends GridAlignColumnsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$a;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAlignColumnsDirective, isStandalone: true, selector: "\n  [gdAlignColumns],\n  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],\n  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],\n  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],\n  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],\n  [gdAlignColumns.gt-lg]\n", inputs: { gdAlignColumns: "gdAlignColumns", "gdAlignColumns.xs": "gdAlignColumns.xs", "gdAlignColumns.sm": "gdAlignColumns.sm", "gdAlignColumns.md": "gdAlignColumns.md", "gdAlignColumns.lg": "gdAlignColumns.lg", "gdAlignColumns.xl": "gdAlignColumns.xl", "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md": "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md": "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$a, inputs: inputs$a }]
        }] });
function buildCss$2(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
            css['align-content'] = 'center';
            break;
        case 'space-around':
            css['align-content'] = 'space-around';
            break;
        case 'space-between':
            css['align-content'] = 'space-between';
            break;
        case 'space-evenly':
            css['align-content'] = 'space-evenly';
            break;
        case 'end':
            css['align-content'] = 'end';
            break;
        case 'start':
            css['align-content'] = 'start';
            break;
        case 'stretch':
            css['align-content'] = 'stretch';
            break;
        default: // default main axis
            css['align-content'] = DEFAULT_MAIN$1;
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
            css['align-items'] = 'start';
            break;
        case 'center':
            css['align-items'] = 'center';
            break;
        case 'end':
            css['align-items'] = 'end';
            break;
        case 'stretch':
            css['align-items'] = 'stretch';
            break;
        default: // 'stretch'
            // default cross axis
            css['align-items'] = DEFAULT_CROSS$1;
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}

const DEFAULT_MAIN = 'start';
const DEFAULT_CROSS = 'stretch';
class GridAlignRowsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss$1(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignRowsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignRowsStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignRowsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$9 = [
    'gdAlignRows',
    'gdAlignRows.xs',
    'gdAlignRows.sm',
    'gdAlignRows.md',
    'gdAlignRows.lg',
    'gdAlignRows.xl',
    'gdAlignRows.lt-sm',
    'gdAlignRows.lt-md',
    'gdAlignRows.lt-lg',
    'gdAlignRows.lt-xl',
    'gdAlignRows.gt-xs',
    'gdAlignRows.gt-sm',
    'gdAlignRows.gt-md',
    'gdAlignRows.gt-lg',
];
const selector$9 = `
  [gdAlignRows],
  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],
  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],
  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],
  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],
  [gdAlignRows.gt-lg]
`;
class GridAlignRowsDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align-rows';
        this.inputs = inputs$9;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? alignRowsInlineCache : alignRowsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignRowsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignRowsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAlignRowsDirective, isStandalone: true, selector: "\n  [gdAlignRows],\n  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],\n  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],\n  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],\n  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],\n  [gdAlignRows.gt-lg]\n", inputs: { gdAlignRows: "gdAlignRows", "gdAlignRows.xs": "gdAlignRows.xs", "gdAlignRows.sm": "gdAlignRows.sm", "gdAlignRows.md": "gdAlignRows.md", "gdAlignRows.lg": "gdAlignRows.lg", "gdAlignRows.xl": "gdAlignRows.xl", "gdAlignRows.lt-sm": "gdAlignRows.lt-sm", "gdAlignRows.lt-md": "gdAlignRows.lt-md", "gdAlignRows.lt-lg": "gdAlignRows.lt-lg", "gdAlignRows.lt-xl": "gdAlignRows.lt-xl", "gdAlignRows.gt-xs": "gdAlignRows.gt-xs", "gdAlignRows.gt-sm": "gdAlignRows.gt-sm", "gdAlignRows.gt-md": "gdAlignRows.gt-md", "gdAlignRows.gt-lg": "gdAlignRows.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$9, inputs: inputs$9 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAlignRowsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignRowsCache = new Map();
const alignRowsInlineCache = new Map();
/**
 * 'row alignment' CSS Grid styling directive
 * Configures the alignment in the row direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-18
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-20
 */
/**
 * @deprecated The DefaultGridAlignRowsDirective will be removed in version 21.
 * Use GridAlignRowsDirective directly instead.
 */
class DefaultGridAlignRowsDirective extends GridAlignRowsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$9;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignRowsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAlignRowsDirective, isStandalone: true, selector: "\n  [gdAlignRows],\n  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],\n  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],\n  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],\n  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],\n  [gdAlignRows.gt-lg]\n", inputs: { gdAlignRows: "gdAlignRows", "gdAlignRows.xs": "gdAlignRows.xs", "gdAlignRows.sm": "gdAlignRows.sm", "gdAlignRows.md": "gdAlignRows.md", "gdAlignRows.lg": "gdAlignRows.lg", "gdAlignRows.xl": "gdAlignRows.xl", "gdAlignRows.lt-sm": "gdAlignRows.lt-sm", "gdAlignRows.lt-md": "gdAlignRows.lt-md", "gdAlignRows.lt-lg": "gdAlignRows.lt-lg", "gdAlignRows.lt-xl": "gdAlignRows.lt-xl", "gdAlignRows.gt-xs": "gdAlignRows.gt-xs", "gdAlignRows.gt-sm": "gdAlignRows.gt-sm", "gdAlignRows.gt-md": "gdAlignRows.gt-md", "gdAlignRows.gt-lg": "gdAlignRows.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$9, inputs: inputs$9 }]
        }] });
function buildCss$1(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
        case 'space-around':
        case 'space-between':
        case 'space-evenly':
        case 'end':
        case 'start':
        case 'stretch':
            css['justify-content'] = mainAxis;
            break;
        default: // default main axis
            css['justify-content'] = DEFAULT_MAIN;
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
        case 'center':
        case 'end':
        case 'stretch':
            css['justify-items'] = crossAxis;
            break;
        default: // 'stretch'
            // default cross axis
            css['justify-items'] = DEFAULT_CROSS;
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}

const DEFAULT_VALUE$7 = 'auto';
class GridAreaStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-area': input || DEFAULT_VALUE$7 };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreaStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreaStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreaStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$8 = [
    'gdArea',
    'gdArea.xs',
    'gdArea.sm',
    'gdArea.md',
    'gdArea.lg',
    'gdArea.xl',
    'gdArea.lt-sm',
    'gdArea.lt-md',
    'gdArea.lt-lg',
    'gdArea.lt-xl',
    'gdArea.gt-xs',
    'gdArea.gt-sm',
    'gdArea.gt-md',
    'gdArea.gt-lg',
];
const selector$8 = `
  [gdArea],
  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],
  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],
  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]
`;
class GridAreaDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'grid-area';
        this.inputs = inputs$8;
        this.styleCache = gridAreaCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreaDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridAreaStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAreaDirective, isStandalone: true, selector: "\n  [gdArea],\n  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],\n  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],\n  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]\n", inputs: { gdArea: "gdArea", "gdArea.xs": "gdArea.xs", "gdArea.sm": "gdArea.sm", "gdArea.md": "gdArea.md", "gdArea.lg": "gdArea.lg", "gdArea.xl": "gdArea.xl", "gdArea.lt-sm": "gdArea.lt-sm", "gdArea.lt-md": "gdArea.lt-md", "gdArea.lt-lg": "gdArea.lt-lg", "gdArea.lt-xl": "gdArea.lt-xl", "gdArea.gt-xs": "gdArea.gt-xs", "gdArea.gt-sm": "gdArea.gt-sm", "gdArea.gt-md": "gdArea.gt-md", "gdArea.gt-lg": "gdArea.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreaDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$8, inputs: inputs$8 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridAreaStyleBuilder }, { type: i1.MediaMarshaller }] });
const gridAreaCache = new Map();
/**
 * 'grid-area' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-27
 */
/**
 * @deprecated The DefaultGridAreaDirective will be removed in version 21.
 * Use GridAreaDirective directly instead.
 */
class DefaultGridAreaDirective extends GridAreaDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$8;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAreaDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAreaDirective, isStandalone: true, selector: "\n  [gdArea],\n  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],\n  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],\n  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]\n", inputs: { gdArea: "gdArea", "gdArea.xs": "gdArea.xs", "gdArea.sm": "gdArea.sm", "gdArea.md": "gdArea.md", "gdArea.lg": "gdArea.lg", "gdArea.xl": "gdArea.xl", "gdArea.lt-sm": "gdArea.lt-sm", "gdArea.lt-md": "gdArea.lt-md", "gdArea.lt-lg": "gdArea.lt-lg", "gdArea.lt-xl": "gdArea.lt-xl", "gdArea.gt-xs": "gdArea.gt-xs", "gdArea.gt-sm": "gdArea.gt-sm", "gdArea.gt-md": "gdArea.gt-md", "gdArea.gt-lg": "gdArea.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAreaDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$8, inputs: inputs$8 }]
        }] });

const DEFAULT_VALUE$6 = 'none';
const DELIMETER = '|';
class GridAreasStyleBuiler extends StyleBuilder {
    buildStyles(input, parent) {
        const areas = (input || DEFAULT_VALUE$6)
            .split(DELIMETER)
            .map((v) => `"${v.trim()}"`);
        return {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-template-areas': areas.join(' '),
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreasStyleBuiler, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreasStyleBuiler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreasStyleBuiler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$7 = [
    'gdAreas',
    'gdAreas.xs',
    'gdAreas.sm',
    'gdAreas.md',
    'gdAreas.lg',
    'gdAreas.xl',
    'gdAreas.lt-sm',
    'gdAreas.lt-md',
    'gdAreas.lt-lg',
    'gdAreas.lt-xl',
    'gdAreas.gt-xs',
    'gdAreas.gt-sm',
    'gdAreas.gt-md',
    'gdAreas.gt-lg',
];
const selector$7 = `
  [gdAreas],
  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],
  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],
  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]
`;
class GridAreasDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'grid-areas';
        this.inputs = inputs$7;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? areasInlineCache : areasCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreasDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridAreasStyleBuiler }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAreasDirective, isStandalone: true, selector: "\n  [gdAreas],\n  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],\n  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],\n  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]\n", inputs: { gdAreas: "gdAreas", "gdAreas.xs": "gdAreas.xs", "gdAreas.sm": "gdAreas.sm", "gdAreas.md": "gdAreas.md", "gdAreas.lg": "gdAreas.lg", "gdAreas.xl": "gdAreas.xl", "gdAreas.lt-sm": "gdAreas.lt-sm", "gdAreas.lt-md": "gdAreas.lt-md", "gdAreas.lt-lg": "gdAreas.lt-lg", "gdAreas.lt-xl": "gdAreas.lt-xl", "gdAreas.gt-xs": "gdAreas.gt-xs", "gdAreas.gt-sm": "gdAreas.gt-sm", "gdAreas.gt-md": "gdAreas.gt-md", "gdAreas.gt-lg": "gdAreas.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAreasDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$7, inputs: inputs$7 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridAreasStyleBuiler }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const areasCache = new Map();
const areasInlineCache = new Map();
/**
 * 'grid-template-areas' CSS Grid styling directive
 * Configures the names of elements within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-14
 */
/**
 * @deprecated The DefaultGridAreasDirective will be removed in version 21.
 * Use GridAreasDirective directly instead.
 */
class DefaultGridAreasDirective extends GridAreasDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$7;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAreasDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAreasDirective, isStandalone: true, selector: "\n  [gdAreas],\n  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],\n  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],\n  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]\n", inputs: { gdAreas: "gdAreas", "gdAreas.xs": "gdAreas.xs", "gdAreas.sm": "gdAreas.sm", "gdAreas.md": "gdAreas.md", "gdAreas.lg": "gdAreas.lg", "gdAreas.xl": "gdAreas.xl", "gdAreas.lt-sm": "gdAreas.lt-sm", "gdAreas.lt-md": "gdAreas.lt-md", "gdAreas.lt-lg": "gdAreas.lt-lg", "gdAreas.lt-xl": "gdAreas.lt-xl", "gdAreas.gt-xs": "gdAreas.gt-xs", "gdAreas.gt-sm": "gdAreas.gt-sm", "gdAreas.gt-md": "gdAreas.gt-md", "gdAreas.gt-lg": "gdAreas.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAreasDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$7, inputs: inputs$7 }]
        }] });

const DEFAULT_VALUE$5 = 'initial';
class GridAutoStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        let [direction, dense] = (input || DEFAULT_VALUE$5).split(' ');
        if (direction !== 'column' &&
            direction !== 'row' &&
            direction !== 'dense') {
            direction = 'row';
        }
        dense = dense === 'dense' && direction !== 'dense' ? ' dense' : '';
        return {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-flow': direction + dense,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAutoStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAutoStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAutoStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$6 = [
    'gdAuto',
    'gdAuto.xs',
    'gdAuto.sm',
    'gdAuto.md',
    'gdAuto.lg',
    'gdAuto.xl',
    'gdAuto.lt-sm',
    'gdAuto.lt-md',
    'gdAuto.lt-lg',
    'gdAuto.lt-xl',
    'gdAuto.gt-xs',
    'gdAuto.gt-sm',
    'gdAuto.gt-md',
    'gdAuto.gt-lg',
];
const selector$6 = `
  [gdAuto],
  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],
  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],
  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]
`;
class GridAutoDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this._inline = false;
        this.DIRECTIVE_KEY = 'grid-auto';
        this.inputs = inputs$6;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? autoInlineCache : autoCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAutoDirective, deps: [{ token: i0.ElementRef }, { token: GridAutoStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAutoDirective, isStandalone: true, selector: "\n  [gdAuto],\n  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],\n  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],\n  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]\n", inputs: { gdAuto: "gdAuto", "gdAuto.xs": "gdAuto.xs", "gdAuto.sm": "gdAuto.sm", "gdAuto.md": "gdAuto.md", "gdAuto.lg": "gdAuto.lg", "gdAuto.xl": "gdAuto.xl", "gdAuto.lt-sm": "gdAuto.lt-sm", "gdAuto.lt-md": "gdAuto.lt-md", "gdAuto.lt-lg": "gdAuto.lt-lg", "gdAuto.lt-xl": "gdAuto.lt-xl", "gdAuto.gt-xs": "gdAuto.gt-xs", "gdAuto.gt-sm": "gdAuto.gt-sm", "gdAuto.gt-md": "gdAuto.gt-md", "gdAuto.gt-lg": "gdAuto.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAutoDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$6, inputs: inputs$6 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAutoStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const autoCache = new Map();
const autoInlineCache = new Map();
/**
 * 'grid-auto-flow' CSS Grid styling directive
 * Configures the auto placement algorithm for the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-23
 */
/**
 * @deprecated The DefaultGridAutoDirective will be removed in version 21.
 * Use GridAutoDirective directly instead.
 */
class DefaultGridAutoDirective extends GridAutoDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$6;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAutoDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAutoDirective, isStandalone: true, selector: "\n  [gdAuto],\n  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],\n  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],\n  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]\n", inputs: { gdAuto: "gdAuto", "gdAuto.xs": "gdAuto.xs", "gdAuto.sm": "gdAuto.sm", "gdAuto.md": "gdAuto.md", "gdAuto.lg": "gdAuto.lg", "gdAuto.xl": "gdAuto.xl", "gdAuto.lt-sm": "gdAuto.lt-sm", "gdAuto.lt-md": "gdAuto.lt-md", "gdAuto.lt-lg": "gdAuto.lt-lg", "gdAuto.lt-xl": "gdAuto.lt-xl", "gdAuto.gt-xs": "gdAuto.gt-xs", "gdAuto.gt-sm": "gdAuto.gt-sm", "gdAuto.gt-md": "gdAuto.gt-md", "gdAuto.gt-lg": "gdAuto.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAutoDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$6, inputs: inputs$6 }]
        }] });

const DEFAULT_VALUE$4 = 'auto';
class GridColumnStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-column': input || DEFAULT_VALUE$4 };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$5 = [
    'gdColumn',
    'gdColumn.xs',
    'gdColumn.sm',
    'gdColumn.md',
    'gdColumn.lg',
    'gdColumn.xl',
    'gdColumn.lt-sm',
    'gdColumn.lt-md',
    'gdColumn.lt-lg',
    'gdColumn.lt-xl',
    'gdColumn.gt-xs',
    'gdColumn.gt-sm',
    'gdColumn.gt-md',
    'gdColumn.gt-lg',
];
const selector$5 = `
  [gdColumn],
  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],
  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],
  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]
`;
class GridColumnDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-column';
        this.inputs = inputs$5;
        this.styleCache = columnCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridColumnDirective, isStandalone: true, selector: "\n  [gdColumn],\n  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],\n  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],\n  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]\n", inputs: { gdColumn: "gdColumn", "gdColumn.xs": "gdColumn.xs", "gdColumn.sm": "gdColumn.sm", "gdColumn.md": "gdColumn.md", "gdColumn.lg": "gdColumn.lg", "gdColumn.xl": "gdColumn.xl", "gdColumn.lt-sm": "gdColumn.lt-sm", "gdColumn.lt-md": "gdColumn.lt-md", "gdColumn.lt-lg": "gdColumn.lt-lg", "gdColumn.lt-xl": "gdColumn.lt-xl", "gdColumn.gt-xs": "gdColumn.gt-xs", "gdColumn.gt-sm": "gdColumn.gt-sm", "gdColumn.gt-md": "gdColumn.gt-md", "gdColumn.gt-lg": "gdColumn.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$5, inputs: inputs$5 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridColumnStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }] });
const columnCache = new Map();
/**
 * 'grid-column' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
/**
 * @deprecated The DefaultGridColumnDirective will be removed in version 21.
 * Use GridColumnDirective directly instead.
 */
class DefaultGridColumnDirective extends GridColumnDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$5;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridColumnDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridColumnDirective, isStandalone: true, selector: "\n  [gdColumn],\n  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],\n  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],\n  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]\n", inputs: { gdColumn: "gdColumn", "gdColumn.xs": "gdColumn.xs", "gdColumn.sm": "gdColumn.sm", "gdColumn.md": "gdColumn.md", "gdColumn.lg": "gdColumn.lg", "gdColumn.xl": "gdColumn.xl", "gdColumn.lt-sm": "gdColumn.lt-sm", "gdColumn.lt-md": "gdColumn.lt-md", "gdColumn.lt-lg": "gdColumn.lt-lg", "gdColumn.lt-xl": "gdColumn.lt-xl", "gdColumn.gt-xs": "gdColumn.gt-xs", "gdColumn.gt-sm": "gdColumn.gt-sm", "gdColumn.gt-md": "gdColumn.gt-md", "gdColumn.gt-lg": "gdColumn.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridColumnDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$5, inputs: inputs$5 }]
        }] });

const DEFAULT_VALUE$3 = 'none';
const AUTO_SPECIFIER$1 = '!';
class GridColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        input = input || DEFAULT_VALUE$3;
        let auto = false;
        if (input.endsWith(AUTO_SPECIFIER$1)) {
            input = input.substring(0, input.indexOf(AUTO_SPECIFIER$1));
            auto = true;
        }
        const css = {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-columns': '',
            'grid-template-columns': '',
        };
        const key = auto ? 'grid-auto-columns' : 'grid-template-columns';
        css[key] = input;
        return css;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnsStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$4 = [
    'gdColumns',
    'gdColumns.xs',
    'gdColumns.sm',
    'gdColumns.md',
    'gdColumns.lg',
    'gdColumns.xl',
    'gdColumns.lt-sm',
    'gdColumns.lt-md',
    'gdColumns.lt-lg',
    'gdColumns.lt-xl',
    'gdColumns.gt-xs',
    'gdColumns.gt-sm',
    'gdColumns.gt-md',
    'gdColumns.gt-lg',
];
const selector$4 = `
  [gdColumns],
  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],
  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],
  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]
`;
class GridColumnsDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-columns';
        this.inputs = inputs$4;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? columnsInlineCache : columnsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridColumnsDirective, isStandalone: true, selector: "\n  [gdColumns],\n  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],\n  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],\n  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]\n", inputs: { gdColumns: "gdColumns", "gdColumns.xs": "gdColumns.xs", "gdColumns.sm": "gdColumns.sm", "gdColumns.md": "gdColumns.md", "gdColumns.lg": "gdColumns.lg", "gdColumns.xl": "gdColumns.xl", "gdColumns.lt-sm": "gdColumns.lt-sm", "gdColumns.lt-md": "gdColumns.lt-md", "gdColumns.lt-lg": "gdColumns.lt-lg", "gdColumns.lt-xl": "gdColumns.lt-xl", "gdColumns.gt-xs": "gdColumns.gt-xs", "gdColumns.gt-sm": "gdColumns.gt-sm", "gdColumns.gt-md": "gdColumns.gt-md", "gdColumns.gt-lg": "gdColumns.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$4, inputs: inputs$4 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const columnsCache = new Map();
const columnsInlineCache = new Map();
/**
 * 'grid-template-columns' CSS Grid styling directive
 * Configures the sizing for the columns in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
/**
 * @deprecated The DefaultGridColumnsDirective will be removed in version 21.
 * Use GridColumnsDirective directly instead.
 */
class DefaultGridColumnsDirective extends GridColumnsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$4;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridColumnsDirective, isStandalone: true, selector: "\n  [gdColumns],\n  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],\n  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],\n  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]\n", inputs: { gdColumns: "gdColumns", "gdColumns.xs": "gdColumns.xs", "gdColumns.sm": "gdColumns.sm", "gdColumns.md": "gdColumns.md", "gdColumns.lg": "gdColumns.lg", "gdColumns.xl": "gdColumns.xl", "gdColumns.lt-sm": "gdColumns.lt-sm", "gdColumns.lt-md": "gdColumns.lt-md", "gdColumns.lt-lg": "gdColumns.lt-lg", "gdColumns.lt-xl": "gdColumns.lt-xl", "gdColumns.gt-xs": "gdColumns.gt-xs", "gdColumns.gt-sm": "gdColumns.gt-sm", "gdColumns.gt-md": "gdColumns.gt-md", "gdColumns.gt-lg": "gdColumns.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$4, inputs: inputs$4 }]
        }] });

const DEFAULT_VALUE$2 = '0';
class GridGapStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-gap': input || DEFAULT_VALUE$2,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridGapStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridGapStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridGapStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$3 = [
    'gdGap',
    'gdGap.xs',
    'gdGap.sm',
    'gdGap.md',
    'gdGap.lg',
    'gdGap.xl',
    'gdGap.lt-sm',
    'gdGap.lt-md',
    'gdGap.lt-lg',
    'gdGap.lt-xl',
    'gdGap.gt-xs',
    'gdGap.gt-sm',
    'gdGap.gt-md',
    'gdGap.gt-lg',
];
const selector$3 = `
  [gdGap],
  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],
  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],
  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]
`;
class GridGapDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'grid-gap';
        this.inputs = inputs$3;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? gapInlineCache : gapCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridGapDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridGapStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridGapDirective, isStandalone: true, selector: "\n  [gdGap],\n  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],\n  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],\n  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]\n", inputs: { gdGap: "gdGap", "gdGap.xs": "gdGap.xs", "gdGap.sm": "gdGap.sm", "gdGap.md": "gdGap.md", "gdGap.lg": "gdGap.lg", "gdGap.xl": "gdGap.xl", "gdGap.lt-sm": "gdGap.lt-sm", "gdGap.lt-md": "gdGap.lt-md", "gdGap.lt-lg": "gdGap.lt-lg", "gdGap.lt-xl": "gdGap.lt-xl", "gdGap.gt-xs": "gdGap.gt-xs", "gdGap.gt-sm": "gdGap.gt-sm", "gdGap.gt-md": "gdGap.gt-md", "gdGap.gt-lg": "gdGap.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridGapDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$3, inputs: inputs$3 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridGapStyleBuilder }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const gapCache = new Map();
const gapInlineCache = new Map();
/**
 * 'grid-gap' CSS Grid styling directive
 * Configures the gap between items in the grid
 * Syntax: <row gap> [<column-gap>]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-17
 */
/**
 * @deprecated The DefaultGridGapDirective will be removed in version 21.
 * Use GridGapDirective directly instead.
 */
class DefaultGridGapDirective extends GridGapDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$3;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridGapDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridGapDirective, isStandalone: true, selector: "\n  [gdGap],\n  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],\n  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],\n  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]\n", inputs: { gdGap: "gdGap", "gdGap.xs": "gdGap.xs", "gdGap.sm": "gdGap.sm", "gdGap.md": "gdGap.md", "gdGap.lg": "gdGap.lg", "gdGap.xl": "gdGap.xl", "gdGap.lt-sm": "gdGap.lt-sm", "gdGap.lt-md": "gdGap.lt-md", "gdGap.lt-lg": "gdGap.lt-lg", "gdGap.lt-xl": "gdGap.lt-xl", "gdGap.gt-xs": "gdGap.gt-xs", "gdGap.gt-sm": "gdGap.gt-sm", "gdGap.gt-md": "gdGap.gt-md", "gdGap.gt-lg": "gdGap.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridGapDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$3, inputs: inputs$3 }]
        }] });

const ROW_DEFAULT = 'stretch';
const COL_DEFAULT = 'stretch';
class GridAlignStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return buildCss(input || ROW_DEFAULT);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$2 = [
    'gdGridAlign',
    'gdGridAlign.xs',
    'gdGridAlign.sm',
    'gdGridAlign.md',
    'gdGridAlign.lg',
    'gdGridAlign.xl',
    'gdGridAlign.lt-sm',
    'gdGridAlign.lt-md',
    'gdGridAlign.lt-lg',
    'gdGridAlign.lt-xl',
    'gdGridAlign.gt-xs',
    'gdGridAlign.gt-sm',
    'gdGridAlign.gt-md',
    'gdGridAlign.gt-lg',
];
const selector$2 = `
  [gdGridAlign],
  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],
  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],
  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]
`;
class GridAlignDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-align';
        this.inputs = inputs$2;
        this.styleCache = alignCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridAlignDirective, isStandalone: true, selector: "\n  [gdGridAlign],\n  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],\n  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],\n  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]\n", inputs: { gdGridAlign: "gdGridAlign", "gdGridAlign.xs": "gdGridAlign.xs", "gdGridAlign.sm": "gdGridAlign.sm", "gdGridAlign.md": "gdGridAlign.md", "gdGridAlign.lg": "gdGridAlign.lg", "gdGridAlign.xl": "gdGridAlign.xl", "gdGridAlign.lt-sm": "gdGridAlign.lt-sm", "gdGridAlign.lt-md": "gdGridAlign.lt-md", "gdGridAlign.lt-lg": "gdGridAlign.lt-lg", "gdGridAlign.lt-xl": "gdGridAlign.lt-xl", "gdGridAlign.gt-xs": "gdGridAlign.gt-xs", "gdGridAlign.gt-sm": "gdGridAlign.gt-sm", "gdGridAlign.gt-md": "gdGridAlign.gt-md", "gdGridAlign.gt-lg": "gdGridAlign.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridAlignDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$2, inputs: inputs$2 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAlignStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }] });
const alignCache = new Map();
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
class DefaultGridAlignDirective extends GridAlignDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$2;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridAlignDirective, isStandalone: true, selector: "\n  [gdGridAlign],\n  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],\n  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],\n  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]\n", inputs: { gdGridAlign: "gdGridAlign", "gdGridAlign.xs": "gdGridAlign.xs", "gdGridAlign.sm": "gdGridAlign.sm", "gdGridAlign.md": "gdGridAlign.md", "gdGridAlign.lg": "gdGridAlign.lg", "gdGridAlign.xl": "gdGridAlign.xl", "gdGridAlign.lt-sm": "gdGridAlign.lt-sm", "gdGridAlign.lt-md": "gdGridAlign.lt-md", "gdGridAlign.lt-lg": "gdGridAlign.lt-lg", "gdGridAlign.lt-xl": "gdGridAlign.lt-xl", "gdGridAlign.gt-xs": "gdGridAlign.gt-xs", "gdGridAlign.gt-sm": "gdGridAlign.gt-sm", "gdGridAlign.gt-md": "gdGridAlign.gt-md", "gdGridAlign.gt-lg": "gdGridAlign.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridAlignDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$2, inputs: inputs$2 }]
        }] });
function buildCss(align = '') {
    const css = {}, [rowAxis, columnAxis] = align.split(' ');
    // Row axis
    switch (rowAxis) {
        case 'end':
            css['justify-self'] = 'end';
            break;
        case 'center':
            css['justify-self'] = 'center';
            break;
        case 'stretch':
            css['justify-self'] = 'stretch';
            break;
        case 'start':
            css['justify-self'] = 'start';
            break;
        default: // default row axis
            css['justify-self'] = ROW_DEFAULT;
            break;
    }
    // Column axis
    switch (columnAxis) {
        case 'end':
            css['align-self'] = 'end';
            break;
        case 'center':
            css['align-self'] = 'center';
            break;
        case 'stretch':
            css['align-self'] = 'stretch';
            break;
        case 'start':
            css['align-self'] = 'start';
            break;
        default: // default column axis
            css['align-self'] = COL_DEFAULT;
            break;
    }
    return css;
}

const DEFAULT_VALUE$1 = 'auto';
class GridRowStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        return { 'grid-row': input || DEFAULT_VALUE$1 };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs$1 = [
    'gdRow',
    'gdRow.xs',
    'gdRow.sm',
    'gdRow.md',
    'gdRow.lg',
    'gdRow.xl',
    'gdRow.lt-sm',
    'gdRow.lt-md',
    'gdRow.lt-lg',
    'gdRow.lt-xl',
    'gdRow.gt-xs',
    'gdRow.gt-sm',
    'gdRow.gt-md',
    'gdRow.gt-lg',
];
const selector$1 = `
  [gdRow],
  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],
  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],
  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]
`;
class GridRowDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-row';
        this.inputs = inputs$1;
        this.styleCache = rowCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowDirective, deps: [{ token: i0.ElementRef }, { token: GridRowStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridRowDirective, isStandalone: true, selector: "\n  [gdRow],\n  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],\n  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],\n  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]\n", inputs: { gdRow: "gdRow", "gdRow.xs": "gdRow.xs", "gdRow.sm": "gdRow.sm", "gdRow.md": "gdRow.md", "gdRow.lg": "gdRow.lg", "gdRow.xl": "gdRow.xl", "gdRow.lt-sm": "gdRow.lt-sm", "gdRow.lt-md": "gdRow.lt-md", "gdRow.lt-lg": "gdRow.lt-lg", "gdRow.lt-xl": "gdRow.lt-xl", "gdRow.gt-xs": "gdRow.gt-xs", "gdRow.gt-sm": "gdRow.gt-sm", "gdRow.gt-md": "gdRow.gt-md", "gdRow.gt-lg": "gdRow.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$1, inputs: inputs$1 }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridRowStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }] });
const rowCache = new Map();
/**
 * 'grid-row' CSS Grid styling directive
 * Configures the name or position of an element within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-26
 */
/**
 * @deprecated The DefaultGridRowDirective will be removed in version 21.
 * Use GridRowDirective directly instead.
 */
class DefaultGridRowDirective extends GridRowDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs$1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridRowDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridRowDirective, isStandalone: true, selector: "\n  [gdRow],\n  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],\n  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],\n  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]\n", inputs: { gdRow: "gdRow", "gdRow.xs": "gdRow.xs", "gdRow.sm": "gdRow.sm", "gdRow.md": "gdRow.md", "gdRow.lg": "gdRow.lg", "gdRow.xl": "gdRow.xl", "gdRow.lt-sm": "gdRow.lt-sm", "gdRow.lt-md": "gdRow.lt-md", "gdRow.lt-lg": "gdRow.lt-lg", "gdRow.lt-xl": "gdRow.lt-xl", "gdRow.gt-xs": "gdRow.gt-xs", "gdRow.gt-sm": "gdRow.gt-sm", "gdRow.gt-md": "gdRow.gt-md", "gdRow.gt-lg": "gdRow.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridRowDirective, decorators: [{
            type: Directive,
            args: [{ selector: selector$1, inputs: inputs$1 }]
        }] });

const DEFAULT_VALUE = 'none';
const AUTO_SPECIFIER = '!';
class GridRowsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        input = input || DEFAULT_VALUE;
        let auto = false;
        if (input.endsWith(AUTO_SPECIFIER)) {
            input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
            auto = true;
        }
        const css = {
            display: parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-rows': '',
            'grid-template-rows': '',
        };
        const key = auto ? 'grid-auto-rows' : 'grid-template-rows';
        css[key] = input;
        return css;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowsStyleBuilder, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'gdRows',
    'gdRows.xs',
    'gdRows.sm',
    'gdRows.md',
    'gdRows.lg',
    'gdRows.xl',
    'gdRows.lt-sm',
    'gdRows.lt-md',
    'gdRows.lt-lg',
    'gdRows.lt-xl',
    'gdRows.gt-xs',
    'gdRows.gt-sm',
    'gdRows.gt-md',
    'gdRows.gt-lg',
];
const selector = `
  [gdRows],
  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],
  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],
  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]
`;
class GridRowsDirective extends BaseDirective2 {
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = coerceBooleanProperty(val);
    }
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.DIRECTIVE_KEY = 'grid-rows';
        this.inputs = inputs;
        this._inline = false;
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? rowsInlineCache : rowsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowsDirective, deps: [{ token: i0.ElementRef }, { token: GridRowsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: GridRowsDirective, isStandalone: true, selector: "\n  [gdRows],\n  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],\n  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],\n  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]\n", inputs: { gdRows: "gdRows", "gdRows.xs": "gdRows.xs", "gdRows.sm": "gdRows.sm", "gdRows.md": "gdRows.md", "gdRows.lg": "gdRows.lg", "gdRows.xl": "gdRows.xl", "gdRows.lt-sm": "gdRows.lt-sm", "gdRows.lt-md": "gdRows.lt-md", "gdRows.lt-lg": "gdRows.lt-lg", "gdRows.lt-xl": "gdRows.lt-xl", "gdRows.gt-xs": "gdRows.gt-xs", "gdRows.gt-sm": "gdRows.gt-sm", "gdRows.gt-md": "gdRows.gt-md", "gdRows.gt-lg": "gdRows.gt-lg", inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridRowsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const rowsCache = new Map();
const rowsInlineCache = new Map();
/**
 * 'grid-template-rows' CSS Grid styling directive
 * Configures the sizing for the rows in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
/**
 * @deprecated The DefaultGridRowsDirective will be removed in version 21.
 * Use GridRowsDirective directly instead.
 */
class DefaultGridRowsDirective extends GridRowsDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridRowsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.6", type: DefaultGridRowsDirective, isStandalone: true, selector: "\n  [gdRows],\n  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],\n  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],\n  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]\n", inputs: { gdRows: "gdRows", "gdRows.xs": "gdRows.xs", "gdRows.sm": "gdRows.sm", "gdRows.md": "gdRows.md", "gdRows.lg": "gdRows.lg", "gdRows.xl": "gdRows.xl", "gdRows.lt-sm": "gdRows.lt-sm", "gdRows.lt-md": "gdRows.lt-md", "gdRows.lt-lg": "gdRows.lt-lg", "gdRows.lt-xl": "gdRows.lt-xl", "gdRows.gt-xs": "gdRows.gt-xs", "gdRows.gt-sm": "gdRows.gt-sm", "gdRows.gt-md": "gdRows.gt-md", "gdRows.gt-lg": "gdRows.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DefaultGridRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.6", ngImport: i0, type: GridModule, imports: [CoreModule, DefaultGridAlignDirective,
            DefaultGridAlignColumnsDirective,
            DefaultGridAlignRowsDirective,
            DefaultGridAreaDirective,
            DefaultGridAreasDirective,
            DefaultGridAutoDirective,
            DefaultGridColumnDirective,
            DefaultGridColumnsDirective,
            DefaultGridGapDirective,
            DefaultGridRowDirective,
            DefaultGridRowsDirective], exports: [DefaultGridAlignDirective,
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
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridModule, imports: [CoreModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: GridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule, ...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultGridAlignColumnsDirective, DefaultGridAlignDirective, DefaultGridAlignRowsDirective, DefaultGridAreaDirective, DefaultGridAreasDirective, DefaultGridAutoDirective, DefaultGridColumnDirective, DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowDirective, DefaultGridRowsDirective, GridAlignColumnsDirective, GridAlignColumnsStyleBuilder, GridAlignDirective, GridAlignRowsDirective, GridAlignRowsStyleBuilder, GridAlignStyleBuilder, GridAreaDirective, GridAreaStyleBuilder, GridAreasDirective, GridAreasStyleBuiler, GridAutoDirective, GridAutoStyleBuilder, GridColumnDirective, GridColumnStyleBuilder, GridColumnsDirective, GridColumnsStyleBuilder, GridGapDirective, GridGapStyleBuilder, GridModule, GridRowDirective, GridRowStyleBuilder, GridRowsDirective, GridRowsStyleBuilder };
//# sourceMappingURL=ngbracket-ngx-layout-grid.mjs.map
