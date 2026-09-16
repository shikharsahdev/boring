/* @ds-bundle: {"format":4,"namespace":"BoringDesignSystem_7ec2e7","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Breath","sourcePath":"components/core/Breath.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"LightBand","sourcePath":"components/core/LightBand.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"LittleB","sourcePath":"components/core/Breath.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"2619c1cb2717","components/core/Breath.jsx":"c0265a887c9b","components/core/Button.jsx":"fb4a21e72b19","components/core/Card.jsx":"4889eef33043","components/core/Icon.jsx":"6282b3ce3a08","components/core/IconButton.jsx":"6b73af41e325","components/core/LightBand.jsx":"f403e502994f","components/core/Tag.jsx":"7649b152d20c","components/feedback/Dialog.jsx":"99fe3fe981fe","components/feedback/Toast.jsx":"5e195411f8bb","components/feedback/Tooltip.jsx":"3836a8c77d71","components/forms/Checkbox.jsx":"6217720ad9f3","components/forms/Input.jsx":"e30fa318dd4a","components/forms/Radio.jsx":"9287bbf67392","components/forms/Select.jsx":"0f03a4cf634c","components/forms/Switch.jsx":"c4ec4b441d21","components/navigation/Tabs.jsx":"52add75d28f1"},"inlinedExternals":[],"unexposedExports":[]} */
(()=>{const ns=window.BoringDesignSystem_7ec2e7=window.BoringDesignSystem_7ec2e7||{};
// components/core/Icon.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = "https://unpkg.com/lucide-static@0.451.0/icons/";

/**
 * Monochrome icon. Renders a Lucide glyph as a CSS mask so it inherits
 * currentColor. Icons are a substitution — Boring has no drawn icon set yet.
 */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeLook = "default",
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    "data-icon": name,
    style: {
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
      ...style
    }
  }, rest));
}
Object.assign(ns,{Icon});
})();
// components/core/Badge.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS = {
  normal: {
    color: "var(--sage-700)",
    background: "var(--status-normal-soft)",
    dot: "var(--status-normal)"
  },
  attention: {
    color: "var(--sun-700)",
    background: "var(--status-attention-soft)",
    dot: "var(--status-attention)"
  },
  action: {
    color: "var(--petrol-700)",
    background: "var(--status-action-soft)",
    dot: "var(--status-action)"
  },
  neutral: {
    color: "var(--stone-700)",
    background: "var(--status-neutral-soft)",
    dot: "var(--status-neutral)"
  }
};

/** Small state label: "In range", "Due in 3 weeks", "Needs your ok". */
function Badge({
  children,
  status = "neutral",
  dot = true,
  style,
  ...rest
}) {
  const s = STATUS[status] || STATUS.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: s.dot,
      flex: "none"
    }
  }) : null, children);
}
Object.assign(ns,{Badge});
})();
// components/core/Breath.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Little b. The Breath remains as a compatibility alias. */
function LittleB({
  size = 34,
  color = "var(--boring-color-brand-character)",
  state = "still",
  style,
  ...rest
}) {
  const waiting = state === "waiting";
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": waiting ? "Loading" : "Boring little b",
    style: {
      display: "inline-flex",
      flex: "none",
      lineHeight: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    className: waiting ? "boring-loader" : undefined,
    viewBox: "0 0 128 136",
    width: size,
    height: size * 136 / 128,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    className: waiting ? "boring-loader__body" : undefined
  }, /*#__PURE__*/React.createElement("path", {
    fill: color,
    d: "M35 10C25 10 19 17 19 28v57c0 25 18 42 44 42 28 0 48-19 48-46 0-26-18-44-43-44-7 0-12 1-17 4V28c0-11-6-18-16-18Z"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "var(--boring-color-brand-face)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("g", {
    className: waiting ? "boring-loader-eyes" : undefined
  }, /*#__PURE__*/React.createElement("path", {
    d: "M54 68v3M80 68v3"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M52 85c6 13 23 16 32-1"
  })))));
}
const Breath = LittleB;
Object.assign(ns,{LittleB,Breath});
})();
// components/core/Button.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;
const SIZES = {
  sm: {
    padding: "0 var(--space-4)",
    height: "var(--tap-min)",
    font: "var(--text-sm)"
  },
  md: {
    padding: "0 var(--space-5)",
    height: "var(--tap-min)",
    font: "var(--text-base)"
  },
  lg: {
    padding: "0 var(--space-6)",
    height: "var(--tap-comfortable)",
    font: "var(--text-lg)"
  }
};
const VARIANTS = {
  primary: {
    rest: {
      background: "var(--gradient-accent)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--accent-hover)"
    },
    hover: {
      background: "var(--gradient-accent-hover)",
      border: "1px solid var(--petrol-700)"
    }
  },
  secondary: {
    rest: {
      background: "var(--gradient-card)",
      color: "var(--text-title)",
      border: "1px solid var(--border-default)"
    },
    hover: {
      background: "var(--paper-2)",
      border: "1px solid var(--border-strong)"
    }
  },
  quiet: {
    rest: {
      background: "transparent",
      color: "var(--text-link)",
      border: "1px solid transparent"
    },
    hover: {
      background: "var(--surface-accent-soft)"
    }
  },
  inverse: {
    rest: {
      background: "var(--gradient-inverse)",
      color: "var(--text-on-inverse)",
      border: "1px solid var(--surface-inverse)"
    },
    hover: {
      background: "var(--boring-color-action-hover)",
      border: "1px solid var(--boring-color-action-hover)"
    }
  }
};

