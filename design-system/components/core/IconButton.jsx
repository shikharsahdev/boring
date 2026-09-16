import React from "react";
import { Icon } from "./Icon.jsx";

/** A square tap target holding a single glyph. Used in headers and rows. */
export function IconButton({ name, label, size = "md", variant = "quiet", disabled = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const box = size === "sm" ? 40 : size === "lg" ? 56 : 48;
  const bg = variant === "filled" ? "var(--surface-card)" : "transparent";
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: box,
        height: box,
        borderRadius: "var(--radius-control)",
        border: variant === "filled" ? "1px solid var(--border-subtle)" : "1px solid transparent",
        background: hover && !disabled ? "var(--paper-2)" : bg,
        color: "var(--text-body)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "var(--boring-opacity-disabled)" : 1,
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={size === "sm" ? 18 : 22} />
    </button>
  );
}
