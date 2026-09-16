import React from "react";

/** Switch for settings that take effect immediately. */
export function Switch({ label, help, checked, defaultChecked, onChange, disabled = false, style, ...rest }) {
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
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-5)",
        minHeight: "var(--tap-min)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      {...rest}
    >
      <span>
        <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-base)", color: "var(--text-title)" }}>{label}</span>
        {help ? <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{help}</span> : null}
      </span>
      <span
        role="switch"
        aria-checked={on}
        style={{
          position: "relative",
          flex: "none",
          width: 52,
          height: 32,
          borderRadius: 999,
          background: on ? "var(--sage-600)" : "var(--paper-3)",
          border: `1px solid ${on ? "var(--sage-600)" : "var(--border-default)"}`,
          transition: "background-color var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: on ? 23 : 3,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "var(--boring-color-surface-card)",
            boxShadow: "var(--shadow-card)",
            transition: "left var(--duration-base) var(--ease-out)",
          }}
        />
      </span>
    </label>
  );
}
