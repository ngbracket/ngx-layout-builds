/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as i0 from '@angular/core';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediaChange } from '../media-change';
/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
class MatchMedia {
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
    return (
      mql?.matches ?? this.registerQuery(mediaQuery).some((m) => m.matches)
    );
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
      const matchMedia$ = this._observable$.pipe(
        filter((change) =>
          !filterOthers ? true : mqList.indexOf(change.mediaQuery) > -1
        )
      );
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
        this._zone.run(() =>
          this.source.next(new MediaChange(e.matches, query))
        );
      };
      let mql = this.registry.get(query);
      if (!mql) {
        mql = this.buildMQL(query);
        mql.addListener(onMQLEvent);
        this.pendingRemoveListenerFns.push(() =>
          mql.removeListener(onMQLEvent)
        );
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
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '16.0.0-6ca1503',
      ngImport: i0,
      type: MatchMedia,
      deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }],
      target: i0.ɵɵFactoryTarget.Injectable,
    });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '16.0.0-6ca1503',
      ngImport: i0,
      type: MatchMedia,
      providedIn: 'root',
    });
  }
}
export { MatchMedia };
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.0.0-6ca1503',
  ngImport: i0,
  type: MatchMedia,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i0.NgZone },
      {
        type: Object,
        decorators: [
          {
            type: Inject,
            args: [PLATFORM_ID],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [DOCUMENT],
          },
        ],
      },
    ];
  },
});
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
  @ngbracket/ngx-layout - workaround for possible browser quirk with mediaQuery listeners
  see http://bit.ly/2sd4HMP
