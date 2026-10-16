---
title: Facts and dreaming
blurb: How the brain keeps dated facts, shows which are still confirmed, and tidies old ones in a background pass that keeps the history.
eyebrow: Guide · Facts
order: 6
---

# Facts and dreaming

A page says what something is. A **fact** says what was true, and when. Each
fact has a subject (a person, project, system or other entity), an attribute,
a value, and dates. When a value changes, the brain does not overwrite it. It
keeps the old fact with the dates it held and marks the newer one as current.

## Reading facts

Each subject's timeline is in the Facts view of the wiki (`wiki?view=facts`).
An agent can ask about a point in time: the `brain_facts` MCP tool takes an
`as_of` date and returns the value then, with its earlier values.

## Freshness

Each fact records when it was last confirmed: when it was written, and again
whenever a later write repeats it. The Facts view shows current facts confirmed
in the last 90 days, measured from the date you are viewing. Older ones are
hidden unless you turn on **Show stale**. History always shows everything.

## Facts are state, not events

A cost, an outage or an incident happened once; it is not a standing fact. When
the brain writes facts, it refuses attributes that describe events, and it
reuses an existing attribute when the same property changes, instead of
inventing a new key for each issue or session.

## Dreaming

Dreaming is the background pass that tidies one subject's facts. It reads every
current fact of that subject and may:

- **supersede** an older fact with a newer one of the same attribute;
- **end** a fact at a date it stopped being true;
- **retract** an event or a duplicate;
- **rename** a fact to the ordinary attribute key.

A subject is due for a pass when it has at least 20 current facts and has never
been tidied, when its last pass is seven or more days old, or when ten or more
facts were added since. At most two passes run per cron tick, and each one
counts against the same daily and monthly compile budget as a compile. When the
budget is spent, the rest wait.

Nothing is deleted. A superseded, ended or retracted fact stays in the history
with the date it stopped. Every decision is logged, whether or not it was
applied, so you can see why a fact changed. The timeline shows when a subject
was last dreamt about, and the facts a pass changed say so: "Ended while
dreaming", "Superseded while dreaming", "Renamed while dreaming".

## Reference

The fact format, the write rules and the dreaming queue are in the
[temporal facts reference](/docs/facts/).
