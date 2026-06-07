export type { CEFRLevel } from '@/data/grammar'

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
  level: string
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
  level: string
  title: string
  description: string
  default_duration_weeks: number
  units: CurriculumUnit[]
}

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

import { curriculum as enCurriculum } from './en/curriculum'
import { curriculum as esCurriculum } from './es/curriculum'
import { curriculum as itCurriculum } from './it/curriculum'
import { curriculum as ptCurriculum } from './pt/curriculum'

import { INTENSITY_OPTIONS as enIntensity } from './en/curriculum'

export const INTENSITY_OPTIONS = enIntensity

const curriculumMap: Record<string, Record<string, LevelCurriculum>> = {
  en: enCurriculum,
  es: esCurriculum,
  it: itCurriculum,
  pt: ptCurriculum,
}

export function getCurriculum(
  targetLanguage: string
): Record<string, LevelCurriculum> {
  const iso = targetLanguage.split('-')[0]
  return curriculumMap[iso] ?? enCurriculum
}

export function getCurriculumUnits(
  level: string,
  targetLanguage: string = 'en-US'
): CurriculumUnit[] {
  const c = getCurriculum(targetLanguage)
  return c[level]?.units ?? []
}

export { enCurriculum as curriculum }

// Re-export for backward compatibility
export { distributeLessonsAcrossWeeks } from './en/curriculum'
