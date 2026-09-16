import * as React from "react";

/** Outlined chip for filters, categories and selections. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  selected?: boolean;
  /** Shows an x; called on click */
  onRemove?: () => void;
  size?: "sm" | "md";
}

export declare function Tag(props: TagProps): JSX.Element;
