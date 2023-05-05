/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as i0 from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { sortAscendingPriority } from '../utils/sort';
import { BREAKPOINTS } from './break-points-token';
/**
 * Registry of 1..n MediaQuery breakpoint ranges
 * This is published as a provider and may be overridden from custom, application-specific ranges
 *
 */
class BreakPointRegistry {
  constructor(list) {
    /**
     * Memoized BreakPoint Lookups
     */
    this.findByMap = new Map();
    this.items = [...list].sort(sortAscendingPriority);
  }
  /**
   * Search breakpoints by alias (e.g. gt-xs)
   */
  findByAlias(alias) {
    return !alias
      ? null
      : this.findWithPredicate(alias, (bp) => bp.alias === alias);
  }
  findByQuery(query) {
    return this.findWithPredicate(query, (bp) => bp.mediaQuery === query);
  }
  /**
   * Get all the breakpoints whose ranges could overlapping `normal` ranges;
   * e.g. gt-sm overlaps md, lg, and xl
   */
  get overlappings() {
    return this.items.filter((it) => it.overlapping);
  }
  /**
   * Get list of all registered (non-empty) breakpoint aliases
   */
  get aliases() {
    return this.items.map((it) => it.alias);
  }
  /**
   * Aliases are mapped to properties using suffixes
   * e.g.  'gt-sm' for property 'layout'  uses suffix 'GtSm'
   * for property layoutGtSM.
   */
  get suffixes() {
    return this.items.map((it) => it?.suffix ?? '');
  }
  /**
   * Memoized lookup using custom predicate function
   */
  findWithPredicate(key, searchFn) {
    let response = this.findByMap.get(key);
    if (!response) {
      response = this.items.find(searchFn) ?? null;
      this.findByMap.set(key, response);
    }
    return response ?? null;
  }
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({
      minVersion: '12.0.0',
      version: '16.0.0-6ca1503',
      ngImport: i0,
      type: BreakPointRegistry,
      deps: [{ token: BREAKPOINTS }],
      target: i0.ɵɵFactoryTarget.Injectable,
    });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({
      minVersion: '12.0.0',
      version: '16.0.0-6ca1503',
      ngImport: i0,
      type: BreakPointRegistry,
      providedIn: 'root',
    });
  }
}
export { BreakPointRegistry };
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.0.0-6ca1503',
  ngImport: i0,
  type: BreakPointRegistry,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [BREAKPOINTS],
          },
        ],
      },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWstcG9pbnQtcmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvYnJlYWtwb2ludHMvYnJlYWstcG9pbnQtcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHakQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJcEQ7Ozs7R0FJRztBQUNILE1BQ2Esa0JBQWtCO0lBRzdCLFlBQWlDLElBQWtCO1FBcURuRDs7V0FFRztRQUNjLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztRQXZEakUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQWE7UUFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQixDQUFDLEdBQVcsRUFDakMsUUFBcUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDO0lBRTFCLENBQUM7OEdBdERVLGtCQUFrQixrQkFHVCxXQUFXO2tIQUhwQixrQkFBa0IsY0FETixNQUFNOztTQUNsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQUlqQixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCcmVha1BvaW50fSBmcm9tICcuL2JyZWFrLXBvaW50JztcbmltcG9ydCB7QlJFQUtQT0lOVFN9IGZyb20gJy4vYnJlYWstcG9pbnRzLXRva2VuJztcbmltcG9ydCB7c29ydEFzY2VuZGluZ1ByaW9yaXR5fSBmcm9tICcuLi91dGlscy9zb3J0JztcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxCcmVha1BvaW50ID0gQnJlYWtQb2ludCB8IG51bGw7XG5cbi8qKlxuICogUmVnaXN0cnkgb2YgMS4ubiBNZWRpYVF1ZXJ5IGJyZWFrcG9pbnQgcmFuZ2VzXG4gKiBUaGlzIGlzIHB1Ymxpc2hlZCBhcyBhIHByb3ZpZGVyIGFuZCBtYXkgYmUgb3ZlcnJpZGRlbiBmcm9tIGN1c3RvbSwgYXBwbGljYXRpb24tc3BlY2lmaWMgcmFuZ2VzXG4gKlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBCcmVha1BvaW50UmVnaXN0cnkge1xuICByZWFkb25seSBpdGVtczogQnJlYWtQb2ludFtdO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQlJFQUtQT0lOVFMpIGxpc3Q6IEJyZWFrUG9pbnRbXSkge1xuICAgIHRoaXMuaXRlbXMgPSBbLi4ubGlzdF0uc29ydChzb3J0QXNjZW5kaW5nUHJpb3JpdHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBicmVha3BvaW50cyBieSBhbGlhcyAoZS5nLiBndC14cylcbiAgICovXG4gIGZpbmRCeUFsaWFzKGFsaWFzOiBzdHJpbmcpOiBPcHRpb25hbEJyZWFrUG9pbnQge1xuICAgIHJldHVybiAhYWxpYXMgPyBudWxsIDogdGhpcy5maW5kV2l0aFByZWRpY2F0ZShhbGlhcywgKGJwKSA9PiBicC5hbGlhcyA9PT0gYWxpYXMpO1xuICB9XG5cbiAgZmluZEJ5UXVlcnkocXVlcnk6IHN0cmluZyk6IE9wdGlvbmFsQnJlYWtQb2ludCB7XG4gICAgcmV0dXJuIHRoaXMuZmluZFdpdGhQcmVkaWNhdGUocXVlcnksIChicCkgPT4gYnAubWVkaWFRdWVyeSA9PT0gcXVlcnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdGhlIGJyZWFrcG9pbnRzIHdob3NlIHJhbmdlcyBjb3VsZCBvdmVybGFwcGluZyBgbm9ybWFsYCByYW5nZXM7XG4gICAqIGUuZy4gZ3Qtc20gb3ZlcmxhcHMgbWQsIGxnLCBhbmQgeGxcbiAgICovXG4gIGdldCBvdmVybGFwcGluZ3MoKTogQnJlYWtQb2ludFtdIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoaXQgPT4gaXQub3ZlcmxhcHBpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsaXN0IG9mIGFsbCByZWdpc3RlcmVkIChub24tZW1wdHkpIGJyZWFrcG9pbnQgYWxpYXNlc1xuICAgKi9cbiAgZ2V0IGFsaWFzZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLm1hcChpdCA9PiBpdC5hbGlhcyk7XG4gIH1cblxuICAvKipcbiAgICogQWxpYXNlcyBhcmUgbWFwcGVkIHRvIHByb3BlcnRpZXMgdXNpbmcgc3VmZml4ZXNcbiAgICogZS5nLiAgJ2d0LXNtJyBmb3IgcHJvcGVydHkgJ2xheW91dCcgIHVzZXMgc3VmZml4ICdHdFNtJ1xuICAgKiBmb3IgcHJvcGVydHkgbGF5b3V0R3RTTS5cbiAgICovXG4gIGdldCBzdWZmaXhlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKGl0ID0+IGl0Py5zdWZmaXggPz8gJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lbW9pemVkIGxvb2t1cCB1c2luZyBjdXN0b20gcHJlZGljYXRlIGZ1bmN0aW9uXG4gICAqL1xuICBwcml2YXRlIGZpbmRXaXRoUHJlZGljYXRlKGtleTogc3RyaW5nLFxuICAgICAgc2VhcmNoRm46IChicDogQnJlYWtQb2ludCkgPT4gYm9vbGVhbik6IE9wdGlvbmFsQnJlYWtQb2ludCB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5maW5kQnlNYXAuZ2V0KGtleSk7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2UgPSB0aGlzLml0ZW1zLmZpbmQoc2VhcmNoRm4pID8/IG51bGw7XG4gICAgICB0aGlzLmZpbmRCeU1hcC5zZXQoa2V5LCByZXNwb25zZSk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZSA/PyBudWxsO1xuXG4gIH1cblxuICAvKipcbiAgICogTWVtb2l6ZWQgQnJlYWtQb2ludCBMb29rdXBzXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IGZpbmRCeU1hcCA9IG5ldyBNYXA8U3RyaW5nLCBPcHRpb25hbEJyZWFrUG9pbnQ+KCk7XG59XG5cbiJdfQ==
