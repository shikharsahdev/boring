const NS = window.BoringDesignSystem_7ec2e7;
const { Icon, IconButton } = NS;
const { LittleB, LightBand } = NS;

const navItems = [
  { id: "home", label: "Home", icon: "house" },
  { id: "results", label: "Results", icon: "flask-conical" },
  { id: "visits", label: "Visits", icon: "calendar-check" },
  { id: "care", label: "Care team", icon: "message-circle" },
  { id: "you", label: "You", icon: "user-round" },
];

function AppHeader({ title, subtitle, onBack, action }) {
  return (
    <LightBand style={{ padding: "10px var(--space-5) var(--space-6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-numeric)", fontSize: 13, color: "var(--ink-2)" }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: 6 }}><Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-full" size={14} /></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", margin: "var(--space-5) 0" }}>
        <LittleB size={26} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", letterSpacing: "-0.02em", color: "var(--petrol-700)" }} className="ds-wordmark">boring</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        {onBack ? <IconButton name="chevron-left" label="Back" onClick={onBack} style={{ marginLeft: -12 }} /> : null}
        <div style={{ flex: 1, minWidth: 0 }}>
          {subtitle ? <p className="ds-label" style={{ margin: "0 0 2px", color: "var(--ink-2)" }}>{subtitle}</p> : null}
          <h1 style={{ fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)" }}>{title}</h1>
        </div>
        {action}
      </div>
    </LightBand>
  );
}

function BottomNav({ tab, onChange }) {
  return (
    <nav style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)", paddingBottom: 6 }}>
      {navItems.map((n) => {
        const on = tab === n.id;
        return (
          <button
            key={n.id}
            onClick={() => onChange(n.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
              minHeight: "var(--tap-comfortable)", padding: "var(--space-2) 0", border: "none", background: "none",
              color: on ? "var(--accent)" : "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--font-text)", fontSize: 13, letterSpacing: "0.01em",
            }}
          >
            <Icon name={n.icon} size={22} />
            {n.label}
          </button>
        );
      })}
    </nav>
  );
}

function Phone({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-7) 0" }}>
      <div style={{ width: "min(390px, 100%)", height: 780, borderRadius: 44, padding: 10, background: "var(--paper-3)", boxShadow: "var(--shadow-raised)" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", borderRadius: 36, overflow: "hidden", background: "var(--gradient-page)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px var(--space-6) 0", fontFamily: "var(--font-numeric)", fontSize: 13, color: "var(--ink-2)", position: "relative", zIndex: 3 }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: 6 }}><Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-full" size={14} /></span>
    </div>
  );
}

function Scroll({ children }) {
  return <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5) var(--space-5) var(--space-8)" }}>{children}</div>;
}

Object.assign(window, { AppHeader, BottomNav, Phone, StatusBar, Scroll, navItems });
