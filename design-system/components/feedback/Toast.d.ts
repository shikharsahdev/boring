import * as React from "react";

/** Quiet confirmation that something was recorded. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tone?: "calm" | "attention";
  /** Lucide icon name; defaults by tone */
  icon?: string;
  onDismiss?: () => void;
}

export declare function Toast(props: ToastProps): JSX.Element;
