import * as React from "react";

/**
 * The one call to action on a surface.
 * @startingPoint section="Core" subtitle="Primary, secondary, quiet and inverse buttons" viewport="700x180"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** primary = the single next step; secondary = alternatives; quiet = inline/text; inverse = on dark grounds */
  variant?: "primary" | "secondary" | "quiet" | "inverse";
  /** md = 48px (default), lg = 56px for parent-facing screens */
  size?: "sm" | "md" | "lg";
  /** Lucide icon name, e.g. "phone" */
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button> */
  href?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
