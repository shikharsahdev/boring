import * as React from "react";

/** Monochrome Lucide glyph rendered as a CSS mask so it inherits currentColor. */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, kebab-case, e.g. "calendar-check" */
  name: string;
  size?: number;
  color?: string;
  /** "light" drops opacity for decorative use */
  strokeLook?: "default" | "light";
}

export declare function Icon(props: IconProps): JSX.Element;
