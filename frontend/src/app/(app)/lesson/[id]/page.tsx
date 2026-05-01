'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { useProgressStore } from '@/store/progress'

interface ExerciseItem {
  id: number
  exercise_type: string
  question: string
  options: string[] | null
  correct_answer: string
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
  const [loading, setLoading] = useState(true)

  const loadLesson = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch(`/api/lessons/${id}`)
      const data = await res.json()
      setLesson(data.lesson)
      setExercises(data.exercises)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [id])

  useEffect(() => { loadLesson() }, [loadLesson])

  async function submitAnswer() {
    if (!answer.trim()) return
    const exercise = exercises[currentExercise]
    setEvaluating(true)
    try {
      const res = await apiFetch(`/api/lessons/exercises/${exercise.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      })
      const result = await res.json()
      setExercises((prev) => {
        const copy = [...prev]
        copy[currentExercise] = { ...copy[currentExercise], score: result.score, feedback: result.feedback, user_answer: answer }
        return copy
      })
    } catch { /* ignore */ }
    finally { setEvaluating(false) }
  }

  function nextExercise() {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setAnswer('')
    }
  }

  async function completeLessonHandler() {
    await apiFetch(`/api/lessons/${id}/complete`, { method: 'POST' })
    if (lesson) completeLesson(lesson.id)
    setCompleted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">Loading lesson…</span>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
        <div className="border border-fl-border bg-fl-surface px-10 py-10 text-center">
          <p className="font-mono text-[10px] tracking-widest text-fl-muted-2 uppercase mb-4">● Complete</p>
          <p className="font-mono text-xl font-bold text-fl-fg tracking-widest">LESSON DONE</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-8 bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-fl-fg-bright transition-colors"
          >
            — Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const isEvaluated = exercise?.score !== null
  const explanation = lesson?.content?.explanation as Record<string, unknown> | undefined

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      {/* Lesson header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center justify-between px-6 py-4 border-b border-fl-border">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-fl-muted-2">●</span>
            <span className="font-mono text-[10px] tracking-widest text-fl-muted-2 uppercase">Lesson</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-fl-muted-2 tracking-widest uppercase border border-fl-border px-2 py-1">{lesson?.cefr_level}</span>
            <span className="font-mono text-[9px] text-fl-muted-2 tracking-widest uppercase border border-fl-border px-2 py-1">{lesson?.lesson_type}</span>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="font-mono text-base font-bold text-fl-fg tracking-wide">{lesson?.title}</p>
          {explanation && (
            <div className="mt-4 space-y-3">
              {explanation.text != null && (
                <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{String(explanation.text)}</p>
              )}
              {(explanation.key_points as string[])?.length > 0 && (
                <ul className="space-y-1 border-t border-fl-border pt-3">
                  {(explanation.key_points as string[]).map((kp, i) => (
                    <li key={i} className="font-mono text-xs text-fl-muted-3">
                      <span className="text-fl-muted-2 mr-2">·</span>{kp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Exercise */}
      {exercise && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center justify-between px-6 py-4 border-b border-fl-border">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-fl-muted-2">●</span>
              <span className="font-mono text-[10px] tracking-widest text-fl-muted-2 uppercase">
                Exercise {currentExercise + 1} / {exercises.length}
              </span>
            </div>
            <span className="font-mono text-[9px] text-fl-muted-2 tracking-widest uppercase border border-fl-border px-2 py-1">{exercise.exercise_type}</span>
          </div>

          {/* Progress bar */}
          <div className="h-px bg-fl-border">
            <div
              className="h-px bg-fl-fg transition-all duration-300"
              style={{ width: `${Math.round(((currentExercise + 1) / exercises.length) * 100)}%` }}
            />
          </div>

          <div className="px-6 py-6 space-y-5">
            <p className="font-mono text-sm text-fl-fg leading-relaxed">{exercise.question}</p>

            {exercise.exercise_type === 'multiple_choice' && exercise.options ? (
              <div className="space-y-2">
                {exercise.options.map((opt) => {
                  const letter = opt.split('.')[0]
                  const isSelected = answer === letter
                  return (
                    <button
                      key={letter}
                      disabled={isEvaluated}
                      onClick={() => setAnswer(letter)}
                      className={`w-full text-left px-4 py-3 border font-mono text-xs tracking-wide transition-colors disabled:opacity-60 ${isSelected
                          ? 'border-fl-fg bg-fl-fg text-fl-bg'
                          : 'border-fl-border text-fl-muted-1 hover:border-fl-border-2 hover:text-fl-fg'
                        }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            ) : (
              <textarea
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors resize-none"
                style={{ minHeight: 90 }}
                placeholder="Type your answer…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isEvaluated}
              />
            )}

            {!isEvaluated ? (
              <button
                onClick={submitAnswer}
                disabled={evaluating || !answer.trim()}
                className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright disabled:opacity-40 transition-colors"
              >
                {evaluating ? '— Checking…' : '— Submit Answer'}
              </button>
            ) : (
              <div className="space-y-4">
                {exercise.feedback && (
                  <div className="border border-fl-border px-4 py-4">
                    <p className="font-mono text-[10px] tracking-widest text-fl-muted-2 uppercase mb-2">Feedback</p>
                    <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{exercise.feedback}</p>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="border border-fl-border px-4 py-2">
                    <span className="font-mono text-[10px] text-fl-muted-2 tracking-widest uppercase">Score </span>
                    <span className="font-mono text-sm font-bold text-fl-fg">
                      {exercise.score !== null ? Math.round((exercise.score ?? 0) * 100) + '%' : 'N/A'}
                    </span>
                  </div>
                  {currentExercise < exercises.length - 1 ? (
                    <button
                      onClick={nextExercise}
                      className="border border-fl-border px-6 py-2 font-mono text-xs tracking-widest text-fl-muted-1 uppercase hover:text-fl-fg hover:border-fl-border-2 transition-colors"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={completeLessonHandler}
                      className="bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase px-6 py-2 hover:bg-fl-fg-bright transition-colors"
                    >
                      — Complete Lesson
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