/** The one call to action on a surface. Calm, wide, never shouting. */
function Button({
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
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      ...(disabled ? {
        background: "var(--boring-color-surface-disabled)",
        color: "var(--boring-color-text-disabled)",
        borderColor: "transparent"
      } : null),
      ...style
    }
  }, rest), iconLeft ? /*#__PURE__*/React.createElement(Icon, {
    name: iconLeft,
    size: size === "lg" ? 20 : 18
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: size === "lg" ? 20 : 18
  }) : null);
}
Object.assign(ns,{Button});
})();
// components/core/Card.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  paper: {
    background: "var(--gradient-card)",
    border: "1px solid var(--border-subtle)"
  },
  sunken: {
    background: "var(--gradient-sunken)",
    border: "1px solid transparent"
  },
  accent: {
    background: "var(--gradient-accent-soft)",
    border: "1px solid transparent"
  },
  calm: {
    background: "var(--gradient-calm-soft)",
    border: "1px solid transparent"
  },
  attention: {
    background: "var(--gradient-attention-soft)",
    border: "1px solid transparent"
  },
  inverse: {
    background: "var(--gradient-inverse)",
    border: "1px solid var(--surface-inverse)"
  }
};

/** The default container. Hairline border, warm paper fill, shadow only if it floats. */
function Card({
  children,
  tone = "paper",
  padding = "md",
  elevation = "flat",
  as = "div",
  style,
  ...rest
}) {
  const Tag = as;
  const pad = padding === "none" ? 0 : padding === "sm" ? "var(--space-4)" : padding === "lg" ? "var(--space-7)" : "var(--card-padding)";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      borderRadius: "var(--radius-card)",
      padding: pad,
      color: tone === "inverse" ? "var(--text-on-inverse)" : "var(--text-body)",
      boxShadow: elevation === "raised" ? "var(--shadow-raised)" : elevation === "card" ? "var(--shadow-card)" : "none",
      ...TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(ns,{Card});
})();
// components/core/IconButton.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;

/** A square tap target holding a single glyph. Used in headers and rows. */
function IconButton({
  name,
  label,
  size = "md",
  variant = "quiet",
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const box = size === "sm" ? 40 : size === "lg" ? 56 : 48;
  const bg = variant === "filled" ? "var(--surface-card)" : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size === "sm" ? 18 : 22
  }));
}
Object.assign(ns,{IconButton});
})();
// components/core/LightBand.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A calm sky or butter surface for a welcome moment. */
function LightBand({
  children,
  depth = "pale",
  radius = "none",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: depth === "deep" ? "var(--boring-palette-butter)" : "var(--boring-color-surface-welcome)",
      borderRadius: radius === "none" ? 0 : radius === "sheet" ? "var(--radius-sheet)" : "var(--radius-xl)",
      ...style
    }
  }, rest), children);
}
Object.assign(ns,{LightBand});
})();
// components/core/Tag.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;

