/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, InjectionToken } from '@angular/core';
import { mergeByAlias } from '../breakpoints/breakpoint-tools';
import { DEFAULT_BREAKPOINTS } from '../breakpoints/data/break-points';
import { ORIENTATION_BREAKPOINTS } from '../breakpoints/data/orientation-break-points';
import { BREAKPOINT } from '../tokens/breakpoint-token';
import { LAYOUT_CONFIG } from '../tokens/library-config';
/**
 *  Injection token unique to the flex-layout library.
 *  Use this token when build a custom provider (see below).
 */
export const BREAKPOINTS = new InjectionToken('Token (@ngbracket/ngx-layout) Breakpoints', {
    providedIn: 'root',
    factory: () => {
        const breakpoints = inject(BREAKPOINT);
        const layoutConfig = inject(LAYOUT_CONFIG);
        const bpFlattenArray = [].concat.apply([], (breakpoints || []).map((v) => Array.isArray(v) ? v : [v]));
        const builtIns = (layoutConfig.disableDefaultBps ? [] : DEFAULT_BREAKPOINTS).concat(layoutConfig.addOrientationBps ? ORIENTATION_BREAKPOINTS : []);
        return mergeByAlias(builtIns, bpFlattenArray);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWstcG9pbnRzLXRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9jb3JlL2JyZWFrcG9pbnRzL2JyZWFrLXBvaW50cy10b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUd6RDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQzNDLDJDQUEyQyxFQUMzQztJQUNFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDWixNQUFNLFdBQVcsR0FBUSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sY0FBYyxHQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDbEQsRUFBRSxFQUNGLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQTRCLEVBQUUsRUFBRSxDQUN2RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzNCLENBQ0YsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLENBQ2YsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUMxRCxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV4RSxPQUFPLFlBQVksQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZUJ5QWxpYXMgfSBmcm9tICcuLi9icmVha3BvaW50cy9icmVha3BvaW50LXRvb2xzJztcbmltcG9ydCB7IERFRkFVTFRfQlJFQUtQT0lOVFMgfSBmcm9tICcuLi9icmVha3BvaW50cy9kYXRhL2JyZWFrLXBvaW50cyc7XG5pbXBvcnQgeyBPUklFTlRBVElPTl9CUkVBS1BPSU5UUyB9IGZyb20gJy4uL2JyZWFrcG9pbnRzL2RhdGEvb3JpZW50YXRpb24tYnJlYWstcG9pbnRzJztcbmltcG9ydCB7IEJSRUFLUE9JTlQgfSBmcm9tICcuLi90b2tlbnMvYnJlYWtwb2ludC10b2tlbic7XG5pbXBvcnQgeyBMQVlPVVRfQ09ORklHIH0gZnJvbSAnLi4vdG9rZW5zL2xpYnJhcnktY29uZmlnJztcbmltcG9ydCB7IEJyZWFrUG9pbnQgfSBmcm9tICcuL2JyZWFrLXBvaW50JztcblxuLyoqXG4gKiAgSW5qZWN0aW9uIHRva2VuIHVuaXF1ZSB0byB0aGUgZmxleC1sYXlvdXQgbGlicmFyeS5cbiAqICBVc2UgdGhpcyB0b2tlbiB3aGVuIGJ1aWxkIGEgY3VzdG9tIHByb3ZpZGVyIChzZWUgYmVsb3cpLlxuICovXG5leHBvcnQgY29uc3QgQlJFQUtQT0lOVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48QnJlYWtQb2ludFtdPihcbiAgJ1Rva2VuIChAbmdicmFja2V0L25neC1sYXlvdXQpIEJyZWFrcG9pbnRzJyxcbiAge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiAoKSA9PiB7XG4gICAgICBjb25zdCBicmVha3BvaW50czogYW55ID0gaW5qZWN0KEJSRUFLUE9JTlQpO1xuICAgICAgY29uc3QgbGF5b3V0Q29uZmlnID0gaW5qZWN0KExBWU9VVF9DT05GSUcpO1xuICAgICAgY29uc3QgYnBGbGF0dGVuQXJyYXk6IEJyZWFrUG9pbnRbXSA9IFtdLmNvbmNhdC5hcHBseShcbiAgICAgICAgW10sXG4gICAgICAgIChicmVha3BvaW50cyB8fCBbXSkubWFwKCh2OiBCcmVha1BvaW50IHwgQnJlYWtQb2ludFtdKSA9PlxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodikgPyB2IDogW3ZdXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBidWlsdElucyA9IChcbiAgICAgICAgbGF5b3V0Q29uZmlnLmRpc2FibGVEZWZhdWx0QnBzID8gW10gOiBERUZBVUxUX0JSRUFLUE9JTlRTXG4gICAgICApLmNvbmNhdChsYXlvdXRDb25maWcuYWRkT3JpZW50YXRpb25CcHMgPyBPUklFTlRBVElPTl9CUkVBS1BPSU5UUyA6IFtdKTtcblxuICAgICAgcmV0dXJuIG1lcmdlQnlBbGlhcyhidWlsdElucywgYnBGbGF0dGVuQXJyYXkpO1xuICAgIH0sXG4gIH1cbik7XG4iXX0=