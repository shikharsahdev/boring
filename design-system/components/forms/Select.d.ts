import * as React from "react";

/** Native select in Boring's field shell. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  help?: string;
  options?: Array<string | { value: string; label: string }>;
  size?: "md" | "lg";
}

export declare function Select(props: SelectProps): JSX.Element;
