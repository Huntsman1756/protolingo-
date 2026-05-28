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
export type { CEFRLevel }

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── CEFR level order ────────────────────────────────────────────────────────

export const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

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
      "Correctly uses am not / isn't / aren't in negatives",
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
    vocabulary_set_ids: [
      'daily_routines_a1',
      'time_expressions_a1',
      'verbs_basic_a1',
    ],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-2',
    competency_checklist: [
      'Uses present simple for habits and routines',
      'Adds -s / -es correctly for he/she/it',
      "Forms negatives with don't / doesn't",
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
    vocabulary_set_ids: [
      'past_time_expressions_a1',
      'regular_verbs_past_a1',
      'irregular_verbs_basic_a1',
    ],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-5',
    competency_checklist: [
      'Adds -ed to regular verbs in the past (worked, played, visited)',
      'Uses common irregular past forms (went, said, had, came, saw)',
      "Forms past negative with didn't + base verb",
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
      "Uses can / can't to express ability",
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
      'to-be',
      'subject-pronouns',
      'articles',
      'possessive-adjectives',
      'present-simple',
      'questions-yes-no',
      'present-continuous',
      'past-simple',
      'can-cant',
    ],
    vocabulary_set_ids: [
      'identity_a1',
      'daily_routines_a1',
      'home_a1',
      'city_places_a1',
      'action_verbs_a1',
      'regular_verbs_past_a1',
      'abilities_a1',
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
      "Uses could / couldn't for past ability",
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
      "Uses should / shouldn't for advice",
      "Uses must / mustn't for obligation and prohibition",
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
      'past-simple',
      'going-to-future',
      'will-future',
      'comparatives-superlatives',
      'countable-uncountable',
      'modal-verbs',
    ],
    vocabulary_set_ids: [
      'irregular_verbs_a2',
      'adjectives_a2',
      'food_shopping_a2',
      'transport_a2',
      'body_health_a2',
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
  {
    id: 'b1-unit-1',
    level: 'B1',
    unit_number: 1,
    title: 'Experiences (Present Perfect)',
    default_weeks: [1, 2],
    grammar_points: ['present-perfect'],
    vocabulary_set_ids: ['experiences_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Uses ever/never, already/yet, just correctly',
      'Distinguishes present perfect from past simple',
      'Correctly uses "for" (duration) and "since" (starting point)',
      'Does not use present perfect with specific past time markers (yesterday, in 2020)',
      'Describes personal experiences using a range of past participles',
    ],
  },
  {
    id: 'b1-unit-2',
    level: 'B1',
    unit_number: 2,
    title: 'If... (First Conditional)',
    default_weeks: [2, 3],
    grammar_points: ['first-conditional', 'zero-conditional'],
    vocabulary_set_ids: ['environment_b1', 'decisions_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-1',
    competency_checklist: [
      'Forms first conditional without "will" in the if-clause',
      'Uses zero conditional for facts and general truths',
      'Can substitute "might/could" in the main clause for possibility',
      'Reverses clause order without changing meaning',
      'Uses environment vocabulary to discuss real consequences',
    ],
  },
  {
    id: 'b1-unit-3',
    level: 'B1',
    unit_number: 3,
    title: 'It Gets Done (Passive)',
    default_weeks: [3, 5],
    grammar_points: ['passive-voice-simple'],
    vocabulary_set_ids: ['processes_b1', 'media_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-2',
    competency_checklist: [
      'Forms present and past passive correctly',
      'Chooses between active and passive appropriately',
      'Omits the agent when unknown or obvious',
      'Describes industrial or media processes using the passive',
      'Does not use intransitive verbs (arrive, sleep) in passive form',
    ],
  },
  {
    id: 'b1-unit-4',
    level: 'B1',
    unit_number: 4,
    title: 'Describing in Detail (Relative Clauses)',
    default_weeks: [5, 6],
    grammar_points: ['relative-clauses'],
    vocabulary_set_ids: ['descriptions_b1', 'technology_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-3',
    competency_checklist: [
      'Uses who/which/that correctly in defining relative clauses',
      'Uses commas appropriately in non-defining clauses',
      'Uses "whose" for possession in relative clauses',
      'Omits the relative pronoun when it is the object of the clause',
      'Writes extended descriptions of objects and people using relative clauses',
    ],
  },
  {
    id: 'b1-unit-5',
    level: 'B1',
    unit_number: 5,
    title: 'Advice & Obligation (Modals)',
    default_weeks: [6, 7],
    grammar_points: ['modal-verbs'],
    vocabulary_set_ids: ['work_obligations_b1', 'advice_phrases_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-4',
    competency_checklist: [
      'Uses must/should/could/might with appropriate strength',
      'Forms past modals: should have, could have, might have',
      'Distinguishes must (obligation) from should (advice)',
      'Uses modal verbs without adding -s or "to"',
      'Gives and responds to advice using a range of modal verbs',
    ],
  },
  {
    id: 'b1-unit-6',
    level: 'B1',
    unit_number: 6,
    title: 'What They Said (Reported Speech)',
    default_weeks: [7, 9],
    grammar_points: ['reported-speech-basics'],
    vocabulary_set_ids: ['news_media_b1', 'communication_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-5',
    competency_checklist: [
      'Applies tense backshift in reported statements',
      'Reports questions using if/whether and normal word order',
      'Correctly uses "say" (no object) vs "tell" (+ object)',
      'Changes time/place references (today → that day, here → there)',
      'Summarises a short conversation or news story using reported speech',
    ],
  },
  {
    id: 'b1-unit-7',
    level: 'B1',
    unit_number: 7,
    title: 'Opinions & Discussion',
    default_weeks: [9, 10],
    grammar_points: ['expressing-opinions', 'discourse-connectors-b1'],
    vocabulary_set_ids: ['opinion_phrases_b1', 'society_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-6',
    competency_checklist: [
      'Uses I think / In my opinion / I believe correctly',
      'Connects ideas with however, although, because of, despite',
      'Agrees and disagrees politely without using "I am agree"',
      'Supports opinions with at least one reason or example',
      'Uses "despite/in spite of" + noun phrase (not clause)',
    ],
  },
  {
    id: 'b1-unit-8',
    level: 'B1',
    unit_number: 8,
    title: 'B1 Consolidation',
    default_weeks: [11, 12],
    grammar_points: [
      'present-perfect',
      'first-conditional',
      'passive-voice-simple',
      'relative-clauses',
      'modal-verbs',
    ],
    vocabulary_set_ids: ['experiences_b1', 'environment_b1', 'technology_b1'],
    lesson_types: ['reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-7',
    competency_checklist: [
      'Writes a structured opinion essay (150 words)',
      'Demonstrates B1 range in a formal email task',
      'Uses passive, relative clauses, and reported speech in the same piece of writing',
      'Reads a 200-word text and correctly answers comprehension questions',
    ],
  },
]

// ─── Full curriculum map ──────────────────────────────────────────────────────

export const curriculum: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner English',
    description:
      'Master the foundations: introduce yourself, describe your world, talk about routines and the past.',
    default_duration_weeks: 12,
    units: A1_UNITS,
  },
  A2: {
    level: 'A2',
    title: 'Elementary English',
    description:
      'Expand into comparisons, future plans, quantities, and everyday social situations.',
    default_duration_weeks: 12,
    units: A2_UNITS,
  },
  B1: {
    level: 'B1',
    title: 'Intermediate English',
    description:
      'Handle most familiar topics: give opinions, discuss experiences, write structured texts.',
    default_duration_weeks: 12,
    units: B1_UNITS,
  },
  // B2, C1, C2 units to be populated in subsequent sprints
  B2: {
    level: 'B2',
    title: 'Upper-Intermediate English',
    description:
      'Express nuance, handle complex grammar, discuss abstract topics.',
    default_duration_weeks: 12,
    units: [
      {
        id: 'b2-unit-1',
        level: 'B2',
        unit_number: 1,
        title: 'Past Narratives & Sequencing',
        default_weeks: [1, 2],
        grammar_points: ['past-perfect'],
        vocabulary_set_ids: ['academic_vocabulary_b2', 'narrative_time_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        competency_checklist: [
          'Uses the past perfect to sequence two past events correctly',
          'Does not use the past perfect when the sequence is already clear from context',
          'Uses time connectors (prior to, subsequently, meanwhile) to organise a narrative',
          'Writes a coherent 150-word past narrative with correct verb forms',
          'Distinguishes past simple (simple past action) from past perfect (earlier action)',
        ],
      },
      {
        id: 'b2-unit-2',
        level: 'B2',
        unit_number: 2,
        title: 'Wishes & Regrets',
        default_weeks: [2, 3],
        grammar_points: ['wishes-regrets'],
        vocabulary_set_ids: ['emotions_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-1',
        competency_checklist: [
          'Uses "I wish + past simple" for present wishes correctly',
          'Uses "I wish + past perfect" for past regrets correctly',
          'Uses "I wish + would" to express a complaint about behaviour',
          'Uses "if only" for emphasis without changing the underlying structure',
          'Expresses nuanced emotions (remorse, yearning, nostalgia) in writing',
        ],
      },
      {
        id: 'b2-unit-3',
        level: 'B2',
        unit_number: 3,
        title: 'Conditionals 2 & 3',
        default_weeks: [3, 5],
        grammar_points: ['second-conditional', 'third-conditional'],
        vocabulary_set_ids: ['workplace_b2', 'hypothetical_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-2',
        competency_checklist: [
          'Forms the second conditional without "would" in the if-clause',
          'Forms the third conditional with past perfect + would have correctly',
          'Uses "could/might" in the main clause as alternatives to "would"',
          'Speculates using hypothetical language (scenario, likelihood, presumably)',
          'Does not confuse second and third conditional time frames',
        ],
      },
      {
        id: 'b2-unit-4',
        level: 'B2',
        unit_number: 4,
        title: 'Advanced Passive & Causative',
        default_weeks: [5, 6],
        grammar_points: ['advanced-passive'],
        vocabulary_set_ids: ['industries_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-3',
        competency_checklist: [
          'Forms causative "have/get + object + past participle" correctly',
          'Uses modal passive (must be, should be, can be + past participle)',
          'Uses passive infinitives (to be + past participle) after verbs like want, expect',
          'Describes industrial or manufacturing processes using the passive',
          'Selects "have" (formal) vs "get" (informal) appropriately in causative structures',
        ],
      },
      {
        id: 'b2-unit-5',
        level: 'B2',
        unit_number: 5,
        title: 'Gerunds & Infinitives',
        default_weeks: [6, 7],
        grammar_points: ['gerunds-infinitives'],
        vocabulary_set_ids: ['media_society_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-4',
        competency_checklist: [
          'Correctly uses gerunds after enjoy, avoid, deny, suggest, consider',
          'Correctly uses infinitives after want, decide, manage, refuse, hope',
          'Identifies the meaning difference in "remember doing" vs "remember to do"',
          'Uses a gerund after prepositions (interested in doing, used to doing)',
          'Uses bare infinitive after "make" and "let"',
        ],
      },
      {
        id: 'b2-unit-6',
        level: 'B2',
        unit_number: 6,
        title: 'Reported Speech & Modal Perfects',
        default_weeks: [7, 9],
        grammar_points: ['reported-speech', 'modal-perfects'],
        vocabulary_set_ids: ['news_events_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-5',
        competency_checklist: [
          'Applies full tense backshift (past perfect, would, could) in reported speech',
          'Reports questions with if/whether and normal (non-inverted) word order',
          'Uses "must have", "can\'t have", "should have", "could have" correctly',
          'Distinguishes "must have" (deduction) from "should have" (regret/criticism)',
          'Reports a news story using appropriate verbs (said, told, added, denied)',
        ],
      },
      {
        id: 'b2-unit-7',
        level: 'B2',
        unit_number: 7,
        title: 'Concession, Contrast & Academic Discourse',
        default_weeks: [9, 10],
        grammar_points: ['concession-contrast-b2'],
        vocabulary_set_ids: ['academic_vocabulary_b2'],
        lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-6',
        competency_checklist: [
          'Uses "although/even though" to link two contrasting clauses in one sentence',
          'Uses "despite/in spite of" with a noun or gerund (not a full clause)',
          'Uses "however/nevertheless" to start a new contrasting sentence with a comma',
          'Uses "whereas" to contrast two equal and opposite facts',
          'Writes a structured argument with concession phrases to acknowledge counter-views',
        ],
      },
      {
        id: 'b2-unit-8',
        level: 'B2',
        unit_number: 8,
        title: 'B2 Consolidation',
        default_weeks: [11, 12],
        grammar_points: [
          'past-perfect',
          'second-conditional',
          'third-conditional',
          'gerunds-infinitives',
          'reported-speech',
          'modal-perfects',
        ],
        vocabulary_set_ids: [
          'academic_vocabulary_b2',
          'workplace_b2',
          'media_society_b2',
        ],
        lesson_types: ['reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-7',
        competency_checklist: [
          'Writes a 200-word discursive essay with a clear thesis, concessions, and conclusion',
          'Demonstrates B2 grammar range: conditionals, passives, modal perfects, gerunds',
          'Reports a short news story correctly using reported speech and modal perfects',
          'Reads a 250-word text and correctly answers inferential comprehension questions',
        ],
      },
    ],
  },
  C1: {
    level: 'C1',
    title: 'Advanced English',
    description:
      'Write sophisticated texts, understand implicit meaning, use inversion and cleft sentences.',
    default_duration_weeks: 12,
    units: [
      {
        id: 'c1-unit-1',
        level: 'C1',
        unit_number: 1,
        title: 'Mixed Conditionals & Speculation',
        default_weeks: [2, 3],
        grammar_points: ['mixed-conditionals'],
        vocabulary_set_ids: ['abstract_concepts_c1'],
        lesson_types: ['grammar', 'reading', 'writing', 'review'],
        prerequisite_unit: 'b2-unit-8',
        competency_checklist: [
          'Construct mixed conditional sentences combining past and present time frames.',
          'Speculate about past events and their present consequences.',
          'Use abstract vocabulary to discuss hypothetical scenarios.',
          'Evaluate the appropriateness of conditional structures in formal writing.',
          'Identify mixed conditionals in authentic academic and literary texts.',
        ],
      },
      {
        id: 'c1-unit-2',
        level: 'C1',
        unit_number: 2,
        title: 'Participle Clauses',
        default_weeks: [2, 3],
        grammar_points: ['participle-clauses'],
        vocabulary_set_ids: ['advanced_verbs_c1'],
        lesson_types: ['grammar', 'reading', 'writing'],
        prerequisite_unit: 'c1-unit-1',
        competency_checklist: [
          'Use present and past participle clauses to reduce relative clauses.',
          'Replace adverbial clauses with participial equivalents for conciseness.',
          'Apply perfect participle clauses to express sequence of events.',
          'Produce formal written texts using participle constructions naturally.',
          'Distinguish between correct and ambiguous participle clause usage.',
        ],
      },
      {
        id: 'c1-unit-3',
        level: 'C1',
        unit_number: 3,
        title: 'Hedging & Formal Register',
        default_weeks: [1, 2],
        grammar_points: ['hedging-language'],
        vocabulary_set_ids: ['formal_writing_c1'],
        lesson_types: ['grammar', 'writing', 'reading'],
        prerequisite_unit: 'c1-unit-2',
        competency_checklist: [
          'Hedge claims appropriately in academic and professional writing.',
          'Use formal connectors and discourse phrases accurately.',
          'Distinguish between formal and informal register in written texts.',
          'Produce a paragraph of formal writing using hedging language throughout.',
          'Identify hedging devices in academic articles and reports.',
        ],
      },
      {
        id: 'c1-unit-4',
        level: 'C1',
        unit_number: 4,
        title: 'Emphasis: Inversion & Cleft Sentences',
        default_weeks: [2, 3],
        grammar_points: ['inversion', 'cleft-sentences'],
        vocabulary_set_ids: ['idioms_c1'],
        lesson_types: ['grammar', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-3',
        competency_checklist: [
          'Use subject–auxiliary inversion after negative and restrictive adverbials.',
          'Construct it-cleft and wh-cleft sentences for emphasis.',
          'Employ advanced idiomatic expressions naturally in spoken interaction.',
          'Recognise and produce emphasis structures in formal speeches and essays.',
          'Correct common errors in inversion and cleft constructions.',
        ],
      },
      {
        id: 'c1-unit-5',
        level: 'C1',
        unit_number: 5,
        title: 'Ellipsis, Substitution & Textual Cohesion',
        default_weeks: [1, 2],
        grammar_points: ['ellipsis-substitution'],
        vocabulary_set_ids: ['academic_discourse_c1'],
        lesson_types: ['grammar', 'reading', 'writing'],
        prerequisite_unit: 'c1-unit-4',
        competency_checklist: [
          'Apply ellipsis and substitution to avoid repetition in formal writing.',
          'Use academic cohesion vocabulary to link arguments across paragraphs.',
          'Analyse how cohesive devices contribute to text unity.',
          'Produce an academic paragraph demonstrating effective use of ellipsis and reference.',
          'Identify ellipsis and substitution in edited academic prose.',
        ],
      },
      {
        id: 'c1-unit-6',
        level: 'C1',
        unit_number: 6,
        title: 'Advanced Relative Clauses & Critical Thinking',
        default_weeks: [2, 3],
        grammar_points: ['advanced-relative-clauses'],
        vocabulary_set_ids: ['critical_thinking_c1'],
        lesson_types: ['grammar', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-5',
        competency_checklist: [
          'Use non-defining, sentential, and reduced relative clauses correctly.',
          'Express viewpoints using critical thinking vocabulary with precision.',
          'Evaluate the validity and bias of arguments encountered in texts.',
          'Integrate relative clauses fluidly into complex written sentences.',
          'Debate a topic using counterargument and concession language.',
        ],
      },
      {
        id: 'c1-unit-7',
        level: 'C1',
        unit_number: 7,
        title: 'Argumentation & Rhetoric',
        default_weeks: [2, 3],
        grammar_points: ['hedging-language', 'inversion'],
        vocabulary_set_ids: ['debate_rhetoric_c1'],
        lesson_types: ['writing', 'review', 'grammar'],
        prerequisite_unit: 'c1-unit-6',
        competency_checklist: [
          'Build a persuasive argument using assertion, evidence, and refutation.',
          'Employ rhetorical devices (inversion, concession, emphasis) in speeches.',
          'Use debate and rhetoric vocabulary to express agreement, challenge, and concession.',
          'Write a 300-word opinion essay at C1 standard.',
          'Deliver a 2-minute spoken argument on a complex topic.',
        ],
      },
      {
        id: 'c1-unit-8',
        level: 'C1',
        unit_number: 8,
        title: 'C1 Consolidation',
        default_weeks: [2, 3],
        grammar_points: [
          'mixed-conditionals',
          'participle-clauses',
          'inversion',
          'cleft-sentences',
          'ellipsis-substitution',
          'advanced-relative-clauses',
          'hedging-language',
        ],
        vocabulary_set_ids: [
          'abstract_concepts_c1',
          'academic_discourse_c1',
          'debate_rhetoric_c1',
        ],
        lesson_types: ['grammar', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c1-unit-7',
        competency_checklist: [
          'Produce a sustained piece of formal writing integrating all C1 grammar structures.',
          'Demonstrate flexible control of register in both formal and semi-formal contexts.',
          'Discuss abstract and complex topics fluently with appropriate hedging.',
          'Identify and correct errors across all C1 grammar areas.',
          'Pass a C1-level CEFR assessment covering all four skills.',
        ],
      },
    ],
  },
  C2: {
    level: 'C2',
    title: 'Proficiency English',
    description:
      'Near-native mastery: discourse markers, nominalisation, academic and professional writing.',
    default_duration_weeks: 12,
    units: [
      {
        id: 'c2-unit-1',
        level: 'C2',
        unit_number: 1,
        title: 'Discourse Markers & Text Cohesion',
        default_weeks: [2, 3],
        grammar_points: ['discourse-markers'],
        vocabulary_set_ids: ['nuanced_adjectives_c2'],
        lesson_types: ['grammar', 'reading', 'writing'],
        prerequisite_unit: 'c1-unit-8',
        competency_checklist: [
          'Use a wide range of discourse markers to organise arguments at paragraph and essay level.',
          'Identify how discourse markers signal logical relationships in sophisticated texts.',
          'Employ nuanced C2 adjectives to add precision and depth to writing.',
          'Produce a cohesive analytical essay of 400+ words using advanced connectors.',
          'Evaluate the rhetorical effect of discourse marker choices in published writing.',
        ],
      },
      {
        id: 'c2-unit-2',
        level: 'C2',
        unit_number: 2,
        title: 'Nominalisation & Academic Style',
        default_weeks: [2, 3],
        grammar_points: ['nominalisation'],
        vocabulary_set_ids: ['formal_register_c2'],
        lesson_types: ['grammar', 'writing', 'reading'],
        prerequisite_unit: 'c2-unit-1',
        competency_checklist: [
          'Convert verb and adjective phrases into noun phrases using nominalisation.',
          'Produce academic writing with the impersonal, dense style characteristic of C2.',
          'Use formal register vocabulary accurately in professional correspondence.',
          'Identify and correct inappropriate register in academic texts.',
          'Write an abstract or executive summary using nominalisation throughout.',
        ],
      },
      {
        id: 'c2-unit-3',
        level: 'C2',
        unit_number: 3,
        title: 'Idiomatic & Figurative Language',
        default_weeks: [2, 3],
        grammar_points: ['fronting-emphasis'],
        vocabulary_set_ids: ['idiomatic_expressions_c2'],
        lesson_types: ['vocabulary', 'review', 'reading'],
        prerequisite_unit: 'c2-unit-2',
        competency_checklist: [
          'Use a wide range of idiomatic expressions naturally in spoken and written English.',
          'Interpret figurative language in authentic literary and journalistic texts.',
          'Employ fronting for rhetorical emphasis in spoken and written contexts.',
          'Explain the meaning and cultural context of complex idioms.',
          'Avoid inappropriate use of idioms in formal written registers.',
        ],
      },
      {
        id: 'c2-unit-4',
        level: 'C2',
        unit_number: 4,
        title: 'Fronting, Emphasis & Stylistic Devices',
        default_weeks: [2, 3],
        grammar_points: ['fronting-emphasis', 'register-and-style'],
        vocabulary_set_ids: ['literary_devices_c2'],
        lesson_types: ['grammar', 'writing', 'reading'],
        prerequisite_unit: 'c2-unit-3',
        competency_checklist: [
          'Use object fronting, adverbial fronting, and concessive fronting for effect.',
          'Identify and deploy literary devices (metaphor, irony, juxtaposition) in writing.',
          'Adapt writing style consciously for different purposes and audiences.',
          'Analyse how stylistic choices shape meaning and tone in literary texts.',
          'Produce a piece of creative or journalistic writing demonstrating stylistic variation.',
        ],
      },
      {
        id: 'c2-unit-5',
        level: 'C2',
        unit_number: 5,
        title: 'Critical Reading & Academic Writing',
        default_weeks: [2, 3],
        grammar_points: ['register-and-style'],
        vocabulary_set_ids: ['critical_analysis_c2'],
        lesson_types: ['reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-4',
        competency_checklist: [
          'Read and critically evaluate complex academic and professional texts.',
          'Use critical analysis vocabulary (paradigm, empirical, discourse, posit) accurately.',
          'Construct a structured critical analysis essay of 500+ words.',
          'Interrogate the assumptions, bias, and methodology of academic arguments.',
          'Demonstrate near-native precision of vocabulary and grammar in academic prose.',
        ],
      },
      {
        id: 'c2-unit-6',
        level: 'C2',
        unit_number: 6,
        title: 'C2 Consolidation',
        default_weeks: [2, 3],
        grammar_points: [
          'discourse-markers',
          'nominalisation',
          'fronting-emphasis',
          'register-and-style',
          'inversion',
          'cleft-sentences',
        ],
        vocabulary_set_ids: [
          'nuanced_adjectives_c2',
          'formal_register_c2',
          'idiomatic_expressions_c2',
          'literary_devices_c2',
          'critical_analysis_c2',
        ],
        lesson_types: ['grammar', 'reading', 'writing', 'review'],
        prerequisite_unit: 'c2-unit-5',
        competency_checklist: [
          'Demonstrate mastery of all C2 grammar structures in extended writing tasks.',
          'Use the full range of C2 vocabulary with precision and appropriate register.',
          'Produce and deliver a coherent, sophisticated extended argument (spoken and written).',
          'Critically evaluate a complex text and respond with a counter-argument in writing.',
          'Achieve a score consistent with C2 proficiency on a Cambridge Proficiency-style assessment.',
        ],
      },
    ],
  },
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
  daysPerWeek: number
): Array<{
  week: number
  day: number
  unit_id: string
  lesson_type: LessonType
  title: string
}> {
  const units = getCurriculumUnits(level)
  const slots: Array<{
    week: number
    day: number
    unit_id: string
    lesson_type: LessonType
    title: string
  }> = []

  const totalDays = durationWeeks * daysPerWeek
  // Last day is reserved for the level completion test
  const lessonDays = totalDays - 1

  // Expand all unit lessons in order
  const allLessons = units.flatMap((unit) =>
    unit.lesson_types.map((lt) => ({
      unit_id: unit.id,
      lesson_type: lt,
      unit_title: unit.title,
    }))
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
  slots.push({
    week: testWeek,
    day: testDay,
    unit_id: `${level.toLowerCase()}-test`,
    lesson_type: 'review',
    title: `${level} Level Completion Test`,
  })

  return slots
}
