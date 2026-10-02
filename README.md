<p align="center">
  <img src="assets/readme-banner.png" alt="livingbrain.wiki. A living brain for your crew." width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SITE-NOT%20DEPLOYED-8E9B9E?style=flat-square&labelColor=070F11" alt="Site: not deployed">
  <img src="https://img.shields.io/badge/LIVING%20BRAIN-IN%20DESIGN-56F1B0?style=flat-square&labelColor=070F11" alt="Living Brain: in design">
  <img src="https://img.shields.io/badge/PAGES-1-E9F0F0?style=flat-square&labelColor=070F11" alt="Pages: 1">
  <img src="https://img.shields.io/badge/STACK-VANILLA%20JS-E9F0F0?style=flat-square&labelColor=070F11" alt="Stack: vanilla JS">
  <img src="https://img.shields.io/badge/BUILD%20STEP-NONE-E9F0F0?style=flat-square&labelColor=070F11" alt="Build step: none">
  <img src="https://img.shields.io/badge/DEPENDENCIES-ZERO-56F1B0?style=flat-square&labelColor=070F11" alt="Dependencies: zero">
  <img src="https://img.shields.io/badge/DEPLOY-CLOUDFLARE%20WORKERS-E9F0F0?style=flat-square&labelColor=070F11" alt="Deploy: Cloudflare Workers">
  <img src="https://img.shields.io/badge/AGENT%20READABLE-YES-E9F0F0?style=flat-square&labelColor=070F11" alt="Agent readable: yes">
</p>

<p align="center">
  <b>livingbrain.wiki</b> · a <a href="https://factory0.ventures">Factory Zero</a> venture · sister to <a href="https://colonizer.dev">Colonizer</a>
</p>

---

# The site

This repository is the marketing site for **Living Brain**: one page, one
stylesheet, one page script and the brain renderer, served by Cloudflare (a static-assets Worker).
There is no framework, no bundler, no build step and no runtime dependency. It
follows the structure of the sealb.in and Colonizer sites.

| | What it is | Status |
| :--- | :--- | :--- |
| **Site** | This repository: the landing page, its metadata, `llms.txt`, the Open Graph card. | **Live** at livingbrain.wiki. The waitlist API is not deployed yet |
| **Waitlist** | A Cratefield waitlist Worker at `api.livingbrain.wiki`, same contract as sealb.in and Colonizer. | **Not deployed.** The form says "The list isn't open yet." |
| **Living Brain** | The product: Slack teammate, MCP server, `livingbrain` CLI, PWA, hosted service. | **In design.** The page says so |

> **Your company, remembered.**

## The page

Ported from the Claude Design file **`Living Brain.dc.html`** (claude.ai/design
project `64188b59-b651-4bfe-803d-b8ef935c8fad`), kept in [`design-src/`](design-src)
with the `Brand Sheet.dc.html`, `brain.js` and `llms.txt` it came with. The
design's React runtime (`support.js`) is not shipped or committed:
markup and styles are static, and `assets/livingbrain.js` reimplements its logic.

| Anchor | Section | Job |
| :--- | :--- | :--- |
| `#top` | Hero | Headline, waitlist form, and a rotating 3D knowledge-graph brain you can drag to turn |
| | Use it from anywhere | Slack (first); MCP, the `livingbrain` CLI and the PWA (planned); a CLI illustration |
| `#slack` | Speaks up | A mock #eng thread: the answer draws a citation trail back to its source message |
| `#how` | Listen. Write. Evolve. | Three animated steps, the pipeline infographic, the nightly loop |
| `#demo` | Explore a sample brain | An explorable 3D graph of a fictional company: orbit, zoom, filter by type, open any page with its sources |
| `#features` | A teammate, not a search box | Eight capabilities and one night in the brain |
| `#agents` | Coding agents | Connect tabs, an agent session, agents ⇄ brain, the prompt library, the learning layer |
| `#colonizer` | Works with Colonizer | Slack → brief → colony → pull request → learnings |
| `#privacy` | Private by design | Access rings and table |
| `#own` | You own it | A Markdown file, the graph, thirty sample days |
| `#pricing` | Pricing | Community (free, self-hosted), Teams ($5), Crew ($9); per workspace; planned |
| `#faq` | Questions | Nine answers, native `<details>` |
| `#waitlist` | Footer | The second waitlist form |

Plus `404.html`, `llms.txt`, `sitemap.xml`, `robots.txt`, `site.webmanifest`,
`.well-known/security.txt` and the images.

## Design

Dark by default; light follows the system preference, and the header toggle
stores a choice as `lb-theme` (changing it fires a `lb-theme` event so the
canvases recolour). Fonts, self-hosted: **Bricolage Grotesque** (display),
**Hanken Grotesk** (body), **JetBrains Mono** (Markdown, labels, code). The
mark is a ring (the brain) around one live node in the accent.

| Token | Dark | Light |
| :--- | :--- | :--- |
| `--bg` | `oklch(0.16 0.014 215)` | `oklch(0.975 0.006 190)` |
| `--ink` | `oklch(0.95 0.008 200)` | `oklch(0.22 0.02 220)` |
| `--ink2` | `oklch(0.8 0.014 205)` | `oklch(0.4 0.02 215)` |
| `--accent` | `oklch(0.86 0.16 162)` | `oklch(0.48 0.11 165)` |
| `--t-person` / `project` / `decision` / `customer` | entity colours, graph nodes only | darker in light for AA |

