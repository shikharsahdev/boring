const { Button, Tag, Icon } = window.BoringDesignSystem_7ec2e7;

// Phase model from the App Product & Screen Spec (§1–2). Each managed member is in exactly one phase;
// the hero picks the most urgent member, and the other shows as a quieter "also" line.
// Listed in priority order: urgent logistics, clinical time-sensitive, family attention, progress, ambient.
const phases = [
  { id: "ONBOARDING", label: "Onboarding", status: ["neutral", "Setting up"] },
  { id: "PRE_TEST", label: "Pre-test", status: ["action", "Test tomorrow"] },
  { id: "REPORT_READY", label: "Report ready", status: ["action", "Results in"] },
  { id: "AWAITING_CONSULT", label: "Awaiting consult", status: ["neutral", "Consult Friday"] },
  { id: "SAMPLE_COLLECTED", label: "Sample collected", status: ["neutral", "At the lab"] },
  { id: "RETEST_DUE", label: "Retest due", status: ["attention", "Test due"] },
  { id: "DORMANT", label: "Dormant", status: ["attention", "Check due"] },
  { id: "MID_PLAN_CHECK", label: "Mid-plan check", status: ["normal", "On track"] },
  { id: "PLAN_ACTIVE", label: "Plan active", status: ["normal", "On track"] },
];
const rank = (id) => phases.findIndex((p) => p.id === id);
const quiet = ["PLAN_ACTIVE", "MID_PLAN_CHECK", "SAMPLE_COLLECTED"];

const times = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "late", label: "Late night" },
];
const gaps = [
  { id: "same", label: "Earlier today" },
  { id: "normal", label: "1–3 days ago" },
  { id: "away", label: "4–14 days ago" },
  { id: "lapsed", label: "14+ days ago" },
];

// Same family as the onboarding sample: two homes, three people.
const households = [
  { id: "parents", label: "Parents' home", short: "Parents", city: "Pune", members: ["Sarita", "Anil"] },
  { id: "inlaws", label: "In-laws' home", short: "In-laws", city: "Mumbai", members: ["Kusum"] },
];

const homeDefaults = { members: { Sarita: "PRE_TEST", Anil: "RETEST_DUE", Kusum: "REPORT_READY" }, time: "morning", gap: "normal", variant: 0 };

const joinNames = (names) => names.join(" and ");
const poss = (names) => (names.length > 1 ? `${joinNames(names)}'s` : `${names[0]}'s`);
const them = (names) => (names.length > 1 ? "them" : names[0] === "Anil" ? "him" : "her");

