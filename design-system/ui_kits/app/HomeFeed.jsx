const { Button, Icon } = window.BoringDesignSystem_7ec2e7;

// The care cycle as a sequence of logged events. A member's phase decides how far along they are,
// so the log and the "coming up" list always agree with the header.
const pronoun = (n) => (n === "Anil" ? "He" : "She");
const cycle = (n) => [
  { icon: "user-plus", kind: "setup", title: `${n} joined your plan`, brief: "Priya will call to introduce herself." },
  { icon: "phone", kind: "care", title: `Priya called ${n}`, brief: "Said hello, confirmed the address and the best time for visits." },
  { icon: "calendar-check", kind: "setup", title: "Home test booked", brief: "Tomorrow, 7–9am. Ravi from the lab will visit." },
  { icon: "phone-call", kind: "care", title: "Prep call done", brief: `${pronoun(n)} knows to fast from 10pm. Water is fine.` },
  { icon: "test-tube", kind: "test", title: "Sample collected", brief: "Ravi was on time. Took about ten minutes." },
  { icon: "file-text", kind: "test", title: "Results are in", brief: "Most markers look fine. Dr Rao is reading the rest.", link: ["Read the summary", "results"] },
  { icon: "stethoscope", kind: "doctor", title: "Dr Rao read the report", brief: "Two things to work on: blood sugar and Vitamin D.", link: ["Play 2-min voice note", "results"] },
  { icon: "video", kind: "doctor", title: "Consultation done", brief: "30 minutes with Dr Rao. You joined from London.", link: ["See the notes", "care"] },
  { icon: "list-checks", kind: "plan", title: "12-week plan started", brief: "Evening walks, a D3 tablet, a little less rice at dinner.", link: ["See the plan", "results"] },
  { icon: "message-circle", kind: "care", title: "Week 2 check-in", brief: `${pronoun(n)} says the walks are getting easier.` },
  { icon: "activity", kind: "plan", title: "Week 5 check done", brief: "Blood pressure is coming down. Weight steady." },
];

// Index of the last completed event per phase.
const doneThrough = {
  ONBOARDING: 0, PRE_TEST: 2, SAMPLE_COLLECTED: 4, REPORT_READY: 5, AWAITING_CONSULT: 6,
  PLAN_ACTIVE: 8, MID_PLAN_CHECK: 9, RETEST_DUE: 10, DORMANT: 8,
};

// What's next per phase. `action` means the family owner needs to do something.
const upcomingFor = (n, phase) => ({
  ONBOARDING: [
    { day: "Now", title: "Add their address", action: ["Finish setup", { flow: "onboarding", step: "homes" }] },
    { day: "Soon", title: "Intro call from Priya", note: "Within a day of setup" },
  ],
  PRE_TEST: [
    { day: "Today", time: "8pm", title: "Prep call", note: "Priya calls. Nothing for you to do" },
    { day: "Tomorrow", time: "7–9am", title: "Home blood test", note: "Ravi visits", action: ["Reschedule", "visits"] },
    { day: "Sat", time: "6pm", title: "Results", note: "We'll let you know" },
  ],
  SAMPLE_COLLECTED: [
    { day: "Tomorrow", time: "6pm", title: "Results", note: "We'll let you know" },
    { day: "Sat", title: "Dr Rao reads the report", note: "Nothing for you to do" },
  ],
  REPORT_READY: [
    { day: "Now", title: "Read the results", action: ["Read the summary", "results"] },
    { day: "This week", title: "Consult with Dr Rao", action: ["Pick a time", "visits"] },
  ],
  AWAITING_CONSULT: [
    { day: "Fri", time: "5pm", title: "Consult with Dr Rao", note: "Video call, 30 minutes", action: ["Add a question", "care"] },
  ],
  PLAN_ACTIVE: [
    { day: "Thu", time: "11am", title: "Week 2 call", note: "Priya calls. Nothing for you to do" },
    { day: "12 Nov", title: "Retest", note: "We'll book it with you nearer the time" },
  ],
  MID_PLAN_CHECK: [
    { day: "Thu", time: "11am", title: "Week 5 check", note: "BP and weight, 5 minutes", action: ["Change the time", "visits"] },
    { day: "12 Nov", title: "Retest", note: "We'll book it with you nearer the time" },
  ],
  RETEST_DUE: [
    { day: "By 27 Sep", title: "Book the retest", note: "Same home visit as last time", action: ["Book a morning", "visits"] },
  ],
  DORMANT: [
    { day: "Due", title: "Yearly check", action: ["Book a morning", "visits"] },
  ],
}[phase]);

