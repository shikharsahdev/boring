import React from "react";

/** Underlined tab bar for switching between views of the same subject. */
export function Tabs({ tabs = [], value, defaultValue, onChange, size = "md", style, ...rest }) {
  const first = tabs.length ? (typeof tabs[0] === "string" ? tabs[0] : tabs[0].value) : undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const current = value === undefined ? internal : value;
  const pick = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return (
    <div
      role="tablist"
      style={{ display: "flex", gap: "var(--space-6)", borderBottom: "1px solid var(--border-subtle)", ...style }}
      {...rest}
    >
      {tabs.map((t) => {
        const v = typeof t === "string" ? t : t.value;
        const labelText = typeof t === "string" ? t : t.label;
        const count = typeof t === "string" ? null : t.count;
        const on = current === v;
        return (
          <button
            key={v}
            role="tab"
            aria-selected={on}
            onClick={() => pick(v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: size === "sm" ? "0 0 var(--space-3)" : "var(--space-2) 0 var(--space-4)",
              minHeight: size === "sm" ? 36 : 44,
              background: "none",
              border: "none",
              borderBottom: `2px solid ${on ? "var(--accent)" : "transparent"}`,
              marginBottom: -1,
              fontFamily: "var(--font-text)",
              fontSize: size === "sm" ? "var(--text-sm)" : "var(--text-base)",
              fontWeight: on ? "var(--weight-medium)" : "var(--weight-regular)",
              color: on ? "var(--text-title)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "var(--transition-control)",
            }}
          >
            {labelText}
            {count != null ? (
              <span style={{ fontFamily: "var(--font-numeric)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
