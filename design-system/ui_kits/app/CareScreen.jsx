const { Card, Button, Input, Icon, Tag } = window.BoringDesignSystem_7ec2e7;

const thread = [
  { from: "them", who: "Priya", time: "Mon 9:12am", text: "Good morning. Sarita's Vitamin D has come up from 21 to 29 — the supplement is working. Dr Rao suggests staying on it for another three months." },
  { from: "you", time: "Mon 9:40am", text: "Thanks Priya. Should we move her panel earlier?" },
  { from: "them", who: "Priya", time: "Mon 10:02am", text: "No need. March is fine. I've kept the 18th free and will call her the evening before, as usual." },
];

function CareScreen() {
  const [draft, setDraft] = React.useState("");
  return (
    <>
      <AppHeader
        subtitle="Care team"
        title="Priya Kulkarni"
        action={<Button variant="secondary" size="sm" iconLeft="phone">Call</Button>}
      />
      <div style={{ display: "flex", gap: "var(--space-2)", padding: "0 var(--space-5) var(--space-4)" }}>
        <Tag size="sm">Ask about a result</Tag>
        <Tag size="sm">Reschedule</Tag>
        <Tag size="sm">Medicines</Tag>
      </div>
      <Scroll>
        <div style={{ display: "grid", gap: "var(--space-4)", paddingTop: "var(--space-2)" }}>
          {thread.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "you" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "84%" }}>
                <p style={{ margin: "0 0 4px", fontSize: "var(--text-2xs)", letterSpacing: "0.04em", color: "var(--text-muted)", textAlign: m.from === "you" ? "right" : "left" }}>
                  {m.who ? m.who + " · " : ""}{m.time}
                </p>
                <div style={{
                  padding: "var(--space-4) var(--space-5)",
                  borderRadius: m.from === "you" ? "18px 18px 6px 18px" : "18px 18px 18px 6px",
                  background: m.from === "you" ? "var(--surface-accent-soft)" : "var(--surface-card)",
                  border: m.from === "you" ? "1px solid transparent" : "1px solid var(--border-subtle)",
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--text-body)",
                }}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Card tone="sunken" padding="sm" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
          <Icon name="phone-call" size={22} style={{ color: "var(--sage-600)" }} />
          <p style={{ margin: 0, flex: 1, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            If anything looks urgent, we call you. You never have to watch this screen.
          </p>
        </Card>
      </Scroll>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-3)", padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
        <Input placeholder="Write to Priya" size="md" value={draft} onChange={(e) => setDraft(e.target.value)} style={{ flex: 1 }} />
        <Button iconLeft="send" onClick={() => setDraft("")} aria-label="Send">Send</Button>
      </div>
    </>
  );
}

Object.assign(window, { CareScreen });
