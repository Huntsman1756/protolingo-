import type { CEFRLevel } from '@/data/grammar'

export type Register = 'formal' | 'neutral' | 'informal'

export interface Phrase {
  english: string
  context: string
  register: Register
  unit_ref?: string
}

export interface PhrasebookCategory {
  id: string
  level: CEFRLevel
  situation: string
  icon: string
  phrases: Phrase[]
}

export const phrasebookCategories: PhrasebookCategory[] = []

export function getPhrasebookByLevel(level: CEFRLevel): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) => c.level === level)
}

export function getPhrasebookByRegister(
  register: Register
): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) =>
    c.phrases.some((p) => p.register === register)
  )
}

export function getAllSituations(): string[] {
  return phrasebookCategories.map((c) => c.situation)
}
