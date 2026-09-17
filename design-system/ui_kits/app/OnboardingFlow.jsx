const { Badge, Button, Card, Input, Select, Radio, Checkbox, Tag, Tabs, Icon, IconButton, LittleB, LightBand } = window.BoringDesignSystem_7ec2e7;

const onboardingSteps = [
  { id: "welcome", label: "Welcome", note: "First open. Sign up or sign in." },
  { id: "phone", label: "Your number", note: "Phone is the account. Any country code: many buyers live abroad." },
  { id: "otp", label: "Verify", note: "Six-digit code by SMS or WhatsApp." },
  { id: "you", label: "About you", note: "Name, where you live, app language." },
  { id: "family", label: "Who's included", note: "You, a partner, parents, in-laws. Sets the headcount for pricing." },
  { id: "parent", label: "About them", note: "Name, age, language, phone. No addresses yet." },
  { id: "homes", label: "Where they live", note: "People are grouped into homes by relation. One address per home; move anyone who lives elsewhere." },
  { id: "plan", label: "Choose a plan", note: "Fixed price per person: $700 for 6 months or $1,000 for a year. Total = price × people." },
  { id: "visit", label: "First home visit", note: "Book the first check now, while intent is high. One visit per home." },
  { id: "review", label: "Review and start", note: "One summary, then payment (UPI or card, handed off to the provider)." },
  { id: "done", label: "All set", note: "Meet the care manager, then land on Home." },
];

// Fixed price per person; the total scales with how many people are included.
const plans = {
  year: { name: "1 year", perPerson: 1000, months: 12, blurb: "Four home checks, a doctor's review after each, and a named care manager." },
  half: { name: "6 months", perPerson: 700, months: 6, blurb: "Two home checks, a doctor's review after each, and a named care manager." },
};
const usd = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
const planTotal = (id, people) => plans[id].perPerson * people;

function FlowTop({ onBack, progress }) {
  return (
    <div style={{ padding: "10px var(--space-5) 0" }}>
      <StatusBarInline />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", minHeight: 48, marginTop: "var(--space-2)" }}>
        {onBack ? <IconButton name="chevron-left" label="Back" onClick={onBack} style={{ marginLeft: -12 }} /> : <span style={{ width: 36 }} />}
        {progress != null ? (
          <div role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--paper-3)", overflow: "hidden" }}>
            <div style={{ width: `${progress * 100}%`, height: "100%", borderRadius: 999, background: "var(--accent)", transition: "width var(--duration-base, 240ms) ease" }} />
          </div>
        ) : <span style={{ flex: 1 }} />}
      </div>
    </div>
  );
}

function StatusBarInline() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-numeric)", fontSize: 13, color: "var(--ink-2)" }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: 6 }}><Icon name="signal" size={14} /><Icon name="wifi" size={14} /><Icon name="battery-full" size={14} /></span>
    </div>
  );
}

function StepBody({ eyebrow, title, lede, children, footer }) {
  return (
    <>
      <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-5) var(--space-5) var(--space-6)" }}>
        {eyebrow ? <p className="ds-label" style={{ margin: "0 0 var(--space-2)", color: "var(--text-muted)" }}>{eyebrow}</p> : null}
        <h1 style={{ margin: 0, fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)", color: "var(--text-title)" }}>{title}</h1>
        {lede ? <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{lede}</p> : null}
        <div style={{ display: "grid", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>{children}</div>
      </div>
      {footer ? (
        <div style={{ display: "grid", gap: "var(--space-2)", padding: "var(--space-4) var(--space-5) var(--space-6)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          {footer}
        </div>
      ) : null}
    </>
  );
}

function Welcome({ next }) {
  return (
    <LightBand style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px var(--space-6) var(--space-7)" }}>
      <StatusBarInline />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "var(--space-5)" }}>
        <LittleB size={72} state="waiting" />
        <span className="ds-wordmark" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--petrol-700)" }}>boring</span>
        <h1 style={{ margin: 0, fontSize: "var(--text-3xl, 34px)", lineHeight: 1.1, letterSpacing: "var(--tracking-tight)", color: "var(--text-title)" }}>
          A little care. A lot more living.
        </h1>
        <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>
          Health checks at home for you and your family, a doctor who explains the results, and a care team that stays with you.
        </p>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-muted)" }}>
          Looking after parents in another city, or another country? That's where we help most.
        </p>
      </div>
      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        <Button size="lg" fullWidth onClick={next}>Get started</Button>
        <Button variant="quiet" fullWidth onClick={next}>I already have an account</Button>
      </div>
    </LightBand>
  );
}

