# Marketing site

Open `index.html` for the complete current site. `standalone.html` is the equivalent embedded export. Both are generated from the shared `marketing/` source at the project root and use the approved little b identity.

`Site.jsx`, `HomePage.jsx`, `PlansPage.jsx`, and `ParentsPage.jsx` are React composition examples using the same shared tokens and components. The static site is the canonical complete marketing experience.

Rebuild all HTML entry points with `node scripts/build-marketing.mjs` from the project root. The site includes mobile navigation, keyboard-accessible audience tabs, plan selection, FAQ disclosures, and local form validation. Forms send nothing. Pricing and services are illustrative.
