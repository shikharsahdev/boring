import * as React from "react";

/**
 * A sky or butter welcome surface.
 * @startingPoint section="Brand" subtitle="Sky and butter welcome surfaces" viewport="700x260"
 */
export interface LightBandProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** pale = sky; deep = butter. Both use ink text. */
  depth?: "pale" | "deep";
  radius?: "none" | "xl" | "sheet";
}

export declare function LightBand(props: LightBandProps): JSX.Element;
