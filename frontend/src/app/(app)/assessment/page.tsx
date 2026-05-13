'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import BeginnerGate from '@/components/assessment/BeginnerGate'
import AdaptiveQuizCard from '@/components/assessment/AdaptiveQuizCard'
import DurationSelector, {
  DURATION_OPTIONS,
  type DurationOption,
} from '@/components/assessment/DurationSelector'
import {
  pickNextQuestion,
  adjustLevel,
  type AssessmentQuestion,
} from '@/data/assessment-bank'
import { CEFR_LEVELS } from '@/data/curriculum'
import type { CEFRLevel } from '@/data/grammar'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

// ── Types ──────────────────────────────────────────────────────────────────────

interface AnswerRecord {
  question_id: string
  skill: string
  difficulty: string
  correct: boolean
}

interface AssessmentResult {
  cefr_level: string
  score: number
  skill_profile: Record<string, number>
  strengths: string[]
  weaknesses: string[]
}

interface ExistingPlan {
  cefr_level: string
  created_at: string
}

type FlowStep =
  | 'checking'
  | 'existing'
  | 'beginner-gate'
  | 'quiz'
  | 'result'
  | 'duration'

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_QUESTIONS = 15
const CORRECT_STREAK_TO_UP = 2
const WRONG_STREAK_TO_DOWN = 2
const START_LEVEL: CEFRLevel = 'A2'

