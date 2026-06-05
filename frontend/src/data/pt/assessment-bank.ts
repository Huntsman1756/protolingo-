import type { CEFRLevel } from '@/data/grammar'

export type Skill = 'grammar' | 'vocabulary' | 'reading'

export interface AssessmentQuestion {
  id: string
  skill: Skill
  difficulty: CEFRLevel
  question: string
  options: string[]
  correct: string
  grammar_slug?: string
}

export const assessmentBank: AssessmentQuestion[] = []

export function pickNextQuestion(
  usedIds: Set<string>,
  currentLevel: CEFRLevel,
  preferSkill?: Skill
): AssessmentQuestion | null {
  const available = assessmentBank.filter(
    (q) => !usedIds.has(q.id) && q.difficulty === currentLevel
  )
  if (available.length === 0) return null

  if (preferSkill) {
    const bySkill = available.filter((q) => q.skill === preferSkill)
    if (bySkill.length > 0)
      return bySkill[Math.floor(Math.random() * bySkill.length)]
  }

  return available[Math.floor(Math.random() * available.length)]
}

export function adjustLevel(
  current: CEFRLevel,
  direction: 'up' | 'down'
): CEFRLevel {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  const idx = levels.indexOf(current)
  if (direction === 'up' && idx < levels.length - 1) return levels[idx + 1]
  if (direction === 'down' && idx > 0) return levels[idx - 1]
  return current
}
