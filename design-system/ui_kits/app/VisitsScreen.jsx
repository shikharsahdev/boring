const { Card, Radio, Select, Input, Button, Dialog, Toast, Badge } = window.BoringDesignSystem_7ec2e7;

function VisitsScreen({ go }) {
  const [place, setPlace] = React.useState("home");
  const [slot, setSlot] = React.useState("Tue 18 March, 7–9am");
  const [confirming, setConfirming] = React.useState(false);
  const [booked, setBooked] = React.useState(false);

  return (
    <>
      <AppHeader subtitle="Quarterly panel" title="Book the visit" />
      <Scroll>
        <Card padding="md" style={{ display: "grid", gap: "var(--space-5)" }}>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <p className="ds-label" style={{ margin: 0 }}>Where</p>
            <Radio
              value={place}
              onChange={setPlace}
              options={[
                { value: "home", label: "At home", help: "A phlebotomist visits. Most families pick this." },
                { value: "lab", label: "At a nearby lab", help: "Sahyadri Diagnostics, 1.2 km away." },
              ]}
            />
          </div>
          <Select label="Time slot" value={slot} onChange={(e) => setSlot(e.target.value)} options={["Tue 18 March, 7–9am", "Wed 19 March, 7–9am", "Sat 22 March, 8–10am"]} />
          <Input label="Address" defaultValue="12 Sulakshmi, Kothrud, Pune 411038" help="We'll confirm this with Sarita on the phone." />
          <Input label="Who should we call the day before?" defaultValue="+91 98200 41288 (you)" />
        </Card>

        <Card tone="sunken" padding="md" style={{ display: "grid", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          <p className="ds-label" style={{ margin: 0 }}>Included in your plan</p>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>Panel of 12 markers, doctor read within 72 hours, and a voice note in Marathi or English. No extra charge.</p>
        </Card>

        <Button size="lg" fullWidth style={{ marginTop: "var(--space-6)" }} onClick={() => setConfirming(true)}>Book this visit</Button>

        <p className="ds-label" style={{ margin: "var(--space-8) 0 var(--space-3)" }}>Past visits</p>
        {[["12 December", "Blood panel, at home", "normal"], ["21 December", "Consult with Dr Rao", "normal"], ["14 June", "Blood panel, at home", "normal"]].map(([d, t, s]) => (
          <div key={d + t} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--text-title)" }}>{t}</p>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{d}</p>
            </div>
            <Badge status="neutral" dot={false}>Report ready</Badge>
          </div>
        ))}
      </Scroll>

      <Dialog
        open={confirming}
        variant="sheet"
        title="Book the home visit?"
        description={`${slot}. A phlebotomist comes to Sarita's address in Pune. We'll call her the evening before.`}
        onClose={() => setConfirming(false)}
        footer={
          <>
            <Button fullWidth onClick={() => { setConfirming(false); setBooked(true); setTimeout(() => setBooked(false), 4000); }}>Confirm</Button>
            <Button variant="secondary" fullWidth onClick={() => setConfirming(false)}>Not now</Button>
          </>
        }
      />
      {booked ? (
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 84, display: "flex", justifyContent: "center" }}>
          <Toast>Visit booked. We've texted Sarita the timing.</Toast>
        </div>
      ) : null}
    </>
  );
}

Object.assign(window, { VisitsScreen });
