/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { applyCssPrefixes } from '@ngbrackets/ngx-layout/_private-utils';
import { LAYOUT_CONFIG } from '../tokens/library-config';
import { SERVER_TOKEN } from '../tokens/server-token';
import * as i0 from "@angular/core";
import * as i1 from "../stylesheet-map/stylesheet-map";
export class StyleUtils {
    constructor(_serverStylesheet, _serverModuleLoaded, _platformId, layoutConfig) {
        this._serverStylesheet = _serverStylesheet;
        this._serverModuleLoaded = _serverModuleLoaded;
        this._platformId = _platformId;
        this.layoutConfig = layoutConfig;
    }
    /**
     * Applies styles given via string pair or object map to the directive element
     */
    applyStyleToElement(element, style, value = null) {
        let styles = {};
        if (typeof style === 'string') {
            styles[style] = value;
            style = styles;
        }
        styles = this.layoutConfig.disableVendorPrefixes
            ? style
            : applyCssPrefixes(style);
        this._applyMultiValueStyleToElement(styles, element);
    }
    /**
     * Applies styles given via string pair or object map to the directive's element
     */
    applyStyleToElements(style, elements = []) {
        const styles = this.layoutConfig.disableVendorPrefixes
            ? style
            : applyCssPrefixes(style);
        elements.forEach((el) => {
            this._applyMultiValueStyleToElement(styles, el);
        });
    }
    /**
     * Determine the DOM element's Flexbox flow (flex-direction)
     *
     * Check inline style first then check computed (stylesheet) style
     */
    getFlowDirection(target) {
        const query = 'flex-direction';
        let value = this.lookupStyle(target, query);
        const hasInlineValue = this.lookupInlineStyle(target, query) ||
            (isPlatformServer(this._platformId) && this._serverModuleLoaded)
            ? value
            : '';
        return [value || 'row', hasInlineValue];
    }
    hasWrap(target) {
        const query = 'flex-wrap';
        return this.lookupStyle(target, query) === 'wrap';
    }
    /**
     * Find the DOM element's raw attribute value (if any)
     */
    lookupAttributeValue(element, attribute) {
        return element.getAttribute(attribute) ?? '';
    }
    /**
     * Find the DOM element's inline style value (if any)
     */
    lookupInlineStyle(element, styleName) {
        return isPlatformBrowser(this._platformId)
            ? element.style.getPropertyValue(styleName)
            : getServerStyle(element, styleName);
    }
    /**
     * Determine the inline or inherited CSS style
     * NOTE: platform-server has no implementation for getComputedStyle
     */
    lookupStyle(element, styleName, inlineOnly = false) {
        let value = '';
        if (element) {
            let immediateValue = (value = this.lookupInlineStyle(element, styleName));
            if (!immediateValue) {
                if (isPlatformBrowser(this._platformId)) {
                    if (!inlineOnly) {
                        value = getComputedStyle(element).getPropertyValue(styleName);
                    }
                }
                else {
                    if (this._serverModuleLoaded) {
                        value = this._serverStylesheet.getStyleForElement(element, styleName);
                    }
                }
            }
        }
        // Note: 'inline' is the default of all elements, unless UA stylesheet overrides;
        //       in which case getComputedStyle() should determine a valid value.
        return value ? value.trim() : '';
    }
    /**
     * Applies the styles to the element. The styles object map may contain an array of values
     * Each value will be added as element style
     * Keys are sorted to add prefixed styles (like -webkit-x) first, before the standard ones
     */
    _applyMultiValueStyleToElement(styles, element) {
        Object.keys(styles)
            .sort()
            .forEach((key) => {
            const el = styles[key];
            const values = Array.isArray(el)
                ? el
                : [el];
            values.sort();
            for (let value of values) {
                value = value ? value + '' : '';
                if (isPlatformBrowser(this._platformId) ||
                    !this._serverModuleLoaded) {
                    isPlatformBrowser(this._platformId)
                        ? element.style.setProperty(key, value)
                        : setServerStyle(element, key, value);
                }
                else {
                    this._serverStylesheet.addStyleToElement(element, key, value);
                }
            }
        });
    }
}
StyleUtils.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: StyleUtils, deps: [{ token: i1.StylesheetMap }, { token: SERVER_TOKEN }, { token: PLATFORM_ID }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
StyleUtils.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: StyleUtils, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: StyleUtils, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StylesheetMap }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }]; } });
function getServerStyle(element, styleName) {
    const styleMap = readStyleAttribute(element);
    return styleMap[styleName] ?? '';
}
function setServerStyle(element, styleName, styleValue) {
    styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const styleMap = readStyleAttribute(element);
    styleMap[styleName] = styleValue ?? '';
    writeStyleAttribute(element, styleMap);
}
function writeStyleAttribute(element, styleMap) {
    let styleAttrValue = '';
    for (const key in styleMap) {
        const newValue = styleMap[key];
        if (newValue) {
            styleAttrValue += `${key}:${styleMap[key]};`;
        }
    }
    element.setAttribute('style', styleAttrValue);
}
function readStyleAttribute(element) {
    const styleMap = {};
    const styleAttribute = element.getAttribute('style');
    if (styleAttribute) {
        const styleList = styleAttribute.split(/;+/g);
        for (let i = 0; i < styleList.length; i++) {
            const style = styleList[i].trim();
            if (style.length > 0) {
                const colonIndex = style.indexOf(':');
                if (colonIndex === -1) {
                    throw new Error(`Invalid CSS style: ${style}`);
                }
                const name = style.substr(0, colonIndex).trim();
                styleMap[name] = style.substr(colonIndex + 1).trim();
            }
        }
    }
    return styleMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvc3R5bGUtdXRpbHMvc3R5bGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXpFLE9BQU8sRUFBdUIsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHdEQsTUFBTSxPQUFPLFVBQVU7SUFDckIsWUFDVSxpQkFBZ0MsRUFDVixtQkFBNEIsRUFDN0IsV0FBbUIsRUFDakIsWUFBaUM7UUFIeEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFlO1FBQ1Ysd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFTO1FBQzdCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRCxDQUFDO0lBRUo7O09BRUc7SUFDSCxtQkFBbUIsQ0FDakIsT0FBb0IsRUFDcEIsS0FBK0IsRUFDL0IsUUFBZ0MsSUFBSTtRQUVwQyxJQUFJLE1BQU0sR0FBb0IsRUFBRSxDQUFDO1FBQ2pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNoQjtRQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQjtZQUM5QyxDQUFDLENBQUMsS0FB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QVMsa0JBQWtCLENBQUMsT0FBWTtJQUN0QyxNQUFNLFFBQVEsR0FBK0IsRUFBRSxDQUFDO0lBQ2hELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsSUFBSSxjQUFjLEVBQUU7UUFDbEIsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ2hEO2dCQUNELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEQ7U0FDRjtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBhcHBseUNzc1ByZWZpeGVzIH0gZnJvbSAnQG5nYnJhY2tldHMvbmd4LWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBTdHlsZXNoZWV0TWFwIH0gZnJvbSAnLi4vc3R5bGVzaGVldC1tYXAvc3R5bGVzaGVldC1tYXAnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnT3B0aW9ucywgTEFZT1VUX0NPTkZJRyB9IGZyb20gJy4uL3Rva2Vucy9saWJyYXJ5LWNvbmZpZyc7XG5pbXBvcnQgeyBTRVJWRVJfVE9LRU4gfSBmcm9tICcuLi90b2tlbnMvc2VydmVyLXRva2VuJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTdHlsZVV0aWxzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmVyU3R5bGVzaGVldDogU3R5bGVzaGVldE1hcCxcbiAgICBASW5qZWN0KFNFUlZFUl9UT0tFTikgcHJpdmF0ZSBfc2VydmVyTW9kdWxlTG9hZGVkOiBib29sZWFuLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByaXZhdGUgbGF5b3V0Q29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zXG4gICkge31cblxuICAvKipcbiAgICogQXBwbGllcyBzdHlsZXMgZ2l2ZW4gdmlhIHN0cmluZyBwYWlyIG9yIG9iamVjdCBtYXAgdG8gdGhlIGRpcmVjdGl2ZSBlbGVtZW50XG4gICAqL1xuICBhcHBseVN0eWxlVG9FbGVtZW50KFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHN0eWxlOiBTdHlsZURlZmluaXRpb24gfCBzdHJpbmcsXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsXG4gICkge1xuICAgIGxldCBzdHlsZXM6IFN0eWxlRGVmaW5pdGlvbiA9IHt9O1xuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzdHlsZXNbc3R5bGVdID0gdmFsdWU7XG4gICAgICBzdHlsZSA9IHN0eWxlcztcbiAgICB9XG4gICAgc3R5bGVzID0gdGhpcy5sYXlvdXRDb25maWcuZGlzYWJsZVZlbmRvclByZWZpeGVzXG4gICAgICA/IHN0eWxlXG4gICAgICA6IGFwcGx5Q3NzUHJlZml4ZXMoc3R5bGUpO1xuICAgIHRoaXMuX2FwcGx5TXVsdGlWYWx1ZVN0eWxlVG9FbGVtZW50KHN0eWxlcywgZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBzdHlsZXMgZ2l2ZW4gdmlhIHN0cmluZyBwYWlyIG9yIG9iamVjdCBtYXAgdG8gdGhlIGRpcmVjdGl2ZSdzIGVsZW1lbnRcbiAgICovXG4gIGFwcGx5U3R5bGVUb0VsZW1lbnRzKHN0eWxlOiBTdHlsZURlZmluaXRpb24sIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW10pIHtcbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmxheW91dENvbmZpZy5kaXNhYmxlVmVuZG9yUHJlZml4ZXNcbiAgICAgID8gc3R5bGVcbiAgICAgIDogYXBwbHlDc3NQcmVmaXhlcyhzdHlsZSk7XG4gICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIHRoaXMuX2FwcGx5TXVsdGlWYWx1ZVN0eWxlVG9FbGVtZW50KHN0eWxlcywgZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgRE9NIGVsZW1lbnQncyBGbGV4Ym94IGZsb3cgKGZsZXgtZGlyZWN0aW9uKVxuICAgKlxuICAgKiBDaGVjayBpbmxpbmUgc3R5bGUgZmlyc3QgdGhlbiBjaGVjayBjb21wdXRlZCAoc3R5bGVzaGVldCkgc3R5bGVcbiAgICovXG4gIGdldEZsb3dEaXJlY3Rpb24odGFyZ2V0OiBIVE1MRWxlbWVudCk6IFtzdHJpbmcsIHN0cmluZ10ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gJ2ZsZXgtZGlyZWN0aW9uJztcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmxvb2t1cFN0eWxlKHRhcmdldCwgcXVlcnkpO1xuICAgIGNvbnN0IGhhc0lubGluZVZhbHVlID1cbiAgICAgIHRoaXMubG9va3VwSW5saW5lU3R5bGUodGFyZ2V0LCBxdWVyeSkgfHxcbiAgICAgIChpc1BsYXRmb3JtU2VydmVyKHRoaXMuX3BsYXRmb3JtSWQpICYmIHRoaXMuX3NlcnZlck1vZHVsZUxvYWRlZClcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6ICcnO1xuXG4gICAgcmV0dXJuIFt2YWx1ZSB8fCAncm93JywgaGFzSW5saW5lVmFsdWVdO1xuICB9XG5cbiAgaGFzV3JhcCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcXVlcnkgPSAnZmxleC13cmFwJztcbiAgICByZXR1cm4gdGhpcy5sb29rdXBTdHlsZSh0YXJnZXQsIHF1ZXJ5KSA9PT0gJ3dyYXAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIERPTSBlbGVtZW50J3MgcmF3IGF0dHJpYnV0ZSB2YWx1ZSAoaWYgYW55KVxuICAgKi9cbiAgbG9va3VwQXR0cmlidXRlVmFsdWUoZWxlbWVudDogSFRNTEVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSA/PyAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBET00gZWxlbWVudCdzIGlubGluZSBzdHlsZSB2YWx1ZSAoaWYgYW55KVxuICAgKi9cbiAgbG9va3VwSW5saW5lU3R5bGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZClcbiAgICAgID8gZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlTmFtZSlcbiAgICAgIDogZ2V0U2VydmVyU3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGlubGluZSBvciBpbmhlcml0ZWQgQ1NTIHN0eWxlXG4gICAqIE5PVEU6IHBsYXRmb3JtLXNlcnZlciBoYXMgbm8gaW1wbGVtZW50YXRpb24gZm9yIGdldENvbXB1dGVkU3R5bGVcbiAgICovXG4gIGxvb2t1cFN0eWxlKFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgIGlubGluZU9ubHkgPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBsZXQgaW1tZWRpYXRlVmFsdWUgPSAodmFsdWUgPSB0aGlzLmxvb2t1cElubGluZVN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZSkpO1xuICAgICAgaWYgKCFpbW1lZGlhdGVWYWx1ZSkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICBpZiAoIWlubGluZU9ubHkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9zZXJ2ZXJNb2R1bGVMb2FkZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fc2VydmVyU3R5bGVzaGVldC5nZXRTdHlsZUZvckVsZW1lbnQoXG4gICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgIHN0eWxlTmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RlOiAnaW5saW5lJyBpcyB0aGUgZGVmYXVsdCBvZiBhbGwgZWxlbWVudHMsIHVubGVzcyBVQSBzdHlsZXNoZWV0IG92ZXJyaWRlcztcbiAgICAvLyAgICAgICBpbiB3aGljaCBjYXNlIGdldENvbXB1dGVkU3R5bGUoKSBzaG91bGQgZGV0ZXJtaW5lIGEgdmFsaWQgdmFsdWUuXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUudHJpbSgpIDogJyc7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgc3R5bGVzIHRvIHRoZSBlbGVtZW50LiBUaGUgc3R5bGVzIG9iamVjdCBtYXAgbWF5IGNvbnRhaW4gYW4gYXJyYXkgb2YgdmFsdWVzXG4gICAqIEVhY2ggdmFsdWUgd2lsbCBiZSBhZGRlZCBhcyBlbGVtZW50IHN0eWxlXG4gICAqIEtleXMgYXJlIHNvcnRlZCB0byBhZGQgcHJlZml4ZWQgc3R5bGVzIChsaWtlIC13ZWJraXQteCkgZmlyc3QsIGJlZm9yZSB0aGUgc3RhbmRhcmQgb25lc1xuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlNdWx0aVZhbHVlU3R5bGVUb0VsZW1lbnQoXG4gICAgc3R5bGVzOiBTdHlsZURlZmluaXRpb24sXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IHN0eWxlc1trZXldO1xuICAgICAgICBjb25zdCB2YWx1ZXM6IChzdHJpbmcgfCBudW1iZXIgfCBudWxsKVtdID0gQXJyYXkuaXNBcnJheShlbClcbiAgICAgICAgICA/IGVsXG4gICAgICAgICAgOiBbZWxdO1xuICAgICAgICB2YWx1ZXMuc29ydCgpO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUgKyAnJyA6ICcnO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpIHx8XG4gICAgICAgICAgICAhdGhpcy5fc2VydmVyTW9kdWxlTG9hZGVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKVxuICAgICAgICAgICAgICA/IGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgOiBzZXRTZXJ2ZXJTdHlsZShlbGVtZW50LCBrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VydmVyU3R5bGVzaGVldC5hZGRTdHlsZVRvRWxlbWVudChlbGVtZW50LCBrZXksIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlcnZlclN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBzdHlsZU1hcCA9IHJlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgcmV0dXJuIHN0eWxlTWFwW3N0eWxlTmFtZV0gPz8gJyc7XG59XG5cbmZ1bmN0aW9uIHNldFNlcnZlclN0eWxlKFxuICBlbGVtZW50OiBhbnksXG4gIHN0eWxlTmFtZTogc3RyaW5nLFxuICBzdHlsZVZhbHVlPzogc3RyaW5nIHwgbnVsbFxuKSB7XG4gIHN0eWxlTmFtZSA9IHN0eWxlTmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBzdHlsZU1hcCA9IHJlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgc3R5bGVNYXBbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWUgPz8gJyc7XG4gIHdyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xufVxuXG5mdW5jdGlvbiB3cml0ZVN0eWxlQXR0cmlidXRlKFxuICBlbGVtZW50OiBhbnksXG4gIHN0eWxlTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfVxuKSB7XG4gIGxldCBzdHlsZUF0dHJWYWx1ZSA9ICcnO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZU1hcCkge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gc3R5bGVNYXBba2V5XTtcbiAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgIHN0eWxlQXR0clZhbHVlICs9IGAke2tleX06JHtzdHlsZU1hcFtrZXldfTtgO1xuICAgIH1cbiAgfVxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZUF0dHJWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gIGNvbnN0IHN0eWxlTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBjb25zdCBzdHlsZUF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICBpZiAoc3R5bGVBdHRyaWJ1dGUpIHtcbiAgICBjb25zdCBzdHlsZUxpc3QgPSBzdHlsZUF0dHJpYnV0ZS5zcGxpdCgvOysvZyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVMaXN0W2ldLnRyaW0oKTtcbiAgICAgIGlmIChzdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBzdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGlmIChjb2xvbkluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBDU1Mgc3R5bGU6ICR7c3R5bGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHN0eWxlLnN1YnN0cigwLCBjb2xvbkluZGV4KS50cmltKCk7XG4gICAgICAgIHN0eWxlTWFwW25hbWVdID0gc3R5bGUuc3Vic3RyKGNvbG9uSW5kZXggKyAxKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZU1hcDtcbn1cblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIGEgY3NzIHN0eWxlLiBFaXRoZXIgYSBwcm9wZXJ0eSBuYW1lIChlLmcuIFwiZmxleC1iYXNpc1wiKSBvciBhbiBvYmplY3RcbiAqIG1hcCBvZiBwcm9wZXJ0eSBuYW1lIGFuZCB2YWx1ZSAoZS5nLiB7ZGlzcGxheTogJ25vbmUnLCBmbGV4LW9yZGVyOiA1fSlcbiAqL1xuZXhwb3J0IHR5cGUgU3R5bGVEZWZpbml0aW9uID0geyBbcHJvcGVydHk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGwgfTtcbiJdfQ==