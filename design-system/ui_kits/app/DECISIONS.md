# Family app — product decisions

Decisions made while prototyping the app flows in this folder, written down so they carry into the real build. Each entry says what we decided, why, and what it means for implementation. The prototype (`index.html`) shows every decision here; open it and use the flow pills and the step rail.

Source spec: **App Product & Screen Spec (v1)** in Notion (The Core Services → 1. The App). This document records where the prototype follows the spec, extends it, or departs from it.

Status key: **Decided** — build it this way. **Proposed** — in the prototype, not yet confirmed. **Open** — needs an answer before build.

Last updated: 17 September 2026.

---

## 1. Who the app is for

**Decided — design from the family owner's account.** The primary user is the person who sets up and pays for the family plan (often living in another city or country), managing parents and other relatives. Every screen is designed from this account first. Managed members (parents) mostly experience Boring through calls and home visits, not the app.

**Decided — position for the whole family, not only parents.** The welcome screen says "health checks at home for you and your family". Parents are named as where Boring helps most ("Looking after parents in another city, or another country?"), not as the only audience.
- *Why:* the plan should cover the owner, a partner, in-laws and others; leading with "parents" narrows the product.
- *Build:* any member relation is valid, including the owner themselves.

---

## 2. Data model

The prototype settled on five core objects. Names are working names.

```
Account (owner)
 └─ Household (1..n)          one address, one home visit
     └─ Member (1..n)         a person; has a relation and a phase
          ├─ Task (0..n)      something that will happen
          └─ Event (0..n)     something that did happen
Plan                          term + per-person price, covers N members
```

### Account
The signed-in owner. Identity is the **phone number** (any country code), verified by a six-digit code over **WhatsApp or SMS** (WhatsApp is the suggested default abroad). Fields seen in onboarding: name, city of residence (for time zone), app language.

### Member
A person covered by the plan.
- `relation`: Myself, Partner, Mother, Father, Mother-in-law, Father-in-law, Someone else.
- `name`, `age`, `language`, `phone`, `best_time_to_call`.
- `consent_acknowledged`: the owner confirms the member knows they're being set up. The care team still asks the member on the first call before sharing results with the owner.
- `household_id`.
- `phase`: see §5.
- The owner as a member ("Myself") needs no phone, call time or consent fields.

### Household
A home that gets visited.
- `label` ("Parents' home"), `short_label` ("Parents"), `city`, `address`, `members[]`.
- **One address per household**, entered once, regardless of how many members live there.
- **One home visit covers every member in the household.**

**Decided — people first, then homes.** Onboarding asks about people (no addresses), then groups them into homes.
- *Why:* asking for an address per person makes couples type the same address twice, early in signup.

**Decided — default grouping by relation.** Members start in a household chosen from their relation:

| Relation | Default household |
| --- | --- |
| Myself, Partner | Your home |
| Mother, Father | Parents' home |
| Mother-in-law, Father-in-law | In-laws' home |
| Someone else | Another home |

The owner can move anyone ("Someone lives somewhere else"), including into a new household. Easy by default, flexible when needed.

### Task
**Something that is going to happen** for a member: a prep call, a home test, results arriving, a consult, a retest, a form to finish. Tasks are the backbone of Home and the natural unit for operations, notifications and the care-team queue.

Suggested fields:

| Field | Notes |
| --- | --- |
| `id` | |
| `member_id`, `household_id` | household is denormalised for Home queries |
| `type` | `setup`, `intro_call`, `prep_call`, `home_test`, `results`, `doctor_read`, `consult`, `plan_checkin`, `mid_plan_check`, `retest`, `yearly_check` |
| `title`, `note` | short, plain language: "Home blood test", "Ravi visits" |
| `due` | date, optional time window ("Tomorrow, 7–9am") or a vague bucket ("Now", "This week", "By 27 Sep") |
| `owner` | who does it: `family`, `care_team`, `lab`, `doctor` |
| `needs_family_action` | true when the owner must do something |
| `action` | label + deep link, only when `needs_family_action` ("Reschedule", "Book a morning", "Finish setup") |
| `status` | `scheduled`, `due`, `done`, `cancelled` |

**Decided — completing a task writes an Event.** "Home test booked" → task `home_test` scheduled; "Sample collected" → task done, event logged.

### Event
**Something that happened**, shown in the Updates log.

| Field | Notes |
| --- | --- |
| `member_id`, `household_id` | |
| `kind` | `setup`, `care`, `test`, `doctor`, `plan` (drives icon and colour) |
| `title` | "Results are in", "Priya called Sarita" |
| `brief` | one helpful sentence: "Ravi was on time. Took about ten minutes." |
| `link` | optional label + deep link: "Play 2-min voice note", "See the plan" |
| `occurred_at` | real timestamp (the prototype fakes relative labels) |

### Plan
**Proposed — fixed price per person, two terms.**

| Term | Price per person | Per person, per month |
| --- | --- | --- |
| 1 year (default, "Save $X") | $1,000 | $83 |
| 6 months | $700 | $117 |

