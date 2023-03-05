import { Directive, Inject, Injectable, } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, ɵmultiply as multiply, } from '@ngbracket/ngx-layout/core';
import { isFlowHorizontal } from '@ngbracket/ngx-layout/_private-utils';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@ngbracket/ngx-layout/core";
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
FlexOffsetStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOffsetStyleBuilder, deps: [{ token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
FlexOffsetStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOffsetStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOffsetStyleBuilder, decorators: [{
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
FlexOffsetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOffsetDirective, deps: [{ token: i0.ElementRef }, { token: i1.Directionality }, { token: FlexOffsetStyleBuilder }, { token: i2.MediaMarshaller }, { token: i2.StyleUtils }], target: i0.ɵɵFactoryTarget.Directive });
FlexOffsetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: FlexOffsetDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FlexOffsetDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality }, { type: FlexOffsetStyleBuilder }, { type: i2.MediaMarshaller }, { type: i2.StyleUtils }]; } });
export class DefaultFlexOffsetDirective extends FlexOffsetDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultFlexOffsetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultFlexOffsetDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultFlexOffsetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: DefaultFlexOffsetDirective, selector: "\n  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],\n  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],\n  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],\n  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]\n", inputs: { fxFlexOffset: "fxFlexOffset", "fxFlexOffset.xs": "fxFlexOffset.xs", "fxFlexOffset.sm": "fxFlexOffset.sm", "fxFlexOffset.md": "fxFlexOffset.md", "fxFlexOffset.lg": "fxFlexOffset.lg", "fxFlexOffset.xl": "fxFlexOffset.xl", "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md": "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md": "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultFlexOffsetDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const flexOffsetCacheRowRtl = new Map();
const flexOffsetCacheColumnRtl = new Map();
const flexOffsetCacheRowLtr = new Map();
const flexOffsetCacheColumnLtr = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1vZmZzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2ZsZXgvZmxleC1vZmZzZXQvZmxleC1vZmZzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxNQUFNLEVBQ04sVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEVBRWQsYUFBYSxFQUViLFlBQVksRUFHWixTQUFTLElBQUksUUFBUSxHQUN0QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUN0RCxZQUEyQyxPQUE0QjtRQUNyRSxLQUFLLEVBQUUsQ0FBQztRQURpQyxZQUFPLEdBQVAsT0FBTyxDQUFxQjtJQUV2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQWMsRUFBRSxNQUF3QjtRQUNsRCxNQUFNLEtBQU4sTUFBTSxHQUFLLEdBQUcsRUFBQztRQUNmLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMx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QztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dIQTVDVSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixTQUFTOztBQWlEVixNQUFNLE9BQU8sMEJBQTJCLFNBQVEsbUJBQW1CO0lBRG5FOztRQUVxQixXQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3BDOzt1SEFGWSwwQkFBMEI7MkdBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7QUFLL0IsTUFBTSxxQkFBcUIsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN0RSxNQUFNLHdCQUF3QixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pFLE1BQU0scUJBQXFCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEUsTUFBTSx3QkFBd0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgT25DaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VEaXJlY3RpdmUyLFxuICBMYXlvdXRDb25maWdPcHRpb25zLFxuICBMQVlPVVRfQ09ORklHLFxuICBNZWRpYU1hcnNoYWxsZXIsXG4gIFN0eWxlQnVpbGRlcixcbiAgU3R5bGVEZWZpbml0aW9uLFxuICBTdHlsZVV0aWxzLFxuICDJtW11bHRpcGx5IGFzIG11bHRpcGx5LFxufSBmcm9tICdAbmdicmFja2V0L25neC1sYXlvdXQvY29yZSc7XG5pbXBvcnQgeyBpc0Zsb3dIb3Jpem9udGFsIH0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBGbGV4T2Zmc2V0UGFyZW50IHtcbiAgbGF5b3V0OiBzdHJpbmc7XG4gIGlzUnRsOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZsZXhPZmZzZXRTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExBWU9VVF9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogTGF5b3V0Q29uZmlnT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBidWlsZFN0eWxlcyhvZmZzZXQ6IHN0cmluZywgcGFyZW50OiBGbGV4T2Zmc2V0UGFyZW50KSB7XG4gICAgb2Zmc2V0IHx8PSAnMCc7XG4gICAgb2Zmc2V0ID0gbXVsdGlwbHkob2Zmc2V0LCB0aGlzLl9jb25maWcubXVsdGlwbGllcik7XG4gICAgY29uc3QgaXNQZXJjZW50ID0gU3RyaW5nKG9mZnNldCkuaW5kZXhPZignJScpID4gLTE7XG4gICAgY29uc3QgaXNQeCA9IFN0cmluZyhvZmZzZXQpLmluZGV4T2YoJ3B4JykgPiAtMTtcbiAgICBpZiAoIWlzUHggJiYgIWlzUGVyY2VudCAmJiAhaXNOYU4oK29mZnNldCkpIHtcbiAgICAgIG9mZnNldCA9IGAke29mZnNldH0lYDtcbiAgICB9XG4gICAgY29uc3QgaG9yaXpvbnRhbExheW91dEtleSA9IHBhcmVudC5pc1J0bCA/ICdtYXJnaW4tcmlnaHQnIDogJ21hcmdpbi1sZWZ0JztcbiAgICBjb25zdCBzdHlsZXM6IFN0eWxlRGVmaW5pdGlvbiA9IGlzRmxvd0hvcml6b250YWwocGFyZW50LmxheW91dClcbiAgICAgID8geyBbaG9yaXpvbnRhbExheW91dEtleV06IG9mZnNldCB9XG4gICAgICA6IHsgJ21hcmdpbi10b3AnOiBvZmZzZXQgfTtcblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhGbGV4T2Zmc2V0JyxcbiAgJ2Z4RmxleE9mZnNldC54cycsXG4gICdmeEZsZXhPZmZzZXQuc20nLFxuICAnZnhGbGV4T2Zmc2V0Lm1kJyxcbiAgJ2Z4RmxleE9mZnNldC5sZycsXG4gICdmeEZsZXhPZmZzZXQueGwnLFxuICAnZnhGbGV4T2Zmc2V0Lmx0LXNtJyxcbiAgJ2Z4RmxleE9mZnNldC5sdC1tZCcsXG4gICdmeEZsZXhPZmZzZXQubHQtbGcnLFxuICAnZnhGbGV4T2Zmc2V0Lmx0LXhsJyxcbiAgJ2Z4RmxleE9mZnNldC5ndC14cycsXG4gICdmeEZsZXhPZmZzZXQuZ3Qtc20nLFxuICAnZnhGbGV4T2Zmc2V0Lmd0LW1kJyxcbiAgJ2Z4RmxleE9mZnNldC5ndC1sZycsXG5dO1xuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtmeEZsZXhPZmZzZXRdLCBbZnhGbGV4T2Zmc2V0LnhzXSwgW2Z4RmxleE9mZnNldC5zbV0sIFtmeEZsZXhPZmZzZXQubWRdLFxuICBbZnhGbGV4T2Zmc2V0LmxnXSwgW2Z4RmxleE9mZnNldC54bF0sIFtmeEZsZXhPZmZzZXQubHQtc21dLCBbZnhGbGV4T2Zmc2V0Lmx0LW1kXSxcbiAgW2Z4RmxleE9mZnNldC5sdC1sZ10sIFtmeEZsZXhPZmZzZXQubHQteGxdLCBbZnhGbGV4T2Zmc2V0Lmd0LXhzXSwgW2Z4RmxleE9mZnNldC5ndC1zbV0sXG4gIFtmeEZsZXhPZmZzZXQuZ3QtbWRdLCBbZnhGbGV4T2Zmc2V0Lmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnZmxleC1vZmZzZXQnIGZsZXhib3ggc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlICdtYXJnaW4tbGVmdCcgb2YgdGhlIGVsZW1lbnQgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEZsZXhPZmZzZXREaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2ZsZXgtb2Zmc2V0JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgIHN0eWxlQnVpbGRlcjogRmxleE9mZnNldFN0eWxlQnVpbGRlcixcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzXG4gICkge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KFt0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZV0pO1xuICAgIC8vIFBhcmVudCBET00gYGxheW91dC1nYXBgIHdpdGggYWZmZWN0IHRoZSBuZXN0ZWQgY2hpbGQgd2l0aCBgZmxleC1vZmZzZXRgXG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5tYXJzaGFsXG4gICAgICAgIC50cmFja1ZhbHVlKHRoaXMucGFyZW50RWxlbWVudCwgJ2xheW91dC1nYXAnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95U3ViamVjdCkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy50cmlnZ2VyVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogVXNpbmcgdGhlIGN1cnJlbnQgZnhGbGV4T2Zmc2V0IHZhbHVlLCB1cGRhdGUgdGhlIGlubGluZSBDU1NcbiAgICogTk9URTogdGhpcyB3aWxsIGFzc2lnbiBgbWFyZ2luLWxlZnRgIGlmIHRoZSBwYXJlbnQgZmxleC1kaXJlY3Rpb24gPT0gJ3JvdycsXG4gICAqICAgICAgIG90aGVyd2lzZSBgbWFyZ2luLXRvcGAgaXMgdXNlZCBmb3IgdGhlIG9mZnNldC5cbiAgICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlciA9ICcnKTogdm9pZCB7XG4gICAgLy8gVGhlIGZsZXgtZGlyZWN0aW9uIG9mIHRoaXMgZWxlbWVudCdzIGZsZXggY29udGFpbmVyLiBEZWZhdWx0cyB0byAncm93Jy5cbiAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmdldEZsZXhGbG93RGlyZWN0aW9uKHRoaXMucGFyZW50RWxlbWVudCEsIHRydWUpO1xuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZSA9PT0gJ3J0bCc7XG4gICAgaWYgKGxheW91dCA9PT0gJ3JvdycgJiYgaXNSdGwpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGZsZXhPZmZzZXRDYWNoZVJvd1J0bDtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ3JvdycgJiYgIWlzUnRsKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4T2Zmc2V0Q2FjaGVSb3dMdHI7XG4gICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmIGlzUnRsKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4T2Zmc2V0Q2FjaGVDb2x1bW5SdGw7XG4gICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmICFpc1J0bCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleE9mZnNldENhY2hlQ29sdW1uTHRyO1xuICAgIH1cbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSArICcnLCB7IGxheW91dCwgaXNSdGwgfSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yLCBpbnB1dHMgfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmxleE9mZnNldERpcmVjdGl2ZSBleHRlbmRzIEZsZXhPZmZzZXREaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuXG5jb25zdCBmbGV4T2Zmc2V0Q2FjaGVSb3dSdGw6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBmbGV4T2Zmc2V0Q2FjaGVDb2x1bW5SdGw6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBmbGV4T2Zmc2V0Q2FjaGVSb3dMdHI6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBmbGV4T2Zmc2V0Q2FjaGVDb2x1bW5MdHI6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG4iXX0=