// Each phase: eyebrow, 2–3 headline variants (never the same twice in a row), a supporting line and actions.
function heroFor(phase, n, time) {
  switch (phase) {
    case "ONBOARDING":
      return {
        eyebrow: "Finish setting up", tone: "accent",
        lines: [`One step left before we can call ${joinNames(n)}.`, `Add ${poss(n)} address and we'll book the first visit.`],
        sub: "It takes about a minute, and Priya calls within a day of that.",
      };
    case "PRE_TEST": {
      const late = time === "evening" || time === "late";
      return {
        eyebrow: "Tomorrow · 7–9am · at home", tone: "accent",
        lines: late
          ? [`Fasting starts at 10pm for ${joinNames(n)}.`, `${poss(n)} blood test is first thing tomorrow.`, `Nothing to eat after 10pm tonight. Water is fine.`]
          : [`${poss(n)} blood test is tomorrow morning.`, `Tomorrow's the check-up. We'll handle the reminders.`, `Fasting from 10pm tonight, then a quick test at home.`],
        sub: `Water is fine. Priya calls ${them(n)} at 8pm to go through it.`,
      };
    }
    case "SAMPLE_COLLECTED":
      return {
        eyebrow: "Sample collected", tone: "calm",
        lines: [`${poss(n)} sample is safely at the lab.`, `That's the hard part done for ${joinNames(n)}.`],
        sub: "Report by tomorrow, 6pm. Dr Rao reads it within a day of that.",
      };
    case "REPORT_READY":
      return {
        eyebrow: "Results are in", tone: "accent",
        lines: [`${poss(n)} results are in.`, `${poss(n)} report is ready, with Dr Rao's read in plain words.`],
        sub: "Dr Rao has added a short read in plain words.",
      };
    case "AWAITING_CONSULT":
      return {
        eyebrow: "Consult with Dr Rao · Friday, 5pm", tone: "accent",
        lines: [`Anything you want Dr Rao to cover for ${joinNames(n)}?`, `Friday's consult is a good time to ask about ${poss(n)} results.`],
        sub: "Questions you send Priya before then go into the call.",
      };
    case "PLAN_ACTIVE": {
      const byTime = {
        morning: [`Two things for ${joinNames(n)} today: a 30-minute walk and the D3 tablet after breakfast.`, `${n[0]} has walked 5 of 7 mornings this week.`],
        afternoon: [`Halfway through the day. ${n.length > 1 ? `${poss(n)} walks are` : `${poss(n)} walk is`} still to do — 20 minutes is enough.`, `${n[0]}'s tablet is done for today.`],
        evening: [`${n[0]} has done 11 of 14 walks. Best two weeks yet.`, `A good day for ${joinNames(n)}. Tomorrow's a fresh start either way.`],
        late: [`All quiet. ${poss(n)} plan picks up again tomorrow.`, `Sleep is part of the plan too.`],
      }[time];
      return {
        eyebrow: `${poss(n)} plan · week 3 of 12`, tone: "calm",
        lines: byTime,
        sub: time === "late" ? null : "Approved by Dr Rao. Priya checks in on Thursday.",
      };
    }
    case "MID_PLAN_CHECK":
      return {
        eyebrow: "Week 5 check-in", tone: "calm",
        lines: [`Priya will call ${joinNames(n)} on Thursday for a quick check.`, `An early look at how ${poss(n)} plan is working.`],
        sub: "A blood pressure and weight reading, about five minutes.",
      };
    case "RETEST_DUE":
      return {
        eyebrow: "Retest in 10 days", tone: "attention",
        lines: [`Time to book ${poss(n)} retest.`, `This is where we see what the plan changed for ${joinNames(n)}.`],
        sub: "Same home visit as last time, on any morning that suits.",
      };
    case "DORMANT":
      return {
        eyebrow: "Yearly check due", tone: "attention",
        lines: [`It's been seven months since ${poss(n)} last check.`, `A good time for ${poss(n)} yearly check-up.`],
        sub: "One home visit covers everyone at the same address.",
      };
  }
}

// How another member who needs something is folded into the household message.
const alsoLine = {
  ONBOARDING: (n) => `${n}'s setup still needs finishing.`,
  PRE_TEST: (n) => `${n} has a home test tomorrow morning.`,
  REPORT_READY: (n) => `${n}'s results are ready to read.`,
  AWAITING_CONSULT: (n) => `${n} sees Dr Rao on Friday.`,
  RETEST_DUE: (n) => `${n}'s retest needs booking this week.`,
  DORMANT: (n) => `${n} is due a yearly check.`,
};

// Stand-in for the generated message. In the product an LLM writes this from the household's details,
// its open tasks and its recent events, within the copy rules in DECISIONS.md; these templates show the shape.
// One slide per household: its most urgent member leads, anyone else there who needs something is an "also".
function composeHousehold(state, h) {
  const entries = h.members.map((n) => [n, state.members[n]]);
  const top = entries.reduce((a, b) => (rank(b[1]) < rank(a[1]) ? b : a))[1];
  const names = entries.filter(([, p]) => p === top).map(([n]) => n);
  const others = entries.filter(([, p]) => p !== top && !quiet.includes(p));
  const hero = heroFor(top, names, state.time);
  const aside = others.map(([n, p]) => alsoLine[p] && alsoLine[p](n)).filter(Boolean).join(" ");
  const sub = [hero.sub, aside].filter(Boolean).join(" ");
  return { id: h.id, place: `${h.label} · ${h.city}`, tab: h.short, count: 1 + others.length, top, others, hero: { ...hero, sub, line: hero.lines[state.variant % hero.lines.length] } };
}

