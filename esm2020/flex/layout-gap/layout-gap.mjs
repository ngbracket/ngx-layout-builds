import { Directive, Inject, Injectable, } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, ɵmultiply as multiply, } from '@ngbrackets/ngx-layout/core';
import { LAYOUT_VALUES } from '@ngbrackets/ngx-layout/_private-utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ngbrackets/ngx-layout/core";
import * as i2 from "@angular/cdk/bidi";
const CLEAR_MARGIN_CSS = {
    'margin-left': null,
    'margin-right': null,
    'margin-top': null,
    'margin-bottom': null,
};
export class LayoutGapStyleBuilder extends StyleBuilder {
    constructor(_styler, _config) {
        super();
        this._styler = _styler;
        this._config = _config;
    }
    buildStyles(gapValue, parent) {
        if (gapValue.endsWith(GRID_SPECIFIER)) {
            gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
            gapValue = multiply(gapValue, this._config.multiplier);
            // Add the margin to the host element
            return buildGridMargin(gapValue, parent.directionality);
        }
        else {
            return {};
        }
    }
    sideEffect(gapValue, _styles, parent) {
        const items = parent.items;
        if (gapValue.endsWith(GRID_SPECIFIER)) {
            gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
            gapValue = multiply(gapValue, this._config.multiplier);
            // For each `element` children, set the padding
            const paddingStyles = buildGridPadding(gapValue, parent.directionality);
            this._styler.applyStyleToElements(paddingStyles, parent.items);
        }
        else {
            gapValue = multiply(gapValue, this._config.multiplier);
            gapValue = this.addFallbackUnit(gapValue);
            const lastItem = items.pop();
            // For each `element` children EXCEPT the last,
            // set the margin right/bottom styles...
            const gapCss = buildGapCSS(gapValue, parent);
            this._styler.applyStyleToElements(gapCss, items);
            // Clear all gaps for all visible elements
            this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
        }
    }
    addFallbackUnit(value) {
        return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
    }
}
LayoutGapStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutGapStyleBuilder, deps: [{ token: i1.StyleUtils }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
LayoutGapStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutGapStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutGapStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StyleUtils }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }]; } });
const inputs = [
    'fxLayoutGap',
    'fxLayoutGap.xs',
    'fxLayoutGap.sm',
    'fxLayoutGap.md',
    'fxLayoutGap.lg',
    'fxLayoutGap.xl',
    'fxLayoutGap.lt-sm',
    'fxLayoutGap.lt-md',
    'fxLayoutGap.lt-lg',
    'fxLayoutGap.lt-xl',
    'fxLayoutGap.gt-xs',
    'fxLayoutGap.gt-sm',
    'fxLayoutGap.gt-md',
    'fxLayoutGap.gt-lg',
];
const selector = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;
/**
 * 'layout-padding' styling directive
 *  Defines padding of child elements in a layout container
 */
