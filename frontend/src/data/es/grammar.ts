export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarCategory =
  | 'Tenses'
  | 'Verbs'
  | 'Nouns'
  | 'Pronouns'
  | 'Adjectives & Adverbs'
  | 'Prepositions'
  | 'Sentence Structure'
  | 'Advanced'

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
  level: CEFRLevel
  category: GrammarCategory
  summary: string
  explanation: string
  structure?: string
  rules: string[]
  examples: GrammarExample[]
  common_mistakes: GrammarMistake[]
  related: string[]
}

export const grammarTopics: GrammarTopic[] = []
