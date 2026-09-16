# Boring design tokens · Happy Longevity 1.0

The reusable foundations for the approved **butter yellow + ink blue** direction and Little b identity. This package is the token layer of the design system. It does not contain a native `.fig` file or a published Figma component library.

## Visual library

Open [`../../library/index.html`](../../library/index.html) for live swatches, typography, spacing, component examples, copyable usage snippets, and a searchable inspector for every token. The build also generates `../../library/tokens-data.js`, so its catalogue stays synchronized with this source.

## Files

| File | Purpose |
| --- | --- |
| `boring.tokens.json` | Canonical source, following the DTCG 2025.10 token format. Edit this file. |
| `boring.css` | Generated, namespaced CSS custom properties for websites and apps. |
| `boring.tokens-studio.json` | Generated single token set in Tokens Studio legacy format, for the Figma plugin. |
| `motion.css` | Optional Little b loading animation, with reduced-motion handling. |
| `build.mjs` | Dependency-free validator and exporter. Requires Node.js 18 or newer. |
| `validation.json` | Generated token count, checks, contrast ratios, and validation limits. |

There are 230 named tokens. CSS and Figma exports come from the same JSON source. The source uses explicit types and aliases, so changing a base colour propagates to its semantic and component roles.

## Organisation

1. **Base values:** `palette`, `font`, `space`, `radius`, `border`, `size`, `layout`, `motion`, `opacity`, `layer`, `shadow`.
2. **Semantic roles:** `color.surface.page`, `color.text.primary`, `color.action.primary`, `typography.body`, and related roles explain where values belong.
3. **Component settings:** `component.button`, `card`, `input`, `chip`, `welcome`, `focus`, `loader`, and `dialog` reference those shared decisions.

Use semantic or component tokens in screens; use base tokens when defining new roles. For example:

```text
palette.ink (#294968)
  → color.action.primary
    → component.button.background
```

## The approved foundation

| Role | Value |
| --- | --- |
| Warm paper | `#FFFBF2` |
| Card surface | `#FFFEFA` |
| Primary ink | `#294968` |
| Secondary text | `#596978` |
| Little b | `#F2CA66` |
| Welcome blue | `#E0EDF4` |
| Warm wash | `#F7EFD9` |
| Display / wordmark | Nunito Sans 700 / 800 |
| Body / controls | DM Sans 400–600 |
| Standard / parent body | 17 px / 21 px |
| Minimum / parent touch target | 48 px / 56 px |
| Control / card / hero corners | 12 px / 18 px / 26 px |
| Loader / blink cycle | 3600 ms / 5400 ms |

The identity colours, typefaces, and character motion come from the approved exploration. Hover/pressed states, form borders, feedback colours, and reusable product sizing are supporting additions. They are identified in token descriptions. Very small annotation text in the direction board is not the production body-text scale. The other two palette experiments remain in the exploration; this package defines the selected light theme only.

## Use in code

