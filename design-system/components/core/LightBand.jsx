import React from "react";
/** A calm sky or butter surface for a welcome moment. */
export function LightBand({children,depth="pale",radius="none",style,...rest}) {
 return <div style={{position:"relative",overflow:"hidden",background:depth === "deep" ? "var(--boring-palette-butter)" : "var(--boring-color-surface-welcome)",borderRadius:radius === "none" ? 0 : radius === "sheet" ? "var(--radius-sheet)" : "var(--radius-xl)",...style}} {...rest}>{children}</div>;
}
