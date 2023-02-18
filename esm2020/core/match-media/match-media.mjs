/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediaChange } from '../media-change';
import * as i0 from "@angular/core";
/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
export class MatchMedia {
    constructor(_zone, _platformId, _document) {
        this._zone = _zone;
        this._platformId = _platformId;
        this._document = _document;
        /** Initialize source with 'all' so all non-responsive APIs trigger style updates */
        this.source = new BehaviorSubject(new MediaChange(true));
        this.registry = new Map();
        this.pendingRemoveListenerFns = [];
        this._observable$ = this.source.asObservable();
    }
    /**
     * Publish list of all current activations
     */
    get activations() {
        const results = [];
        this.registry.forEach((mql, key) => {
            if (mql.matches) {
                results.push(key);
            }
        });
        return results;
    }
    /**
     * For the specified mediaQuery?
     */
    isActive(mediaQuery) {
        const mql = this.registry.get(mediaQuery);
        return (mql?.matches ?? this.registerQuery(mediaQuery).some((m) => m.matches));
    }
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * who wish to use the MediaMonitor as mediaMonitor$ observable service.
     *
     * Use deferred registration process to register breakpoints only on subscription
     * This logic also enforces logic to register all mediaQueries BEFORE notify
     * subscribers of notifications.
     */
    observe(mqList, filterOthers = false) {
        if (mqList && mqList.length) {
            const matchMedia$ = this._observable$.pipe(filter((change) => !filterOthers ? true : mqList.indexOf(change.mediaQuery) > -1));
            const registration$ = new Observable((observer) => {
                // tslint:disable-line:max-line-length
                const matches = this.registerQuery(mqList);
                if (matches.length) {
                    const lastChange = matches.pop();
                    matches.forEach((e) => {
                        observer.next(e);
                    });
                    this.source.next(lastChange); // last match is cached
                }
                observer.complete();
            });
            return merge(registration$, matchMedia$);
        }
        return this._observable$;
    }
    /**
     * Based on the BreakPointRegistry provider, register internal listeners for each unique
     * mediaQuery. Each listener emits specific MediaChange data to observers
     */
    registerQuery(mediaQuery) {
        const list = Array.isArray(mediaQuery) ? mediaQuery : [mediaQuery];
        const matches = [];
        buildQueryCss(list, this._document);
        list.forEach((query) => {
            const onMQLEvent = (e) => {
                this._zone.run(() => this.source.next(new MediaChange(e.matches, query)));
            };
            let mql = this.registry.get(query);
            if (!mql) {
                mql = this.buildMQL(query);
                mql.addListener(onMQLEvent);
                this.pendingRemoveListenerFns.push(() => mql.removeListener(onMQLEvent));
                this.registry.set(query, mql);
            }
            if (mql.matches) {
                matches.push(new MediaChange(true, query));
            }
        });
        return matches;
    }
    ngOnDestroy() {
        let fn;
        while ((fn = this.pendingRemoveListenerFns.pop())) {
            fn();
        }
    }
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    buildMQL(query) {
        return constructMql(query, isPlatformBrowser(this._platformId));
    }
}
MatchMedia.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MatchMedia, deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
MatchMedia.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MatchMedia, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MatchMedia, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
const ALL_STYLES = {};
/**
 * For Webkit engines that only trigger the MediaQueryList Listener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param mediaQueries
 * @param _document
 */