- Total = price × number of members. Shown as the sum on the plan screen ("$1,000 × 3 people = $3,000"), the Continue button and the review screen.
- Yearly saving = (6-month price × 2 − yearly price) × people = $400 × people.
- The member count comes from onboarding; there is no separate plan tier per family size.
- Replaces the marketing site's One parent / Two parents / Family plus plans.

---

## 3. Onboarding flow

Eleven steps (prototype pill: *Signup & onboarding*):

1. **Welcome** — family positioning, sign up or sign in.
2. **Phone number** — country code + number, WhatsApp or SMS.
3. **Verify** — six-digit code.
4. **About you** — name, where you live, app language.
5. **Who's included** — multi-select relations (§2 Member).
6. **About them** — per person: name, age, language, phone, best time to call, consent checkbox. No address.
7. **Where they live** — household cards with one address each; move people between homes (§2 Household).
8. **Plan** — two terms, totals calculated from the headcount (§2 Plan).
9. **First home visit** — pick a day and a morning slot, or "Let the care team call to arrange". One visit per household; with several homes we aim for the same morning and confirm by phone.
10. **Review and pay** — plan sum, one row per household (people + address), first visit, where updates go. Payment is handed off to the provider.
11. **All set** — introduces the named care manager, who calls each member within a day; then lands on Home.

**Decided — book the first visit inside onboarding**, while intent is high.

**Departure from spec:** the spec's onboarding (§3A) has six screens including health basics (conditions, medicines, allergies). The prototype leaves health basics out of signup; they belong on the intro call or a later step. *Open* whether that's the final call.

---

## 4. Home screen

Home has three parts, top to bottom:

```
┌─────────────────────────────────┐
│ b  [ Parents ● | In-laws ● ]  🔔 │  sticky household switcher
├─────────────────────────────────┤
│ TOMORROW · 7–9AM · AT HOME      │
│ Sarita's blood test is          │  message band (per household,
│ tomorrow morning.               │  swipeable, no actions)
│ Water is fine. Priya calls…     │
│ ✦ Summary of this home's updates│
├─────────────────────────────────┤
│ COMING UP · PARENTS' HOME       │  open tasks, by date
│ UPDATES · PARENTS' HOME         │  event log, newest first
└─────────────────────────────────┘
```

### 4.1 Household switcher
**Decided — the switcher lives in a sticky top bar and scopes the whole screen.**
- *Why:* when the switcher sat inside the message area, it wasn't obvious that switching also changed the lists below. In the top bar it reads as page-level context and stays visible while scrolling.
- A segmented control with one segment per household (short label + house icon), plus a dot coloured by that home's state (§4.2 tones).
- Swiping the message band also switches household; both stay in sync.
- With one household, the bar shows the wordmark instead.
- *Build:* the selected household is screen state; every Home query filters by `household_id`.

**Decided — households, not individual members, are the unit of the switcher.** Fewer slides, less overwhelming, and it matches how visits happen.

### 4.2 Message band
**Decided — the top of Home is a message, not a card, and carries no actions.**
- *Why:* set in large type directly in the header, it gets more prominence than a card. Actions moved to Coming up, which already handles several things needing attention.
- Contents: a short heading (e.g. "RETEST IN 10 DAYS"), one headline sentence, one or two supporting sentences, and a provenance line ("Summary of this home's updates · 9:40am").
- The band's background takes a tone from the most urgent state in the household: **welcome/sky** (something to do or know), **calm/green** (progress, on track), **attention/amber** (something due). Never red.
- Long headlines (over ~48 characters) drop one type size so they stay within 3–4 lines.

**Decided — the message is generated by an LLM** from:
1. household details (members, relations, city, language);
2. open tasks for the household (Coming up);
3. recent events for the household (Updates);
4. context: time of day, time since the owner last opened the app.

The prototype uses templates (`HomeStates.jsx`) to show the intended shape. Build notes:
- **Structured output**: `{ tone, heading, headline, supporting }`, not free text, so layout and tone stay deterministic.
- **Selection is rules-based; wording is generated.** The code picks the lead member by phase priority (§5) and passes it in; the model writes the sentences. This keeps the spec's "rules-based hero" (§2) while allowing natural wording.
- **One headline about the lead member**; other members who need something get one short supporting sentence each ("Anil's retest needs booking this week.").
- **Copy rules the model must follow** (from the spec §0, §2, §2b, §9):
  - no clinical values (no "HbA1c 6.2"), at most one progress number phrased as achievement ("5 of 7 walks");
  - no guilt, no streak-loss language, no invented urgency;
  - time-bound ("until the retest on 12 Nov");
  - plain words, Hindi-ready (allow ~30% expansion);
  - don't claim anything the events don't support.
- **Regenerate when** a task or event changes for the household, and on time-of-day boundaries. Cache per household.
- **Fallback**: templated copy per phase (as in the prototype) if generation fails or is slow.
- **Variants**: the spec wants the message never to repeat twice in a row. The prototype's "Another wording" button stands in for that.

**Return-gap rules** (spec §2), applied before generation:

| Last opened | Behaviour |
| --- | --- |
| Earlier today | Same message, don't reset |
| 1–3 days | Normal |
| 4–14 days | A "Welcome back" line summarising what changed, above the band |
| 14+ days | A first "Everyone" slide: "Let's pick this up", offering a call with the care manager. Skipped if any household has urgent logistics (onboarding unfinished, test tomorrow) |

**Time of day** changes wording within a phase (e.g. pre-test switches to fasting in the evening; plan-active is quiet late at night).

### 4.3 Coming up
**Decided — open tasks for the selected household, in date order.**
- Row: day (+ time) · title · "Member · note".
- Tasks with `needs_family_action` are tinted and show a small action link under the title. They are **not** moved to the top; order stays chronological.
- Tasks without actions show a check icon and wording like "Priya calls. Nothing for you to do": reassurance that it's handled.
- Section title names the scope: "Coming up · Parents' home".
- The lead item in the message band can also appear here; the band states it, the list is where you act on it.

### 4.4 Updates
**Decided — a log of events for the selected household, newest first.**
- Compact card: kind icon (colour per kind), title, relative time, "Member · brief", optional link.
- Newest item is outlined.
- Show 5, then "See all N updates".
- Section title names the scope: "Updates · Parents' home".
- *Why:* the owner wants to see that things are happening without calling anyone. Each entry should be useful on its own (who, what, one helpful detail).

**Removed from Home:** per-member status cards and the care-manager card. Member status is carried by the message band, Coming up and the switcher dots; the care manager is reachable from the Care team tab and appears in Updates.

---

## 5. Phase model

From the spec §1, unchanged. Each member is in exactly one phase; the phase decides which tasks are open and which events have happened.

Priority order (highest first) used to pick the household's lead member:

| # | Phase | Example message | Tone | Family action? |
| --- | --- | --- | --- | --- |
| 1 | ONBOARDING | "One step left before we can call Sarita." | welcome | Finish setup |
| 2 | PRE_TEST | "Sarita's blood test is tomorrow morning." | welcome | Reschedule (optional) |
| 3 | REPORT_READY | "Kusum's results are in." | welcome | Read; book consult |
| 4 | AWAITING_CONSULT | "Anything you want Dr Rao to cover for Sarita?" | welcome | Add a question |
| 5 | SAMPLE_COLLECTED | "Sarita's sample is safely at the lab." | calm | — |
| 6 | RETEST_DUE | "Time to book Anil's retest." | attention | Book |
| 7 | DORMANT | "It's been seven months since Anil's last check." | attention | Book |
| 8 | MID_PLAN_CHECK | "Priya will call Sarita on Thursday for a quick check." | calm | Change time (optional) |
| 9 | PLAN_ACTIVE | "Sarita has walked 5 of 7 mornings this week." | calm | — |

The care cycle as events, in order (the prototype marks how far each phase has reached):

joined plan → intro call → home test booked → prep call → sample collected → results in → doctor's read → consultation → plan started → week 2 check-in → week 5 check → (retest)

*Build:* phase can be derived from the latest events and open tasks rather than stored separately; either way, events and tasks are the source of truth.

---

## 6. UI patterns

**Decided — person cards: avatar in a top row with short items only.** Where a card shows a person, the avatar shares a top row with short things (status badge, hours) and the name gets the card's full width below. Avatars beside the name took width without adding height, and names wrapped. Text that still doesn't fit truncates with "…" rather than wrapping. (Currently used nowhere on Home; kept as the pattern for member lists.)

**Decided — sections are named by scope** when a screen is filtered ("Coming up · In-laws' home").

---

## 7. Open questions

| Question | Context |
| --- | --- |
| **Currency** | Plan prices are in USD; the rest of the app and the payment note ("UPI or card") assume India. Price in USD for owners abroad, INR at home, or both? |
| **What each term includes** | Prototype assumes quarterly checks: four a year, two in six months. |
| **Home visits outside India** | An owner living abroad who adds "Myself" can't get a home visit today. The prototype warns on the "Your home" card. |
| **Several homes, one visit slot?** | Prototype asks for one preferred morning for all homes. Per-home slots are more precise but add a step. |
| **Health basics in onboarding** | Spec includes them; prototype defers them to the intro call. |
| **LLM message evaluation** | How we test the generated message against the copy rules, who reviews failures, and how often wording is refreshed. |
| **Task ownership in operations** | Which team member owns each task type, and the SLA shown to the family ("Priya calls within a day"). |
| **Real dates in Updates** | Prototype uses rough relative labels; the build uses real timestamps, grouped by day. |

---

## 8. Prototype map

| File | What it shows |
| --- | --- |
| `index.html` | Flow viewer: pills for flows, step rail, per-flow side panel |
| `OnboardingFlow.jsx` | §3 |
| `HomeStates.jsx` | §4.1, §4.2, §5: phases, household slides, message templates, the Home state panel |
| `HomeFeed.jsx` | §4.3, §4.4: care-cycle events, Coming up, Updates |
| `HomeScreen.jsx` | Home composition and household scoping |
| `Shell.jsx` | Phone frame and bottom navigation |

The *Home state* panel beside the phone sets each member's phase, the time of day and the last-opened gap, so every case in §4–5 can be viewed.
