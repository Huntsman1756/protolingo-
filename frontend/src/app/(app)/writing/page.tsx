'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useLanguageStore } from '@/store/language'
import { PaywallGate } from '@/components/billing/PaywallBanner'
import { MaintenanceGate } from '@/components/billing/MaintenanceBanner'
import { PageLoading } from '@/components/ui/page-loading'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WritingExercise {
  id: number
  level: string
  target_language: string
  exercise_type: string
  topic: string
  prompt: string
  word_count_min: number
  word_count_max: number
}

interface WritingResult {
  score: number
  xp_earned: number
  feedback: string
}

interface WritingAttemptItem {
  id: number
  score: number
  xp_earned: number
  completed_at: string
  exercise: WritingExercise
  student_text: string
  feedback: string
}

type PageState =
  | 'loading'
  | 'idle'
  | 'generating'
  | 'exercise'
  | 'results'
  | 'history'

// ---------------------------------------------------------------------------
// Main page logic
// ---------------------------------------------------------------------------

function WritingPage() {
  const t = useTranslations('writing')
  const tCommon = useTranslations('common')
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)

  const [pageState, setPageState] = useState<PageState>('loading')
  const [exercise, setExercise] = useState<WritingExercise | null>(null)
  const [studentText, setStudentText] = useState('')
  const [result, setResult] = useState<WritingResult | null>(null)
  const [history, setHistory] = useState<WritingAttemptItem[]>([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [generatingWarn, setGeneratingWarn] = useState(false)
  const generateAbortRef = useRef<AbortController | null>(null)
  const generatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (pageState === 'generating') {
      setGeneratingWarn(false)
      generatingTimerRef.current = setTimeout(
        () => setGeneratingWarn(true),
        15_000
      )
    } else {
      if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current)
      setGeneratingWarn(false)
    }
    return () => {
      if (generatingTimerRef.current) clearTimeout(generatingTimerRef.current)
    }
  }, [pageState])

  useEffect(() => {
    return () => {
      generateAbortRef.current?.abort()
    }
  }, [])

  const loadNext = useCallback(async () => {
    setPageState('loading')
    setError('')
    try {
      const res = await apiFetch('/api/writing/next')
      if (!res.ok) {
        setPageState('idle')
        return
      }
      const data = (await res.json()) as {
        available: boolean
        exercise?: WritingExercise
      }
      if (data.available && data.exercise) {
        setExercise(data.exercise)
        setStudentText('')
        setResult(null)
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
  }, [loadNext, activeLanguage?.code])

  async function handleGenerate() {
    try {
      const res = await apiFetch('/api/writing/generate', { method: 'POST' })
      if (res.ok || res.status === 202) {
        setPageState('generating')
        const controller = new AbortController()
        generateAbortRef.current = controller
        const nextRes = await apiFetch('/api/writing/next?wait=true', {
          signal: controller.signal,
        })
        generateAbortRef.current = null
        if (nextRes.ok) {
          const data = (await nextRes.json()) as {
            available: boolean
            exercise?: WritingExercise
          }
          if (data.available && data.exercise) {
            setExercise(data.exercise)
            setStudentText('')
            setResult(null)
            setPageState('exercise')
            return
          }
        }
        setPageState('idle')
      } else {
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
      const res = await apiFetch('/api/writing/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise_id: exercise.id,
          student_text: studentText,
          replay: false,
        }),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { detail?: string }
        setError(d.detail === 'already_attempted' ? t('alreadyAttempted') : t('errorSubmit'))
        return
      }
      const data = (await res.json()) as WritingResult
      setResult(data)
      setPageState('results')
    } catch {
      setError(t('errorSubmit'))
    } finally {
      setSubmitting(false)
    }
  }

  async function loadHistory() {
    try {
      const res = await apiFetch('/api/writing/history')
      if (res.ok) {
        const data = (await res.json()) as { items: WritingAttemptItem[]; total: number }
        setHistory(data.items)
        setPageState('history')
      }
    } catch {
      setError(t('errorLoading'))
    }
  }

  const wordCount = studentText.trim() ? studentText.trim().split(/\s+/).length : 0

  // ── Loading ──────────────────────────────────────────────────────────────
  if (pageState === 'loading') {
    return <PageLoading minHeight="min-h-[calc(100vh-56px)] md:min-h-screen" />
  }

  // ── Generating ───────────────────────────────────────────────────────────
  if (pageState === 'generating') {
    return (
      <PageLoading
        label={t('generating')}
        subtext={
          generatingWarn
            ? t('generatingLong')
            : t('generatingDesc')
        }
        minHeight="min-h-[calc(100vh-56px)] md:min-h-screen"
      />
    )
  }

  // ── History ──────────────────────────────────────────────────────────────
  if (pageState === 'history') {
    return (
      <div className="mx-auto min-h-screen max-w-3xl px-4 py-6 md:min-h-0 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('historyTitle')}
          </h1>
          <button
            onClick={loadNext}
            className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            {t('practiceMore')}
          </button>
        </div>

        {history.length === 0 ? (
          <div className="border-fl-border bg-fl-surface border p-6 text-center">
            <p className="text-fl-muted-3 font-mono text-xs tracking-wide">{t('historyEmpty')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="border-fl-border bg-fl-surface border p-4">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-fl-fg truncate font-mono text-xs font-bold tracking-wide">
                      {item.exercise.topic}
                    </p>
                    <p className="text-fl-label text-fl-muted-3 mt-0.5 font-mono tracking-widest uppercase">
                      {item.exercise.level} · {item.exercise.exercise_type}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-fl-fg font-mono text-xs font-bold">{item.score}/5</p>
                    <p className="text-fl-label text-fl-accent font-mono">+{item.xp_earned} XP</p>
                  </div>
                </div>
                <p className="text-fl-label text-fl-muted-2 mb-2 line-clamp-2 font-mono text-xs leading-relaxed">
                  {item.student_text}
                </p>
                <p className="text-fl-label text-fl-muted-2 border-fl-border border-t pt-2 font-mono text-xs leading-relaxed">
                  {item.feedback}
                </p>
                <button
                  onClick={() => {
                    setExercise(item.exercise)
                    setStudentText('')
                    setResult(null)
                    setPageState('exercise')
                  }}
                  className="text-fl-label text-fl-muted-2 hover:text-fl-fg mt-2 font-mono tracking-widest uppercase transition-colors"
                >
                  {t('practiceAgain')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Results ──────────────────────────────────────────────────────────────
  if (pageState === 'results' && result && exercise) {
    const scorePercent = Math.round((result.score / 5) * 100)
    return (
      <div className="mx-auto min-h-screen max-w-3xl space-y-5 px-4 py-6 md:min-h-0 md:px-8">
        <div className="border-fl-border bg-fl-surface border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
                {t('resultsLabel')}
              </p>
              <p className="text-fl-fg mt-1 font-mono text-2xl font-bold">
                {result.score}/5
              </p>
            </div>
            <div className="text-right">
              <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">XP</p>
              <p className="text-fl-accent mt-1 font-mono text-xl font-bold">+{result.xp_earned}</p>
            </div>
          </div>
          <div className="mt-3 border-fl-border border-t pt-3">
            <div className="flex h-2 items-center overflow-hidden rounded-full bg-fl-surface-2">
              <div
                className="h-full rounded-full bg-fl-accent transition-all"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-fl-border bg-fl-surface border p-5">
          <p className="text-fl-label text-fl-muted-3 mb-2 font-mono tracking-widest uppercase">
            {t('feedbackLabel')}
          </p>
          <p className="text-fl-fg font-mono text-xs leading-relaxed">{result.feedback}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadNext}
            className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 flex-1 border py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('nextExercise')}
          </button>
          <button
            onClick={loadHistory}
            className="border-fl-border bg-fl-surface text-fl-muted-2 hover:text-fl-fg hover:bg-fl-surface-2 border px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('viewHistory')}
          </button>
        </div>
      </div>
    )
  }

  // ── Idle ─────────────────────────────────────────────────────────────────
  if (pageState === 'idle') {
    return (
      <div className="mx-auto min-h-screen max-w-3xl px-4 py-6 md:min-h-0 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('title')}
          </h1>
          <button
            onClick={loadHistory}
            className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            {t('history')}
          </button>
        </div>

        {error && <p className="text-fl-label mb-4 font-mono text-red-500">{error}</p>}

        <div className="border-fl-border bg-fl-surface flex flex-col items-center gap-5 border p-8 text-center">
          <p className="text-fl-muted-2 font-mono text-xs tracking-wide">{t('noExercises')}</p>
          <button
            onClick={handleGenerate}
            className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 border px-8 py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('generate')}
          </button>
        </div>
      </div>
    )
  }

  // ── Exercise ─────────────────────────────────────────────────────────────
  if (!exercise) return null

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-6 md:min-h-0 md:px-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('title')}
          </h1>
          <p className="text-fl-label text-fl-muted-3 mt-0.5 font-mono tracking-widest uppercase">
            {exercise.level} · {exercise.exercise_type} · {exercise.topic}
          </p>
        </div>
        <button
          onClick={loadHistory}
          className="text-fl-label text-fl-muted-2 hover:text-fl-fg shrink-0 font-mono tracking-widest uppercase transition-colors"
        >
          {t('history')}
        </button>
      </div>

      <div className="border-fl-border bg-fl-surface border p-5">
        <p className="text-fl-label text-fl-muted-3 mb-2 font-mono tracking-widest uppercase">
          {t('promptLabel')}
        </p>
        <p className="text-fl-fg font-mono text-xs leading-relaxed">{exercise.prompt}</p>
        <p className="text-fl-label text-fl-muted-4 mt-2 font-mono text-xs">
          {t('wordCount', { min: exercise.word_count_min, max: exercise.word_count_max })}
        </p>
      </div>

      <div className="mt-4">
        <textarea
          value={studentText}
          onChange={(e) => setStudentText(e.target.value)}
          className="text-fl-label w-full border-fl-border bg-fl-surface border p-4 font-mono text-xs leading-relaxed placeholder-fl-muted-4 resize-y"
          rows={8}
          placeholder={t('writePlaceholder')}
        />
        <div className="mt-2 text-right">
          <span className="text-fl-label text-fl-muted-4 font-mono text-xs">{wordCount} words</span>
        </div>
      </div>

      {error && <p className="text-fl-label mt-3 font-mono text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={wordCount < 10 || submitting}
        className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 mt-4 w-full border py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? '...' : t('submit')}
      </button>
    </div>
  )
}

export default function WritingPageWrapper() {
  return (
    <MaintenanceGate>
      <PaywallGate>
        <WritingPage />
      </PaywallGate>
    </MaintenanceGate>
  )
}
