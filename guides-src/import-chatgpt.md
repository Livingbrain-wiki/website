---
title: Import your ChatGPT history
blurb: Export your ChatGPT history from ChatGPT, then import it with the livingbrain CLI. The preview comes first; nothing uploads until you confirm.
eyebrow: Guide · Import
order: 9
---

# Import your ChatGPT history

Years of ChatGPT conversations hold decisions, plans and prompts that worked.
Living Brain reads them and keeps what matters as Markdown sources and pages,
each one citing the conversation it came from.

## 1. Export your data from ChatGPT

1. Open [ChatGPT](https://chatgpt.com) on the web, click your profile picture, then **Settings**.
2. Open **Data controls**, choose **Export data**, and confirm.
3. OpenAI emails you a download link. It **expires after 24 hours**, so download the `.zip` soon.

The zip holds every conversation in `conversations.json`, a readable copy in
`chat.html`, a few small files about your account and feedback, and the files
and images you uploaded.

If you use ChatGPT through a company workspace, personal export may be switched
off; ask your admin. OpenAI's steps can change. Their help centre has
[the current version](https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data).

## 2. Import it

```sh
livingbrain import chatgpt ~/Downloads/chatgpt-export.zip
```

- **It reads on your machine.** The zip is read in memory and never unpacked to disk.
- **You see a preview first.** Nothing uploads until you answer `y`.
- **You choose what goes in.** Add `--since`, `--until`, `--keyword` or `--id` to keep only some conversations.
- **Only the live branch is kept.** Edited or regenerated answers that were abandoned, and hidden system messages, are left out.
- **Secrets are redacted** before anything leaves your machine.
- **Importing again is safe.** The same content is stored once, so a newer export adds only what is new.

Claude's export works the same way, from **Settings → Privacy → Export data**:
`livingbrain import claude ~/Downloads/claude-export.zip`.

## 3. Then delete the zip

The export contains everything you ever typed into ChatGPT. Once it is imported,
delete the zip from your Downloads folder and empty the trash.

For every import option, see [the import reference](/docs/import/). For the
other way to bring notes in, see [Imports](/guides/imports/).