function PhoneStep({ data, set, next }) {
  return (
    <StepBody
      title="What's your phone number?"
      lede="We'll send a code to confirm it's you. This number is how you sign in."
      footer={<Button size="lg" fullWidth onClick={next} disabled={data.phone.replace(/\D/g, "").length < 8}>Send code</Button>}
    >
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "var(--space-3)", alignItems: "end" }}>
        <Select label="Country" value={data.cc} onChange={(e) => set({ cc: e.target.value })} options={["+91 India", "+1 US", "+44 UK", "+971 UAE", "+65 Singapore"]} />
        <Input label="Number" inputMode="tel" value={data.phone} onChange={(e) => set({ phone: e.target.value })} />
      </div>
      <Radio
        value={data.channel}
        onChange={(v) => set({ channel: v })}
        options={[
          { value: "whatsapp", label: "Send on WhatsApp", help: "Usually quicker from abroad." },
          { value: "sms", label: "Send by SMS" },
        ]}
      />
      <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>By continuing you agree to the terms and privacy notice.</p>
    </StepBody>
  );
}

function OtpStep({ data, next }) {
  const [code, setCode] = React.useState("");
  const digits = code.padEnd(6, " ").slice(0, 6).split("");
  return (
    <StepBody
      title="Enter the code"
      lede={`We sent six digits on ${data.channel === "whatsapp" ? "WhatsApp" : "SMS"} to ${data.cc.split(" ")[0]} ${data.phone}.`}
      footer={<Button size="lg" fullWidth onClick={next} disabled={code.length < 6}>Verify</Button>}
    >
      <label style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "var(--space-2)", cursor: "text" }}>
        {digits.map((d, i) => (
          <span key={i} className="ds-num" style={{
            display: "flex", alignItems: "center", justifyContent: "center", height: 56, borderRadius: "var(--radius-md, 12px)",
            border: `1.5px solid ${i === code.length ? "var(--accent)" : "var(--border-strong)"}`, background: "var(--surface-card)",
            fontSize: "var(--text-xl)", color: "var(--text-title)",
          }}>{d.trim()}</span>
        ))}
        <input
          aria-label="Six-digit code" inputMode="numeric" autoFocus value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        />
      </label>
      <Button variant="quiet" size="sm" style={{ justifySelf: "start" }} onClick={() => setCode("482913")}>Fill sample code</Button>
      <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Didn't get it? Resend in 0:24</p>
    </StepBody>
  );
}

function YouStep({ data, set, next }) {
  return (
    <StepBody
      eyebrow="About you"
      title="Nice to meet you"
      lede="Your family will hear your name when we call, so they know who set this up."
      footer={<Button size="lg" fullWidth onClick={next} disabled={!data.name.trim()}>Continue</Button>}
    >
      <Input label="Your name" value={data.name} onChange={(e) => set({ name: e.target.value })} />
      <Input label="Where do you live?" value={data.city} onChange={(e) => set({ city: e.target.value })} help="Helps us time updates for your time zone." />
      <Select label="App language" value={data.lang} onChange={(e) => set({ lang: e.target.value })} options={["English", "हिन्दी", "मराठी"]} />
    </StepBody>
  );
}

