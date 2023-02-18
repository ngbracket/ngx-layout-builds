/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { BREAKPOINTS, CLASS_NAME, MediaMarshaller, SERVER_TOKEN, sortAscendingPriority, StylesheetMap, ɵMatchMedia as MatchMedia, } from '@ngbrackets/ngx-layout/core';
import { ServerMatchMedia } from './server-match-media';
/**
 * Activate all the registered breakpoints in sequence, and then
 * retrieve the associated stylings from the virtual stylesheet
 * @param serverSheet the virtual stylesheet that stores styles for each
 *        element
 * @param mediaController the MatchMedia service to activate/deactivate breakpoints
 * @param breakpoints the registered breakpoints to activate/deactivate
 * @param mediaMarshaller the MediaMarshaller service to disable fallback styles dynamically
 */
export function generateStaticFlexLayoutStyles(serverSheet, mediaController, breakpoints, mediaMarshaller) {
    // Store the custom classes in the following map, that way only
    // one class gets allocated per HTMLElement, and each class can
    // be referenced in the static media queries
    const classMap = new Map();
    // Get the initial stylings for all the directives,
    // and initialize the fallback block of stylings.
    const defaultStyles = new Map(serverSheet.stylesheet);
    // Reset the class counter, otherwise class numbers will
    // increase with each server render.
    nextId = 0;
    let styleText = generateCss(defaultStyles, 'all', classMap);
    mediaMarshaller.useFallbacks = false;
    [...breakpoints].sort(sortAscendingPriority).forEach((bp) => {
        serverSheet.clearStyles();
        mediaController.activateBreakpoint(bp);
        const stylesheet = new Map(serverSheet.stylesheet);
        if (stylesheet.size > 0) {
            styleText += generateCss(stylesheet, bp.mediaQuery, classMap);
        }
        mediaController.deactivateBreakpoint(bp);
    });
    return styleText;
}
/**
 * Create a style tag populated with the dynamic stylings from Flex
 * components and attach it to the head of the DOM
 */
export function FLEX_SSR_SERIALIZER_FACTORY(serverSheet, mediaController, _document, breakpoints, mediaMarshaller) {
    return () => {
        // This is the style tag that gets inserted into the head of the DOM,
        // populated with the manual media queries
        const styleTag = _document.createElement('style');
        const styleText = generateStaticFlexLayoutStyles(serverSheet, mediaController, breakpoints, mediaMarshaller);
        styleTag.classList.add(`${CLASS_NAME}ssr`);
        styleTag.textContent = styleText;
        _document.head.appendChild(styleTag);
    };
}
/**
 *  Provider to set static styles on the server
 */
export const SERVER_PROVIDERS = [
    {
        provide: BEFORE_APP_SERIALIZED,
        useFactory: FLEX_SSR_SERIALIZER_FACTORY,
        deps: [StylesheetMap, MatchMedia, DOCUMENT, BREAKPOINTS, MediaMarshaller],
        multi: true,
    },
    {
        provide: SERVER_TOKEN,
        useValue: true,
    },
    {
        provide: MatchMedia,
        useClass: ServerMatchMedia,
    },
];
let nextId = 0;
const IS_DEBUG_MODE = false;
/**
 * create @media queries based on a virtual stylesheet
 * * Adds a unique class to each element and stores it
 *   in a shared classMap for later reuse
 * @param stylesheet the virtual stylesheet that stores styles for each
 *        element
 * @param mediaQuery the given @media CSS selector for the current breakpoint
 * @param classMap the map of HTML elements to class names to avoid duplications
 */
function generateCss(stylesheet, mediaQuery, classMap) {
    let css = '';
    stylesheet.forEach((styles, el) => {
        let keyVals = '';
        let className = getClassName(el, classMap);
        styles.forEach((v, k) => {
            keyVals += v ? format(`${k}:${v};`) : '';
        });
        if (keyVals) {
            // Build list of CSS styles; each with a className
            css += format(`.${className} {`, keyVals, '}');
        }
    });
    // Group 1 or more styles (each with className) in a specific mediaQuery
    return format(`@media ${mediaQuery} {`, css, '}');
}
/**
 * For debugging purposes, prefix css segment with linefeed(s) for easy
 * debugging purposes.
 */
