import type { CEFRLevel } from '@/data/grammar'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrase'
  | 'conjunction'
  | 'preposition'
  | 'numeral'
  | 'pronoun'

export interface VocabularyEntry {
  word: string
  pos: PartOfSpeech
  definition: string
  example: string
  ipa?: string
  frequency_rank?: number
}

export interface VocabularySet {
  id: string
  level: CEFRLevel
  topic: string
  unit_ref: string
  words: VocabularyEntry[]
}

export const vocabularySets: VocabularySet[] = []

export function getVocabularySet(id: string): VocabularySet | undefined {
  return vocabularySets.find((s) => s.id === id)
}

export function getVocabularySetsForLevel(level: CEFRLevel): VocabularySet[] {
  return vocabularySets.filter((s) => s.level === level)
}

export function getVocabularySetsForUnit(unitRef: string): VocabularySet[] {
  return vocabularySets.filter((s) => s.unit_ref === unitRef)
}
