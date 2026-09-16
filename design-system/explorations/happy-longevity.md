# Boring: the good in ordinary

The approved visual direction for a happier, more approachable preventive-health brand. The butter-and-blue token library lives in `../tokens/happy-longevity/README.md`. Open `happy-longevity.html` to compare palettes, try the loader, and see the identity in a sample member screen. The page also works from a local file; Google Fonts needs an internet connection and has system fallbacks.

## The idea

**A little care. A lot more living.** Boring takes care of the health routines that make room for everyday life. The emotional destination is contentment, familiarity, and time with people you love.

The earlier system communicates restraint through a sharp Bodoni display face, cool paper, petrol, and an abstract radiating mark. This exploration adds an identifiable character, a softer typographic voice, and warmer colour. The saved Headspace references informed the gentle presence and expression; the new silhouette comes from Boring's own initial.

## Little b

A rounded lowercase b with two small eyes and an asymmetric smile. The upright is part of the letter, not an extra decorative element. The same outline works as the primary brand mark, an app icon, a monochrome stamp, and a loading character.

- Use the static mark by default. Animation belongs to a real loading operation or the explicitly labelled motion study.
- Keep clear space around the mark of at least one stem width. Do not stretch it or rotate it more than 10 degrees.
- Use the full face at 24 px and above. A separate simplified favicon drawing should be developed before shipping at 16 px.
- Pair with a lowercase Nunito Sans 800 wordmark. This exploration uses live type; the final approved wordmark should be optically spaced and exported as outlines.
- The SVG assets have transparent backgrounds. Ink and paper variants cut the face out with an SVG mask; they do not rely on a white rectangle.

## Colour

| Role | Butter & blue (recommended) | Apricot & pine | Lilac & plum |
| --- | --- | --- | --- |
| Page | `#FFFBF2` | `#FBF9F1` | `#FCF9F5` |
| Text and action | `#294968` | `#315449` | `#554261` |
| Character | `#F2CA66` | `#EFB38D` | `#CDC2E8` |
| Welcome surface | `#E0EDF4` | `#E2EBDF` | `#EBE5F2` |
| Quiet warm surface | `#F7EFD9` | `#F5E9DC` | `#F3EBE6` |

Butter & blue brings sunshine into the character and uses deep blue to anchor text and controls. Colour lives in broad, flat surfaces. Cream and open space keep it quiet. The alternate palettes are live comparisons of the same system, not separate logo designs.

## Typography and shape

Nunito Sans 700 for display, 800 for the wordmark; DM Sans 400–600 for body and UI. Open counters, rounded shoulders, and a steadier stroke replace the earlier high-contrast serif register. This font selection belongs to the approved Little b direction and is recorded in its token library.

Use generous line spacing, 20–26 px corners on large brand surfaces, and 12–18 px corners on controls and product cards. Keep clinical numbers in a readable sans with tabular figures. Parent-facing production screens still need the original 19–21 px body size and 56 px tap targets, plus bilingual typography validation; the included member screen is an illustrative coordinator view.

## Motion

The body settles between -5 and +4 degrees with a 3 px rise over 3.6 seconds. Eyes blink briefly over a separate 5.4-second cycle. There is no spinning, bouncing, or confetti. CSS custom properties pass the animation and pause state into the SVG symbol instance.

Respect `prefers-reduced-motion`; keep the character still and communicate progress with text. The loading study has a pause control and a replay that ends after 3.6 seconds. In production, completion must be driven by the actual operation, never by this demonstration timer.

## Tone and trust

Use the smile at the welcome, during brief waits, and when an ordinary administrative action finishes. For results, errors, or difficult news, use plain information, an accurate status, and a human next step. Brand optimism must never suppress urgency or suggest that an unreviewed result is normal. Decorative yellow is not a clinical status colour.

The example appointment dates, names, and care experience are illustrative. No medical conclusion or real appointment is represented. The family switch, visit details, and care button are local demonstrations only.

## Deliverables

- `happy-longevity.html`, `.css`, `.js`: responsive interactive direction board.
- `../assets/little-b/little-b-daylight.svg`: recommended colour mark.
- `../assets/little-b/little-b-garden.svg`, `little-b-soft.svg`: alternate colour marks.
- `../assets/little-b/little-b-ink.svg`, `little-b-paper.svg`: one-colour transparent marks.

This exploration consumes the approved token library for its primary palette, fonts, key shapes, and loader settings. The previous tokens, Breath component, generated bundle, and UI kits retain their older implementation. The next migration pass should bind those components to the approved token roles and regenerate the bundle together.
