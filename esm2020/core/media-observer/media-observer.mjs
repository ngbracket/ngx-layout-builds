/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { asapScheduler, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, } from 'rxjs/operators';
import { mergeAlias } from '../add-alias';
import { MediaChange } from '../media-change';
import { coerceArray } from '../utils/array';
import { sortDescendingPriority } from '../utils/sort';
import * as i0 from "@angular/core";
import * as i1 from "../breakpoints/break-point-registry";
import * as i2 from "../match-media/match-media";
import * as i3 from "../media-marshaller/print-hook";
/**
 * MediaObserver enables applications to listen for 1..n mediaQuery activations and to determine
 * if a mediaQuery is currently activated.
 *
 * Since a breakpoint change will first deactivate 1...n mediaQueries and then possibly activate
 * 1..n mediaQueries, the MediaObserver will debounce notifications and report ALL *activations*
 * in 1 event notification. The reported activations will be sorted in descending priority order.
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw MediaChange
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * Note: Developers should note that only mediaChange activations (not de-activations)
 *       are announced by the MediaObserver.
 *
 *  @usage
 *
 *  // RxJS
 *  import { filter } from 'rxjs/operators';
 *  import { MediaObserver } from '@ngbrackets/ngx-layout';
 *
 *  @Component({ ... })
 *  export class AppComponent {
 *    status: string = '';
 *
 *    constructor(mediaObserver: MediaObserver) {
 *      const media$ = mediaObserver.asObservable().pipe(
 *        filter((changes: MediaChange[]) => true)   // silly noop filter
 *      );
 *
 *      media$.subscribe((changes: MediaChange[]) => {
 *        let status = '';
 *        changes.forEach( change => {
 *          status += `'${change.mqAlias}' = (${change.mediaQuery}) <br/>` ;
 *        });
 *        this.status = status;
 *     });
 *
 *    }
 *  }
 */
export class MediaObserver {
    constructor(breakpoints, matchMedia, hook) {
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.hook = hook;
        /** Filter MediaChange notifications for overlapping breakpoints */
        this.filterOverlaps = false;
        this.destroyed$ = new Subject();
        this._media$ = this.watchActivations();
    }
    /**
     * Completes the active subject, signalling to all complete for all
     * MediaObserver subscribers
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    // ************************************************
    // Public Methods
    // ************************************************
    /**
     * Observe changes to current activation 'list'
     */
    asObservable() {
        return this._media$;
    }
    /**
     * Allow programmatic query to determine if one or more media query/alias match
     * the current viewport size.
     * @param value One or more media queries (or aliases) to check.
     * @returns Whether any of the media queries match.
     */
    isActive(value) {
        const aliases = splitQueries(coerceArray(value));
        return aliases.some((alias) => {
            const query = toMediaQuery(alias, this.breakpoints);
            return query !== null && this.matchMedia.isActive(query);
        });
    }
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Register all the mediaQueries registered in the BreakPointRegistry
     * This is needed so subscribers can be auto-notified of all standard, registered
     * mediaQuery activations
     */
    watchActivations() {
        const queries = this.breakpoints.items.map((bp) => bp.mediaQuery);
        return this.buildObservable(queries);
    }
    /**
     * Only pass/announce activations (not de-activations)
     *
     * Since multiple-mediaQueries can be activation in a cycle,
     * gather all current activations into a single list of changes to observers
     *
     * Inject associated (if any) alias information into the MediaChange event
     * - Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
     * - Exclude print activations that do not have an associated mediaQuery
     *
     * NOTE: the raw MediaChange events [from MatchMedia] do not
     *       contain important alias information; as such this info
     *       must be injected into the MediaChange
     */
    buildObservable(mqList) {
        const hasChanges = (changes) => {
            const isValidQuery = (change) => change.mediaQuery.length > 0;
            return changes.filter(isValidQuery).length > 0;
        };
        const excludeOverlaps = (changes) => {
            return !this.filterOverlaps
                ? changes
                : changes.filter((change) => {
                    const bp = this.breakpoints.findByQuery(change.mediaQuery);
                    return bp?.overlapping ?? true;
                });
        };
        const ignoreDuplicates = (previous, current) => {
            if (previous.length !== current.length) {
                return false;
            }
            const previousMqs = previous.map((mc) => mc.mediaQuery);
            const currentMqs = new Set(current.map((mc) => mc.mediaQuery));
            const difference = new Set(previousMqs.filter((mq) => !currentMqs.has(mq)));
            return difference.size === 0;
        };
        /**
         */
        return this.matchMedia.observe(this.hook.withPrintQuery(mqList)).pipe(filter((change) => change.matches), debounceTime(0, asapScheduler), switchMap((_) => of(this.findAllActivations())), map(excludeOverlaps), filter(hasChanges), distinctUntilChanged(ignoreDuplicates), takeUntil(this.destroyed$));
    }
    /**
     * Find all current activations and prepare single list of activations
     * sorted by descending priority.
     */
    findAllActivations() {
        const mergeMQAlias = (change) => {
            const bp = this.breakpoints.findByQuery(change.mediaQuery);
            return mergeAlias(change, bp);
        };
        const replaceWithPrintAlias = (change) => this.hook.isPrintEvent(change) ? this.hook.updateEvent(change) : change;
        return this.matchMedia.activations
            .map((query) => new MediaChange(true, query))
            .map(replaceWithPrintAlias)
            .map(mergeMQAlias)
            .sort(sortDescendingPriority);
    }
}
MediaObserver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaObserver, deps: [{ token: i1.BreakPointRegistry }, { token: i2.MatchMedia }, { token: i3.PrintHook }], target: i0.ɵɵFactoryTarget.Injectable });
MediaObserver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaObserver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaObserver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BreakPointRegistry }, { type: i2.MatchMedia }, { type: i3.PrintHook }]; } });
/**
 * Find associated breakpoint (if any)
 */
