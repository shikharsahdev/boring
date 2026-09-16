import React from "react";

/** Hover/tap explanation for a term or a lab marker. */
export function Tooltip({ children, content, placement = "top", style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos =
    placement === "bottom"
      ? { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
      : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      {...rest}
    >
      {children}
      {open ? (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 30,
            width: "max-content",
            maxWidth: 260,
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface-inverse)",
            color: "var(--text-on-inverse)",
            fontFamily: "var(--font-text)",
            fontSize: "var(--text-xs)",
            lineHeight: "var(--leading-normal)",
            boxShadow: "var(--shadow-raised)",
            ...pos,
          }}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
