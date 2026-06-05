import type { CEFRLevel } from '@/data/grammar'

export type LessonType =
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'review'

export type Intensity = 'intensive' | 'standard' | 'relaxed' | 'very_relaxed'

export interface IntensityConfig {
  label: string
  description: string
  weeks: number
  days_per_week: number
  recommended?: boolean
}

export interface CurriculumUnit {
  id: string
  level: CEFRLevel
  unit_number: number
  title: string
  default_weeks: [number, number]
  grammar_points: string[]
  vocabulary_set_ids: string[]
  lesson_types: LessonType[]
  prerequisite_unit?: string
  competency_checklist: string[]
}

export interface LevelCurriculum {
  level: CEFRLevel
  title: string
  description: string
  default_duration_weeks: number
  units: CurriculumUnit[]
}

export const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const INTENSITY_OPTIONS: Record<Intensity, IntensityConfig> = {
  intensive: {
    label: 'Intensive',
    description: '6 days per week, complete in 4 weeks',
    weeks: 4,
    days_per_week: 6,
  },
  standard: {
    label: 'Standard',
    description: '4 days per week, complete in 8 weeks',
    weeks: 8,
    days_per_week: 4,
    recommended: true,
  },
  relaxed: {
    label: 'Relaxed',
    description: '3 days per week, complete in 16 weeks',
    weeks: 16,
    days_per_week: 3,
  },
  very_relaxed: {
    label: 'Very Relaxed',
    description: '2 days per week, complete in 24 weeks',
    weeks: 24,
    days_per_week: 2,
  },
}

export const curriculum: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner Spanish',
    description:
      'Greetings, introductions, basic grammar and everyday vocabulary.',
    default_duration_weeks: 8,
    units: [],
  },
  A2: {
    level: 'A2',
    title: 'Elementary Spanish',
    description:
      'Past tenses, object pronouns, comparisons and basic conversation.',
    default_duration_weeks: 8,
    units: [],
  },
  B1: {
    level: 'B1',
    title: 'Intermediate Spanish',
    description:
      'Subjunctive mood, compound tenses, relative clauses and opinion expression.',
    default_duration_weeks: 8,
    units: [],
  },
  B2: {
    level: 'B2',
    title: 'Upper Intermediate Spanish',
    description:
      'Advanced subjunctive, idiomatic expressions, argumentation and media.',
    default_duration_weeks: 8,
    units: [],
  },
  C1: {
    level: 'C1',
    title: 'Advanced Spanish',
    description:
      'Specialised vocabulary, formal register, regional varieties and rhetoric.',
    default_duration_weeks: 8,
    units: [],
  },
  C2: {
    level: 'C2',
    title: 'Proficient Spanish',
    description: 'Mastery, literary style, translation and cultural depth.',
    default_duration_weeks: 6,
    units: [],
  },
}

export function getCurriculumUnits(level: CEFRLevel): CurriculumUnit[] {
  return curriculum[level]?.units ?? []
}

export function distributeLessonsAcrossWeeks(
  level: CEFRLevel,
  durationWeeks: number,
  daysPerWeek: number
) {
  const levelData = curriculum[level]
  if (!levelData) return []
  const units = levelData.units
  if (units.length === 0) return []

  const totalSlots = durationWeeks * daysPerWeek
  const lessonSlots = Math.max(1, totalSlots - 1)
  const slots: Array<{
    week: number
    day: number
    unit_id: string
    unit_title: string
    lesson_type: LessonType
    title: string
    objectives: string[]
    estimated_minutes: number
    grammar_points: string[]
    vocabulary_set_ids: string[]
  }> = []

  let unitIndex = 0
  let typeIndex = 0

  for (let slot = 0; slot < lessonSlots; slot++) {
    const unit = units[Math.min(unitIndex, units.length - 1)]
    const ltList = unit.lesson_types
    const lt =
      ltList.length > 0
        ? ltList[typeIndex % ltList.length]
        : ('grammar' as LessonType)

    slots.push({
      week: Math.floor(slot / daysPerWeek) + 1,
      day: (slot % daysPerWeek) + 1,
      unit_id: unit.id,
      unit_title: unit.title,
      lesson_type: lt,
      title: `${unit.title} - Lesson ${typeIndex + 1}`,
      objectives: unit.competency_checklist.slice(0, 2),
      estimated_minutes: 25,
      grammar_points: unit.grammar_points.slice(0, 2),
      vocabulary_set_ids: unit.vocabulary_set_ids.slice(0, 1),
    })

    typeIndex++
    if (typeIndex % ltList.length === 0 && unitIndex < units.length - 1) {
      const remainingSlots = lessonSlots - slot - 1
      const remainingUnits = units.length - unitIndex - 1
      if (
        remainingSlots <=
        remainingUnits * units[unitIndex + 1].lesson_types.length
      ) {
        unitIndex++
      }
    }
  }

  const lastUnit = units[units.length - 1]
  slots.push({
    week: durationWeeks,
    day: daysPerWeek,
    unit_id: 'completion-test',
    unit_title: `Level ${level} Completion Test`,
    lesson_type: 'review',
    title: `Level ${level} Completion Test`,
    objectives: [
      'Review all grammar topics from this level',
      'Complete the assessment to unlock the next level',
    ],
    estimated_minutes: 45,
    grammar_points: lastUnit.grammar_points,
    vocabulary_set_ids: [],
  })

  return slots
}
