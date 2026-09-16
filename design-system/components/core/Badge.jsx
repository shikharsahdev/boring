import React from "react";

const STATUS = {
  normal: { color: "var(--sage-700)", background: "var(--status-normal-soft)", dot: "var(--status-normal)" },
  attention: { color: "var(--sun-700)", background: "var(--status-attention-soft)", dot: "var(--status-attention)" },
  action: { color: "var(--petrol-700)", background: "var(--status-action-soft)", dot: "var(--status-action)" },
  neutral: { color: "var(--stone-700)", background: "var(--status-neutral-soft)", dot: "var(--status-neutral)" },
};

/** Small state label: "In range", "Due in 3 weeks", "Needs your ok". */
export function Badge({ children, status = "neutral", dot = true, style, ...rest }) {
  const s = STATUS[status] || STATUS.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "5px var(--space-3)",
        borderRadius: "var(--radius-pill)",
        background: s.background,
        color: s.color,
        fontFamily: "var(--font-text)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-medium)",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot ? <span style={{ width: 7, height: 7, borderRadius: 999, background: s.dot, flex: "none" }} /> : null}
      {children}
    </span>
  );
}
