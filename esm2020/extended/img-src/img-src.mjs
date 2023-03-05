/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import { Directive, Inject, Injectable, Input, PLATFORM_ID, } from '@angular/core';
import { BaseDirective2, SERVER_TOKEN, StyleBuilder, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngbracket/ngx-layout/core";
export class ImgSrcStyleBuilder extends StyleBuilder {
    buildStyles(url) {
        return { content: url ? `url(${url})` : '' };
    }
}
ImgSrcStyleBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ImgSrcStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
ImgSrcStyleBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ImgSrcStyleBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ImgSrcStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class ImgSrcDirective extends BaseDirective2 {
    constructor(elementRef, styleBuilder, styler, marshal, platformId, serverModuleLoaded) {
        super(elementRef, styleBuilder, styler, marshal);
        this.platformId = platformId;
        this.serverModuleLoaded = serverModuleLoaded;
        this.DIRECTIVE_KEY = 'img-src';
        this.defaultSrc = '';
        this.styleCache = imgSrcCache;
        this.init();
        this.setValue(this.nativeElement.getAttribute('src') || '', '');
        if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
            this.nativeElement.setAttribute('src', '');
        }
    }
    set src(val) {
        this.defaultSrc = val;
        this.setValue(this.defaultSrc, '');
    }
    /**
     * Use the [responsively] activated input value to update
     * the host img src attribute or assign a default `img.src=''`
     * if the src has not been defined.
     *
     * Do nothing to standard `<img src="">` usages, only when responsive
     * keys are present do we actually call `setAttribute()`
     */
    updateWithValue(value) {
        const url = value || this.defaultSrc;
        if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
            this.addStyles(url);
        }
        else {
            this.nativeElement.setAttribute('src', url);
        }
    }
}
ImgSrcDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ImgSrcDirective, deps: [{ token: i0.ElementRef }, { token: ImgSrcStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: PLATFORM_ID }, { token: SERVER_TOKEN }], target: i0.ɵɵFactoryTarget.Directive });
ImgSrcDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: ImgSrcDirective, inputs: { src: "src" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ImgSrcDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: ImgSrcStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }]; }, propDecorators: { src: [{
                type: Input,
                args: ['src']
            }] } });
const imgSrcCache = new Map();
const inputs = [
    'src.xs',
    'src.sm',
    'src.md',
    'src.lg',
    'src.xl',
    'src.lt-sm',
    'src.lt-md',
    'src.lt-lg',
    'src.lt-xl',
    'src.gt-xs',
    'src.gt-sm',
    'src.gt-md',
    'src.gt-lg',
];
const selector = `
  img[src.xs],    img[src.sm],    img[src.md],    img[src.lg],   img[src.xl],
  img[src.lt-sm], img[src.lt-md], img[src.lt-lg], img[src.lt-xl],
  img[src.gt-xs], img[src.gt-sm], img[src.gt-md], img[src.gt-lg]
`;
/**
 * This directive provides a responsive API for the HTML <img> 'src' attribute
 * and will update the img.src property upon each responsive activation.
 *
 * e.g.
 *      <img src="defaultScene.jpg" src.xs="mobileScene.jpg"></img>
 *
 * @see https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-src/
 */