// ── Component ─────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const t = useTranslations('assessment')
  const tCommon = useTranslations('common')
  const router = useRouter()

  const [step, setStep] = useState<FlowStep>('checking')
  const [existingPlan, setExistingPlan] = useState<ExistingPlan | null>(null)
  const [error, setError] = useState('')

  const [currentQuestion, setCurrentQuestion] = useState<AssessmentQuestion | null>(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [usedIds] = useState<Set<string>>(() => new Set())
  const [currentLevel, setCurrentLevel] = useState<CEFRLevel>(START_LEVEL)
  const [correctStreak, setCorrectStreak] = useState(0)
  const [wrongStreak, setWrongStreak] = useState(0)

  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1')
  const [evaluating, setEvaluating] = useState(false)

  const [durationOption, setDurationOption] = useState<DurationOption>(DURATION_OPTIONS[2])
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['grammar', 'vocabulary'])
  const [submitting, setSubmitting] = useState(false)

  // Warning dialog shown before the adaptive quiz starts
  const [showStartWarning, setShowStartWarning] = useState(false)

  useEffect(() => {
    async function check() {
      try {
        const res = await apiFetch('/api/study-plan/current')
        if (res.ok) {
          const plan = await res.json()
          if (plan?.cefr_level) {
            setExistingPlan(plan as ExistingPlan)
            setStep('existing')
            return
          }
        }
      } catch { /* no plan */ }
      setStep('beginner-gate')
    }
    void check()
  }, [])

  function loadNextQuestion(level: CEFRLevel, usedSet: Set<string>) {
    const q = pickNextQuestion(usedSet, level)
    if (q) {
      usedSet.add(q.id)
      setCurrentQuestion(q)
    } else {
      void evaluateQuiz([...answers])
    }
  }

  function startQuiz() {
    usedIds.clear()
    setAnswers([])
    setCurrentLevel(START_LEVEL)
    setCorrectStreak(0)
    setWrongStreak(0)
    const q = pickNextQuestion(usedIds, START_LEVEL)
    if (q) {
      usedIds.add(q.id)
      setCurrentQuestion(q)
      setQuestionNumber(1)
      setStep('quiz')
    }
  }

  function handleAnswer(chosen: string) {
    if (!currentQuestion) return

    const isCorrect = chosen === currentQuestion.correct
    const record: AnswerRecord = {
      question_id: currentQuestion.id,
      skill: currentQuestion.skill,
      difficulty: currentQuestion.difficulty,
      correct: isCorrect,
    }
    const newAnswers = [...answers, record]
    setAnswers(newAnswers)

    let newCorrect = correctStreak
    let newWrong = wrongStreak
    let newLevel = currentLevel

    if (isCorrect) {
      newCorrect += 1
      newWrong = 0
      if (newCorrect >= CORRECT_STREAK_TO_UP) {
        newLevel = adjustLevel(currentLevel, 'up')
        newCorrect = 0
      }
    } else {
      newWrong += 1
      newCorrect = 0
      if (newWrong >= WRONG_STREAK_TO_DOWN) {
        newLevel = adjustLevel(currentLevel, 'down')
        newWrong = 0
      }
    }

    setCorrectStreak(newCorrect)
    setWrongStreak(newWrong)

    if (newAnswers.length >= MAX_QUESTIONS) {
      void evaluateQuiz(newAnswers)
      return
    }

    setCurrentLevel(newLevel)
    setQuestionNumber((n) => n + 1)
    setTimeout(() => loadNextQuestion(newLevel, usedIds), 150)
  }

  async function evaluateQuiz(answersToSend: AnswerRecord[]) {
    setEvaluating(true)
    setCurrentQuestion(null)
    try {
      const res = await apiFetch('/api/assessment/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersToSend }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error((d as { detail?: string }).detail ?? `Error ${res.status}`)
      }
      const data = (await res.json()) as AssessmentResult
      setResult(data)
      setSelectedLevel(data.cefr_level as CEFRLevel)
      setStep('result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed')
    } finally {
      setEvaluating(false)
    }
  }

  async function handleComplete() {
    if (!result) return
    setSubmitting(true)
    setError('')
    try {
      const res = await apiFetch('/api/assessment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cefr_level: selectedLevel,
          skill_profile: result.skill_profile,
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          duration_weeks: durationOption.weeks,
          days_per_week: durationOption.daysPerWeek,
          goals: selectedGoals,
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error((d as { detail?: string }).detail ?? `Error ${res.status}`)
      }
      router.push('/plan')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create plan')
      setSubmitting(false)
    }
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (step === 'checking' || (step === 'quiz' && (evaluating || !currentQuestion))) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase animate-pulse">
          {evaluating ? t('evaluating') : tCommon('loading')}
        </span>
      </div>
    )
  }

  // ── Existing plan ─────────────────────────────────────────────────────────
  if (step === 'existing' && existingPlan) {
    const assessedDate = new Date(existingPlan.created_at).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              {t('title')}
            </span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div>
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-2">
                {t('currentLevel')}
              </p>
              <p className="font-mono text-6xl font-bold text-fl-fg tracking-widest">
                {existingPlan.cefr_level}
              </p>
            </div>
            <div className="border border-fl-border py-3">
              <p className="font-mono text-fl-label text-fl-muted-3 tracking-widest uppercase">
                {t('assessedOn')}
              </p>
              <p className="font-mono text-xs text-fl-muted-1 mt-1">{assessedDate}</p>
            </div>
            <p className="font-mono text-fl-label text-fl-muted-3 leading-relaxed">
              {t('alreadyHasPlan')}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
              >
                ← {tCommon('backToDashboard')}
              </button>
              <button
                onClick={() => setStep('beginner-gate')}
                className="flex-[2] bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors"
              >
                — {t('retake')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── BeginnerGate ──────────────────────────────────────────────────────────
  if (step === 'beginner-gate') {
    return (
      <>
        <BeginnerGate
          onBeginner={() => {
            setResult({
              cefr_level: 'A1',
              score: 0,
              skill_profile: {},
              strengths: [],
              weaknesses: [],
            })
            setSelectedLevel('A1')
            setAnswers([])
            setStep('duration')
          }}
          onHasExperience={() => setShowStartWarning(true)}
        />
        <ConfirmDialog
          open={showStartWarning}
          title={t('startWarningTitle')}
          message={t('startWarningMessage')}
          confirmLabel={t('startWarningConfirm')}
          onConfirm={() => {
            setShowStartWarning(false)
            startQuiz()
          }}
          onCancel={() => setShowStartWarning(false)}
        />
      </>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (step === 'quiz' && currentQuestion) {
    return (
      <AdaptiveQuizCard
        question={currentQuestion}
        questionNumber={questionNumber}
        totalQuestions={MAX_QUESTIONS}
        onAnswer={handleAnswer}
      />
    )
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (step === 'result' && result) {
    const score = Math.round(result.score * 100)
    const aiLevel = result.cefr_level
    const levelChanged = selectedLevel !== aiLevel
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              {t('resultStep')}
            </span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div>
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-2">
                {t('cefrLevel')}
              </p>
              <p className="font-mono text-6xl font-bold text-fl-fg tracking-widest">{aiLevel}</p>
            </div>
            <div className="border border-fl-border py-3">
              <p className="font-mono text-fl-label text-fl-muted-3 tracking-widest uppercase">{tCommon('score')}</p>
              <p className="font-mono text-2xl text-fl-fg-2 mt-1">{score}%</p>
            </div>
            <div>
              <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">
                {t('overrideLevel')}
              </p>
              <div className="flex gap-1 justify-center flex-wrap">
                {CEFR_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 font-mono text-xs font-bold tracking-widest border transition-colors ${selectedLevel === lvl
                        ? 'bg-fl-accent text-fl-accent-fg border-fl-accent'
                        : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              {levelChanged && (
                <p className="font-mono text-fl-hint text-fl-muted-1 mt-2">
                  {t('suggestedLevel', { aiLevel, selectedLevel })}
                </p>
              )}
            </div>
            {result.strengths.length > 0 && (
              <div>
                <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">
                  {t('strengths')}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {result.strengths.map((s) => (
                    <span
                      key={s}
                      className="border border-fl-border px-3 py-1 font-mono text-fl-label text-fl-muted-1 uppercase tracking-widest"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.weaknesses.length > 0 && (
              <div>
                <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">
                  {t('needsWork')}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {result.weaknesses.map((w) => (
                    <span
                      key={w}
                      className="border border-fl-error/30 px-3 py-1 font-mono text-fl-label text-fl-error-dim uppercase tracking-widest"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {error && (
              <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error-fg">
                ✕ {error}
              </div>
            )}
            <button
              onClick={() => setStep('duration')}
              className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors"
            >
              — {t('createPlan')} →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Duration + goals ──────────────────────────────────────────────────────
  if (step === 'duration') {
    return (
      <DurationSelector
        selectedWeeks={durationOption.weeks}
        selectedGoals={selectedGoals}
        onSelectDuration={setDurationOption}
        onToggleGoal={(goal) =>
          setSelectedGoals((prev) =>
            prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
          )
        }
        onConfirm={handleComplete}
        onBack={() => {
          const isBeginner =
            result?.score === 0 &&
            result?.cefr_level === 'A1' &&
            answers.length === 0
          setStep(isBeginner ? 'beginner-gate' : 'result')
        }}
        cefr_level={selectedLevel}
        loading={submitting}
      />
    )
  }

  return null
}
