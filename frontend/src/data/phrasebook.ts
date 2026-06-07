export type { CEFRLevel, Register } from '@/data/types'

export interface Phrase {
  english: string
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

import { phrasebookCategories as enCategories } from './en/phrasebook'
import { phrasebookCategories as esCategories } from './es/phrasebook'
import { phrasebookCategories as itCategories } from './it/phrasebook'
import { phrasebookCategories as ptCategories } from './pt/phrasebook'

const categoriesMap: Record<string, PhrasebookCategory[]> = {
  en: enCategories,
  es: esCategories,
  it: itCategories,
  pt: ptCategories,
}

export function getPhrasebookCategories(
  targetLanguage: string = 'en-US'
): PhrasebookCategory[] {
  const iso = targetLanguage.split('-')[0]
  return categoriesMap[iso] ?? enCategories
}

export const phrasebookCategories = enCategories

export function getPhrasebookByLevel(level: string): PhrasebookCategory[] {
  return enCategories.filter((c) => c.level === level)
}

export function getPhrasebookByRegister(
  register: string
): PhrasebookCategory[] {
  return enCategories.filter((c) =>
    c.phrases.some((p) => p.register === register)
  )
}

export function getAllSituations(): string[] {
  return enCategories.map((c) => c.situation)
}