function FamilyStep({ data, set, next }) {
  const toggle = (who) => {
    const has = data.caring.includes(who);
    const caring = has ? data.caring.filter((c) => c !== who) : [...data.caring, who];
    set({ caring });
  };
  return (
    <StepBody
      eyebrow="Your family"
      title="Who should we look after?"
      lede="Pick anyone in the family, yourself included. You can add others later."
      footer={<Button size="lg" fullWidth onClick={next} disabled={!data.caring.length}>Continue</Button>}
    >
      {["Myself", "Partner", "Mother", "Father", "Mother-in-law", "Father-in-law", "Someone else"].map((who) => {
        const on = data.caring.includes(who);
        return (
          <button key={who} onClick={() => toggle(who)} aria-pressed={on} style={{
            display: "flex", alignItems: "center", gap: "var(--space-4)", minHeight: 64, padding: "0 var(--space-5)",
            borderRadius: "var(--radius-lg, 18px)", border: `1.5px solid ${on ? "var(--accent)" : "var(--border-subtle)"}`,
            background: on ? "var(--surface-accent, var(--paper-2))" : "var(--surface-card)", cursor: "pointer",
            fontFamily: "var(--font-text)", fontSize: "var(--text-base)", color: "var(--text-title)", textAlign: "left",
          }}>
            <span style={{ flex: 1 }}>{who}</span>
            <Icon name={on ? "circle-check" : "circle"} size={22} style={{ color: on ? "var(--accent)" : "var(--text-muted)" }} />
          </button>
        );
      })}
    </StepBody>
  );
}

const personLabel = (who) => (who === "Myself" ? "You" : who);
const nameOf = (data, who) => (who === "Myself" ? data.name : (data.people[who] || {}).name) || personLabel(who);

function ParentStep({ data, set, next }) {
  const people = data.caring.length ? data.caring : ["Mother"];
  const [who, setWho] = React.useState(people[0]);
  const self = who === "Myself";
  const p = data.people[who] || {};
  const update = (patch) => set({ people: { ...data.people, [who]: { ...p, ...patch } } });
  return (
    <StepBody
      eyebrow="About them"
      title="Tell us who everyone is"
      lede="We never turn up unannounced. The care team calls each person first to introduce themselves."
      footer={<Button size="lg" fullWidth onClick={next}>Continue</Button>}
    >
      {people.length > 1 ? <Tabs size="sm" tabs={people.map(personLabel)} value={personLabel(who)} onChange={(l) => setWho(l === "You" ? "Myself" : l)} /> : null}
      {self ? null : <Input label="Their name" value={p.name || ""} onChange={(e) => update({ name: e.target.value })} />}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
        <Input label="Age" inputMode="numeric" value={p.age || ""} onChange={(e) => update({ age: e.target.value })} />
        <Select label={self ? "You prefer" : "They speak"} value={p.lang || (self ? "English" : "Marathi")} onChange={(e) => update({ lang: e.target.value })} options={["Marathi", "Hindi", "English", "Gujarati", "Tamil"]} />
      </div>
      {self ? null : (
        <>
          <Input label="Their phone" inputMode="tel" value={p.phone || ""} onChange={(e) => update({ phone: e.target.value })} />
          <Select label="Best time to call them" value={p.time || "Morning, 9–11am"} onChange={(e) => update({ time: e.target.value })} options={["Morning, 9–11am", "Afternoon, 2–4pm", "Evening, 6–8pm"]} />
          <Checkbox checked={!!p.consent} onChange={(v) => update({ consent: v })} label={`${p.name ? p.name.split(" ")[0] : "They"} know${p.name ? "s" : ""} I'm setting this up`} help="We'll still ask them on the first call before sharing any results with you." />
        </>
      )}
    </StepBody>
  );
}

