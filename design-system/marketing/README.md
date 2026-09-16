# Current marketing source

Edit `index.html`, `site.css`, and `site.js` here, then run `node scripts/build-marketing.mjs` from the project root.

Generated entry points:
- `/index.html` — standard linked site, served at `/`.
- `/Boring Marketing Site.html` — embedded local styles, scripts, and brand SVG.
- `/ui_kits/site/index.html` — the same site at the kit entry point.
- `/ui_kits/site/standalone.html` — embedded kit export.

`--check` detects stale generated pages. The standalone files retain live font imports and relative links to the family app and library; the marketing content itself works offline with fallback fonts. No form data is sent or saved. Confirm plan details and wire a real enquiry service before publishing.
