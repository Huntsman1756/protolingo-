---
description: "Guidelines for maintaining FreeLingo's README.md: structure, badges, repository tree, stack table, phase status, and update rules."
applyTo: "**/README.md"
---

# README Guidelines

## Structure

The README follows this exact structure in order:

1. **Title** — Project name as H1
2. **Badges** — shields.io badges (License, Next.js version, Python version, self-hosted status) using `flat-square` style
3. **Logo** — Centered project logo from `assets/logo.png`
4. **Description** — 2-3 sentences explaining what the project is and what it does
5. **Expanded description** — Detailed overview of the learning methodology (CEFR curriculum, SM-2 flashcards, AI tutor, etc.)
6. **Architecture** — One paragraph summary, delegating detail to `specs/architecture.instructions.md`
7. **Repository** — Top-level directory tree (directories only, no file listing)
8. **Stack** — Technology stack table (layer → technology)
9. **Phases** — Phase status table (name, status)
10. **Quick start** — Minimal commands to get running from scratch
11. **Enabling TTS & STT** — Notes on enabling voice features, model/voice reference tables
12. **Internal documentation** — Links to spec files in `specs/`
13. **Operational notes** — Key facts for operators (Ollama, GPU, migrations, auth)

---

## Rules

- Badges use shields.io `flat-square` style
- Description must be concise — no marketing language
- Never duplicate the full folder/file tree in `README.md` — the architecture spec is the source of truth for structure
- The Stack table must stay brief: layer → technology, no descriptions
- When a new feature is added, update the Features list only if it is user-facing
- Never remove the internal documentation links section

---

## Badges

Current badges shown in README:

```markdown
![License](https://img.shields.io/badge/license-AGPL%20v3-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/next.js-16-black?style=flat-square)
![Python](https://img.shields.io/badge/python-3.14-blue?style=flat-square)
![Self-hosted](https://img.shields.io/badge/self--hosted-yes-orange?style=flat-square)
```

Update badge values whenever versions change.

---

## Architecture section

Keep it short. One paragraph max. Delegate detail to the architecture spec:

```markdown
## Architecture

Monorepo: `backend/` (Python 3.14 FastAPI) + `frontend/` (Next.js 16 App Router)
deployed via Docker Compose with PostgreSQL 16 and Redis 7.
The backend proxies all external services (Ollama, Kokoro, Whisper) —
the frontend never calls them directly.
```

---

## Repository section

Top-level layout only — directories only, no individual files:

```
freelingo/
├── backend/            # FastAPI (Python 3.14)
├── frontend/           # Next.js 16 (React 19)
├── specs/              # Architecture and feature specifications
├── messages/            # i18n message bundles (en, es, fr, pt, de, it)
├── docker/              # Custom Dockerfiles (optional overrides)
├── docs/                # Additional documentation
├── assets/              # Logo and branding
├── .github/             # CI/CD workflows (GitHub Actions)
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Stack table

```markdown
| Layer | Technology |
|-------|------------|
| Backend | Python 3.14, FastAPI, SQLAlchemy 2.0 (async), Alembic |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| LLM | Ollama (local), OpenAI, Anthropic, DeepSeek |
| TTS | Kokoro-FastAPI |
| STT | faster-whisper / ctranslate2 |
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| UI | shadcn/ui (@base-ui/react), Zustand, next-intl |
| Deployment | Docker Compose, GitHub Actions CI/CD |
```

---

## Phase status table

```markdown
| Phase | Name | Status |
|-------|------|--------|
| 1 | Learning Platform | Complete |
| 1+ | Learning Resources Hub | Complete |
| 2 | Local TTS + STT | Complete |
| 3 | Voice Conversation | Complete |
```

---

## When to update the README

| Change | Action |
|--------|--------|
| New user-facing feature | Add bullet to Features (if section exists) |
| New phase completed | Update Phase table status |
| New technology introduced | Add row to Stack table |
| New architecture decision | Update Architecture section |
| New spec file added | Add link in Internal documentation section |
| New top-level directory | Add line to Repository structure |
| Version bump | Update version badges |

Do **not** update the README for:
- Internal refactors
- New files within an existing module
- Test additions
- Spec file content changes (structure changes only)