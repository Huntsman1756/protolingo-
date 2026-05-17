---
description: "Guidelines for maintaining FreeLingo's README.md: structure, badges, repository tree, stack table, phase status, and update rules."
applyTo: "**/README.md"
---

# README Guidelines

## Structure

The README follows this exact structure in order:

1. **Title** — Project name as H1
2. **Badges** — shields.io `flat-square` badges: License, Next.js version, Python version, self-hosted status, hosted service availability
3. **Logo** — Left-aligned logo from `assets/logo.png`
4. **Description** — 2–3 sentences covering what the project is, the two deployment modes (self-hosted and hosted service), and the core feature set
5. **Expanded description** — Paragraph-level detail on the learning methodology: CEFR curriculum, study plan, lesson types, SM-2 flashcards, AI tutor, listening exercises, progress tracking
6. **Hosted service** — Callout linking to the hosted instance at `freelingo.app`; clarifies that self-hosting remains free under AGPL-3.0
7. **Architecture** — One-paragraph summary; delegates structural detail to `specs/architecture.instructions.md`
8. **Repository** — Top-level directory tree listing directories and key root files only
9. **Stack** — Table: layer → technology; one row per concern, no prose
10. **Phases** — Table: phase number, name, completion status; one row per phase
11. **Quick start** — Two deployment paths: Option A (Git clone + Docker Compose) and Option B (Portainer Stack)
12. **Operational notes** — Key facts operators must know: recommended model, LLM/TTS/STT provider selection, target language behaviour
13. **Reverse proxy requirement** — Why a reverse proxy is mandatory in production (WebSocket upgrade + secure context for microphone)
14. **Enabling TTS & STT** — Provider selection table, local GPU setup, voice and model reference tables, OpenAI fallback
15. **Contributing** — Link to `CONTRIBUTING.md`
16. **License** — AGPL-3.0 reference
17. **Author** — Maintainer credit

---

## Rules

- Badges must use shields.io `flat-square` style; update version values on every version bump
- Descriptions must be factual and concise — no marketing language
- The Stack table stays brief: layer → technology only, no inline descriptions
- The Repository section lists only top-level directories and root files — never a deep file tree
- The Phase table must always include every phase; mark completed phases with ✅ Complete and add new rows as phases ship
- The Quick start section must cover both Option A (CLI) and Option B (Portainer)
- The Hosted service callout must always link to `https://freelingo.app`
- Do not add a separate "Features" section; feature detail belongs in the expanded description

---

## When to update the README

| Change | Action |
|--------|--------|
| New user-facing feature | Update expanded description if relevant |
| New phase completed | Add/update row in Phase table |
| New technology introduced | Add row to Stack table |
| New architecture decision | Update Architecture section |
| New top-level directory added | Add line to Repository section |
| Version bump | Update version badges |

Do **not** update the README for:
- Internal refactors
- New files within an existing module
- Test additions
- Spec file content changes (structure changes only)