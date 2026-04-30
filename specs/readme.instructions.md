---
description: "Use when updating the README, adding badges, updating the architecture section, documenting new features, or changing project documentation."
applyTo: "**/README.md"
---

# README Guidelines

## Structure

The README follows this exact structure in order:

1. **Title** — Project name as H1
2. **Badges** — shields.io badges (License, Docker, LLM provider, Phase status) using `flat-square` style
3. **Description** — Brief explanation of what the project is (2–3 sentences max)
4. **Repository** — Top-level directory tree (no file listing)
5. **Stack** — Technology stack table (layer → technology)
6. **Phases** — Phase status table (name, status)
7. **Quick start** — Minimal commands to get running
8. **Internal documentation** — Links to spec files in `specs/`
9. **Operational notes** — Key facts agents need to know

---

## Rules

- Badges use shields.io `flat-square` style; keep Docker and phase badges in sync with the current state
- Description must be 2–3 sentences max — concise, no marketing language
- Never duplicate the full folder/file tree in `README.md` — the architecture spec is the source of truth for structure
- The Stack table must stay brief: layer → technology, no descriptions
- When a new feature is added, update the Features list only if it is user-facing
- Never remove the internal documentation links section

---

## Badges

Use the following shields.io badge format, adapted to FreeLingo:

```markdown
![License](https://img.shields.io/badge/license-Apache%202.0-green?style=flat-square)
![Docker](https://img.shields.io/badge/docker-required-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-planning-lightgrey?style=flat-square)
```

Update badge values whenever the project phase changes (`planning` → `phase-1` → `phase-2` → `phase-3` → `released`).

---

## Architecture section

Keep it short. One paragraph max. Delegate detail to the architecture spec:

```markdown
## Architecture

Monorepo: `backend/` (Python FastAPI) + `frontend/` (Next.js 14 App Router)
deployed via Docker Compose with PostgreSQL 16 and Redis 7.
The backend proxies all external services (Ollama, Kokoro, Whisper) —
the frontend never calls them directly.
```

---

## Repository section

Top-level layout only — no file listing:

```
freelingo/
├── backend/            # FastAPI (Python)
├── frontend/           # Next.js (React)
├── specs/              # Specification files
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## When to update the README

| Change | Action |
|---|---|
| New user-facing feature | Add bullet to Features (if section exists) |
| New phase completed | Update Phase table status + badges |
| New technology introduced | Add row to Stack table |
| New architecture decision | Update Architecture section |
| New spec file added | Add link in Internal documentation |
| New top-level directory | Add line to Repository structure |

Do **not** update the README for:
- Internal refactors
- New files within an existing module
- Test additions
- Instruction file changes