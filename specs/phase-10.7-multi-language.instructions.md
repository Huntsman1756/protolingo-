---
description: "Phase 10.7 spec — Multi-language: i18n audit — verify all translation keys added in phases 10.4–10.6 are correct and complete in all 10 locales."
applyTo: "messages/**"
---

# Phase 10.7 — i18n audit

## Goal

All i18n keys were added incrementally alongside the features that use them:

| Phase | Keys added | Namespace(s) |
|-------|-----------|--------------|
| 10.4 | `nav.switchLanguage` | `nav` |
| 10.5 | Full `languages.*` namespace, `onboarding.newLanguageHeadline`, `onboarding.newLanguageSubtitle` | `languages`, `onboarding` |
| 10.6 | `targetLanguages.es-ES`, `targetLanguages.it-IT`, `targetLanguages.pt-PT` + descriptions | `targetLanguages` |

This phase is a **review pass** — no new keys are introduced. The goal is to ensure all values are correctly translated in all 10 locale files.

**Prerequisite:** Phases 10.4, 10.5 and 10.6 must be merged.

---

## 10.7.1 Checklist per locale file

For each of the 10 locale files (`messages/de.json`, `en.json`, `es.json`, `fr.json`, `it.json`, `nl.json`, `pl.json`, `pt.json`, `ro.json`, `ru.json`):

- [ ] `nav.switchLanguage` — present and translated (not copied from English)
- [ ] All 18 keys under `languages.*` — present and translated
- [ ] `onboarding.newLanguageHeadline` — present and translated
- [ ] `onboarding.newLanguageSubtitle` — present and translated
- [ ] `targetLanguages.es-ES` and `targetLanguages.es-ES-description` — present and translated
- [ ] `targetLanguages.it-IT` and `targetLanguages.it-IT-description` — present and translated
- [ ] `targetLanguages.pt-PT` and `targetLanguages.pt-PT-description` — present and translated

---

## 10.7.2 Interpolation variables

Verify the following keys use the correct interpolation variable names (must match what the components pass):

| Key | Variable |
|-----|----------|
| `languages.switching` | `{language}` |
| `languages.switched` | `{language}`, `{level}` |
| `languages.removeConfirmTitle` | `{language}` |
| `languages.removeConfirmMessage` | (no variables) |

---

## Modified files in this phase

Only if corrections are needed during the audit:

| File | Change |
|------|--------|
| `messages/*.json` (any of the 10) | Fix missing or incorrect translations found during review |