const whenLabel = (age) => ["Today", "Yesterday", "3 days ago", "Last week", "2 weeks ago", "3 weeks ago", "Last month"][age] || "Earlier";
const kindColor = {
  setup: ["var(--boring-color-surface-welcome)", "var(--petrol-700)"],
  care: ["var(--gradient-sunken)", "var(--ink-3)"],
  test: ["var(--gradient-attention-soft)", "var(--sun-700)"],
  doctor: ["var(--gradient-accent-soft)", "var(--petrol-700)"],
  plan: ["var(--gradient-calm-soft)", "var(--sage-700)"],
};

function SectionTitle({ children, aside }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 var(--space-3)" }}>
      <p className="ds-label" style={{ margin: 0, color: "var(--text-muted)" }}>{children}</p>
      {aside}
    </div>
  );
}

function ComingUp({ members, scope, state, go, openFlow }) {
  const items = members.flatMap((n) => upcomingFor(n, state.members[n]).map((it) => ({ ...it, who: n })));
  // In the order they happen; rows that need you are tinted rather than moved.
  const order = ["Now", "Due", "Today", "Soon", "Tomorrow", "This week", "Thu", "Fri", "Sat", "By 27 Sep", "12 Nov"];
  items.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
  const run = ([, to]) => (typeof to === "string" ? go(to) : openFlow(to.flow, to.step));
  return (
    <section style={{ marginBottom: "var(--space-7)" }}>
      <SectionTitle>Coming up · {scope}</SectionTitle>
      <div style={{ display: "grid", borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)", overflow: "hidden" }}>
        {items.map((it, k) => (
          <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", padding: "var(--space-3) var(--space-4)", borderTop: k ? "1px solid var(--border-subtle)" : "none", background: it.action ? "var(--boring-color-surface-welcome)" : "transparent" }}>
            <div style={{ flex: "none", width: 68, textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", lineHeight: 1.2, color: it.action ? "var(--petrol-700)" : "var(--text-title)" }}>{it.day}</p>
              {it.time ? <p className="ds-num" style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{it.time}</p> : null}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", lineHeight: 1.3, color: "var(--text-title)" }}>{it.title}</p>
              <p style={{ margin: "2px 0 0", fontSize: "var(--text-xs)", lineHeight: 1.4, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--text-body)" }}>{it.who}</span>{it.note ? ` · ${it.note}` : ""}
              </p>
              {it.action ? (
                <button onClick={() => run(it.action)} style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, padding: 0, border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", color: "var(--accent)" }}>
                  {it.action[0]}<Icon name="arrow-right" size={12} />
                </button>
              ) : null}
            </div>
            {it.action ? null : <Icon name="circle-check" size={16} style={{ flex: "none", color: "var(--text-muted)" }} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Updates({ members, scope, state, go }) {
  const [all, setAll] = React.useState(false);
  // Newest first: each member's latest event is the most recent, and members interleave by age.
  const entries = members.flatMap((n) => {
    const done = cycle(n).slice(0, doneThrough[state.members[n]] + 1).reverse();
    const lag = members.indexOf(n);
    return done.map((e, k) => ({ ...e, who: n, age: k + lag }));
  }).sort((a, b) => a.age - b.age);
  const shown = all ? entries : entries.slice(0, 5);
  return (
    <section>
      <SectionTitle>Updates · {scope}</SectionTitle>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-2)" }}>
        {shown.map((e, k) => {
          const [bg, fg] = kindColor[e.kind];
          const fresh = e.age === 0;
          return (
            <li key={k} style={{ position: "relative", display: "flex", gap: "var(--space-3)", padding: "var(--space-3) var(--space-4)", borderRadius: 16, background: "var(--surface-card)", border: `1px solid ${fresh ? "var(--accent)" : "var(--border-subtle)"}` }}>
              <span style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 12, background: bg, color: fg }}>
                <Icon name={e.icon} size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
                  <p style={{ flex: 1, minWidth: 0, margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", lineHeight: 1.3, color: "var(--text-title)" }}>{e.title}</p>
                  <span style={{ flex: "none", fontSize: 12, color: fresh ? "var(--petrol-700)" : "var(--text-muted)" }}>{whenLabel(e.age)}</span>
                </div>
                <p style={{ margin: "2px 0 0", fontSize: "var(--text-xs)", lineHeight: 1.45, color: "var(--text-body)" }}>
                  <span style={{ fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>{e.who}</span> · {e.brief}
                </p>
                {e.link ? (
                  <button onClick={() => go(e.link[1])} style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: "var(--space-2)", padding: 0, border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-text)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", color: "var(--accent)" }}>
                    {e.link[0]}<Icon name="arrow-right" size={12} />
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      {entries.length > 5 ? (
        <Button variant="quiet" fullWidth style={{ marginTop: "var(--space-2)" }} onClick={() => setAll(!all)}>
          {all ? "Show fewer" : `See all ${entries.length} updates`}
        </Button>
      ) : null}
    </section>
  );
}

Object.assign(window, { ComingUp, Updates });
