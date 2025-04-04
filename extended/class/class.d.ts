import { NgClass } from '@angular/common';
import { DoCheck, ElementRef, Renderer2 } from '@angular/core';
import { BaseDirective2, MediaMarshaller, StyleUtils } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
export declare class ClassDirective extends BaseDirective2 implements DoCheck {
    protected readonly ngClassInstance: NgClass;
    protected DIRECTIVE_KEY: string;
    /**
     * Capture class assignments so we cache the default classes
     * which are merged with activated styles and used as fallbacks.
     */
    set klass(val: string);
    constructor(elementRef: ElementRef, styler: StyleUtils, marshal: MediaMarshaller, renderer2: Renderer2, ngClassInstance: NgClass);
    protected updateWithValue(value: any): void;
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClassDirective, [null, null, null, null, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClassDirective, "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", never, { "ngClass": { "alias": "ngClass"; "required": false; }; "ngClass.xs": { "alias": "ngClass.xs"; "required": false; }; "ngClass.sm": { "alias": "ngClass.sm"; "required": false; }; "ngClass.md": { "alias": "ngClass.md"; "required": false; }; "ngClass.lg": { "alias": "ngClass.lg"; "required": false; }; "ngClass.xl": { "alias": "ngClass.xl"; "required": false; }; "ngClass.lt-sm": { "alias": "ngClass.lt-sm"; "required": false; }; "ngClass.lt-md": { "alias": "ngClass.lt-md"; "required": false; }; "ngClass.lt-lg": { "alias": "ngClass.lt-lg"; "required": false; }; "ngClass.lt-xl": { "alias": "ngClass.lt-xl"; "required": false; }; "ngClass.gt-xs": { "alias": "ngClass.gt-xs"; "required": false; }; "ngClass.gt-sm": { "alias": "ngClass.gt-sm"; "required": false; }; "ngClass.gt-md": { "alias": "ngClass.gt-md"; "required": false; }; "ngClass.gt-lg": { "alias": "ngClass.gt-lg"; "required": false; }; "klass": { "alias": "class"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * Directive to add responsive support for ngClass.
 * This maintains the core functionality of 'ngClass' and adds responsive API
 * Note: this class is a no-op when rendered on the server
 * *  @deprecated The DefaultClassDirective will be removed in version 21.
 * Use ClassDirective directly instead.
 */
export declare class DefaultClassDirective extends ClassDirective {
    protected inputs: string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultClassDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DefaultClassDirective, "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", never, { "ngClass": { "alias": "ngClass"; "required": false; }; "ngClass.xs": { "alias": "ngClass.xs"; "required": false; }; "ngClass.sm": { "alias": "ngClass.sm"; "required": false; }; "ngClass.md": { "alias": "ngClass.md"; "required": false; }; "ngClass.lg": { "alias": "ngClass.lg"; "required": false; }; "ngClass.xl": { "alias": "ngClass.xl"; "required": false; }; "ngClass.lt-sm": { "alias": "ngClass.lt-sm"; "required": false; }; "ngClass.lt-md": { "alias": "ngClass.lt-md"; "required": false; }; "ngClass.lt-lg": { "alias": "ngClass.lt-lg"; "required": false; }; "ngClass.lt-xl": { "alias": "ngClass.lt-xl"; "required": false; }; "ngClass.gt-xs": { "alias": "ngClass.gt-xs"; "required": false; }; "ngClass.gt-sm": { "alias": "ngClass.gt-sm"; "required": false; }; "ngClass.gt-md": { "alias": "ngClass.gt-md"; "required": false; }; "ngClass.gt-lg": { "alias": "ngClass.gt-lg"; "required": false; }; }, {}, never, never, true, never>;
}
