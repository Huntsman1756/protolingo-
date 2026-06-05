export type { CEFRLevel } from '@/data/types'

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
  level: string
  topic: string
  unit_ref: string
  words: VocabularyEntry[]
}

import { vocabularySets as enSets } from './en/vocabulary'
import { vocabularySets as esSets } from './es/vocabulary'
import { vocabularySets as itSets } from './it/vocabulary'
import { vocabularySets as ptSets } from './pt/vocabulary'

const setsMap: Record<string, VocabularySet[]> = {
  en: enSets,
  es: esSets,
  it: itSets,
  pt: ptSets,
}

export function getVocabularySets(
  targetLanguage: string = 'en-US'
): VocabularySet[] {
  const iso = targetLanguage.split('-')[0]
  return setsMap[iso] ?? enSets
}

export const vocabularySets = enSets

export function getVocabularySet(id: string): VocabularySet | undefined {
  return enSets.find((s) => s.id === id)
}

export function getVocabularySetsForLevel(level: string): VocabularySet[] {
  return enSets.filter((s) => s.level === level)
}

export function getVocabularySetsForUnit(unitRef: string): VocabularySet[] {
  return enSets.filter((s) => s.unit_ref === unitRef)
}