Load the fonts separately, then the generated CSS. The token file has no network imports, resets, element styles, or dependency on the older design-system CSS.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Nunito+Sans:opsz,wght@6..12,600;6..12,700;6..12,800&display=swap">
<link rel="stylesheet" href="/tokens/happy-longevity/boring.css">
```

```css
body {
  color: var(--boring-color-text-primary);
  background: var(--boring-color-surface-page);
  font: var(--boring-typography-body);
  letter-spacing: var(--boring-typography-body-letter-spacing);
}
.primary-button {
  min-height: var(--boring-component-button-height);
  padding-inline: var(--boring-component-button-padding-inline);
  border: 0;
  border-radius: var(--boring-component-button-radius);
  background: var(--boring-component-button-background);
  color: var(--boring-component-button-text);
  font: var(--boring-component-button-type);
}
.primary-button:hover { background: var(--boring-component-button-hover); }
.primary-button:active { background: var(--boring-component-button-pressed); }
.primary-button:focus-visible {
  outline: var(--boring-component-focus-width) solid var(--boring-component-focus-color);
  outline-offset: var(--boring-component-focus-offset);
}
[data-audience="parent"] .primary-button {
  min-height: var(--boring-component-button-parent-height);
}
```

Every typography token exports a CSS font shorthand and five individual properties ending in `-font-family`, `-font-size`, `-font-weight`, `-line-height`, and `-letter-spacing`. CSS font shorthand does not include letter spacing, so apply that separately. Add suitable system font fallbacks in production. Nunito Sans and DM Sans are the approved families for this direction. Mukta is a proposed Devanagari companion that still needs bilingual layout validation.

For Little b, use the SVG assets in `../../assets/little-b/`. Static marks remain the default. To animate an inline SVG, load `motion.css`, apply `boring-loader` to the SVG, and apply `boring-loader-eyes` to its eye group. Provide adjacent progress text in a `role="status"` region and make the decorative SVG `aria-hidden="true"`. Remove the loader class when the operation actually finishes. The durations are motion cycles, never fake network-completion timers. Respect reduced motion for every additional transition you implement.

Breakpoint tokens are documentation/build inputs; CSS custom properties cannot be used directly inside media-query conditions. Use 720 px, 1050 px, and 1500 px in media queries or resolve those values at build time.

## Bring into Figma

The Figma handoff is `boring.tokens-studio.json`, a **single token set**, not a whole Tokens Studio project or native Figma Variables import file.

1. In the destination Figma design file, open Tokens Studio and use its **legacy** token-format setting for this export.
2. Create a token set named `boring/happy-longevity`. Select it, switch to JSON view, paste the entire contents of `boring.tokens-studio.json`, and save.
3. Enable the set. Use **Styles & Variables → Export Styles & Variables**. Export colours as Color Variables and dimensions/numbers as Number Variables. Export typography as Text Styles and shadows as Effect Styles. Select the corresponding supported types; do not export the same colours as both variables and styles in one pass.
4. Keep the full token names for traceability. Load Nunito Sans and DM Sans in the design environment, then check body and heading styles. Line-height multipliers have already been converted to percentages for Figma.
5. Build component variants and bind them to these variables/styles. That is the next layer of a native Figma design library; importing tokens does not create button/input/card components by itself.

Durations and easing curves are preserved as Tokens Studio `other` tokens for handoff. They do not become native Figma variables or configure prototype animations automatically. This export has been generated and checked locally; it has not been imported into a live Figma file in this task.

These instructions follow the official [Tokens Studio format documentation](https://docs.tokens.studio/manage-settings/token-format), [JSON editing guidance](https://docs.tokens.studio/manage-tokens/token-names/), and [Figma export options](https://docs.tokens.studio/figma/export/options). The canonical file follows the [DTCG format](https://www.designtokens.org/tr/2025.10/format/) and [colour representation](https://www.designtokens.org/tr/2025.10/color/). The compatibility export handles the plugin's [percentage line heights](https://docs.tokens.studio/manage-tokens/token-types/typography/line-height) and [Other tokens](https://docs.tokens.studio/manage-tokens/token-types/other).

## Maintain and validate

From the repository root:

```sh
node tokens/happy-longevity/build.mjs
node tokens/happy-longevity/build.mjs --check
```

The first command validates and regenerates the CSS, Tokens Studio file, and validation report. The second fails if any export is stale. There is no install step. Validation checks references, cycles, alias types, values, CSS naming collisions, and 14 text/control contrast pairings. It is a targeted validator for this package, not a universal DTCG conformance test or an accessibility certification for complete screens.

The exploration, visual library, marketing site, shared components, and family app now use this source. `styles.css` imports it first; `tokens/*.css` provides compatibility aliases for existing consumers. The component bundle has been regenerated with little b. Use namespaced tokens for new work. Earlier meadow/tide explorations are labelled archived.

Brand optimism must preserve useful information. The butter colour is decorative, not an attention status. Use status text and meaningful icons alongside colour. Form errors and genuinely urgent information must stay explicit; no smile or animation should minimize difficult news.