export class DefaultImgSrcDirective extends ImgSrcDirective {
    constructor() {
        super(...arguments);
        this.inputs = inputs;
    }
}
DefaultImgSrcDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultImgSrcDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
DefaultImgSrcDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.1", type: DefaultImgSrcDirective, selector: "\n  img[src.xs],    img[src.sm],    img[src.md],    img[src.lg],   img[src.xl],\n  img[src.lt-sm], img[src.lt-md], img[src.lt-lg], img[src.lt-xl],\n  img[src.gt-xs], img[src.gt-sm], img[src.gt-md], img[src.gt-lg]\n", inputs: { "src.xs": "src.xs", "src.sm": "src.sm", "src.md": "src.md", "src.lg": "src.lg", "src.xl": "src.xl", "src.lt-sm": "src.lt-sm", "src.lt-md": "src.lt-md", "src.lt-lg": "src.lt-lg", "src.lt-xl": "src.lt-xl", "src.gt-xs": "src.gt-xs", "src.gt-sm": "src.gt-sm", "src.gt-md": "src.gt-md", "src.gt-lg": "src.gt-lg" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: DefaultImgSrcDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLXNyYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZXh0ZW5kZWQvaW1nLXNyYy9pbWctc3JjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxTQUFTLEVBRVQsTUFBTSxFQUNOLFVBQVUsRUFDVixLQUFLLEVBQ0wsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxjQUFjLEVBRWQsWUFBWSxFQUNaLFlBQVksR0FHYixNQUFNLDRCQUE0QixDQUFDOzs7QUFHcEMsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFlBQVk7SUFDbEQsV0FBVyxDQUFDLEdBQVc7UUFDckIsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQy9DLENBQUM7OytHQUhVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBREwsTUFBTTsyRkFDbkIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7QUFRbEMsTUFBTSxPQUFPLGVBQWdCLFNBQVEsY0FBYztJQVVqRCxZQUNFLFVBQXNCLEVBQ3RCLFlBQWdDLEVBQ2hDLE1BQWtCLEVBQ2xCLE9BQXdCLEVBQ08sVUFBa0IsRUFDakIsa0JBQTJCO1FBRTNELEtBQUssQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUhsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUztRQWYxQyxrQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUNuQyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBeUNQLGVBQVUsR0FBRyxXQUFXLENBQUM7UUF4QjFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBcEJELElBQ0ksR0FBRyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFrQkQ7Ozs7Ozs7T0FPRztJQUNnQixlQUFlLENBQUMsS0FBYztRQUMvQyxNQUFNLEdBQUcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7NEdBekNVLGVBQWUsb0lBZWhCLFdBQVcsYUFDWCxZQUFZO2dHQWhCWCxlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFNBQVM7OzBCQWdCTCxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFlBQVk7NENBWGxCLEdBQUc7c0JBRE4sS0FBSzt1QkFBQyxLQUFLOztBQTBDZCxNQUFNLFdBQVcsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUU1RCxNQUFNLE1BQU0sR0FBRztJQUNiLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7Q0FDWixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7Q0FJaEIsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBRUgsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFEM0Q7O1FBRXFCLFdBQU0sR0FBRyxNQUFNLENBQUM7S0FDcEM7O21IQUZZLHNCQUFzQjt1R0FBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBRGxDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbnB1dCxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZURpcmVjdGl2ZTIsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU0VSVkVSX1RPS0VOLFxuICBTdHlsZUJ1aWxkZXIsXG4gIFN0eWxlRGVmaW5pdGlvbixcbiAgU3R5bGVVdGlscyxcbn0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEltZ1NyY1N0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHsgY29udGVudDogdXJsID8gYHVybCgke3VybH0pYCA6ICcnIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgSW1nU3JjRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdpbWctc3JjJztcbiAgcHJvdGVjdGVkIGRlZmF1bHRTcmMgPSAnJztcblxuICBASW5wdXQoJ3NyYycpXG4gIHNldCBzcmModmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlZmF1bHRTcmMgPSB2YWw7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmRlZmF1bHRTcmMsICcnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgc3R5bGVCdWlsZGVyOiBJbWdTcmNTdHlsZUJ1aWxkZXIsXG4gICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBJbmplY3QoU0VSVkVSX1RPS0VOKSBwcm90ZWN0ZWQgc2VydmVyTW9kdWxlTG9hZGVkOiBib29sZWFuXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnLCAnJyk7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnNlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIFtyZXNwb25zaXZlbHldIGFjdGl2YXRlZCBpbnB1dCB2YWx1ZSB0byB1cGRhdGVcbiAgICogdGhlIGhvc3QgaW1nIHNyYyBhdHRyaWJ1dGUgb3IgYXNzaWduIGEgZGVmYXVsdCBgaW1nLnNyYz0nJ2BcbiAgICogaWYgdGhlIHNyYyBoYXMgbm90IGJlZW4gZGVmaW5lZC5cbiAgICpcbiAgICogRG8gbm90aGluZyB0byBzdGFuZGFyZCBgPGltZyBzcmM9XCJcIj5gIHVzYWdlcywgb25seSB3aGVuIHJlc3BvbnNpdmVcbiAgICoga2V5cyBhcmUgcHJlc2VudCBkbyB3ZSBhY3R1YWxseSBjYWxsIGBzZXRBdHRyaWJ1dGUoKWBcbiAgICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU/OiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSB2YWx1ZSB8fCB0aGlzLmRlZmF1bHRTcmM7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnNlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgdGhpcy5hZGRTdHlsZXModXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3R5bGVDYWNoZSA9IGltZ1NyY0NhY2hlO1xufVxuXG5jb25zdCBpbWdTcmNDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnc3JjLnhzJyxcbiAgJ3NyYy5zbScsXG4gICdzcmMubWQnLFxuICAnc3JjLmxnJyxcbiAgJ3NyYy54bCcsXG4gICdzcmMubHQtc20nLFxuICAnc3JjLmx0LW1kJyxcbiAgJ3NyYy5sdC1sZycsXG4gICdzcmMubHQteGwnLFxuICAnc3JjLmd0LXhzJyxcbiAgJ3NyYy5ndC1zbScsXG4gICdzcmMuZ3QtbWQnLFxuICAnc3JjLmd0LWxnJyxcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBpbWdbc3JjLnhzXSwgICAgaW1nW3NyYy5zbV0sICAgIGltZ1tzcmMubWRdLCAgICBpbWdbc3JjLmxnXSwgICBpbWdbc3JjLnhsXSxcbiAgaW1nW3NyYy5sdC1zbV0sIGltZ1tzcmMubHQtbWRdLCBpbWdbc3JjLmx0LWxnXSwgaW1nW3NyYy5sdC14bF0sXG4gIGltZ1tzcmMuZ3QteHNdLCBpbWdbc3JjLmd0LXNtXSwgaW1nW3NyYy5ndC1tZF0sIGltZ1tzcmMuZ3QtbGddXG5gO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIHByb3ZpZGVzIGEgcmVzcG9uc2l2ZSBBUEkgZm9yIHRoZSBIVE1MIDxpbWc+ICdzcmMnIGF0dHJpYnV0ZVxuICogYW5kIHdpbGwgdXBkYXRlIHRoZSBpbWcuc3JjIHByb3BlcnR5IHVwb24gZWFjaCByZXNwb25zaXZlIGFjdGl2YXRpb24uXG4gKlxuICogZS5nLlxuICogICAgICA8aW1nIHNyYz1cImRlZmF1bHRTY2VuZS5qcGdcIiBzcmMueHM9XCJtb2JpbGVTY2VuZS5qcGdcIj48L2ltZz5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vcmVzcG9uc2l2ZS1pbWFnZXMteW91cmUtanVzdC1jaGFuZ2luZy1yZXNvbHV0aW9ucy11c2Utc3JjL1xuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3IsIGlucHV0cyB9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRJbWdTcmNEaXJlY3RpdmUgZXh0ZW5kcyBJbWdTcmNEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19