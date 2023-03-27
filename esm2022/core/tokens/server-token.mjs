/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * Token that is provided to tell whether the FlexLayoutServerModule
 * has been included in the bundle
 *
 * NOTE: This can be manually provided to disable styles when using SSR
 */
export const SERVER_TOKEN = new InjectionToken('FlexLayoutServerLoaded', {
    providedIn: 'root',
    factory: () => false
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9jb3JlL3Rva2Vucy9zZXJ2ZXItdG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3Qzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FDNUMsd0JBQXdCLEVBQUU7SUFDeEIsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7Q0FDckIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUb2tlbiB0aGF0IGlzIHByb3ZpZGVkIHRvIHRlbGwgd2hldGhlciB0aGUgRmxleExheW91dFNlcnZlck1vZHVsZVxuICogaGFzIGJlZW4gaW5jbHVkZWQgaW4gdGhlIGJ1bmRsZVxuICpcbiAqIE5PVEU6IFRoaXMgY2FuIGJlIG1hbnVhbGx5IHByb3ZpZGVkIHRvIGRpc2FibGUgc3R5bGVzIHdoZW4gdXNpbmcgU1NSXG4gKi9cbmV4cG9ydCBjb25zdCBTRVJWRVJfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oXG4gICdGbGV4TGF5b3V0U2VydmVyTG9hZGVkJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiAoKSA9PiBmYWxzZVxuICB9KTtcbiJdfQ==