/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BREAKPOINTS, LAYOUT_CONFIG, ɵMatchMedia as MatchMedia, } from '@ngbrackets/ngx-layout/core';
import * as i0 from "@angular/core";
/**
 * Special server-only class to simulate a MediaQueryList and
 * - supports manual activation to simulate mediaQuery matching
 * - manages listeners
 */
export class ServerMediaQueryList extends EventTarget {
    constructor(_mediaQuery, _isActive = false) {
        super();
        this._mediaQuery = _mediaQuery;
        this._isActive = _isActive;
        this._listeners = [];
        this.onchange = null;
    }
    get matches() {
        return this._isActive;
    }
    get media() {
        return this._mediaQuery;
    }
    /**
     * Destroy the current list by deactivating the
     * listeners and clearing the internal list
     */
    destroy() {
        this.deactivate();
        this._listeners = [];
    }
    /** Notify all listeners that 'matches === TRUE' */
    activate() {
        if (!this._isActive) {
            this._isActive = true;
            this._listeners.forEach((callback) => {
                const cb = callback;
                cb.call(this, {
                    matches: this.matches,
                    media: this.media,
                });
            });
        }
        return this;
    }
    /** Notify all listeners that 'matches === false' */
    deactivate() {
        if (this._isActive) {
            this._isActive = false;
            this._listeners.forEach((callback) => {
                const cb = callback;
                cb.call(this, {
                    matches: this.matches,
                    media: this.media,
                });
            });
        }
        return this;
    }
    /** Add a listener to our internal list to activate later */
    addListener(listener) {
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener);
        }
        if (this._isActive) {
            const cb = listener;
            cb.call(this, {
                matches: this.matches,
                media: this.media,
            });
        }
    }
    /** Don't need to remove listeners in the server environment */
    removeListener() { }
    addEventListener() { }
    removeEventListener() { }
    dispatchEvent(_) {
        return false;
    }
}
/**
 * Special server-only implementation of MatchMedia that uses the above
 * ServerMediaQueryList as its internal representation
 *
 * Also contains methods to activate and deactivate breakpoints
 */
