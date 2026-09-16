# Family app — UI kit

Updated to the approved little b identity. The shared stylesheet resolves every existing token alias to the happy-longevity source, and the header uses LittleB.

A click-through recreation of the Boring mobile app: the surface the paying adult child uses. Five screens behind a bottom nav.

Open `index.html`.

| File | Screen |
| --- | --- |
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
