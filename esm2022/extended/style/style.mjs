/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer, NgStyle } from '@angular/common';
import { Directive, Inject, Optional, PLATFORM_ID, SecurityContext, Self, } from '@angular/core';
import { BaseDirective2, SERVER_TOKEN, } from '@ngbracket/ngx-layout/core';
import { buildMapFromSet, buildRawList, getType, keyValuesToMap, stringToKeyValue, } from './style-transforms';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
class StyleDirective extends BaseDirective2 {
    constructor(elementRef, styler, marshal, sanitizer, differs, renderer2, ngStyleInstance, serverLoaded, platformId) {
        super(elementRef, null, styler, marshal);
        this.sanitizer = sanitizer;
        this.ngStyleInstance = ngStyleInstance;
        this.DIRECTIVE_KEY = 'ngStyle';
        if (!this.ngStyleInstance) {
            // Create an instance NgStyle Directive instance only if `ngStyle=""` has NOT been
            // defined on the same host element; since the responsive variations may be defined...
            this.ngStyleInstance = new NgStyle(elementRef, differs, renderer2);
        }
        this.init();
        const styles = this.nativeElement.getAttribute('style') ?? '';
        this.fallbackStyles = this.buildStyleMap(styles);
        this.isServer = serverLoaded && isPlatformServer(platformId);
    }
    /** Add generated styles */
    updateWithValue(value) {
        const styles = this.buildStyleMap(value);
        this.ngStyleInstance.ngStyle = { ...this.fallbackStyles, ...styles };
        if (this.isServer) {
            this.applyStyleToElement(styles);
        }
        this.ngStyleInstance.ngDoCheck();
    }
    /** Remove generated styles */
    clearStyles() {
        this.ngStyleInstance.ngStyle = this.fallbackStyles;
        this.ngStyleInstance.ngDoCheck();
    }
    /**
     * Convert raw strings to ngStyleMap; which is required by ngStyle
     * NOTE: Raw string key-value pairs MUST be delimited by `;`
     *       Comma-delimiters are not supported due to complexities of
     *       possible style values such as `rgba(x,x,x,x)` and others
     */
    buildStyleMap(styles) {
        // Always safe-guard (aka sanitize) style property values
        const sanitizer = (val) => this.sanitizer.sanitize(SecurityContext.STYLE, val) ?? '';
        if (styles) {
            switch (getType(styles)) {
                case 'string':
                    return buildMapFromList(buildRawList(styles), sanitizer);
                case 'array':
                    return buildMapFromList(styles, sanitizer);
                case 'set':
                    return buildMapFromSet(styles, sanitizer);
                default:
                    return buildMapFromSet(styles, sanitizer);
            }
        }
        return {};
    }
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /** For ChangeDetectionStrategy.onPush and ngOnChanges() updates */
    ngDoCheck() {
        this.ngStyleInstance.ngDoCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-c9a4500", ngImport: i0, type: StyleDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i2.DomSanitizer }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i3.NgStyle, optional: true, self: true }, { token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-c9a4500", type: StyleDirective, usesInheritance: true, ngImport: i0 }); }
}
export { StyleDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-c9a4500", ngImport: i0, type: StyleDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: i2.DomSanitizer }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }, { type: i3.NgStyle, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
const inputs = [
    'ngStyle',
    'ngStyle.xs',
    'ngStyle.sm',
    'ngStyle.md',
    'ngStyle.lg',
    'ngStyle.xl',
    'ngStyle.lt-sm',
    'ngStyle.lt-md',
    'ngStyle.lt-lg',
    'ngStyle.lt-xl',
    'ngStyle.gt-xs',
    'ngStyle.gt-sm',
    'ngStyle.gt-md',
    'ngStyle.gt-lg',
];
const selector = `
  [ngStyle],
  [ngStyle.xs], [ngStyle.sm], [ngStyle.md], [ngStyle.lg], [ngStyle.xl],
  [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],
  [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]
`;
/**
 * Directive to add responsive support for ngStyle.
 *
 */
class DefaultStyleDirective extends StyleDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-c9a4500", ngImport: i0, type: DefaultStyleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-c9a4500", type: DefaultStyleDirective, selector: "\n  [ngStyle],\n  [ngStyle.xs], [ngStyle.sm], [ngStyle.md], [ngStyle.lg], [ngStyle.xl],\n  [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],\n  [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]\n", inputs: { ngStyle: "ngStyle", "ngStyle.xs": "ngStyle.xs", "ngStyle.sm": "ngStyle.sm", "ngStyle.md": "ngStyle.md", "ngStyle.lg": "ngStyle.lg", "ngStyle.xl": "ngStyle.xl", "ngStyle.lt-sm": "ngStyle.lt-sm", "ngStyle.lt-md": "ngStyle.lt-md", "ngStyle.lt-lg": "ngStyle.lt-lg", "ngStyle.lt-xl": "ngStyle.lt-xl", "ngStyle.gt-xs": "ngStyle.gt-xs", "ngStyle.gt-sm": "ngStyle.gt-sm", "ngStyle.gt-md": "ngStyle.gt-md", "ngStyle.gt-lg": "ngStyle.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
export { DefaultStyleDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-c9a4500", ngImport: i0, type: DefaultStyleDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
/** Build a styles map from a list of styles, while sanitizing bad values first */
function buildMapFromList(styles, sanitize) {
    const sanitizeValue = (it) => {
        if (sanitize) {
            it.value = sanitize(it.value);
        }
        return it;
    };
    return styles
        .map(stringToKeyValue)
        .filter((entry) => !!entry)
        .map(sanitizeValue)
        .reduce(keyValuesToMap, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL3N0eWxlL3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsU0FBUyxFQUdULE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxFQUVYLGVBQWUsRUFDZixJQUFJLEdBQ0wsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBRWIsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFlBQVksRUFDWixPQUFPLEVBQ1AsY0FBYyxFQU1kLGdCQUFnQixHQUNqQixNQUFNLG9CQUFvQixDQUFDOzs7OztBQUU1QixNQUNhLGNBQWUsU0FBUSxjQUFjO0lBS2hELFlBQ0UsVUFBc0IsRUFDdEIsTUFBa0IsRUFDbEIsT0FBd0IsRUFDZCxTQUF1QixFQUNqQyxPQUF3QixFQUN4QixTQUFvQixFQUNpQixlQUF3QixFQUN2QyxZQUFxQixFQUN0QixVQUFrQjtRQUV2QyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFQaEMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUdJLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBWDVDLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBZ0IzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixrRkFBa0Y7WUFDbEYsc0ZBQXNGO1lBQ3RGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNwRTtRQUNELElBQUksQ0FBQyxJQUFJLEVB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bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztBQUsvQixrRkFBa0Y7QUFDbEYsU0FBUyxnQkFBZ0IsQ0FDdkIsTUFBc0IsRUFDdEIsUUFBMkI7SUFFM0IsTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUFtQixFQUFFLEVBQUU7UUFDNUMsSUFBSSxRQUFRLEVBQUU7WUFDWixFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQztJQUVGLE9BQU8sTUFBTTtTQUNWLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNyQixNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDMUIsR0FBRyxDQUFDLGFBQWEsQ0FBQztTQUNsQixNQUFNLENBQUMsY0FBYyxFQUFFLEVBQWdCLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyLCBOZ1N0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBTZWN1cml0eUNvbnRleHQsXG4gIFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgTWVkaWFNYXJzaGFsbGVyLFxuICBTRVJWRVJfVE9LRU4sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9jb3JlJztcblxuaW1wb3J0IHtcbiAgYnVpbGRNYXBGcm9tU2V0LFxuICBidWlsZFJhd0xpc3QsXG4gIGdldFR5cGUsXG4gIGtleVZhbHVlc1RvTWFwLFxuICBOZ1N0eWxlS2V5VmFsdWUsXG4gIE5nU3R5bGVNYXAsXG4gIE5nU3R5bGVSYXdMaXN0LFxuICBOZ1N0eWxlU2FuaXRpemVyLFxuICBOZ1N0eWxlVHlwZSxcbiAgc3RyaW5nVG9LZXlWYWx1ZSxcbn0gZnJvbSAnLi9zdHlsZS10cmFuc2Zvcm1zJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgU3R5bGVEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICduZ1N0eWxlJztcbiAgcHJvdGVjdGVkIGZhbGxiYWNrU3R5bGVzOiBOZ1N0eWxlTWFwO1xuICBwcm90ZWN0ZWQgaXNTZXJ2ZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyLFxuICAgIHByb3RlY3RlZCBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIHJlYWRvbmx5IG5nU3R5bGVJbnN0YW5jZTogTmdTdHlsZSxcbiAgICBASW5qZWN0KFNFUlZFUl9UT0tFTikgc2VydmVyTG9hZGVkOiBib29sZWFuLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBudWxsISwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICBpZiAoIXRoaXMubmdTdHlsZUluc3RhbmNlKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2UgTmdTdHlsZSBEaXJlY3RpdmUgaW5zdGFuY2Ugb25seSBpZiBgbmdTdHlsZT1cIlwiYCBoYXMgTk9UIGJlZW5cbiAgICAgIC8vIGRlZmluZWQgb24gdGhlIHNhbWUgaG9zdCBlbGVtZW50OyBzaW5jZSB0aGUgcmVzcG9uc2l2ZSB2YXJpYXRpb25zIG1heSBiZSBkZWZpbmVkLi4uXG4gICAgICB0aGlzLm5nU3R5bGVJbnN0YW5jZSA9IG5ldyBOZ1N0eWxlKGVsZW1lbnRSZWYsIGRpZmZlcnMsIHJlbmRlcmVyMik7XG4gICAgfVxuICAgIHRoaXMuaW5pdCgpO1xuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgPz8gJyc7XG4gICAgdGhpcy5mYWxsYmFja1N0eWxlcyA9IHRoaXMuYnVpbGRTdHlsZU1hcChzdHlsZXMpO1xuICAgIHRoaXMuaXNTZXJ2ZXIgPSBzZXJ2ZXJMb2FkZWQgJiYgaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIC8qKiBBZGQgZ2VuZXJhdGVkIHN0eWxlcyAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVNYXAodmFsdWUpO1xuICAgIHRoaXMubmdTdHlsZUluc3RhbmNlLm5nU3R5bGUgPSB7IC4uLnRoaXMuZmFsbGJhY2tTdHlsZXMsIC4uLnN0eWxlcyB9O1xuICAgIGlmICh0aGlzLmlzU2VydmVyKSB7XG4gICAgICB0aGlzLmFwcGx5U3R5bGVUb0VsZW1lbnQoc3R5bGVzKTtcbiAgICB9XG4gICAgdGhpcy5uZ1N0eWxlSW5zdGFuY2UubmdEb0NoZWNrKCk7XG4gIH1cblxuICAvKiogUmVtb3ZlIGdlbmVyYXRlZCBzdHlsZXMgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNsZWFyU3R5bGVzKCkge1xuICAgIHRoaXMubmdTdHlsZUluc3RhbmNlLm5nU3R5bGUgPSB0aGlzLmZhbGxiYWNrU3R5bGVzO1xuICAgIHRoaXMubmdTdHlsZUluc3RhbmNlLm5nRG9DaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgcmF3IHN0cmluZ3MgdG8gbmdTdHlsZU1hcDsgd2hpY2ggaXMgcmVxdWlyZWQgYnkgbmdTdHlsZVxuICAgKiBOT1RFOiBSYXcgc3RyaW5nIGtleS12YWx1ZSBwYWlycyBNVVNUIGJlIGRlbGltaXRlZCBieSBgO2BcbiAgICogICAgICAgQ29tbWEtZGVsaW1pdGVycyBhcmUgbm90IHN1cHBvcnRlZCBkdWUgdG8gY29tcGxleGl0aWVzIG9mXG4gICAqICAgICAgIHBvc3NpYmxlIHN0eWxlIHZhbHVlcyBzdWNoIGFzIGByZ2JhKHgseCx4LHgpYCBhbmQgb3RoZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRTdHlsZU1hcChzdHlsZXM6IE5nU3R5bGVUeXBlKTogTmdTdHlsZU1hcCB7XG4gICAgLy8gQWx3YXlzIHNhZmUtZ3VhcmQgKGFrYSBzYW5pdGl6ZSkgc3R5bGUgcHJvcGVydHkgdmFsdWVzXG4gICAgY29uc3Qgc2FuaXRpemVyOiBOZ1N0eWxlU2FuaXRpemVyID0gKHZhbDogYW55KSA9PlxuICAgICAgdGhpcy5zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlNUWUxFLCB2YWwpID8/ICcnO1xuICAgIGlmIChzdHlsZXMpIHtcbiAgICAgIHN3aXRjaCAoZ2V0VHlwZShzdHlsZXMpKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgcmV0dXJuIGJ1aWxkTWFwRnJvbUxpc3QoYnVpbGRSYXdMaXN0KHN0eWxlcyksIHNhbml0aXplcik7XG4gICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICByZXR1cm4gYnVpbGRNYXBGcm9tTGlzdChzdHlsZXMgYXMgTmdTdHlsZVJhd0xpc3QsIHNhbml0aXplcik7XG4gICAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgICAgcmV0dXJuIGJ1aWxkTWFwRnJvbVNldChzdHlsZXMsIHNhbml0aXplcik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGJ1aWxkTWFwRnJvbVNldChzdHlsZXMsIHNhbml0aXplcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIExpZmVjeWNsZSBIb29rc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKiogRm9yIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lm9uUHVzaCBhbmQgbmdPbkNoYW5nZXMoKSB1cGRhdGVzICovXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLm5nU3R5bGVJbnN0YW5jZS5uZ0RvQ2hlY2soKTtcbiAgfVxufVxuXG5jb25zdCBpbnB1dHMgPSBbXG4gICduZ1N0eWxlJyxcbiAgJ25nU3R5bGUueHMnLFxuICAnbmdTdHlsZS5zbScsXG4gICduZ1N0eWxlLm1kJyxcbiAgJ25nU3R5bGUubGcnLFxuICAnbmdTdHlsZS54bCcsXG4gICduZ1N0eWxlLmx0LXNtJyxcbiAgJ25nU3R5bGUubHQtbWQnLFxuICAnbmdTdHlsZS5sdC1sZycsXG4gICduZ1N0eWxlLmx0LXhsJyxcbiAgJ25nU3R5bGUuZ3QteHMnLFxuICAnbmdTdHlsZS5ndC1zbScsXG4gICduZ1N0eWxlLmd0LW1kJyxcbiAgJ25nU3R5bGUuZ3QtbGcnLFxuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtuZ1N0eWxlXSxcbiAgW25nU3R5bGUueHNdLCBbbmdTdHlsZS5zbV0sIFtuZ1N0eWxlLm1kXSwgW25nU3R5bGUubGddLCBbbmdTdHlsZS54bF0sXG4gIFtuZ1N0eWxlLmx0LXNtXSwgW25nU3R5bGUubHQtbWRdLCBbbmdTdHlsZS5sdC1sZ10sIFtuZ1N0eWxlLmx0LXhsXSxcbiAgW25nU3R5bGUuZ3QteHNdLCBbbmdTdHlsZS5ndC1zbV0sIFtuZ1N0eWxlLmd0LW1kXSwgW25nU3R5bGUuZ3QtbGddXG5gO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgcmVzcG9uc2l2ZSBzdXBwb3J0IGZvciBuZ1N0eWxlLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0U3R5bGVEaXJlY3RpdmUgZXh0ZW5kcyBTdHlsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuXG4vKiogQnVpbGQgYSBzdHlsZXMgbWFwIGZyb20gYSBsaXN0IG9mIHN0eWxlcywgd2hpbGUgc2FuaXRpemluZyBiYWQgdmFsdWVzIGZpcnN0ICovXG5mdW5jdGlvbiBidWlsZE1hcEZyb21MaXN0KFxuICBzdHlsZXM6IE5nU3R5bGVSYXdMaXN0LFxuICBzYW5pdGl6ZT86IE5nU3R5bGVTYW5pdGl6ZXJcbik6IE5nU3R5bGVNYXAge1xuICBjb25zdCBzYW5pdGl6ZVZhbHVlID0gKGl0OiBOZ1N0eWxlS2V5VmFsdWUpID0+IHtcbiAgICBpZiAoc2FuaXRpemUpIHtcbiAgICAgIGl0LnZhbHVlID0gc2FuaXRpemUoaXQudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaXQ7XG4gIH07XG5cbiAgcmV0dXJuIHN0eWxlc1xuICAgIC5tYXAoc3RyaW5nVG9LZXlWYWx1ZSlcbiAgICAuZmlsdGVyKChlbnRyeSkgPT4gISFlbnRyeSlcbiAgICAubWFwKHNhbml0aXplVmFsdWUpXG4gICAgLnJlZHVjZShrZXlWYWx1ZXNUb01hcCwge30gYXMgTmdTdHlsZU1hcCk7XG59XG4iXX0=