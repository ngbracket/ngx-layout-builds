/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { extendObject } from '@ngbrackets/ngx-layout/_private-utils';
const ALIAS_DELIMITERS = /(\.|-|_)/g;
function firstUpperCase(part) {
    let first = part.length > 0 ? part.charAt(0) : '';
    let remainder = part.length > 1 ? part.slice(1) : '';
    return first.toUpperCase() + remainder;
}
/**
 * Converts snake-case to SnakeCase.
 * @param name Text to UpperCamelCase
 */
function camelCase(name) {
    return name
        .replace(ALIAS_DELIMITERS, '|')
        .split('|')
        .map(firstUpperCase)
        .join('');
}
/**
 * For each breakpoint, ensure that a Suffix is defined;
 * fallback to UpperCamelCase the unique Alias value
 */
export function validateSuffixes(list) {
    list.forEach((bp) => {
        if (!bp.suffix) {
            bp.suffix = camelCase(bp.alias); // create Suffix value based on alias
            bp.overlapping = !!bp.overlapping; // ensure default value
        }
    });
    return list;
}
/**
 * Merge a custom breakpoint list with the default list based on unique alias values
 *  - Items are added if the alias is not in the default list
 *  - Items are merged with the custom override if the alias exists in the default list
 */
export function mergeByAlias(defaults, custom = []) {
    const dict = {};
    defaults.forEach((bp) => {
        dict[bp.alias] = bp;
    });
    // Merge custom breakpoints
    custom.forEach((bp) => {
        if (dict[bp.alias]) {
            extendObject(dict[bp.alias], bp);
        }
        else {
            dict[bp.alias] = bp;
        }
    });
    return validateSuffixes(Object.keys(dict).map((k) => dict[k]));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC10b29scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvY29yZS9icmVha3BvaW50cy9icmVha3BvaW50LXRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUdyRSxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztBQUNyQyxTQUFTLGNBQWMsQ0FBQyxJQUFZO0lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNyRCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDekMsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQVk7SUFDN0IsT0FBTyxJQUFJO1NBQ1IsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQztTQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLGNBQWMsQ0FBQztTQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQWtCO0lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFjLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUNkLEVBQUUsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztZQUN0RSxFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsdUJBQXVCO1NBQzNEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FDMUIsUUFBc0IsRUFDdEIsU0FBdUIsRUFBRTtJQUV6QixNQUFNLElBQUksR0FBa0MsRUFBRSxDQUFDO0lBQy9DLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUNILDJCQUEyQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBYyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBleHRlbmRPYmplY3QgfSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcbmltcG9ydCB7IEJyZWFrUG9pbnQgfSBmcm9tICcuL2JyZWFrLXBvaW50JztcblxuY29uc3QgQUxJQVNfREVMSU1JVEVSUyA9IC8oXFwufC18XykvZztcbmZ1bmN0aW9uIGZpcnN0VXBwZXJDYXNlKHBhcnQ6IHN0cmluZykge1xuICBsZXQgZmlyc3QgPSBwYXJ0Lmxlbmd0aCA+IDAgPyBwYXJ0LmNoYXJBdCgwKSA6ICcnO1xuICBsZXQgcmVtYWluZGVyID0gcGFydC5sZW5ndGggPiAxID8gcGFydC5zbGljZSgxKSA6ICcnO1xuICByZXR1cm4gZmlyc3QudG9VcHBlckNhc2UoKSArIHJlbWFpbmRlcjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBzbmFrZS1jYXNlIHRvIFNuYWtlQ2FzZS5cbiAqIEBwYXJhbSBuYW1lIFRleHQgdG8gVXBwZXJDYW1lbENhc2VcbiAqL1xuZnVuY3Rpb24gY2FtZWxDYXNlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoQUxJQVNfREVMSU1JVEVSUywgJ3wnKVxuICAgIC5zcGxpdCgnfCcpXG4gICAgLm1hcChmaXJzdFVwcGVyQ2FzZSlcbiAgICAuam9pbignJyk7XG59XG5cbi8qKlxuICogRm9yIGVhY2ggYnJlYWtwb2ludCwgZW5zdXJlIHRoYXQgYSBTdWZmaXggaXMgZGVmaW5lZDtcbiAqIGZhbGxiYWNrIHRvIFVwcGVyQ2FtZWxDYXNlIHRoZSB1bmlxdWUgQWxpYXMgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU3VmZml4ZXMobGlzdDogQnJlYWtQb2ludFtdKTogQnJlYWtQb2ludFtdIHtcbiAgbGlzdC5mb3JFYWNoKChicDogQnJlYWtQb2ludCkgPT4ge1xuICAgIGlmICghYnAuc3VmZml4KSB7XG4gICAgICBicC5zdWZmaXggPSBjYW1lbENhc2UoYnAuYWxpYXMpOyAvLyBjcmVhdGUgU3VmZml4IHZhbHVlIGJhc2VkIG9uIGFsaWFzXG4gICAgICBicC5vdmVybGFwcGluZyA9ICEhYnAub3ZlcmxhcHBpbmc7IC8vIGVuc3VyZSBkZWZhdWx0IHZhbHVlXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxpc3Q7XG59XG5cbi8qKlxuICogTWVyZ2UgYSBjdXN0b20gYnJlYWtwb2ludCBsaXN0IHdpdGggdGhlIGRlZmF1bHQgbGlzdCBiYXNlZCBvbiB1bmlxdWUgYWxpYXMgdmFsdWVzXG4gKiAgLSBJdGVtcyBhcmUgYWRkZWQgaWYgdGhlIGFsaWFzIGlzIG5vdCBpbiB0aGUgZGVmYXVsdCBsaXN0XG4gKiAgLSBJdGVtcyBhcmUgbWVyZ2VkIHdpdGggdGhlIGN1c3RvbSBvdmVycmlkZSBpZiB0aGUgYWxpYXMgZXhpc3RzIGluIHRoZSBkZWZhdWx0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQnlBbGlhcyhcbiAgZGVmYXVsdHM6IEJyZWFrUG9pbnRbXSxcbiAgY3VzdG9tOiBCcmVha1BvaW50W10gPSBbXVxuKTogQnJlYWtQb2ludFtdIHtcbiAgY29uc3QgZGljdDogeyBba2V5OiBzdHJpbmddOiBCcmVha1BvaW50IH0gPSB7fTtcbiAgZGVmYXVsdHMuZm9yRWFjaCgoYnApID0+IHtcbiAgICBkaWN0W2JwLmFsaWFzXSA9IGJwO1xuICB9KTtcbiAgLy8gTWVyZ2UgY3VzdG9tIGJyZWFrcG9pbnRzXG4gIGN1c3RvbS5mb3JFYWNoKChicDogQnJlYWtQb2ludCkgPT4ge1xuICAgIGlmIChkaWN0W2JwLmFsaWFzXSkge1xuICAgICAgZXh0ZW5kT2JqZWN0KGRpY3RbYnAuYWxpYXNdLCBicCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpY3RbYnAuYWxpYXNdID0gYnA7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdmFsaWRhdGVTdWZmaXhlcyhPYmplY3Qua2V5cyhkaWN0KS5tYXAoKGspID0+IGRpY3Rba10pKTtcbn1cbiJdfQ==