// People start in a home picked from their relation, so couples share an address by default.
const defaultHomes = {
  you: { label: "Your home", members: ["Myself", "Partner"] },
  parents: { label: "Parents' home", members: ["Mother", "Father"] },
  inlaws: { label: "In-laws' home", members: ["Mother-in-law", "Father-in-law"] },
  other: { label: "Another home", members: ["Someone else"] },
};
const homeOf = (data, who) => data.homeOf[who] || Object.keys(defaultHomes).find((h) => defaultHomes[h].members.includes(who));
const homeLabel = (data, id) => (data.homes[id] || {}).label || (defaultHomes[id] || {}).label || "Another home";
function activeHomes(data) {
  const ids = [];
  data.caring.forEach((who) => { const h = homeOf(data, who); if (!ids.includes(h)) ids.push(h); });
  return ids.map((id) => ({ id, label: homeLabel(data, id), address: (data.homes[id] || {}).address || "", members: data.caring.filter((w) => homeOf(data, w) === id) }));
}

function HomesStep({ data, set, next }) {
  const homes = activeHomes(data);
  const [moving, setMoving] = React.useState(false);
  const setAddress = (id, address) => set({ homes: { ...data.homes, [id]: { ...data.homes[id], address } } });
  const move = (who, to) => {
    if (to === "new") {
      const id = `home-${Object.keys(data.homes).length + 1}`;
      set({ homes: { ...data.homes, [id]: { label: `${personLabel(who) === "You" ? "Your" : `${nameOf(data, who).split(" ")[0]}'s`} home` } }, homeOf: { ...data.homeOf, [who]: id } });
    } else set({ homeOf: { ...data.homeOf, [who]: to } });
  };
  const missing = homes.some((h) => !h.address.trim());
  return (
    <StepBody
      eyebrow="Where they live"
      title={homes.length === 1 ? "One home to visit" : `${homes.length} homes to visit`}
      lede="Add each address once. Everyone who lives there is seen in the same visit."
      footer={<Button size="lg" fullWidth onClick={next} disabled={missing}>Continue</Button>}
    >
      {homes.map((h) => (
        <Card key={h.id} padding="md" style={{ display: "grid", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <Icon name="house" size={22} style={{ color: "var(--accent)" }} />
            <p style={{ margin: 0, flex: 1, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--text-title)" }}>{h.label}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {h.members.map((w) => <Tag key={w} size="sm">{nameOf(data, w)}</Tag>)}
          </div>
          <Input label="Address" value={h.address} onChange={(e) => setAddress(h.id, e.target.value)} help={h.id === "you" ? "We visit homes in India. Use an Indian address, or leave yourself out for now." : undefined} />
        </Card>
      ))}
      {moving ? (
        <Card tone="sunken" padding="md" style={{ display: "grid", gap: "var(--space-3)" }}>
          <p className="ds-label" style={{ margin: 0 }}>Who lives where</p>
          {data.caring.map((w) => (
            <Select key={w} size="md" label={nameOf(data, w)} value={homeOf(data, w)} onChange={(e) => move(w, e.target.value)}
              options={[...homes.map((h) => ({ value: h.id, label: h.label })), { value: "new", label: "A different home…" }]} />
          ))}
        </Card>
      ) : (
        <Button variant="quiet" iconLeft="arrow-left-right" style={{ justifySelf: "start" }} onClick={() => setMoving(true)}>Someone lives somewhere else</Button>
      )}
    </StepBody>
  );
}

function PlanStep({ data, set, next }) {
  const people = Math.max(data.caring.length, 1);
  const who = people === 1 ? "1 person" : `${people} people`;
  const halfPerMonth = plans.half.perPerson / plans.half.months;
  const yearPerMonth = plans.year.perPerson / plans.year.months;
  const saving = (halfPerMonth * 12 - plans.year.perPerson) * people;
  return (
    <StepBody
      eyebrow="Your plan"
      title="Here's what we'd suggest"
      lede={`Same price for everyone in the family. You've added ${who}.`}
      footer={<Button size="lg" fullWidth onClick={next}>Continue with {plans[data.plan].name} · {usd(planTotal(data.plan, people))}</Button>}
    >
      {Object.entries(plans).map(([id, pl]) => {
        const on = data.plan === id;
        const perMonth = pl.perPerson / pl.months;
        return (
          <button key={id} onClick={() => set({ plan: id })} aria-pressed={on} style={{
            display: "grid", gap: "var(--space-3)", padding: "var(--space-5)", textAlign: "left", cursor: "pointer",
            borderRadius: "var(--radius-lg, 18px)", border: `1.5px solid ${on ? "var(--accent)" : "var(--border-subtle)"}`,
            background: on ? "var(--surface-accent, var(--paper-2))" : "var(--surface-card)", fontFamily: "var(--font-text)",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--text-title)" }}>{pl.name}</span>
              {id === "year" && saving > 0 ? <Badge status="normal" dot={false}>Save {usd(saving)}</Badge> : null}
            </span>
            <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <span className="ds-num" style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                {usd(pl.perPerson)} × {who}
              </span>
              <span className="ds-num" style={{ fontSize: "var(--text-2xl)", color: "var(--text-title)" }}>{usd(planTotal(id, people))}</span>
            </span>
            <span className="ds-num" style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
              Works out to {usd(perMonth)} per person, per month · paid once for {pl.months} months
            </span>
            <span style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{pl.blurb}</span>
          </button>
        );
      })}
      <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
        The yearly plan is {usd(yearPerMonth)} a month per person against {usd(halfPerMonth)} on 6 months. Illustrative pricing.
      </p>
    </StepBody>
  );
}

function VisitStep({ data, set, next }) {
  const first = nameOf(data, data.caring[0]);
  const homes = activeHomes(data);
  return (
    <StepBody
      eyebrow="First visit"
      title="Pick a morning for the first check"
      lede={`A phlebotomist comes to the ${homes.length > 1 ? "homes" : "house"}. Fasting from 10pm the night before; we'll remind ${first === data.name ? "everyone" : first.split(" ")[0]}.`}
      footer={
        <>
          <Button size="lg" fullWidth onClick={next}>Continue</Button>
          <Button variant="quiet" fullWidth onClick={() => { set({ slot: null }); next(); }}>Let the care team call to arrange</Button>
        </>
      }
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {["Tue 22 Sep", "Wed 23 Sep", "Sat 26 Sep", "Mon 28 Sep"].map((d) => (
          <Tag key={d} selected={data.slotDay === d} onClick={() => set({ slotDay: d })} style={{ cursor: "pointer" }}>{d}</Tag>
        ))}
      </div>
      <Radio
        value={data.slot}
        onChange={(v) => set({ slot: v })}
        options={[
          { value: "7–9am", label: "7–9am", help: "Most popular. Done before breakfast." },
          { value: "9–11am", label: "9–11am" },
        ]}
      />
      <Card tone="sunken" padding="sm" style={{ display: "grid", gap: "var(--space-1)", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
        {homes.map((h) => <span key={h.id}><strong>{h.label}:</strong> {h.members.map((w) => nameOf(data, w).split(" ")[0]).join(" and ")}{h.members.length > 1 ? ", in one visit" : ""}</span>)}
        {homes.length > 1 ? <span style={{ color: "var(--text-muted)" }}>We'll aim for the same morning at each home and confirm by phone.</span> : null}
      </Card>
    </StepBody>
  );
}

function ReviewStep({ data, next }) {
  const pl = plans[data.plan];
  const people = Math.max(data.caring.length, 1);
  const total = usd(planTotal(data.plan, people));
  const rows = [
    ["Plan", `${pl.name} · ${usd(pl.perPerson)} × ${people} = ${total}`],
    ...activeHomes(data).map((h) => [h.label, [h.members.map((w) => nameOf(data, w)).join(", "), h.address].filter(Boolean).join(" · ")]),
    ["First visit", data.slot ? `${data.slotDay}, ${data.slot}, at home` : "Care team will call to arrange"],
    ["Updates to", `${data.name} · ${data.cc.split(" ")[0]} ${data.phone}`],
  ];
  return (
    <StepBody
      eyebrow="Almost there"
      title="Check everything looks right"
      footer={
        <>
          <Button size="lg" fullWidth iconLeft="lock" onClick={next}>Pay {total} and start</Button>
          <p style={{ margin: 0, textAlign: "center", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>UPI or card, on the payment provider's screen. Mockup — nothing is charged.</p>
        </>
      }
    >
      <Card padding="md">
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "grid", gap: 2, padding: "var(--space-3) 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
            <span className="ds-label" style={{ color: "var(--text-muted)" }}>{k}</span>
            <span style={{ fontSize: "var(--text-base)", color: "var(--text-title)" }}>{v}</span>
          </div>
        ))}
      </Card>
      <Card tone="calm" padding="sm" style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
        Fully refundable if the first visit doesn't happen.
      </Card>
    </StepBody>
  );
}

function DoneStep({ data, exit }) {
  const others = data.caring.filter((w) => w !== "Myself");
  const first = others.length ? nameOf(data, others[0]).split(" ")[0] : "you";
  return (
    <LightBand style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px var(--space-6) var(--space-7)" }}>
      <StatusBarInline />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "var(--space-5)" }}>
        <LittleB size={64} />
        <h1 style={{ margin: 0, fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-tight)", color: "var(--text-title)" }}>You're all set, {data.name.split(" ")[0]}.</h1>
        <Card padding="md" style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, flex: "none", borderRadius: 999, background: "var(--paper-2)", fontFamily: "var(--font-display)", fontSize: 19, color: "var(--ink-3)" }}>P</div>
          <div>
            <p style={{ margin: 0, fontWeight: "var(--weight-medium)", color: "var(--text-title)" }}>Priya is your care manager</p>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)" }}>She'll call {first} within a day to say hello and confirm the visit.</p>
          </div>
        </Card>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>We'll message you once that call is done.</p>
      </div>
      <Button size="lg" fullWidth onClick={exit}>Go to your family</Button>
    </LightBand>
  );
}

const onboardingDefaults = {
  cc: "+44 UK", phone: "7700 900418", channel: "whatsapp",
  name: "Meera Deshpande", city: "London", lang: "English",
  caring: ["Mother", "Father", "Mother-in-law"], plan: "year",
  people: {
    Mother: { name: "Sarita Deshpande", age: "64", lang: "Marathi", phone: "+91 98200 41288", consent: true },
    Father: { name: "Anil Deshpande", age: "69", lang: "Marathi", phone: "+91 98200 41289", consent: true },
    "Mother-in-law": { name: "Kusum Joshi", age: "71", lang: "Hindi", phone: "+91 98191 07734", consent: true },
  },
  homes: {
    parents: { address: "12 Sulakshmi, Kothrud, Pune 411038" },
    inlaws: { address: "4B Seawind, Bandra West, Mumbai 400050" },
  },
  homeOf: {},
  slotDay: "Tue 22 Sep", slot: "7–9am",
};

function OnboardingFlow({ step, setStep, exit }) {
  const [data, setData] = React.useState(onboardingDefaults);
  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const i = onboardingSteps.findIndex((s) => s.id === step);
  const next = () => setStep(onboardingSteps[Math.min(i + 1, onboardingSteps.length - 1)].id);
  const back = () => setStep(onboardingSteps[Math.max(i - 1, 0)].id);
  const props = { data, set, next };

  if (step === "welcome") return <Welcome next={next} />;
  if (step === "done") return <DoneStep data={data} exit={exit} />;
  const Step = { phone: PhoneStep, otp: OtpStep, you: YouStep, family: FamilyStep, parent: ParentStep, homes: HomesStep, plan: PlanStep, visit: VisitStep, review: ReviewStep }[step];
  // Progress counts the form steps only, not the welcome and done screens.
  const progress = i / (onboardingSteps.length - 2);
  return (
    <>
      <FlowTop onBack={back} progress={progress} />
      <Step key={step} {...props} />
    </>
  );
}

Object.assign(window, { OnboardingFlow, onboardingSteps });
