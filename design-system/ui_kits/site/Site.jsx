const NS = window.BoringDesignSystem_7ec2e7;
const { Button, Icon } = NS;
const { LittleB, LightBand } = NS;

const pages = [
  { id: "home", label: "How it works" },
  { id: "plans", label: "Plans" },
  { id: "parents", label: "For your parents" },
];

function SiteNav({ page, go }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, background: "color-mix(in oklch, var(--paper-1) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-4) var(--space-8)" }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", border: "none", background: "none", padding: 0, cursor: "pointer" }}>
          <LittleB size={26} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 25, letterSpacing: "-0.02em", color: "var(--ink-1)" }} className="ds-wordmark">boring</span>
        </button>
        <nav style={{ display: "flex", gap: "var(--space-6)", flex: 1, minWidth: 0, overflow: "hidden" }}>
          {pages.map((p) => (
            <button key={p.id} onClick={() => go(p.id)} style={{
              border: "none", background: "none", padding: "var(--space-2) 0", cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "var(--font-text)", fontSize: "var(--text-sm)",
              color: page === p.id ? "var(--text-title)" : "var(--text-muted)",
              borderBottom: `1px solid ${page === p.id ? "var(--accent)" : "transparent"}`,
            }}>{p.label}</button>
          ))}
        </nav>
        
        <Button size="sm" onClick={() => go("parents")}>Let’s talk</Button>
      </div>
    </header>
  );
}

function Section({ children, tone, style }) {
  return (
    <section style={{ background: tone || "transparent", ...style }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-11) var(--space-8)" }}>{children}</div>
    </section>
  );
}

function FamilyIllustration({height=320}) {
 return <div style={{height,background:"var(--boring-palette-sky)",borderRadius:"160px 160px 26px 26px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24}}><LittleB size={180}/><p style={{fontSize:15}}>Good in the ordinary.</p></div>;
}
const ImagePlaceholder = FamilyIllustration;

function SiteFooter({ go }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--paper-2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "var(--space-8)", maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-9) var(--space-8)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <LittleB size={24} />
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 25, color: "var(--ink-1)" }} className="ds-wordmark">boring</p>
          </div>
          <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-xs)", color: "var(--text-muted)", maxWidth: "28ch" }}>
            Preventive healthcare for Indian families, at home and abroad.
          </p>
        </div>
        {[["Product", ["How it works", "Plans", "For your parents", "Cities we cover"]],
          ["Company", ["About", "Our doctors", "Careers", "Contact"]],
          ["Legal", ["Privacy", "Terms", "Data in India"]]].map(([h, items]) => (
          <div key={h}>
            <p className="ds-label" style={{ margin: "0 0 var(--space-3)" }}>{h}</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-2)" }}>
              {items.map((i) => <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); go("home"); }} style={{ fontSize: "var(--text-xs)", color: "var(--text-body)", textDecoration: "none" }}>{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--space-8) var(--space-8)", fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>
        © 2026 Boring Health Pvt Ltd · Bengaluru
      </div>
    </footer>
  );
}

Object.assign(window, { SiteNav, Section, SiteFooter, ImagePlaceholder, LightBand, LittleB });
