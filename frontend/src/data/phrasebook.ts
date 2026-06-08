export type { CEFRLevel, Register } from '@/data/types'

import { apiFetch } from '@/lib/api'

export interface Phrase {
  text: string
  context: string
  register: string
  unit_ref?: string
}

export interface PhrasebookCategory {
  id: string
  level: string
  situation: string
  icon: string
  phrases: Phrase[]
}

export async function getPhrasebookCategories(
  targetLanguage: string = 'en-US'
): Promise<PhrasebookCategory[]> {
  const res = await apiFetch(
    `/api/phrasebook?language=${encodeURIComponent(targetLanguage)}`
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.categories ?? []
}

export async function getPhrasebookByLevel(
  level: string,
  targetLanguage: string = 'en-US'
): Promise<PhrasebookCategory[]> {
  const res = await apiFetch(
    `/api/phrasebook/level/${encodeURIComponent(level)}?language=${encodeURIComponent(targetLanguage)}`
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.categories ?? []
}
