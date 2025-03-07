export type MediaQuerySubscriber = (changes: MediaChange) => void;
/**
 * Class instances emitted [to observers] for each mql notification
 */
export declare class MediaChange {
    matches: boolean;
    mediaQuery: string;
    mqAlias: string;
    suffix: string;
    priority: number;
    property: string;
    value: any;
    /**
     * @param matches whether the mediaQuery is currently activated
     * @param mediaQuery e.g. (min-width: 600px) and (max-width: 959px)
     * @param mqAlias e.g. gt-sm, md, gt-lg
     * @param suffix e.g. GtSM, Md, GtLg
     * @param priority the priority of activation for the given breakpoint
     */
    constructor(matches?: boolean, mediaQuery?: string, mqAlias?: string, suffix?: string, priority?: number);
    /** Create an exact copy of the MediaChange */
    clone(): MediaChange;
}