function toMediaQuery(query, locator) {
    const bp = locator.findByAlias(query) ?? locator.findByQuery(query);
    return bp?.mediaQuery ?? null;
}
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries
        .flatMap((query) => query.split(','))
        .map((query) => query.trim());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWVkaWEtb2JzZXJ2ZXIvbWVkaWEtb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU0xQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUl4QixZQUNZLFdBQStCLEVBQy9CLFVBQXNCLEVBQ3RCLElBQWU7UUFGZixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFXO1FBTjNCLG1FQUFtRTtRQUNuRSxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQTBJTixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQW5JaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztP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S0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDNUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQzFCLEdBQUcsQ0FBQyxZQUFZLENBQUM7YUFDakIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDbEMsQ0FBQzs7MEdBeklVLGFBQWE7OEdBQWIsYUFBYSxjQURBLE1BQU07MkZBQ25CLGFBQWE7a0JBRHpCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQWdKbEM7O0dBRUc7QUFDSCxTQUFTLFlBQVksQ0FDbkIsS0FBYSxFQUNiLE9BQTJCO0lBRTNCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRSxPQUFPLEVBQUUsRUFBRSxVQUFVLElBQUksSUFBSSxDQUFDO0FBQ2hDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLFlBQVksQ0FBQyxPQUFpQjtJQUNyQyxPQUFPLE9BQU87U0FDWCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlVW50aWwsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWVyZ2VBbGlhcyB9IGZyb20gJy4uL2FkZC1hbGlhcyc7XG5pbXBvcnQge1xuICBCcmVha1BvaW50UmVnaXN0cnksXG4gIE9wdGlvbmFsQnJlYWtQb2ludCxcbn0gZnJvbSAnLi4vYnJlYWtwb2ludHMvYnJlYWstcG9pbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWF0Y2hNZWRpYSB9IGZyb20gJy4uL21hdGNoLW1lZGlhL21hdGNoLW1lZGlhJztcbmltcG9ydCB7IE1lZGlhQ2hhbmdlIH0gZnJvbSAnLi4vbWVkaWEtY2hhbmdlJztcbmltcG9ydCB7IFByaW50SG9vayB9IGZyb20gJy4uL21lZGlhLW1hcnNoYWxsZXIvcHJpbnQtaG9vayc7XG5cbmltcG9ydCB7IGNvZXJjZUFycmF5IH0gZnJvbSAnLi4vdXRpbHMvYXJyYXknO1xuaW1wb3J0IHsgc29ydERlc2NlbmRpbmdQcmlvcml0eSB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuXG4vKipcbiAqIE1lZGlhT2JzZXJ2ZXIgZW5hYmxlcyBhcHBsaWNhdGlvbnMgdG8gbGlzdGVuIGZvciAxLi5uIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnMgYW5kIHRvIGRldGVybWluZVxuICogaWYgYSBtZWRpYVF1ZXJ5IGlzIGN1cnJlbnRseSBhY3RpdmF0ZWQuXG4gKlxuICogU2luY2UgYSBicmVha3BvaW50IGNoYW5nZSB3aWxsIGZpcnN0IGRlYWN0aXZhdGUgMS4uLm4gbWVkaWFRdWVyaWVzIGFuZCB0aGVuIHBvc3NpYmx5IGFjdGl2YXRlXG4gKiAxLi5uIG1lZGlhUXVlcmllcywgdGhlIE1lZGlhT2JzZXJ2ZXIgd2lsbCBkZWJvdW5jZSBub3RpZmljYXRpb25zIGFuZCByZXBvcnQgQUxMICphY3RpdmF0aW9ucypcbiAqIGluIDEgZXZlbnQgbm90aWZpY2F0aW9uLiBUaGUgcmVwb3J0ZWQgYWN0aXZhdGlvbnMgd2lsbCBiZSBzb3J0ZWQgaW4gZGVzY2VuZGluZyBwcmlvcml0eSBvcmRlci5cbiAqXG4gKiBUaGlzIGNsYXNzIHVzZXMgdGhlIEJyZWFrUG9pbnQgUmVnaXN0cnkgdG8gaW5qZWN0IGFsaWFzIGluZm9ybWF0aW9uIGludG8gdGhlIHJhdyBNZWRpYUNoYW5nZVxuICogbm90aWZpY2F0aW9uLiBGb3IgY3VzdG9tIG1lZGlhUXVlcnkgbm90aWZpY2F0aW9ucywgYWxpYXMgaW5mb3JtYXRpb24gd2lsbCBub3QgYmUgaW5qZWN0ZWQgYW5kXG4gKiB0aG9zZSBmaWVsZHMgd2lsbCBiZSAnJy5cbiAqXG4gKiBOb3RlOiBEZXZlbG9wZXJzIHNob3VsZCBub3RlIHRoYXQgb25seSBtZWRpYUNoYW5nZSBhY3RpdmF0aW9ucyAobm90IGRlLWFjdGl2YXRpb25zKVxuICogICAgICAgYXJlIGFubm91bmNlZCBieSB0aGUgTWVkaWFPYnNlcnZlci5cbiAqXG4gKiAgQHVzYWdlXG4gKlxuICogIC8vIFJ4SlNcbiAqICBpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gKiAgaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0BuZ2JyYWNrZXRzL25neC1sYXlvdXQnO1xuICpcbiAqICBAQ29tcG9uZW50KHsgLi4uIH0pXG4gKiAgZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gKiAgICBzdGF0dXM6IHN0cmluZyA9ICcnO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIpIHtcbiAqICAgICAgY29uc3QgbWVkaWEkID0gbWVkaWFPYnNlcnZlci5hc09ic2VydmFibGUoKS5waXBlKFxuICogICAgICAgIGZpbHRlcigoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4gdHJ1ZSkgICAvLyBzaWxseSBub29wIGZpbHRlclxuICogICAgICApO1xuICpcbiAqICAgICAgbWVkaWEkLnN1YnNjcmliZSgoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICogICAgICAgIGxldCBzdGF0dXMgPSAnJztcbiAqICAgICAgICBjaGFuZ2VzLmZvckVhY2goIGNoYW5nZSA9PiB7XG4gKiAgICAgICAgICBzdGF0dXMgKz0gYCcke2NoYW5nZS5tcUFsaWFzfScgPSAoJHtjaGFuZ2UubWVkaWFRdWVyeX0pIDxici8+YCA7XG4gKiAgICAgICAgfSk7XG4gKiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gKiAgICAgfSk7XG4gKlxuICogICAgfVxuICogIH1cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBNZWRpYU9ic2VydmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIEZpbHRlciBNZWRpYUNoYW5nZSBub3RpZmljYXRpb25zIGZvciBvdmVybGFwcGluZyBicmVha3BvaW50cyAqL1xuICBmaWx0ZXJPdmVybGFwcyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBicmVha3BvaW50czogQnJlYWtQb2ludFJlZ2lzdHJ5LFxuICAgIHByb3RlY3RlZCBtYXRjaE1lZGlhOiBNYXRjaE1lZGlhLFxuICAgIHByb3RlY3RlZCBob29rOiBQcmludEhvb2tcbiAgKSB7XG4gICAgdGhpcy5fbWVkaWEkID0gdGhpcy53YXRjaEFjdGl2YXRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBhY3RpdmUgc3ViamVjdCwgc2lnbmFsbGluZyB0byBhbGwgY29tcGxldGUgZm9yIGFsbFxuICAgKiBNZWRpYU9ic2VydmVyIHN1YnNjcmliZXJzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFB1YmxpYyBNZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGNoYW5nZXMgdG8gY3VycmVudCBhY3RpdmF0aW9uICdsaXN0J1xuICAgKi9cbiAgYXNPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2VbXT4ge1xuICAgIHJldHVybiB0aGlzLl9tZWRpYSQ7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgcHJvZ3JhbW1hdGljIHF1ZXJ5IHRvIGRldGVybWluZSBpZiBvbmUgb3IgbW9yZSBtZWRpYSBxdWVyeS9hbGlhcyBtYXRjaFxuICAgKiB0aGUgY3VycmVudCB2aWV3cG9ydCBzaXplLlxuICAgKiBAcGFyYW0gdmFsdWUgT25lIG9yIG1vcmUgbWVkaWEgcXVlcmllcyAob3IgYWxpYXNlcykgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgYW55IG9mIHRoZSBtZWRpYSBxdWVyaWVzIG1hdGNoLlxuICAgKi9cbiAgaXNBY3RpdmUodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYWxpYXNlcyA9IHNwbGl0UXVlcmllcyhjb2VyY2VBcnJheSh2YWx1ZSkpO1xuICAgIHJldHVybiBhbGlhc2VzLnNvbWUoKGFsaWFzKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRvTWVkaWFRdWVyeShhbGlhcywgdGhpcy5icmVha3BvaW50cyk7XG4gICAgICByZXR1cm4gcXVlcnkgIT09IG51bGwgJiYgdGhpcy5tYXRjaE1lZGlhLmlzQWN0aXZlKHF1ZXJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBJbnRlcm5hbCBNZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgdGhlIG1lZGlhUXVlcmllcyByZWdpc3RlcmVkIGluIHRoZSBCcmVha1BvaW50UmVnaXN0cnlcbiAgICogVGhpcyBpcyBuZWVkZWQgc28gc3Vic2NyaWJlcnMgY2FuIGJlIGF1dG8tbm90aWZpZWQgb2YgYWxsIHN0YW5kYXJkLCByZWdpc3RlcmVkXG4gICAqIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBxdWVyaWVzID0gdGhpcy5icmVha3BvaW50cy5pdGVtcy5tYXAoKGJwKSA9PiBicC5tZWRpYVF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5idWlsZE9ic2VydmFibGUocXVlcmllcyk7XG4gIH1cblxuICAvKipcbiAgICogT25seSBwYXNzL2Fubm91bmNlIGFjdGl2YXRpb25zIChub3QgZGUtYWN0aXZhdGlvbnMpXG4gICAqXG4gICAqIFNpbmNlIG11bHRpcGxlLW1lZGlhUXVlcmllcyBjYW4gYmUgYWN0aXZhdGlvbiBpbiBhIGN5Y2xlLFxuICAgKiBnYXRoZXIgYWxsIGN1cnJlbnQgYWN0aXZhdGlvbnMgaW50byBhIHNpbmdsZSBsaXN0IG9mIGNoYW5nZXMgdG8gb2JzZXJ2ZXJzXG4gICAqXG4gICAqIEluamVjdCBhc3NvY2lhdGVkIChpZiBhbnkpIGFsaWFzIGluZm9ybWF0aW9uIGludG8gdGhlIE1lZGlhQ2hhbmdlIGV2ZW50XG4gICAqIC0gRXhjbHVkZSBtZWRpYVF1ZXJ5IGFjdGl2YXRpb25zIGZvciBvdmVybGFwcGluZyBtUXMuIExpc3QgYm91bmRlZCBtUSByYW5nZXMgb25seVxuICAgKiAtIEV4Y2x1ZGUgcHJpbnQgYWN0aXZhdGlvbnMgdGhhdCBkbyBub3QgaGF2ZSBhbiBhc3NvY2lhdGVkIG1lZGlhUXVlcnlcbiAgICpcbiAgICogTk9URTogdGhlIHJhdyBNZWRpYUNoYW5nZSBldmVudHMgW2Zyb20gTWF0Y2hNZWRpYV0gZG8gbm90XG4gICAqICAgICAgIGNvbnRhaW4gaW1wb3J0YW50IGFsaWFzIGluZm9ybWF0aW9uOyBhcyBzdWNoIHRoaXMgaW5mb1xuICAgKiAgICAgICBtdXN0IGJlIGluamVjdGVkIGludG8gdGhlIE1lZGlhQ2hhbmdlXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkT2JzZXJ2YWJsZShtcUxpc3Q6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZVtdPiB7XG4gICAgY29uc3QgaGFzQ2hhbmdlcyA9IChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiB7XG4gICAgICBjb25zdCBpc1ZhbGlkUXVlcnkgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT5cbiAgICAgICAgY2hhbmdlLm1lZGlhUXVlcnkubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiBjaGFuZ2VzLmZpbHRlcihpc1ZhbGlkUXVlcnkpLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICBjb25zdCBleGNsdWRlT3ZlcmxhcHMgPSAoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgcmV0dXJuICF0aGlzLmZpbHRlck92ZXJsYXBzXG4gICAgICAgID8gY2hhbmdlc1xuICAgICAgICA6IGNoYW5nZXMuZmlsdGVyKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJwID0gdGhpcy5icmVha3BvaW50cy5maW5kQnlRdWVyeShjaGFuZ2UubWVkaWFRdWVyeSk7XG4gICAgICAgICAgICByZXR1cm4gYnA/Lm92ZXJsYXBwaW5nID8/IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBpZ25vcmVEdXBsaWNhdGVzID0gKFxuICAgICAgcHJldmlvdXM6IE1lZGlhQ2hhbmdlW10sXG4gICAgICBjdXJyZW50OiBNZWRpYUNoYW5nZVtdXG4gICAgKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAocHJldmlvdXMubGVuZ3RoICE9PSBjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzTXFzID0gcHJldmlvdXMubWFwKChtYykgPT4gbWMubWVkaWFRdWVyeSk7XG4gICAgICBjb25zdCBjdXJyZW50TXFzID0gbmV3IFNldChjdXJyZW50Lm1hcCgobWMpID0+IG1jLm1lZGlhUXVlcnkpKTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBuZXcgU2V0KFxuICAgICAgICBwcmV2aW91c01xcy5maWx0ZXIoKG1xKSA9PiAhY3VycmVudE1xcy5oYXMobXEpKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGRpZmZlcmVuY2Uuc2l6ZSA9PT0gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICovXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hNZWRpYS5vYnNlcnZlKHRoaXMuaG9vay53aXRoUHJpbnRRdWVyeShtcUxpc3QpKS5waXBlKFxuICAgICAgZmlsdGVyKChjaGFuZ2U6IE1lZGlhQ2hhbmdlKSA9PiBjaGFuZ2UubWF0Y2hlcyksXG4gICAgICBkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlciksXG4gICAgICBzd2l0Y2hNYXAoKF8pID0+IG9mKHRoaXMuZmluZEFsbEFjdGl2YXRpb25zKCkpKSxcbiAgICAgIG1hcChleGNsdWRlT3ZlcmxhcHMpLFxuICAgICAgZmlsdGVyKGhhc0NoYW5nZXMpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoaWdub3JlRHVwbGljYXRlcyksXG4gICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgY3VycmVudCBhY3RpdmF0aW9ucyBhbmQgcHJlcGFyZSBzaW5nbGUgbGlzdCBvZiBhY3RpdmF0aW9uc1xuICAgKiBzb3J0ZWQgYnkgZGVzY2VuZGluZyBwcmlvcml0eS5cbiAgICovXG4gIHByaXZhdGUgZmluZEFsbEFjdGl2YXRpb25zKCk6IE1lZGlhQ2hhbmdlW10ge1xuICAgIGNvbnN0IG1lcmdlTVFBbGlhcyA9IChjaGFuZ2U6IE1lZGlhQ2hhbmdlKSA9PiB7XG4gICAgICBjb25zdCBicDogT3B0aW9uYWxCcmVha1BvaW50ID0gdGhpcy5icmVha3BvaW50cy5maW5kQnlRdWVyeShcbiAgICAgICAgY2hhbmdlLm1lZGlhUXVlcnlcbiAgICAgICk7XG4gICAgICByZXR1cm4gbWVyZ2VBbGlhcyhjaGFuZ2UsIGJwKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlcGxhY2VXaXRoUHJpbnRBbGlhcyA9IChjaGFuZ2U6IE1lZGlhQ2hhbmdlKSA9PlxuICAgICAgdGhpcy5ob29rLmlzUHJpbnRFdmVudChjaGFuZ2UpID8gdGhpcy5ob29rLnVwZGF0ZUV2ZW50KGNoYW5nZSkgOiBjaGFuZ2U7XG5cbiAgICByZXR1cm4gdGhpcy5tYXRjaE1lZGlhLmFjdGl2YXRpb25zXG4gICAgICAubWFwKChxdWVyeSkgPT4gbmV3IE1lZGlhQ2hhbmdlKHRydWUsIHF1ZXJ5KSlcbiAgICAgIC5tYXAocmVwbGFjZVdpdGhQcmludEFsaWFzKVxuICAgICAgLm1hcChtZXJnZU1RQWxpYXMpXG4gICAgICAuc29ydChzb3J0RGVzY2VuZGluZ1ByaW9yaXR5KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgX21lZGlhJDogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZVtdPjtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbn1cblxuLyoqXG4gKiBGaW5kIGFzc29jaWF0ZWQgYnJlYWtwb2ludCAoaWYgYW55KVxuICovXG5mdW5jdGlvbiB0b01lZGlhUXVlcnkoXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIGxvY2F0b3I6IEJyZWFrUG9pbnRSZWdpc3RyeVxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IGJwID0gbG9jYXRvci5maW5kQnlBbGlhcyhxdWVyeSkgPz8gbG9jYXRvci5maW5kQnlRdWVyeShxdWVyeSk7XG4gIHJldHVybiBicD8ubWVkaWFRdWVyeSA/PyBudWxsO1xufVxuXG4vKipcbiAqIFNwbGl0IGVhY2ggcXVlcnkgc3RyaW5nIGludG8gc2VwYXJhdGUgcXVlcnkgc3RyaW5ncyBpZiB0d28gcXVlcmllcyBhcmUgcHJvdmlkZWQgYXMgY29tbWFcbiAqIHNlcGFyYXRlZC5cbiAqL1xuZnVuY3Rpb24gc3BsaXRRdWVyaWVzKHF1ZXJpZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICByZXR1cm4gcXVlcmllc1xuICAgIC5mbGF0TWFwKChxdWVyeSkgPT4gcXVlcnkuc3BsaXQoJywnKSlcbiAgICAubWFwKChxdWVyeSkgPT4gcXVlcnkudHJpbSgpKTtcbn1cbiJdfQ==