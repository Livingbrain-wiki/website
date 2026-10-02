# Copy ledger

Every factual claim on the page, and what backs it today. The page is a port
of the Claude Design file `Living Brain.dc.html` (project
`64188b59-b651-4bfe-803d-b8ef935c8fad`, copy in `design-src/`). Living Brain
is **in design and not built**; every product claim below is a plan. Rows
marked **needs a decision** or **fix before launch** must be resolved before
anything opens. Updated 2026-10-03.

## Claims

| Claim | Where | Backed by |
| :--- | :--- | :--- |
| Early access, in design; nothing built | Hero badge, footer, llms.txt, JSON-LD | True. Only this site exists |
| A teammate that turns conversations into a Markdown wiki and keeps it true; every fact links to its source message | Hero, Speaks up, How it works, FAQ, llms.txt | Design file and `claude-design-prompt.md`. Planned |
| Use it in Slack, in your coding agent, in your terminal | Hero, meta, OG, JSON-LD, llms.txt | User decision 2026-10-03. Slack is the first chat integration; everything else via MCP or the CLI |
| "Use it from anywhere": Slack (first), any MCP client, the `livingbrain` CLI, App (PWA), each MCP/CLI/PWA marked planned | Strip under the hero, FAQ, llms.txt | User decision 2026-10-03 |
| `livingbrain ask "who owns billing?"` returning a cited answer; `livingbrain mcp` | CLI illustration | Illustration, labelled "Illustrative commands · not live yet". User decision 2026-10-03. **Fix before launch:** the binary does not exist; reserve the name |
| Built in Rust; the CLI is a single static binary that starts instantly; the hosted core runs on Cloudflare's edge | Strip, pricing lede, llms.txt | User decision 2026-10-03 (Rust, fast) and the design file (Rust on Cloudflare's edge). No benchmark numbers on purpose: nothing is built |
| App (PWA): installs on phone and desktop, reads offline, one search-or-ask box, 3D brain one tap away | Strip, feature 08 "Easy to use", FAQ "Is there an app?", llms.txt | User decision 2026-10-03. Planned |
| Speaks up unprompted in a thread, with a citation chip | Speaks up | Design file. Illustration |
| Merges duplicates, flags contradictions, retires stale facts, rewrites summaries, on a schedule | How it works, features, FAQ | Design file. Planned |
| Learns how each person works ("the learning layer") | How it works, agents, FAQ | Design brief. Planned. The vendor behind it is deliberately not named |
| Acts: opens issues, reads PRs, sends digests, hands bigger jobs to a sandboxed agent | Features | Design file. Planned |
| Connects to Claude Code, Codex, Cursor, OpenCode, Claude Desktop and any MCP agent; not affiliated | Strip, agents, FAQ | Design file; Claude Desktop added by user decision 2026-10-03. Names in plain text, no logos |
| `claude mcp add ... https://mcp.livingbrain.wiki`, `codex mcp add ...`, `.cursor/mcp.json`, "14 tools" | Agent connect tabs | Illustration from the design, labelled "not live yet". **Fix before launch:** check each command against the agent's current docs; `mcp.livingbrain.wiki` does not exist |
| Agent prompts and decisions become pages only with opt-in; secrets redacted; code never stored unless allowed | Agents, FAQ | Design file. Planned. **Needs a decision:** how redaction works and what "allow" means |
| Works with Colonizer, a sister Factory Zero venture, launching microVM colonies that return PRs | Colonizer section, llms.txt | Design brief. Colonizer exists at colonizer.dev; the integration is planned |
| Reads only with the asker's own access; public channel / private channel / DMs table | Private by design | Design file. Planned. **Needs a decision:** how this maps to MCP and the CLI |
| Plain Markdown, exportable, opens in Obsidian; not a black-box vector store | You own it | Design file. Planned |
| Not used for training | FAQ | Design file. A promise to keep; **needs** a privacy policy before launch |
| Bring your own LLM: Anthropic, OpenAI, OpenRouter, your LiteLLM gateway, or any OpenAI-compatible endpoint | FAQ "Which models?", llms.txt | Design file; LiteLLM added by user decision 2026-10-03. Plain text, no logos |
| Pricing per workspace, planned: Community free (self-hosted on your own Cloudflare account, your own LLM key, up to 5 people, all core features); Teams $5/mo (unlimited people, SSO, admin and audit log, shared prompt library, per-channel policies; self-hosted with a license key or hosted with your own LLM key); Crew $9/mo (hosted, $3/month DeepSeek credit included or bring your own LLM, up to 25 people, team features). No hosted plan is free | Pricing, FAQ, llms.txt | User decision 2026-10-03 (open core), replacing the design's Free/$5/$9 table. Labelled "Planned pricing" |
| "Self-hosting is free for small teams. Teams and hosting are paid." | Pricing lede | User decision 2026-10-03 |
| Can I self-host? Yes, free up to 5 people; larger teams need a Teams license; source public at Livingbrain-wiki/livingbrain, Apache-2.0 core + `ee/` commercial | FAQ, llms.txt, footer | User decision 2026-10-03; `LICENSE` and `NOTICE` in the product repo, made public 2026-10-03 |
| Is my data encrypted? Planned: per-scope keys held apart from the data, scoped and fast search, deleting a key erases that memory, bring your own key on Teams; the model must read text, so self-host for full control | FAQ, privacy section, llms.txt | Livingbrain-wiki/livingbrain#43 (user decision 2026-10-03). Labelled planned |
| Encryption block: per-scope AES-256-GCM keys, envelope-wrapped by a workspace key in a separate KMS (customer-managed on Teams), blind-index and per-scope vector search, on-device decrypt, crypto-shredding, stated limits | Privacy section (#encryption), llms.txt | Livingbrain-wiki/livingbrain#43 (2026-10-03). Planned; nothing is built |
| Mail in: Owlpost brain address first (forward/BCC/auto-forward, no mailbox access); connectors for Gmail, Outlook.com / Microsoft 365, IMAP and calendars, read-only; personal encrypted scope by default; share by label/folder; screening for spoofing and prompt injection; mail never triggers actions; revoke erases; self-host uses your own OAuth app | Feature 01, privacy note, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#46. Planned |
| Git-backed wiki: the Living Brain GitHub App proposes changes as PRs; merged edits flow back in | You own it section, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#47. Planned |
| Hidden-text screening by PromptDecode (tag block, bidi controls, variation selectors) on every input and before serving context; instruction-like payloads held; mail also through Owlpost | Privacy note, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#50. Classes from PromptDecode's README (`tools/core/classes.json`). Planned |
| SupportGenius answers customers only from pages explicitly published to customers, routes by ownership, screens customer messages | FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#51, SupportGenius/core#64. Planned |
| Advantages: fewer tokens, less rework, cheaper models do more, fast; an open benchmark with a RAG baseline; no numbers until measured | Coding agents section (#why), llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#48. Mechanisms only; illustration labelled; no quantitative claim by design |
| ChatGPT export steps: Settings → Data controls → Export data; emailed link expires after 24 hours; zip holds conversations.json, chat.html, account/feedback files and uploads; workspace users ask their admin | /guides/import-chatgpt/ | OpenAI help centre article 7260999 (linked on the page). Verify before launch; steps can change |
| ChatGPT/Claude import via `livingbrain import chatgpt|claude`: local read, preview and choose, redaction, personal encrypted scope, pages with citations, prompt library, idempotent re-import | Guide, FAQ, llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#49 (Epic 4). Planned |
| Users choose their own models per role on every plan (Anthropic, OpenAI, OpenRouter, LiteLLM, any OpenAI-compatible endpoint); the included model is named as an offer: $3/month of DeepSeek credit on Crew (user decision 2026-10-03) | Pricing, FAQ "Which models?", llms.txt | User decision 2026-10-03 ("select their own LLMs, only mention offers like DeepSeek") |
| Storage per plan: Community own Cloudflare storage (no limit from us); Teams hosted 10 GB, self-hosted own storage; Crew 25 GB; extra hosted storage $0.25/GB-month; storage covers pages, sources, indexes, agent logs | Pricing, FAQ, llms.txt | User decision 2026-10-03 (GB in the plans); amounts proposed by the agent, planned pricing |
| Usage pricing: writing $1/M tokens (evolve included), reading unlimited, reasoning per question Minimal $0.001 / Low $0.005 / Medium $0.02 / High $0.05 / Max $0.25; $3 Crew credit ≈ 600 Low questions; own LLM key = no fee | Pricing (meter + reasoning slider), FAQ, llms.txt | User request 2026-10-03 to follow Honcho's pricing model (honcho.dev: ingestion $2/M, unlimited context, reasoning $0.001–$0.50/q). Our planned prices set at or below Honcho's; structure borrowed, numbers ours |
| Aggregates coding agents' session logs (Claude Code, Codex, Cursor, OpenCode, Colonizer) via the CLI, redacted locally, opt-in upload, search, tokens and cost per person/repo/model, decisions become pages | Coding agents section, feature 07, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain issue (Epic 4). Planned; the table is sample data |
| "Others charge $10–45 per user. We charge per team."; $45 × 20 = $900, $10 × 20 = $200 | Pricing comparison | Design file. Labelled "Illustrative comparison". **Check before launch:** the $10–45 range against current per-seat prices of comparable tools |
| Kestrel Freight, its people, customers, messages, PRs, prompts, counts (214 messages, 412 pages, 2,960 links, 412 uses…) | Throughout | Fictional sample data, labelled "Illustration" or "Sample data" everywhere it appears |
| Factory Zero venture | Footer, JSON-LD, llms.txt | True |
| `hello@livingbrain.wiki` (no-JS form fallback), `security@livingbrain.wiki` | Form `action`, security.txt | **Fix before launch:** neither mailbox exists yet |
| Waitlist at `api.livingbrain.wiki/v1/waitlist` | Forms | Contract shared with sealb.in and Colonizer (Cratefield waitlist module). **Not deployed**: the form says "The list isn't open yet. Check back soon." |
| GitHub "(soon)" | Footer | Plain text, not a link: there is no repo yet |

## Port notes and divergences from the design

Everything below differs from `Living Brain.dc.html`. Items marked
**(improvement)** answer the user's "make design better if possible"; items
marked **(user)** follow a user decision on 2026-10-03.

Runtime and structure
- The React/DCLogic runtime (`support.js`) is not shipped. Its state and
  handlers are rewritten as vanilla JS in `assets/livingbrain.js`; styles moved
  from inline attributes into classes in `assets/livingbrain.css`.
- Not ported: the `tagline` and `accent` props (fixed to "remembered" and mint).
- Fonts are self-hosted (latin subsets) instead of loaded from Google Fonts. A
  few glyphs outside the subset (→ ↩ ⇄ ✓ ├ └) fall back to system fonts, as
  they did in the design.
- The demo graph is **not** 3d-force-graph from jsDelivr. It is a small
  dependency-free 3D force layout drawn on a 2D canvas (in
  `livingbrain.js`), so the site makes no third-party requests and ships no
  three.js (about 1 MB). Same data, node sizing, selection colours and link
  particles. **(user: real 3D view)** Drag or swipe to orbit with inertia,
  wheel or pinch to zoom, auto-rotate when idle, hover labels, click to open a
  page, a type legend that filters nodes, arrow keys to turn and +/− to zoom,
  and the "Jump to a page" list for picking nodes with Tab and Enter.
- Under reduced motion the demo stays an interactive canvas with no
  auto-rotate, particles or camera tweens (the design switched to a static SVG).
  The static SVG remains as the no-JavaScript fallback.
- `assets/brain.js` gains a view API (`setAngle`, `setTilt`, `setZoom`,
  `setSpeed`, `pick`), marked "site:" in the file. **(user)** The hero brain
  can be dragged (horizontal on touch, so the page still scrolls), turned with
  arrow keys, and hovering a node names its type.
- The waitlist forms post to the Worker instead of only setting local state,
  and say "The list isn't open yet. Check back soon." on failure.
- The theme defaults to the system preference when nothing is stored, as in
  the design; stored as `lb-theme`; the design's `lb-theme` event is kept.

Copy and sections
- **(user)** Positioning: "a teammate in your Slack" became "a teammate that
  turns your team's conversations into a Markdown wiki… Use it in Slack, in
  your coding agent, in your terminal." Meta, OG, Twitter and JSON-LD match.
- **(user)** New strip "Use it from anywhere" under the hero: Slack (first),
  any MCP client, the `livingbrain` CLI, App (PWA), with a labelled CLI
  illustration and "Built in Rust, and fast."
- **(user)** New feature card 08 "Easy to use" (planned app). The grid is now
  eight cards, which also removes the design's empty ninth cell at four columns.
- **(user)** Pricing replaced: Community / Teams / Crew (see Claims). Each card
  says how it runs (Self-hosted, Self-hosted or hosted, Hosted).
- **(user)** FAQ added "Does it only work in Slack?" and "Is there an app?";
  "Can I self-host?" and "Which models?" rewritten (LiteLLM added).
- The "Other MCP" tab says "sign in with your Slack workspace" as in the design.
- Footer "GitHub (soon)" is plain text instead of a `href="#"` link; a
  security.txt link was added.
- The demo panel's `aria-live` moved to a short visually hidden status
  ("Showing Lina Haas") so screen readers don't re-read a whole page per click.

Visual **(improvement)**
- Hero: two-column grid that fills the first viewport on desktop
  (`min-height: min(100svh − header, 860px)`), slightly smaller display size
  (96px max instead of 100px) so the headline holds two lines at 1440px, and a
  capped brain (420px) under the copy on narrow screens.
- First paint: the hero brain is an inline SVG frozen from the same graph
  (`tools/prerender.js`), painted before any script; the live canvas fades in
  over it. The other brain figures reuse it via `<use>`. Scripts are `defer`;
  display and body fonts are preloaded.
- The hero canvas starts at 60% density instead of 45% so the hand-off from the
  still frame does not visibly thin out; it still grows to full.
- Mobile: header nav hidden under 720px (it scrolled off-screen in the
  design); the waitlist button goes full width under 480px; the pipeline and
  agents infographics keep a 600px minimum width inside a focusable sideways
  scroll region instead of shrinking their text to ~5px; the access table and
  the growth stats are tightened.
- Light theme contrast: `--ink3` 0.49 → 0.47, `--accent` 0.52 → 0.48, entity
  colours darkened (person 0.55 → 0.5, project 0.52 → 0.48, decision
  0.6 → 0.58, customer 0.55 → 0.5) so small text and initials clear 4.5:1;
  form fields get a `--field-line` border that clears 3:1 in both themes.
- Focus and hover: visible focus rings on every control and the canvases;
  primary button gains a soft accent halo on hover; ghost button, chips, nav
  links, cards, prompt cards and FAQ rows get hover states; the FAQ "+" turns
  into "−" when open.
- The Crew plan card gets an accent glow; plan lists get accent ticks.
- The demo hint sits on a fade so graph nodes don't run under it.
- Infographic loop only runs while a section with travelling shapes is on
  screen (the design ran a rAF loop for the whole page lifetime).

Security
- `_headers` adds a Content-Security-Policy (self only, the inline theme
  script by hash, `connect-src` for the waitlist Worker, `form-action` for the
  mailto fallback).
