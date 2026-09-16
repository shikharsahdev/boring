import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/** Centred dialog on desktop, bottom sheet on narrow screens. */
export function Dialog({ open = false, title, description, children, footer, onClose, variant = "auto", style, ...rest }) {
  if (!open) return null;
  const sheet = variant === "sheet";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        display: "flex",
        alignItems: sheet ? "flex-end" : "center",
        justifyContent: "center",
        background: "var(--boring-color-surface-scrim)",
        backdropFilter: "blur(3px)",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: sheet ? "100%" : "min(480px, calc(100% - 32px))",
          maxHeight: "88%",
          overflowY: "auto",
          padding: "var(--space-7)",
          background: "var(--gradient-card)",
          borderRadius: sheet ? "var(--radius-sheet) var(--radius-sheet) 0 0" : "var(--radius-xl)",
          boxShadow: sheet ? "var(--shadow-sheet)" : "var(--shadow-raised)",
          animation: `boring-dialog-in var(--duration-sheet) var(--ease-entrance)`,
          ...style,
        }}
        {...rest}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)" }}>
          <div>
            {title ? (
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-regular)", color: "var(--text-title)", letterSpacing: "var(--tracking-tight)" }}>
                {title}
              </h3>
            ) : null}
            {description ? (
              <p style={{ margin: "var(--space-3) 0 0", fontFamily: "var(--font-text)", fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>
                {description}
              </p>
            ) : null}
          </div>
          {onClose ? <IconButton name="x" label="Close" size="sm" onClick={onClose} /> : null}
        </div>
        {children ? <div style={{ marginTop: "var(--space-5)" }}>{children}</div> : null}
        {footer ? <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-7)" }}>{footer}</div> : null}
      </div>
    </div>
  );
}
