---
description: "Phase 10.7 spec — Multi-language: i18n translation keys for all 10 locale files."
applyTo: "messages/**"
---

# Phase 10.7 — i18n: new translation keys

## Goal

Add all translation keys required by the new multi-language UI to all 10 locale files.

**Prerequisite:** Phase 10.5 must be merged before starting this phase (the pages that use these keys must exist).

---

## Files to update

All 10 locale files under `messages/`:

```
messages/de.json
messages/en.json
messages/es.json
messages/fr.json
messages/it.json
messages/nl.json
messages/pl.json
messages/pt.json
messages/ro.json
messages/ru.json
```

Each key below must be added to **all 10 files**, translated into the respective interface language.

---

## 10.7.1 New namespace: `languages`

```json
"languages": {
  "myLanguages": "My Languages",
  "addLanguage": "Add new language",
  "selectLanguage": "Select the language you want to learn",
  "activeLanguage": "Active",
  "switchTo": "Switch to this",
  "switching": "Switching to {language}...",
  "switched": "Switched to {language} ({level})",
  "removeLanguage": "Remove language",
  "removeConfirmTitle": "Remove {language}?",
  "removeConfirmMessage": "All progress, lessons, flashcards and data associated with this language will be permanently deleted. This action cannot be undone.",
  "removeConfirmButton": "Remove",
  "noLanguages": "You have no languages configured.",
  "progressLabel": "Progress",
  "levelLabel": "Level",
  "xpLabel": "Total XP",
  "streakLabel": "Streak",
  "lessonsLabel": "Lessons",
  "flashcardsLabel": "Flashcards",
  "viewDetails": "View details",
  "supportedLanguages": "Available languages"
}
```

The English values above are the reference. Each other locale file must have equivalent translations in the respective language.

---

## 10.7.2 Update `onboarding` namespace

Add these keys to the existing `onboarding` object (do not remove existing keys):

```json
"onboarding": {
  "newLanguageHeadline": "What new language do you want to learn?",
  "newLanguageSubtitle": "A new study plan will be created for this language."
}
```

---

## 10.7.3 Update `nav` namespace

Add to the existing `nav` object:

```json
"nav": {
  "switchLanguage": "Switch language"
}
```

---

## 10.7.4 Update `targetLanguages` namespace

Add entries for the 3 new languages (do not remove existing entries for `en-US` and `en-GB`):

```json
"targetLanguages": {
  "es-ES": "Spanish (Spain)",
  "es-ES-description": "Spanish spoken in Spain, one of the most widely spoken languages in the world.",
  "it-IT": "Italian",
  "it-IT-description": "Standard Italian, the language of culture, art and gastronomy.",
  "pt-PT": "Portuguese (Portugal)",
  "pt-PT-description": "European Portuguese, official language of Portugal."
}
```

The English values above are the reference. Each locale file must have equivalent translations.

---

## Modified files in this phase

All 10 locale files:

| File | Change |
|------|--------|
| `messages/en.json` | Add `languages` namespace, update `onboarding`, `nav`, `targetLanguages` |
| `messages/es.json` | Same (translated to Spanish) |
| `messages/fr.json` | Same (translated to French) |
| `messages/de.json` | Same (translated to German) |
| `messages/it.json` | Same (translated to Italian) |
| `messages/pt.json` | Same (translated to Portuguese) |
| `messages/nl.json` | Same (translated to Dutch) |
| `messages/pl.json` | Same (translated to Polish) |
| `messages/ro.json` | Same (translated to Romanian) |
| `messages/ru.json` | Same (translated to Russian) |