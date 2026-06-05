export type { CEFRLevel, GrammarCategory } from '@/data/types'

export interface GrammarExample {
  english: string
  translation?: string
  note?: string
}

export interface GrammarMistake {
  wrong: string
  correct: string
  note: string
}

export interface GrammarTopic {
  slug: string
  title: string
  level: string
  category: string
  summary: string
  explanation: string
  structure?: string
  rules: string[]
  examples: GrammarExample[]
  common_mistakes: GrammarMistake[]
  related: string[]
}

import { grammarTopics as enTopics } from './en/grammar'
import { grammarTopics as esTopics } from './es/grammar'
import { grammarTopics as itTopics } from './it/grammar'
import { grammarTopics as ptTopics } from './pt/grammar'

const topicsMap: Record<string, GrammarTopic[]> = {
  en: enTopics,
  es: esTopics,
  it: itTopics,
  pt: ptTopics,
}

export function getGrammarTopics(
  targetLanguage: string = 'en-US'
): GrammarTopic[] {
  const iso = targetLanguage.split('-')[0]
  return topicsMap[iso] ?? enTopics
}

export const grammarTopics = enTopics
