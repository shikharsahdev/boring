import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Native select in Boring's field shell. */
export function Select({ label, help, options = [], id, size = "lg", style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-text)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>
          {label}
        </label>
      ) : null}
      <div style={{ position: "relative", display: "flex" }}>
        <select
          id={fieldId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            width: "100%",
            height: size === "lg" ? "var(--tap-comfortable)" : "var(--tap-min)",
            padding: "0 var(--space-8) 0 var(--space-4)",
            fontFamily: "var(--font-text)",
            fontSize: "var(--text-base)",
            color: "var(--text-title)",
            background: "var(--surface-card)",
            border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-control)",
            boxShadow: focus ? "var(--focus-ring)" : "none",
            outline: "none",
            transition: "var(--transition-control)",
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const labelText = typeof o === "string" ? o : o.label;
            return <option key={value} value={value}>{labelText}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={18} style={{ position: "absolute", right: "var(--space-4)", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }} />
      </div>
      {help ? <p style={{ margin: 0, fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{help}</p> : null}
    </div>
  );
}
