import React from "react";
import { Icon } from "./Icon.jsx";

/** Outlined chip for filters and categories. Selectable; optionally removable. */
export function Tag({ children, selected = false, onRemove, size = "md", style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: size === "sm" ? 32 : 38,
        padding: "0 var(--space-4)",
        borderRadius: "var(--radius-chip)",
        border: `1px solid ${selected ? "var(--accent)" : hover ? "var(--border-strong)" : "var(--border-default)"}`,
        background: selected ? "var(--surface-accent-soft)" : "transparent",
        color: selected ? "var(--petrol-700)" : "var(--text-body)",
        fontFamily: "var(--font-text)",
        fontSize: size === "sm" ? "var(--text-xs)" : "var(--text-sm)",
        cursor: rest.onClick ? "pointer" : "default",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove ? (
        <span onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ display: "inline-flex", cursor: "pointer", opacity: 0.7 }}>
          <Icon name="x" size={14} />
        </span>
      ) : null}
    </span>
  );
}
