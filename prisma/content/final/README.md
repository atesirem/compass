# Final guide texts

One markdown file per guide and language: `<slug>.<locale>.md` (for example `kindergeld.tr.md`).
`npm run content:sync` writes them into the database (the admin panel edits the same rows).
`npm run content:export -- <slug>` prints the current text from the database.

## Format
```
---
slug: kindergeld
status: REVIEW            # DRAFT | REVIEW | PUBLISHED
verified: 2026-10-24      # date the facts were checked against the sources
title: ...
summary: ...
sources:
  - https://...
---
Markdown body
```
- A guide that does not exist yet is created when the front matter has `module: <module slug>` (and optionally `position: 3` and `stage: FIRST_MONTH`). Module `everyday-life` is created by the sync.
- Only a verified fact goes into the text. What cannot be verified stays as a line starting with `TODO:`.
- `PUBLISHED` is accepted only with at least one https source, a verified date and no `TODO:` line; otherwise the sync saves it as `REVIEW`.
- Volatile numbers (fees, thresholds, contributions) go to `settings-*.json` (`[{ "key", "value", "note" }]`) and are used in the text as `{{setting:key}}`.
- German and English files (`.de.md`, `.en.md`) are saved with "needs language review".

- `stages.json` assigns the timeline stage (`PRE_ARRIVAL`, `FIRST_WEEK`, `FIRST_MONTH`, `FIRST_SIX_MONTHS`, `LONG_TERM`) to guide slugs; the sync applies it to existing guides.
