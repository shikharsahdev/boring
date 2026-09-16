import * as React from "react";

/** Checkbox with a large tappable row and optional help line. */
export interface CheckboxProps {
  label?: React.ReactNode;
  help?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
