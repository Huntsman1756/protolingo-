---
description: Use when updating the CHANGELOG, adding entries for new features, bug fixes, or changes, deciding what to document, or reviewing changelog format.
applyTo: "**/CHANGELOG.md"
---

# Changelog Guidelines

## Format

The changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Version header

```
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD
```

- `MAJOR.MINOR.PATCH` follows SemVer
- Date is ISO 8601 (e.g. `2026-04-21`)
- Unreleased work goes under `## [Unreleased]` at the top

### Sections (in order, omit empty ones)

```
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

---

## Entry Style

- One entry per bullet (`-`), no sub-bullets
- Start with a noun or past-tense verb describing what changed, not who changed it
- Be specific: include the affected module, endpoint, component, or feature name where helpful
- Do not mention PR numbers, commit hashes, or author names
- Keep entries concise — one sentence max
- Group related entries under the same section, not by file or layer

**Good:**

```
- Flashcard SM-2 review endpoint with quality score 0–5
- SSE streaming chat with progress-aware tutor system prompt
- Admin panel with user CRUD and single-use invite links
```

**Bad:**

```
- Fixed a bug
- Updated some files
- Refactored chat module (see PR #42)
```

---

## What to Document

### Always document

- New user-facing features or UI changes
- New backend API endpoints or new frontend routes
- New database models or migrations
- New Docker Compose services or infrastructure changes
- Behaviour changes that affect the user experience
- Bug fixes visible to the user
- Security fixes
- Breaking changes to internal contracts (LLM prompts, API schemas, auth flow)
- New LLM provider support or config changes

### Do not document

- Internal refactors with no behaviour change (e.g. extracting a private function)
- Test additions or changes — unless fixing a previously untested bug
- Lint/format-only changes (ruff, black, eslint, prettier)
- Changes to `.gitignore`, CI scripts, or dev tooling (unless they affect contributors)
- Documentation-only changes (README, instruction files, AGENTS.md)

---

## When to Update

Update `CHANGELOG.md` when:

- A feature is fully implemented and tested
- A bug fix is confirmed working
- A breaking change is introduced

Do not update the changelog speculatively or mid-implementation.

---

## Unreleased Section

Use `## [Unreleased]` for changes not yet assigned to a build number:

```markdown
## [Unreleased]

### Added

- ...

### Fixed

- ...
```

When a build is released, replace `[Unreleased]` with the version + date.

---

## Rules

- Never delete or rewrite existing entries — only append new ones
- Never group multiple distinct changes into a single bullet
- The most recent version always appears at the top
- Keep the introductory paragraph (Keep a Changelog + SemVer links) unchanged
