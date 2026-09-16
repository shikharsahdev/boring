import * as React from "react";

/** Radio group rendered as stacked selectable rows. */
export interface RadioProps {
  name?: string;
  options?: Array<string | { value: string; label: string; help?: string }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export declare function Radio(props: RadioProps): JSX.Element;
