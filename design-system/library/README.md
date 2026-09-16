# Boring design library

Open `index.html` in a browser, or serve the project root and visit `/library/`. The current local preview is at `http://127.0.0.1:8765/library/` while the preview server is running.

The page includes:

- Brand and downloadable Little b SVGs.
- Clickable colour roles, paired feedback colours, and a contrast checker.
- All 13 typography styles and an editable type preview.
- Spacing, padding, radii, elevation, and layout guidance.
- Interactive buttons, validated inputs, cards, chips, a welcome, and a native dialog.
- Parent-friendly sizing and reduced-motion previews.
- A searchable, filtered, paginated catalogue of all 230 tokens.
- A token inspector with resolved values, dependency chains, source JSON, and copyable CSS.
- Component code examples and setup instructions for code and Tokens Studio in Figma.

## Source and build

The styles use `../tokens/happy-longevity/boring.css`. The catalogue reads `tokens-data.js`, which is generated from the canonical `boring.tokens.json` by the existing token build:

```sh
node tokens/happy-longevity/build.mjs
node tokens/happy-longevity/build.mjs --check
```

`tokens-data.js` is deliberately a local script rather than a network request, so the guide also opens directly from disk. Webfonts need an internet connection; system fonts provide fallbacks. Clipboard support depends on the browser; the inspector always shows selectable code.

Edit `index.html`, `library.css`, and `library.js` for guide content and interactions. Edit the canonical token JSON for token values, then rebuild. The snippets are documented starting points, not a packaged component framework. The Figma handoff creates token variables/styles through Tokens Studio; this task does not create a native Figma component file.
