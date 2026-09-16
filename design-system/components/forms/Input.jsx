import React from "react";

/** Text field with label, help and optional note. 56px tall for arm's-length use. */
export function Input({ label, help, note, id, type = "text", size = "lg", invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-text)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        type={type}
        aria-invalid={invalid || undefined}
        aria-describedby={help || note ? `${fieldId}-help` : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: size === "lg" ? "var(--tap-comfortable)" : "var(--tap-min)",
          padding: "0 var(--space-4)",
          fontFamily: "var(--font-text)",
          fontSize: "var(--text-base)",
          color: "var(--text-title)",
          background: "var(--surface-card)",
          border: `1px solid ${invalid ? "var(--boring-color-status-error-foreground)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-control)",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          outline: "none",
          transition: "var(--transition-control)",
        }}
        {...rest}
      />
      {help || note ? (
        <p id={`${fieldId}-help`} style={{ margin: 0, fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", color: invalid ? "var(--boring-color-status-error-foreground)" : "var(--text-muted)" }}>
          {note || help}
        </p>
      ) : null}
    </div>
  );
}
