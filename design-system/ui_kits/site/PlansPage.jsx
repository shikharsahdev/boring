const { Button, Card, Badge, Icon, Tabs, Checkbox } = window.BoringDesignSystem_7ec2e7;

const plans = [
  { name: "One parent", price: "₹1,400", per: "per month", includes: ["4 panels of 12 markers a year", "4 doctor consults", "A named care manager", "Reports in English, Hindi or Marathi"], cta: "Start with one parent" },
  { name: "Two parents", price: "₹2,400", per: "per month", featured: true, includes: ["Everything in One parent, twice", "One visit, both panels", "Shared family summary", "Add a sibling to the account"], cta: "Start with both" },
  { name: "Family plus", price: "₹3,600", per: "per month", includes: ["Up to four adults", "Two specialist referrals a year", "Medicine delivery co-ordination", "Priority slots in all six cities"], cta: "Talk to us" },
];

function PlansPage({ go }) {
  return (
    <>
      <Section>
        <div style={{ maxWidth: "40ch" }}>
          <p className="ds-label" style={{ margin: "0 0 var(--space-4)" }}>Plans</p>
          <h1 style={{ fontSize: "var(--text-5xl)", lineHeight: 1.1, margin: 0 }}>One price a month. No per-test surprises.</h1>
          <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>
            Illustrative plans and pricing. Confirm availability, services, and terms before launch.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-5)", marginTop: "var(--space-9)", alignItems: "start" }}>
          {plans.map((p) => (
            <Card key={p.name} padding="lg" tone={p.featured ? "accent" : "paper"} style={{ display: "grid", gap: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="ds-label" style={{ margin: 0, color: p.featured ? "var(--petrol-700)" : undefined }}>{p.name}</p>
                {p.featured ? <Badge status="action" dot={false}>Together</Badge> : null}
              </div>
              <p style={{ margin: 0, display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
                <span className="ds-num" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", color: "var(--text-title)" }}>{p.price}</span>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{p.per}</span>
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-3)" }}>
                {p.includes.map((i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--space-3)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>
                    <Icon name="check" size={17} style={{ color: "var(--sage-600)", marginTop: 3 }} />{i}
                  </li>
                ))}
              </ul>
              <Button fullWidth variant={p.featured ? "primary" : "secondary"} onClick={() => go("parents")}>{p.cta}</Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="var(--paper-2)">
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "var(--space-9)" }}>
          <h2 style={{ fontSize: "var(--text-3xl)", margin: 0 }}>What's in the panel</h2>
          <div>
            <Tabs size="sm" defaultValue="Standard" tabs={["Standard", "Diabetes add-on", "Heart add-on"]} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-4) var(--space-6)", marginTop: "var(--space-6)" }}>
              {["Complete blood count", "HbA1c", "Fasting glucose", "Lipid profile", "TSH", "Vitamin D", "Vitamin B12", "Creatinine & eGFR", "Liver panel", "Uric acid", "Urine routine", "Blood pressure & BMI"].map((m) => (
                <p key={m} style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--line-1)" }}>{m}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "var(--space-9)" }}>
          <h2 style={{ fontSize: "var(--text-3xl)", margin: 0 }}>Questions families ask</h2>
          <div style={{ display: "grid" }}>
            {[["Do my parents need a smartphone?", "No. Everything important arrives as a phone call and a printed report. The app is for you."],
              ["What if something is wrong?", "We call you, then your parents' doctor. We don't wait for anyone to open an app."],
              ["Can I add my in-laws later?", "Yes, at any point in the quarter. The price changes from the next bill, not retroactively."]].map(([q, a]) => (
              <div key={q} style={{ padding: "var(--space-5) 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--text-title)" }}>{q}</p>
                <p style={{ margin: "var(--space-2) 0 0", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)", maxWidth: "62ch" }}>{a}</p>
              </div>
            ))}
            <Checkbox style={{ marginTop: "var(--space-5)" }} label="Email me the full marker list" help="One email, no follow-ups." />
          </div>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { PlansPage });
