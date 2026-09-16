import React from "react";
import { Icon } from "./Icon.jsx";

const SIZES = {
  sm: { padding: "0 var(--space-4)", height: "var(--tap-min)", font: "var(--text-sm)" },
  md: { padding: "0 var(--space-5)", height: "var(--tap-min)", font: "var(--text-base)" },
  lg: { padding: "0 var(--space-6)", height: "var(--tap-comfortable)", font: "var(--text-lg)" },
};

const VARIANTS = {
  primary: {
    rest: { background: "var(--gradient-accent)", color: "var(--text-on-accent)", border: "1px solid var(--accent-hover)" },
    hover: { background: "var(--gradient-accent-hover)", border: "1px solid var(--petrol-700)" },
  },
  secondary: {
    rest: { background: "var(--gradient-card)", color: "var(--text-title)", border: "1px solid var(--border-default)" },
    hover: { background: "var(--paper-2)", border: "1px solid var(--border-strong)" },
  },
  quiet: {
    rest: { background: "transparent", color: "var(--text-link)", border: "1px solid transparent" },
    hover: { background: "var(--surface-accent-soft)" },
  },
  inverse: {
    rest: { background: "var(--gradient-inverse)", color: "var(--text-on-inverse)", border: "1px solid var(--surface-inverse)" },
    hover: { background: "var(--boring-color-action-hover)", border: "1px solid var(--boring-color-action-hover)" },
  },
};

/** The one call to action on a surface. Calm, wide, never shouting. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-text)",
        fontSize: s.font,
        fontWeight: "var(--weight-medium)",
        lineHeight: 1,
        letterSpacing: "0.005em",
        whiteSpace: "nowrap",
        borderRadius: "var(--radius-control)",
        cursor: disabled ? "not-allowed" : "pointer",
        textDecoration: "none",
        transition: "var(--transition-control), transform var(--duration-instant) var(--ease-out)",
        transform: press && !disabled ? "translateY(1px)" : "none",
        opacity: 1,
        ...v.rest,
        ...(hover && !disabled ? v.hover : null),
        ...(disabled ? {background:"var(--boring-color-surface-disabled)",color:"var(--boring-color-text-disabled)",borderColor:"transparent"} : null),
        ...style,
      }}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} size={size === "lg" ? 20 : 18} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={size === "lg" ? 20 : 18} /> : null}
    </Tag>
  );
}