// Slides ordered by urgency, then the return-gap rules: a catch-up slide leads after a long gap
// unless a household has urgent logistics.
function composeSlides(state) {
  const slides = households.map((h) => composeHousehold(state, h)).sort((a, b) => rank(a.top) - rank(b.top));
  const urgent = ["ONBOARDING", "PRE_TEST"].includes(slides[0].top);
  if (state.gap === "lapsed" && !urgent) {
    const lines = ["Let's pick this up.", "Good to see you again. Shall we catch up?"];
    slides.unshift({
      id: "catchup", place: "Your family", tab: "Everyone", count: 0, others: [],
      hero: {
        eyebrow: "It's been a while", tone: "accent", line: lines[state.variant % lines.length],
        sub: "Priya can walk you through what's changed in a 10-minute call.",
      },
    });
  }
  const welcome = state.gap === "away" ? "Welcome back. Anil's report came in and Kusum finished week 2 while you were away." : null;
  return { slides, welcome };
}

const headerGround = {
  accent: "var(--boring-color-surface-welcome)",
  calm: "var(--gradient-calm-soft)",
  attention: "var(--gradient-attention-soft)",
};
const labelColor = { accent: "var(--petrol-700)", calm: "var(--sage-700)", attention: "var(--sun-700)" };

function Slide({ slide }) {
  const { hero } = slide;
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: "0 var(--space-5) var(--space-2)" }}>
      <p className="ds-label" style={{ margin: "0 0 var(--space-2)", color: labelColor[hero.tone] }}>{hero.eyebrow}</p>
      <h1 style={{ margin: 0, fontSize: hero.line.length > 48 ? "var(--text-2xl)" : "var(--text-3xl)", lineHeight: 1.15, letterSpacing: "var(--tracking-tight)", color: "var(--text-title)" }}>{hero.line}</h1>
      {hero.sub ? <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{hero.sub}</p> : null}
      <p style={{ display: "flex", alignItems: "center", gap: 6, margin: "var(--space-4) 0 0", fontSize: 12, color: "var(--text-muted)" }}>
        <Icon name="sparkles" size={13} />Summary of this home's updates · 9:40am
      </p>
    </div>
  );
}

// Every home is always visible as a segment in the top bar, so it reads as the scope of the whole screen.
function HomeTabs({ slides, active, onPick }) {
  const dot = { accent: "var(--accent)", calm: "var(--status-normal)", attention: "var(--status-attention)" };
  return (
    <div role="tablist" aria-label="Homes" className="home-carousel" style={{ flex: 1, minWidth: 0, display: "flex", gap: 4, padding: 4, overflowX: "auto", scrollbarWidth: "none", borderRadius: 999, background: "var(--boring-color-surface-page, var(--paper-1))", border: "1px solid var(--border-subtle)" }}>
      {slides.map((sl, n) => {
        const on = n === active;
        return (
          <button key={sl.id} role="tab" aria-selected={on} onClick={() => onPick(n)} style={{
            flex: "1 0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 36, padding: "0 var(--space-3)",
            border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "var(--font-text)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)",
            background: on ? "var(--text-title)" : "transparent", color: on ? "var(--text-on-accent)" : "var(--text-body)",
            transition: "background 200ms ease, color 200ms ease",
          }}>
            <Icon name={sl.id === "catchup" ? "users" : "house"} size={15} />
            {sl.tab}
            {sl.count ? <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 999, background: on ? "var(--boring-palette-butter, #F2CA66)" : dot[sl.hero.tone] }} /> : null}
          </button>
        );
      })}
    </div>
  );
}

