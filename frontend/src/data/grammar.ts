export type { CEFRLevel, GrammarCategory } from '@/data/types'

import { apiFetch } from '@/lib/api'

export interface GrammarExample {
  text: string
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

export async function getGrammarTopics(
  targetLanguage: string = 'en-US'
): Promise<GrammarTopic[]> {
  const res = await apiFetch(
    `/api/grammar?language=${encodeURIComponent(targetLanguage)}`
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.topics ?? []
}
