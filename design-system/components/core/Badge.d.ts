import * as React from "react";

/** Small state label with an optional status dot. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** normal = in range / handled; attention = due soon; action = needs a human; neutral = informational */
  status?: "normal" | "attention" | "action" | "neutral";
  dot?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
