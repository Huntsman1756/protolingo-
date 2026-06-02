---
description: "Phase 10.4 spec — Multi-language: frontend core infrastructure (stores, types, language switcher)."
applyTo: "frontend/**"
---

# Phase 10.4 — Frontend: core infrastructure

## Goal

Build the frontend foundation for multi-language: supported language config, Zustand store, sidebar language switcher, and updated API mappers. No new pages yet — those come in Phase 10.5.

**Prerequisite:** Phase 10.3 must be merged and deployed before starting this phase.

---

## 10.4.1 Supported languages configuration

**File:** `frontend/src/lib/target-languages.ts`

```typescript
export interface TargetLanguage {
  code: string      // BCP-47, e.g. "it-IT"
  name: string      // In its own language: "Italiano", "Español"
  nameEn: string    // In English: "Italian", "Spanish"
  flag: string      // Emoji flag: "🇮🇹"
  flagPath: string  // Path under /public/flags/: "/flags/italy.jpeg"
  iso639: string    // ISO 639-1: "it", "es"
}

export const SUPPORTED_TARGET_LANGUAGES: TargetLanguage[] = [
  { code: 'en-US', name: 'English (US)', nameEn: 'English (US)', flag: '🇺🇸', flagPath: '/flags/usa.jpg',      iso639: 'en' },
  { code: 'en-GB', name: 'English (UK)', nameEn: 'English (UK)', flag: '🇬🇧', flagPath: '/flags/uk.jpg',       iso639: 'en' },
  { code: 'es-ES', name: 'Español',      nameEn: 'Spanish',      flag: '🇪🇸', flagPath: '/flags/spain.jpeg',   iso639: 'es' },
  { code: 'it-IT', name: 'Italiano',     nameEn: 'Italian',      flag: '🇮🇹', flagPath: '/flags/italy.jpeg',   iso639: 'it' },
  { code: 'pt-PT', name: 'Português',    nameEn: 'Portuguese',   flag: '🇵🇹', flagPath: '/flags/portugal.jpeg', iso639: 'pt' },
]

export function getLanguageByCode(code: string): TargetLanguage | undefined {
  return SUPPORTED_TARGET_LANGUAGES.find(l => l.code === code)
}
```

---

## 10.4.2 Language store

**File:** `frontend/src/store/language.ts` (new)

A dedicated Zustand store for language state, separate from the auth store to keep concerns isolated:

```typescript
import { create } from 'zustand'
import { TargetLanguage, getLanguageByCode } from '@/lib/target-languages'
import { apiClient } from '@/lib/api-client'

export interface UserLanguageInfo {
  target_language: string
  is_active: boolean
  plan: {
    id: number
    cefr_level: string | null
    progress_day: number
    total_days: number
    completion_pct: number
  } | null
  progress: {
    total_xp: number
    current_streak: number
    lessons_completed: number
  } | null
}

interface LanguageStore {
  activeLanguage: TargetLanguage | null
  userLanguages: UserLanguageInfo[]
  supportedLanguages: TargetLanguage[]
  isSwitching: boolean
  fetchLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<void>
  addLanguage: (code: string) => Promise<void>
  removeLanguage: (code: string) => Promise<void>
}
```

**`fetchLanguages`:** calls `GET /api/languages` and populates `userLanguages` and `activeLanguage`.

**`switchLanguage`:** calls `PUT /api/languages/active`, sets `isSwitching=true` during the request, then calls `fetchLanguages()` and refreshes the current page. Shows a toast: `"Switching to Italian (A2)..."`.

**`addLanguage`:** calls `POST /api/languages`, then `fetchLanguages()`.

**`removeLanguage`:** calls `DELETE /api/languages/{code}`, then `fetchLanguages()`.

`supportedLanguages` is always the static `SUPPORTED_TARGET_LANGUAGES` list — no API call needed.

---

## 10.4.3 Language Switcher in sidebar

**Component:** `frontend/src/components/LanguageSwitcher.tsx`

```tsx
// Behaviour:
// - Shows the flag emoji + name of the active language
// - If only 1 language: no dropdown, just an indicator (no chevron)
// - If 2+ languages: dropdown listing all user languages
// - On switch: calls switchLanguage() from the language store
// - Confirmation toast during switch
// - Loading spinner while isSwitching=true
```

Visual design:
- Compact button: flag + name (`🇮🇹 Italiano`) + chevron icon.
- Style: `text-fl-muted hover:text-fl-fg` with subtle hover background.
- Dropdown: each item shows flag + name + CEFR level badge. Active language has a checkmark.

**File:** `frontend/src/app/(app)/layout.tsx`

Add `<LanguageSwitcher />` at the top of the sidebar, below the app logo/name and before the navigation items. The component calls `fetchLanguages()` on mount if `userLanguages` is empty.

---

## 10.4.4 Updated mappers

**File:** `frontend/src/lib/mappers.ts`

Add a mapper for `UserLanguageInfo` from the API response to the frontend type, including the plan summary and progress data.

---

## 10.4.5 i18n keys (add in this phase)

**Files:** all 10 locale files under `messages/`

Add to the existing `nav` namespace:

```json
"nav": {
  "switchLanguage": "Switch language"
}
```

The English value above is the reference. Add the equivalent translation in each locale file.

---

## New files in this phase

| File | Type |
|------|------|
| `frontend/src/lib/target-languages.ts` | Language config and helpers |
| `frontend/src/store/language.ts` | Zustand language store |
| `frontend/src/components/LanguageSwitcher.tsx` | Sidebar switcher component |

## Modified files in this phase

| File | Change |
|------|--------|
| `frontend/src/app/(app)/layout.tsx` | Add `LanguageSwitcher` to sidebar |
| `frontend/src/lib/mappers.ts` | Add `UserLanguageInfo` mapper |
| `messages/*.json` (all 10) | Add `nav.switchLanguage` |