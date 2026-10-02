# Copy ledger

Every factual claim on the page, and what backs it today. The page is a port
of the Claude Design file `Living Brain.dc.html` (project
`64188b59-b651-4bfe-803d-b8ef935c8fad`, copy in `design-src/`). Living Brain
is **in design and not built**; every product claim below is a plan. Rows
marked **needs a decision** or **fix before launch** must be resolved before
anything opens. Updated 2026-10-03. "Where" names the page (and anchor) that
carries the claim; see Information architecture below.

## Claims

| Claim | Where | Backed by |
| :--- | :--- | :--- |
| Early access, in design; nothing built | Home hero badge, every footer, llms.txt, JSON-LD | True. Only this site exists |
| A teammate that turns conversations into a Markdown wiki and keeps it true; every fact links to its source message | Home hero ("A brain for your team…"), /how-it-works/, FAQ, llms.txt | Design file and `claude-design-prompt.md`. Planned |
| Use it from your coding agent, your terminal, or your team chat; "a brain for your team, used from coding agents, the terminal and team chat" | Home hero, every page's meta/OG/Twitter, JSON-LD, site.webmanifest, llms.txt | User decision 2026-10-03 (repositioned the same day): coding agents over MCP, the CLI and the app lead; team chat follows. No "Slack teammate" framing |
| "Use it anywhere": coding agents (any MCP client), the `livingbrain` CLI, the app (PWA), then team chat (Slack and Discord), each marked planned | Home "Use it anywhere" (coding agents, CLI, app, team chat), /agents/ (#connect, Claude Desktop), FAQ, llms.txt | User decision 2026-10-03 |
| Discord, as an equal of Slack: answers in threads, `/brain ask` slash command, role-gated channels mapped to permissions | Home "Use it anywhere" (team chat), Home Listen step, /integrations/ #chat, /security/ #access note, /pricing/, FAQ "Which chat apps does it work with?", llms.txt | User decision 2026-10-03. Planned. Decided 2026-10-03: Discord's own "View Channel" permission decides. A channel @everyone can view feeds the shared brain, a role-gated channel is its own scope readable by whoever Discord lets view it (roles plus member overrides, recomputed on role changes), threads inherit their channel, private threads are their own scope, DMs are personal (#56) |
| WhatsApp and Telegram later | Home "Use it anywhere" (one quiet note), /integrations/ #chat (marked "later"), FAQ, llms.txt | User decision 2026-10-03. Not a planned feature yet; named only as "later", with no detail |
| `livingbrain ask "who owns billing?"` returning a cited answer; `livingbrain mcp` | /agents/ #connect, CLI illustration | Illustration, labelled "Illustrative commands · not live yet". User decision 2026-10-03. **Fix before launch:** the binary does not exist; reserve the name |
| Built in Rust; the CLI is a single static binary that starts instantly; the hosted core runs on Cloudflare's edge | /agents/ #connect, /pricing/ lede, llms.txt | User decision 2026-10-03 (Rust, fast) and the design file (Rust on Cloudflare's edge). No benchmark numbers on purpose: nothing is built |
| App (PWA): installs on phone and desktop, reads offline, one search-or-ask box, 3D brain one tap away | Home "Use it anywhere" (one line), FAQ "Is there an app?", llms.txt | User decision 2026-10-03. Planned |
| Speaks up unprompted in a thread, with a citation chip | /how-it-works/ #slack (tagged "Slack shown · Illustration") | Design file. Illustration; Slack is one example of team chat |
| Merges duplicates, flags contradictions, retires stale facts, rewrites summaries, on a schedule | Home (Evolve step), /how-it-works/ #steps and #evolve, FAQ | Design file. Planned |
| Learns how each person works ("the learning layer") | /how-it-works/ #learns, /agents/ #learns, FAQ | Design brief. Planned. The vendor behind it is deliberately not named |
| Acts: opens issues, reads PRs, sends digests, hands bigger jobs to a sandboxed agent | /how-it-works/ #learns | Design file. Planned |
| Connects to Claude Code, Codex, Cursor, OpenCode, Claude Desktop and any MCP agent; not affiliated | Home (one line), /agents/, /integrations/ #code, FAQ | Design file; Claude Desktop added by user decision 2026-10-03. Names in plain text, no logos |
| `claude mcp add ... https://mcp.livingbrain.wiki`, `codex mcp add ...`, `.cursor/mcp.json`, "14 tools" | /agents/ #connect, connect tabs | Illustration from the design, labelled "not live yet". **Fix before launch:** check each command against the agent's current docs; `mcp.livingbrain.wiki` does not exist |
| Agent prompts and decisions become pages only with opt-in; secrets redacted; code never stored unless allowed | /agents/ #context, FAQ | Design file. Planned. **Needs a decision:** how redaction works and what "allow" means |
| Works with Colonizer, a sister Factory Zero venture, launching microVM colonies that return PRs | /agents/ #colonizer, /integrations/ #ventures, llms.txt | Design brief. Colonizer exists at colonizer.dev; the integration is planned |
| Reads only with the asker's own access, following your chat's permissions (Slack channels, Discord roles); public channel / private channel / DMs table | /security/ #access, /pricing/ note | Design file. Planned. **Needs a decision:** how this maps to MCP and the CLI |
| Plain Markdown, exportable, opens in Obsidian; not a black-box vector store | /how-it-works/ #own, /security/ #ownership | Design file. Planned |
| Not used for training | FAQ, /security/ #ownership | Design file. A promise to keep; **needs** a privacy policy before launch |
| Bring your own LLM: Anthropic, OpenAI, OpenRouter, your LiteLLM gateway, or any OpenAI-compatible endpoint | /integrations/ #models, FAQ "Which models?", llms.txt | Design file; LiteLLM added by user decision 2026-10-03. Plain text, no logos |
| Pricing per workspace, planned: Community free (self-hosted on your own Cloudflare account, your own LLM key, up to 5 people, all core features); Teams $5/mo (unlimited people, SSO, admin and audit log, shared prompt library, per-channel policies; self-hosted with a license key or hosted with your own LLM key); Crew $9/mo (hosted, $3/month DeepSeek credit included or bring your own LLM, up to 25 people, team features). No hosted plan is free | Home (three short cards: price, who it is for, two bullets each, all taken from /pricing/), /pricing/, FAQ, llms.txt | User decision 2026-10-03 (open core), replacing the design's Free/$5/$9 table. Labelled "Planned pricing" |
| "Self-hosting is free for small teams. Teams and hosting are paid." | /pricing/ lede | User decision 2026-10-03 |
| Can I self-host? Yes, free up to 5 people; larger teams need a Teams license; source public at Livingbrain-wiki/livingbrain, Apache-2.0 core + `ee/` commercial | FAQ, /security/ #ownership, llms.txt, footer | User decision 2026-10-03; `LICENSE` and `NOTICE` in the product repo, made public 2026-10-03 |
| Is my data encrypted? Planned: per-scope keys held apart from the data, scoped and fast search, deleting a key erases that memory, bring your own key on Teams; the model must read text, so self-host for full control | FAQ, llms.txt (the detail is on /security/ #encryption) | Livingbrain-wiki/livingbrain#43 (user decision 2026-10-03). Labelled planned |
| Encryption block: per-scope AES-256-GCM keys, envelope-wrapped by a workspace key in a separate KMS (customer-managed on Teams), blind-index and per-scope vector search, on-device decrypt, crypto-shredding, stated limits | /security/ #encryption, llms.txt | Livingbrain-wiki/livingbrain#43 (2026-10-03). Planned; nothing is built |
| Mail in: Owlpost brain address first (forward/BCC/auto-forward, no mailbox access); connectors for Gmail, Outlook.com / Microsoft 365, IMAP and calendars, read-only; personal encrypted scope by default; share by label/folder; screening for spoofing and prompt injection; mail never triggers actions; revoke erases; self-host uses your own OAuth app | /integrations/ #mail, /security/ #mail, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#46. Planned |
| Git-backed wiki: the Living Brain GitHub App proposes changes as PRs; merged edits flow back in | /how-it-works/ #own, /integrations/ #code, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#47. Planned |
| Research radar: the nightly pass scans arXiv, news and releases about the team's stack and notes how they could apply; proposals need approval | /how-it-works/ (one night), llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#58. Planned |
| Hidden-text screening by PromptDecode (tag block, bidi controls, variation selectors) on every input and before serving context; instruction-like payloads held; mail also through Owlpost | /security/ #screening, /integrations/ #ventures, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#50. Classes from PromptDecode's README (`tools/core/classes.json`). Planned |
| Grafana and logs (Loki, Elasticsearch/OpenSearch, Datadog, CloudWatch, Cloudflare Workers Logs, Sentry, OTLP): read-only queries for "is prod down?" and log summaries, alert webhooks to incident pages, postmortem drafts; OpenTelemetry export of the brain's own metrics/traces/logs | /integrations/ #monitoring, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#52 and #44. Planned |
| SupportGenius answers customers only from pages explicitly published to customers, routes by ownership, screens customer messages | /integrations/ #ventures, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#51, SupportGenius/core#64. Planned |
| Advantages: fewer tokens, less rework, cheaper models do more, fast; an open benchmark with a RAG baseline; no numbers until measured | /agents/ #tokens, llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#48. Mechanisms only; illustration labelled; no quantitative claim by design |
| Yes/no decisions (reply, remember) go to a fast judge model (Jev) instead of a large LLM | /agents/#tokens, llms.txt | Livingbrain-wiki/livingbrain#53; Cratefield `adapter-typesafe`; Jev-Mem paper arXiv 2609.23986. Planned; no numbers on the site |
| ChatGPT export steps: Settings → Data controls → Export data; emailed link expires after 24 hours; zip holds conversations.json, chat.html, account/feedback files and uploads; workspace users ask their admin | /guides/import-chatgpt/ | OpenAI help centre article 7260999 (linked on the page). Verify before launch; steps can change |
| ChatGPT/Claude import via `livingbrain import chatgpt|claude`: local read, preview and choose, redaction, personal encrypted scope, pages with citations, prompt library, idempotent re-import | Guide, /integrations/ #imports, FAQ, llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#49 (Epic 4). Planned |
| Users choose their own models per role on every plan (Anthropic, OpenAI, OpenRouter, LiteLLM, any OpenAI-compatible endpoint); the included model is named as an offer: $3/month of DeepSeek credit on Crew (user decision 2026-10-03) | /integrations/ #models, /pricing/, FAQ "Which models?", llms.txt | User decision 2026-10-03 ("select their own LLMs, only mention offers like DeepSeek") |
| Storage per plan: Community own Cloudflare storage (no limit from us); Teams hosted 10 GB, self-hosted own storage; Crew 25 GB; extra hosted storage $0.25/GB-month; storage covers pages, sources, indexes, agent logs | /pricing/, FAQ, llms.txt | User decision 2026-10-03 (GB in the plans); amounts proposed by the agent, planned pricing |
| Usage pricing: writing $1/M tokens (evolve included), reading unlimited, reasoning per question Minimal $0.001 / Low $0.005 / Medium $0.02 / High $0.05 / Max $0.25; $3 Crew credit ≈ 600 Low questions; own LLM key = no fee | /pricing/ (meter + reasoning slider), FAQ, llms.txt | User request 2026-10-03 to follow Honcho's pricing model (honcho.dev: ingestion $2/M, unlimited context, reasoning $0.001–$0.50/q). Our planned prices set at or below Honcho's; structure borrowed, numbers ours |
| Aggregates coding agents' session logs (Claude Code, Codex, Cursor, OpenCode, Colonizer) via the CLI, redacted locally, opt-in upload, search, tokens and cost per person/repo/model, decisions become pages | /agents/ #logs, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain issue (Epic 4). Planned; the table is sample data |
| "Others charge $10–45 per user. We charge per team."; $45 × 20 = $900, $10 × 20 = $200 | /pricing/ comparison | Design file. Labelled "Illustrative comparison". **Check before launch:** the $10–45 range against current per-seat prices of comparable tools |
| Kestrel Freight, its people, customers, messages, PRs, prompts, counts (214 messages, 412 pages, 2,960 links, 412 uses…) | /how-it-works/, /agents/ | Fictional sample data, labelled "Illustration" or "Sample data" everywhere it appears |
| A brain for your team. It turns your conversations into a company wiki and keeps it true | Home hero, meta, OG, llms.txt | Positioning reworded 2026-10-03 (simplified IA); same claim as the row above. Planned |
| A Claude Code plugin will bundle the MCP server with skills and slash commands | /agents/ #connect, llms.txt | Livingbrain-wiki/livingbrain#37 (Epic 4). Planned |
| Telemetry: anonymous, bucketed usage counts from the CLI and a self-hosted server, no free text, the exact batch shown on first run, `livingbrain telemetry off`; message text, page bodies and secrets never collected or logged; OpenTelemetry export; audit log on Teams | /security/ #telemetry, llms.txt | Livingbrain-wiki/livingbrain#44. Planned. The `LIVINGBRAIN_TELEMETRY=0` switch and the opt-in live map from #44 are not on the site |
| "We're not affiliated with them" (other companies' tools named on /integrations/) | /integrations/ intro, FAQ "Which coding agents" | True. Names in plain text, no logos |
| Factory Zero venture | Every footer, JSON-LD, llms.txt | True |
| `hello@livingbrain.wiki` (no-JS form fallback), `security@livingbrain.wiki` | Form `action`, security.txt | **Fix before launch:** neither mailbox exists yet |
| Waitlist at `api.livingbrain.wiki/v1/waitlist` | Forms | Contract shared with sealb.in and Colonizer (Cratefield waitlist module). **Not deployed**: the form says "The list isn't open yet. Check back soon." |
| GitHub "(soon)" | Footer | Plain text, not a link: there is no repo yet |

## Information architecture

Since 2026-10-03 the site is several short pages instead of one long one. Each
claim lives on one page; other pages link to it instead of repeating it.

| Page | Job |
| :--- | :--- |
| `/` | Four short parts: the pitch with the waitlist and the 3D brain; Listen, Write, Evolve in one sentence each, each over a small looping illustration; where you use it (coding agents, CLI, app, team chat: Slack and Discord) as one switcher; pricing as three short cards. Then six link tiles to the subpages and the footer waitlist. No FAQ |
| `/how-it-works/` | The team-chat moment (Slack shown), the three animated steps and the pipeline, the nightly loop and one night in the brain, the explorable sample brain, acts and learns, You own it (`#own`) |
| `/agents/` | Connecting over MCP or the CLI, context in and decisions out, agent logs, the prompt library, learning from sessions, fewer tokens and the open benchmark (`#tokens`), Colonizer (`#colonizer`) |
| `/integrations/` | Grouped plain-text names: chat, mail, imports, code, monitoring and logs, models, sister ventures |
| `/security/` | Access rings and table, per-scope encryption, hidden-text screening, mail, telemetry, ownership and self-hosting |
| `/pricing/` | The three plans, storage, the usage meter, reasoning levels, the illustrative comparison |
| `/faq/` | Every question, grouped, with the only `FAQPage` JSON-LD on the site |
| `/guides/import-chatgpt/` | The ChatGPT export guide |

The old eight-card "A teammate, not a search box" grid was dropped as a block:
each card's claim already had a home (Remembers → integrations, mail; Answers
with sources → how it works; Acts, Learns your way → how it works #learns;
Speaks up and Grafana → how it works, integrations; Works while you sleep →
how it works #evolve; coding agents → agents; Easy to use → home and FAQ).
The privacy section's notes on encryption, mail and PromptDecode became their
own short sections on /security/.

## Port notes and divergences from the design

Everything below differs from `Living Brain.dc.html`. Items marked
**(improvement)** answer the user's "make design better if possible"; items
marked **(user)** follow a user decision on 2026-10-03.

Runtime and structure
- **(user)** One page became eight (see Information architecture). The home
  hero says "A brain for your team." instead of "Your company, remembered."
  (kept as the OG title and slogan). Header nav: How it works, Agents,
  Integrations, Security, Pricing, FAQ, with `aria-current` on the active page;
  under 860px it folds into a native `<details>` menu, so phones reach every
  page without JavaScript. Every page shares the header and the waitlist footer.
- Each page with a brain figure carries its own still brain (`tools/prerender.js`
  writes it into every page that has the markers); other figures on that page
  reuse it with `<use href="#bsg">`.
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
- **(user, 2026-10-03)** Slack is no longer the centre. Coding agents over
  MCP, the `livingbrain` CLI and the app lead; team chat (Slack and Discord,
  as equals) follows; WhatsApp and Telegram are named only as "later". The
  "first" chip on Slack is gone. The FAQ "Does it only work in Slack?" became
  "Which chat apps does it work with?". The Colonizer flow on /agents/ is
  "From chat to pull request". The design's Slack wording is kept only where it
  is the Slack example itself.
- **(user)** New feature card 08 "Easy to use" (planned app). The grid is now
  eight cards, which also removes the design's empty ninth cell at four columns.
- **(user)** Pricing replaced: Community / Teams / Crew (see Claims). Each card
  says how it runs (Self-hosted, Self-hosted or hosted, Hosted).
- **(user)** FAQ added "Does it only work in Slack?" and "Is there an app?";
  "Can I self-host?" and "Which models?" rewritten (LiteLLM added).
- The "Other MCP" tab says "sign in to your workspace" (the design says "sign in
  with your Slack workspace"); chat is optional since 2026-10-03.
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

Home page, next-gen layout **(user, 2026-10-03: "much better and next gen designed")**.
Presentation only; no claim was added or changed, and section order is the same.
- How it works is a bento grid of three cards, each over a small looping
  illustration labelled "Illustration" (CSS and inline SVG): Listen (a
  Slack-style and a Discord-style message, a mail and an agent session log drift
  into a glowing node), Write (a Markdown page types `## Billing` and
  `Owner: [[Lina Haas]] [^1]`; the citation lights up and links to its source
  message), Evolve (two duplicate page tiles merge with a soft accent pulse; a
  stale date is struck through and replaced). The people, channels and dates
  are the Kestrel Freight sample data. A cursor spotlight and gradient border
  show on hover (fine pointers only, not under reduced motion).
- Use it anywhere is one switcher: an ARIA tablist (arrow keys, Home, End)
  over one large device frame: an agent session making an MCP tool call, a
  terminal running `livingbrain ask "who owns billing?"`, a phone with the
  search box and a small live brain (`assets/brain.js`, 140 nodes, mounted on
  first view, still under reduced motion), and a team-chat thread. Every tab
  and panel says "planned"; every frame says "Illustration". It auto-advances
  only while on screen with motion allowed, pauses on hover or focus, and stops
  once you pick a tab. Without JavaScript all four show stacked.
  "WhatsApp and Telegram later." stays a quiet footnote.
- Pricing is three cards (Community, Teams, Crew) with the price, one line on
  who it suits and two bullets taken from /pricing/; Crew gets the accent ring.
  "Planned pricing", "Per workspace, not per seat" and the link stay.
- The page links became six tiles (title, a five-word description, an arrow
  that moves on hover). The closing waitlist gets a soft accent glow.
- Rhythm: larger section titles with a mono kicker (01, 02, 03), a faint grid
  and radial accent glow behind each section (CSS only), and one scroll reveal
  (fade and rise, staggered) driven by IntersectionObserver. Only opacity and
  transform animate; the loops run only while on screen; under reduced motion
  or without JavaScript every element sits on its final frame.

Security
- `_headers` adds a Content-Security-Policy (self only, the inline theme
  script by hash, `connect-src` for the waitlist Worker, `form-action` for the
  mailto fallback).

| /integrations/ group order: Code first, then Chat, Mail, Imports, Monitoring, Models, Sister ventures | /integrations/ | Decision 2026-10-03 to match the new surface order (agents first) |

| White-label app on your domain (Teams, Crew; self-hosters rebrand freely) and an open API with webhooks and SDKs for TypeScript, Python and Rust | Home switcher (App & API), /pricing/, /integrations/ Code, FAQ, llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#40 and #59. Planned |

| Home "Works with (planned)" strip: plain-text names of planned integrations, links to /integrations/ | Home, under the hero | Design fix 2026-10-03 (user screenshot: dead space under hero); names already listed on /integrations/. No logos, no partnership implied |
