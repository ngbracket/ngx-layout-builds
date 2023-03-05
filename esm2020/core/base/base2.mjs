/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, } from '@angular/core';
import { Subject } from 'rxjs';
import { buildLayoutCSS } from '@ngbracket/ngx-layout/_private-utils';
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
BaseDirective2.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: BaseDirective2, deps: [{ token: i0.ElementRef }, { token: i1.StyleBuilder }, { token: i2.StyleUtils }, { token: i3.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
BaseDirective2.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: BaseDirective2, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: BaseDirective2, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.StyleBuilder }, { type: i2.StyleUtils }, { type: i3.MediaMarshaller }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvYmFzZS9iYXNlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxHQUtWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7OztBQU10RSxNQUFNLE9BQWdCLGNBQWM7SUFrQ2xDLFlBQ1ksVUFBc0IsRUFDdEIsWUFBMEIsRUFDMUIsTUFBa0IsRUFDbEIsT0FBd0I7UUFIeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBckMxQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLG9EQUFvRDtRQUMxQyxRQUFHLEdBQW9CLEVBQUUsQ0FBQztRQUMxQixtQkFBYyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBMEJ4RCxzQ0FBc0M7UUFDNUIsZUFBVSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBTzVELENBQUM7SUEvQkosK0NBQStDO0lBQy9DLElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFR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Q0FBQztJQUN6RCxDQUFDO0lBRVMsUUFBUSxDQUFDLEdBQVEsRUFBRSxFQUFVO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVTLGVBQWUsQ0FBQyxLQUFhO1FBQ3JDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7OzJHQXRKbUIsY0FBYzsrRkFBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRG5DLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBidWlsZExheW91dENTUyB9IGZyb20gJ0BuZ2JyYWNrZXQvbmd4LWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBNZWRpYU1hcnNoYWxsZXIgfSBmcm9tICcuLi9tZWRpYS1tYXJzaGFsbGVyL21lZGlhLW1hcnNoYWxsZXInO1xuaW1wb3J0IHsgU3R5bGVCdWlsZGVyIH0gZnJvbSAnLi4vc3R5bGUtYnVpbGRlci9zdHlsZS1idWlsZGVyJztcbmltcG9ydCB7IFN0eWxlRGVmaW5pdGlvbiwgU3R5bGVVdGlscyB9IGZyb20gJy4uL3N0eWxlLXV0aWxzL3N0eWxlLXV0aWxzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBESVJFQ1RJVkVfS0VZID0gJyc7XG4gIHByb3RlY3RlZCBpbnB1dHM6IHN0cmluZ1tdID0gW107XG4gIC8qKiBUaGUgbW9zdCByZWNlbnRseSB1c2VkIHN0eWxlcyBmb3IgdGhlIGJ1aWxkZXIgKi9cbiAgcHJvdGVjdGVkIG1ydTogU3R5bGVEZWZpbml0aW9uID0ge307XG4gIHByb3RlY3RlZCBkZXN0cm95U3ViamVjdDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByb3RlY3RlZCBjdXJyZW50VmFsdWU6IGFueTtcblxuICAvKiogQWNjZXNzIHRvIGhvc3QgZWxlbWVudCdzIHBhcmVudCBET00gbm9kZSAqL1xuICBwcm90ZWN0ZWQgZ2V0IHBhcmVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIC8qKiBBY2Nlc3MgdG8gdGhlIEhUTUxFbGVtZW50IGZvciB0aGUgZGlyZWN0aXZlICovXG4gIHByb3RlY3RlZCBnZXQgbmF0aXZlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqIEFjY2VzcyB0byB0aGUgYWN0aXZhdGVkIHZhbHVlIGZvciB0aGUgZGlyZWN0aXZlICovXG4gIGdldCBhY3RpdmF0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1hcnNoYWwuZ2V0VmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LCB0aGlzLkRJUkVDVElWRV9LRVkpO1xuICB9XG4gIHNldCBhY3RpdmF0ZWRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tYXJzaGFsLnNldFZhbHVlKFxuICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5ESVJFQ1RJVkVfS0VZLFxuICAgICAgdmFsdWUsXG4gICAgICB0aGlzLm1hcnNoYWwuYWN0aXZhdGVkQWxpYXNcbiAgICApO1xuICB9XG5cbiAgLyoqIENhY2hlIG1hcCBmb3Igc3R5bGUgY29tcHV0YXRpb24gKi9cbiAgcHJvdGVjdGVkIHN0eWxlQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBzdHlsZUJ1aWxkZXI6IFN0eWxlQnVpbGRlcixcbiAgICBwcm90ZWN0ZWQgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIHByb3RlY3RlZCBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXJcbiAgKSB7fVxuXG4gIC8qKiBGb3IgQElucHV0IGNoYW5nZXMgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5wdXRzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgYnAgPSBrZXkuc3BsaXQoJy4nKS5zbGljZSgxKS5qb2luKCcuJyk7XG4gICAgICAgIGNvbnN0IHZhbCA9IGNoYW5nZXNba2V5XS5jdXJyZW50VmFsdWU7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsLCBicCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3lTdWJqZWN0Lm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3lTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5tYXJzaGFsLnJlbGVhc2VFbGVtZW50KHRoaXMubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICAvKiogUmVnaXN0ZXIgd2l0aCBjZW50cmFsIG1hcnNoYWxsZXIgc2VydmljZSAqL1xuICBwcm90ZWN0ZWQgaW5pdChleHRyYVRyaWdnZXJzOiBPYnNlcnZhYmxlPGFueT5bXSA9IFtdKTogdm9pZCB7XG4gICAgdGhpcy5tYXJzaGFsLmluaXQoXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIHRoaXMuRElSRUNUSVZFX0tFWSxcbiAgICAgIHRoaXMudXBkYXRlV2l0aFZhbHVlLmJpbmQodGhpcyksXG4gICAgICB0aGlzLmNsZWFyU3R5bGVzLmJpbmQodGhpcyksXG4gICAgICBleHRyYVRyaWdnZXJzXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBBZGQgc3R5bGVzIHRvIHRoZSBlbGVtZW50IHVzaW5nIHByZWRlZmluZWQgc3R5bGUgYnVpbGRlciAqL1xuICBwcm90ZWN0ZWQgYWRkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudD86IE9iamVjdCkge1xuICAgIGNvbnN0IGJ1aWxkZXIgPSB0aGlzLnN0eWxlQnVpbGRlcjtcbiAgICBjb25zdCB1c2VDYWNoZSA9IGJ1aWxkZXIuc2hvdWxkQ2FjaGU7XG5cbiAgICBsZXQgZ2VuU3R5bGVzOiBTdHlsZURlZmluaXRpb24gfCB1bmRlZmluZWQgPSB0aGlzLnN0eWxlQ2FjaGUuZ2V0KGlucHV0KTtcblxuICAgIGlmICghZ2VuU3R5bGVzIHx8ICF1c2VDYWNoZSkge1xuICAgICAgZ2VuU3R5bGVzID0gYnVpbGRlci5idWlsZFN0eWxlcyhpbnB1dCwgcGFyZW50KTtcbiAgICAgIGlmICh1c2VDYWNoZSkge1xuICAgICAgICB0aGlzLnN0eWxlQ2FjaGUuc2V0KGlucHV0LCBnZW5TdHlsZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubXJ1ID0geyAuLi5nZW5TdHlsZXMgfTtcbiAgICB0aGlzLmFwcGx5U3R5bGVUb0VsZW1lbnQoZ2VuU3R5bGVzKTtcbiAgICBidWlsZGVyLnNpZGVFZmZlY3QoaW5wdXQsIGdlblN0eWxlcywgcGFyZW50KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmUgZ2VuZXJhdGVkIHN0eWxlcyBmcm9tIGFuIGVsZW1lbnQgdXNpbmcgcHJlZGVmaW5lZCBzdHlsZSBidWlsZGVyICovXG4gIHByb3RlY3RlZCBjbGVhclN0eWxlcygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm1ydSkuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgdGhpcy5tcnVba10gPSAnJztcbiAgICB9KTtcbiAgICB0aGlzLmFwcGx5U3R5bGVUb0VsZW1lbnQodGhpcy5tcnUpO1xuICAgIHRoaXMubXJ1ID0ge307XG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKiogRm9yY2UgdHJpZ2dlciBzdHlsZSB1cGRhdGVzIG9uIERPTSBlbGVtZW50ICovXG4gIHByb3RlY3RlZCB0cmlnZ2VyVXBkYXRlKCkge1xuICAgIHRoaXMubWFyc2hhbC50cmlnZ2VyVXBkYXRlKHRoaXMubmF0aXZlRWxlbWVudCwgdGhpcy5ESVJFQ1RJVkVfS0VZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIERPTSBlbGVtZW50J3MgRmxleGJveCBmbG93IChmbGV4LWRpcmVjdGlvbikuXG4gICAqXG4gICAqIENoZWNrIGlubGluZSBzdHlsZSBmaXJzdCB0aGVuIGNoZWNrIGNvbXB1dGVkIChzdHlsZXNoZWV0KSBzdHlsZS5cbiAgICogQW5kIG9wdGlvbmFsbHkgYWRkIHRoZSBmbG93IHZhbHVlIHRvIGVsZW1lbnQncyBpbmxpbmUgc3R5bGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RmxleEZsb3dEaXJlY3Rpb24oXG4gICAgdGFyZ2V0OiBIVE1MRWxlbWVudCxcbiAgICBhZGRJZk1pc3NpbmcgPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIGNvbnN0IFt2YWx1ZSwgaGFzSW5saW5lVmFsdWVdID0gdGhpcy5zdHlsZXIuZ2V0Rmxvd0RpcmVjdGlvbih0YXJnZXQpO1xuXG4gICAgICBpZiAoIWhhc0lubGluZVZhbHVlICYmIGFkZElmTWlzc2luZykge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGJ1aWxkTGF5b3V0Q1NTKHZhbHVlKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBbdGFyZ2V0XTtcbiAgICAgICAgdGhpcy5zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudHMoc3R5bGUsIGVsZW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJ3Jvdyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFzV3JhcCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVyLmhhc1dyYXAodGFyZ2V0KTtcbiAgfVxuXG4gIC8qKiBBcHBsaWVzIHN0eWxlcyBnaXZlbiB2aWEgc3RyaW5nIHBhaXIgb3Igb2JqZWN0IG1hcCB0byB0aGUgZGlyZWN0aXZlIGVsZW1lbnQgKi9cbiAgcHJvdGVjdGVkIGFwcGx5U3R5bGVUb0VsZW1lbnQoXG4gICAgc3R5bGU6IFN0eWxlRGVmaW5pdGlvbixcbiAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcixcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMubmF0aXZlRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnN0eWxlci5hcHBseVN0eWxlVG9FbGVtZW50KGVsZW1lbnQsIHN0eWxlLCB2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VmFsdWUodmFsOiBhbnksIGJwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm1hcnNoYWwuc2V0VmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LCB0aGlzLkRJUkVDVElWRV9LRVksIHZhbCwgYnApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVdpdGhWYWx1ZShpbnB1dDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFZhbHVlICE9PSBpbnB1dCkge1xuICAgICAgdGhpcy5hZGRTdHlsZXMoaW5wdXQpO1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSBpbnB1dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==