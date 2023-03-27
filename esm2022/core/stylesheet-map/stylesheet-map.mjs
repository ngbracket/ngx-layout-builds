/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Utility to emulate a CSS stylesheet
 *
 * This utility class stores all of the styles for a given HTML element
 * as a readonly `stylesheet` map.
 */
class StylesheetMap {
    constructor() {
        this.stylesheet = new Map();
    }
    /**
     * Add an individual style to an HTML element
     */
    addStyleToElement(element, style, value) {
        const stylesheet = this.stylesheet.get(element);
        if (stylesheet) {
            stylesheet.set(style, value);
        }
        else {
            this.stylesheet.set(element, new Map([[style, value]]));
        }
    }
    /**
     * Clear the virtual stylesheet
     */
    clearStyles() {
        this.stylesheet.clear();
    }
    /**
     * Retrieve a given style for an HTML element
     */
    getStyleForElement(el, styleName) {
        const styles = this.stylesheet.get(el);
        let value = '';
        if (styles) {
            const style = styles.get(styleName);
            if (typeof style === 'number' || typeof style === 'string') {
                value = style + '';
            }
        }
        return value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: StylesheetMap, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: StylesheetMap, providedIn: 'root' }); }
}
export { StylesheetMap };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4", ngImport: i0, type: StylesheetMap, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldC1tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvc3R5bGVzaGVldC1tYXAvc3R5bGVzaGVldC1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekM7Ozs7O0dBS0c7QUFDSCxNQUNhLGFBQWE7SUFEMUI7UUFHVyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTJDLENBQUM7S0FtQzFFO0lBakNDOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsT0FBb0IsRUFBRSxLQUFhLEVBQUUsS0FBb0I7UUFDekUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0IsQ0FBQyxFQUFlLEVBQUUsU0FBaUI7UUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDMUQsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDcEI7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztxSEFwQ1UsYUFBYTt5SEFBYixhQUFhLGNBREQsTUFBTTs7U0FDbEIsYUFBYTtrR0FBYixhQUFhO2tCQUR6QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBVdGlsaXR5IHRvIGVtdWxhdGUgYSBDU1Mgc3R5bGVzaGVldFxuICpcbiAqIFRoaXMgdXRpbGl0eSBjbGFzcyBzdG9yZXMgYWxsIG9mIHRoZSBzdHlsZXMgZm9yIGEgZ2l2ZW4gSFRNTCBlbGVtZW50XG4gKiBhcyBhIHJlYWRvbmx5IGBzdHlsZXNoZWV0YCBtYXAuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFN0eWxlc2hlZXRNYXAge1xuXG4gIHJlYWRvbmx5IHN0eWxlc2hlZXQgPSBuZXcgTWFwPEhUTUxFbGVtZW50LCBNYXA8c3RyaW5nLCBzdHJpbmd8bnVtYmVyPj4oKTtcblxuICAvKipcbiAgICogQWRkIGFuIGluZGl2aWR1YWwgc3R5bGUgdG8gYW4gSFRNTCBlbGVtZW50XG4gICAqL1xuICBhZGRTdHlsZVRvRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3R5bGU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xudW1iZXIpIHtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gdGhpcy5zdHlsZXNoZWV0LmdldChlbGVtZW50KTtcbiAgICBpZiAoc3R5bGVzaGVldCkge1xuICAgICAgc3R5bGVzaGVldC5zZXQoc3R5bGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHlsZXNoZWV0LnNldChlbGVtZW50LCBuZXcgTWFwKFtbc3R5bGUsIHZhbHVlXV0pKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIHZpcnR1YWwgc3R5bGVzaGVldFxuICAgKi9cbiAgY2xlYXJTdHlsZXMoKSB7XG4gICAgdGhpcy5zdHlsZXNoZWV0LmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYSBnaXZlbiBzdHlsZSBmb3IgYW4gSFRNTCBlbGVtZW50XG4gICAqL1xuICBnZXRTdHlsZUZvckVsZW1lbnQoZWw6IEhUTUxFbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5zdHlsZXNoZWV0LmdldChlbCk7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgaWYgKHN0eWxlcykge1xuICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZXMuZ2V0KHN0eWxlTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhbHVlID0gc3R5bGUgKyAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=