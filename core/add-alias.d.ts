import { OptionalBreakPoint } from './breakpoints';
import { MediaChange } from './media-change';
/**
 * For the specified MediaChange, make sure it contains the breakpoint alias
 * and suffix (if available).
 */
export declare function mergeAlias(dest: MediaChange, source: OptionalBreakPoint): MediaChange;
