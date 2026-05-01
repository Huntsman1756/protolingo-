'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'

interface Question {
  id: number
  type: string
  difficulty: string
  question: string
  options: string[]
}

interface ExistingPlan {
  cefr_level: string
  created_at: string
}

export default function AssessmentPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [step, setStep] = useState<'result' | 'schedule'>('result')
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [minutesPerDay, setMinutesPerDay] = useState(30)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [error, setError] = useState('')
  const [existingPlan, setExistingPlan] = useState<ExistingPlan | null | undefined>(undefined)

  const startAssessment = useCallback(async () => {
    setExistingPlan(null)
    setLoading(true)
    setError('')
    setQuiz([])
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    try {
      const res = await apiFetch('/api/assessment/start')
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Error ${res.status}`)
      }
      const data = await res.json()
      setQuiz(data.quiz.questions)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to start assessment')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function checkExistingPlan() {
      try {
        const res = await apiFetch('/api/study-plan/current')
        if (res.ok) {
          const plan = await res.json()
          if (plan && plan.cefr_level) {
            setExistingPlan(plan)
            setLoading(false)
            return
          }
        }
      } catch { /* ignore, fallback to new assessment */ }
      startAssessment()
    }
    checkExistingPlan()
  }, [startAssessment])

  function selectAnswer(answer: string) {
    const question = quiz[currentIndex]
    setAnswers((prev) => ({ ...prev, [question.id]: answer }))
    if (currentIndex < quiz.length - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 200)
    }
  }

  const submitAssessment = useCallback(async () => {
    setSubmitting(true)
    setError('')
    try {
      const body = {
        answers: Object.entries(answers).map(([id, answer]) => ({
          question_id: parseInt(id),
          answer,
        })),
      }
      const res = await apiFetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Error ${res.status}`)
      }
      const data = await res.json()
      setResult(data)
      setSelectedLevel(data.cefr_level as string)
      setStep('result')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }, [answers])

  // ── Loading (initial check or quiz generation) ──
  if (loading || existingPlan === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase animate-pulse">
          {existingPlan === undefined ? 'Loading…' : 'Generating quiz…'}
        </span>
      </div>
    )
  }

  // ── Previous result ──
  if (existingPlan) {
    const assessedDate = new Date(existingPlan.created_at).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    })
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">Assessment</span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div>
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-2">Current Level</p>
              <p className="font-mono text-6xl font-bold text-fl-fg tracking-widest">{existingPlan.cefr_level}</p>
            </div>
            <div className="border border-fl-border py-3">
              <p className="font-mono text-fl-label text-fl-muted-3 tracking-widest uppercase">Assessed on</p>
              <p className="font-mono text-xs text-fl-muted-1 mt-1">{assessedDate}</p>
            </div>
            <p className="font-mono text-fl-label text-fl-muted-3 leading-relaxed">
              You already have an active study plan. Retaking the assessment will let you create a new plan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
              >
                ← Dashboard
              </button>
              <button
                onClick={startAssessment}
                className="flex-[2] bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright transition-colors"
              >
                — Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Error (quiz failed to load) ──
  if (!loading && quiz.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">Assessment</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="border border-fl-error/40 px-4 py-4">
              <p className="font-mono text-fl-label tracking-widest text-fl-error-fg uppercase mb-2">Error</p>
              <p className="font-mono text-xs text-fl-error-dim leading-relaxed">{error || 'Could not generate quiz'}</p>
            </div>
            <p className="font-mono text-fl-label text-fl-muted-3 leading-relaxed">
              Check that the AI provider is configured correctly in your <span className="text-fl-muted-1">.env</span> and the backend can reach it.
            </p>
            <button
              onClick={startAssessment}
              className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright transition-colors"
            >
              — Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Result ──
  const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  if (result && step === 'result') {
    const score = Math.round((result.score as number) * 100)
    const aiLevel = result.cefr_level as string
    const levelChanged = selectedLevel !== aiLevel
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">Result</span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div>
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-2">CEFR Level</p>
              <p className="font-mono text-6xl font-bold text-fl-fg tracking-widest">{aiLevel}</p>
            </div>
            <div className="border border-fl-border py-3">
              <p className="font-mono text-fl-label text-fl-muted-3 tracking-widest uppercase">Score</p>
              <p className="font-mono text-2xl text-fl-fg-2 mt-1">{score}%</p>
            </div>
            {/* Level override picker */}
            <div>
              <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">
                Start plan at level
              </p>
              <div className="flex gap-1 justify-center flex-wrap">
                {CEFR_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 font-mono text-xs font-bold tracking-widest border transition-colors ${selectedLevel === lvl
                      ? 'bg-fl-fg text-fl-bg border-fl-fg'
                      : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              {levelChanged && (
                <p className="font-mono text-fl-hint text-fl-muted-1 mt-2">
                  AI suggested {aiLevel} — plan will use {selectedLevel}
                </p>
              )}
            </div>
            {result.analysis != null && (
              <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{String(result.analysis)}</p>
            )}
            {(result.strengths as string[])?.length > 0 && (
              <div>
                <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">Strengths</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(result.strengths as string[]).map((s) => (
                    <span key={s} className="border border-fl-border px-3 py-1 font-mono text-fl-label text-fl-muted-1 uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(result.weaknesses as string[])?.length > 0 && (
              <div>
                <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">Needs Work</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(result.weaknesses as string[]).map((w) => (
                    <span key={w} className="border border-fl-error/30 px-3 py-1 font-mono text-fl-label text-fl-error-dim uppercase tracking-widest">{w}</span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setStep('schedule')}
              className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright transition-colors"
            >
              — Set Up My Schedule →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Schedule ──
  if (result && step === 'schedule') {
    const DAYS_OPTIONS = [1, 2, 3, 4, 5, 6, 7]
    const MINUTES_OPTIONS = [10, 15, 20, 30, 45, 60]
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">Schedule</span>
          </div>
          <div className="p-8 space-y-8">
            {/* Days per week */}
            <div>
              <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-3">Days per week</p>
              <div className="flex gap-1 flex-wrap">
                {DAYS_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDaysPerWeek(d)}
                    className={`w-10 h-10 font-mono text-xs font-bold border transition-colors ${daysPerWeek === d
                      ? 'bg-fl-fg text-fl-bg border-fl-fg'
                      : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            {/* Minutes per day */}
            <div>
              <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-3">Minutes per day</p>
              <div className="flex gap-1 flex-wrap">
                {MINUTES_OPTIONS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutesPerDay(m)}
                    className={`px-3 h-10 font-mono text-xs font-bold border transition-colors ${minutesPerDay === m
                      ? 'bg-fl-fg text-fl-bg border-fl-fg'
                      : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {/* Summary */}
            <div className="border border-fl-border px-4 py-3 font-mono text-fl-label text-fl-muted-1 tracking-wide">
              {selectedLevel} · {daysPerWeek}d/week · {minutesPerDay}min/day · 4 weeks
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep('result')}
                className="flex-1 border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={async () => {
                  setGeneratingPlan(true)
                  try {
                    await apiFetch('/api/study-plan/generate', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        cefr_level: selectedLevel,
                        goals: ['grammar', 'vocabulary', 'reading', 'writing'],
                        weeks: 4,
                        days_per_week: daysPerWeek,
                        minutes_per_day: minutesPerDay,
                        weaknesses: result.weaknesses ?? [],
                        strengths: result.strengths ?? [],
                        analysis: result.analysis ?? '',
                      }),
                    })
                  } catch { /* non-blocking */ } finally {
                    setGeneratingPlan(false)
                    router.push('/dashboard')
                  }
                }}
                disabled={generatingPlan}
                className="flex-[2] bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright disabled:opacity-40 transition-colors"
              >
                {generatingPlan ? '— Building your plan…' : '— Build My Plan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz ──
  const question = quiz[currentIndex]
  const progress = Math.round(((currentIndex + 1) / quiz.length) * 100)
  const allAnswered = Object.keys(answers).length === quiz.length

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 gap-6">
      <div className="w-full max-w-lg border border-fl-border bg-fl-surface">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fl-border">
          <div className="flex items-center gap-2">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Question {currentIndex + 1} / {quiz.length}
            </span>
          </div>
          <span className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase border border-fl-border px-2 py-1">
            {question?.difficulty}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-fl-border">
          <div className="h-px bg-fl-fg transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error-fg">✕ {error}</div>
          )}

          <p className="font-mono text-sm text-fl-fg-2 leading-relaxed">{question?.question}</p>

          <div className="space-y-2">
            {question?.options.map((opt) => {
              const letter = opt.split('.')[0]
              const isSelected = answers[question.id] === letter
              return (
                <button
                  key={letter}
                  onClick={() => selectAnswer(letter)}
                  className={`w-full text-left px-4 py-3 border font-mono text-xs tracking-wide transition-all ${isSelected
                    ? 'border-fl-fg bg-fl-fg text-fl-bg'
                    : 'border-fl-border text-fl-muted-0 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {allAnswered && currentIndex === quiz.length - 1 && (
            <button
              onClick={submitAssessment}
              disabled={submitting}
              className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright disabled:opacity-40 transition-colors mt-2"
            >
              {submitting ? '— Evaluating…' : '— Submit Answers'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
