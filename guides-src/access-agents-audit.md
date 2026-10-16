---
title: Access, agents and audit
blurb: Who can read what, how agent accounts get their own limited keys, and how owners and admins see every change to settings and access.
eyebrow: Guide · Access
order: 7
---

# Access, agents and audit

Living Brain answers every question with only what the person or agent asking
is allowed to read. Access is decided in one place for every route, the web app,
the CLI and the MCP endpoint alike.

## Who can read what

- **Personal** sources and pages belong to one person.
- **Shared** pages belong to the workspace. Members read them when their role
  and grants allow.
- **Projects and folders** can be granted to a person, a role or an agent
  account, so a teammate or an agent sees only one project.
- A **viewer** reads what it is granted and cannot write.

A page you are not granted reads as *not found*, not as *forbidden*.

## Grants

Admins and owners manage grants in **Settings → Access**. A grant names who it
is for, what it covers (a space, a folder or a project), and what it allows
(read or write). You can select several grants at once to create or revoke them
in one step.

## Agent accounts

An agent account is a non-human identity for a tool, such as a coding agent or
a bot. Create one under **Settings → Agent accounts**, give it grants, and copy
its key. The key is shown once; Living Brain keeps only what it needs to check
it. Disable an agent account to stop its key working at once. Several agent
accounts can be disabled or enabled together.

## Audit log

**Settings → Audit log** is visible to owners and admins. It records settings
changes and access changes: who did what, and when, in that workspace. A credential
value is never written to the log: the entry records the change, not the secret.
The log is append-only, and a clear is recorded as a clear.

## Reference

The [MCP reference](/docs/mcp/) explains what an MCP client can see.
