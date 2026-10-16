---
title: Getting started
blurb: Sign in, set up your workspace, then connect the CLI or the Mac app. The web app needs no install.
eyebrow: Guide · Start
order: 1
---

# Getting started

Living Brain is in early access. The web app lives at
[app.livingbrain.wiki](https://app.livingbrain.wiki/).

## 1. Sign in

Open [app.livingbrain.wiki](https://app.livingbrain.wiki/) and enter your work
email. We send a sign-in link; open it and you are in. Your first sign-in
creates your first workspace and makes you its owner.

## 2. Your workspace, and more of them

A workspace is one brain: its pages, sources, members and settings. To make
another while you are signed in, open the workspace menu at the top and choose
**New workspace**, or go to **Settings → Account**. Each workspace is separate:
pages, sources and members never mix.

## 3. Connect the CLI

The `livingbrain` command ships inside the Mac app (see step 4). Sign it in with:

```sh
livingbrain login
```

It prints a short code and an address. Open the address, enter the code, and
approve the request in your browser. If you have several
workspaces, the approval page has a picker, so the token is minted for the one
you choose. The token is kept in your operating system's keychain. Then try:

```sh
livingbrain ask "who owns billing?"
```

To sign out on this machine, run `livingbrain logout`.

## 4. Install the Mac app

[Living Brain for Mac](/download/) is a menu bar app. It syncs your Claude Code
and Codex sessions from the repositories you choose, and opens your wiki in a
window. It is not notarized yet, so the first open needs one extra step, which
the [download page](/download/) explains.

In the app, choose **Sign In…** (it runs the same device approval as the CLI),
then **Add Project…** to pick a repository. Only repositories you add are
synced. To use a second workspace, choose **Add Workspace…** from the workspace
menu; the app keeps one sign-in per workspace and switches between them.

## Next

- [Workspaces and members](/guides/workspaces/): roles and invitations.
- [Imports](/guides/imports/): bring in notes, ChatGPT and Claude exports.
- [Coding-agent sync](/guides/coding-agent-sync/): what the Mac app sends and what it does not.
- [MCP](/guides/mcp/): connect a coding agent to the brain.