function buildQueryCss(mediaQueries, _document) {
    const list = mediaQueries.filter((it) => !ALL_STYLES[it]);
    if (list.length > 0) {
        const query = list.join(', ');
        try {
            const styleEl = _document.createElement('style');
            styleEl.setAttribute('type', 'text/css');
            if (!styleEl.styleSheet) {
                const cssText = `
/*
  @ngbrackets/ngx-layout - workaround for possible browser quirk with mediaQuery listeners
  see http://bit.ly/2sd4HMP
*/
@media ${query} {.fx-query-test{ }}
`;
                styleEl.appendChild(_document.createTextNode(cssText));
            }
            _document.head.appendChild(styleEl);
            // Store in private global registry
            list.forEach((mq) => (ALL_STYLES[mq] = styleEl));
        }
        catch (e) {
            console.error(e);
        }
    }
}
function buildMockMql(query) {
    const et = new EventTarget();
    et.matches = query === 'all' || query === '';
    et.media = query;
    et.addListener = () => { };
    et.removeListener = () => { };
    et.addEventListener = () => { };
    et.dispatchEvent = () => false;
    et.onchange = null;
    return et;
}
function constructMql(query, isBrowser) {
    const canListen = isBrowser && !!window.matchMedia('all').addListener;
    return canListen ? window.matchMedia(query) : buildMockMql(query);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWF0Y2gtbWVkaWEvbWF0Y2gtbWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUdWLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFOUM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLFVBQVU7SUFNckIsWUFDWSxLQUFhLEVBQ1EsV0FBbUIsRUFDdEIsU0FBYztRQUZoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ1EsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQVI1QyxvRkFBb0Y7UUFDM0UsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFjLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUUsYUFBUSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDO1FBQzVCLDZCQUF3QixHQUFzQixFQUFFLENBQUM7UUFrSXhELGlCQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQTVIakQsQ0FBQztJQUVKOztPQUVHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENB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S0FBSyxDQUFDO0lBQ2pCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQzFCLEVBQUUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQzdCLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDL0IsRUFBRSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDL0IsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFbkIsT0FBTyxFQUFvQixDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFhLEVBQUUsU0FBa0I7SUFDckQsTUFBTSxTQUFTLEdBQ2IsU0FBUyxJQUFJLENBQUMsQ0FBVSxNQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUVoRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQVUsTUFBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNZWRpYUNoYW5nZSB9IGZyb20gJy4uL21lZGlhLWNoYW5nZSc7XG5cbi8qKlxuICogTWVkaWFNb25pdG9yIGNvbmZpZ3VyZXMgbGlzdGVuZXJzIHRvIG1lZGlhUXVlcnkgY2hhbmdlcyBhbmQgcHVibGlzaGVzIGFuIE9ic2VydmFibGUgZmFjYWRlIHRvXG4gKiBjb252ZXJ0IG1lZGlhUXVlcnkgY2hhbmdlIGNhbGxiYWNrcyB0byBzdWJzY3JpYmVyIG5vdGlmaWNhdGlvbnMuIFRoZXNlIG5vdGlmaWNhdGlvbnMgd2lsbCBiZVxuICogcGVyZm9ybWVkIHdpdGhpbiB0aGUgbmcgWm9uZSB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25zIGFuZCBjb21wb25lbnQgdXBkYXRlcy5cbiAqXG4gKiBOT1RFOiBib3RoIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnMgYW5kIGRlLWFjdGl2YXRpb25zIGFyZSBhbm5vdW5jZWQgaW4gbm90aWZpY2F0aW9uc1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE1hdGNoTWVkaWEgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKiogSW5pdGlhbGl6ZSBzb3VyY2Ugd2l0aCAnYWxsJyBzbyBhbGwgbm9uLXJlc3BvbnNpdmUgQVBJcyB0cmlnZ2VyIHN0eWxlIHVwZGF0ZXMgKi9cbiAgcmVhZG9ubHkgc291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYUNoYW5nZT4obmV3IE1lZGlhQ2hhbmdlKHRydWUpKTtcbiAgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWVkaWFRdWVyeUxpc3Q+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZ1JlbW92ZUxpc3RlbmVyRm5zOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfem9uZTogTmdab25lLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBfZG9jdW1lbnQ6IGFueVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2ggbGlzdCBvZiBhbGwgY3VycmVudCBhY3RpdmF0aW9uc1xuICAgKi9cbiAgZ2V0IGFjdGl2YXRpb25zKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHRoaXMucmVnaXN0cnkuZm9yRWFjaCgobXFsOiBNZWRpYVF1ZXJ5TGlzdCwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChtcWwubWF0Y2hlcykge1xuICAgICAgICByZXN1bHRzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgdGhlIHNwZWNpZmllZCBtZWRpYVF1ZXJ5P1xuICAgKi9cbiAgaXNBY3RpdmUobWVkaWFRdWVyeTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbXFsID0gdGhpcy5yZWdpc3RyeS5nZXQobWVkaWFRdWVyeSk7XG4gICAgcmV0dXJuIChcbiAgICAgIG1xbD8ubWF0Y2hlcyA/PyB0aGlzLnJlZ2lzdGVyUXVlcnkobWVkaWFRdWVyeSkuc29tZSgobSkgPT4gbS5tYXRjaGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZXJuYWwgb2JzZXJ2ZXJzIGNhbiB3YXRjaCBmb3IgYWxsIChvciBhIHNwZWNpZmljKSBtcWwgY2hhbmdlcy5cbiAgICpcbiAgICogSWYgYSBtZWRpYVF1ZXJ5IGlzIG5vdCBzcGVjaWZpZWQsIHRoZW4gQUxMIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnMgd2lsbFxuICAgKiBiZSBhbm5vdW5jZWQuXG4gICAqL1xuICBvYnNlcnZlKCk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2U+O1xuICBvYnNlcnZlKG1lZGlhUXVlcmllczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPjtcbiAgb2JzZXJ2ZShcbiAgICBtZWRpYVF1ZXJpZXM6IHN0cmluZ1tdLFxuICAgIGZpbHRlck90aGVyczogYm9vbGVhblxuICApOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPjtcblxuICAvKipcbiAgICogRXh0ZXJuYWwgb2JzZXJ2ZXJzIGNhbiB3YXRjaCBmb3IgYWxsIChvciBhIHNwZWNpZmljKSBtcWwgY2hhbmdlcy5cbiAgICogVHlwaWNhbGx5IHVzZWQgYnkgdGhlIE1lZGlhUXVlcnlBZGFwdG9yOyBvcHRpb25hbGx5IGF2YWlsYWJsZSB0byBjb21wb25lbnRzXG4gICAqIHdobyB3aXNoIHRvIHVzZSB0aGUgTWVkaWFNb25pdG9yIGFzIG1lZGlhTW9uaXRvciQgb2JzZXJ2YWJsZSBzZXJ2aWNlLlxuICAgKlxuICAgKiBVc2UgZGVmZXJyZWQgcmVnaXN0cmF0aW9uIHByb2Nlc3MgdG8gcmVnaXN0ZXIgYnJlYWtwb2ludHMgb25seSBvbiBzdWJzY3JpcHRpb25cbiAgICogVGhpcyBsb2dpYyBhbHNvIGVuZm9yY2VzIGxvZ2ljIHRvIHJlZ2lzdGVyIGFsbCBtZWRpYVF1ZXJpZXMgQkVGT1JFIG5vdGlmeVxuICAgKiBzdWJzY3JpYmVycyBvZiBub3RpZmljYXRpb25zLlxuICAgKi9cbiAgb2JzZXJ2ZShtcUxpc3Q/OiBzdHJpbmdbXSwgZmlsdGVyT3RoZXJzID0gZmFsc2UpOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPiB7XG4gICAgaWYgKG1xTGlzdCAmJiBtcUxpc3QubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtYXRjaE1lZGlhJDogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT4gPSB0aGlzLl9vYnNlcnZhYmxlJC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+XG4gICAgICAgICAgIWZpbHRlck90aGVycyA/IHRydWUgOiBtcUxpc3QuaW5kZXhPZihjaGFuZ2UubWVkaWFRdWVyeSkgPiAtMVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgcmVnaXN0cmF0aW9uJDogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT4gPSBuZXcgT2JzZXJ2YWJsZShcbiAgICAgICAgKG9ic2VydmVyOiBPYnNlcnZlcjxNZWRpYUNoYW5nZT4pID0+IHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgIGNvbnN0IG1hdGNoZXM6IEFycmF5PE1lZGlhQ2hhbmdlPiA9IHRoaXMucmVnaXN0ZXJRdWVyeShtcUxpc3QpO1xuICAgICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdENoYW5nZSA9IG1hdGNoZXMucG9wKCkhO1xuICAgICAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKChlOiBNZWRpYUNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5uZXh0KGxhc3RDaGFuZ2UpOyAvLyBsYXN0IG1hdGNoIGlzIGNhY2hlZFxuICAgICAgICAgIH1cbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmV0dXJuIG1lcmdlKHJlZ2lzdHJhdGlvbiQsIG1hdGNoTWVkaWEkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fb2JzZXJ2YWJsZSQ7XG4gIH1cblxuICAvKipcbiAgICogQmFzZWQgb24gdGhlIEJyZWFrUG9pbnRSZWdpc3RyeSBwcm92aWRlciwgcmVnaXN0ZXIgaW50ZXJuYWwgbGlzdGVuZXJzIGZvciBlYWNoIHVuaXF1ZVxuICAgKiBtZWRpYVF1ZXJ5LiBFYWNoIGxpc3RlbmVyIGVtaXRzIHNwZWNpZmljIE1lZGlhQ2hhbmdlIGRhdGEgdG8gb2JzZXJ2ZXJzXG4gICAqL1xuICByZWdpc3RlclF1ZXJ5KG1lZGlhUXVlcnk6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgbGlzdCA9IEFycmF5LmlzQXJyYXkobWVkaWFRdWVyeSkgPyBtZWRpYVF1ZXJ5IDogW21lZGlhUXVlcnldO1xuICAgIGNvbnN0IG1hdGNoZXM6IE1lZGlhQ2hhbmdlW10gPSBbXTtcblxuICAgIGJ1aWxkUXVlcnlDc3MobGlzdCwgdGhpcy5fZG9jdW1lbnQpO1xuXG4gICAgbGlzdC5mb3JFYWNoKChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBvbk1RTEV2ZW50ID0gKGU6IE1lZGlhUXVlcnlMaXN0RXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT5cbiAgICAgICAgICB0aGlzLnNvdXJjZS5uZXh0KG5ldyBNZWRpYUNoYW5nZShlLm1hdGNoZXMsIHF1ZXJ5KSlcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBtcWwgPSB0aGlzLnJlZ2lzdHJ5LmdldChxdWVyeSk7XG4gICAgICBpZiAoIW1xbCkge1xuICAgICAgICBtcWwgPSB0aGlzLmJ1aWxkTVFMKHF1ZXJ5KTtcbiAgICAgICAgbXFsLmFkZExpc3RlbmVyKG9uTVFMRXZlbnQpO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmVMaXN0ZW5lckZucy5wdXNoKCgpID0+XG4gICAgICAgICAgbXFsIS5yZW1vdmVMaXN0ZW5lcihvbk1RTEV2ZW50KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNldChxdWVyeSwgbXFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1xbC5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChuZXcgTWVkaWFDaGFuZ2UodHJ1ZSwgcXVlcnkpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgbGV0IGZuO1xuICAgIHdoaWxlICgoZm4gPSB0aGlzLnBlbmRpbmdSZW1vdmVMaXN0ZW5lckZucy5wb3AoKSkpIHtcbiAgICAgIGZuKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgd2luZG93Lm1hdGNoTWVkaWEoKSB0byBidWlsZCBhIE1lZGlhUXVlcnlMaXN0OyB3aGljaFxuICAgKiBzdXBwb3J0cyAwLi5uIGxpc3RlbmVycyBmb3IgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb25cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZE1RTChxdWVyeTogc3RyaW5nKTogTWVkaWFRdWVyeUxpc3Qge1xuICAgIHJldHVybiBjb25zdHJ1Y3RNcWwocXVlcnksIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb2JzZXJ2YWJsZSQgPSB0aGlzLnNvdXJjZS5hc09ic2VydmFibGUoKTtcbn1cblxuLyoqXG4gKiBQcml2YXRlIGdsb2JhbCByZWdpc3RyeSBmb3IgYWxsIGR5bmFtaWNhbGx5LWNyZWF0ZWQsIGluamVjdGVkIHN0eWxlIHRhZ3NcbiAqIEBzZWUgcHJlcGFyZShxdWVyeSlcbiAqL1xuY29uc3QgQUxMX1NUWUxFUzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4vKipcbiAqIEZvciBXZWJraXQgZW5naW5lcyB0aGF0IG9ubHkgdHJpZ2dlciB0aGUgTWVkaWFRdWVyeUxpc3QgTGlzdGVuZXJcbiAqIHdoZW4gdGhlcmUgaXMgYXQgbGVhc3Qgb25lIENTUyBzZWxlY3RvciBmb3IgdGhlIHJlc3BlY3RpdmUgbWVkaWEgcXVlcnkuXG4gKlxuICogQHBhcmFtIG1lZGlhUXVlcmllc1xuICogQHBhcmFtIF9kb2N1bWVudFxuICovXG5mdW5jdGlvbiBidWlsZFF1ZXJ5Q3NzKG1lZGlhUXVlcmllczogc3RyaW5nW10sIF9kb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgY29uc3QgbGlzdCA9IG1lZGlhUXVlcmllcy5maWx0ZXIoKGl0KSA9PiAhQUxMX1NUWUxFU1tpdF0pO1xuICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcXVlcnkgPSBsaXN0LmpvaW4oJywgJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IF9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBzdHlsZUVsLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgaWYgKCEoc3R5bGVFbCBhcyBhbnkpLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgY29uc3QgY3NzVGV4dCA9IGBcbi8qXG4gIEBuZ2JyYWNrZXRzL25neC1sYXlvdXQgLSB3b3JrYXJvdW5kIGZvciBwb3NzaWJsZSBicm93c2VyIHF1aXJrIHdpdGggbWVkaWFRdWVyeSBsaXN0ZW5lcnNcbiAgc2VlIGh0dHA6Ly9iaXQubHkvMnNkNEhNUFxuKi9cbkBtZWRpYSAke3F1ZXJ5fSB7LmZ4LXF1ZXJ5LXRlc3R7IH19XG5gO1xuICAgICAgICBzdHlsZUVsLmFwcGVuZENoaWxkKF9kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgICB9XG5cbiAgICAgIF9kb2N1bWVudC5oZWFkIS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcblxuICAgICAgLy8gU3RvcmUgaW4gcHJpdmF0ZSBnbG9iYWwgcmVnaXN0cnlcbiAgICAgIGxpc3QuZm9yRWFjaCgobXEpID0+IChBTExfU1RZTEVTW21xXSA9IHN0eWxlRWwpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZE1vY2tNcWwocXVlcnk6IHN0cmluZykge1xuICBjb25zdCBldDogYW55ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gIGV0Lm1hdGNoZXMgPSBxdWVyeSA9PT0gJ2FsbCcgfHwgcXVlcnkgPT09ICcnO1xuICBldC5tZWRpYSA9IHF1ZXJ5O1xuICBldC5hZGRMaXN0ZW5lciA9ICgpID0+IHt9O1xuICBldC5yZW1vdmVMaXN0ZW5lciA9ICgpID0+IHt9O1xuICBldC5hZGRFdmVudExpc3RlbmVyID0gKCkgPT4ge307XG4gIGV0LmRpc3BhdGNoRXZlbnQgPSAoKSA9PiBmYWxzZTtcbiAgZXQub25jaGFuZ2UgPSBudWxsO1xuXG4gIHJldHVybiBldCBhcyBNZWRpYVF1ZXJ5TGlzdDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0TXFsKHF1ZXJ5OiBzdHJpbmcsIGlzQnJvd3NlcjogYm9vbGVhbik6IE1lZGlhUXVlcnlMaXN0IHtcbiAgY29uc3QgY2FuTGlzdGVuID1cbiAgICBpc0Jyb3dzZXIgJiYgISEoPFdpbmRvdz53aW5kb3cpLm1hdGNoTWVkaWEoJ2FsbCcpLmFkZExpc3RlbmVyO1xuXG4gIHJldHVybiBjYW5MaXN0ZW4gPyAoPFdpbmRvdz53aW5kb3cpLm1hdGNoTWVkaWEocXVlcnkpIDogYnVpbGRNb2NrTXFsKHF1ZXJ5KTtcbn1cbiJdfQ==