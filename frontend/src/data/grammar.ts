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

export interface GrammarDrillQuestion {
  index: number
  question: string
  options: string[]
  correct: string
  explanation?: string
}

export interface GrammarDrillSet {
  slug: string
  title: string
  level: string
  questions: GrammarDrillQuestion[]
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

export async function getGrammarDrills(
  slug: string,
  targetLanguage: string = 'en-US',
  limit = 10
): Promise<GrammarDrillSet | null> {
  const res = await apiFetch(
    `/api/grammar/${slug}/drills?language=${encodeURIComponent(
      targetLanguage
    )}&limit=${limit}`
  )
  if (!res.ok) return null
  return (await res.json()) as GrammarDrillSet
}
