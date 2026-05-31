// Shared API response types used across multiple pages/components.
// Local-only types (CorrectAnswer, SubmitResult, AttemptItem) stay co-located
// because they differ between reading and listening.

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

export interface Question {
  index: number
  question: string
  options: Record<string, string>
}

/** Reading exercise — includes a `text` passage */
export interface ReadingExercise {
  id: number
  level: string
  target_language: string
  exercise_type: string
  topic: string
  text: string
  questions: Question[]
}

/** Listening exercise — includes `duration_seconds` instead of a text body */
export interface ListeningExercise {
  id: number
  level: string
  target_language: string
  exercise_type: string
  topic: string
  duration_seconds: number
  questions: Question[]
}

// ---------------------------------------------------------------------------
// Quota
// ---------------------------------------------------------------------------

/**
 * Superset of all quota fields returned by the API.
 *
 * - `/api/auth/quota` (user-facing) returns all 12 fields including tokens.
 * - `/api/admin/users/:id/quota` returns 9 fields — token fields are absent.
 *
 * Token fields are therefore optional so both endpoints can use this type.
 */
export interface QuotaStatus {
  sessions_this_week: number
  sessions_limit: number
  sessions_unlimited: boolean
  minutes_today: number
  minutes_limit: number
  time_unlimited: boolean
  minutes_this_week: number
  weekly_minutes_limit: number
  weekly_minutes_unlimited: boolean
  tokens_this_month?: number
  tokens_monthly_limit?: number
  tokens_unlimited?: boolean
}
