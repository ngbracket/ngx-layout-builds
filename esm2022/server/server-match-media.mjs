/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BREAKPOINTS, LAYOUT_CONFIG, ɵMatchMedia as MatchMedia, } from '@ngbracket/ngx-layout/core';
import * as i0 from "@angular/core";
/**
 * Special server-only class to simulate a MediaQueryList and
 * - supports manual activation to simulate mediaQuery matching
 * - manages listeners
 */
export class ServerMediaQueryList extends EventTarget {
    get matches() {
        return this._isActive;
    }
    get media() {
        return this._mediaQuery;
    }
    constructor(_mediaQuery, _isActive = false) {
        super();
        this._mediaQuery = _mediaQuery;
        this._isActive = _isActive;
        this._listeners = [];
        this.onchange = null;
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
class ServerMatchMedia extends MatchMedia {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ServerMatchMedia, deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }, { token: BREAKPOINTS }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ServerMatchMedia }); }
}
export { ServerMatchMedia };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ServerMatchMedia, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLW1hdGNoLW1lZGlhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9zZXJ2ZXIvc2VydmVyLW1hdGNoLW1lZGlhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUVMLFdBQVcsRUFFWCxhQUFhLEVBQ2IsV0FBVyxJQUFJLFVBQVUsR0FDMUIsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFcEM7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxvQkFDWCxTQUFRLFdBQVc7SUFLbkIsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQW9CLFdBQW1CLEVBQVUsWUFBWSxLQUFLO1FBQ2hFLEtBQUssRUFBRSxDQUFDO1FBRFUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBVjFELGVBQVUsR0FBNkIsRUFBRSxDQUFDO1FBaUZsRCxhQUFRLEdBQTJCLElBQUksQ0FBQztJQXJFeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG1EQUFtRDtJQUNuRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVB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Z2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJyZWFrUG9pbnQsXG4gIEJSRUFLUE9JTlRTLFxuICBMYXlvdXRDb25maWdPcHRpb25zLFxuICBMQVlPVVRfQ09ORklHLFxuICDJtU1hdGNoTWVkaWEgYXMgTWF0Y2hNZWRpYSxcbn0gZnJvbSAnQG5nYnJhY2tldC9uZ3gtbGF5b3V0L2NvcmUnO1xuXG4vKipcbiAqIFNwZWNpYWwgc2VydmVyLW9ubHkgY2xhc3MgdG8gc2ltdWxhdGUgYSBNZWRpYVF1ZXJ5TGlzdCBhbmRcbiAqIC0gc3VwcG9ydHMgbWFudWFsIGFjdGl2YXRpb24gdG8gc2ltdWxhdGUgbWVkaWFRdWVyeSBtYXRjaGluZ1xuICogLSBtYW5hZ2VzIGxpc3RlbmVyc1xuICovXG5leHBvcnQgY2xhc3MgU2VydmVyTWVkaWFRdWVyeUxpc3RcbiAgZXh0ZW5kcyBFdmVudFRhcmdldFxuICBpbXBsZW1lbnRzIE1lZGlhUXVlcnlMaXN0XG57XG4gIHByaXZhdGUgX2xpc3RlbmVyczogTWVkaWFRdWVyeUxpc3RMaXN0ZW5lcltdID0gW107XG5cbiAgZ2V0IG1hdGNoZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQWN0aXZlO1xuICB9XG5cbiAgZ2V0IG1lZGlhKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX21lZGlhUXVlcnk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZWRpYVF1ZXJ5OiBzdHJpbmcsIHByaXZhdGUgX2lzQWN0aXZlID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgbGlzdCBieSBkZWFjdGl2YXRpbmcgdGhlXG4gICAqIGxpc3RlbmVycyBhbmQgY2xlYXJpbmcgdGhlIGludGVybmFsIGxpc3RcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gIH1cblxuICAvKiogTm90aWZ5IGFsbCBsaXN0ZW5lcnMgdGhhdCAnbWF0Y2hlcyA9PT0gVFJVRScgKi9cbiAgYWN0aXZhdGUoKTogU2VydmVyTWVkaWFRdWVyeUxpc3Qge1xuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICBjb25zdCBjYjogKHRoaXM6IE1lZGlhUXVlcnlMaXN0LCBldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4gYW55ID1cbiAgICAgICAgICBjYWxsYmFjayE7XG4gICAgICAgIGNiLmNhbGwodGhpcywge1xuICAgICAgICAgIG1hdGNoZXM6IHRoaXMubWF0Y2hlcyxcbiAgICAgICAgICBtZWRpYTogdGhpcy5tZWRpYSxcbiAgICAgICAgfSBhcyBNZWRpYVF1ZXJ5TGlzdEV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBOb3RpZnkgYWxsIGxpc3RlbmVycyB0aGF0ICdtYXRjaGVzID09PSBmYWxzZScgKi9cbiAgZGVhY3RpdmF0ZSgpOiBTZXJ2ZXJNZWRpYVF1ZXJ5TGlzdCB7XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGNiOiAodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkgPVxuICAgICAgICAgIGNhbGxiYWNrITtcbiAgICAgICAgY2IuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgbWF0Y2hlczogdGhpcy5tYXRjaGVzLFxuICAgICAgICAgIG1lZGlhOiB0aGlzLm1lZGlhLFxuICAgICAgICB9IGFzIE1lZGlhUXVlcnlMaXN0RXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEFkZCBhIGxpc3RlbmVyIHRvIG91ciBpbnRlcm5hbCBsaXN0IHRvIGFjdGl2YXRlIGxhdGVyICovXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyOiBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICBjb25zdCBjYjogKHRoaXM6IE1lZGlhUXVlcnlMaXN0LCBldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4gYW55ID1cbiAgICAgICAgbGlzdGVuZXIhO1xuICAgICAgY2IuY2FsbCh0aGlzLCB7XG4gICAgICAgIG1hdGNoZXM6IHRoaXMubWF0Y2hlcyxcbiAgICAgICAgbWVkaWE6IHRoaXMubWVkaWEsXG4gICAgICB9IGFzIE1lZGlhUXVlcnlMaXN0RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEb24ndCBuZWVkIHRvIHJlbW92ZSBsaXN0ZW5lcnMgaW4gdGhlIHNlcnZlciBlbnZpcm9ubWVudCAqL1xuICByZW1vdmVMaXN0ZW5lcigpIHt9XG5cbiAgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcigpIHt9XG5cbiAgb3ZlcnJpZGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9XG5cbiAgb3ZlcnJpZGUgZGlzcGF0Y2hFdmVudChfOiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uY2hhbmdlOiBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyID0gbnVsbDtcbn1cblxuLyoqXG4gKiBTcGVjaWFsIHNlcnZlci1vbmx5IGltcGxlbWVudGF0aW9uIG9mIE1hdGNoTWVkaWEgdGhhdCB1c2VzIHRoZSBhYm92ZVxuICogU2VydmVyTWVkaWFRdWVyeUxpc3QgYXMgaXRzIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gKlxuICogQWxzbyBjb250YWlucyBtZXRob2RzIHRvIGFjdGl2YXRlIGFuZCBkZWFjdGl2YXRlIGJyZWFrcG9pbnRzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJNYXRjaE1lZGlhIGV4dGVuZHMgTWF0Y2hNZWRpYSB7XG4gIHByaXZhdGUgX2FjdGl2ZUJyZWFrcG9pbnRzOiBCcmVha1BvaW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3BsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2RvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChCUkVBS1BPSU5UUykgcHJvdGVjdGVkIGJyZWFrcG9pbnRzOiBCcmVha1BvaW50W10sXG4gICAgQEluamVjdChMQVlPVVRfQ09ORklHKSBwcm90ZWN0ZWQgbGF5b3V0Q29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zXG4gICkge1xuICAgIHN1cGVyKF96b25lLCBfcGxhdGZvcm1JZCwgX2RvY3VtZW50KTtcblxuICAgIGNvbnN0IHNlcnZlckJwcyA9IGxheW91dENvbmZpZy5zc3JPYnNlcnZlQnJlYWtwb2ludHM7XG4gICAgaWYgKHNlcnZlckJwcykge1xuICAgICAgdGhpcy5fYWN0aXZlQnJlYWtwb2ludHMgPSBzZXJ2ZXJCcHMucmVkdWNlKFxuICAgICAgICAoYWNjOiBCcmVha1BvaW50W10sIHNlcnZlckJwOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEJwID0gYnJlYWtwb2ludHMuZmluZCgoYnApID0+IHNlcnZlckJwID09PSBicC5hbGlhcyk7XG4gICAgICAgICAgaWYgKCFmb3VuZEJwKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBGbGV4TGF5b3V0U2VydmVyTW9kdWxlOiB1bmtub3duIGJyZWFrcG9pbnQgYWxpYXMgXCIke3NlcnZlckJwfVwiYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjLnB1c2goZm91bmRCcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIFtdXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBY3RpdmF0ZSB0aGUgc3BlY2lmaWVkIGJyZWFrcG9pbnQgaWYgd2UncmUgb24gdGhlIHNlcnZlciwgbm8tb3Agb3RoZXJ3aXNlICovXG4gIGFjdGl2YXRlQnJlYWtwb2ludChicDogQnJlYWtQb2ludCkge1xuICAgIGNvbnN0IGxvb2t1cEJyZWFrcG9pbnQgPSB0aGlzLnJlZ2lzdHJ5LmdldChcbiAgICAgIGJwLm1lZGlhUXVlcnlcbiAgICApIGFzIFNlcnZlck1lZGlhUXVlcnlMaXN0O1xuICAgIGlmIChsb29rdXBCcmVha3BvaW50KSB7XG4gICAgICBsb29rdXBCcmVha3BvaW50LmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlYWN0aXZhdGUgdGhlIHNwZWNpZmllZCBicmVha3BvaW50IGlmIHdlJ3JlIG9uIHRoZSBzZXJ2ZXIsIG5vLW9wIG90aGVyd2lzZSAqL1xuICBkZWFjdGl2YXRlQnJlYWtwb2ludChicDogQnJlYWtQb2ludCkge1xuICAgIGNvbnN0IGxvb2t1cEJyZWFrcG9pbnQgPSB0aGlzLnJlZ2lzdHJ5LmdldChcbiAgICAgIGJwLm1lZGlhUXVlcnlcbiAgICApIGFzIFNlcnZlck1lZGlhUXVlcnlMaXN0O1xuICAgIGlmIChsb29rdXBCcmVha3BvaW50KSB7XG4gICAgICBsb29rdXBCcmVha3BvaW50LmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB3aW5kb3cubWF0Y2hNZWRpYSgpIHRvIGJ1aWxkIGEgTWVkaWFRdWVyeUxpc3Q7IHdoaWNoXG4gICAqIHN1cHBvcnRzIDAuLm4gbGlzdGVuZXJzIGZvciBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGJ1aWxkTVFMKHF1ZXJ5OiBzdHJpbmcpOiBTZXJ2ZXJNZWRpYVF1ZXJ5TGlzdCB7XG4gICAgY29uc3QgaXNBY3RpdmUgPSB0aGlzLl9hY3RpdmVCcmVha3BvaW50cy5zb21lKFxuICAgICAgKGFiKSA9PiBhYi5tZWRpYVF1ZXJ5ID09PSBxdWVyeVxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFNlcnZlck1lZGlhUXVlcnlMaXN0KHF1ZXJ5LCBpc0FjdGl2ZSk7XG4gIH1cbn1cblxudHlwZSBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyID1cbiAgfCAoKHRoaXM6IE1lZGlhUXVlcnlMaXN0LCBldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4gYW55KVxuICB8IG51bGw7XG4iXX0=