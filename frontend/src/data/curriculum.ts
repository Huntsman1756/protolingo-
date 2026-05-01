/**
 * Canonical curriculum for FreeLingo.
 *
 * This is the authoritative learning tree. The LLM never designs the sequence —
 * it only generates lesson *content* within each unit. The plan generator reads
 * this file and maps units onto the user's chosen duration/intensity.
 *
 * Intensity → duration mapping:
 *   intensive   (4 wks,  5 days/wk, ~20 lessons)
 *   standard    (8 wks,  5 days/wk, ~40 lessons)
 *   relaxed     (12 wks, 4 days/wk, ~48 lessons)  ← DEFAULT
 *   very_relaxed(16 wks, 3 days/wk, ~48 lessons)
 */

import type { CEFRLevel } from './grammar'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LessonType = 'grammar' | 'vocabulary' | 'reading' | 'writing' | 'review'

export type Intensity = 'intensive' | 'standard' | 'relaxed' | 'very_relaxed'

export interface IntensityConfig {
  label: string
  description: string
  weeks: number
  days_per_week: number
  recommended?: boolean
}

export interface CurriculumUnit {
  /** Unique identifier, e.g. "a1-unit-3" */
  id: string
  level: CEFRLevel
  unit_number: number
  title: string
  /** Suggested week range within a 12-week plan, e.g. [3, 4] */
  default_weeks: [number, number]
  /** Grammar slugs from grammar.ts that this unit covers */
  grammar_points: string[]
  /** Vocabulary set ids from vocabulary.ts that this unit uses */
  vocabulary_set_ids: string[]
  /** Lesson types to generate — order matters (grammar first, then practice) */
  lesson_types: LessonType[]
  /** Id of the unit that must be completed before this one */
  prerequisite_unit?: string
  /** Human-readable list of what the student should be able to do after this unit */
  competency_checklist: string[]
}

export interface LevelCurriculum {
  level: CEFRLevel
  title: string
  description: string
  default_duration_weeks: number
  units: CurriculumUnit[]
}

// ─── Intensity options ────────────────────────────────────────────────────────

export const INTENSITY_OPTIONS: Record<Intensity, IntensityConfig> = {
  intensive: {
    label: 'Intensive',
    description: '~20 lessons · 5 days/week',
    weeks: 4,
    days_per_week: 5,
  },
  standard: {
    label: 'Standard',
    description: '~40 lessons · 5 days/week',
    weeks: 8,
    days_per_week: 5,
  },
  relaxed: {
    label: 'Relaxed',
    description: '~48 lessons · 4 days/week',
    weeks: 12,
    days_per_week: 4,
    recommended: true,
  },
  very_relaxed: {
    label: 'Very relaxed',
    description: '~48 lessons · 3 days/week',
    weeks: 16,
    days_per_week: 3,
  },
}

// ─── A1 Curriculum — 12 weeks, 8 units ───────────────────────────────────────
//
// Target: ~600 high-frequency words (Oxford 5000, ranks 1–600)
// Grammar: present simple, to be, articles, yes/no questions, pronouns,
//          present continuous, past simple (regular), can/can't
//
// Each unit has 5 lesson slots: grammar + vocabulary + reading + writing + review
// 8 units × 5 lessons = 40 lessons core; spread across chosen intensity.

