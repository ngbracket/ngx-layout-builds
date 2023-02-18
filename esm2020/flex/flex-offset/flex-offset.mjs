import { Directive, Inject, Injectable, } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, ɵmultiply as multiply, } from '@ngbrackets/ngx-layout/core';
import { isFlowHorizontal } from '@ngbrackets/ngx-layout/_private-utils';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@ngbrackets/ngx-layout/core";
export class FlexOffsetStyleBuilder extends StyleBuilder {
    constructor(_config) {
        super();
        this._config = _config;
    }
    buildStyles(offset, parent) {
        offset || (offset = '0');
        offset = multiply(offset, this._config.multiplier);
        const isPercent = String(offset).indexOf('%') > -1;
        const isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(+offset)) {
            offset = `${offset}%`;
        }
        const horizontalLayoutKey = parent.isRtl ? 'margin-right' : 'margin-left';
        const styles = isFlowHorizontal(parent.layout)
            ? { [horizontalLayoutKey]: offset }
            : { 'margin-top': offset };
        return styles;
    }
}
FlexOffsetStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOffsetStyleBuilder, deps: [{ token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
FlexOffsetStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOffsetStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOffsetStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }]; } });
const inputs = [
    'fxFlexOffset',
    'fxFlexOffset.xs',
    'fxFlexOffset.sm',
    'fxFlexOffset.md',
    'fxFlexOffset.lg',
    'fxFlexOffset.xl',
    'fxFlexOffset.lt-sm',
    'fxFlexOffset.lt-md',
    'fxFlexOffset.lt-lg',
    'fxFlexOffset.lt-xl',
    'fxFlexOffset.gt-xs',
    'fxFlexOffset.gt-sm',
    'fxFlexOffset.gt-md',
    'fxFlexOffset.gt-lg',
];
const selector = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;
/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export class FlexOffsetDirective extends BaseDirective2 {
    constructor(elRef, directionality, styleBuilder, marshal, styler) {
        super(elRef, styleBuilder, styler, marshal);
        this.directionality = directionality;
        this.DIRECTIVE_KEY = 'flex-offset';
        this.init([this.directionality.change]);
        // Parent DOM `layout-gap` with affect the nested child with `flex-offset`
        if (this.parentElement) {
            this.marshal
                .trackValue(this.parentElement, 'layout-gap')
                .pipe(takeUntil(this.destroySubject))
                .subscribe(this.triggerUpdate.bind(this));
        }
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Using the current fxFlexOffset value, update the inline CSS
     * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
     *       otherwise `margin-top` is used for the offset.
     */
    updateWithValue(value = '') {
        // The flex-direction of this element's flex container. Defaults to 'row'.
        const layout = this.getFlexFlowDirection(this.parentElement, true);
        const isRtl = this.directionality.value === 'rtl';
        if (layout === 'row' && isRtl) {
            this.styleCache = flexOffsetCacheRowRtl;
        }
        else if (layout === 'row' && !isRtl) {
            this.styleCache = flexOffsetCacheRowLtr;
        }
        else if (layout === 'column' && isRtl) {
            this.styleCache = flexOffsetCacheColumnRtl;
        }
        else if (layout === 'column' && !isRtl) {
            this.styleCache = flexOffsetCacheColumnLtr;
        }
        this.addStyles(value + '', { layout, isRtl });
    }
}
FlexOffsetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOffsetDirective, deps: [{ token: i0.ElementRef }, { token: i1.Directionality }, { token: FlexOffsetStyleBuilder }, { token: i2.MediaMarshaller }, { token: i2.StyleUtils }], target: i0.ɵɵFactoryTarget.Directive });
FlexOffsetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: FlexOffsetDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: FlexOffsetDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality }, { type: FlexOffsetStyleBuilder }, { type: i2.MediaMarshaller }, { type: i2.StyleUtils }]; } });
export class DefaultFlexOffsetDirective extends FlexOffsetDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultFlexOffsetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultFlexOffsetDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultFlexOffsetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultFlexOffsetDirective, selector: "\n  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],\n  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],\n  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],\n  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]\n", inputs: { fxFlexOffset: "fxFlexOffset", "fxFlexOffset.xs": "fxFlexOffset.xs", "fxFlexOffset.sm": "fxFlexOffset.sm", "fxFlexOffset.md": "fxFlexOffset.md", "fxFlexOffset.lg": "fxFlexOffset.lg", "fxFlexOffset.xl": "fxFlexOffset.xl", "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md": "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md": "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultFlexOffsetDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const flexOffsetCacheRowRtl = new Map();
const flexOffsetCacheColumnRtl = new Map();
const flexOffsetCacheRowLtr = new Map();
const flexOffsetCacheColumnLtr = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1vZmZzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2ZsZXgvZmxleC1vZmZzZXQvZmxleC1vZmZzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEVBRWQsYUFBYSxFQUViLFlBQVksRUFHWixTQUFTLElBQUksUUFBUSxHQUN0QixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUN0RCxZQUEyQyxPQUE0QjtRQUNyRSxLQUFLLEVBQUUsQ0FBQztRQURpQyxZQUFPLEdBQVAsT0FBTyxDQUFxQjtJQUV2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQWMsRUFBRSxNQUF3QjtRQUNsRCxNQUFNLEtBQU4sTUFBTSxHQUFLLEdBQUcsRUFBQztRQUNmLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMx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QztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dIQTVDVSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixTQUFTOztBQWlEVixNQUFNLE9BQU8sMEJBQTJCLFNBQVEsbUJBQW1CO0lBRG5FOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzt1SEFGWSwwQkFBMEI7MkdBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7QUFLL0IsTUFBTSxxQkFBcUIsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN0RSxNQUFNLHdCQUF3QixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pFLE1BQU0scUJBQXFCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEUsTUFBTSx3QkFBd0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgT25DaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBMYXlvdXRDb25maWdPcHRpb25zLFxuICBMQVlPVVRfQ09ORklHLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxuICDJtW11bHRpcGx5IGFzIG11bHRpcGx5LFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuaW1wb3J0IHsgaXNGbG93SG9yaXpvbnRhbCB9IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvX3ByaXZhdGUtdXRpbHMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsZXhPZmZzZXRQYXJlbnQge1xuICBsYXlvdXQ6IHN0cmluZztcbiAgaXNSdGw6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRmxleE9mZnNldFN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTEFZT1VUX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGJ1aWxkU3R5bGVzKG9mZnNldDogc3RyaW5nLCBwYXJlbnQ6IEZsZXhPZmZzZXRQYXJlbnQpIHtcbiAgICBvZmZzZXQgfHw9ICcwJztcbiAgICBvZmZzZXQgPSBtdWx0aXBseShvZmZzZXQsIHRoaXMuX2NvbmZpZy5tdWx0aXBsaWVyKTtcbiAgICBjb25zdCBpc1BlcmNlbnQgPSBTdHJpbmcob2Zmc2V0KS5pbmRleE9mKCclJykgPiAtMTtcbiAgICBjb25zdCBpc1B4ID0gU3RyaW5nKG9mZnNldCkuaW5kZXhPZigncHgnKSA+IC0xO1xuICAgIGlmICghaXNQeCAmJiAhaXNQZXJjZW50ICYmICFpc05hTigrb2Zmc2V0KSkge1xuICAgICAgb2Zmc2V0ID0gYCR7b2Zmc2V0fSVgO1xuICAgIH1cbiAgICBjb25zdCBob3Jpem9udGFsTGF5b3V0S2V5ID0gcGFyZW50LmlzUnRsID8gJ21hcmdpbi1yaWdodCcgOiAnbWFyZ2luLWxlZnQnO1xuICAgIGNvbnN0IHN0eWxlczogU3R5bGVEZWZpbml0aW9uID0gaXNGbG93SG9yaXpvbnRhbChwYXJlbnQubGF5b3V0KVxuICAgICAgPyB7IFtob3Jpem9udGFsTGF5b3V0S2V5XTogb2Zmc2V0IH1cbiAgICAgIDogeyAnbWFyZ2luLXRvcCc6IG9mZnNldCB9O1xuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxufVxuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdmeEZsZXhPZmZzZXQnLFxuICAnZnhGbGV4T2Zmc2V0LnhzJyxcbiAgJ2Z4RmxleE9mZnNldC5zbScsXG4gICdmeEZsZXhPZmZzZXQubWQnLFxuICAnZnhGbGV4T2Zmc2V0LmxnJyxcbiAgJ2Z4RmxleE9mZnNldC54bCcsXG4gICdmeEZsZXhPZmZzZXQubHQtc20nLFxuICAnZnhGbGV4T2Zmc2V0Lmx0LW1kJyxcbiAgJ2Z4RmxleE9mZnNldC5sdC1sZycsXG4gICdmeEZsZXhPZmZzZXQubHQteGwnLFxuICAnZnhGbGV4T2Zmc2V0Lmd0LXhzJyxcbiAgJ2Z4RmxleE9mZnNldC5ndC1zbScsXG4gICdmeEZsZXhPZmZzZXQuZ3QtbWQnLFxuICAnZnhGbGV4T2Zmc2V0Lmd0LWxnJyxcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4RmxleE9mZnNldF0sIFtmeEZsZXhPZmZzZXQueHNdLCBbZnhGbGV4T2Zmc2V0LnNtXSwgW2Z4RmxleE9mZnNldC5tZF0sXG4gIFtmeEZsZXhPZmZzZXQubGddLCBbZnhGbGV4T2Zmc2V0LnhsXSwgW2Z4RmxleE9mZnNldC5sdC1zbV0sIFtmeEZsZXhPZmZzZXQubHQtbWRdLFxuICBbZnhGbGV4T2Zmc2V0Lmx0LWxnXSwgW2Z4RmxleE9mZnNldC5sdC14bF0sIFtmeEZsZXhPZmZzZXQuZ3QteHNdLCBbZnhGbGV4T2Zmc2V0Lmd0LXNtXSxcbiAgW2Z4RmxleE9mZnNldC5ndC1tZF0sIFtmeEZsZXhPZmZzZXQuZ3QtbGddXG5gO1xuXG4vKipcbiAqICdmbGV4LW9mZnNldCcgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgJ21hcmdpbi1sZWZ0JyBvZiB0aGUgZWxlbWVudCBpbiBhIGxheW91dCBjb250YWluZXJcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgRmxleE9mZnNldERpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZmxleC1vZmZzZXQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgc3R5bGVCdWlsZGVyOiBGbGV4T2Zmc2V0U3R5bGVCdWlsZGVyLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcixcbiAgICBzdHlsZXI6IFN0eWxlVXRpbHNcbiAgKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoW3RoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlXSk7XG4gICAgLy8gUGFyZW50IERPTSBgbGF5b3V0LWdhcGAgd2l0aCBhZmZlY3QgdGhlIG5lc3RlZCBjaGlsZCB3aXRoIGBmbGV4LW9mZnNldGBcbiAgICBpZiAodGhpcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICB0aGlzLm1hcnNoYWxcbiAgICAgICAgLnRyYWNrVmFsdWUodGhpcy5wYXJlbnRFbGVtZW50LCAnbGF5b3V0LWdhcCcpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3lTdWJqZWN0KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLnRyaWdnZXJVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBVc2luZyB0aGUgY3VycmVudCBmeEZsZXhPZmZzZXQgdmFsdWUsIHVwZGF0ZSB0aGUgaW5saW5lIENTU1xuICAgKiBOT1RFOiB0aGlzIHdpbGwgYXNzaWduIGBtYXJnaW4tbGVmdGAgaWYgdGhlIHBhcmVudCBmbGV4LWRpcmVjdGlvbiA9PSAncm93JyxcbiAgICogICAgICAgb3RoZXJ3aXNlIGBtYXJnaW4tdG9wYCBpcyB1c2VkIGZvciB0aGUgb2Zmc2V0LlxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gJycpOiB2b2lkIHtcbiAgICAvLyBUaGUgZmxleC1kaXJlY3Rpb24gb2YgdGhpcyBlbGVtZW50J3MgZmxleCBjb250YWluZXIuIERlZmF1bHRzIHRvICdyb3cnLlxuICAgIGNvbnN0IGxheW91dCA9IHRoaXMuZ2V0RmxleEZsb3dEaXJlY3Rpb24odGhpcy5wYXJlbnRFbGVtZW50ISwgdHJ1ZSk7XG4gICAgY29uc3QgaXNSdGwgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlID09PSAncnRsJztcbiAgICBpZiAobGF5b3V0ID09PSAncm93JyAmJiBpc1J0bCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleE9mZnNldENhY2hlUm93UnRsO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAncm93JyAmJiAhaXNSdGwpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGZsZXhPZmZzZXRDYWNoZVJvd0x0cjtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2NvbHVtbicgJiYgaXNSdGwpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGZsZXhPZmZzZXRDYWNoZUNvbHVtblJ0bDtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2NvbHVtbicgJiYgIWlzUnRsKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4T2Zmc2V0Q2FjaGVDb2x1bW5MdHI7XG4gICAgfVxuICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlICsgJycsIHsgbGF5b3V0LCBpc1J0bCB9KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGbGV4T2Zmc2V0RGlyZWN0aXZlIGV4dGVuZHMgRmxleE9mZnNldERpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmNvbnN0IGZsZXhPZmZzZXRDYWNoZVJvd1J0bDogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZUNvbHVtblJ0bDogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZVJvd0x0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZUNvbHVtbkx0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbiJdfQ==