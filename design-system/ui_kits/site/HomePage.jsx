const { Button, Card, Icon, Badge } = window.BoringDesignSystem_7ec2e7;

const steps = [
  { icon: "flask-conical", title: "A panel at home, four times a year", body: "A phlebotomist comes to your parents' door. Twelve markers, no queue, no fasting confusion — we call the evening before to explain." },
  { icon: "stethoscope", title: "A doctor reads it against the last one", body: "Not a PDF with reference ranges. A doctor compares this quarter to the last and records a two-minute voice note in their language." },
  { icon: "message-circle", title: "A care team that stays", body: "The same care manager, every quarter. She knows which medicines your father actually takes and when your mother travels." },
];

function HomePage({ go }) {
  return (
    <>
      <LightBand style={{ marginBottom: "var(--space-2)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-12) var(--space-8) var(--space-11)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: "var(--space-10)", alignItems: "center" }}>
            <div>
              <p className="ds-label" style={{ margin: "0 0 var(--space-5)", color: "var(--petrol-700)" }}>Preventive care for Indian families</p>
              <h1 style={{ fontSize: "var(--text-6xl)", lineHeight: 1.06, margin: 0 }}>
                More life in the everyday.
              </h1>
              <p style={{ margin: "var(--space-6) 0 0", maxWidth: "46ch", fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", color: "var(--ink-2)" }}>
                Lab panels at home, a doctor who reads them, and a care team that knows your family. You get the summary. They get the visit. More room for the good, ordinary stuff.
              </p>
              <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-8)", flexWrap: "wrap" }}>
                <Button size="lg" onClick={() => go("plans")}>See plans</Button>
                <Button size="lg" variant="secondary" iconLeft="phone" onClick={() => go("parents")}>Talk to us first</Button>
              </div>
              <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-xs)", color: "var(--ink-2)" }}>
                Covering Pune, Mumbai, Bengaluru, Hyderabad, Delhi NCR and Chennai.
              </p>
            </div>
            <ImagePlaceholder height={420}  />
          </div>
        </div>
      </LightBand>

      <Section tone="var(--paper-2)">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-5)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
          <h2 style={{ fontSize: "var(--text-4xl)", margin: 0 }}>How it works</h2>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Every quarter, the same rhythm.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-5)" }}>
          {steps.map((s, i) => (
            <Card key={s.title} padding="lg" style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
              <Icon name={s.icon} size={30} style={{ color: "var(--accent-quiet)" }} />
              <p className="ds-num" style={{ margin: 0, fontSize: "var(--text-2xs)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>0{i + 1}</p>
              <h3 style={{ margin: 0, fontSize: "var(--text-2xl)" }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: "var(--space-10)", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "var(--text-4xl)", margin: 0 }}>Two people use Boring. Both of them matter.</h2>
            <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", color: "var(--text-body)", maxWidth: "48ch" }}>
              One of you is abroad, paying and coordinating, reading a summary at midnight. One of you is at home in India, answering the door at 7am. The app speaks to both, in their own language, at their own size of type.
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
              <Badge status="neutral" dot={false}>English</Badge>
              <Badge status="neutral" dot={false}>हिन्दी</Badge>
              <Badge status="neutral" dot={false}>मराठी</Badge>
            </div>
          </div>
          <ImagePlaceholder height={300}  />
        </div>
      </Section>

      <Section tone="var(--gradient-inverse)">
        <div style={{ maxWidth: "34ch" }}>
          <p className="ds-label" style={{ margin: 0, color: "var(--petrol-300)" }}>Why the name</p>
          <p style={{ margin: "var(--space-5) 0 0", fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-on-inverse)" }}>
            Health can be the boring bit. Life gets to be the good bit.
          </p>
        </div>
      </Section>

    </>
  );
}

Object.assign(window, { HomePage });