function format(...list) {
    let result = '';
    list.forEach((css, i) => {
        result += IS_DEBUG_MODE ? formatSegment(css, i !== 0) : css;
    });
    return result;
}
function formatSegment(css, asPrefix = true) {
    return asPrefix ? `\n${css}` : `${css}\n`;
}
/**
 * Get className associated with CSS styling
 * If not found, generate global className and set
 * association.
 */
function getClassName(element, classMap) {
    let className = classMap.get(element);
    if (!className) {
        className = `${CLASS_NAME}${nextId++}`;
        classMap.set(element, className);
    }
    element.classList.add(className);
    return className;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9zZXJ2ZXIvc2VydmVyLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBRUwsV0FBVyxFQUNYLFVBQVUsRUFDVixlQUFlLEVBQ2YsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsV0FBVyxJQUFJLFVBQVUsR0FDMUIsTUFBTSw2QkFBNkIsQ0FBQztBQUVyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSw4QkFBOEIsQ0FDNUMsV0FBMEIsRUFDMUIsZUFBaUMsRUFDakMsV0FBeUIsRUFDekIsZUFBZ0M7SUFFaEMsK0RBQStEO0lBQy9ELCtEQUErRDtJQUMvRCw0Q0FBNEM7SUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7SUFFaEQsbURBQW1EO0lBQ25ELGlEQUFpRDtJQUNqRCxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEQsd0RBQXdEO0lBQ3hELG9DQUFvQztJQUNwQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsZUFBZSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFckMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FB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LENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxNQUFNLENBQUMsR0FBRyxJQUFjO0lBQy9CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RCLE1BQU0sSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsR0FBVyxFQUFFLFdBQW9CLElBQUk7SUFDMUQsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDNUMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFlBQVksQ0FDbkIsT0FBb0IsRUFDcEIsUUFBa0M7SUFFbEMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsU0FBUyxHQUFHLEdBQUcsVUFBVSxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUM7UUFDdkMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDbEM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVqQyxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCRUZPUkVfQVBQX1NFUklBTElaRUQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInO1xuaW1wb3J0IHtcbiAgQnJlYWtQb2ludCxcbiAgQlJFQUtQT0lOVFMsXG4gIENMQVNTX05BTUUsXG4gIE1lZGlhTWFyc2hhbGxlcixcbiAgU0VSVkVSX1RPS0VOLFxuICBzb3J0QXNjZW5kaW5nUHJpb3JpdHksXG4gIFN0eWxlc2hlZXRNYXAsXG4gIMm1TWF0Y2hNZWRpYSBhcyBNYXRjaE1lZGlhLFxufSBmcm9tICdAbmdicmFja2V0cy9uZ3gtbGF5b3V0L2NvcmUnO1xuXG5pbXBvcnQgeyBTZXJ2ZXJNYXRjaE1lZGlhIH0gZnJvbSAnLi9zZXJ2ZXItbWF0Y2gtbWVkaWEnO1xuXG4vKipcbiAqIEFjdGl2YXRlIGFsbCB0aGUgcmVnaXN0ZXJlZCBicmVha3BvaW50cyBpbiBzZXF1ZW5jZSwgYW5kIHRoZW5cbiAqIHJldHJpZXZlIHRoZSBhc3NvY2lhdGVkIHN0eWxpbmdzIGZyb20gdGhlIHZpcnR1YWwgc3R5bGVzaGVldFxuICogQHBhcmFtIHNlcnZlclNoZWV0IHRoZSB2aXJ0dWFsIHN0eWxlc2hlZXQgdGhhdCBzdG9yZXMgc3R5bGVzIGZvciBlYWNoXG4gKiAgICAgICAgZWxlbWVudFxuICogQHBhcmFtIG1lZGlhQ29udHJvbGxlciB0aGUgTWF0Y2hNZWRpYSBzZXJ2aWNlIHRvIGFjdGl2YXRlL2RlYWN0aXZhdGUgYnJlYWtwb2ludHNcbiAqIEBwYXJhbSBicmVha3BvaW50cyB0aGUgcmVnaXN0ZXJlZCBicmVha3BvaW50cyB0byBhY3RpdmF0ZS9kZWFjdGl2YXRlXG4gKiBAcGFyYW0gbWVkaWFNYXJzaGFsbGVyIHRoZSBNZWRpYU1hcnNoYWxsZXIgc2VydmljZSB0byBkaXNhYmxlIGZhbGxiYWNrIHN0eWxlcyBkeW5hbWljYWxseVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTdGF0aWNGbGV4TGF5b3V0U3R5bGVzKFxuICBzZXJ2ZXJTaGVldDogU3R5bGVzaGVldE1hcCxcbiAgbWVkaWFDb250cm9sbGVyOiBTZXJ2ZXJNYXRjaE1lZGlhLFxuICBicmVha3BvaW50czogQnJlYWtQb2ludFtdLFxuICBtZWRpYU1hcnNoYWxsZXI6IE1lZGlhTWFyc2hhbGxlclxuKSB7XG4gIC8vIFN0b3JlIHRoZSBjdXN0b20gY2xhc3NlcyBpbiB0aGUgZm9sbG93aW5nIG1hcCwgdGhhdCB3YXkgb25seVxuICAvLyBvbmUgY2xhc3MgZ2V0cyBhbGxvY2F0ZWQgcGVyIEhUTUxFbGVtZW50LCBhbmQgZWFjaCBjbGFzcyBjYW5cbiAgLy8gYmUgcmVmZXJlbmNlZCBpbiB0aGUgc3RhdGljIG1lZGlhIHF1ZXJpZXNcbiAgY29uc3QgY2xhc3NNYXAgPSBuZXcgTWFwPEhUTUxFbGVtZW50LCBzdHJpbmc+KCk7XG5cbiAgLy8gR2V0IHRoZSBpbml0aWFsIHN0eWxpbmdzIGZvciBhbGwgdGhlIGRpcmVjdGl2ZXMsXG4gIC8vIGFuZCBpbml0aWFsaXplIHRoZSBmYWxsYmFjayBibG9jayBvZiBzdHlsaW5ncy5cbiAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IG5ldyBNYXAoc2VydmVyU2hlZXQuc3R5bGVzaGVldCk7XG4gIC8vIFJlc2V0IHRoZSBjbGFzcyBjb3VudGVyLCBvdGhlcndpc2UgY2xhc3MgbnVtYmVycyB3aWxsXG4gIC8vIGluY3JlYXNlIHdpdGggZWFjaCBzZXJ2ZXIgcmVuZGVyLlxuICBuZXh0SWQgPSAwO1xuICBsZXQgc3R5bGVUZXh0ID0gZ2VuZXJhdGVDc3MoZGVmYXVsdFN0eWxlcywgJ2FsbCcsIGNsYXNzTWFwKTtcbiAgbWVkaWFNYXJzaGFsbGVyLnVzZUZhbGxiYWNrcyA9IGZhbHNlO1xuXG4gIFsuLi5icmVha3BvaW50c10uc29ydChzb3J0QXNjZW5kaW5nUHJpb3JpdHkpLmZvckVhY2goKGJwKSA9PiB7XG4gICAgc2VydmVyU2hlZXQuY2xlYXJTdHlsZXMoKTtcbiAgICBtZWRpYUNvbnRyb2xsZXIuYWN0aXZhdGVCcmVha3BvaW50KGJwKTtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gbmV3IE1hcChzZXJ2ZXJTaGVldC5zdHlsZXNoZWV0KTtcbiAgICBpZiAoc3R5bGVzaGVldC5zaXplID4gMCkge1xuICAgICAgc3R5bGVUZXh0ICs9IGdlbmVyYXRlQ3NzKHN0eWxlc2hlZXQsIGJwLm1lZGlhUXVlcnksIGNsYXNzTWFwKTtcbiAgICB9XG4gICAgbWVkaWFDb250cm9sbGVyLmRlYWN0aXZhdGVCcmVha3BvaW50KGJwKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlVGV4dDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBzdHlsZSB0YWcgcG9wdWxhdGVkIHdpdGggdGhlIGR5bmFtaWMgc3R5bGluZ3MgZnJvbSBGbGV4XG4gKiBjb21wb25lbnRzIGFuZCBhdHRhY2ggaXQgdG8gdGhlIGhlYWQgb2YgdGhlIERPTVxuICovXG5leHBvcnQgZnVuY3Rpb24gRkxFWF9TU1JfU0VSSUFMSVpFUl9GQUNUT1JZKFxuICBzZXJ2ZXJTaGVldDogU3R5bGVzaGVldE1hcCxcbiAgbWVkaWFDb250cm9sbGVyOiBTZXJ2ZXJNYXRjaE1lZGlhLFxuICBfZG9jdW1lbnQ6IERvY3VtZW50LFxuICBicmVha3BvaW50czogQnJlYWtQb2ludFtdLFxuICBtZWRpYU1hcnNoYWxsZXI6IE1lZGlhTWFyc2hhbGxlclxuKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyB0aGUgc3R5bGUgdGFnIHRoYXQgZ2V0cyBpbnNlcnRlZCBpbnRvIHRoZSBoZWFkIG9mIHRoZSBET00sXG4gICAgLy8gcG9wdWxhdGVkIHdpdGggdGhlIG1hbnVhbCBtZWRpYSBxdWVyaWVzXG4gICAgY29uc3Qgc3R5bGVUYWcgPSBfZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjb25zdCBzdHlsZVRleHQgPSBnZW5lcmF0ZVN0YXRpY0ZsZXhMYXlvdXRTdHlsZXMoXG4gICAgICBzZXJ2ZXJTaGVldCxcbiAgICAgIG1lZGlhQ29udHJvbGxlcixcbiAgICAgIGJyZWFrcG9pbnRzLFxuICAgICAgbWVkaWFNYXJzaGFsbGVyXG4gICAgKTtcbiAgICBzdHlsZVRhZy5jbGFzc0xpc3QuYWRkKGAke0NMQVNTX05BTUV9c3NyYCk7XG4gICAgc3R5bGVUYWcudGV4dENvbnRlbnQgPSBzdHlsZVRleHQ7XG4gICAgX2RvY3VtZW50LmhlYWQhLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcbiAgfTtcbn1cblxuLyoqXG4gKiAgUHJvdmlkZXIgdG8gc2V0IHN0YXRpYyBzdHlsZXMgb24gdGhlIHNlcnZlclxuICovXG5leHBvcnQgY29uc3QgU0VSVkVSX1BST1ZJREVSUyA9IFtcbiAge1xuICAgIHByb3ZpZGU6IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCxcbiAgICB1c2VGYWN0b3J5OiBGTEVYX1NTUl9TRVJJQUxJWkVSX0ZBQ1RPUlksXG4gICAgZGVwczogW1N0eWxlc2hlZXRNYXAsIE1hdGNoTWVkaWEsIERPQ1VNRU5ULCBCUkVBS1BPSU5UUywgTWVkaWFNYXJzaGFsbGVyXSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFNFUlZFUl9UT0tFTixcbiAgICB1c2VWYWx1ZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IE1hdGNoTWVkaWEsXG4gICAgdXNlQ2xhc3M6IFNlcnZlck1hdGNoTWVkaWEsXG4gIH0sXG5dO1xuXG5sZXQgbmV4dElkID0gMDtcbmNvbnN0IElTX0RFQlVHX01PREUgPSBmYWxzZTtcblxuZXhwb3J0IHR5cGUgU3R5bGVTaGVldCA9IE1hcDxIVE1MRWxlbWVudCwgTWFwPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPj47XG5leHBvcnQgdHlwZSBDbGFzc01hcCA9IE1hcDxIVE1MRWxlbWVudCwgc3RyaW5nPjtcblxuLyoqXG4gKiBjcmVhdGUgQG1lZGlhIHF1ZXJpZXMgYmFzZWQgb24gYSB2aXJ0dWFsIHN0eWxlc2hlZXRcbiAqICogQWRkcyBhIHVuaXF1ZSBjbGFzcyB0byBlYWNoIGVsZW1lbnQgYW5kIHN0b3JlcyBpdFxuICogICBpbiBhIHNoYXJlZCBjbGFzc01hcCBmb3IgbGF0ZXIgcmV1c2VcbiAqIEBwYXJhbSBzdHlsZXNoZWV0IHRoZSB2aXJ0dWFsIHN0eWxlc2hlZXQgdGhhdCBzdG9yZXMgc3R5bGVzIGZvciBlYWNoXG4gKiAgICAgICAgZWxlbWVudFxuICogQHBhcmFtIG1lZGlhUXVlcnkgdGhlIGdpdmVuIEBtZWRpYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSBjdXJyZW50IGJyZWFrcG9pbnRcbiAqIEBwYXJhbSBjbGFzc01hcCB0aGUgbWFwIG9mIEhUTUwgZWxlbWVudHMgdG8gY2xhc3MgbmFtZXMgdG8gYXZvaWQgZHVwbGljYXRpb25zXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlQ3NzKFxuICBzdHlsZXNoZWV0OiBTdHlsZVNoZWV0LFxuICBtZWRpYVF1ZXJ5OiBzdHJpbmcsXG4gIGNsYXNzTWFwOiBDbGFzc01hcFxuKSB7XG4gIGxldCBjc3MgPSAnJztcbiAgc3R5bGVzaGVldC5mb3JFYWNoKChzdHlsZXMsIGVsKSA9PiB7XG4gICAgbGV0IGtleVZhbHMgPSAnJztcbiAgICBsZXQgY2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKGVsLCBjbGFzc01hcCk7XG5cbiAgICBzdHlsZXMuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAga2V5VmFscyArPSB2ID8gZm9ybWF0KGAke2t9OiR7dn07YCkgOiAnJztcbiAgICB9KTtcblxuICAgIGlmIChrZXlWYWxzKSB7XG4gICAgICAvLyBCdWlsZCBsaXN0IG9mIENTUyBzdHlsZXM7IGVhY2ggd2l0aCBhIGNsYXNzTmFtZVxuICAgICAgY3NzICs9IGZvcm1hdChgLiR7Y2xhc3NOYW1lfSB7YCwga2V5VmFscywgJ30nKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEdyb3VwIDEgb3IgbW9yZSBzdHlsZXMgKGVhY2ggd2l0aCBjbGFzc05hbWUpIGluIGEgc3BlY2lmaWMgbWVkaWFRdWVyeVxuICByZXR1cm4gZm9ybWF0KGBAbWVkaWEgJHttZWRpYVF1ZXJ5fSB7YCwgY3NzLCAnfScpO1xufVxuXG4vKipcbiAqIEZvciBkZWJ1Z2dpbmcgcHVycG9zZXMsIHByZWZpeCBjc3Mgc2VnbWVudCB3aXRoIGxpbmVmZWVkKHMpIGZvciBlYXN5XG4gKiBkZWJ1Z2dpbmcgcHVycG9zZXMuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdCguLi5saXN0OiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgbGlzdC5mb3JFYWNoKChjc3MsIGkpID0+IHtcbiAgICByZXN1bHQgKz0gSVNfREVCVUdfTU9ERSA/IGZvcm1hdFNlZ21lbnQoY3NzLCBpICE9PSAwKSA6IGNzcztcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFNlZ21lbnQoY3NzOiBzdHJpbmcsIGFzUHJlZml4OiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gIHJldHVybiBhc1ByZWZpeCA/IGBcXG4ke2Nzc31gIDogYCR7Y3NzfVxcbmA7XG59XG5cbi8qKlxuICogR2V0IGNsYXNzTmFtZSBhc3NvY2lhdGVkIHdpdGggQ1NTIHN0eWxpbmdcbiAqIElmIG5vdCBmb3VuZCwgZ2VuZXJhdGUgZ2xvYmFsIGNsYXNzTmFtZSBhbmQgc2V0XG4gKiBhc3NvY2lhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKFxuICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgY2xhc3NNYXA6IE1hcDxIVE1MRWxlbWVudCwgc3RyaW5nPlxuKSB7XG4gIGxldCBjbGFzc05hbWUgPSBjbGFzc01hcC5nZXQoZWxlbWVudCk7XG4gIGlmICghY2xhc3NOYW1lKSB7XG4gICAgY2xhc3NOYW1lID0gYCR7Q0xBU1NfTkFNRX0ke25leHRJZCsrfWA7XG4gICAgY2xhc3NNYXAuc2V0KGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gIH1cbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cbiAgcmV0dXJuIGNsYXNzTmFtZTtcbn1cbiJdfQ==