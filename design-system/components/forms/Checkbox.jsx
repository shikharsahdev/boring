import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Checkbox with a large tappable row. */
export function Checkbox({ label, help, checked, defaultChecked, onChange, disabled = false, style, ...rest }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked === undefined ? internal : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return (
    <label
      onClick={toggle}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        minHeight: "var(--tap-min)",
        padding: "var(--space-2) 0",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
          width: 24,
          height: 24,
          marginTop: 2,
          borderRadius: "var(--radius-xs)",
          border: `1px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
          background: on ? "var(--accent)" : "var(--surface-card)",
          color: "var(--text-on-accent)",
          transition: "var(--transition-control)",
        }}
      >
        {on ? <Icon name="check" size={16} /> : null}
      </span>
      <span>
        <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-base)", color: "var(--text-title)" }}>{label}</span>
        {help ? <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{help}</span> : null}
      </span>
    </label>
  );
}
