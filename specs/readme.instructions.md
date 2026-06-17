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
7. **For businesses** — Commercial offerings: private/on-premise deployment, dedicated managed instance, commercial licence. Links to `COMMERCIAL_LICENSE.md` and contact email
8. **Architecture** — One-paragraph summary; delegates structural detail to `specs/architecture.instructions.md`
9. **Repository** — Top-level directory tree listing directories and key root files only
10. **Stack** — Table: layer → technology; one row per concern, no prose
11. **Phases** — Table: phase number, name, completion status; one row per phase
12. **Quick start** — Two deployment paths: Option A (Git clone + Docker Compose) and Option B (Portainer Stack)
13. **Operational notes** — Key facts operators must know: recommended model, LLM/TTS/STT provider selection, target language behaviour
14. **Linux host: Redis memory overcommit** — Host-level sysctl requirement for Redis background saves
15. **Reverse proxy requirement** — Why a reverse proxy is mandatory in production (WebSocket upgrade + secure context for microphone)
16. **Enabling TTS & STT** — Provider selection table, local GPU setup, voice and model reference tables, OpenAI fallback
17. **Development** — Link to `DEVELOPMENT.md` for local development instructions
18. **Contributing** — Link to `CONTRIBUTING.md` and CLA
19. **License** — AGPL-3.0 reference and commercial licence option
20. **Author** — Maintainer credit

---

## Rules

- Badges must use shields.io `flat-square` style; update version values on every version bump
- Descriptions must be factual and concise — no marketing language
- The Stack table stays brief: layer → technology only, no inline descriptions
- The Repository section lists only top-level directories and root files — never a deep file tree. Include all visible root files (AGENTS.md, CHANGELOG.md, CODE_OF_CONDUCT.md, COMMERCIAL_LICENSE.md, CONTRIBUTING.md, CONTRIBUTOR_LICENSE_AGREEMENT.md, DEVELOPMENT.md, docker-compose.yml, docker-compose.dev.yml, LICENSE, README.md, run-dev.sh)
- The Phase table must always include every phase; mark completed phases with ✅ Complete and add new rows as phases ship
- The Quick start section must cover both Option A (CLI) and Option B (Portainer)
- The Hosted service callout must always link to `https://freelingo.app`
- The For businesses section must link to `COMMERCIAL_LICENSE.md` and include contact information
- The Development section must link to `DEVELOPMENT.md`
- Do not add a separate "Features" section; feature detail belongs in the expanded description

---

## When to update the README

| Change                                           | Action                                            |
| ------------------------------------------------ | ------------------------------------------------- |
| New user-facing feature                          | Update expanded description if relevant           |
| New phase completed                              | Add/update row in Phase table                     |
| New technology introduced                        | Add row to Stack table                            |
| New architecture decision                        | Update Architecture section                       |
| New top-level directory or root file added       | Add line to Repository section                    |
| Version bump                                     | Update version badges                             |
| New commercial offering                          | Update For businesses section                     |
| New operational requirement (e.g., Redis config) | Add to Operational notes or create new subsection |
| New development workflow                         | Update Development section link                   |

Do **not** update the README for:

- Internal refactors
- New files within an existing module
- Test additions
- Spec file content changes (structure changes only)
