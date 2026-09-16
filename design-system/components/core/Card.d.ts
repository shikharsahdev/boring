import * as React from "react";

/**
 * The default container for grouped content.
 * @startingPoint section="Core" subtitle="Paper, sunken and tinted card tones" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  tone?: "paper" | "sunken" | "accent" | "calm" | "attention" | "inverse";
  padding?: "none" | "sm" | "md" | "lg";
  /** flat = hairline border only (default). card/raised only for things that float. */
  elevation?: "flat" | "card" | "raised";
  as?: keyof JSX.IntrinsicElements;
}

export declare function Card(props: CardProps): JSX.Element;