*/
@media ${query} {.fx-query-test{ }}
`;
        styleEl.appendChild(_document.createTextNode(cssText));
      }
      _document.head.appendChild(styleEl);
      // Store in private global registry
      list.forEach((mq) => (ALL_STYLES[mq] = styleEl));
    } catch (e) {
      console.error(e);
    }
  }
}
function buildMockMql(query) {
  const et = new EventTarget();
  et.matches = query === 'all' || query === '';
  et.media = query;
  et.addListener = () => {};
  et.removeListener = () => {};
  et.addEventListener = () => {};
  et.dispatchEvent = () => false;
  et.onchange = null;
  return et;
}
function constructMql(query, isBrowser) {
  const canListen = isBrowser && !!window.matchMedia('all').addListener;
  return canListen ? window.matchMedia(query) : buildMockMql(query);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWF0Y2gtbWVkaWEvbWF0Y2gtbWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUdWLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFOUM7Ozs7OztHQU1HO0FBQ0gsTUFDYSxVQUFVO0lBTXJCLFlBQ1ksS0FBYSxFQUNRLFdBQW1CLEVBQ3RCLFNBQWM7UUFGaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNRLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFSNUMsb0ZBQW9GO1FBQzNFLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBYyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFFLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUM1Qiw2QkFBd0IsR0FBc0IsRUFBRSxDQUFDO1FBa0l4RCxpQkFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUE1SGpELENBQUM7SUFFSjs7T0FFRztJQUNILElBQUksV0FBVztRQUNiLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdB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R0FBRyxLQUFLLENBQUM7SUFDakIsRUFBRSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLGNBQWMsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDN0IsRUFBRSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUMvQixFQUFFLENBQUMsYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUMvQixFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUVuQixPQUFPLEVBQW9CLENBQUM7QUFDOUIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEtBQWEsRUFBRSxTQUFrQjtJQUNyRCxNQUFNLFNBQVMsR0FDYixTQUFTLElBQUksQ0FBQyxDQUFVLE1BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBRWhFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBVSxNQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgbWVyZ2UsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1lZGlhQ2hhbmdlIH0gZnJvbSAnLi4vbWVkaWEtY2hhbmdlJztcblxuLyoqXG4gKiBNZWRpYU1vbml0b3IgY29uZmlndXJlcyBsaXN0ZW5lcnMgdG8gbWVkaWFRdWVyeSBjaGFuZ2VzIGFuZCBwdWJsaXNoZXMgYW4gT2JzZXJ2YWJsZSBmYWNhZGUgdG9cbiAqIGNvbnZlcnQgbWVkaWFRdWVyeSBjaGFuZ2UgY2FsbGJhY2tzIHRvIHN1YnNjcmliZXIgbm90aWZpY2F0aW9ucy4gVGhlc2Ugbm90aWZpY2F0aW9ucyB3aWxsIGJlXG4gKiBwZXJmb3JtZWQgd2l0aGluIHRoZSBuZyBab25lIHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbnMgYW5kIGNvbXBvbmVudCB1cGRhdGVzLlxuICpcbiAqIE5PVEU6IGJvdGggbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyBhbmQgZGUtYWN0aXZhdGlvbnMgYXJlIGFubm91bmNlZCBpbiBub3RpZmljYXRpb25zXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTWF0Y2hNZWRpYSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBJbml0aWFsaXplIHNvdXJjZSB3aXRoICdhbGwnIHNvIGFsbCBub24tcmVzcG9uc2l2ZSBBUElzIHRyaWdnZXIgc3R5bGUgdXBkYXRlcyAqL1xuICByZWFkb25seSBzb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhQ2hhbmdlPihuZXcgTWVkaWFDaGFuZ2UodHJ1ZSkpO1xuICByZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNZWRpYVF1ZXJ5TGlzdD4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nUmVtb3ZlTGlzdGVuZXJGbnM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIF9wbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIF9kb2N1bWVudDogYW55XG4gICkge31cblxuICAvKipcbiAgICogUHVibGlzaCBsaXN0IG9mIGFsbCBjdXJyZW50IGFjdGl2YXRpb25zXG4gICAqL1xuICBnZXQgYWN0aXZhdGlvbnMoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG4gICAgdGhpcy5yZWdpc3RyeS5mb3JFYWNoKChtcWw6IE1lZGlhUXVlcnlMaXN0LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKG1xbC5tYXRjaGVzKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciB0aGUgc3BlY2lmaWVkIG1lZGlhUXVlcnk/XG4gICAqL1xuICBpc0FjdGl2ZShtZWRpYVF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBtcWwgPSB0aGlzLnJlZ2lzdHJ5LmdldChtZWRpYVF1ZXJ5KTtcbiAgICByZXR1cm4gKFxuICAgICAgbXFsPy5tYXRjaGVzID8/IHRoaXMucmVnaXN0ZXJRdWVyeShtZWRpYVF1ZXJ5KS5zb21lKChtKSA9PiBtLm1hdGNoZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlcm5hbCBvYnNlcnZlcnMgY2FuIHdhdGNoIGZvciBhbGwgKG9yIGEgc3BlY2lmaWMpIG1xbCBjaGFuZ2VzLlxuICAgKlxuICAgKiBJZiBhIG1lZGlhUXVlcnkgaXMgbm90IHNwZWNpZmllZCwgdGhlbiBBTEwgbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyB3aWxsXG4gICAqIGJlIGFubm91bmNlZC5cbiAgICovXG4gIG9ic2VydmUoKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT47XG4gIG9ic2VydmUobWVkaWFRdWVyaWVzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2U+O1xuICBvYnNlcnZlKFxuICAgIG1lZGlhUXVlcmllczogc3RyaW5nW10sXG4gICAgZmlsdGVyT3RoZXJzOiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2U+O1xuXG4gIC8qKlxuICAgKiBFeHRlcm5hbCBvYnNlcnZlcnMgY2FuIHdhdGNoIGZvciBhbGwgKG9yIGEgc3BlY2lmaWMpIG1xbCBjaGFuZ2VzLlxuICAgKiBUeXBpY2FsbHkgdXNlZCBieSB0aGUgTWVkaWFRdWVyeUFkYXB0b3I7IG9wdGlvbmFsbHkgYXZhaWxhYmxlIHRvIGNvbXBvbmVudHNcbiAgICogd2hvIHdpc2ggdG8gdXNlIHRoZSBNZWRpYU1vbml0b3IgYXMgbWVkaWFNb25pdG9yJCBvYnNlcnZhYmxlIHNlcnZpY2UuXG4gICAqXG4gICAqIFVzZSBkZWZlcnJlZCByZWdpc3RyYXRpb24gcHJvY2VzcyB0byByZWdpc3RlciBicmVha3BvaW50cyBvbmx5IG9uIHN1YnNjcmlwdGlvblxuICAgKiBUaGlzIGxvZ2ljIGFsc28gZW5mb3JjZXMgbG9naWMgdG8gcmVnaXN0ZXIgYWxsIG1lZGlhUXVlcmllcyBCRUZPUkUgbm90aWZ5XG4gICAqIHN1YnNjcmliZXJzIG9mIG5vdGlmaWNhdGlvbnMuXG4gICAqL1xuICBvYnNlcnZlKG1xTGlzdD86IHN0cmluZ1tdLCBmaWx0ZXJPdGhlcnMgPSBmYWxzZSk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2U+IHtcbiAgICBpZiAobXFMaXN0ICYmIG1xTGlzdC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1hdGNoTWVkaWEkOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPiA9IHRoaXMuX29ic2VydmFibGUkLnBpcGUoXG4gICAgICAgIGZpbHRlcigoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT5cbiAgICAgICAgICAhZmlsdGVyT3RoZXJzID8gdHJ1ZSA6IG1xTGlzdC5pbmRleE9mKGNoYW5nZS5tZWRpYVF1ZXJ5KSA+IC0xXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCByZWdpc3RyYXRpb24kOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPiA9IG5ldyBPYnNlcnZhYmxlKFxuICAgICAgICAob2JzZXJ2ZXI6IE9ic2VydmVyPE1lZGlhQ2hhbmdlPikgPT4ge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgY29uc3QgbWF0Y2hlczogQXJyYXk8TWVkaWFDaGFuZ2U+ID0gdGhpcy5yZWdpc3RlclF1ZXJ5KG1xTGlzdCk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hhbmdlID0gbWF0Y2hlcy5wb3AoKSE7XG4gICAgICAgICAgICBtYXRjaGVzLmZvckVhY2goKGU6IE1lZGlhQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlLm5leHQobGFzdENoYW5nZSk7IC8vIGxhc3QgbWF0Y2ggaXMgY2FjaGVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gbWVyZ2UocmVnaXN0cmF0aW9uJCwgbWF0Y2hNZWRpYSQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9vYnNlcnZhYmxlJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNlZCBvbiB0aGUgQnJlYWtQb2ludFJlZ2lzdHJ5IHByb3ZpZGVyLCByZWdpc3RlciBpbnRlcm5hbCBsaXN0ZW5lcnMgZm9yIGVhY2ggdW5pcXVlXG4gICAqIG1lZGlhUXVlcnkuIEVhY2ggbGlzdGVuZXIgZW1pdHMgc3BlY2lmaWMgTWVkaWFDaGFuZ2UgZGF0YSB0byBvYnNlcnZlcnNcbiAgICovXG4gIHJlZ2lzdGVyUXVlcnkobWVkaWFRdWVyeTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICBjb25zdCBsaXN0ID0gQXJyYXkuaXNBcnJheShtZWRpYVF1ZXJ5KSA/IG1lZGlhUXVlcnkgOiBbbWVkaWFRdWVyeV07XG4gICAgY29uc3QgbWF0Y2hlczogTWVkaWFDaGFuZ2VbXSA9IFtdO1xuXG4gICAgYnVpbGRRdWVyeUNzcyhsaXN0LCB0aGlzLl9kb2N1bWVudCk7XG5cbiAgICBsaXN0LmZvckVhY2goKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IG9uTVFMRXZlbnQgPSAoZTogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PlxuICAgICAgICAgIHRoaXMuc291cmNlLm5leHQobmV3IE1lZGlhQ2hhbmdlKGUubWF0Y2hlcywgcXVlcnkpKVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgbGV0IG1xbCA9IHRoaXMucmVnaXN0cnkuZ2V0KHF1ZXJ5KTtcbiAgICAgIGlmICghbXFsKSB7XG4gICAgICAgIG1xbCA9IHRoaXMuYnVpbGRNUUwocXVlcnkpO1xuICAgICAgICBtcWwuYWRkTGlzdGVuZXIob25NUUxFdmVudCk7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlbW92ZUxpc3RlbmVyRm5zLnB1c2goKCkgPT5cbiAgICAgICAgICBtcWwhLnJlbW92ZUxpc3RlbmVyKG9uTVFMRXZlbnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVnaXN0cnkuc2V0KHF1ZXJ5LCBtcWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAobXFsLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG5ldyBNZWRpYUNoYW5nZSh0cnVlLCBxdWVyeSkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBsZXQgZm47XG4gICAgd2hpbGUgKChmbiA9IHRoaXMucGVuZGluZ1JlbW92ZUxpc3RlbmVyRm5zLnBvcCgpKSkge1xuICAgICAgZm4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCB3aW5kb3cubWF0Y2hNZWRpYSgpIHRvIGJ1aWxkIGEgTWVkaWFRdWVyeUxpc3Q7IHdoaWNoXG4gICAqIHN1cHBvcnRzIDAuLm4gbGlzdGVuZXJzIGZvciBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkTVFMKHF1ZXJ5OiBzdHJpbmcpOiBNZWRpYVF1ZXJ5TGlzdCB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdE1xbChxdWVyeSwgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vYnNlcnZhYmxlJCA9IHRoaXMuc291cmNlLmFzT2JzZXJ2YWJsZSgpO1xufVxuXG4vKipcbiAqIFByaXZhdGUgZ2xvYmFsIHJlZ2lzdHJ5IGZvciBhbGwgZHluYW1pY2FsbHktY3JlYXRlZCwgaW5qZWN0ZWQgc3R5bGUgdGFnc1xuICogQHNlZSBwcmVwYXJlKHF1ZXJ5KVxuICovXG5jb25zdCBBTExfU1RZTEVTOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbi8qKlxuICogRm9yIFdlYmtpdCBlbmdpbmVzIHRoYXQgb25seSB0cmlnZ2VyIHRoZSBNZWRpYVF1ZXJ5TGlzdCBMaXN0ZW5lclxuICogd2hlbiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcmVzcGVjdGl2ZSBtZWRpYSBxdWVyeS5cbiAqXG4gKiBAcGFyYW0gbWVkaWFRdWVyaWVzXG4gKiBAcGFyYW0gX2RvY3VtZW50XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkUXVlcnlDc3MobWVkaWFRdWVyaWVzOiBzdHJpbmdbXSwgX2RvY3VtZW50OiBEb2N1bWVudCkge1xuICBjb25zdCBsaXN0ID0gbWVkaWFRdWVyaWVzLmZpbHRlcigoaXQpID0+ICFBTExfU1RZTEVTW2l0XSk7XG4gIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBxdWVyeSA9IGxpc3Quam9pbignLCAnKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICBpZiAoIShzdHlsZUVsIGFzIGFueSkuc3R5bGVTaGVldCkge1xuICAgICAgICBjb25zdCBjc3NUZXh0ID0gYFxuLypcbiAgQG5nYnJhY2tldC9uZ3gtbGF5b3V0IC0gd29ya2Fyb3VuZCBmb3IgcG9zc2libGUgYnJvd3NlciBxdWlyayB3aXRoIG1lZGlhUXVlcnkgbGlzdGVuZXJzXG4gIHNlZSBodHRwOi8vYml0Lmx5LzJzZDRITVBcbiovXG5AbWVkaWEgJHtxdWVyeX0gey5meC1xdWVyeS10ZXN0eyB9fVxuYDtcbiAgICAgICAgc3R5bGVFbC5hcHBlbmRDaGlsZChfZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzVGV4dCkpO1xuICAgICAgfVxuXG4gICAgICBfZG9jdW1lbnQuaGVhZCEuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG5cbiAgICAgIC8vIFN0b3JlIGluIHByaXZhdGUgZ2xvYmFsIHJlZ2lzdHJ5XG4gICAgICBsaXN0LmZvckVhY2goKG1xKSA9PiAoQUxMX1NUWUxFU1ttcV0gPSBzdHlsZUVsKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRNb2NrTXFsKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgY29uc3QgZXQ6IGFueSA9IG5ldyBFdmVudFRhcmdldCgpO1xuICBldC5tYXRjaGVzID0gcXVlcnkgPT09ICdhbGwnIHx8IHF1ZXJ5ID09PSAnJztcbiAgZXQubWVkaWEgPSBxdWVyeTtcbiAgZXQuYWRkTGlzdGVuZXIgPSAoKSA9PiB7fTtcbiAgZXQucmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiB7fTtcbiAgZXQuYWRkRXZlbnRMaXN0ZW5lciA9ICgpID0+IHt9O1xuICBldC5kaXNwYXRjaEV2ZW50ID0gKCkgPT4gZmFsc2U7XG4gIGV0Lm9uY2hhbmdlID0gbnVsbDtcblxuICByZXR1cm4gZXQgYXMgTWVkaWFRdWVyeUxpc3Q7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdE1xbChxdWVyeTogc3RyaW5nLCBpc0Jyb3dzZXI6IGJvb2xlYW4pOiBNZWRpYVF1ZXJ5TGlzdCB7XG4gIGNvbnN0IGNhbkxpc3RlbiA9XG4gICAgaXNCcm93c2VyICYmICEhKDxXaW5kb3c+d2luZG93KS5tYXRjaE1lZGlhKCdhbGwnKS5hZGRMaXN0ZW5lcjtcblxuICByZXR1cm4gY2FuTGlzdGVuID8gKDxXaW5kb3c+d2luZG93KS5tYXRjaE1lZGlhKHF1ZXJ5KSA6IGJ1aWxkTW9ja01xbChxdWVyeSk7XG59XG4iXX0=
