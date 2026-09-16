import * as React from "react";
/** Little b identity; Breath is retained for compatibility. */
export interface BreathProps extends React.HTMLAttributes<HTMLSpanElement> {
 size?: number;
 /** Character fill; defaults to butter. Face remains ink. */
 color?: string;
 state?: "still" | "waiting";
}
export declare function LittleB(props: BreathProps): JSX.Element;
export declare const Breath: typeof LittleB;
