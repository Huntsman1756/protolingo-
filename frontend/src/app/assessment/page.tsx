'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Question {
  id: number
  type: string
  difficulty: string
  question: string
  options: string[]
}

export default function AssessmentPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const startAssessment = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/assessment/start')
      if (!res.ok) throw new Error('Failed to start')
      const data = await res.json()
      setQuiz(data.quiz.questions)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to start assessment')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    startAssessment()
  }, [startAssessment])

  function selectAnswer(answer: string) {
    const question = quiz[currentIndex]
    setAnswers((prev) => ({ ...prev, [question.id]: answer }))
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const submitAssessment = useCallback(async () => {
    setLoading(true)
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
      if (!res.ok) throw new Error('Failed to submit')
      const data = await res.json()
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setLoading(false)
    }
  }, [answers])

  if (loading && quiz.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-zinc-500">Generating quiz...</p>
      </div>
    )
  }

  if (result) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Your CEFR Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-5xl font-bold text-blue-600">{result.cefr_level as string}</p>
            <p className="text-lg">Score: {Math.round((result.score as number) * 100)}%</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {result.analysis as string}
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {(result.strengths as string[])?.map((s) => (
                <span key={s} className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {(result.weaknesses as string[])?.map((w) => (
                <span key={w} className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                  {w}
                </span>
              ))}
            </div>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quiz[currentIndex]
  const progress = ((currentIndex + 1) / quiz.length) * 100

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>Question {currentIndex + 1} of {quiz.length}</span>
            <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
              {question?.difficulty}
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{question?.question}</p>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <div className="space-y-2">
            {question?.options.map((opt) => {
              const letter = opt.split('.')[0]
              const isSelected = answers[question.id] === letter
              return (
                <Button
                  key={letter}
                  variant={isSelected ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => selectAnswer(letter)}
                >
                  {opt}
                </Button>
              )
            })}
          </div>
          {currentIndex === quiz.length - 1 && Object.keys(answers).length === quiz.length && (
            <Button onClick={submitAssessment} className="w-full" disabled={loading}>
              {loading ? 'Evaluating...' : 'Submit Answers'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