/** Outlined chip for filters and categories. Selectable; optionally removable. */
function Tag({
  children,
  selected = false,
  onRemove,
  size = "md",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: "inline-flex",
      cursor: "pointer",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14
  })) : null);
}
Object.assign(ns,{Tag});
})();
// components/feedback/Dialog.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  IconButton
} = ns;

/** Centred dialog on desktop, bottom sheet on narrow screens. */
function Dialog({
  open = false,
  title,
  description,
  children,
  footer,
  onClose,
  variant = "auto",
  style,
  ...rest
}) {
  if (!open) return null;
  const sheet = variant === "sheet";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 40,
      display: "flex",
      alignItems: sheet ? "flex-end" : "center",
      justifyContent: "center",
      background: "var(--boring-color-surface-scrim)",
      backdropFilter: "blur(3px)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: sheet ? "100%" : "min(480px, calc(100% - 32px))",
      maxHeight: "88%",
      overflowY: "auto",
      padding: "var(--space-7)",
      background: "var(--gradient-card)",
      borderRadius: sheet ? "var(--radius-sheet) var(--radius-sheet) 0 0" : "var(--radius-xl)",
      boxShadow: sheet ? "var(--shadow-sheet)" : "var(--shadow-raised)",
      animation: `boring-dialog-in var(--duration-sheet) var(--ease-entrance)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-regular)",
      color: "var(--text-title)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-body)"
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(IconButton, {
    name: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  }) : null), children ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)"
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-7)"
    }
  }, footer) : null));
}
Object.assign(ns,{Dialog});
})();
// components/feedback/Toast.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;
const TONES = {
  calm: {
    background: "var(--gradient-inverse)",
    color: "var(--text-on-inverse)",
    icon: "check"
  },
  attention: {
    background: "var(--sun-100)",
    color: "var(--sun-700)",
    icon: "clock"
  }
};

/** Quiet confirmation that something was recorded. Fades in, fades out. */
function Toast({
  children,
  tone = "calm",
  icon,
  onDismiss,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.calm;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      maxWidth: 420,
      padding: "var(--space-4) var(--space-5)",
      borderRadius: "var(--radius-md)",
      background: t.background,
      color: t.color,
      boxShadow: "var(--shadow-raised)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Icon, {
    name: icon || t.icon,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onDismiss ? /*#__PURE__*/React.createElement("span", {
    onClick: onDismiss,
    style: {
      display: "inline-flex",
      cursor: "pointer",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  })) : null);
}
Object.assign(ns,{Toast});
})();
// components/feedback/Tooltip.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover/tap explanation for a term or a lab marker. */
function Tooltip({
  children,
  content,
  placement = "top",
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onClick: () => setOpen(o => !o)
  }, rest), children, open ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      zIndex: 30,
      width: "max-content",
      maxWidth: 260,
      padding: "var(--space-3) var(--space-4)",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-xs)",
      lineHeight: "var(--leading-normal)",
      boxShadow: "var(--shadow-raised)",
      ...pos
    }
  }, content) : null);
}
Object.assign(ns,{Tooltip});
})();
// components/forms/Checkbox.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;

/** Checkbox with a large tappable row. */
function Checkbox({
  label,
  help,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked === undefined ? internal : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      minHeight: "var(--tap-min)",
      padding: "var(--space-2) 0",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      width: 24,
      height: 24,
      marginTop: 2,
      borderRadius: "var(--radius-xs)",
      border: `1px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
      background: on ? "var(--accent)" : "var(--surface-card)",
      color: "var(--text-on-accent)",
      transition: "var(--transition-control)"
    }
  }, on ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-base)",
      color: "var(--text-title)"
    }
  }, label), help ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, help) : null));
}
Object.assign(ns,{Checkbox});
})();
// components/forms/Input.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text field with label, help and optional note. 56px tall for arm's-length use. */
function Input({
  label,
  help,
  note,
  id,
  type = "text",
  size = "lg",
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-title)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    "aria-invalid": invalid || undefined,
    "aria-describedby": help || note ? `${fieldId}-help` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: size === "lg" ? "var(--tap-comfortable)" : "var(--tap-min)",
      padding: "0 var(--space-4)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-base)",
      color: "var(--text-title)",
      background: "var(--surface-card)",
      border: `1px solid ${invalid ? "var(--boring-color-status-error-foreground)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: focus ? "var(--focus-ring)" : "none",
      outline: "none",
      transition: "var(--transition-control)"
    }
  }, rest)), help || note ? /*#__PURE__*/React.createElement("p", {
    id: `${fieldId}-help`,
    style: {
      margin: 0,
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-xs)",
      color: invalid ? "var(--boring-color-status-error-foreground)" : "var(--text-muted)"
    }
  }, note || help) : null);
}
Object.assign(ns,{Input});
})();
// components/forms/Radio.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio group rendered as stacked selectable rows. */
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value === undefined ? internal : value;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const labelText = typeof o === "string" ? o : o.label;
    const help = typeof o === "string" ? null : o.help;
    const on = current === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => pick(v),
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        minHeight: "var(--tap-min)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-control)",
        border: `1px solid ${on ? "var(--accent)" : "var(--border-subtle)"}`,
        background: on ? "var(--surface-accent-soft)" : "var(--surface-card)",
        cursor: "pointer",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: 22,
        height: 22,
        marginTop: 2,
        borderRadius: 999,
        border: `1px solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
        background: "var(--surface-card)"
      }
    }, on ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: 999,
        background: "var(--accent)"
      }
    }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-text)",
        fontSize: "var(--text-base)",
        color: "var(--text-title)"
      }
    }, labelText), help ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-text)",
        fontSize: "var(--text-xs)",
        color: "var(--text-muted)"
      }
    }, help) : null));
  }));
}
Object.assign(ns,{Radio});
})();
// components/forms/Select.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Icon
} = ns;