export class ServerMatchMedia extends MatchMedia {
    constructor(_zone, _platformId, _document, breakpoints, layoutConfig) {
        super(_zone, _platformId, _document);
        this._zone = _zone;
        this._platformId = _platformId;
        this._document = _document;
        this.breakpoints = breakpoints;
        this.layoutConfig = layoutConfig;
        this._activeBreakpoints = [];
        const serverBps = layoutConfig.ssrObserveBreakpoints;
        if (serverBps) {
            this._activeBreakpoints = serverBps.reduce((acc, serverBp) => {
                const foundBp = breakpoints.find((bp) => serverBp === bp.alias);
                if (!foundBp) {
                    console.warn(`FlexLayoutServerModule: unknown breakpoint alias "${serverBp}"`);
                }
                else {
                    acc.push(foundBp);
                }
                return acc;
            }, []);
        }
    }
    /** Activate the specified breakpoint if we're on the server, no-op otherwise */
    activateBreakpoint(bp) {
        const lookupBreakpoint = this.registry.get(bp.mediaQuery);
        if (lookupBreakpoint) {
            lookupBreakpoint.activate();
        }
    }
    /** Deactivate the specified breakpoint if we're on the server, no-op otherwise */
    deactivateBreakpoint(bp) {
        const lookupBreakpoint = this.registry.get(bp.mediaQuery);
        if (lookupBreakpoint) {
            lookupBreakpoint.deactivate();
        }
    }
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    buildMQL(query) {
        const isActive = this._activeBreakpoints.some((ab) => ab.mediaQuery === query);
        return new ServerMediaQueryList(query, isActive);
    }
}
ServerMatchMedia.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ServerMatchMedia, deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }, { token: BREAKPOINTS }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
ServerMatchMedia.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ServerMatchMedia });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: ServerMatchMedia, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [BREAKPOINTS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLW1hdGNoLW1lZGlhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9zZXJ2ZXIvc2VydmVyLW1hdGNoLW1lZGlhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUVMLFdBQVcsRUFFWCxhQUFhLEVBQ2IsV0FBVyxJQUFJLFVBQVUsR0FDMUIsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFckM7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxvQkFDWCxTQUFRLFdBQVc7SUFhbkIsWUFBb0IsV0FBbUIsRUFBVSxZQUFZLEtBQUs7UUFDaEUsS0FBSyxFQUFFLENBQUM7UUFEVSxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFWMUQsZUFBVSxHQUE2QixFQUFFLENBQUM7UUFpRmxELGFBQVEsR0FBMkIsSUFBSSxDQUFDO0lBckV4QyxDQUFDO0lBVkQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQU1EOzs7T0FHRztJQUNILE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVB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LENBQUM7WUFDYixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsa0JBQWtCLENBQUMsRUFBYztRQUMvQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN4QyxFQUFFLENBQUMsVUFBVSxDQUNVLENBQUM7UUFDMUIsSUFBSSxnQkFBZ0IsRUFBRTtZQUNwQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxrRkFBa0Y7SUFDbEYsb0JBQW9CLENBQUMsRUFBYztRQUNqQyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN4QyxFQUFFLENBQUMsVUFBVSxDQUNVLENBQUM7UUFDMUIsSUFBSSxnQkFBZ0IsRUFBRTtZQUNwQixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDZ0IsUUFBUSxDQUFDLEtBQWE7UUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDM0MsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUNoQyxDQUFDO1FBRUYsT0FBTyxJQUFJLG9CQUFvQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs2R0E3RFUsZ0JBQWdCLHdDQUtqQixXQUFXLGFBQ1gsUUFBUSxhQUNSLFdBQVcsYUFDWCxhQUFhO2lIQVJaLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFNTixNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCcmVha1BvaW50LFxuICBCUkVBS1BPSU5UUyxcbiAgTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgTEFZT1VUX0NPTkZJRyxcbiAgybVNYXRjaE1lZGlhIGFzIE1hdGNoTWVkaWEsXG59IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQvY29yZSc7XG5cbi8qKlxuICogU3BlY2lhbCBzZXJ2ZXItb25seSBjbGFzcyB0byBzaW11bGF0ZSBhIE1lZGlhUXVlcnlMaXN0IGFuZFxuICogLSBzdXBwb3J0cyBtYW51YWwgYWN0aXZhdGlvbiB0byBzaW11bGF0ZSBtZWRpYVF1ZXJ5IG1hdGNoaW5nXG4gKiAtIG1hbmFnZXMgbGlzdGVuZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJNZWRpYVF1ZXJ5TGlzdFxuICBleHRlbmRzIEV2ZW50VGFyZ2V0XG4gIGltcGxlbWVudHMgTWVkaWFRdWVyeUxpc3RcbntcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyW10gPSBbXTtcblxuICBnZXQgbWF0Y2hlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG4gIH1cblxuICBnZXQgbWVkaWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWVkaWFRdWVyeTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lZGlhUXVlcnk6IHN0cmluZywgcHJpdmF0ZSBfaXNBY3RpdmUgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgY3VycmVudCBsaXN0IGJ5IGRlYWN0aXZhdGluZyB0aGVcbiAgICogbGlzdGVuZXJzIGFuZCBjbGVhcmluZyB0aGUgaW50ZXJuYWwgbGlzdFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTtcbiAgfVxuXG4gIC8qKiBOb3RpZnkgYWxsIGxpc3RlbmVycyB0aGF0ICdtYXRjaGVzID09PSBUUlVFJyAqL1xuICBhY3RpdmF0ZSgpOiBTZXJ2ZXJNZWRpYVF1ZXJ5TGlzdCB7XG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGNiOiAodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkgPVxuICAgICAgICAgIGNhbGxiYWNrITtcbiAgICAgICAgY2IuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgbWF0Y2hlczogdGhpcy5tYXRjaGVzLFxuICAgICAgICAgIG1lZGlhOiB0aGlzLm1lZGlhLFxuICAgICAgICB9IGFzIE1lZGlhUXVlcnlMaXN0RXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIE5vdGlmeSBhbGwgbGlzdGVuZXJzIHRoYXQgJ21hdGNoZXMgPT09IGZhbHNlJyAqL1xuICBkZWFjdGl2YXRlKCk6IFNlcnZlck1lZGlhUXVlcnlMaXN0IHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgY2I6ICh0aGlzOiBNZWRpYVF1ZXJ5TGlzdCwgZXY6IE1lZGlhUXVlcnlMaXN0RXZlbnQpID0+IGFueSA9XG4gICAgICAgICAgY2FsbGJhY2shO1xuICAgICAgICBjYi5jYWxsKHRoaXMsIHtcbiAgICAgICAgICBtYXRjaGVzOiB0aGlzLm1hdGNoZXMsXG4gICAgICAgICAgbWVkaWE6IHRoaXMubWVkaWEsXG4gICAgICAgIH0gYXMgTWVkaWFRdWVyeUxpc3RFdmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogQWRkIGEgbGlzdGVuZXIgdG8gb3VyIGludGVybmFsIGxpc3QgdG8gYWN0aXZhdGUgbGF0ZXIgKi9cbiAgYWRkTGlzdGVuZXIobGlzdGVuZXI6IE1lZGlhUXVlcnlMaXN0TGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIGNvbnN0IGNiOiAodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkgPVxuICAgICAgICBsaXN0ZW5lciE7XG4gICAgICBjYi5jYWxsKHRoaXMsIHtcbiAgICAgICAgbWF0Y2hlczogdGhpcy5tYXRjaGVzLFxuICAgICAgICBtZWRpYTogdGhpcy5tZWRpYSxcbiAgICAgIH0gYXMgTWVkaWFRdWVyeUxpc3RFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERvbid0IG5lZWQgdG8gcmVtb3ZlIGxpc3RlbmVycyBpbiB0aGUgc2VydmVyIGVudmlyb25tZW50ICovXG4gIHJlbW92ZUxpc3RlbmVyKCkge31cblxuICBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKCkge31cblxuICBvdmVycmlkZSByZW1vdmVFdmVudExpc3RlbmVyKCkge31cblxuICBvdmVycmlkZSBkaXNwYXRjaEV2ZW50KF86IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgb25jaGFuZ2U6IE1lZGlhUXVlcnlMaXN0TGlzdGVuZXIgPSBudWxsO1xufVxuXG4vKipcbiAqIFNwZWNpYWwgc2VydmVyLW9ubHkgaW1wbGVtZW50YXRpb24gb2YgTWF0Y2hNZWRpYSB0aGF0IHVzZXMgdGhlIGFib3ZlXG4gKiBTZXJ2ZXJNZWRpYVF1ZXJ5TGlzdCBhcyBpdHMgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAqXG4gKiBBbHNvIGNvbnRhaW5zIG1ldGhvZHMgdG8gYWN0aXZhdGUgYW5kIGRlYWN0aXZhdGUgYnJlYWtwb2ludHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlck1hdGNoTWVkaWEgZXh0ZW5kcyBNYXRjaE1lZGlhIHtcbiAgcHJpdmF0ZSBfYWN0aXZlQnJlYWtwb2ludHM6IEJyZWFrUG9pbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfem9uZTogTmdab25lLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBvdmVycmlkZSBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBvdmVycmlkZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KEJSRUFLUE9JTlRTKSBwcm90ZWN0ZWQgYnJlYWtwb2ludHM6IEJyZWFrUG9pbnRbXSxcbiAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZ09wdGlvbnNcbiAgKSB7XG4gICAgc3VwZXIoX3pvbmUsIF9wbGF0Zm9ybUlkLCBfZG9jdW1lbnQpO1xuXG4gICAgY29uc3Qgc2VydmVyQnBzID0gbGF5b3V0Q29uZmlnLnNzck9ic2VydmVCcmVha3BvaW50cztcbiAgICBpZiAoc2VydmVyQnBzKSB7XG4gICAgICB0aGlzLl9hY3RpdmVCcmVha3BvaW50cyA9IHNlcnZlckJwcy5yZWR1Y2UoXG4gICAgICAgIChhY2M6IEJyZWFrUG9pbnRbXSwgc2VydmVyQnA6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvdW5kQnAgPSBicmVha3BvaW50cy5maW5kKChicCkgPT4gc2VydmVyQnAgPT09IGJwLmFsaWFzKTtcbiAgICAgICAgICBpZiAoIWZvdW5kQnApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYEZsZXhMYXlvdXRTZXJ2ZXJNb2R1bGU6IHVua25vd24gYnJlYWtwb2ludCBhbGlhcyBcIiR7c2VydmVyQnB9XCJgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2MucHVzaChmb3VuZEJwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAgW11cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEFjdGl2YXRlIHRoZSBzcGVjaWZpZWQgYnJlYWtwb2ludCBpZiB3ZSdyZSBvbiB0aGUgc2VydmVyLCBuby1vcCBvdGhlcndpc2UgKi9cbiAgYWN0aXZhdGVCcmVha3BvaW50KGJwOiBCcmVha1BvaW50KSB7XG4gICAgY29uc3QgbG9va3VwQnJlYWtwb2ludCA9IHRoaXMucmVnaXN0cnkuZ2V0KFxuICAgICAgYnAubWVkaWFRdWVyeVxuICAgICkgYXMgU2VydmVyTWVkaWFRdWVyeUxpc3Q7XG4gICAgaWYgKGxvb2t1cEJyZWFrcG9pbnQpIHtcbiAgICAgIGxvb2t1cEJyZWFrcG9pbnQuYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRGVhY3RpdmF0ZSB0aGUgc3BlY2lmaWVkIGJyZWFrcG9pbnQgaWYgd2UncmUgb24gdGhlIHNlcnZlciwgbm8tb3Agb3RoZXJ3aXNlICovXG4gIGRlYWN0aXZhdGVCcmVha3BvaW50KGJwOiBCcmVha1BvaW50KSB7XG4gICAgY29uc3QgbG9va3VwQnJlYWtwb2ludCA9IHRoaXMucmVnaXN0cnkuZ2V0KFxuICAgICAgYnAubWVkaWFRdWVyeVxuICAgICkgYXMgU2VydmVyTWVkaWFRdWVyeUxpc3Q7XG4gICAgaWYgKGxvb2t1cEJyZWFrcG9pbnQpIHtcbiAgICAgIGxvb2t1cEJyZWFrcG9pbnQuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHdpbmRvdy5tYXRjaE1lZGlhKCkgdG8gYnVpbGQgYSBNZWRpYVF1ZXJ5TGlzdDsgd2hpY2hcbiAgICogc3VwcG9ydHMgMC4ubiBsaXN0ZW5lcnMgZm9yIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYnVpbGRNUUwocXVlcnk6IHN0cmluZyk6IFNlcnZlck1lZGlhUXVlcnlMaXN0IHtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IHRoaXMuX2FjdGl2ZUJyZWFrcG9pbnRzLnNvbWUoXG4gICAgICAoYWIpID0+IGFiLm1lZGlhUXVlcnkgPT09IHF1ZXJ5XG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgU2VydmVyTWVkaWFRdWVyeUxpc3QocXVlcnksIGlzQWN0aXZlKTtcbiAgfVxufVxuXG50eXBlIE1lZGlhUXVlcnlMaXN0TGlzdGVuZXIgPVxuICB8ICgodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkpXG4gIHwgbnVsbDtcbiJdfQ==