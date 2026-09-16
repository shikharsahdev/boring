import * as React from "react";

/** Hover or tap explanation for a term or lab marker. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  content?: React.ReactNode;
  placement?: "top" | "bottom";
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
