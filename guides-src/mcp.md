---
title: Connect a coding agent over MCP
blurb: Point an MCP client at the Living Brain endpoint, sign in with a token, and use the five tools it offers.
eyebrow: Guide · MCP
order: 8
---

# Connect a coding agent over MCP

Living Brain runs an MCP server at

```
https://mcp.livingbrain.wiki/v1/pages/mcp
```

It is Streamable HTTP. Any MCP client can connect to it; the commands below
are the usual ones for the agents we name on the [harnesses page](/agents/).
Which harnesses are tested is listed there: until a harness passes our
integration test, it stays marked planned, even when this endpoint works.

## Get a token

Either create a personal access token under **Settings → API tokens** in the web
app, or run `livingbrain login` on your machine, which asks you to approve a code
in your browser and returns a token for the workspace you pick.

## Connect

```sh
claude mcp add --transport http livingbrain https://mcp.livingbrain.wiki/v1/pages/mcp \
  --header "Authorization: Bearer <token>"
```

Use the same URL and header with `codex mcp add`, `cursor mcp add` or
`opencode mcp add`, following each client's own syntax. The token is a secret:
do not commit it.

## The five tools

| Tool | What it does |
| :--- | :--- |
| `brain_search` | Finds pages you may read that hold every word of the query. |
| `brain_page` | Returns one page's Markdown, by slug. |
| `brain_context_for` | Returns a short brief for a repository and a task: the pages that mention it, in full, with citations. |
| `brain_note` | Writes a note to your own private memory, redacted first. It can state temporal facts. |
| `brain_facts` | Returns what is true about a subject now, or as of a date, with its earlier values. |

Every page a tool quotes comes back as a numbered citation, with its title and
link, so the agent can cite it.

## What the agent can see

The agent sees what its user can see, and nothing more. No tool takes a scope
argument. If a page is outside the token's grants, it is reported as not found.

The [MCP reference](/docs/mcp/) has the discovery metadata and the authorization
details.
