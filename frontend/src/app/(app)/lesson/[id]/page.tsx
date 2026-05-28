'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useProgressStore } from '@/store/progress'
import { grammarTopics } from '@/data/grammar'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { VoiceRecorder } from '@/components/ui/VoiceRecorder'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface ExerciseItem {
  id: number
  exercise_type: string
  question: string
  options: string[] | null
  correct_answer: string
  explanation: string | null
  user_answer: string | null
  score: number | null
  feedback: string | null
}

interface LessonData {
  id: number
  title: string
  lesson_type: string
  cefr_level: string
  content: Record<string, unknown>
}

export default function LessonPage() {
  const t = useTranslations('lesson')
  const tCommon = useTranslations('common')
  const tPlan = useTranslations('dashboard')
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const completeLesson = useProgressStore((s) => s.completeLesson)

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [exercises, setExercises] = useState<ExerciseItem[]>([])
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answer, setAnswer] = useState('')
  const [evaluating, setEvaluating] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [dayComplete, setDayComplete] = useState(false)
  const [progressDayAtStart, setProgressDayAtStart] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const loadLesson = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch(`/api/lessons/${id}`)
      const data = await res.json()
      setLesson(data.lesson)
      setExercises(data.exercises)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadLesson()
  }, [loadLesson])

  // Capture progress_day at the time the lesson starts (for day-complete detection)
  useEffect(() => {
    apiFetch('/api/study-plan/today')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.progress_day !== undefined) setProgressDayAtStart(d.progress_day)
      })
      .catch(() => {})
  }, [])

  // Restore the answer field whenever the active exercise changes
  // (seeds previous user_answer for already-answered exercises, clears for fresh ones)
  useEffect(() => {
    const ex = exercises[currentExercise]
    setAnswer(
      ex?.score !== null && ex?.score !== undefined
        ? (ex.user_answer ?? '')
        : ''
    )
  }, [currentExercise, exercises])

  async function submitAnswer(overrideAnswer?: string) {
    const finalAnswer = overrideAnswer ?? answer
    if (!finalAnswer.trim()) return
    const exercise = exercises[currentExercise]
    setEvaluating(true)
    try {
      const res = await apiFetch(
        `/api/lessons/exercises/${exercise.id}/answer`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: finalAnswer }),
        }
      )
      const result = await res.json()
      setExercises((prev) => {
        const copy = [...prev]
        copy[currentExercise] = {
          ...copy[currentExercise],
          score: result.score,
          feedback: result.feedback,
          user_answer: finalAnswer,
        }
        return copy
      })
      if (overrideAnswer !== undefined) setAnswer(overrideAnswer)
    } catch {
      /* ignore */
    } finally {
      setEvaluating(false)
    }
  }

  function nextExercise() {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }

  async function completeLessonHandler() {
    await apiFetch(`/api/lessons/${id}/complete`, { method: 'POST' })
    if (lesson) completeLesson(lesson.id)
    // Detect if completing this lesson advanced the plan to the next day
    try {
      const todayRes = await apiFetch('/api/study-plan/today')
      if (todayRes.ok) {
        const d = await todayRes.json()
        if (progressDayAtStart >= 0 && d.progress_day > progressDayAtStart) {
          setDayComplete(true)
        }
      }
    } catch {
      /* ignore */
    }
    setCompleted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          {t('loading')}
        </span>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
        <div className="border-fl-border bg-fl-surface border px-10 py-10 text-center">
          <p className="text-fl-label text-fl-muted-2 mb-4 font-mono tracking-widest uppercase">
            ● {tCommon('complete')}
          </p>
          <p className="text-fl-fg font-mono text-xl font-bold tracking-widest">
            {t('lessonDone')}
          </p>
          {dayComplete && (
            <div className="border-fl-accent/30 bg-fl-accent/5 mt-6 border px-6 py-4">
              <p className="text-fl-accent font-mono text-sm font-bold tracking-widest">
                {t('dayComplete')}
              </p>
              <p className="text-fl-muted-1 mt-1 font-mono text-xs">
                {t('dayCompleteMsg')}
              </p>
            </div>
          )}
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 mt-8 px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
          >
            — {tCommon('backToDashboard')}
          </button>
        </div>
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const isEvaluated = exercise?.score !== null
  const explanation = lesson?.content?.explanation as
    | Record<string, unknown>
    | undefined

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        {/* Lesson header */}
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-fl-label text-fl-muted-2">●</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {t('label')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-fl-hint text-fl-muted-2 border-fl-border border px-2 py-1 font-mono tracking-widest uppercase">
                {lesson?.cefr_level}
              </span>
              <span className="text-fl-hint text-fl-muted-2 border-fl-border border px-2 py-1 font-mono tracking-widest uppercase">
                {lesson?.lesson_type
                  ? ((
                      {
                        grammar: tPlan('lessonTypes.grammar'),
                        vocabulary: tPlan('lessonTypes.vocabulary'),
                        reading: tPlan('lessonTypes.reading'),
                        writing: tPlan('lessonTypes.writing'),
                        review: tPlan('lessonTypes.review'),
                        level_test: tPlan('lessonTypes.level_test'),
                      } as Record<string, string>
                    )[lesson.lesson_type] ?? lesson.lesson_type)
                  : ''}
              </span>
              <button
                onClick={() => setShowExitConfirm(true)}
                className="text-fl-muted-3 hover:text-fl-fg ml-1 font-mono text-lg leading-none transition-colors"
                aria-label={t('exit')}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="px-6 py-5">
            <p className="text-fl-fg font-mono text-base font-bold tracking-wide">
              {lesson?.title}
            </p>
            {explanation && (
              <div className="mt-4 space-y-3">
                {explanation.text != null && (
                  <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                    {String(explanation.text)}
                  </p>
                )}
                {(explanation.key_points as string[])?.length > 0 && (
                  <ul className="border-fl-border space-y-1 border-t pt-3">
                    {(explanation.key_points as string[]).map((kp, i) => (
                      <li key={i} className="text-fl-muted-3 font-mono text-xs">
                        <span className="text-fl-muted-2 mr-2">·</span>
                        {kp}
                      </li>
                    ))}
                  </ul>
                )}
                {(explanation.examples as { sentence: string; note: string }[])
                  ?.length > 0 && (
                  <div className="border-fl-border space-y-2 border-t pt-3">
                    <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
                      {t('examples')}
                    </p>
                    {(
                      explanation.examples as {
                        sentence: string
                        note: string
                      }[]
                    ).map((ex, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-fl-muted-3 mt-0.5">·</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-fl-muted-1 font-mono text-xs italic">
                              {ex.sentence}
                            </span>
                            <AudioPlayer text={ex.sentence} size="sm" />
                          </div>
                          {ex.note && (
                            <p className="text-fl-hint text-fl-muted-3 mt-0.5 font-mono">
                              {ex.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Exercise */}
        {exercise && (
          <div className="border-fl-border bg-fl-surface border">
            <div className="border-fl-border flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-fl-label text-fl-muted-2">●</span>
                <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                  {t('exercise')} {currentExercise + 1} / {exercises.length}
                </span>
              </div>
              <span className="text-fl-hint text-fl-muted-2 border-fl-border border px-2 py-1 font-mono tracking-widest uppercase">
                {(
                  {
                    multiple_choice: t('exerciseTypeMultipleChoice'),
                    fill_blank: t('exerciseTypeFillBlank'),
                    free_write: t('exerciseTypeFreeWrite'),
                    pronunciation: t('exerciseTypePronunciation'),
                  } as Record<string, string>
                )[exercise.exercise_type] ?? exercise.exercise_type}
              </span>
            </div>

            {/* Progress bar */}
            <div className="bg-fl-border h-px">
              <div
                className="bg-fl-accent h-px transition-all duration-300"
                style={{
                  width: `${Math.round(((currentExercise + 1) / exercises.length) * 100)}%`,
                }}
              />
            </div>

            <div className="space-y-5 px-6 py-6">
              <p className="text-fl-fg font-mono text-sm leading-relaxed">
                {exercise.question}
              </p>

              {exercise.exercise_type === 'multiple_choice' &&
              exercise.options ? (
                <div className="space-y-2">
                  {exercise.options.map((opt) => {
                    const isSelected = answer === opt
                    return (
                      <button
                        key={opt}
                        disabled={isEvaluated}
                        onClick={() => setAnswer(opt)}
                        className={`w-full border px-4 py-3 text-left font-mono text-xs tracking-wide transition-colors disabled:opacity-60 ${
                          isSelected
                            ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
                            : 'border-fl-border text-fl-muted-1 hover:border-fl-border-2 hover:text-fl-fg'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              ) : exercise.exercise_type === 'pronunciation' ? (
                <div className="space-y-4">
                  {/* Target phrase + listen button */}
                  <div className="border-fl-border bg-fl-bg flex flex-wrap items-center gap-3 border px-4 py-4">
                    <span className="text-fl-fg flex-1 font-mono text-sm font-bold">
                      {exercise.correct_answer}
                    </span>
                    <AudioPlayer text={exercise.correct_answer} size="md" />
                  </div>
                  {exercise.options?.[0] && (
                    <p className="text-fl-hint text-fl-muted-3 font-mono">
                      {exercise.options[0]}
                    </p>
                  )}
                  {!isEvaluated && (
                    <VoiceRecorder
                      onTranscription={(text) => submitAnswer(text)}
                      maxSeconds={8}
                      disabled={evaluating}
                    />
                  )}
                  {evaluating && (
                    <p className="text-fl-hint text-fl-muted-3 animate-pulse font-mono tracking-widest uppercase">
                      {tCommon('checking')}
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  className="bg-fl-bg border-fl-border text-fl-fg placeholder:text-fl-muted-4 focus:border-fl-border-2 min-h-[90px] w-full resize-y border px-4 py-3 font-mono text-xs transition-colors focus:outline-none"
                  placeholder={t('yourAnswer')}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isEvaluated}
                />
              )}

              {!isEvaluated ? (
                exercise.exercise_type !== 'pronunciation' ? (
                  <button
                    onClick={() => submitAnswer()}
                    disabled={evaluating || !answer.trim()}
                    className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 w-full py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-40"
                  >
                    {evaluating
                      ? `— ${tCommon('checking')}`
                      : `— ${t('submitAnswer')}`}
                  </button>
                ) : null
              ) : (
                <div className="space-y-4">
                  {exercise.feedback && (
                    <div className="border-fl-border border px-4 py-4">
                      <p className="text-fl-label text-fl-muted-2 mb-2 font-mono tracking-widest uppercase">
                        {t('feedback')}
                      </p>
                      <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                        {exercise.feedback}
                      </p>
                    </div>
                  )}
                  {exercise.explanation && (
                    <div className="border-fl-border border px-4 py-4">
                      <p className="text-fl-label text-fl-muted-2 mb-2 font-mono tracking-widest uppercase">
                        {t('explanation')}
                      </p>
                      <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                        {exercise.explanation}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="border-fl-border border px-4 py-2">
                      <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                        {tCommon('score')}{' '}
                      </span>
                      <span className="text-fl-fg font-mono text-sm font-bold">
                        {exercise.score !== null
                          ? Math.round((exercise.score ?? 0) * 100) + '%'
                          : 'N/A'}
                      </span>
                    </div>
                    {currentExercise < exercises.length - 1 ? (
                      <button
                        onClick={nextExercise}
                        className="border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-6 py-2 font-mono text-xs tracking-widest uppercase transition-colors"
                      >
                        {tCommon('next')} →
                      </button>
                    ) : (
                      <button
                        onClick={completeLessonHandler}
                        className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
                      >
                        — {t('completeLesson')}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vocabulary */}
        {(() => {
          const vocabItems = (lesson?.content?.vocabulary ?? []) as Array<
            Record<string, string>
          >
          if (!vocabItems.length) return null
          return (
            <div className="border-fl-border bg-fl-surface border p-5">
              <p className="text-fl-label text-fl-muted-2 mb-3 font-mono tracking-widest uppercase">
                {t('vocabulary')}
              </p>
              <div className="space-y-3">
                {vocabItems.map((item, idx) => (
                  <div key={idx} className="border-fl-border border px-4 py-3">
                    <p className="text-fl-fg mb-1 font-mono text-xs font-semibold tracking-wide">
                      {item.word}
                    </p>
                    {item.definition && (
                      <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                        {item.definition}
                      </p>
                    )}
                    {item.example && (
                      <p className="text-fl-muted-2 mt-1 font-mono text-xs italic">
                        {item.example}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* Related Grammar */}
        {(() => {
          const grammarRefs = (lesson?.content?.grammar_refs ?? []) as string[]
          if (!grammarRefs.length) return null
          return (
            <div className="border-fl-border bg-fl-surface border p-5">
              <p className="text-fl-label text-fl-muted-2 mb-3 font-mono tracking-widest uppercase">
                {t('relatedGrammar')}
              </p>
              <div className="flex flex-wrap gap-2">
                {grammarRefs.map((slug) => {
                  const topic = grammarTopics.find((t) => t.slug === slug)
                  if (!topic) return null
                  return (
                    <Link
                      key={slug}
                      href={`/grammar/${slug}`}
                      className="border-fl-border text-fl-label text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors"
                    >
                      ● {topic.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })()}
      </div>

      <ConfirmDialog
        open={showExitConfirm}
        title={t('exitConfirmTitle')}
        message={t('exitConfirmMessage')}
        confirmLabel={t('exit')}
        danger
        onConfirm={() => router.push('/dashboard')}
        onCancel={() => setShowExitConfirm(false)}
      />
    </>
  )
}
