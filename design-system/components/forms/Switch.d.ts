import * as React from "react";

/** Switch for settings that take effect immediately. */
export interface SwitchProps {
  label?: React.ReactNode;
  help?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Switch(props: SwitchProps): JSX.Element;
