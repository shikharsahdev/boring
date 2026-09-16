import * as React from "react";

/** Centred dialog, or a bottom sheet on narrow screens. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** Action row, usually two Buttons */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** "sheet" pins it to the bottom edge — the mobile default */
  variant?: "auto" | "sheet";
}

export declare function Dialog(props: DialogProps): JSX.Element | null;
