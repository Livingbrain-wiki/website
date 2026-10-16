---
title: Imports
blurb: Bring Markdown notes, folders, and ChatGPT or Claude exports into a personal or shared brain. Nothing uploads until you confirm.
eyebrow: Guide · Imports
order: 3
---

# Imports

Imports add *sources* to the brain: files that came from outside. The brain
reads them, writes pages from them, and cites them. Each source is kept once,
so importing the same file again adds nothing new.

## What is taken

- **Markdown and plain text**: files ending in `.md`, `.markdown` or `.txt`.
- **At most 1 MB** per file. Larger files are skipped and counted.
- **Plain UTF-8 text**. Binary files are skipped.
- **Hidden folders are skipped**, such as `.git` or `.obsidian`.

## From the web app

Open **Imports** in the sidebar. Drop notes or a whole folder on the box, or
choose files or a folder. Then pick:

- **Scope**: your personal brain, or the shared one.
- **Project** (optional): files the brain should file under a project name.

The browser reads and sends each file; the server checks and redacts every body
and path again before storing it.

## From the CLI

```sh
livingbrain import markdown ~/vault
livingbrain import markdown ~/vault --exclude 'drafts/**' --shared
```

The command reads and redacts everything on your machine, prints a preview (file
count, bytes, what was skipped, how many secrets will be redacted, and which
brain the files go to), and asks before uploading. Answering anything but `y`
uploads nothing.

## ChatGPT and Claude exports

Request your export first. In ChatGPT, use **Settings → Data controls → Export
data**; in Claude, use **Settings → Privacy → Export data**. The download link
arrives by email and expires, so download the zip promptly. Then:

```sh
livingbrain import chatgpt ~/Downloads/conversations.zip
livingbrain import claude ~/Downloads/claude-export.zip --keyword migration
```

You can keep only some conversations with `--since`, `--until`, `--keyword` or
`--id`. The zip is read in memory and never unpacked to disk. Each conversation
becomes one Markdown source, with its live branch only: edited or regenerated
answers that were abandoned are left out, and so are hidden system messages.

For the step-by-step ChatGPT guide, see [Import your ChatGPT history](/guides/import-chatgpt/).
The full flag reference is on [the import reference](/docs/import/).

## Redaction

Secrets are redacted on your machine before anything is sent, and the server
runs the same redaction again on every body and path. Redaction is not a
guarantee: read the preview, and do not import files you would not share with
the people who can read that scope.