/** Native select in Boring's field shell. */
function Select({
  label,
  help,
  options = [],
  id,
  size = "lg",
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-title)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      width: "100%",
      height: size === "lg" ? "var(--tap-comfortable)" : "var(--tap-min)",
      padding: "0 var(--space-8) 0 var(--space-4)",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-base)",
      color: "var(--text-title)",
      background: "var(--surface-card)",
      border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-control)",
      boxShadow: focus ? "var(--focus-ring)" : "none",
      outline: "none",
      transition: "var(--transition-control)"
    }
  }, rest), options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const labelText = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, labelText);
  })), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      position: "absolute",
      right: "var(--space-4)",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)"
    }
  })), help ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, help) : null);
}
Object.assign(ns,{Select});
})();
// components/forms/Switch.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Switch for settings that take effect immediately. */
function Switch({
  label,
  help,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked === undefined ? internal : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      minHeight: "var(--tap-min)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-base)",
      color: "var(--text-title)"
    }
  }, label), help ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-text)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, help) : null), /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      position: "relative",
      flex: "none",
      width: 52,
      height: 32,
      borderRadius: 999,
      background: on ? "var(--sage-600)" : "var(--paper-3)",
      border: `1px solid ${on ? "var(--sage-600)" : "var(--border-default)"}`,
      transition: "background-color var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: on ? 23 : 3,
      width: 24,
      height: 24,
      borderRadius: 999,
      background: "var(--boring-color-surface-card)",
      boxShadow: "var(--shadow-card)",
      transition: "left var(--duration-base) var(--ease-out)"
    }
  })));
}
Object.assign(ns,{Switch});
})();
// components/navigation/Tabs.jsx
(()=>{
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underlined tab bar for switching between views of the same subject. */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const first = tabs.length ? typeof tabs[0] === "string" ? tabs[0] : tabs[0].value : undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? first);
  const current = value === undefined ? internal : value;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), tabs.map(t => {
    const v = typeof t === "string" ? t : t.value;
    const labelText = typeof t === "string" ? t : t.label;
    const count = typeof t === "string" ? null : t.count;
    const on = current === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(v),
      style: {
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
        transition: "var(--transition-control)"
      }
    }, labelText, count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-numeric)",
        fontSize: "var(--text-2xs)",
        color: "var(--text-muted)"
      }
    }, count) : null);
  }));
}
Object.assign(ns,{Tabs});
})();
})();
