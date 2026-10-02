Design a one-page marketing website for **livingbrain.wiki**, a Factory Zero venture.

## Skills
Before you start, load and follow the popular design skills that are available to you:
- **frontend-design**: a distinctive, production-grade look. Avoid generic "AI startup" aesthetics (no purple-gradient-on-white, no stock hero blobs).
- **theme-factory**: pick one coherent theme and apply it everywhere (palette, type scale, spacing, radius).
- **canvas-design** / **algorithmic-art**: for the hero visual and section illustrations.
- **web-artifacts-builder**: for the interactive 3D brain demo.
- **brand-guidelines**: to write a short brand sheet (logo wordmark, colors, type, voice) alongside the page.
If a skill isn't available, apply its principles anyway and say which ones you substituted.

## The product
Living Brain is a teammate in your Slack that builds and keeps its own company wiki.
- **Remembers:** it listens in the channels it's invited to and turns conversations into Markdown pages (people, projects, decisions, customers). Every fact links back to the message it came from.
- **Evolves:** on its own schedule it merges duplicates, flags contradictions, retires stale facts and rewrites summaries. It also learns how each person works, so its answers improve every week.
- **Acts:** it doesn't just answer. It opens the issue, reads the PR, sends the email digest, and hands bigger jobs to a sandboxed agent that comes back with a pull request.
- **You own it:** the whole brain is plain Markdown you can read, edit and export (it opens in Obsidian). Your knowledge isn't locked in a black-box vector store.
- **Private by design:** it only reads with the asker's own access. A public channel sees the shared brain, a private channel adds that channel's memory, and your DMs add your personal memory.
- **Connect your coding agents:** plug in Claude Code, Codex, Cursor, OpenCode or any agent that supports MCP. It works both ways:
  - **Agents → brain (opt-in):** the prompts and sessions your team runs, and the decisions agents make along the way ("we switched to Postgres because…", "this module is fragile"), become wiki pages with links to the session they came from. Secrets are redacted before anything is stored.
  - **Brain → agents:** before an agent writes code, it asks the brain for context: team conventions, past decisions, who owns what, and what was tried and failed. Every agent on the team starts with the company's memory instead of a blank slate.
  - **Shared prompt library:** the team's best prompts are saved, versioned and suggested to everyone, and the brain notices which ones work.
  - **It learns from every session:** a background learning layer reasons over each person's prompts and agent sessions, not just chat. It learns how each developer works, which prompts lead to merged PRs and which lead to rework, and where agents keep getting stuck. It then improves the prompt library, adds missing context to the wiki, and briefs each person's agent the way they like it. (Internally this is built on Honcho-style per-person modeling. Don't name Honcho on the site; call it "the learning layer".)
- **Works with Colonizer** (colonizer.dev, a sister Factory Zero venture): when a job is bigger than an answer, the brain launches a Colonizer colony, an isolated microVM with a coding agent inside that comes back with a pull request.
  - Each colony boots already briefed with the brain's context for that repo and task.
  - When it finishes, what it learned (decisions, dead ends, the PR) flows back into the wiki.
  - People can start a colony from Slack ("@livingbrain fix #142") and follow it live from the thread.
- **Bring your own model:** use our default model, or connect your own (Anthropic, OpenAI, OpenRouter, or any OpenAI-compatible endpoint, including self-hosted).
- **Built in Rust** on Cloudflare's edge, so it's fast and very cheap to run.

Tagline options (pick one or improve on them):
- "A living brain for your crew."
- "The wiki that writes itself."
- "Your company, remembered."

## Page structure
1. **Hero:** tagline, one-sentence subline, "Join the waitlist" email field and a secondary "See how it thinks" button that scrolls to the demo. The hero visual is a slowly rotating **3D brain made of a knowledge graph**: glowing nodes (people, projects, decisions, customers) and edges that pulse as new links form. It should feel alive: nodes appear, merge and brighten over time.
2. **A Slack moment:** a mock #eng thread where someone asks "is prod down?" and Living Brain answers unprompted, with a citation chip linking to the source message.
3. **How it works:** three steps, Listen → Write → Evolve, each with a small animated illustration (messages flowing in → a Markdown page being written with `[[backlinks]]` → two pages merging and a stale fact fading).
4. **Interactive 3D demo:** an explorable graph (orbit, zoom, click a node). Clicking opens a side panel showing that entity's Markdown page with source citations. Use realistic sample data for a fictional company. Build it with three.js / 3d-force-graph from cdnjs or jsdelivr.
5. **What it does:** a card grid (Remembers, Answers with sources, Acts in your tools, Speaks up, Works while you sleep, Learns your way, Connects to your coding agents).
5b. **Connect your coding agents:** a dedicated section. On one side, a terminal mock showing a one-line connect command (illustrative, e.g. `claude mcp add livingbrain https://mcp.livingbrain.wiki`) with tabs for Claude Code / Codex / Cursor / Other MCP. On the other side, a mock agent session where the agent asks the brain "what's our convention for migrations?" and gets a cited answer before writing code. Below that, a "Team prompt library" strip of prompt cards with usage counts (sample data). Use plain text names for the agents, not their logos, and imply no partnership.
5c. **From Slack to pull request, with Colonizer:** a horizontal flow: a Slack message "@livingbrain fix #142" → the brain briefs a colony (a small glowing microVM capsule) → the agent works inside it (live log ticker) → a PR card appears in the thread → the learnings flow back into the 3D brain as new nodes. Caption it "Works with Colonizer" and link to colonizer.dev. Mark it as sample flow.
6. **Private by design:** the public channel / private channel / DM access table as a clean visual.
7. **You own your brain:** a Markdown file shown next to the 3D graph, with "Export anytime. Opens in Obsidian."
8. **Pricing:** three plans, priced per workspace, not per seat:
   - Free: $0, up to 5 people
   - Bring your own model: $5/mo per workspace, unlimited people
   - Crew: $9/mo per workspace, model included, up to 25 people
   - Note: "Others charge $10–45 per user. We charge per team."
9. **FAQ:** Is my data used for training? Can I self-host? Which models? What does "living" mean? How is it different from Slack AI or Glean? Which coding agents can I connect? Do you store my agent prompts and code? (Answer: only if you opt in, with secrets redacted, and never source code unless you allow it.)
10. **Footer:** waitlist field again, "a Factory Zero venture" (link to factory0.ventures), GitHub link placeholder.

## Animated infographics (a key part of the page)
Every major section gets an animated infographic that tells its story without words. They play when scrolled into view (IntersectionObserver), are built in inline SVG plus CSS/JS (no video files, no Lottie runtime), and loop gently or stay on their final frame.
- **Knowledge growth:** a counter and an area chart of "pages written / links formed / facts refreshed" climbing over a sample 30 days, with the 3D brain getting denser beside it.
- **Listen → Write → Evolve pipeline:** Slack bubbles stream along a curved path into a "brain" node, come out as Markdown cards that snap into a graph, then two duplicate cards merge with a spark.
- **Self-evolving loop:** a circular diagram (Observe → Summarize → Reconcile → Learn) with a pulse travelling around it, and a "stale fact" visibly fading and being replaced.
- **Citation trail:** an answer bubble draws a thin line back to the exact source message it came from.
- **Permissions:** three concentric rings (shared brain ⊂ private channel ⊂ your DMs) that light up depending on where the question is asked.
- **Cost comparison:** animated bars for "per-user pricing × 20 people" against "Living Brain, one flat price". The bars race, and Living Brain's barely moves.
- **Agents ⇄ brain:** several coding-agent terminals around the 3D brain. Prompts and decisions flow into it as particles, become new nodes, and context flows back out to the agents as glowing threads. A redaction step visibly blurs a fake API key before it enters.
- **The learning layer:** a per-person profile card that fills in over a sample month ("prefers small PRs", "writes tests first", "gets stuck on auth"), next to a prompt-library leaderboard where the best prompt rises as merged PRs tick up.
- **Colonies in the graph:** active Colonizer colonies appear in the 3D brain as orbiting capsules connected to the repo and issue nodes they work on. When a colony finishes, it docks and the brain grows new nodes.
- **Brain at work:** a timeline of a single night: digest written at 7:00, three contradictions resolved, one PR opened by an agent.
Label every infographic that uses sample numbers "Sample data". Respect `prefers-reduced-motion` by showing the final state with no animation.

## Honesty rules (important)
The product is **not built yet**. Follow the house style of the other Factory Zero sites:
- Show a status badge such as "EARLY ACCESS · IN DESIGN".
- Never present mock UI as real screenshots. Label demos "Illustration" or "Sample data".
- No fake customer logos, testimonials, user counts or uptime claims.

## Visual direction
- Dark-first, with a light theme too (respect `prefers-color-scheme` and add a toggle).
- Organic meets machine: think neural tissue and bioluminescence rendered with precise engineering lines. Living, but technical.
- One signature accent color for "alive" moments (pulses, new links); everything else restrained.
- Pair a distinctive display typeface with a clean sans for body text and a mono for Markdown and code. Use Google Fonts only.
- Motion is purposeful and subtle, and respects `prefers-reduced-motion`. The 3D view falls back to a static SVG graph when WebGL is unavailable or motion is reduced.

## Technical constraints
- The output will be ported to **static HTML**: one page, one stylesheet, one script, no framework, no build step. It deploys on Cloudflare Pages. Design with that in mind and keep the dependencies to three.js / 3d-force-graph from a CDN.
- Make it agent-readable: semantic HTML, a clear heading hierarchy, an `llms.txt`-friendly structure, and meta, Open Graph and Twitter tags.
- Mobile-first: works at 360px wide with no horizontal scroll, and the 3D demo is touch-friendly.
- Accessibility: WCAG AA contrast, visible focus states, all interactive elements reachable by keyboard.
- Fast: the hero renders before three.js loads.

## Deliverables
1. The full landing page.
2. A short brand sheet: wordmark, color tokens, type scale, voice (three dos and three don'ts).
3. A 1200×630 Open Graph image design and a 1280×640 README banner using the 3D brain motif.
