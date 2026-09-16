import React from "react";

const CDN = "https://unpkg.com/lucide-static@0.451.0/icons/";

/**
 * Monochrome icon. Renders a Lucide glyph as a CSS mask so it inherits
 * currentColor. Icons are a substitution — Boring has no drawn icon set yet.
 */
export function Icon({ name, size = 20, color = "currentColor", strokeLook = "default", style, ...rest }) {
  const url = `url("${CDN}${name}.svg")`;
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      style={{
        display: "inline-block",
        flex: "none",
        width: size,
        height: size,
        background: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        opacity: strokeLook === "light" ? 0.72 : 1,
        ...style,
      }}
      {...rest}
    />
  );
}
