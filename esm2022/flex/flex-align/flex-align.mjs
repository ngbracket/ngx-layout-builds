/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
class FlexAlignStyleBuilder extends StyleBuilder {
    buildStyles(input) {
        input = input || 'stretch';
        const styles = {};
        // Cross-axis
        switch (input) {
            case 'start':
                styles['align-self'] = 'flex-start';
                break;
            case 'end':
                styles['align-self'] = 'flex-end';
                break;
            default:
                styles['align-self'] = input;
                break;
        }
        return styles;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexAlignStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexAlignStyleBuilder, providedIn: 'root' }); }
}
export { FlexAlignStyleBuilder };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexAlignStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'fxFlexAlign',
    'fxFlexAlign.xs',
    'fxFlexAlign.sm',
    'fxFlexAlign.md',
    'fxFlexAlign.lg',
    'fxFlexAlign.xl',
    'fxFlexAlign.lt-sm',
    'fxFlexAlign.lt-md',
    'fxFlexAlign.lt-lg',
    'fxFlexAlign.lt-xl',
    'fxFlexAlign.gt-xs',
    'fxFlexAlign.gt-sm',
    'fxFlexAlign.gt-md',
    'fxFlexAlign.gt-lg',
];
const selector = `
  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],
  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],
  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],
  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]
`;
/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
class FlexAlignDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.DIRECTIVE_KEY = 'flex-align';
        this.styleCache = flexAlignCache;
        this.init();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexAlignDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexAlignStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.4", type: FlexAlignDirective, usesInheritance: true, ngImport: i0 }); }
}
export { FlexAlignDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: FlexAlignDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexAlignStyleBuilder }, { type: i1.MediaMarshaller }]; } });
const flexAlignCache = new Map();
class DefaultFlexAlignDirective extends FlexAlignDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: DefaultFlexAlignDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.4", type: DefaultFlexAlignDirective, selector: "\n  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],\n  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],\n  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],\n  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]\n", inputs: { fxFlexAlign: "fxFlexAlign", "fxFlexAlign.xs": "fxFlexAlign.xs", "fxFlexAlign.sm": "fxFlexAlign.sm", "fxFlexAlign.md": "fxFlexAlign.md", "fxFlexAlign.lg": "fxFlexAlign.lg", "fxFlexAlign.xl": "fxFlexAlign.xl", "fxFlexAlign.lt-sm": "fxFlexAlign.lt-sm", "fxFlexAlign.lt-md": "fxFlexAlign.lt-md", "fxFlexAlign.lt-lg": "fxFlexAlign.lt-lg", "fxFlexAlign.lt-xl": "fxFlexAlign.lt-xl", "fxFlexAlign.gt-xs": "fxFlexAlign.gt-xs", "fxFlexAlign.gt-sm": "fxFlexAlign.gt-sm", "fxFlexAlign.gt-md": "fxFlexAlign.gt-md", "fxFlexAlign.gt-lg": "fxFlexAlign.gt-lg" }, usesInheritance: true, ngImport: i0 }); }
}
export { DefaultFlexAlignDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: DefaultFlexAlignDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1hbGlnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9mbGV4LWFsaWduL2ZsZXgtYWxpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFFZCxZQUFZLEdBR2IsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBRXBDLE1BQ2EscUJBQXNCLFNBQVEsWUFBWTtJQUNyRCxXQUFXLENBQUMsS0FBYTtRQUN2QixLQUFLLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQztRQUMzQixNQUFNLE1BQU0sR0FBb0IsRUFBRSxDQUFDO1FBRW5DLGFBQWE7UUFDYixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDO2dCQUNwQyxNQUFNO1lBQ1IsS0FBSyxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ2xDLE1BQU07WUFDUjtnQkFDRSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixNQUFNO1NBQ1Q7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3FIQW5CVSxxQkFBcUI7eUhBQXJCLHFCQUFxQixjQURSLE1BQU07O1NBQ25CLHFCQUFxQjtrR0FBckIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUF1QmxDLE1BQU0sTUFBTSxHQUFHO0lBQ2IsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtDQUNwQixDQUFDO0FBQ0YsTUFBTSxRQUFRLEdBQUc7Ozs7O0NBS2hCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFDYSxrQkFBbUIsU0FBUSxjQUFjO0lBR3BELFlBQ0UsS0FBaUIsRUFDakIsVUFBc0IsRUFDdEIsWUFBbUMsRUFDbkMsT0FBd0I7UUFFeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUi9CLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBWTdCLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFIN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztxSEFYVSxrQkFBa0I7eUdBQWxCLGtCQUFrQjs7U0FBbEIsa0JBQWtCO2tHQUFsQixrQkFBa0I7a0JBRDlCLFNBQVM7O0FBaUJWLE1BQU0sY0FBYyxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRS9ELE1BQ2EseUJBQTBCLFNBQVEsa0JBQWtCO0lBRGpFOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDO3FIQUZZLHlCQUF5Qjt5R0FBekIseUJBQXlCOztTQUF6Qix5QkFBeUI7a0dBQXpCLHlCQUF5QjtrQkFEckMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG59IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGbGV4QWxpZ25TdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nKSB7XG4gICAgaW5wdXQgPSBpbnB1dCB8fCAnc3RyZXRjaCc7XG4gICAgY29uc3Qgc3R5bGVzOiBTdHlsZURlZmluaXRpb24gPSB7fTtcblxuICAgIC8vIENyb3NzLWF4aXNcbiAgICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHN0eWxlc1snYWxpZ24tc2VsZiddID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHN0eWxlc1snYWxpZ24tc2VsZiddID0gJ2ZsZXgtZW5kJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHlsZXNbJ2FsaWduLXNlbGYnXSA9IGlucHV0O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG59XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2Z4RmxleEFsaWduJyxcbiAgJ2Z4RmxleEFsaWduLnhzJyxcbiAgJ2Z4RmxleEFsaWduLnNtJyxcbiAgJ2Z4RmxleEFsaWduLm1kJyxcbiAgJ2Z4RmxleEFsaWduLmxnJyxcbiAgJ2Z4RmxleEFsaWduLnhsJyxcbiAgJ2Z4RmxleEFsaWduLmx0LXNtJyxcbiAgJ2Z4RmxleEFsaWduLmx0LW1kJyxcbiAgJ2Z4RmxleEFsaWduLmx0LWxnJyxcbiAgJ2Z4RmxleEFsaWduLmx0LXhsJyxcbiAgJ2Z4RmxleEFsaWduLmd0LXhzJyxcbiAgJ2Z4RmxleEFsaWduLmd0LXNtJyxcbiAgJ2Z4RmxleEFsaWduLmd0LW1kJyxcbiAgJ2Z4RmxleEFsaWduLmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4RmxleEFsaWduXSwgW2Z4RmxleEFsaWduLnhzXSwgW2Z4RmxleEFsaWduLnNtXSwgW2Z4RmxleEFsaWduLm1kXSxcbiAgW2Z4RmxleEFsaWduLmxnXSwgW2Z4RmxleEFsaWduLnhsXSwgW2Z4RmxleEFsaWduLmx0LXNtXSwgW2Z4RmxleEFsaWduLmx0LW1kXSxcbiAgW2Z4RmxleEFsaWduLmx0LWxnXSwgW2Z4RmxleEFsaWduLmx0LXhsXSwgW2Z4RmxleEFsaWduLmd0LXhzXSwgW2Z4RmxleEFsaWduLmd0LXNtXSxcbiAgW2Z4RmxleEFsaWduLmd0LW1kXSwgW2Z4RmxleEFsaWduLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnZmxleC1hbGlnbicgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQWxsb3dzIGVsZW1lbnQtc3BlY2lmaWMgb3ZlcnJpZGVzIGZvciBjcm9zcy1heGlzIGFsaWdubWVudHMgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWxtYW5hYy9wcm9wZXJ0aWVzL2EvYWxpZ24tc2VsZi9cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgRmxleEFsaWduRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdmbGV4LWFsaWduJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbFJlZjogRWxlbWVudFJlZixcbiAgICBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgIHN0eWxlQnVpbGRlcjogRmxleEFsaWduU3R5bGVCdWlsZGVyLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlclxuICApIHtcbiAgICBzdXBlcihlbFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZVV0aWxzLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gZmxleEFsaWduQ2FjaGU7XG59XG5cbmNvbnN0IGZsZXhBbGlnbkNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGbGV4QWxpZ25EaXJlY3RpdmUgZXh0ZW5kcyBGbGV4QWxpZ25EaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19