'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { useProgressStore } from '@/store/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadLesson()
  }, [loadLesson])

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
        copy[currentExercise] = {
          ...copy[currentExercise],
          score: result.score,
          feedback: result.feedback,
          user_answer: answer,
        }
        return copy
      })
    } catch {
      // ignore
    } finally {
      setEvaluating(false)
    }
  }

  function nextExercise() {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setAnswer('')
    }
  }

  async function completeLessonHandler() {
    await apiFetch(`/api/lessons/${id}/complete`, { method: 'POST' })
    if (lesson) {
      completeLesson(lesson.id)
    }
    setCompleted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Loading lesson...</p>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 gap-4">
        <p className="text-2xl font-bold">Lesson Completed! 🎉</p>
        <Button onClick={() => (window.location.href = '/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const exercise = exercises[currentExercise]
  const isEvaluated = exercise?.score !== null

  const explanation = lesson?.content?.explanation as Record<string, unknown> | undefined

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{lesson?.title}</CardTitle>
          <p className="text-sm text-zinc-500">
            {lesson?.lesson_type} · {lesson?.cefr_level}
          </p>
        </CardHeader>
        {explanation && (
          <CardContent>
            <p className="text-sm leading-relaxed">{explanation.text as string}</p>
            {(explanation.key_points as string[]) && (
              <ul className="mt-3 space-y-1">
                {(explanation.key_points as string[]).map((kp: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">
                    • {kp}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        )}
      </Card>

      {exercise && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Exercise {currentExercise + 1} of {exercises.length}
              </CardTitle>
              <span className="text-xs rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                {exercise.exercise_type}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">{exercise.question}</p>

            {exercise.exercise_type === 'multiple_choice' && exercise.options ? (
              <div className="space-y-2">
                {exercise.options.map((opt: string) => {
                  const letter = opt.split('.')[0]
                  return (
                    <Button
                      key={letter}
                      variant={answer === letter ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setAnswer(letter)}
                      disabled={isEvaluated}
                    >
                      {opt}
                    </Button>
                  )
                })}
              </div>
            ) : (
              <textarea
                className="w-full rounded-lg border p-3 text-sm min-h-[80px]"
                placeholder="Type your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isEvaluated}
              />
            )}

            {!isEvaluated ? (
              <Button onClick={submitAnswer} disabled={evaluating} className="w-full">
                {evaluating ? 'Checking...' : 'Submit Answer'}
              </Button>
            ) : (
              <div className="space-y-3">
                {exercise.feedback && (
                  <div className="rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
                    {exercise.feedback}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    Score:{' '}
                    {exercise.score !== null
                      ? Math.round((exercise.score ?? 0) * 100) + '%'
                      : 'N/A'}
                  </span>
                  {currentExercise < exercises.length - 1 ? (
                    <Button variant="outline" onClick={nextExercise}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={completeLessonHandler}>
                      Complete Lesson
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
