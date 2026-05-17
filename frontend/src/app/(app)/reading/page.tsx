'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { PaywallGate } from '@/components/billing/PaywallBanner'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Question {
  index: number
  question: string
  options: Record<string, string>
}

interface Exercise {
  id: number
  level: string
  target_language: string
  exercise_type: string
  topic: string
  text: string
  questions: Question[]
}

interface CorrectAnswer {
  index: number
  correct: string
}

interface SubmitResult {
  score: number
  xp_earned: number
  correct_answers: CorrectAnswer[]
}

interface AttemptItem {
  id: number
  score: number
  xp_earned: number
  completed_at: string
  exercise: Exercise
  answers: Record<string, string>
  correct_answers: CorrectAnswer[]
}

type PageState = 'loading' | 'idle' | 'generating' | 'exercise' | 'results' | 'history'

// ---------------------------------------------------------------------------
// Main page logic
// ---------------------------------------------------------------------------

function ReadingPage() {
  const t = useTranslations('reading')
  const tCommon = useTranslations('common')

  const [pageState, setPageState] = useState<PageState>('loading')
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [history, setHistory] = useState<AttemptItem[]>([])
  const [historyTotal, setHistoryTotal] = useState(0)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [isReplay, setIsReplay] = useState(false)
  const generateAbortRef = useRef<AbortController | null>(null)

  // Cancel in-flight long-poll on unmount
  useEffect(() => {
    return () => { generateAbortRef.current?.abort() }
  }, [])

  const loadNext = useCallback(async () => {
    setPageState('loading')
    setError('')
    try {
      const res = await apiFetch('/api/reading/next')
      if (!res.ok) {
        setPageState('idle')
        return
      }
      const data = await res.json() as { available: boolean; exercise?: Exercise }
      if (data.available && data.exercise) {
        setExercise(data.exercise)
        setAnswers({})
        setResult(null)
        setIsReplay(false)
        setPageState('exercise')
      } else {
        setPageState('idle')
      }
    } catch {
      setError(t('errorLoading'))
      setPageState('idle')
    }
  }, [t])

  useEffect(() => {
    loadNext()
  }, [loadNext])

  async function handleGenerate() {
    try {
      const res = await apiFetch('/api/reading/generate', { method: 'POST' })
      if (res.ok || res.status === 202) {
        setPageState('generating')
        const controller = new AbortController()
        generateAbortRef.current = controller
        const nextRes = await apiFetch('/api/reading/next?wait=true', {
          signal: controller.signal,
        })
        generateAbortRef.current = null
        if (nextRes.ok) {
          const data = await nextRes.json() as { available: boolean; exercise?: Exercise }
          if (data.available && data.exercise) {
            setExercise(data.exercise)
            setAnswers({})
            setResult(null)
            setIsReplay(false)
            setPageState('exercise')
            return
          }
        }
        setPageState('idle')
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setPageState('idle')
    }
  }

  async function handleSubmit() {
    if (!exercise) return
    setSubmitting(true)
    setError('')
    try {
      const res = await apiFetch('/api/reading/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_id: exercise.id, answers, replay: isReplay }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { detail?: string }
        setError(
          d.detail === 'already_attempted'
            ? t('alreadyAttempted')
            : t('errorSubmit'),
        )
        return
      }
      const data = await res.json() as SubmitResult
      setResult(data)
      setPageState('results')
    } catch {
      setError(t('errorSubmit'))
    } finally {
      setSubmitting(false)
    }
  }

  async function loadHistory() {
    setPageState('history')
    try {
      const res = await apiFetch('/api/reading/history')
      if (res.ok) {
        const data = await res.json() as { items: AttemptItem[]; total: number }
        setHistory(data.items)
        setHistoryTotal(data.total)
      }
    } catch { /* ignore */ }
  }

  const allAnswered = exercise
    ? Object.keys(answers).length === exercise.questions.length
    : false

  // ── Loading ──────────────────────────────────────────────────────────────
  if (pageState === 'loading') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] md:min-h-screen items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          ● {tCommon('loading')}
        </span>
      </div>
    )
  }

  // ── Generating (long-poll) ────────────────────────────────────────────────
  if (pageState === 'generating') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] md:min-h-screen flex-col items-center justify-center gap-3 px-4">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          ● {t('generating')}
        </span>
        <p className="font-mono text-fl-label text-fl-muted-4 text-center max-w-xs">
          {t('generatingDesc')}
        </p>
      </div>
    )
  }

  // ── History ───────────────────────────────────────────────────────────────
  if (pageState === 'history') {
    return (
      <div className="min-h-screen md:min-h-0 px-4 md:px-8 py-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">
            {t('historyTitle')}
          </h1>
          <button
            onClick={loadNext}
            className="font-mono text-fl-label text-fl-muted-2 hover:text-fl-fg uppercase tracking-widest transition-colors"
          >
            {t('practiceMore')}
          </button>
        </div>

        {history.length === 0 ? (
          <div className="border border-fl-border bg-fl-surface p-6 text-center">
            <p className="font-mono text-xs text-fl-muted-3 tracking-wide">
              {t('historyEmpty')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="border border-fl-border bg-fl-surface p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold text-fl-fg tracking-wide truncate">
                      {item.exercise.topic}
                    </p>
                    <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest mt-0.5">
                      {item.exercise.level} · {item.exercise.exercise_type}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs font-bold text-fl-fg">
                      {item.score}/{item.exercise.questions.length}
                    </p>
                    <p className="font-mono text-fl-label text-fl-accent">
                      +{item.xp_earned} XP
                    </p>
                  </div>
                </div>
                <p className="font-mono text-fl-label text-fl-muted-2 leading-relaxed border-t border-fl-border pt-3 mb-3 line-clamp-3">
                  {item.exercise.text}
                </p>
                <button
                  onClick={() => {
                    setExercise(item.exercise)
                    setAnswers({})
                    setResult(null)
                    setIsReplay(true)
                    setPageState('exercise')
                  }}
                  className="font-mono text-fl-label text-fl-muted-2 hover:text-fl-fg uppercase tracking-widest transition-colors"
                >
                  {t('practiceAgain')}
                </button>
              </div>
            ))}
            {historyTotal > history.length && (
              <p className="font-mono text-fl-label text-fl-muted-4 text-center py-2">
                {t('moreInHistory', { count: historyTotal - history.length })}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (pageState === 'results' && result && exercise) {
    return (
      <div className="min-h-screen md:min-h-0 px-4 md:px-8 py-6 max-w-3xl mx-auto space-y-5">
        {/* Score card */}
        <div className="border border-fl-border bg-fl-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest">
                {t('resultsLabel')}
              </p>
              <p className="font-mono text-2xl font-bold text-fl-fg mt-1">
                {result.score}/{exercise.questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest">XP</p>
              {isReplay ? (
                <p className="font-mono text-fl-label text-fl-muted-3 mt-1">{t('replayNoXp')}</p>
              ) : (
                <p className="font-mono text-xl font-bold text-fl-accent mt-1">+{result.xp_earned}</p>
              )}
            </div>
          </div>
        </div>

        {/* Question review */}
        <div className="space-y-3">
          <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest">
            {t('review')}
          </p>
          {exercise.questions.map((q) => {
            const correctKey = result.correct_answers.find((c) => c.index === q.index)?.correct
            const userAnswer = answers[String(q.index)]
            const isCorrect = userAnswer === correctKey
            return (
              <div
                key={q.index}
                className={`border p-4 ${isCorrect
                  ? 'border-green-600/50 bg-green-950/30'
                  : 'border-red-600/50 bg-red-950/30'
                  }`}
              >
                <p className="font-mono text-xs text-fl-fg mb-3 leading-relaxed">
                  {q.index + 1}. {q.question}
                </p>
                <div className="space-y-1">
                  {Object.entries(q.options).map(([k, v]) => (
                    <div
                      key={k}
                      className={`font-mono text-fl-label px-3 py-1.5 ${k === correctKey
                        ? 'text-green-400 font-bold'
                        : k === userAnswer && !isCorrect
                          ? 'text-red-400 line-through opacity-70'
                          : 'text-fl-muted-3'
                        }`}
                    >
                      <span className="font-bold">{k}.</span> {v}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={loadNext}
            className="flex-1 border border-fl-border bg-fl-surface font-mono text-xs tracking-widest uppercase text-fl-fg hover:bg-fl-surface-2 transition-colors py-3"
          >
            {t('nextExercise')}
          </button>
          <button
            onClick={loadHistory}
            className="border border-fl-border bg-fl-surface font-mono text-xs tracking-widest uppercase text-fl-muted-2 hover:text-fl-fg hover:bg-fl-surface-2 transition-colors py-3 px-4"
          >
            {t('viewHistory')}
          </button>
        </div>
      </div>
    )
  }

  // ── Idle (no exercises available) ─────────────────────────────────────────
  if (pageState === 'idle') {
    return (
      <div className="min-h-screen md:min-h-0 px-4 md:px-8 py-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">
            {t('title')}
          </h1>
          <button
            onClick={loadHistory}
            className="font-mono text-fl-label text-fl-muted-2 hover:text-fl-fg uppercase tracking-widest transition-colors"
          >
            {t('history')}
          </button>
        </div>

        {error && (
          <p className="font-mono text-fl-label text-red-500 mb-4">{error}</p>
        )}

        <div className="border border-fl-border bg-fl-surface p-8 flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-xs text-fl-muted-2 tracking-wide">
            {t('noExercises')}
          </p>
          <button
            onClick={handleGenerate}
            className="border border-fl-border bg-fl-surface font-mono text-xs tracking-widest uppercase text-fl-fg hover:bg-fl-surface-2 transition-colors py-3 px-8"
          >
            {t('generate')}
          </button>
        </div>
      </div>
    )
  }

  // ── Exercise ──────────────────────────────────────────────────────────────
  if (!exercise) return null

  return (
    <div className="min-h-screen md:min-h-0 px-4 md:px-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">
            {t('title')}
          </h1>
          <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest mt-0.5">
            {exercise.level} · {exercise.exercise_type} · {exercise.topic}
          </p>
        </div>
        <button
          onClick={loadHistory}
          className="font-mono text-fl-label text-fl-muted-2 hover:text-fl-fg uppercase tracking-widest transition-colors shrink-0"
        >
          {t('history')}
        </button>
      </div>

      {/* Two-column on desktop, stacked on mobile */}
      <div className="flex flex-col md:grid md:grid-cols-[55fr_45fr] md:gap-6 gap-5">

        {/* Left: reading text */}
        <div>
          <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest mb-2">
            {t('textLabel')}
          </p>
          <div className="border border-fl-border bg-fl-surface p-5">
            <p className="font-mono text-xs text-fl-fg leading-relaxed whitespace-pre-wrap">
              {exercise.text}
            </p>
          </div>
        </div>

        {/* Right: questions */}
        <div>
          <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest mb-2">
            {t('questionsLabel')}
          </p>
          <div className="space-y-4">
            {exercise.questions.map((q) => (
              <div key={q.index} className="border border-fl-border bg-fl-surface p-4">
                <p className="font-mono text-xs text-fl-fg mb-3 leading-relaxed">
                  {q.index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {Object.entries(q.options).map(([k, v]) => {
                    const selected = answers[String(q.index)] === k
                    return (
                      <button
                        key={k}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [String(q.index)]: k }))
                        }
                        className={`w-full text-left px-3 py-2 font-mono text-fl-label border transition-colors ${selected
                          ? 'border-fl-accent text-fl-fg bg-fl-surface-2'
                          : 'border-fl-border text-fl-muted-2 hover:border-fl-muted-2 hover:text-fl-fg'
                          }`}
                      >
                        <span className="font-bold">{k}.</span> {v}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="font-mono text-fl-label text-red-500 mt-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="mt-4 w-full border border-fl-border bg-fl-surface font-mono text-xs tracking-widest uppercase text-fl-fg hover:bg-fl-surface-2 transition-colors py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? '...' : t('submit')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReadingPageWrapper() {
  return (
    <PaywallGate>
      <ReadingPage />
    </PaywallGate>
  )
}
