---
description: "Phase 10.8 spec — Multi-language: Pydantic schemas (already included in Phase 10.3, this phase has no additional work)."
applyTo: "backend/**"
---

# Phase 10.8 — Pydantic Schemas

## Status

**All Pydantic schema work for Phase 10 is included in Phase 10.3.**

The schemas defined in Phase 10.3 are:

- `backend/app/schemas/language.py` — `LanguageAddRequest`, `LanguageSwitchRequest`, `LanguagePlanInfo`, `LanguageProgressInfo`, `UserLanguageOut`, `UserLanguageListResponse`
- `backend/app/schemas/study_plan.py` — `target_language` field added to `GenerateStudyPlanRequest`
- `backend/app/schemas/auth.py` — `SUPPORTED_TARGET_LANGUAGES` expanded

This phase file is kept for reference and spec numbering consistency. There is no additional implementation work here — see [phase-10.3-multi-language.instructions.md](phase-10.3-multi-language.instructions.md) for the full schema definitions.