const A1_UNITS: CurriculumUnit[] = [
  {
    id: 'a1-unit-1',
    level: 'A1',
    unit_number: 1,
    title: 'Identity & Greetings',
    default_weeks: [1, 2],
    grammar_points: ['to-be', 'subject-pronouns'],
    vocabulary_set_ids: ['identity_a1', 'greetings_a1', 'numbers_1_20_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Correctly uses am / is / are in affirmative sentences',
      'Correctly uses am not / isn\'t / aren\'t in negatives',
      'Asks and answers "What is your name?" and "Where are you from?"',
      'Uses I, you, he, she, it, we, they as subjects',
      'Counts and writes numbers 1–20',
    ],
  },
  {
    id: 'a1-unit-2',
    level: 'A1',
    unit_number: 2,
    title: 'My World',
    default_weeks: [2, 3],
    grammar_points: ['articles', 'possessive-adjectives'],
    vocabulary_set_ids: ['family_a1', 'colours_a1', 'adjectives_basic_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-1',
    competency_checklist: [
      'Correctly chooses a / an before singular nouns',
      'Uses "the" for specific or known nouns',
      'Omits article for general plural statements',
      'Uses my, your, his, her, our, their correctly',
      'Describes family members using adjectives (tall, young, friendly)',
    ],
  },
  {
    id: 'a1-unit-3',
    level: 'A1',
    unit_number: 3,
    title: 'Daily Life',
    default_weeks: [3, 5],
    grammar_points: ['present-simple', 'questions-yes-no'],
    vocabulary_set_ids: ['daily_routines_a1', 'time_expressions_a1', 'verbs_basic_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-2',
    competency_checklist: [
      'Uses present simple for habits and routines',
      'Adds -s / -es correctly for he/she/it',
      'Forms negatives with don\'t / doesn\'t',
      'Asks yes/no questions with Do / Does',
      'Tells the time and uses frequency adverbs (always, often, never)',
    ],
  },
  {
    id: 'a1-unit-4',
    level: 'A1',
    unit_number: 4,
    title: 'Places & Location',
    default_weeks: [5, 6],
    grammar_points: ['there-is-are', 'prepositions-place'],
    vocabulary_set_ids: ['home_a1', 'city_places_a1', 'prepositions_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-3',
    competency_checklist: [
      'Uses "there is / there are" to describe what exists in a place',
      'Uses "there isn\'t / there aren\'t" correctly',
      'Describes location with in, on, at, next to, behind, in front of',
      'Describes a room or neighbourhood using vocabulary from the set',
    ],
  },
  {
    id: 'a1-unit-5',
    level: 'A1',
    unit_number: 5,
    title: 'Actions Right Now',
    default_weeks: [6, 7],
    grammar_points: ['present-continuous'],
    vocabulary_set_ids: ['action_verbs_a1', 'clothes_a1', 'sports_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-4',
    competency_checklist: [
      'Correctly forms am/is/are + verb-ing',
      'Distinguishes present simple (habits) from present continuous (now)',
      'Does not use stative verbs (know, like, want) in continuous form',
      'Describes what people are doing using action verbs and clothes vocabulary',
    ],
  },
  {
    id: 'a1-unit-6',
    level: 'A1',
    unit_number: 6,
    title: 'Yesterday',
    default_weeks: [7, 9],
    grammar_points: ['past-simple'],
    vocabulary_set_ids: ['past_time_expressions_a1', 'regular_verbs_past_a1', 'irregular_verbs_basic_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-5',
    competency_checklist: [
      'Adds -ed to regular verbs in the past (worked, played, visited)',
      'Uses common irregular past forms (went, said, had, came, saw)',
      'Forms past negative with didn\'t + base verb',
      'Asks past questions with Did + subject + base verb?',
      'Uses yesterday, last week, in 2020 correctly',
    ],
  },
  {
    id: 'a1-unit-7',
    level: 'A1',
    unit_number: 7,
    title: 'Abilities & Wishes',
    default_weeks: [9, 10],
    grammar_points: ['can-cant'],
    vocabulary_set_ids: ['abilities_a1', 'free_time_a1', 'food_drinks_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-6',
    competency_checklist: [
      'Uses can / can\'t to express ability',
      'Never adds -s to can for third person',
      'Uses want to / need to / like to + infinitive',
      'Talks about hobbies and food preferences using can / like',
    ],
  },
  {
    id: 'a1-unit-8',
    level: 'A1',
    unit_number: 8,
    title: 'A1 Consolidation',
    default_weeks: [11, 12],
    grammar_points: [
      'to-be', 'subject-pronouns', 'articles', 'possessive-adjectives',
      'present-simple', 'questions-yes-no', 'present-continuous',
      'past-simple', 'can-cant',
    ],
    vocabulary_set_ids: [
      'identity_a1', 'daily_routines_a1', 'home_a1', 'city_places_a1',
      'action_verbs_a1', 'regular_verbs_past_a1', 'abilities_a1',
    ],
    lesson_types: ['reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-7',
    competency_checklist: [
      'Reads and understands a short text (100–150 words) about daily life',
      'Writes a short paragraph (60–80 words) about themselves or their routine',
      'Correctly uses all A1 grammar in a continuous writing task',
      'Demonstrates vocabulary range across all A1 sets in a conversation',
    ],
  },
]

// ─── A2 Curriculum — skeleton (12 weeks, 8 units) ────────────────────────────
//
// Target vocabulary: Oxford 5000 ranks ~600–1200 (~600 new words)
// Grammar: past simple (irregular full set), present continuous (future plans),
//          comparatives/superlatives, can → could, future (will/going to),
//          prepositions of time, adverbs of manner, countable/uncountable nouns

const A2_UNITS: CurriculumUnit[] = [
  {
    id: 'a2-unit-1',
    level: 'A2',
    unit_number: 1,
    title: 'The Recent Past',
    default_weeks: [1, 2],
    grammar_points: ['past-simple'],
    vocabulary_set_ids: ['irregular_verbs_a2', 'past_time_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Uses 40+ common irregular past forms correctly',
      'Narrates a sequence of past events in a short paragraph',
      'Asks past questions using Did, Where did, When did',
    ],
  },
  {
    id: 'a2-unit-2',
    level: 'A2',
    unit_number: 2,
    title: 'Plans & Future',
    default_weeks: [2, 3],
    grammar_points: ['going-to-future', 'will-future'],
    vocabulary_set_ids: ['future_plans_a2', 'weather_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-1',
    competency_checklist: [
      'Distinguishes going to (planned intention) from will (spontaneous decision)',
      'Makes predictions about the weather using will',
      'Describes personal plans for the week using going to',
    ],
  },
  {
    id: 'a2-unit-3',
    level: 'A2',
    unit_number: 3,
    title: 'Comparisons',
    default_weeks: [3, 4],
    grammar_points: ['comparatives-superlatives'],
    vocabulary_set_ids: ['adjectives_a2', 'cities_countries_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-2',
    competency_checklist: [
      'Forms comparatives correctly (-er / more)',
      'Forms superlatives correctly (-est / most)',
      'Handles irregular forms: good → better → best, bad → worse → worst',
      'Compares cities, people, or objects in a short text',
    ],
  },
  {
    id: 'a2-unit-4',
    level: 'A2',
    unit_number: 4,
    title: 'Ability & Permission',
    default_weeks: [5, 6],
    grammar_points: ['can-cant', 'could-past-ability'],
    vocabulary_set_ids: ['abilities_sports_a2', 'school_work_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-3',
    competency_checklist: [
      'Uses could / couldn\'t for past ability',
      'Uses can / could for polite requests',
      'Distinguishes can (present) from could (past or polite)',
    ],
  },
  {
    id: 'a2-unit-5',
    level: 'A2',
    unit_number: 5,
    title: 'Quantity & Shopping',
    default_weeks: [6, 7],
    grammar_points: ['countable-uncountable', 'some-any-much-many'],
    vocabulary_set_ids: ['food_shopping_a2', 'money_prices_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-4',
    competency_checklist: [
      'Distinguishes countable and uncountable nouns',
      'Uses some / any / a lot of / much / many correctly',
      'Asks "How much is...?" and "How many...are there?"',
      'Reads a shopping list and writes a short dialogue at a shop',
    ],
  },
  {
    id: 'a2-unit-6',
    level: 'A2',
    unit_number: 6,
    title: 'Health & Body',
    default_weeks: [7, 8],
    grammar_points: ['modal-verbs', 'imperatives'],
    vocabulary_set_ids: ['body_health_a2', 'symptoms_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-5',
    competency_checklist: [
      'Uses should / shouldn\'t for advice',
      'Uses must / mustn\'t for obligation and prohibition',
      'Describes symptoms and gives health advice in a dialogue',
    ],
  },
  {
    id: 'a2-unit-7',
    level: 'A2',
    unit_number: 7,
    title: 'Travel & Transport',
    default_weeks: [9, 10],
    grammar_points: ['prepositions-time', 'adverbs-manner'],
    vocabulary_set_ids: ['transport_a2', 'travel_a2', 'directions_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-6',
    competency_checklist: [
      'Uses at, on, in for time expressions (at 3pm, on Monday, in June)',
      'Uses adverbs of manner correctly (quickly, carefully, loudly)',
      'Gives and follows directions using transport vocabulary',
    ],
  },
  {
    id: 'a2-unit-8',
    level: 'A2',
    unit_number: 8,
    title: 'A2 Consolidation',
    default_weeks: [11, 12],
    grammar_points: [
      'past-simple', 'going-to-future', 'will-future',
      'comparatives-superlatives', 'countable-uncountable', 'modal-verbs',
    ],
    vocabulary_set_ids: [
      'irregular_verbs_a2', 'adjectives_a2', 'food_shopping_a2',
      'transport_a2', 'body_health_a2',
    ],
    lesson_types: ['reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-7',
    competency_checklist: [
      'Reads and understands a text (150–200 words) on a familiar topic',
      'Writes a short email or message (80–100 words) using past and future tenses',
      'Demonstrates all A2 grammar in a mixed-tense writing task',
    ],
  },
]

// ─── B1 skeleton (units titles only — grammar and vocabulary sets TBD) ───────
//
// Focus: present perfect, first conditional, passive voice, relative clauses,
//        modal verbs, reported speech basics, expressing opinions

const B1_UNITS: CurriculumUnit[] = [
  { id: 'b1-unit-1', level: 'B1', unit_number: 1, title: 'Experiences (Present Perfect)', default_weeks: [1, 2], grammar_points: ['present-perfect'], vocabulary_set_ids: ['experiences_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], competency_checklist: ['Uses ever/never, already/yet, just correctly', 'Distinguishes present perfect from past simple'] },
  { id: 'b1-unit-2', level: 'B1', unit_number: 2, title: 'If… (First Conditional)', default_weeks: [2, 3], grammar_points: ['first-conditional', 'zero-conditional'], vocabulary_set_ids: ['environment_b1', 'decisions_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-1', competency_checklist: ['Forms first conditional without "will" in the if-clause', 'Uses zero conditional for facts and general truths'] },
  { id: 'b1-unit-3', level: 'B1', unit_number: 3, title: 'It Gets Done (Passive)', default_weeks: [3, 5], grammar_points: ['passive-voice-simple'], vocabulary_set_ids: ['processes_b1', 'media_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-2', competency_checklist: ['Forms present and past passive correctly', 'Chooses between active and passive appropriately'] },
  { id: 'b1-unit-4', level: 'B1', unit_number: 4, title: 'Describing in Detail (Relative Clauses)', default_weeks: [5, 6], grammar_points: ['relative-clauses'], vocabulary_set_ids: ['descriptions_b1', 'technology_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-3', competency_checklist: ['Uses who/which/that correctly in defining relative clauses', 'Uses commas appropriately in non-defining clauses'] },
  { id: 'b1-unit-5', level: 'B1', unit_number: 5, title: 'Advice & Obligation (Modals)', default_weeks: [6, 7], grammar_points: ['modal-verbs'], vocabulary_set_ids: ['work_obligations_b1', 'advice_phrases_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-4', competency_checklist: ['Uses must/should/could/might with appropriate strength', 'Forms past modals: should have, could have, might have'] },
  { id: 'b1-unit-6', level: 'B1', unit_number: 6, title: 'What They Said (Reported Speech)', default_weeks: [7, 9], grammar_points: ['reported-speech-basics'], vocabulary_set_ids: ['news_media_b1', 'communication_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-5', competency_checklist: ['Applies tense backshift in reported statements', 'Reports questions using if/whether and normal word order'] },
  { id: 'b1-unit-7', level: 'B1', unit_number: 7, title: 'Opinions & Discussion', default_weeks: [9, 10], grammar_points: ['expressing-opinions', 'discourse-connectors-b1'], vocabulary_set_ids: ['opinion_phrases_b1', 'society_b1'], lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-6', competency_checklist: ['Uses I think / In my opinion / I believe correctly', 'Connects ideas with however, although, because of, despite'] },
  { id: 'b1-unit-8', level: 'B1', unit_number: 8, title: 'B1 Consolidation', default_weeks: [11, 12], grammar_points: ['present-perfect', 'first-conditional', 'passive-voice-simple', 'relative-clauses', 'modal-verbs'], vocabulary_set_ids: ['experiences_b1', 'environment_b1', 'technology_b1'], lesson_types: ['reading', 'writing', 'review'], prerequisite_unit: 'b1-unit-7', competency_checklist: ['Writes a structured opinion essay (150 words)', 'Demonstrates B1 range in a formal email task'] },
]

// ─── Full curriculum map ──────────────────────────────────────────────────────

export const curriculum: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner English',
    description: 'Master the foundations: introduce yourself, describe your world, talk about routines and the past.',
    default_duration_weeks: 12,
    units: A1_UNITS,
  },
  A2: {
    level: 'A2',
    title: 'Elementary English',
    description: 'Expand into comparisons, future plans, quantities, and everyday social situations.',
    default_duration_weeks: 12,
    units: A2_UNITS,
  },
  B1: {
    level: 'B1',
    title: 'Intermediate English',
    description: 'Handle most familiar topics: give opinions, discuss experiences, write structured texts.',
    default_duration_weeks: 12,
    units: B1_UNITS,
  },
  // B2, C1, C2 units to be populated in subsequent sprints
  B2: { level: 'B2', title: 'Upper-Intermediate English', description: 'Express nuance, handle complex grammar, discuss abstract topics.', default_duration_weeks: 12, units: [] },
  C1: { level: 'C1', title: 'Advanced English', description: 'Write sophisticated texts, understand implicit meaning, use inversion and cleft sentences.', default_duration_weeks: 12, units: [] },
  C2: { level: 'C2', title: 'Proficiency English', description: 'Near-native mastery: discourse markers, nominalisation, academic and professional writing.', default_duration_weeks: 12, units: [] },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns all units for a given level in order. */
export function getCurriculumUnits(level: CEFRLevel): CurriculumUnit[] {
  return curriculum[level].units
}

/**
 * Given a level, duration in weeks, and days per week, returns a flat array
 * of lesson slots suitable for building a StudyPlan.
 */
export function distributeLessonsAcrossWeeks(
  level: CEFRLevel,
  durationWeeks: number,
  daysPerWeek: number,
): Array<{ week: number; day: number; unit_id: string; lesson_type: LessonType; title: string }> {
  const units = getCurriculumUnits(level)
  const slots: Array<{ week: number; day: number; unit_id: string; lesson_type: LessonType; title: string }> = []

  const totalDays = durationWeeks * daysPerWeek
  // Last day is reserved for the level completion test
  const lessonDays = totalDays - 1

  // Expand all unit lessons in order
  const allLessons = units.flatMap((unit) =>
    unit.lesson_types.map((lt) => ({ unit_id: unit.id, lesson_type: lt, unit_title: unit.title })),
  )

  // Distribute evenly; repeat review lessons if there is spare capacity
  const base = allLessons.slice(0, lessonDays)

  let dayCounter = 0
  for (const lesson of base) {
    const weekNum = Math.floor(dayCounter / daysPerWeek) + 1
    const dayNum = (dayCounter % daysPerWeek) + 1
    slots.push({
      week: weekNum,
      day: dayNum,
      unit_id: lesson.unit_id,
      lesson_type: lesson.lesson_type,
      title: `${lesson.unit_title} — ${lesson.lesson_type.charAt(0).toUpperCase() + lesson.lesson_type.slice(1)}`,
    })
    dayCounter++
  }

  // Final slot: level completion test
  const testWeek = durationWeeks
  const testDay = daysPerWeek + 1
  slots.push({ week: testWeek, day: testDay, unit_id: `${level.toLowerCase()}-test`, lesson_type: 'review', title: `${level} Level Completion Test` })

  return slots
}
