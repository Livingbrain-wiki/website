---
title: Coding-agent sync and transcripts
blurb: How your Claude Code and Codex sessions reach the brain, what is sent and what never leaves your Mac, and how the compiled wiki reads them.
eyebrow: Guide · Coding agents
order: 4
---

# Coding-agent sync and transcripts

Your coding agents already write a log of every session. Living Brain can
read those logs, so the decisions and dead ends in them become searchable and
citable. Nothing is read or sent from a repository you have not opted in.

## What is read

- Claude Code sessions, under `~/.claude/projects`.
- Codex sessions, under `~/.codex/sessions`.

## Opt in per repository

Only repositories you add are synced. In the Mac app, choose **Add Project…**
and pick a folder; from the terminal, run `livingbrain logs allow <path>`. A
session recorded in any other repository is reported as skipped, and nothing
about it is sent.

## When it syncs

- **Live sync** (on by default in the Mac app): a session syncs once it has had
  no new activity for two minutes.
- **Sync Now** runs a sync at once.
- **Sync Automatically Every 15 Min** is an option you can turn on.
- From a terminal: `livingbrain logs sync`.

Pause Syncing stops live and scheduled sync. Sync Now still works.

## What is redacted

Secrets and email addresses are removed on your machine, before anything is
sent. The server runs the same redaction again. Redaction catches the common
patterns; it cannot know every secret, so check the preview in the Mac app
before you rely on a repository being clean.

## Transcripts

Open **Sources → Agent sessions** in the web app, or a session in the Mac app,
to read the whole session: your messages, the agent's replies, its reasoning
summaries, each tool call with its command or patch, and the clipped output.
The Mac app shows the exact redacted record that would be sent before you sync
it.

Subagent sessions are nested under the tool call that started them, so a
delegated task reads in place.

## The compiled wiki

A compile step reads the synced sessions one at a time and maintains Markdown
pages: one index and patterns page per agent, and pages per project. Every claim
cites its session. Compiles run in the background on a budget you can set under
**Settings → Usage & limits**, and the web app shows the queue and when the next
run is due. The full design is in the [coding-agents reference](/docs/coding-agents/).

## Use your own subscription for brain jobs

The compile and the answers to questions are model jobs. On your Mac you can
run them with your own Claude Code or Codex subscription instead of the
workspace's model, from **Run Brain Jobs with My Subscription** in the Mac app,
or with `livingbrain jobs run` on a headless machine. The agent runs with tools
off and a read-only sandbox, and Living Brain never holds your agent
credentials. Details are in the [local runner reference](/docs/local-runner/).

## Related

- [Agent logs](/docs/agent-logs/): the `logs` commands in full.
- [Getting started](/guides/getting-started/): sign in and install the Mac app.