// Home's top: a sticky bar that picks the home, then the message band as a carousel of households.
// Returns siblings (not one wrapper) so the bar can stay stuck while the lists below scroll.
function HomeHeader({ state, go, openFlow, onActive = () => {} }) {
  const { LittleB, LightBand, IconButton } = window.BoringDesignSystem_7ec2e7;
  const { slides, welcome } = composeSlides(state);
  const [active, setActive] = React.useState(0);
  const track = React.useRef(null);
  const i = Math.min(active, slides.length - 1);
  React.useEffect(() => { onActive(slides[i].id); }, [slides[i].id]);
  const onScroll = (e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth));
  const goTo = (n) => track.current.scrollTo({ left: n * track.current.clientWidth, behavior: "smooth" });
  const ground = headerGround[slides[i].hero.tone];
  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 2, padding: "10px var(--space-5) var(--space-3)", background: ground, transition: "background 240ms ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-numeric)", fontSize: 13, color: "var(--ink-2)" }}>
          <span>9:41</span>
          <span style={{ display: "flex", gap: 6 }}><Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-full" size={14} /></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
          <LittleB size={26} />
          {slides.length > 1 ? <HomeTabs slides={slides} active={i} onPick={goTo} /> : <span className="ds-wordmark" style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--petrol-700)" }}>boring</span>}
          <IconButton name="bell" label="Reminders" style={{ marginRight: -12 }} />
        </div>
      </div>
      <LightBand style={{ padding: "var(--space-4) 0 var(--space-5)", background: ground, transition: "background 240ms ease" }}>
        {welcome ? <p style={{ margin: "0 var(--space-5) var(--space-4)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{welcome}</p> : null}
        <div ref={track} onScroll={onScroll} className="home-carousel" style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "100%", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
          {slides.map((sl) => (
            <div key={sl.id} style={{ scrollSnapAlign: "start", display: "flex" }}>
              <Slide slide={sl} />
            </div>
          ))}
        </div>
      </LightBand>
    </>
  );
}

function memberStatus(state, name) {
  return phases.find((p) => p.id === state.members[name]).status;
}

// Viewer-side controls (outside the phone) for flipping Home between states.
function HomeStatePanel({ state, setState }) {
  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  const Group = ({ title, children }) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <p className="ds-label" style={{ margin: 0, color: "var(--text-muted)" }}>{title}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{children}</div>
    </div>
  );
  const chip = (on, label, onClick) => <Tag key={label} size="sm" selected={on} onClick={onClick} style={{ cursor: "pointer" }}>{label}</Tag>;
  const leads = composeSlides(state).slides.reduce((m, sl) => ({ ...m, [sl.id]: sl.top }), {});
  const leading = (name) => { const h = households.find((x) => x.members.includes(name)); return leads[h.id] === state.members[name]; };
  return (
    <div style={{ display: "grid", gap: "var(--space-5)", width: 260, marginTop: "var(--space-5)", padding: "var(--space-4)", borderRadius: 16, background: "var(--surface-card)", border: "1px solid var(--border-subtle)" }}>
      <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>Home state</p>
      {Object.keys(state.members).map((name) => (
        <Group key={name} title={`${name}${leading(name) ? " · leads their home" : ""}`}>
          {phases.map((p) => chip(state.members[name] === p.id, p.label, () => setState((s) => ({ ...s, members: { ...s.members, [name]: p.id }, variant: 0 }))))}
        </Group>
      ))}
      <Group title="Time of day">{times.map((t) => chip(state.time === t.id, t.label, () => set({ time: t.id, variant: 0 })))}</Group>
      <Group title="Last opened">{gaps.map((g) => chip(state.gap === g.id, g.label, () => set({ gap: g.id, variant: 0 })))}</Group>
      <Button variant="secondary" size="sm" iconLeft="refresh-cw" onClick={() => set({ variant: state.variant + 1 })}>Another wording</Button>
    </div>
  );
}

Object.assign(window, { HomeHeader, HomeStatePanel, households, homeDefaults, memberStatus });
