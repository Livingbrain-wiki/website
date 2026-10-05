# Working in this repository

The livingbrain.wiki marketing site: static HTML, one stylesheet
(`assets/livingbrain.css`), one page script (`assets/livingbrain.js`) and the
brain renderer (`assets/brain.js`), deployed to Cloudflare as a static-assets Worker (`wrangler.toml`). No framework,
no build step, no npm install. [README.md](README.md) has the page map, the
design tokens and the deploy procedure.

- **Preview:** `python3 -m http.server 8080` from the repo root.
- **Build check:** `tools/build-dist.sh` must pass (it fails if a cache stamp
  does not apply or the CSP hash is stale). Never commit `dist/`.
- **Deploy:** only `tools/deploy.sh`, and only when the user asks. It deploys
  `origin/main`, not your working copy.
- **No-JS state:** after changing the sample data in `assets/livingbrain.js`
  (between `data:start` and `data:end`) or the generator in `assets/brain.js`,
  run `node tools/prerender.js`. Never hand-edit between its markers.
- **Logos and harness list:** edit `assets/harnesses.json` or
  `tools/integrations.json`, then `node tools/marks.js` (it writes the
  `marks-*` regions; never hand-edit between them). A new logo needs
  `tools/fetch-simple-icons.sh` first and a COPY.md Marks row.
- **Images:** edit `tools/*-render.html`, then `tools/render-og.sh` (macOS,
  needs Google Chrome). Never hand-edit the PNGs.
- **Pages:** the site is several static pages, each a `folder/index.html`
  served at `/folder/`: `/`, `/how-it-works/`, `/agents/`, `/integrations/`,
  `/security/`, `/pricing/`, `/faq/`, `/docs/`, `/guides/import-chatgpt/`. They share the
  header (nav with `aria-current="page"` on the active link, plus the small-screen
  `<details>` menu) and the waitlist footer; copy those from an existing page.
  Keep the home page short: it links out, it does not repeat.
- **New page?** Add it to `PAGES` in `tools/build-dist.sh` (that is both the
  allowlist and the CSP-hash loop), to `sitemap.xml`, to `llms.txt`, to the nav
  and footer of every page, and to the page map in README.md. If it has prerendered
  parts, add it to the `pages` list in `tools/prerender.js`.
- **New public file?** Add it to the allowlist in `tools/build-dist.sh`, or it
  will not ship.
- **Inline theme script:** `_headers` allows it by sha256. Change the script,
  change the hash (`tools/build-dist.sh` tells you the new one).

Rules that matter most:

1. Living Brain is **in design, not built**. Never write copy that implies it
   works. Status badge stays "EARLY ACCESS · IN DESIGN"; every mock is labelled
   "Illustration" or "Sample data"; prices are labelled planned.
2. A claim on the site must have a row in [COPY.md](COPY.md), and lives on one
   page (others link to it). The FAQ on `/faq/`, its JSON-LD `FAQPage` (the only
   one on the site) and `llms.txt` must agree word for word.
3. The page is a port of `design-src/Living Brain.dc.html` (claude.ai/design).
   Keep it faithful; record every divergence in COPY.md. Respect
   `prefers-reduced-motion`.
4. Keep both themes AA, keep 360px free of horizontal scroll, keep focus visible.
5. Copy voice: short, plain sentences. No "seamless", "supercharge", "unlock",
   "AI-powered", "revolutionary", "magic". Don't name the learning layer's
   vendor; call it "the learning layer". Imply no partnership. Other
   companies' logos come only through `tools/marks.js` (data in
   `assets/harnesses.json` and `tools/integrations.json`), each with a row in
   COPY.md's Marks table; where no official mark exists or the owner forbids
   it, show the name only. Never hotlink or redraw a logo.
6. Do not ship or commit the design's `support.js` runtime.
