import { create } from 'zustand'
import {
  SUPPORTED_TARGET_LANGUAGES,
  getLanguageByCode,
} from '@/lib/target-languages'
import type { TargetLanguage } from '@/lib/target-languages'
import { apiFetch } from '@/lib/api'

export interface UserLanguagePlan {
  id: number
  cefr_level: string | null
  progress_day: number
  total_days: number
  completion_pct: number
}

export interface UserLanguageProgress {
  total_xp: number
  current_streak: number
  lessons_completed: number
}

export interface UserLanguageInfo {
  target_language: string
  is_active: boolean
  plan: UserLanguagePlan | null
  progress: UserLanguageProgress | null
}

interface LanguageStore {
  activeLanguage: TargetLanguage | null
  userLanguages: UserLanguageInfo[]
  supportedLanguages: TargetLanguage[]
  availableLanguageCodes: string[]
  isSwitching: boolean
  fetchLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<boolean>
  addLanguage: (code: string) => Promise<void>
  removeLanguage: (code: string) => Promise<void>
}

function mapUserLanguageInfo(data: Record<string, any>): UserLanguageInfo {
  return {
    target_language: data.target_language,
    is_active: data.is_active,
    plan: data.plan
      ? {
        id: data.plan.id,
        cefr_level: data.plan.cefr_level ?? null,
        progress_day: data.plan.progress_day,
        total_days: data.plan.total_days,
        completion_pct: data.plan.completion_pct,
      }
      : null,
    progress: data.progress
      ? {
        total_xp: data.progress.total_xp,
        current_streak: data.progress.current_streak,
        lessons_completed: data.progress.lessons_completed,
      }
      : null,
  }
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  activeLanguage: null,
  userLanguages: [],
  supportedLanguages: SUPPORTED_TARGET_LANGUAGES,
  availableLanguageCodes: [],
  isSwitching: false,

  fetchLanguages: async () => {
    try {
      const res = await apiFetch('/api/languages')
      if (!res.ok) return
      const data = await res.json()

      const languages: UserLanguageInfo[] = (data.languages || []).map(
        mapUserLanguageInfo
      )

      const active = languages.find((l) => l.is_active)
      const activeLang = active
        ? (getLanguageByCode(active.target_language) ?? null)
        : null

      set({
        userLanguages: languages,
        activeLanguage: activeLang,
        availableLanguageCodes: data.all_supported_languages || [],
      })
    } catch {
      // silently ignore — store stays with current state
    }
  },

  switchLanguage: async (code: string): Promise<boolean> => {
    set({ isSwitching: true })
    try {
      const res = await apiFetch('/api/languages/active', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_language: code }),
      })
      if (!res.ok) return false
      await get().fetchLanguages()
      return true
    } catch {
      return false
    } finally {
      set({ isSwitching: false })
    }
  },

  addLanguage: async (code: string) => {
    try {
      const res = await apiFetch('/api/languages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_language: code }),
      })
      if (!res.ok) return
      await get().fetchLanguages()
    } catch {
      // silently ignore
    }
  },

  removeLanguage: async (code: string) => {
    try {
      const res = await apiFetch(`/api/languages/${encodeURIComponent(code)}`, {
        method: 'DELETE',
      })
      if (!res.ok) return
      await get().fetchLanguages()
    } catch {
      // silently ignore
    }
  },
}))
