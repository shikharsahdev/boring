import * as React from "react";

/**
 * Underlined tab bar for switching between views of one subject.
 * @startingPoint section="Navigation" subtitle="Underlined tabs with optional counts" viewport="700x120"
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: Array<string | { value: string; label: string; count?: number }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
}

export declare function Tabs(props: TabsProps): JSX.Element;