export class LayoutGapDirective extends BaseDirective2 {
    constructor(elRef, zone, directionality, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.zone = zone;
        this.directionality = directionality;
        this.styleUtils = styleUtils;
        this.layout = 'row'; // default flex-direction
        this.DIRECTIVE_KEY = 'layout-gap';
        this.observerSubject = new Subject();
        const extraTriggers = [
            this.directionality.change,
            this.observerSubject.asObservable(),
        ];
        this.init(extraTriggers);
        this.marshal
            .trackValue(this.nativeElement, 'layout')
            .pipe(takeUntil(this.destroySubject))
            .subscribe(this.onLayoutChange.bind(this));
    }
    /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
    get childrenNodes() {
        const obj = this.nativeElement.children;
        const buffer = [];
        // iterate backwards ensuring that length is an UInt32
        for (let i = obj.length; i--;) {
            buffer[i] = obj[i];
        }
        return buffer;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    ngAfterContentInit() {
        this.buildChildObservable();
        this.triggerUpdate();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Cache the parent container 'flex-direction' and update the 'margin' styles
     */
    onLayoutChange(matcher) {
        const layout = matcher.value;
        // Make sure to filter out 'wrap' option
        const direction = layout.split(' ');
        this.layout = direction[0];
        if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
            this.layout = 'row';
        }
        this.triggerUpdate();
    }
    /**
     *
     */
    updateWithValue(value) {
        // Gather all non-hidden Element nodes
        const items = this.childrenNodes
            .filter((el) => el.nodeType === 1 && this.willDisplay(el))
            .sort((a, b) => {
            const orderA = +this.styler.lookupStyle(a, 'order');
            const orderB = +this.styler.lookupStyle(b, 'order');
            if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
                return 0;
            }
            else {
                return orderA > orderB ? 1 : -1;
            }
        });
        if (items.length > 0) {
            const directionality = this.directionality.value;
            const layout = this.layout;
            if (layout === 'row' && directionality === 'rtl') {
                this.styleCache = layoutGapCacheRowRtl;
            }
            else if (layout === 'row' && directionality !== 'rtl') {
                this.styleCache = layoutGapCacheRowLtr;
            }
            else if (layout === 'column' && directionality === 'rtl') {
                this.styleCache = layoutGapCacheColumnRtl;
            }
            else if (layout === 'column' && directionality !== 'rtl') {
                this.styleCache = layoutGapCacheColumnLtr;
            }
            this.addStyles(value, { directionality, items, layout });
        }
    }
    /** We need to override clearStyles because in most cases mru isn't populated */
    clearStyles() {
        const gridMode = Object.keys(this.mru).length > 0;
        const childrenStyle = gridMode
            ? 'padding'
            : getMarginType(this.directionality.value, this.layout);
        // If there are styles on the parent remove them
        if (gridMode) {
            super.clearStyles();
        }
        // Then remove the children styles too
        this.styleUtils.applyStyleToElements({ [childrenStyle]: '' }, this.childrenNodes);
    }
    /** Determine if an element will show or hide based on current activation */
    willDisplay(source) {
        const value = this.marshal.getValue(source, 'show-hide');
        return (value === true ||
            (value === undefined &&
                this.styleUtils.lookupStyle(source, 'display') !== 'none'));
    }
    buildChildObservable() {
        this.zone.runOutsideAngular(() => {
            if (typeof MutationObserver !== 'undefined') {
                this.observer = new MutationObserver((mutations) => {
                    const validatedChanges = (it) => {
                        return ((it.addedNodes && it.addedNodes.length > 0) ||
                            (it.removedNodes && it.removedNodes.length > 0));
                    };
                    // update gap styles only for child 'added' or 'removed' events
                    if (mutations.some(validatedChanges)) {
                        this.observerSubject.next();
                    }
                });
                this.observer.observe(this.nativeElement, { childList: true });
            }
        });
    }
}
LayoutGapDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutGapDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.Directionality }, { token: i1.StyleUtils }, { token: LayoutGapStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
LayoutGapDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: LayoutGapDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: LayoutGapDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.Directionality }, { type: i1.StyleUtils }, { type: LayoutGapStyleBuilder }, { type: i1.MediaMarshaller }]; } });
export class DefaultLayoutGapDirective extends LayoutGapDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultLayoutGapDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultLayoutGapDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultLayoutGapDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: DefaultLayoutGapDirective, selector: "\n  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],\n  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],\n  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],\n  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]\n", inputs: { fxLayoutGap: "fxLayoutGap", "fxLayoutGap.xs": "fxLayoutGap.xs", "fxLayoutGap.sm": "fxLayoutGap.sm", "fxLayoutGap.md": "fxLayoutGap.md", "fxLayoutGap.lg": "fxLayoutGap.lg", "fxLayoutGap.xl": "fxLayoutGap.xl", "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md": "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md": "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: DefaultLayoutGapDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const layoutGapCacheRowRtl = new Map();
const layoutGapCacheColumnRtl = new Map();
const layoutGapCacheRowLtr = new Map();
const layoutGapCacheColumnLtr = new Map();
const GRID_SPECIFIER = ' grid';
function buildGridPadding(value, directionality) {
    const [between, below] = value.split(' ');
    const bottom = below ?? between;
    let paddingRight = '0px', paddingBottom = bottom, paddingLeft = '0px';
    if (directionality === 'rtl') {
        paddingLeft = between;
    }
    else {
        paddingRight = between;
    }
    return { padding: `0px ${paddingRight} ${paddingBottom} ${paddingLeft}` };
}
function buildGridMargin(value, directionality) {
    const [between, below] = value.split(' ');
    const bottom = below ?? between;
    const minus = (str) => `-${str}`;
    let marginRight = '0px', marginBottom = minus(bottom), marginLeft = '0px';
    if (directionality === 'rtl') {
        marginLeft = minus(between);
    }
    else {
        marginRight = minus(between);
    }
    return { margin: `0px ${marginRight} ${marginBottom} ${marginLeft}` };
}
function getMarginType(directionality, layout) {
    switch (layout) {
        case 'column':
            return 'margin-bottom';
        case 'column-reverse':
            return 'margin-top';
        case 'row':
            return directionality === 'rtl' ? 'margin-left' : 'margin-right';
        case 'row-reverse':
            return directionality === 'rtl' ? 'margin-right' : 'margin-left';
        default:
            return directionality === 'rtl' ? 'margin-left' : 'margin-right';
    }
}
function buildGapCSS(gapValue, parent) {
    const key = getMarginType(parent.directionality, parent.layout);
    const margins = { ...CLEAR_MARGIN_CSS };
    margins[key] = gapValue;
    return margins;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWdhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9sYXlvdXQtZ2FwL2xheW91dC1nYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxNQUFNLEVBQ04sVUFBVSxHQUdYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEVBR2QsYUFBYSxFQUViLFlBQVksRUFHWixTQUFTLElBQUksUUFBUSxHQUN0QixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzQyxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGVBQWUsRUFBRSxJQUFJO0NBQ3RCLENBQUM7QUFHRixNQUFNLE9BQU8scUJBQXNCLFNBQVEsWUFBWTtJQUNyRCxZQUNVLE9BQW1CLEVBQ0ksT0FBNEI7UUFFM0QsS0FBSyxFQUFFLENBQUM7UUFIQSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ0ksWUFBTyxHQUFQLE9BQU8sQ0FBcUI7SUFHN0QsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUFnQixFQUFFLE1BQXVCO1FBQ25ELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQy9ELFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLElB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UUFDekIsS0FBSyxnQkFBZ0I7WUFDbkIsT0FBTyxZQUFZLENBQUM7UUFDdEIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNuRSxLQUFLLGFBQWE7WUFDaEIsT0FBTyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUNuRTtZQUNFLE9BQU8sY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7S0FDcEU7QUFDSCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ2xCLFFBQWdCLEVBQ2hCLE1BQWtEO0lBRWxELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxNQUFNLE9BQU8sR0FBcUMsRUFBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7SUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUN4QixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYXNlRGlyZWN0aXZlMixcbiAgRWxlbWVudE1hdGNoZXIsXG4gIExheW91dENvbmZpZ09wdGlvbnMsXG4gIExBWU9VVF9DT05GSUcsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU3R5bGVCdWlsZGVyLFxuICBTdHlsZURlZmluaXRpb24sXG4gIFN0eWxlVXRpbHMsXG4gIMm1bXVsdGlwbHkgYXMgbXVsdGlwbHksXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5pbXBvcnQgeyBMQVlPVVRfVkFMVUVTIH0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0R2FwUGFyZW50IHtcbiAgZGlyZWN0aW9uYWxpdHk6IHN0cmluZztcbiAgaXRlbXM6IEhUTUxFbGVtZW50W107XG4gIGxheW91dDogc3RyaW5nO1xufVxuXG5jb25zdCBDTEVBUl9NQVJHSU5fQ1NTID0ge1xuICAnbWFyZ2luLWxlZnQnOiBudWxsLFxuICAnbWFyZ2luLXJpZ2h0JzogbnVsbCxcbiAgJ21hcmdpbi10b3AnOiBudWxsLFxuICAnbWFyZ2luLWJvdHRvbSc6IG51bGwsXG59O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExheW91dEdhcFN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3N0eWxlcjogU3R5bGVVdGlscyxcbiAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogTGF5b3V0Q29uZmlnT3B0aW9uc1xuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgYnVpbGRTdHlsZXMoZ2FwVmFsdWU6IHN0cmluZywgcGFyZW50OiBMYXlvdXRHYXBQYXJlbnQpIHtcbiAgICBpZiAoZ2FwVmFsdWUuZW5kc1dpdGgoR1JJRF9TUEVDSUZJRVIpKSB7XG4gICAgICBnYXBWYWx1ZSA9IGdhcFZhbHVlLnNsaWNlKDAsIGdhcFZhbHVlLmluZGV4T2YoR1JJRF9TUEVDSUZJRVIpKTtcbiAgICAgIGdhcFZhbHVlID0gbXVsdGlwbHkoZ2FwVmFsdWUsIHRoaXMuX2NvbmZpZy5tdWx0aXBsaWVyKTtcblxuICAgICAgLy8gQWRkIHRoZSBtYXJnaW4gdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgICAgcmV0dXJuIGJ1aWxkR3JpZE1hcmdpbihnYXBWYWx1ZSwgcGFyZW50LmRpcmVjdGlvbmFsaXR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIHNpZGVFZmZlY3QoXG4gICAgZ2FwVmFsdWU6IHN0cmluZyxcbiAgICBfc3R5bGVzOiBTdHlsZURlZmluaXRpb24sXG4gICAgcGFyZW50OiBMYXlvdXRHYXBQYXJlbnRcbiAgKSB7XG4gICAgY29uc3QgaXRlbXMgPSBwYXJlbnQuaXRlbXM7XG4gICAgaWYgKGdhcFZhbHVlLmVuZHNXaXRoKEdSSURfU1BFQ0lGSUVSKSkge1xuICAgICAgZ2FwVmFsdWUgPSBnYXBWYWx1ZS5zbGljZSgwLCBnYXBWYWx1ZS5pbmRleE9mKEdSSURfU1BFQ0lGSUVSKSk7XG4gICAgICBnYXBWYWx1ZSA9IG11bHRpcGx5KGdhcFZhbHVlLCB0aGlzLl9jb25maWcubXVsdGlwbGllcik7XG4gICAgICAvLyBGb3IgZWFjaCBgZWxlbWVudGAgY2hpbGRyZW4sIHNldCB0aGUgcGFkZGluZ1xuICAgICAgY29uc3QgcGFkZGluZ1N0eWxlcyA9IGJ1aWxkR3JpZFBhZGRpbmcoZ2FwVmFsdWUsIHBhcmVudC5kaXJlY3Rpb25hbGl0eSk7XG4gICAgICB0aGlzLl9zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudHMocGFkZGluZ1N0eWxlcywgcGFyZW50Lml0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FwVmFsdWUgPSBtdWx0aXBseShnYXBWYWx1ZSwgdGhpcy5fY29uZmlnLm11bHRpcGxpZXIpO1xuICAgICAgZ2FwVmFsdWUgPSB0aGlzLmFkZEZhbGxiYWNrVW5pdChnYXBWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IGxhc3RJdGVtID0gaXRlbXMucG9wKCkhO1xuXG4gICAgICAvLyBGb3IgZWFjaCBgZWxlbWVudGAgY2hpbGRyZW4gRVhDRVBUIHRoZSBsYXN0LFxuICAgICAgLy8gc2V0IHRoZSBtYXJnaW4gcmlnaHQvYm90dG9tIHN0eWxlcy4uLlxuICAgICAgY29uc3QgZ2FwQ3NzID0gYnVpbGRHYXBDU1MoZ2FwVmFsdWUsIHBhcmVudCk7XG4gICAgICB0aGlzLl9zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudHMoZ2FwQ3NzLCBpdGVtcyk7XG5cbiAgICAgIC8vIENsZWFyIGFsbCBnYXBzIGZvciBhbGwgdmlzaWJsZSBlbGVtZW50c1xuICAgICAgdGhpcy5fc3R5bGVyLmFwcGx5U3R5bGVUb0VsZW1lbnRzKENMRUFSX01BUkdJTl9DU1MsIFtsYXN0SXRlbV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkRmFsbGJhY2tVbml0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIWlzTmFOKCt2YWx1ZSkgPyBgJHt2YWx1ZX0ke3RoaXMuX2NvbmZpZy5kZWZhdWx0VW5pdH1gIDogdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhMYXlvdXRHYXAnLFxuICAnZnhMYXlvdXRHYXAueHMnLFxuICAnZnhMYXlvdXRHYXAuc20nLFxuICAnZnhMYXlvdXRHYXAubWQnLFxuICAnZnhMYXlvdXRHYXAubGcnLFxuICAnZnhMYXlvdXRHYXAueGwnLFxuICAnZnhMYXlvdXRHYXAubHQtc20nLFxuICAnZnhMYXlvdXRHYXAubHQtbWQnLFxuICAnZnhMYXlvdXRHYXAubHQtbGcnLFxuICAnZnhMYXlvdXRHYXAubHQteGwnLFxuICAnZnhMYXlvdXRHYXAuZ3QteHMnLFxuICAnZnhMYXlvdXRHYXAuZ3Qtc20nLFxuICAnZnhMYXlvdXRHYXAuZ3QtbWQnLFxuICAnZnhMYXlvdXRHYXAuZ3QtbGcnLFxuXTtcbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZnhMYXlvdXRHYXBdLCBbZnhMYXlvdXRHYXAueHNdLCBbZnhMYXlvdXRHYXAuc21dLCBbZnhMYXlvdXRHYXAubWRdLFxuICBbZnhMYXlvdXRHYXAubGddLCBbZnhMYXlvdXRHYXAueGxdLCBbZnhMYXlvdXRHYXAubHQtc21dLCBbZnhMYXlvdXRHYXAubHQtbWRdLFxuICBbZnhMYXlvdXRHYXAubHQtbGddLCBbZnhMYXlvdXRHYXAubHQteGxdLCBbZnhMYXlvdXRHYXAuZ3QteHNdLCBbZnhMYXlvdXRHYXAuZ3Qtc21dLFxuICBbZnhMYXlvdXRHYXAuZ3QtbWRdLCBbZnhMYXlvdXRHYXAuZ3QtbGddXG5gO1xuXG4vKipcbiAqICdsYXlvdXQtcGFkZGluZycgc3R5bGluZyBkaXJlY3RpdmVcbiAqICBEZWZpbmVzIHBhZGRpbmcgb2YgY2hpbGQgZWxlbWVudHMgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIExheW91dEdhcERpcmVjdGl2ZVxuICBleHRlbmRzIEJhc2VEaXJlY3RpdmUyXG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95XG57XG4gIHByb3RlY3RlZCBsYXlvdXQgPSAncm93JzsgLy8gZGVmYXVsdCBmbGV4LWRpcmVjdGlvblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdsYXlvdXQtZ2FwJztcbiAgcHJvdGVjdGVkIG9ic2VydmVyU3ViamVjdCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFNwZWNpYWwgYWNjZXNzb3IgdG8gcXVlcnkgZm9yIGFsbCBjaGlsZCAnZWxlbWVudCcgbm9kZXMgcmVnYXJkbGVzcyBvZiB0eXBlLCBjbGFzcywgZXRjICovXG4gIHByb3RlY3RlZCBnZXQgY2hpbGRyZW5Ob2RlcygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICBjb25zdCBvYmogPSB0aGlzLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XG4gICAgY29uc3QgYnVmZmVyOiBhbnlbXSA9IFtdO1xuXG4gICAgLy8gaXRlcmF0ZSBiYWNrd2FyZHMgZW5zdXJpbmcgdGhhdCBsZW5ndGggaXMgYW4gVUludDMyXG4gICAgZm9yIChsZXQgaSA9IG9iai5sZW5ndGg7IGktLTsgKSB7XG4gICAgICBidWZmZXJbaV0gPSBvYmpbaV07XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgcHJvdGVjdGVkIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgc3R5bGVCdWlsZGVyOiBMYXlvdXRHYXBTdHlsZUJ1aWxkZXIsXG4gICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIGNvbnN0IGV4dHJhVHJpZ2dlcnMgPSBbXG4gICAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZSxcbiAgICAgIHRoaXMub2JzZXJ2ZXJTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLFxuICAgIF07XG4gICAgdGhpcy5pbml0KGV4dHJhVHJpZ2dlcnMpO1xuICAgIHRoaXMubWFyc2hhbFxuICAgICAgLnRyYWNrVmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LCAnbGF5b3V0JylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3lTdWJqZWN0KSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5vbkxheW91dENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBMaWZlY3ljbGUgTWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5idWlsZENoaWxkT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudHJpZ2dlclVwZGF0ZSgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgcGFyZW50IGNvbnRhaW5lciAnZmxleC1kaXJlY3Rpb24nIGFuZCB1cGRhdGUgdGhlICdtYXJnaW4nIHN0eWxlc1xuICAgKi9cbiAgcHJvdGVjdGVkIG9uTGF5b3V0Q2hhbmdlKG1hdGNoZXI6IEVsZW1lbnRNYXRjaGVyKSB7XG4gICAgY29uc3QgbGF5b3V0OiBzdHJpbmcgPSBtYXRjaGVyLnZhbHVlO1xuICAgIC8vIE1ha2Ugc3VyZSB0byBmaWx0ZXIgb3V0ICd3cmFwJyBvcHRpb25cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBsYXlvdXQuc3BsaXQoJyAnKTtcbiAgICB0aGlzLmxheW91dCA9IGRpcmVjdGlvblswXTtcbiAgICBpZiAoIUxBWU9VVF9WQUxVRVMuZmluZCgoeCkgPT4geCA9PT0gdGhpcy5sYXlvdXQpKSB7XG4gICAgICB0aGlzLmxheW91dCA9ICdyb3cnO1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXJVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gR2F0aGVyIGFsbCBub24taGlkZGVuIEVsZW1lbnQgbm9kZXNcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2hpbGRyZW5Ob2Rlc1xuICAgICAgLmZpbHRlcigoZWwpID0+IGVsLm5vZGVUeXBlID09PSAxICYmIHRoaXMud2lsbERpc3BsYXkoZWwpKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3Qgb3JkZXJBID0gK3RoaXMuc3R5bGVyLmxvb2t1cFN0eWxlKGEsICdvcmRlcicpO1xuICAgICAgICBjb25zdCBvcmRlckIgPSArdGhpcy5zdHlsZXIubG9va3VwU3R5bGUoYiwgJ29yZGVyJyk7XG4gICAgICAgIGlmIChpc05hTihvcmRlckEpIHx8IGlzTmFOKG9yZGVyQikgfHwgb3JkZXJBID09PSBvcmRlckIpIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb3JkZXJBID4gb3JkZXJCID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb25hbGl0eSA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgIGlmIChsYXlvdXQgPT09ICdyb3cnICYmIGRpcmVjdGlvbmFsaXR5ID09PSAncnRsJykge1xuICAgICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBsYXlvdXRHYXBDYWNoZVJvd1J0bDtcbiAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAncm93JyAmJiBkaXJlY3Rpb25hbGl0eSAhPT0gJ3J0bCcpIHtcbiAgICAgICAgdGhpcy5zdHlsZUNhY2hlID0gbGF5b3V0R2FwQ2FjaGVSb3dMdHI7XG4gICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2NvbHVtbicgJiYgZGlyZWN0aW9uYWxpdHkgPT09ICdydGwnKSB7XG4gICAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEdhcENhY2hlQ29sdW1uUnRsO1xuICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmIGRpcmVjdGlvbmFsaXR5ICE9PSAncnRsJykge1xuICAgICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBsYXlvdXRHYXBDYWNoZUNvbHVtbkx0cjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlLCB7IGRpcmVjdGlvbmFsaXR5LCBpdGVtcywgbGF5b3V0IH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXZSBuZWVkIHRvIG92ZXJyaWRlIGNsZWFyU3R5bGVzIGJlY2F1c2UgaW4gbW9zdCBjYXNlcyBtcnUgaXNuJ3QgcG9wdWxhdGVkICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSBjbGVhclN0eWxlcygpIHtcbiAgICBjb25zdCBncmlkTW9kZSA9IE9iamVjdC5rZXlzKHRoaXMubXJ1KS5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGNoaWxkcmVuU3R5bGUgPSBncmlkTW9kZVxuICAgICAgPyAncGFkZGluZydcbiAgICAgIDogZ2V0TWFyZ2luVHlwZSh0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlLCB0aGlzLmxheW91dCk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgc3R5bGVzIG9uIHRoZSBwYXJlbnQgcmVtb3ZlIHRoZW1cbiAgICBpZiAoZ3JpZE1vZGUpIHtcbiAgICAgIHN1cGVyLmNsZWFyU3R5bGVzKCk7XG4gICAgfVxuXG4gICAgLy8gVGhlbiByZW1vdmUgdGhlIGNoaWxkcmVuIHN0eWxlcyB0b29cbiAgICB0aGlzLnN0eWxlVXRpbHMuYXBwbHlTdHlsZVRvRWxlbWVudHMoXG4gICAgICB7IFtjaGlsZHJlblN0eWxlXTogJycgfSxcbiAgICAgIHRoaXMuY2hpbGRyZW5Ob2Rlc1xuICAgICk7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgd2lsbCBzaG93IG9yIGhpZGUgYmFzZWQgb24gY3VycmVudCBhY3RpdmF0aW9uICovXG4gIHByb3RlY3RlZCB3aWxsRGlzcGxheShzb3VyY2U6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcnNoYWwuZ2V0VmFsdWUoc291cmNlLCAnc2hvdy1oaWRlJyk7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbHVlID09PSB0cnVlIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0aGlzLnN0eWxlVXRpbHMubG9va3VwU3R5bGUoc291cmNlLCAnZGlzcGxheScpICE9PSAnbm9uZScpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZENoaWxkT2JzZXJ2YWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRlZENoYW5nZXMgPSAoaXQ6IE11dGF0aW9uUmVjb3JkKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAoaXQuYWRkZWROb2RlcyAmJiBpdC5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgIChpdC5yZW1vdmVkTm9kZXMgJiYgaXQucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyB1cGRhdGUgZ2FwIHN0eWxlcyBvbmx5IGZvciBjaGlsZCAnYWRkZWQnIG9yICdyZW1vdmVkJyBldmVudHNcbiAgICAgICAgICBpZiAobXV0YXRpb25zLnNvbWUodmFsaWRhdGVkQ2hhbmdlcykpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy5uYXRpdmVFbGVtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvYnNlcnZlcj86IE11dGF0aW9uT2JzZXJ2ZXI7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdExheW91dEdhcERpcmVjdGl2ZSBleHRlbmRzIExheW91dEdhcERpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmNvbnN0IGxheW91dEdhcENhY2hlUm93UnRsOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgbGF5b3V0R2FwQ2FjaGVDb2x1bW5SdGw6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsYXlvdXRHYXBDYWNoZVJvd0x0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGxheW91dEdhcENhY2hlQ29sdW1uTHRyOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBHUklEX1NQRUNJRklFUiA9ICcgZ3JpZCc7XG5cbmZ1bmN0aW9uIGJ1aWxkR3JpZFBhZGRpbmcoXG4gIHZhbHVlOiBzdHJpbmcsXG4gIGRpcmVjdGlvbmFsaXR5OiBzdHJpbmdcbik6IFN0eWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IFtiZXR3ZWVuLCBiZWxvd10gPSB2YWx1ZS5zcGxpdCgnICcpO1xuICBjb25zdCBib3R0b20gPSBiZWxvdyA/PyBiZXR3ZWVuO1xuICBsZXQgcGFkZGluZ1JpZ2h0ID0gJzBweCcsXG4gICAgcGFkZGluZ0JvdHRvbSA9IGJvdHRvbSxcbiAgICBwYWRkaW5nTGVmdCA9ICcwcHgnO1xuXG4gIGlmIChkaXJlY3Rpb25hbGl0eSA9PT0gJ3J0bCcpIHtcbiAgICBwYWRkaW5nTGVmdCA9IGJldHdlZW47XG4gIH0gZWxzZSB7XG4gICAgcGFkZGluZ1JpZ2h0ID0gYmV0d2VlbjtcbiAgfVxuXG4gIHJldHVybiB7IHBhZGRpbmc6IGAwcHggJHtwYWRkaW5nUmlnaHR9ICR7cGFkZGluZ0JvdHRvbX0gJHtwYWRkaW5nTGVmdH1gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR3JpZE1hcmdpbihcbiAgdmFsdWU6IHN0cmluZyxcbiAgZGlyZWN0aW9uYWxpdHk6IHN0cmluZ1xuKTogU3R5bGVEZWZpbml0aW9uIHtcbiAgY29uc3QgW2JldHdlZW4sIGJlbG93XSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gIGNvbnN0IGJvdHRvbSA9IGJlbG93ID8/IGJldHdlZW47XG4gIGNvbnN0IG1pbnVzID0gKHN0cjogc3RyaW5nKSA9PiBgLSR7c3RyfWA7XG4gIGxldCBtYXJnaW5SaWdodCA9ICcwcHgnLFxuICAgIG1hcmdpbkJvdHRvbSA9IG1pbnVzKGJvdHRvbSksXG4gICAgbWFyZ2luTGVmdCA9ICcwcHgnO1xuXG4gIGlmIChkaXJlY3Rpb25hbGl0eSA9PT0gJ3J0bCcpIHtcbiAgICBtYXJnaW5MZWZ0ID0gbWludXMoYmV0d2Vlbik7XG4gIH0gZWxzZSB7XG4gICAgbWFyZ2luUmlnaHQgPSBtaW51cyhiZXR3ZWVuKTtcbiAgfVxuXG4gIHJldHVybiB7IG1hcmdpbjogYDBweCAke21hcmdpblJpZ2h0fSAke21hcmdpbkJvdHRvbX0gJHttYXJnaW5MZWZ0fWAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFyZ2luVHlwZShkaXJlY3Rpb25hbGl0eTogc3RyaW5nLCBsYXlvdXQ6IHN0cmluZykge1xuICBzd2l0Y2ggKGxheW91dCkge1xuICAgIGNhc2UgJ2NvbHVtbic6XG4gICAgICByZXR1cm4gJ21hcmdpbi1ib3R0b20nO1xuICAgIGNhc2UgJ2NvbHVtbi1yZXZlcnNlJzpcbiAgICAgIHJldHVybiAnbWFyZ2luLXRvcCc7XG4gICAgY2FzZSAncm93JzpcbiAgICAgIHJldHVybiBkaXJlY3Rpb25hbGl0eSA9PT0gJ3J0bCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCc7XG4gICAgY2FzZSAncm93LXJldmVyc2UnOlxuICAgICAgcmV0dXJuIGRpcmVjdGlvbmFsaXR5ID09PSAncnRsJyA/ICdtYXJnaW4tcmlnaHQnIDogJ21hcmdpbi1sZWZ0JztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGRpcmVjdGlvbmFsaXR5ID09PSAncnRsJyA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLXJpZ2h0JztcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEdhcENTUyhcbiAgZ2FwVmFsdWU6IHN0cmluZyxcbiAgcGFyZW50OiB7IGRpcmVjdGlvbmFsaXR5OiBzdHJpbmc7IGxheW91dDogc3RyaW5nIH1cbik6IFN0eWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IGtleSA9IGdldE1hcmdpblR5cGUocGFyZW50LmRpcmVjdGlvbmFsaXR5LCBwYXJlbnQubGF5b3V0KTtcbiAgY29uc3QgbWFyZ2luczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsIH0gPSB7IC4uLkNMRUFSX01BUkdJTl9DU1MgfTtcbiAgbWFyZ2luc1trZXldID0gZ2FwVmFsdWU7XG4gIHJldHVybiBtYXJnaW5zO1xufVxuIl19