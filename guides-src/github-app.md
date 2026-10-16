---
title: The GitHub App
blurb: Connect repositories so their commits, issues and pull requests are read into the brain, with a backfill that runs on the server.
eyebrow: Guide · GitHub
order: 5
---

# The GitHub App

The Living Brain GitHub App reads a repository's commits, issues and pull
requests into the brain, as sources, so the brain can answer questions about
them and cite them. It does not write to your repositories. Proposing wiki edits
as pull requests is planned, not built.

## Connect a repository

1. Sign in to [app.livingbrain.wiki](https://app.livingbrain.wiki/) as an owner
   or admin of the workspace.
2. Open **Settings → GitHub**.
3. Choose **Install Living Brain on GitHub**. Pick your account or organization.
   Choose **Only select repositories** and select the ones you want.
4. GitHub asks you to authorize Living Brain once. That only proves which GitHub
   user installed the app; the token is used for two reads and then dropped.
5. Back in Settings → GitHub, the repository is listed. It is shared by default,
   and filed under a project named after the repository.

A member who installs the app on an organization makes an approval request;
an owner of that organization finishes the steps.

## What comes in

The app is subscribed to pushes, issues, issue comments, pull requests, pull
request reviews and review comments, releases, and installation changes. Each
item becomes a source: commits by their SHA, and issues and pull requests by
their number, each with a permalink. The author's GitHub login is kept; no email
address is stored.

## Backfill

The first connection also reads the repository's existing history. The backfill
runs on the server, on the cron tick (every five minutes), in pages that respect
GitHub's rate limits. Settings → GitHub shows its progress. Nothing has to be
clicked to start it, and nothing outside Living Brain can start a backfill.

## Filtering

**Sources → GitHub** lists commits, issues and pull requests, filtered by kind
and project. Each entry links to its page on github.com.

## Your own app (advanced)

By default the workspace uses the shared Living Brain app. Under the advanced
section, you can instead create your own GitHub App for your account or
organization. Living Brain then uses that app's credentials, which it keeps
sealed. Removing an app here forgets its credentials; delete the app on GitHub
as well.

## Reference

The record format, webhook checks and backfill planner are in the
[GitHub connection reference](/docs/github/).
