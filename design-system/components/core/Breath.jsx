import React from "react";

/** Little b. The Breath export remains as a compatibility alias. */
export function LittleB({ size = 34, color = "var(--boring-color-brand-character)", state = "still", style, ...rest }) {
 const waiting = state === "waiting";
 return <span role="img" aria-label={waiting ? "Loading" : "Boring little b"} style={{display:"inline-flex",flex:"none",lineHeight:0,...style}} {...rest}>
  <svg className={waiting ? "boring-loader" : undefined} viewBox="0 0 128 136" width={size} height={size * 136 / 128} aria-hidden="true">
   <g className={waiting ? "boring-loader__body" : undefined}>
    <path fill={color} d="M35 10C25 10 19 17 19 28v57c0 25 18 42 44 42 28 0 48-19 48-46 0-26-18-44-43-44-7 0-12 1-17 4V28c0-11-6-18-16-18Z"/>
    <g fill="none" stroke="var(--boring-color-brand-face)" strokeWidth="5" strokeLinecap="round">
     <g className={waiting ? "boring-loader-eyes" : undefined}><path d="M54 68v3M80 68v3"/></g><path d="M52 85c6 13 23 16 32-1"/>
    </g>
   </g>
  </svg>
 </span>;
}
export const Breath = LittleB;
