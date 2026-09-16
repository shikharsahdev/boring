const { Card, Switch, Checkbox, Button, Badge, Icon, Tabs } = window.BoringDesignSystem_7ec2e7;

function YouScreen() {
  const [lang, setLang] = React.useState("English");
  return (
    <>
      <AppHeader subtitle="Account" title="You" />
      <Scroll>
        <Card padding="md" style={{ display: "grid", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="ds-label" style={{ margin: 0 }}>Your plan</p>
            <Badge status="normal">Active</Badge>
          </div>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--text-title)", letterSpacing: "var(--tracking-tight)" }}>
            Family of two parents
          </p>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
            ₹2,400 a month, billed to your card in London. Four panels, four consults and an ongoing care team per parent, each year.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
            <Button variant="secondary" size="sm">See invoices</Button>
            <Button variant="quiet" size="sm">Add a parent</Button>
          </div>
        </Card>

        <p className="ds-label" style={{ margin: "var(--space-7) 0 var(--space-2)" }}>How we reach you</p>
        <Card padding="md" style={{ display: "grid", gap: "var(--space-4)" }}>
          <Switch label="Call me before every lab visit" help="The day before, 6–8pm IST." defaultChecked />
          <Switch label="Text the quarterly summary" help="One message per parent, per panel." defaultChecked />
          <Switch label="Weekly digest" help="Most families turn this off. Nothing changes weekly." />
        </Card>

        <p className="ds-label" style={{ margin: "var(--space-7) 0 var(--space-2)" }}>Language</p>
        <Tabs size="sm" tabs={["English", "हिन्दी", "मराठी"]} value={lang} onChange={setLang} />
        <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          Your parents can pick a different language from yours. Reports and voice notes follow their choice.
        </p>

        <p className="ds-label" style={{ margin: "var(--space-7) 0 var(--space-2)" }}>Sharing</p>
        <Card padding="md" style={{ display: "grid", gap: "var(--space-2)" }}>
          <Checkbox label="Share reports with my sister" help="She'll get the same summaries you do." defaultChecked />
          <Checkbox label="Share with Dr Rao's clinic" help="For consults outside Boring." />
        </Card>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-7)" }}>
          <Icon name="shield-check" size={20} style={{ color: "var(--ink-3)" }} />
          <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Reports stay in India. You can export or delete everything at any time.</p>
        </div>
      </Scroll>
    </>
  );
}

Object.assign(window, { YouScreen });
