import * as React from "react";

/**
 * Text field with label, help text and validation note.
 * @startingPoint section="Forms" subtitle="Fields, select, checkbox, radio, switch" viewport="700x320"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Quiet guidance under the field */
  help?: string;
  /** Replaces help when something needs correcting */
  note?: string;
  /** lg = 56px (default), md = 48px */
  size?: "md" | "lg";
  invalid?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