Every animation sits on its final frame under `prefers-reduced-motion`; the
brains render still and the 3D views turn only when you turn them. Responsive
to 360px with no horizontal scroll.

## Layout

```
.
├── index.html                  the page
├── 404.html
├── assets/
│   ├── livingbrain.css         the whole design system, tokens at the top
│   ├── livingbrain.js          theme, infographics, sample graph, tabs, rings, waitlist; sample data
│   ├── brain.js                the 3D brain renderer (2D canvas, no dependencies), from the design
│   ├── fonts/                  Bricolage Grotesque, Hanken Grotesk, JetBrains Mono (OFL, latin, variable)
│   ├── favicon.svg             the mark
│   ├── og.png                  Open Graph card
│   ├── icon-192.png  icon-512.png  icon-maskable-512.png  apple-touch-icon.png
│   ├── org-avatar.png          GitHub organization avatar, uploaded by hand
│   └── readme-banner.png       the banner above
├── tools/
│   ├── prerender.js            writes the no-JS state into index.html (still brain, demo, tabs, chart)
│   ├── build-dist.sh           assembles dist/ from an allowlist, stamps cache hashes, checks the CSP hash
│   ├── deploy.sh               builds main in a throwaway worktree and deploys it
│   ├── og-render.html          source for og.png
│   ├── banner-render.html      source for the README banner
│   ├── avatar-render.html      source for the org avatar
│   └── render-og.sh            renders all of the above with headless Chrome
├── design-src/                 the Claude Design sources this page was ported from
├── .well-known/security.txt
├── llms.txt  robots.txt  sitemap.xml  site.webmanifest  _headers  _redirects
├── claude-design-prompt.md     the brief the design was made from
├── COPY.md                     every claim on the page, what backs it, and every divergence from the design
└── AGENTS.md                   rules for coding agents (CLAUDE.md points here)
```

## Local preview

```sh
python3 -m http.server 8080
# then http://localhost:8080/
```

The page is complete without JavaScript: the hero shows a still brain (an
inline SVG), every infographic sits on its final frame, the demo shows a
static graph with one page open, the form falls back to `mailto:`, and the FAQ
is native `<details>`. After changing the sample data or `brain.js`'s
generator, rerun `node tools/prerender.js`.

## The waitlist

Both forms post `{ "email": "...", "product": "livingbrain" }` as JSON to
`https://api.livingbrain.wiki/v1/waitlist`: a Cloudflare Worker running
[Cratefield](https://cratefield.com)'s harness `waitlist` module, the same
contract as the sealb.in and Colonizer waitlists. **That Worker is not
deployed yet**, so every submit fails today and the form shows a calm inline
note: "The list isn't open yet. Check back soon." It never fakes a success.
To open the list: deploy the Worker with its own D1 database, route
`api.livingbrain.wiki` to it, allow the `https://livingbrain.wiki` origin, and
test one join from the live site. No Turnstile yet. Without JavaScript the
form falls back to `mailto:hello@livingbrain.wiki`, which needs that mailbox.

## Installable

`site.webmanifest` makes the marketing site installable (standalone, theme
colours from the tokens, 192/512 and maskable icons, Apple meta tags). There is
no service worker: the site is one page and nothing should cache the waitlist
POST. The planned Living Brain web app (a PWA) is a product feature, not this site.

## Regenerating images

```sh
./tools/render-og.sh
```

The OG card, banner and avatar use the same `assets/brain.js` as the site,
frozen on one frame, with the self-hosted fonts and the dark theme pinned.
Upload `assets/org-avatar.png` by hand on the GitHub organization's settings
page; GitHub has no API for it.

## Deploy

A Cloudflare Worker with static assets, `livingbrain-website` (`wrangler.toml`), on
the Factory0 account. It has no script: Cloudflare serves `dist/` and applies
`_headers` and `_redirects`. `livingbrain.wiki` and `www.livingbrain.wiki` are its
custom domains, attached by the deploy itself. The `api.livingbrain.wiki` waitlist
Worker does not exist yet. For every merge to `main`:

```sh
tools/deploy.sh              # deploy origin/main
tools/deploy.sh --dry-run    # build it and say what would ship
```

The script deploys **`origin/main` and nothing else** (or local `main` while
there is no remote): it checks it out into a throwaway worktree, builds there,
deploys that and removes it. It never reads your working copy or its `dist/`.
Do not run `wrangler deploy` from a working copy by hand. Every absolute URL in the
metadata points at `https://livingbrain.wiki`.

## House rules for edits

1. **The product is in design.** Every mock is labelled; prices are planned;
   `llms.txt` tells agents nothing can be installed. See [`COPY.md`](COPY.md).
2. **The design file is the source.** Visual changes start in the Claude
   Design project, then get ported; note anything that diverges in `COPY.md`.
3. **The FAQ moves together.** The visible FAQ, the JSON-LD `FAQPage` and
   `llms.txt` say the same thing. Change one, change all three.
4. **No dark patterns.** One email when there's something to try.

---

<p align="center">
  <sub>No tracking, no cookies, no third-party requests · Built by <a href="https://factory0.ventures">Factory Zero</a></sub>
</p>
