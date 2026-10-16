# Copy ledger

Every factual claim on the page, and what backs it today. The page is a port
of the Claude Design file `Living Brain.dc.html` (project
`64188b59-b651-4bfe-803d-b8ef935c8fad`, copy in `design-src/`). Living Brain
is **in early access**: the app is live at https://app.livingbrain.wiki/ (since
2026-10-15 on this site); every feature claim below is still a plan unless its row
says otherwise. Rows
marked **needs a decision** or **fix before launch** must be resolved before
anything opens. Updated 2026-10-15. "Where" names the page (and anchor) that
carries the claim; see Information architecture below.

## Claims

| Claim | Where | Backed by |
| :--- | :--- | :--- |
| Early access, live ("EARLY ACCESS · LIVE") | Home hero badge, every footer, OG card, llms.txt, JSON-LD, site.webmanifest, /terms/ #product, /docs/ | True since 2026-10-15: the web app and API are live at app.livingbrain.wiki with email magic-link sign-in. Supersedes "Early access, in design; nothing built" |
| "Sign in" (every page's header and small-screen menu) and "Get started" (home hero, every footer, the import guide), plain links to https://app.livingbrain.wiki/ | Every page | The app is live; the first email sign-in creates a workspace and its owner, so sign-up is self-serve. Slack sign-in is not offered: it does not work in production yet |
| "Sign in with your email. Your first sign-in sets up your team's workspace." | Home hero | True: email magic-link sign-in; the first sign-in creates the workspace |
| "Is there an app?" Yes, in early access at app.livingbrain.wiki; Living Brain for Mac syncs sessions from opted-in repositories; installing as a PWA, offline reading, the one box and the 3D brain stay planned | FAQ (visible, FAQPage JSON-LD, llms.txt, word for word) | App live 2026-10-15; Mac app 0.1.2 |
| MCP endpoint `https://mcp.livingbrain.wiki/v1/pages/mcp`; API base URL `https://app.livingbrain.wiki` | llms.txt (agent section), /docs/ MCP entry ("the server is in early access") | Live. The /agents/ connect illustrations still show the old illustrative URL and are labelled "not live yet" |
| A teammate that turns conversations into a Markdown wiki and keeps it true; every fact links to its source message | Home hero ("A brain for your team…"), /how-it-works/, FAQ, llms.txt | Design file and `claude-design-prompt.md`. Planned |
| Use it from your coding harness, your terminal, or your team chat; "a brain for your team, used from coding harnesses, the terminal and team chat" | Home hero, every page's meta/OG/Twitter, JSON-LD, site.webmanifest, llms.txt | User decision 2026-10-03 (repositioned the same day): coding agents over MCP (renamed "coding harnesses" by user decision 2026-10-03), the CLI and the app lead; team chat follows. No "Slack teammate" framing |
| "Use it anywhere": coding harnesses (any MCP client), the `livingbrain` CLI, the app (PWA), then team chat (Slack and Discord), each marked planned | Home "Use it anywhere" (coding harnesses, CLI, app, team chat), /agents/ (#connect, Claude Desktop), FAQ, llms.txt | User decision 2026-10-03 |
| Discord, as an equal of Slack: answers in threads, `/brain ask` slash command, role-gated channels mapped to permissions | Home "Use it anywhere" (team chat), Home Listen step, /integrations/ #chat, /security/ #access note, /pricing/, FAQ "Which chat apps does it work with?", llms.txt | User decision 2026-10-03. Planned. Decided 2026-10-03: Discord's own "View Channel" permission decides. A channel @everyone can view feeds the shared brain, a role-gated channel is its own scope readable by whoever Discord lets view it (roles plus member overrides, recomputed on role changes), threads inherit their channel, private threads are their own scope, DMs are personal (#56) |
| WhatsApp and Telegram later | Home "Use it anywhere" (one quiet note), /integrations/ #chat (marked "later"), FAQ, llms.txt | User decision 2026-10-03. Not a planned feature yet; named only as "later", with no detail |
| `livingbrain ask "who owns billing?"` returning a cited answer; `livingbrain mcp` | /agents/ #connect, CLI illustration | The CLI ships inside the Mac app 0.1.2 (`ask`, `mcp` subcommands exist in `crates/livingbrain-cli`). The output shown is illustrative and labelled so |
| Built in Rust; the CLI is a single static binary that starts instantly; the hosted core runs on Cloudflare's edge | /agents/ #connect, /pricing/ lede, llms.txt | User decision 2026-10-03 (Rust, fast) and the design file (Rust on Cloudflare's edge). No benchmark numbers on purpose: nothing is built |
| App (PWA): installs on phone and desktop, reads offline, one search-or-ask box, 3D brain one tap away | Home "Use it anywhere" (one line), FAQ "Is there an app?", llms.txt | User decision 2026-10-03. Planned |
| Speaks up unprompted in a thread, with a citation chip | /how-it-works/ #slack (tagged "Slack shown · Illustration") | Design file. Illustration; Slack is one example of team chat |
| Merges duplicates, flags contradictions, retires stale facts, rewrites summaries, on a schedule | Home (Evolve step), /how-it-works/ #steps and #evolve, FAQ | Design file. Planned |
| Learns how each person works ("the learning layer") | /how-it-works/ #learns, /agents/ #learns, FAQ | Design brief. Planned. The vendor behind it is deliberately not named |
| Acts: opens issues, reads PRs, sends digests, hands bigger jobs to a sandboxed agent | /how-it-works/ #learns | Design file. Planned |
| Connects to Claude Code, Codex, Hermes, Cursor, OpenCode, Claude Desktop and any MCP harness; not affiliated | Home (one line), /agents/, /integrations/ #code, FAQ | Design file; Claude Desktop added by user decision 2026-10-03; Hermes added from Livingbrain-wiki/livingbrain#38. Shown with logos where allowed (see Marks) |
| Supported coding harnesses, planned, in waves; each stays planned until its integration test passes. First wave: Claude Code, Codex, Hermes (Nous Research hermes-agent), Cursor, OpenCode, Claude Desktop. Next: Gemini CLI, GitHub Copilot, Goose, Cline, Aider, Kimi CLI, Qwen Code, Pi (Earendil's pi coding agent). Plus any MCP client | /agents/ #harnesses (logo grid), home switcher (Claude Code, Codex, Hermes, Cursor, OpenCode, Gemini CLI, any MCP client), FAQ "Which coding harnesses can I connect?", llms.txt, `assets/harnesses.json` | Livingbrain-wiki/livingbrain#38 (user decision 2026-10-03). Planned; no harness is tested yet. Pi, from the issue's wave 3, is shown under Next by user request 2026-10-15 (`"wave": 3` in the data): its MCP support is built in since pi 0.99.0 (2026-09-29, earendil-works/pi CHANGELOG), so it connects like any MCP client; the repo moved from badlogic/pi-mono to earendil-works/pi. The rest of wave 3 (OpenHands, Oh-My-Pi, Windsurf, Zed) is not on the site yet. The list lives in `assets/harnesses.json`; `tools/marks.js` writes the rows |
| "Planned integrations. Not affiliated with or endorsed by these companies; names and logos are trademarks of their owners." | Under every logo group: home strip, home switcher, /agents/ #harnesses, /integrations/ (once, under the groups; the intro says it too) | User decision 2026-10-03. Nominative "works with" use only, no partner wording |
| Linear and Notion: the brain acts in them through their MCP servers, with each person's own connection | /integrations/ #code | Livingbrain-wiki/livingbrain#11 (remote MCP servers for GitHub, Linear, Notion, Google per user via OAuth). Planned |
| The connect commands for `claude mcp add`, `codex mcp add` and `.cursor/mcp.json` with the live endpoint `https://mcp.livingbrain.wiki/v1/pages/mcp`; the output says "5 tools" (brain_search, brain_page, brain_context_for, brain_note, brain_facts) | /agents/ #connect (tabs in `assets/livingbrain.js`, prerendered), /guides/mcp/ | Live. Endpoint and tool list from `docs/mcp.md` at 7163b59 in Livingbrain-wiki/livingbrain and its wrangler custom domain `mcp.livingbrain.wiki`. The output lines are illustrative; the commands are the ones in /guides/mcp/ |
| Agent prompts and decisions become pages only with opt-in; secrets redacted; code never stored unless allowed | /agents/ #context, FAQ | Design file. Planned. **Needs a decision:** how redaction works and what "allow" means |
| Works with Colonizer, a sister Factory Zero venture, launching microVM colonies that return PRs | /agents/ #colonizer, /integrations/ #ventures, llms.txt | Design brief. Colonizer exists at colonizer.dev; the integration is planned |
| Reads only with the asker's own access, following your chat's permissions (Slack channels, Discord roles); public channel / private channel / DMs table | /security/ #access, /pricing/ note | Design file. Planned. **Needs a decision:** how this maps to MCP and the CLI |
| Plain Markdown, exportable, opens in Obsidian; not a black-box vector store | /how-it-works/ #own, /security/ #ownership | Design file. Planned |
| Not used for training | FAQ, /security/ #ownership | Design file. A promise to keep; **needs** a privacy policy before launch |
| Bring your own LLM: Anthropic, OpenAI, OpenRouter, your LiteLLM gateway, or any OpenAI-compatible endpoint | /integrations/ #models, FAQ "Which models?", llms.txt | Design file; LiteLLM added by user decision 2026-10-03. Logos where allowed (see Marks); OpenAI and LiteLLM by name only |
| Pricing per workspace, planned: Community free (self-hosted on your own Cloudflare account, your own LLM key, up to 5 people, all core features, your own storage); Teams from $5/mo: self-hosted license $5/mo (unlimited people) or hosted $9/mo or $90/yr, two months free (bring your own LLM, up to 25 people included, 10 GB), team features (SSO, admin and audit log, shared prompt library, per-channel policies, white-label app) on both; Crew $15/mo or $150/yr (hosted, $5/month DeepSeek credit included or bring your own LLM, up to 25 people included, 25 GB, team features and white-label included); extra people +$5/mo per 25 on hosted plans; billed annually by default, monthly available, annual shown first; "unlimited people" only on the self-hosted Teams license. No hosted plan is free | Home (three short cards: price, who it is for, two bullets each, all taken from /pricing/), /pricing/ (cards, notes, meta/OG/Twitter), FAQ, llms.txt | User decision 2026-10-03, after a cost model: Cloudflare Workers/D1/R2/Vectorize/Workers AI list prices, DeepSeek API prices, Polar as Merchant of Record at 5% + 50¢ per transaction, +1.5% on non-US cards (polar.sh/resources/pricing, checked 2026-10-08); hosted margin targets about 60–75% (Teams) and about 45–55% (Crew). Owner decision 2026-10-04: monthly plans stay despite Polar's fee; annual is the default, not the only option. **Check before launch:** the margin targets were set against card-processor fees; recheck them at Polar's fee. Labelled "Planned pricing". **Supersedes** the earlier 2026-10-03 table (Teams $5/mo with unlimited people on hosted too; Crew $9/mo with $3 credit) |
| "Self-hosting is free for small teams. Teams and hosting are paid." | /pricing/ lede | User decision 2026-10-03 |
| Can I self-host? Yes, free up to 5 people; larger teams need a Teams license, planned at $5 a month per workspace with unlimited people; source public at Livingbrain-wiki/livingbrain, Apache-2.0 core + `ee/` commercial | FAQ, /security/ #ownership, llms.txt, footer | User decision 2026-10-03; `LICENSE` and `NOTICE` in the product repo, made public 2026-10-03; license price from the pricing row above |
| Is my data encrypted? Yes, at rest, per scope, for pages, sources and temporal facts: each scope has its own data key, wrapped by a key the service holds as a Worker secret; bodies sealed with XChaCha20-Poly1305; blind index for search; deleting a scope destroys its key. Not end-to-end: the service decrypts to serve and answer. Slugs, subjects and attribute names are plaintext. Bring-your-own key on Teams and self-hosting remain planned | FAQ (visible, FAQPage JSON-LD, llms.txt, word for word), /security/ #encryption | Live: `crates/livingbrain-pages/src/keys.rs` (issue #43, ADR 0003, `docs/adr/0003-per-scope-encryption.md`); production has the KEK secret set (`HARNESS_KEK_CURRENT`), coordinator-verified 2026-10-16. "Screening" stays planned |
| Encryption block: per-scope data keys wrapped by a KMS port (KEK as a Worker secret), `lbe1` body envelope (XChaCha20-Poly1305, AAD bound to scope, key and version), blind index, sealed fact values and quotes, crypto-shredding; stated limits (not end-to-end; slugs and names plaintext) | /security/ #encryption, llms.txt | Live per `crates/livingbrain-pages/src/keys.rs` and ADR 0003 at 7163b59. Customer-managed key service on Teams is planned |
| Mail in: Owlpost brain address first (forward/BCC/auto-forward, no mailbox access); connectors for Gmail, Outlook.com / Microsoft 365, IMAP and calendars, read-only; personal encrypted scope by default; share by label/folder; screening for spoofing and prompt injection; mail never triggers actions; revoke erases; self-host uses your own OAuth app | /integrations/ #mail, /security/ #mail, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#46. Planned |
| GitHub App: reads commits, issues and pull requests into the brain as sources (backfill on the cron tick, every 5 minutes); the git-backed wiki where it proposes changes as pull requests and merged edits flow back in | /guides/github-app/, /integrations/ #code, /how-it-works/ #own, llms.txt | Ingest live (`docs/github.md`, PR #194/#198). The PR-proposal part stays planned; Livingbrain-wiki/livingbrain#47 |
| Research radar: the nightly pass scans arXiv, news and releases about the team's stack and notes how they could apply; proposals need approval | /how-it-works/ (one night), llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#58. Planned |
| Hidden-text screening by PromptDecode (tag block, bidi controls, variation selectors) on every input and before serving context; instruction-like payloads held; mail also through Owlpost | /security/ #screening, /integrations/ #ventures, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#50. Classes from PromptDecode's README (`tools/core/classes.json`). Planned |
| Grafana and logs (Loki, Elasticsearch/OpenSearch, Datadog, CloudWatch, Cloudflare Workers Logs, Sentry, OTLP): read-only queries for "is prod down?" and log summaries, alert webhooks to incident pages, postmortem drafts; OpenTelemetry export of the brain's own metrics/traces/logs | /integrations/ #monitoring, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#52 and #44. Planned |
| SupportGenius answers customers only from pages explicitly published to customers, routes by ownership, screens customer messages | /integrations/ #ventures, FAQ, llms.txt | User decision 2026-10-03; Livingbrain-wiki/livingbrain#51, SupportGenius/core#64. Planned |
| Advantages: fewer tokens, less rework, cheaper models do more, fast; an open benchmark with a RAG baseline; no numbers until measured | /agents/ #tokens, llms.txt | User request 2026-10-03; Livingbrain-wiki/livingbrain#48. Mechanisms only; illustration labelled; no quantitative claim by design |
| Yes/no decisions (reply, remember) go to a fast judge model (Jev) instead of a large LLM | /agents/#tokens, llms.txt | Livingbrain-wiki/livingbrain#53; Cratefield `adapter-typesafe`; Jev-Mem paper arXiv 2609.23986. Planned; no numbers on the site |
| ChatGPT export steps: Settings → Data controls → Export data; emailed link expires after 24 hours; zip holds conversations.json, chat.html, account/feedback files and uploads; workspace users ask their admin | /guides/import-chatgpt/ | OpenAI help centre article 7260999 (linked on the page). Verify before launch; steps can change |
| ChatGPT/Claude import via `livingbrain import chatgpt|claude`: read on the machine (zip read in memory), preview, redaction, `--since`/`--until`/`--keyword`/`--id`, idempotent by content, live branch only; Markdown and text folders via `livingbrain import markdown` and the web Imports page (.md, .markdown, .txt, 1 MB, hidden folders skipped) | /guides/import-chatgpt/, /guides/imports/, /integrations/ #imports, FAQ, llms.txt | Live: `docs/import.md` at 7163b59; `crates/livingbrain-cli/src/import.rs`; `app/assets/imports.js`. Encryption of imports is NOT claimed here (see the encryption rows) |
| Users choose their own models per role on every plan (Anthropic, OpenAI, OpenRouter, LiteLLM, any OpenAI-compatible endpoint); the included model is named as an offer: $5/month of DeepSeek credit on Crew | /integrations/ #models, /pricing/, FAQ "Which models?", llms.txt | User decision 2026-10-03 ("select their own LLMs, only mention offers like DeepSeek"); credit amount $5 (supersedes $3) from the pricing decision: User decision 2026-10-03, after a cost model: Cloudflare Workers/D1/R2/Vectorize/Workers AI list prices, DeepSeek API prices, Polar as Merchant of Record at 5% + 50¢ per transaction, +1.5% on non-US cards (polar.sh/resources/pricing, checked 2026-10-08); hosted margin targets about 60–75% (Teams) and about 45–55% (Crew) |
| Storage per plan: Community own Cloudflare storage (no limit from us); Teams hosted 10 GB, self-hosted own storage; Crew 25 GB; extra hosted storage $0.25/GB-month; storage covers pages, sources, indexes, agent logs | /pricing/, FAQ, llms.txt | User decision 2026-10-03 (GB in the plans); amounts proposed by the agent, planned pricing |
| Usage pricing: writing $1/M tokens (evolve included), reading unlimited, reasoning per question Minimal $0.001 / Low $0.005 / Medium $0.02 / High $0.05 / Max $0.25; "Crew's $5 monthly credit covers about 1,000 questions at the default level" ($5 / $0.005); own LLM key = no fee | /pricing/ (meter + reasoning slider), FAQ, llms.txt | User request 2026-10-03 to follow Honcho's pricing model (honcho.dev: ingestion $2/M, unlimited context, reasoning $0.001–$0.50/q). Our planned prices set at or below Honcho's; structure borrowed, numbers ours. Credit line updated by the later pricing decision (supersedes "$3 ≈ 600 questions") |
| Coding-agent sessions: Claude Code and Codex sessions sync from the Mac app and the CLI, from opted-in repositories only, redacted on the machine; full transcripts with tool calls; subagent sessions nested; the compiled coding-agents wiki and the queue. Cursor, OpenCode and Colonizer, and cost and token breakdowns per person, repo and model, are planned | /agents/ #logs (sample figures labelled), /guides/coding-agent-sync/, /docs/coding-agents/, FAQ, llms.txt | Live: `docs/logs.md`, `docs/coding-agents.md`, `macos/LivingBrainBar/README.md` at 7163b59 |
| "Others charge $10–45 per user. We charge per team."; $45 × 20 = $900, $10 × 20 = $200; Living Brain Crew $15 for 20 people (one flat monthly price) | /pricing/ comparison | Design file (the design showed Crew at $9); Crew bar updated to $15 by the pricing decision of 2026-10-03. Labelled "Illustrative comparison". **Check before launch:** the $10–45 range against current per-seat prices of comparable tools |
| Kestrel Freight, its people, customers, messages, PRs, prompts, counts (214 messages, 412 pages, 2,960 links, 412 uses…) | /how-it-works/, /agents/ | Fictional sample data, labelled "Illustration" or "Sample data" everywhere it appears |
| A brain for your team. It turns your conversations into a company wiki and keeps it true | Home hero, meta, OG, llms.txt | Positioning reworded 2026-10-03 (simplified IA); same claim as the row above. Planned |
| A Claude Code plugin will bundle the MCP server with skills and slash commands | /agents/ #connect, llms.txt | Livingbrain-wiki/livingbrain#37 (Epic 4). Planned |
| Telemetry: anonymous, bucketed usage counts from the CLI and a self-hosted server, no free text, the exact batch shown on first run, `livingbrain telemetry off`; message text, page bodies and secrets never collected or logged; OpenTelemetry export; audit log on Teams | /security/ #telemetry, llms.txt | Livingbrain-wiki/livingbrain#44. Planned. The `LIVINGBRAIN_TELEMETRY=0` switch and the opt-in live map from #44 are not on the site |
| "We're not affiliated with them" (other companies' tools named on /integrations/) | /integrations/ intro, FAQ "Which coding harnesses" | True. Logos only for nominative use, see Marks |
| Factory Zero venture | Every footer, JSON-LD, llms.txt | True |
| The footer "Built with" strip and its "Who else touches it" list were removed on 2026-10-16 (the strip, its CSS, `tools/built-with.py` and `tools/built-with.json` are gone). The footer keeps only the plain "FZ-018 · © 2026 Factory Zero" credit | Every footer | Owner request 2026-10-16. The subprocessors list on /security/ is now static HTML and no longer generated |
| "Who else touches it": the marketing site and the hosted app run on Cloudflare; Polar and the sister ventures are planned | /security/ #subprocessors | The list is static HTML now (its generator was removed 2026-10-16) |
| Living Brain for Mac 0.1.2: a menu bar app; syncs Claude Code and Codex sessions from opted-in repositories only, sessions elsewhere never leave the Mac; live sync after two quiet minutes, Sync Now, every 15 minutes; secrets and email addresses redacted on the Mac; window for the wiki (read and edit), Ask with citations, agent sessions by project (subagent sessions nested), usage for workspace admins; several workspaces; brain jobs on the user's own Claude Code or Codex; carries its own `livingbrain` CLI 0.1.2 | /download/ (visible, `SoftwareApplication` JSON-LD), llms.txt (Download), /docs/ guides | Release `macos-v0.1.2` on Livingbrain-wiki/livingbrain (`LivingBrain.dmg`, published 2026-10-16) |
| Version 0.1.2, 9.5 MB disk image (9,947,087 bytes, sizes in MiB), macOS 14 or later, Apple silicon and Intel (universal), SHA-256 `0c1631d8f74924e576172cd09bcc6c89e393012744329404b3a677b465004f3f` | /download/, llms.txt | The `macos-v0.1.2` release on Livingbrain-wiki/livingbrain (`LivingBrain.dmg` + `LivingBrain.dmg.sha256`), `LSMinimumSystemVersion` 14.0. Update all three places with each release, plus the `/download/mac` line in `_redirects` |
| "Download for Mac" → `/download/mac`, a 302 to `https://github.com/Livingbrain-wiki/livingbrain/releases/download/macos-v0.1.2/LivingBrain.dmg` | /download/ (primary), home hero (secondary, next to "Get started"), "Download" in every header, small-screen menu and footer | `_redirects`. A link to github.com needs no CSP change. Do not merge before the release exists |
| "Not notarized yet": macOS blocks the first open; Control-click → Open → Open, or System Settings → Privacy & Security → Open Anyway (the only way on macOS 15 and later); "A notarized build is planned" | /download/ #first-open, llms.txt | True: the 0.1.2 build is ad-hoc signed, no Developer ID yet. Notarization is planned (`release.sh` takes `CODESIGN_IDENTITY` + `NOTARY_PROFILE`). Remove this box once a notarized release ships |
| `hello@livingbrain.wiki` (no-JS form fallback), `security@livingbrain.wiki` | Form `action`, security.txt | **Fix before launch:** neither mailbox exists yet |
| Product-updates list (the waitlist Worker) at `api.livingbrain.wiki/v1/waitlist`, labelled "Get product updates" / "Get updates", secondary to "Get started" | Forms | Live. Contract shared with sealb.in and Shoal (Cratefield waitlist module, `Livingbrain-wiki/waitlist-backend`), Turnstile-guarded, confirmation mail via Owlpost. Success says "we sent a confirmation link"; any failure shows a note with hello@livingbrain.wiki |
| Docs: guides (hand-written, `guides-src/*.md`) and reference pages (copies of the product repo's docs, `docs-src/`, pinned by `docs-src/mirror.lock` to commit 7163b59 and rendered by `tools/build-docs.js`) under /docs/ and /guides/, with a /docs/ hub. Each reference page has one "source on GitHub" link; other links to mirrored docs are site links. Internal runbooks, ADRs and the issue/telemetry specs are not mirrored | /docs/, /guides/*, nav and footer, llms.txt, sitemap.xml | Generated by `node tools/build-docs.js` (`--check` fails when stale or when a link is broken). Sync with `tools/sync-docs.sh` |
| On /docs/, planned entries say so in their own line (nothing runs yet, the CLI ships only inside the Mac app, the server does not exist yet, nothing is published yet) and link to the page that owns the detail: self-host to /security/ #ownership, CLI to /download/, MCP to /agents/, API and SDKs to /integrations/ #code | /docs/ | The underlying claims live on those pages and are unchanged; /docs/ restates only what a document is for, so each claim stays on one page (AGENTS.md rule 2) |
| GitHub "(soon)" | Footer | Plain text, not a link: there is no repo yet |
| Factory Zero is the controller of the data described in the privacy notice, and the party behind these terms | /privacy/ #who, /terms/ #who | Owner decision 2026-10-04. There is no legal entity beyond the name Factory Zero; no entity type, registration number or postal address is stated on the site |
| No cookies, no analytics, no ads, no tracking; the only data the site sends anywhere is the waitlist email; one local value (`lb-theme`) in the reader's own browser; no logging of our own on top of the hosting | /privacy/ #site | True. `assets/livingbrain.js` reads and writes only `lb-theme` (line 159), with no other `localStorage`, `sessionStorage` or cookie use; the only `fetch` is the waitlist POST (line 764); `wrangler.toml` has no `[observability]` block, so no Workers Logs |
| Cloudflare processes request data (IP address, user agent) to serve the pages; the other processors are listed separately | /privacy/ #site (the hosting fact), /security/ #subprocessors (the list) | True. Static-assets Worker on Cloudflare (`wrangler.toml`). /privacy/ #others links to /security/ #subprocessors instead of repeating the list |
| The waitlist collects one field, the email address, on consent, kept until asked to delete it or until the list closes; with JavaScript on it goes to the Cratefield waitlist service at api.livingbrain.wiki, with JavaScript off to hello@livingbrain.wiki by the reader's own mail app. The list is live | /privacy/ #join | True. The form has one `input` and posts `{email, product:"livingbrain"}` to `api.livingbrain.wiki/v1/waitlist` (`assets/livingbrain.js` 732-775), the Cratefield harness waitlist module (README, The waitlist); the `action` is `mailto:hello@livingbrain.wiki`. The Worker is live (`Livingbrain-wiki/waitlist-backend`). /privacy/ was updated 2026-10-15 and covers this website only, not the app |
| Polar will be the seller of paid plans as Merchant of Record, handling checkout, invoices, tax and refunds under its own terms; nothing is on sale | /terms/ #plans | Same generated source as the subprocessors row; agrees with /security/ #subprocessors and /pricing/ "Planned pricing". No partnership implied. /privacy/ links here rather than repeating it |
| Paid plans are sold by Polar, our Merchant of Record, which handles VAT and sales tax. FAQ adds "Nothing is on sale yet." | /pricing/ (note under the plans); FAQ "Who will bill me?" (with its FAQPage JSON-LD and llms.txt, word for word) | User decision 2026-10-03 (Livingbrain-wiki/website#5). Polar publishes 5% + 50¢ per transaction, +1.5% on non-US cards (polar.sh/resources/pricing, checked 2026-10-08). Agrees with /terms/ #plans and /security/ #subprocessors. Under "Planned pricing". No partnership implied |
| The open-core code is on GitHub under Apache-2.0, and that licence, not these terms, covers it | /terms/ #code, every footer ("apache-2.0 open core") | Apache-2.0 stated in README (The page) and in llms.txt. The site says nothing about a licence file, a NOTICE or a commercial directory |

## Information architecture

Since 2026-10-03 the site is several short pages instead of one long one. Each
claim lives on one page; other pages link to it instead of repeating it.

| Page | Job |
| :--- | :--- |
| `/` | Four short parts: the pitch with "Get started" (to the app), the product-updates form and the 3D brain; Listen, Write, Evolve in one sentence each, each over a small looping illustration; where you use it (coding harnesses, CLI, app, team chat: Slack and Discord) as one switcher; pricing as three short cards. Then six link tiles to the subpages and the footer waitlist. No FAQ |
| `/how-it-works/` | The team-chat moment (Slack shown), the three animated steps and the pipeline, the nightly loop and one night in the brain, the explorable sample brain, acts and learns, You own it (`#own`) |
| `/agents/` | Coding harnesses (nav label "Harnesses"; the URL stays `/agents/`): the planned harnesses as a logo grid (`#harnesses`), connecting over MCP or the CLI, context in and decisions out, agent logs, the prompt library, learning from sessions, fewer tokens and the open benchmark (`#tokens`), Colonizer (`#colonizer`) |
| `/integrations/` | Grouped names, each with its logo where allowed: chat, mail, imports, code, monitoring and logs, models, sister ventures |
| `/security/` | Access rings and table, per-scope encryption (live at rest), hidden-text screening, mail, telemetry, ownership and self-hosting |
| `/pricing/` | The three plans, storage, the usage meter, reasoning levels, the illustrative comparison |
| `/faq/` | Every question, grouped, with the only `FAQPage` JSON-LD on the site |
| `/docs/` | The hub: guides first, then reference pages, generated by `tools/build-docs.js` from `guides-src/` and `docs-src/` (see the Docs row above) | /docs/ | Replaces the earlier status list (planned and available entries). Planned items are now said on the page that owns them |
| `/download/` | Living Brain for Mac: the download, its facts and checksum, what it does, the first-open steps, then sign in. Not a port of the design: a new page in the guide layout, no design counterpart |
| `/guides/import-chatgpt/` | The ChatGPT export guide |
| `/privacy/` | Who is the controller, what the site collects (nothing but a local theme value), what the waitlist collects and where it goes, legal basis in plain words, retention, your rights, contact. Links out to /security/ #subprocessors and /terms/ #plans instead of repeating either |
| `/terms/` | Who runs the site, the product is in early access and nothing is on sale, the site is informational and provided as is, Polar as the future seller, the code's own licence, liability, names and content, changes, contact |

### Legal review: pending (owner decision 2026-10-04)

`/privacy/` and `/terms/` are **drafts and have not been reviewed by a lawyer.**
Both say so in the page's own lede. Decisions taken so far:

- **Controller / party:** Factory Zero (https://factory0.ventures). No legal
  entity type, registration number or postal address is named, because none
  exists yet. The PR flags this for the owner.
- **Governing law and jurisdiction:** **not decided.** They are left out of the
  terms entirely rather than guessed; the PR flags this for the owner.
- **Contact:** `hello@livingbrain.wiki` (already the waitlist mailto target
  and in `404.html`). **Fix before launch:** the mailbox does not exist yet.
- **Last updated:** 2026-10-15 on both pages (status moved from "in design" to
  early access); changing either text means changing that date.
- The privacy notice states no processing that does not happen today, and says
  it will be updated before any new data is collected when the product exists.

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
  (kept as the OG title and slogan). Header nav: How it works, Harnesses (was Agents),
  Integrations, Security, Pricing, FAQ, with `aria-current` on the active page;
  under 980px (860px before the Sign in button) it folds into a native `<details>` menu, so phones reach every
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
- **(user, 2026-10-15)** The app went live, so the design's waitlist-first
  calls to action changed: a small primary "Sign in" button in the header (and
  a "Sign in" entry at the foot of the small-screen menu) and a primary
  "Get started" in the hero and every footer, all linking to
  https://app.livingbrain.wiki/. The waitlist forms stay, demoted to a ghost
  "Get updates" button under "Not ready yet? Get product updates by email."
  New classes: `.btn--sm`, `.hd__cta`, `.menu__cta`, `.hero__cta`,
  `.join-box--updates`, `.join__lead`, `.cta-row`.

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
- **(user, 2026-10-03)** "Coding agents" is now "Coding harnesses" wherever
  it names the category (switcher tab and panel, /agents/ title, eyebrow, meta,
  OG, JSON-LD, nav label "Harnesses", FAQ, llms.txt, webmanifest, OG card and
  README banner). "Agent" stays where it means the AI inside a harness. The URL
  stays `/agents/`. Logos replace plain-text names on the home strip, in the
  switcher's harness panel (a row of tiles spanning the panel), on /agents/
  (#harnesses, a new section under the intro) and on /integrations/ (see Marks).
  The home "Works with" strip now wraps to a second line instead of fading out
  at the right edge, so no logo is cut off; the switcher's harness tiles sit
  under the copy, beside the device frame.
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

| Home "Works with (planned)" strip: logos and names of planned integrations, links to /integrations/ | Home, under the hero | Design fix 2026-10-03 (user screenshot: dead space under hero); names already listed on /integrations/. Logos added by user decision 2026-10-03 (see Marks); Hermes added; no partnership implied |

## Marks

Other companies' logos, shown only to say what Living Brain is planned to work
with (nominative use), by user decision 2026-10-03, replacing "names in plain
text, no logos". Rules: official marks only, from the brand's press kit or
[Simple Icons](https://simpleicons.org) (CC0 SVG path data; trademarks remain
with their owners), pinned to the release in `tools/fetch-simple-icons.sh`
(downloaded into `tools/vendor/`, not committed, never fetched at runtime).
A brand Simple Icons lacks may use the mark from its own press kit or
repository, pinned to a commit and imported once with `tools/import-mark.py`
(path data only, fitted to 24x24, nothing else kept; added 2026-10-15 for
Hermes, Goose and Aider). `tools/marks.js` copies each to `assets/logos/` as one path with a
`currentColor` fill and writes the rows and an inline sprite into the pages.
Where the owner publishes a separate dark-background version (Hermes), the
chip carries both and the theme picks one, so the mark is never shown as a
photographic negative; a large illustrated mark (Hermes) is referenced from
its file instead of being inlined in every page.
Every logo is shown unaltered in one colour (`--ink2`), with the brand colour on
hover only where it clears 3:1 on the theme's surfaces. Where no official or
Simple Icons mark exists, or the owner's guidelines forbid this use, the brand
is its name only, in the same chip; never draw a stand-in. Each logo has the
brand name as its accessible name. `tools/build-dist.sh` fails if a file in
`assets/logos/` has no row here. **Check before launch:** every "no published
guidelines found" row against the owner's current terms.

| Mark | File | Source | Version or kit | License / terms | Guideline note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Claude Code | `assets/logos/claude-code.svg` | https://code.claude.com | Simple Icons 16.33.0 (`claudecode`) | Simple Icons 16.33.0, CC0 path data; trademark of Anthropic | No published third-party logo guidelines found; nominative "works with" use, unaltered |
| Codex | name only | https://openai.com/brand/ | — | Trademark of OpenAI | Name only: OpenAI's brand guidelines ask for permission to use its marks, and Simple Icons removed OpenAI's icon for that reason (simple-icons#13944) |
| Hermes | `assets/logos/hermes.svg` (light), `assets/logos/hermes-dark.svg` (dark) | https://github.com/NousResearch/hermes-agent/blob/c2b69de66d847318f05356c666f21e046d2e9468/assets/icon-master.svg and `icon-master-dark.svg` at the same commit | hermes-agent @ c2b69de, via `tools/import-mark.py` | Nous Research's own icon (repo code is MIT; the mark stays Nous Research's); path data only, without the rounded-square background | No published logo guidelines found; nominative use, unaltered. The Simple Icons "Hermes" icon is an unrelated parcel company |
| Cursor | `assets/logos/cursor.svg` | https://cursor.com/brand | Simple Icons 16.33.0 (`cursor`) | Simple Icons 16.33.0, CC0 path data; trademark of Anysphere | Brand page cursor.com/brand provides the mark; nominative use, unaltered |
| OpenCode | `assets/logos/opencode.svg` | https://github.com/anomalyco/opencode/blob/1251a870cb384543c150c4a72fb101b55eec971b/packages/identity/mark.svg | Simple Icons 16.33.0 (`opencode`) | Simple Icons 16.33.0, CC0 path data; mark from the project's own repo | Nominative use, unaltered |
| Claude Desktop | `assets/logos/claude.svg` | https://claude.ai | Simple Icons 16.33.0 (`claude`) | Simple Icons 16.33.0, CC0 path data; trademark of Anthropic | No published third-party logo guidelines found; nominative use, unaltered |
| Gemini CLI | `assets/logos/google-gemini.svg` | https://gemini.google.com | Simple Icons 16.33.0 (`googlegemini`) | Simple Icons 16.33.0, CC0 path data; trademark of Google | Gemini mark, nominative use, unaltered. Check against Google's brand permissions before launch |
| GitHub Copilot | `assets/logos/github-copilot.svg` | https://primer.style/foundations/icons/copilot-24 | Simple Icons 16.33.0 (`githubcopilot`) | Simple Icons 16.33.0; icon from GitHub Primer Octicons, MIT; trademark of GitHub | github.com/logos: nominative use allowed, unaltered |
| Goose | `assets/logos/goose.svg` | https://github.com/block/goose/blob/bf760fd630b9accd1eff63adba24798d6bf7413a/documentation/static/img/goose.svg | block/goose @ bf760fd, via `tools/import-mark.py` | Block's goose mark from the project's repo, the same bird as its desktop app icon (code is Apache-2.0, which grants no trademark rights) | No published logo guidelines found; nominative use, unaltered |
| Cline | `assets/logos/cline.svg` | https://cline.bot/assets/branding/logos/cline-wordmark-black.svg | Simple Icons 16.33.0 (`cline`) | Simple Icons 16.33.0, CC0 path data; from Cline's own branding assets | Nominative use, unaltered |
| Aider | `assets/logos/aider.svg` | https://github.com/Aider-AI/aider/blob/22a494bb59e11e9cfa7842a8c1a8b6324b2ade67/aider/website/assets/icons/safari-pinned-tab.svg | Aider-AI/aider @ 22a494b, via `tools/import-mark.py` | Aider's own one-colour mask icon (aider.chat's `mask-icon`; code is Apache-2.0, which grants no trademark rights) | No published logo guidelines found; nominative use, unaltered |
| Kimi CLI | `assets/logos/kimi.svg` | https://moonshotai.github.io/Branding-Guide | Simple Icons 16.33.0 (`kimi`) | Simple Icons 16.33.0, CC0 path data; trademark of Moonshot AI | Moonshot AI branding guide; nominative use, unaltered |
| Pi | `assets/logos/pi.svg` | https://pi.dev/press-kit (badge: https://pi.dev/favicon.svg) | Simple Icons 16.33.0 (`pi`) | Simple Icons 16.33.0, CC0 path data; trademark of Earendil | The press kit offers the mark with no usage rules; nominative use, unaltered |
| Qwen Code | `assets/logos/qwen.svg` | https://qwen.ai | Simple Icons 16.33.0 (`qwen`) | Simple Icons 16.33.0, CC0 path data; trademark of Alibaba Cloud | No published third-party logo guidelines found; nominative use, unaltered |
| Slack | name only | https://slack.com/media-kit | — | Trademark of Salesforce | Name only: Salesforce had all its icons removed from Simple Icons (simple-icons#13503) |
| Discord | `assets/logos/discord.svg` | https://discord.com/branding | Simple Icons 16.33.0 (`discord`) | Simple Icons 16.33.0, CC0 path data; trademark of Discord | discord.com/branding: the Clyde mark in one colour is allowed; unaltered |
| GitHub | `assets/logos/github.svg` | https://github.com/logos | Simple Icons 16.33.0 (`github`) | Simple Icons 16.33.0, CC0 path data; trademark of GitHub | github.com/logos: the Invertocat may be used to refer to GitHub; unaltered, one colour |
| Gmail | `assets/logos/gmail.svg` | https://fonts.gstatic.com/s/i/productlogos/gmail_2020q4/v8/192px.svg | Simple Icons 16.33.0 (`gmail`) | Simple Icons 16.33.0, CC0 path data; trademark of Google | Nominative use, unaltered. Check against Google's brand permissions before launch |
| Outlook | name only | https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks | — | Trademark of Microsoft | Name only: Microsoft had all its icons removed from Simple Icons (simple-icons#11236) |
| Microsoft 365 | name only | https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks | — | Trademark of Microsoft | Name only: Microsoft had all its icons removed from Simple Icons (simple-icons#11236) |
| IMAP | name only | — | — | — | A protocol, not a brand |
| Grafana | `assets/logos/grafana.svg` | https://grafana.com | Simple Icons 16.33.0 (`grafana`) | Simple Icons 16.33.0, CC0 path data; trademark of Grafana Labs | No published third-party logo guidelines found; nominative use, unaltered |
| Loki | name only | https://grafana.com/oss/loki/ | — | Grafana Labs | Name only: no Simple Icons mark |
| Elasticsearch | `assets/logos/elasticsearch.svg` | https://www.elastic.co/brand | Simple Icons 16.33.0 (`elasticsearch`) | Simple Icons 16.33.0, CC0 path data; trademark of Elasticsearch B.V. | elastic.co/brand; nominative use, unaltered |
| Datadog | `assets/logos/datadog.svg` | https://www.datadoghq.com/about/resources/ | Simple Icons 16.33.0 (`datadog`) | Simple Icons 16.33.0, CC0 path data; trademark of Datadog | Datadog press resources; nominative use, unaltered |
| CloudWatch | name only | https://aws.amazon.com/trademark-guidelines/ | — | Trademark of Amazon | Name only: no Simple Icons mark; AWS trademark guidelines restrict logo use |
| Cloudflare | `assets/logos/cloudflare.svg` | https://www.cloudflare.com/logo/ | Simple Icons 16.33.0 (`cloudflare`) | Simple Icons 16.33.0, CC0 path data; trademark of Cloudflare | cloudflare.com/trademark: nominative use, unaltered |
| Sentry | `assets/logos/sentry.svg` | https://sentry.io/branding/ | Simple Icons 16.33.0 (`sentry`) | Simple Icons 16.33.0, CC0 path data; trademark of Functional Software | sentry.io/branding; nominative use, unaltered |
| Anthropic | `assets/logos/anthropic.svg` | https://www.anthropic.com | Simple Icons 16.33.0 (`anthropic`) | Simple Icons 16.33.0, CC0 path data; trademark of Anthropic | No published third-party logo guidelines found; nominative use, unaltered |
| OpenAI | name only | https://openai.com/brand/ | — | Trademark of OpenAI | Name only: OpenAI's brand guidelines ask for permission to use its marks, and Simple Icons removed its icon (simple-icons#13944) |
| OpenRouter | `assets/logos/openrouter.svg` | https://openrouter.ai | Simple Icons 16.33.0 (`openrouter`) | Simple Icons 16.33.0, CC0 path data; trademark of OpenRouter | No published third-party logo guidelines found; nominative use, unaltered |
| LiteLLM | name only | https://github.com/BerriAI/litellm | — | BerriAI | Name only: no Simple Icons mark and no press kit found |
| DeepSeek | `assets/logos/deepseek.svg` | https://www.deepseek.com | Simple Icons 16.33.0 (`deepseek`) | Simple Icons 16.33.0, CC0 path data; trademark of DeepSeek | No published third-party logo guidelines found; nominative use, unaltered |
| Linear | `assets/logos/linear.svg` | https://linear.app | Simple Icons 16.33.0 (`linear`) | Simple Icons 16.33.0, CC0 path data; trademark of Linear Orbit | No published third-party logo guidelines found; nominative use, unaltered |
| Notion | `assets/logos/notion.svg` | https://www.notion.so | Simple Icons 16.33.0 (`notion`) | Simple Icons 16.33.0, CC0 path data; trademark of Notion Labs | Nominative use, unaltered |
| WhatsApp | `assets/logos/whatsapp.svg` | https://about.meta.com/brand/resources/whatsapp/whatsapp-brand | Simple Icons 16.33.0 (`whatsapp`) | Simple Icons 16.33.0, CC0 path data; trademark of Meta | Meta's WhatsApp brand guidelines: glyph in one colour allowed, unaltered |
| Telegram | `assets/logos/telegram.svg` | https://telegram.org/tour/screenshots | Simple Icons 16.33.0 (`telegram`) | Simple Icons 16.33.0, CC0 path data; trademark of Telegram | No published third-party logo guidelines found; nominative use, unaltered |
| ChatGPT | name only | https://openai.com/brand/ | — | Trademark of OpenAI | Name only: as OpenAI |
| Claude | same file as above (assets/logos/claude.svg) | https://claude.ai | Simple Icons 16.33.0 (`claude`) | Simple Icons 16.33.0, CC0 path data; trademark of Anthropic | No published third-party logo guidelines found; nominative use, unaltered |

## Product update 2026-10-16

Rows added or changed for the product update. Each is backed by the product repository at 7163b59 (`docs-src/`), its app code, or the Mac app README.

| Claim | Where | Backed by |
| :--- | :--- | :--- |
| Several workspaces: create more while signed in (workspace menu, New workspace); the Mac app keeps one sign-in per workspace and switches between them; the approval page has a workspace picker | /guides/getting-started/, /guides/workspaces/, /download/, FAQ "Can I have more than one workspace?", llms.txt | `app/assets/shell.js`, `macos/LivingBrainBar/README.md`, PRs #209, #210, #211 |
| Roles owner, admin, member, viewer; admins invite by email; last-owner protection; viewers read only | /guides/workspaces/ | ADR 0004 (`docs/adr/0004-accounts-and-access.md`), `app/settings.html` Members |
| Access grants on every route, multiselect grants with batch create and revoke, agent accounts with a key shown once, bulk disable and enable, audit log for owners and admins | /security/ #access, /guides/access-agents-audit/ | PRs #180, #207; `app/settings.html`, `app/assets/access.js`, `crates/livingbrain-audit` |
| Profiles: member names and avatars, workspace picture, square cropper | /download/ (not claimed on the marketing pages beyond the Mac app), /guides/workspaces/ | PRs #200, #208; `app/settings.html` |
| Facts with freshness (90 days, Show stale) and dreaming (background pass that supersedes, ends, retracts or renames facts, keeps history, logs decisions, budgeted) | /how-it-works/ #evolve, /guides/facts-and-dreaming/, /docs/facts/, FAQ "What does living mean?", llms.txt | `docs/temporal-facts.md` section 9 at 7163b59; PR #212 MERGED as 7163b59 |
| Brain jobs on the user's own Claude Code or Codex (tools off, read-only sandbox, credentials never held by the server) | /guides/coding-agent-sync/, /docs/local-runner/, /pricing/ meter row, FAQ "What does a question cost?", /download/ | `docs/local-runner.md`, `macos/LivingBrainBar/README.md`, PRs #173, #174, #176, #182 |
| MCP: five tools, every read scoped to the asker, endpoint at mcp.livingbrain.wiki | /agents/ #connect, /guides/mcp/, /docs/mcp/ | `docs/mcp.md`, `crates/livingbrain-venture/wrangler.toml` custom domain |
| Imports: upload Markdown or text (or a folder) into personal or shared scope, optional project | /guides/imports/, /integrations/ #imports | `app/assets/imports.js`, `app/wiki.html` Imports, PR #208 |
| Temporal facts, and the GitHub App ingest | /guides/facts-and-dreaming/, /guides/github-app/ | `docs/temporal-facts.md`, `docs/github.md` |
| Living Brain for Mac 0.1.2 and bundled CLI 0.1.2 | /download/, llms.txt, COPY row above | `macos-v0.1.2` (to be published: see the PR's merge note) |
