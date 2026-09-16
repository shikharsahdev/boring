import * as React from "react";

/** A square tap target holding one glyph. */
export interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name */
  name: string;
  /** Required accessible label */
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "quiet" | "filled";
  disabled?: boolean;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
