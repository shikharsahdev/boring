import React from "react";

/** Radio group rendered as stacked selectable rows. */
export function Radio({ name, options = [], value, defaultValue, onChange, style, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value === undefined ? internal : value;
  const pick = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const labelText = typeof o === "string" ? o : o.label;
        const help = typeof o === "string" ? null : o.help;
        const on = current === v;
        return (
          <label
            key={v}
            onClick={() => pick(v)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-3)",
              minHeight: "var(--tap-min)",
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius-control)",
              border: `1px solid ${on ? "var(--accent)" : "var(--border-subtle)"}`,
              background: on ? "var(--surface-accent-soft)" : "var(--surface-card)",
              cursor: "pointer",
              transition: "var(--transition-control)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
                width: 22,
                height: 22,
                marginTop: 2,
                borderRadius: 999,
                border: `1px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
                background: "var(--surface-card)",
              }}
            >
              {on ? <span style={{ width: 11, height: 11, borderRadius: 999, background: "var(--accent)" }} /> : null}
            </span>
            <span>
              <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-base)", color: "var(--text-title)" }}>{labelText}</span>
              {help ? <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{help}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
