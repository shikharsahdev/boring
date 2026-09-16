const { Card, Badge, Button, Icon } = window.BoringDesignSystem_7ec2e7;

function ParentCard({ name, relation, city, age, status, statusLabel, note, onOpen }) {
  return (
    <Card padding="md" style={{ display: "grid", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, flex: "none", borderRadius: 999, background: "var(--paper-2)", color: "var(--ink-3)", fontFamily: "var(--font-display)", fontSize: 17 }}>
          {name[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", lineHeight: 1.25, color: "var(--text-title)" }}>{name}</p>
          <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{relation} · {age} · {city}</p>
        </div>
        <div style={{ flex: "none" }}><Badge status={status}>{statusLabel}</Badge></div>
      </div>
      <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{note}</p>
      <Button variant="secondary" fullWidth onClick={onOpen} iconRight="arrow-right">See {name.split(" ")[0]}'s results</Button>
    </Card>
  );
}

function HomeScreen({ go }) {
  return (
    <>
      <AppHeader subtitle="Tuesday, 10 March" title="Your family" action={<IconBell />} />
      <Scroll>
        <Card tone="accent" padding="md" style={{ display: "grid", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          <p className="ds-label" style={{ margin: 0, color: "var(--petrol-700)" }}>Next up</p>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--text-title)", letterSpacing: "var(--tracking-tight)" }}>
            Blood panel at home, 18 March
          </p>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--petrol-700)" }}>7–9am · Kothrud, Pune · for Sarita</p>
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
            <Button onClick={() => go("visits")}>Confirm slot</Button>
            <Button variant="quiet" onClick={() => go("visits")}>Reschedule</Button>
          </div>
        </Card>

        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <ParentCard name="Sarita Deshpande" relation="Mother" age="64" city="Pune" status="normal" statusLabel="In range" note="Last panel 12 December. Thyroid steady, Vitamin D still low — she's on the supplement Dr Rao suggested." onOpen={() => go("results")} />
          <ParentCard name="Anil Deshpande" relation="Father" age="69" city="Pune" status="attention" statusLabel="Panel due" note="Last panel was in June. We'll book the next one with the same visit as Sarita's." onOpen={() => go("results")} />
        </div>

        <Card padding="md" tone="sunken" style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
          <Icon name="message-circle" size={26} style={{ color: "var(--sage-600)" }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>Priya, your care manager</p>
            <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Replies in about an hour, 9am–7pm IST</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => go("care")}>Message</Button>
        </Card>
      </Scroll>
    </>
  );
}

function IconBell() {
  const { IconButton } = window.BoringDesignSystem_7ec2e7;
  return <IconButton name="bell" label="Reminders" />;
}

Object.assign(window, { HomeScreen, ParentCard });
