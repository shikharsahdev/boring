import React from "react";
import { Icon } from "../core/Icon.jsx";

const TONES = {
  calm: { background: "var(--gradient-inverse)", color: "var(--text-on-inverse)", icon: "check" },
  attention: { background: "var(--sun-100)", color: "var(--sun-700)", icon: "clock" },
};

/** Quiet confirmation that something was recorded. Fades in, fades out. */
export function Toast({ children, tone = "calm", icon, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.calm;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        maxWidth: 420,
        padding: "var(--space-4) var(--space-5)",
        borderRadius: "var(--radius-md)",
        background: t.background,
        color: t.color,
        boxShadow: "var(--shadow-raised)",
        fontFamily: "var(--font-text)",
        fontSize: "var(--text-sm)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon || t.icon} size={18} />
      <span style={{ flex: 1 }}>{children}</span>
      {onDismiss ? (
        <span onClick={onDismiss} style={{ display: "inline-flex", cursor: "pointer", opacity: 0.7 }}>
          <Icon name="x" size={16} />
        </span>
      ) : null}
    </div>
  );
}
