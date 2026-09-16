const { Button, Card, Icon, Input, Select, Radio, Toast } = window.BoringDesignSystem_7ec2e7;

function ParentsPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <>
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: "var(--space-10)", alignItems: "start" }}>
          <div>
            <p className="ds-label" style={{ margin: "0 0 var(--space-4)" }}>For your parents</p>
            <h1 style={{ fontSize: "var(--text-5xl)", lineHeight: 1.1, margin: 0 }}>Nothing to download. Nothing to remember.</h1>
            <p style={{ margin: "var(--space-6) 0 0", maxWidth: "50ch", fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>
              Your parents don't have to learn anything. We call, we come, we explain in their language, and we leave a printed report on the table.
            </p>
            <div style={{ display: "grid", gap: "var(--space-5)", marginTop: "var(--space-8)" }}>
              {[["phone-call", "A call the evening before", "From the same care manager, every quarter."],
                ["house", "A visit at 7am, at home", "Fifteen minutes. No queue, no travel, no waiting room."],
                ["file-text", "A report they can hold", "Printed and left with them, plus a voice note explaining it."]].map(([icon, t, b]) => (
                <div key={t} style={{ display: "flex", gap: "var(--space-4)" }}>
                  <Icon name={icon} size={24} style={{ color: "var(--accent-quiet)", marginTop: 2 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: "var(--text-lg)", color: "var(--text-title)" }}>{t}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card padding="lg" elevation="card" style={{ display: "grid", gap: "var(--space-5)" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "var(--text-2xl)" }}>Book a call with us</h2>
              <p style={{ margin: "var(--space-2) 0 0", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Fifteen minutes, no sales script. We'll tell you if Boring isn't right for your family.</p>
            </div>
            <Input label="Your name" placeholder="Nikhil Deshpande" />
            <Input label="Your phone or WhatsApp" placeholder="+49 151 2345 6789" inputMode="tel" />
            <Select label="Where do your parents live?" options={["Pune", "Mumbai", "Bengaluru", "Hyderabad", "Delhi NCR", "Chennai", "Somewhere else"]} />
            <Radio defaultValue="both" options={[{ value: "one", label: "One parent" }, { value: "both", label: "Both parents" }]} />
            <Button size="lg" fullWidth onClick={() => { setSent(true); setTimeout(() => setSent(false), 4000); }}>Preview enquiry</Button>
            <p style={{ margin: 0, fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>Design preview only. Your details are not sent.</p>
          </Card>
        </div>
      </Section>

      <Section tone="var(--paper-2)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-5)" }}>
          {[["Cities we cover", "Pune, Mumbai, Bengaluru, Hyderabad, Delhi NCR, Chennai. Tier-two cities through partner labs."],
            ["Our doctors", "Internal medicine physicians with 10+ years in Indian practice. The same doctor reads your parent's panels each time."],
            ["Where data lives", "Reports are stored in India. Export or delete everything from the app, any time."]].map(([t, b]) => (
            <div key={t}>
              <p className="ds-label" style={{ margin: "0 0 var(--space-3)" }}>{t}</p>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {sent ? (
        <div style={{ position: "fixed", left: 24, bottom: 24, zIndex: 20 }}>
          <Toast>Preview complete. No enquiry was sent.</Toast>
        </div>
      ) : null}
    </>
  );
}

Object.assign(window, { ParentsPage });
