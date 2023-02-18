/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, } from '@angular/core';
import { Subject } from 'rxjs';
import { buildLayoutCSS } from '@ngbrackets/ngx-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "../style-builder/style-builder";
import * as i2 from "../style-utils/style-utils";
import * as i3 from "../media-marshaller/media-marshaller";
export class BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal) {
        this.elementRef = elementRef;
        this.styleBuilder = styleBuilder;
        this.styler = styler;
        this.marshal = marshal;
        this.DIRECTIVE_KEY = '';
        this.inputs = [];
        /** The most recently used styles for the builder */
        this.mru = {};
        this.destroySubject = new Subject();
        /** Cache map for style computation */
        this.styleCache = new Map();
    }
    /** Access to host element's parent DOM node */
    get parentElement() {
        return this.elementRef.nativeElement.parentElement;
    }
    /** Access to the HTMLElement for the directive */
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    /** Access to the activated value for the directive */
    get activatedValue() {
        return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY);
    }
    set activatedValue(value) {
        this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, value, this.marshal.activatedAlias);
    }
    /** For @Input changes */
    ngOnChanges(changes) {
        Object.keys(changes).forEach((key) => {
            if (this.inputs.indexOf(key) !== -1) {
                const bp = key.split('.').slice(1).join('.');
                const val = changes[key].currentValue;
                this.setValue(val, bp);
            }
        });
    }
    ngOnDestroy() {
        this.destroySubject.next();
        this.destroySubject.complete();
        this.marshal.releaseElement(this.nativeElement);
    }
    /** Register with central marshaller service */
    init(extraTriggers = []) {
        this.marshal.init(this.elementRef.nativeElement, this.DIRECTIVE_KEY, this.updateWithValue.bind(this), this.clearStyles.bind(this), extraTriggers);
    }
    /** Add styles to the element using predefined style builder */
    addStyles(input, parent) {
        const builder = this.styleBuilder;
        const useCache = builder.shouldCache;
        let genStyles = this.styleCache.get(input);
        if (!genStyles || !useCache) {
            genStyles = builder.buildStyles(input, parent);
            if (useCache) {
                this.styleCache.set(input, genStyles);
            }
        }
        this.mru = { ...genStyles };
        this.applyStyleToElement(genStyles);
        builder.sideEffect(input, genStyles, parent);
    }
    /** Remove generated styles from an element using predefined style builder */
    clearStyles() {
        Object.keys(this.mru).forEach((k) => {
            this.mru[k] = '';
        });
        this.applyStyleToElement(this.mru);
        this.mru = {};
        this.currentValue = undefined;
    }
    /** Force trigger style updates on DOM element */
    triggerUpdate() {
        this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
    }
    /**
     * Determine the DOM element's Flexbox flow (flex-direction).
     *
     * Check inline style first then check computed (stylesheet) style.
     * And optionally add the flow value to element's inline style.
     */
    getFlexFlowDirection(target, addIfMissing = false) {
        if (target) {
            const [value, hasInlineValue] = this.styler.getFlowDirection(target);
            if (!hasInlineValue && addIfMissing) {
                const style = buildLayoutCSS(value);
                const elements = [target];
                this.styler.applyStyleToElements(style, elements);
            }
            return value.trim();
        }
        return 'row';
    }
    hasWrap(target) {
        return this.styler.hasWrap(target);
    }
    /** Applies styles given via string pair or object map to the directive element */
    applyStyleToElement(style, value, element = this.nativeElement) {
        this.styler.applyStyleToElement(element, style, value);
    }
    setValue(val, bp) {
        this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, val, bp);
    }
    updateWithValue(input) {
        if (this.currentValue !== input) {
            this.addStyles(input);
            this.currentValue = input;
        }
    }
}
BaseDirective2.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: BaseDirective2, deps: [{ token: i0.ElementRef }, { token: i1.StyleBuilder }, { token: i2.StyleUtils }, { token: i3.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
BaseDirective2.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: BaseDirective2, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: BaseDirective2, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleBuilder }, { type: i2.StyleUtils }, { type: i3.MediaMarshaller }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvYmFzZS9iYXNlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxHQUtWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7OztBQU12RSxNQUFNLE9BQWdCLGNBQWM7SUFrQ2xDLFlBQ1ksVUFBc0IsRUFDdEIsWUFBMEIsRUFDMUIsTUFBa0IsRUFDbEIsT0FBd0I7UUFIeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBckMxQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLG9EQUFvRDtRQUMxQyxRQUFHLEdBQW9CLEVBQUUsQ0FBQztRQUMxQixtQkFBYyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBMEJ4RCxzQ0FBc0M7UUFDNUIsZUFBVSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBTzVELENBQUM7SUEvQkosK0NBQStDO0lBQy9DLElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQ25CLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLEtBQUssRUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUFZRCx5QkFBeUI7SUFDekIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwrQ0FBK0M7SUFDckMsSUFBSSxDQUFDLGdCQUFtQyxFQUFFO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUM3QixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzNCLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELCtEQUErRDtJQUNyRCxTQUFTLENBQUMsS0FBYSxFQUFFLE1BQWU7UUFDaEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBRXJDLElBQUksU0FBUyxHQUFnQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNCLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvQyxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdkM7U0FDRjtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDZFQUE2RTtJQUNuRSxXQUFXO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxpREFBaUQ7SUFDdkMsYUFBYTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxvQkFBb0IsQ0FDNUIsTUFBbUIsRUFDbkIsWUFBWSxHQUFHLEtBQUs7UUFFcEIsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFckUsSUFBSSxDQUFDLGNBQWMsSUFBSSxZQUFZLEVBQUU7Z0JBQ25DLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDbkQ7WUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVTLE9BQU8sQ0FBQyxNQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxrRkFBa0Y7SUFDeEUsbUJBQW1CLENBQzNCLEtBQXNCLEVBQ3RCLEtBQXVCLEVBQ3ZCLFVBQXVCLElBQUksQ0FBQyxhQUFhO1FBRXpDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRVMsUUFBUSxDQUFDLEdBQVEsRUFBRSxFQUFVO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVTLGVBQWUsQ0FBQyxLQUFhO1FBQ3JDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7OzJHQXRKbUIsY0FBYzsrRkFBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRG5DLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBidWlsZExheW91dENTUyB9IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvX3ByaXZhdGUtdXRpbHMnO1xuaW1wb3J0IHsgTWVkaWFNYXJzaGFsbGVyIH0gZnJvbSAnLi4vbWVkaWEtbWFyc2hhbGxlci9tZWRpYS1tYXJzaGFsbGVyJztcbmltcG9ydCB7IFN0eWxlQnVpbGRlciB9IGZyb20gJy4uL3N0eWxlLWJ1aWxkZXIvc3R5bGUtYnVpbGRlcic7XG5pbXBvcnQgeyBTdHlsZURlZmluaXRpb24sIFN0eWxlVXRpbHMgfSBmcm9tICcuLi9zdHlsZS11dGlscy9zdHlsZS11dGlscyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RpdmUyIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgRElSRUNUSVZFX0tFWSA9ICcnO1xuICBwcm90ZWN0ZWQgaW5wdXRzOiBzdHJpbmdbXSA9IFtdO1xuICAvKiogVGhlIG1vc3QgcmVjZW50bHkgdXNlZCBzdHlsZXMgZm9yIHRoZSBidWlsZGVyICovXG4gIHByb3RlY3RlZCBtcnU6IFN0eWxlRGVmaW5pdGlvbiA9IHt9O1xuICBwcm90ZWN0ZWQgZGVzdHJveVN1YmplY3Q6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcm90ZWN0ZWQgY3VycmVudFZhbHVlOiBhbnk7XG5cbiAgLyoqIEFjY2VzcyB0byBob3N0IGVsZW1lbnQncyBwYXJlbnQgRE9NIG5vZGUgKi9cbiAgcHJvdGVjdGVkIGdldCBwYXJlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICAvKiogQWNjZXNzIHRvIHRoZSBIVE1MRWxlbWVudCBmb3IgdGhlIGRpcmVjdGl2ZSAqL1xuICBwcm90ZWN0ZWQgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBBY2Nlc3MgdG8gdGhlIGFjdGl2YXRlZCB2YWx1ZSBmb3IgdGhlIGRpcmVjdGl2ZSAqL1xuICBnZXQgYWN0aXZhdGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tYXJzaGFsLmdldFZhbHVlKHRoaXMubmF0aXZlRWxlbWVudCwgdGhpcy5ESVJFQ1RJVkVfS0VZKTtcbiAgfVxuICBzZXQgYWN0aXZhdGVkVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubWFyc2hhbC5zZXRWYWx1ZShcbiAgICAgIHRoaXMubmF0aXZlRWxlbWVudCxcbiAgICAgIHRoaXMuRElSRUNUSVZFX0tFWSxcbiAgICAgIHZhbHVlLFxuICAgICAgdGhpcy5tYXJzaGFsLmFjdGl2YXRlZEFsaWFzXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBDYWNoZSBtYXAgZm9yIHN0eWxlIGNvbXB1dGF0aW9uICovXG4gIHByb3RlY3RlZCBzdHlsZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgc3R5bGVCdWlsZGVyOiBTdHlsZUJ1aWxkZXIsXG4gICAgcHJvdGVjdGVkIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBwcm90ZWN0ZWQgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyXG4gICkge31cblxuICAvKiogRm9yIEBJbnB1dCBjaGFuZ2VzICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICh0aGlzLmlucHV0cy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGJwID0ga2V5LnNwbGl0KCcuJykuc2xpY2UoMSkuam9pbignLicpO1xuICAgICAgICBjb25zdCB2YWwgPSBjaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbCwgYnApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95U3ViamVjdC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95U3ViamVjdC5jb21wbGV0ZSgpO1xuICAgIHRoaXMubWFyc2hhbC5yZWxlYXNlRWxlbWVudCh0aGlzLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqIFJlZ2lzdGVyIHdpdGggY2VudHJhbCBtYXJzaGFsbGVyIHNlcnZpY2UgKi9cbiAgcHJvdGVjdGVkIGluaXQoZXh0cmFUcmlnZ2VyczogT2JzZXJ2YWJsZTxhbnk+W10gPSBbXSk6IHZvaWQge1xuICAgIHRoaXMubWFyc2hhbC5pbml0KFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLkRJUkVDVElWRV9LRVksXG4gICAgICB0aGlzLnVwZGF0ZVdpdGhWYWx1ZS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy5jbGVhclN0eWxlcy5iaW5kKHRoaXMpLFxuICAgICAgZXh0cmFUcmlnZ2Vyc1xuICAgICk7XG4gIH1cblxuICAvKiogQWRkIHN0eWxlcyB0byB0aGUgZWxlbWVudCB1c2luZyBwcmVkZWZpbmVkIHN0eWxlIGJ1aWxkZXIgKi9cbiAgcHJvdGVjdGVkIGFkZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ/OiBPYmplY3QpIHtcbiAgICBjb25zdCBidWlsZGVyID0gdGhpcy5zdHlsZUJ1aWxkZXI7XG4gICAgY29uc3QgdXNlQ2FjaGUgPSBidWlsZGVyLnNob3VsZENhY2hlO1xuXG4gICAgbGV0IGdlblN0eWxlczogU3R5bGVEZWZpbml0aW9uIHwgdW5kZWZpbmVkID0gdGhpcy5zdHlsZUNhY2hlLmdldChpbnB1dCk7XG5cbiAgICBpZiAoIWdlblN0eWxlcyB8fCAhdXNlQ2FjaGUpIHtcbiAgICAgIGdlblN0eWxlcyA9IGJ1aWxkZXIuYnVpbGRTdHlsZXMoaW5wdXQsIHBhcmVudCk7XG4gICAgICBpZiAodXNlQ2FjaGUpIHtcbiAgICAgICAgdGhpcy5zdHlsZUNhY2hlLnNldChpbnB1dCwgZ2VuU3R5bGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1ydSA9IHsgLi4uZ2VuU3R5bGVzIH07XG4gICAgdGhpcy5hcHBseVN0eWxlVG9FbGVtZW50KGdlblN0eWxlcyk7XG4gICAgYnVpbGRlci5zaWRlRWZmZWN0KGlucHV0LCBnZW5TdHlsZXMsIHBhcmVudCk7XG4gIH1cblxuICAvKiogUmVtb3ZlIGdlbmVyYXRlZCBzdHlsZXMgZnJvbSBhbiBlbGVtZW50IHVzaW5nIHByZWRlZmluZWQgc3R5bGUgYnVpbGRlciAqL1xuICBwcm90ZWN0ZWQgY2xlYXJTdHlsZXMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5tcnUpLmZvckVhY2goKGspID0+IHtcbiAgICAgIHRoaXMubXJ1W2tdID0gJyc7XG4gICAgfSk7XG4gICAgdGhpcy5hcHBseVN0eWxlVG9FbGVtZW50KHRoaXMubXJ1KTtcbiAgICB0aGlzLm1ydSA9IHt9O1xuICAgIHRoaXMuY3VycmVudFZhbHVlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqIEZvcmNlIHRyaWdnZXIgc3R5bGUgdXBkYXRlcyBvbiBET00gZWxlbWVudCAqL1xuICBwcm90ZWN0ZWQgdHJpZ2dlclVwZGF0ZSgpIHtcbiAgICB0aGlzLm1hcnNoYWwudHJpZ2dlclVwZGF0ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsIHRoaXMuRElSRUNUSVZFX0tFWSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBET00gZWxlbWVudCdzIEZsZXhib3ggZmxvdyAoZmxleC1kaXJlY3Rpb24pLlxuICAgKlxuICAgKiBDaGVjayBpbmxpbmUgc3R5bGUgZmlyc3QgdGhlbiBjaGVjayBjb21wdXRlZCAoc3R5bGVzaGVldCkgc3R5bGUuXG4gICAqIEFuZCBvcHRpb25hbGx5IGFkZCB0aGUgZmxvdyB2YWx1ZSB0byBlbGVtZW50J3MgaW5saW5lIHN0eWxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEZsZXhGbG93RGlyZWN0aW9uKFxuICAgIHRhcmdldDogSFRNTEVsZW1lbnQsXG4gICAgYWRkSWZNaXNzaW5nID0gZmFsc2VcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBjb25zdCBbdmFsdWUsIGhhc0lubGluZVZhbHVlXSA9IHRoaXMuc3R5bGVyLmdldEZsb3dEaXJlY3Rpb24odGFyZ2V0KTtcblxuICAgICAgaWYgKCFoYXNJbmxpbmVWYWx1ZSAmJiBhZGRJZk1pc3NpbmcpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBidWlsZExheW91dENTUyh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF07XG4gICAgICAgIHRoaXMuc3R5bGVyLmFwcGx5U3R5bGVUb0VsZW1lbnRzKHN0eWxlLCBlbGVtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICdyb3cnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhc1dyYXAodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0eWxlci5oYXNXcmFwKHRhcmdldCk7XG4gIH1cblxuICAvKiogQXBwbGllcyBzdHlsZXMgZ2l2ZW4gdmlhIHN0cmluZyBwYWlyIG9yIG9iamVjdCBtYXAgdG8gdGhlIGRpcmVjdGl2ZSBlbGVtZW50ICovXG4gIHByb3RlY3RlZCBhcHBseVN0eWxlVG9FbGVtZW50KFxuICAgIHN0eWxlOiBTdHlsZURlZmluaXRpb24sXG4gICAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXIsXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLm5hdGl2ZUVsZW1lbnRcbiAgKSB7XG4gICAgdGhpcy5zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudChlbGVtZW50LCBzdHlsZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFZhbHVlKHZhbDogYW55LCBicDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5tYXJzaGFsLnNldFZhbHVlKHRoaXMubmF0aXZlRWxlbWVudCwgdGhpcy5ESVJFQ1RJVkVfS0VZLCB2YWwsIGJwKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVXaXRoVmFsdWUoaW5wdXQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmN1cnJlbnRWYWx1ZSAhPT0gaW5wdXQpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVzKGlucHV0KTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gaW5wdXQ7XG4gICAgfVxuICB9XG59XG4iXX0=