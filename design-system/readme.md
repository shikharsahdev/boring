# Boring — design system

Boring makes room for more of the days that matter. Preventive healthcare for Indian families, with a warm, trustworthy identity: little b, butter yellow, ink blue, warm paper, and rounded typography.

## Start here

- [Marketing site](index.html) — the current responsive site, with family care, plans, questions, and a local enquiry preview.
- [Design library](library/index.html) — all 230 tokens, live components, usage examples, accessibility, and Figma handoff instructions.
- [Family app preview](ui_kits/app/index.html) — the existing app flow, now using the current identity and shared tokens.
- [Token source and exports](tokens/happy-longevity/README.md) — canonical JSON, generated CSS, and Tokens Studio JSON.
- [Single-file marketing export](Boring%20Marketing%20Site.html) — local CSS, JavaScript and brand assets embedded. Google Fonts need a connection; system fallbacks work without one.

Serve the folder with `python3 -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765/`.

## The current identity

**Little b.** The smiling lowercase b is the brand companion. Pair the butter character with the lowercase `boring` wordmark in Nunito Sans 800. Keep the face ink blue and allow breathing room. SVG variants are in `assets/little-b/`; daylight is the default. Waiting uses a gentle settle and occasional blink, with reduced-motion support. The React `LittleB` export lives in `components/core/Breath.jsx`; `Breath` remains a compatibility alias and renders the current mark.

**Colour.** Warm paper `#FFFBF2`, ink `#294968`, butter `#F2CA66`, and sky `#E0EDF4`. Use semantic `--boring-color-*` roles in new code. Yellow is a character/accent colour; use ink for readable actions and text. Success, attention, error, and information have explicit foreground/background pairs. Status always needs words, not colour alone.

**Type.** Nunito Sans 700 for headings, DM Sans for body and controls, Nunito Sans 800 for the wordmark. Body starts at 17 px; parent-facing reading uses 21 px with 56 px controls. Mukta is the proposed Hindi/Marathi companion; translated layouts need native-speaker review. Allow roughly 30% text expansion.

**Shape and space.** A 4 px spacing base, 24 px card padding, 12 px control corners, 18 px cards, and 26–32 px welcoming panels. Flat colour, generous space, soft shapes, and occasional subtle blue shadows. Keep functional text and controls comfortably readable.

**Motion.** Use the shared timing tokens. Little b settles over 3.6 seconds and blinks on a 5.4-second cycle only while an operation is pending. End waiting when the operation completes, and honour `prefers-reduced-motion`.

**Voice.** Friendly, clear, and calm. Talk about people, their families, and everyday life. Explain clinical terms. Avoid invented urgency, fear, achievements, or promises that have not been verified. Keep errors specific and actionable; do not hide necessary information to sound positive.

## Files and compatibility

`styles.css` loads the approved token export first, then fonts, compatibility aliases, and base styles. Existing names such as `--petrol-600` and `--gradient-light` remain only so old consumer code still runs; they now resolve to ink blue and a flat sky surface. New work should use namespaced tokens directly.

The component sources, compiled `_ds_bundle.js`, previews, thumbnail, and `_ds_manifest.json` use the current brand. All marketing HTML entry points are generated from `marketing/index.html`, `marketing/site.css`, and `marketing/site.js`. The React marketing fragments remain examples; the static marketing source is the current complete website.

Earlier meadow/tide explorations are explicitly marked archived. The approved happy-longevity exploration and the library remain available. Uploaded reference screenshots are retained as references.

## Rebuild and verify

```sh
node tokens/happy-longevity/build.mjs
node scripts/build-marketing.mjs
node tokens/happy-longevity/build.mjs --check
node scripts/build-marketing.mjs --check
```

After changing React component sources, rebuild `_ds_bundle.js` with `node scripts/build-components.cjs`. It expects `@babel/standalone`, or an existing Babel standalone runtime supplied through `BABEL_PATH`. The component preview pages also use React and Babel from their pinned CDN URLs.

The marketing form validates locally and sends nothing. Plans, dates, app records, services, and pricing are illustrative content, not a live service commitment. The site avoids fabricated testimonials and customer metrics. A production launch needs confirmed content and a real enquiry integration.
