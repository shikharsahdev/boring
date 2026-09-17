# Family app — UI kit

Updated to the approved little b identity. The shared stylesheet resolves every existing token alias to the happy-longevity source, and the header uses LittleB.

A click-through of the Boring mobile app flows: the surface the paying adult child uses.

Open `index.html`. Product decisions behind these flows (data model, tasks and events, Home behaviour, open questions) are recorded in [`DECISIONS.md`](DECISIONS.md). Pills at the top switch between flows; the rail beside the phone lists each flow's steps and jumps to any of them. The URL hash (`#onboarding/plan`, `#app/results`) links straight to a step.

Flows
- **Signup & onboarding** — welcome, phone + code, about you, who you care for, parent details, plan, first visit, review, done. Ends on the App flow's Home.
- **App** — five screens behind a bottom nav, seen from the family owner's (paying) account. On Home, a *Home state* panel beside the phone sets each parent's care phase, the time of day and when the app was last opened; the header is a swipeable carousel with one slide per household, picked from a sticky home switcher in the top bar that scopes the whole screen (Parents' home in Pune, In-laws' home in Mumbai), most urgent first; each slide leads with that household's most urgent member ; below it, *Coming up* (next steps, with the ones that need you tinted and linked) and *Updates* (a log of what has happened) follow the selected home, both derived from each member's phase (phase model and priority stack from the App Product & Screen Spec, §1–2).

To add a flow, write a component that takes `step`/`setStep`, export a steps array (`{ id, label, note }`), and add an entry to `flows` in `index.html`.

| File | Screen |
| --- | --- |
| `OnboardingFlow.jsx` | Signup and onboarding steps, with sample data pre-filled |
| `HomeStates.jsx` | Home header state machine: phases, priority, time-of-day and return-gap copy, and the viewer's state panel |
| `HomeFeed.jsx` | Home body: care-cycle events, the Coming up list and the Updates log |
| `Shell.jsx` | Phone frame, status bar, `AppHeader`, `BottomNav`, scroll container |
| `HomeScreen.jsx` | Family overview — next visit, one card per parent, care-manager row |
| `ResultsScreen.jsx` | Per-parent tabs, doctor's read, 12-marker list with tooltips |
| `VisitsScreen.jsx` | Booking form → confirm sheet → toast, plus past visits |
| `CareScreen.jsx` | Care-manager thread with quick-reply chips and composer |
| `YouScreen.jsx` | Plan, notification switches, language, sharing consents |

Composes the published primitives (`Button`, `Card`, `Badge`, `Tag`, `Tabs`, `Input`, `Select`, `Radio`, `Checkbox`, `Switch`, `Dialog`, `Toast`, `Tooltip`, `Icon`, `IconButton`) — nothing is re-implemented locally except the shell chrome, which is app-specific.

Notes
- Screen size is 390×780 inside a soft device shell; type is one step larger than a typical app because half the audience is 60+.
- `Dialog` needs `@keyframes boring-dialog-in` and a positioned ancestor; both live in `index.html`.
- No product screenshots or photography were supplied, so the content is plausible sample data, not real copy.
- A separate parent-facing mode is described in the brief but was not specified in detail; it is deliberately absent rather than invented.
