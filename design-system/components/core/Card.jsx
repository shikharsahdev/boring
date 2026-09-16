import React from "react";

const TONES = {
  paper: { background: "var(--gradient-card)", border: "1px solid var(--border-subtle)" },
  sunken: { background: "var(--gradient-sunken)", border: "1px solid transparent" },
  accent: { background: "var(--gradient-accent-soft)", border: "1px solid transparent" },
  calm: { background: "var(--gradient-calm-soft)", border: "1px solid transparent" },
  attention: { background: "var(--gradient-attention-soft)", border: "1px solid transparent" },
  inverse: { background: "var(--gradient-inverse)", border: "1px solid var(--surface-inverse)" },
};

/** The default container. Hairline border, warm paper fill, shadow only if it floats. */
export function Card({ children, tone = "paper", padding = "md", elevation = "flat", as = "div", style, ...rest }) {
  const Tag = as;
  const pad = padding === "none" ? 0 : padding === "sm" ? "var(--space-4)" : padding === "lg" ? "var(--space-7)" : "var(--card-padding)";
  return (
    <Tag
      style={{
        borderRadius: "var(--radius-card)",
        padding: pad,
        color: tone === "inverse" ? "var(--text-on-inverse)" : "var(--text-body)",
        boxShadow: elevation === "raised" ? "var(--shadow-raised)" : elevation === "card" ? "var(--shadow-card)" : "none",
        ...TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
