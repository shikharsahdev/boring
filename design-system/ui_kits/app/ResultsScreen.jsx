const { Tabs, Card, Badge, Tooltip, Icon, Button } = window.BoringDesignSystem_7ec2e7;

const markers = {
  Sarita: [
    { name: "HbA1c", value: "5.4", unit: "%", range: "4.0 – 5.6", status: "normal", trend: "Same as December", help: "HbA1c shows average blood sugar over about three months." },
    { name: "LDL cholesterol", value: "112", unit: "mg/dL", range: "under 100", status: "attention", trend: "Up from 104", help: "LDL is the cholesterol that collects in artery walls." },
    { name: "TSH", value: "2.18", unit: "mIU/L", range: "0.4 – 4.0", status: "normal", trend: "Steady since June", help: "TSH tells us how hard the thyroid is being asked to work." },
    { name: "Vitamin D", value: "29.0", unit: "ng/mL", range: "30 – 60", status: "attention", trend: "Up from 21", help: "Low Vitamin D is common and slow to correct." },
    { name: "Haemoglobin", value: "13.1", unit: "g/dL", range: "12 – 15", status: "normal", trend: "Same as December" },
    { name: "Creatinine", value: "0.8", unit: "mg/dL", range: "0.6 – 1.1", status: "normal", trend: "Same as December" },
  ],
  Anil: [
    { name: "HbA1c", value: "6.1", unit: "%", range: "4.0 – 5.6", status: "attention", trend: "Up from 5.8", help: "HbA1c shows average blood sugar over about three months." },
    { name: "LDL cholesterol", value: "96", unit: "mg/dL", range: "under 100", status: "normal", trend: "Down from 118" },
    { name: "TSH", value: "1.74", unit: "mIU/L", range: "0.4 – 4.0", status: "normal", trend: "Steady" },
  ],
};

function MarkerRow({ m }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--text-title)" }}>
          {m.help ? (
            <Tooltip content={m.help}>
              <span style={{ borderBottom: "1px dashed var(--border-strong)", cursor: "help" }}>{m.name}</span>
            </Tooltip>
          ) : m.name}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{m.trend} · normal {m.range}</p>
      </div>
      <p className="ds-num" style={{ margin: 0, fontSize: "var(--text-xl)", color: "var(--text-title)", textAlign: "right" }}>
        {m.value}<span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}> {m.unit}</span>
      </p>
      <span style={{ width: 9, height: 9, borderRadius: 999, flex: "none", background: m.status === "normal" ? "var(--status-normal)" : "var(--status-attention)" }} />
    </div>
  );
}

function ResultsScreen({ go }) {
  const [who, setWho] = React.useState("Sarita");
  const rows = markers[who];
  const flagged = rows.filter((r) => r.status !== "normal").length;
  return (
    <>
      <AppHeader subtitle="Panel of 12 December" title="Results" action={<IconDownload />} />
      <div style={{ padding: "0 var(--space-5)" }}>
        <Tabs size="sm" tabs={["Sarita", "Anil"]} value={who} onChange={setWho} />
      </div>
      <Scroll>
        <Card tone={flagged ? "attention" : "calm"} padding="md" style={{ display: "grid", gap: "var(--space-3)", margin: "var(--space-5) 0 var(--space-4)" }}>
          <p className="ds-label" style={{ margin: 0, color: flagged ? "var(--sun-700)" : "var(--sage-700)" }}>Doctor's read</p>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", lineHeight: "var(--leading-snug)", color: "var(--text-title)" }}>
            {flagged
              ? `${flagged} markers to keep an eye on. Nothing that needs a hospital.`
              : "Everything is in range. Nothing to do this quarter."}
          </p>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
            Dr Rao read this on 14 December and left a two-minute voice note for {who}.
          </p>
          <Button variant="secondary" iconLeft="play" style={{ justifySelf: "start" }}>Play voice note</Button>
        </Card>
        <p className="ds-label" style={{ margin: "var(--space-5) 0 0" }}>All 12 markers</p>
        {rows.map((m) => <MarkerRow key={m.name} m={m} />)}
        <Button variant="quiet" iconRight="arrow-right" style={{ marginTop: "var(--space-5)" }} onClick={() => go("care")}>Ask Priya about a result</Button>
      </Scroll>
    </>
  );
}

function IconDownload() {
  const { IconButton } = window.BoringDesignSystem_7ec2e7;
  return <IconButton name="download" label="Download report" />;
}

Object.assign(window, { ResultsScreen, MarkerRow });
