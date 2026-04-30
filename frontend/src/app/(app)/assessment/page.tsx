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

export default function AssessmentPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const startAssessment = useCallback(async () => {
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

  useEffect(() => { startAssessment() }, [startAssessment])

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }, [answers])

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-[#666] tracking-widest uppercase animate-pulse">Generating quiz…</span>
      </div>
    )
  }

  // ── Error (quiz failed to load) ──
  if (!loading && quiz.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-[#2a2a2a] bg-[#111]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
            <span className="text-[10px] text-[#666]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Assessment</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="border border-[#ff3b3b]/40 px-4 py-4">
              <p className="font-mono text-[10px] tracking-widest text-[#ff6b6b] uppercase mb-2">Error</p>
              <p className="font-mono text-xs text-[#cc6666] leading-relaxed">{error || 'Could not generate quiz'}</p>
            </div>
            <p className="font-mono text-[10px] text-[#666] leading-relaxed">
              Check that the AI provider is configured correctly in your <span className="text-[#888]">.env</span> and the backend can reach it.
            </p>
            <button
              onClick={startAssessment}
              className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white transition-colors"
            >
              — Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Result ──
  if (result) {
    const score = Math.round((result.score as number) * 100)
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-[#2a2a2a] bg-[#111]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
            <span className="text-[10px] text-[#666]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Result</span>
          </div>
          <div className="p-8 text-center space-y-6">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-[#666] uppercase mb-2">CEFR Level</p>
              <p className="font-mono text-6xl font-bold text-[#f5f5f5] tracking-widest">{result.cefr_level as string}</p>
            </div>
            <div className="border border-[#2a2a2a] py-3">
              <p className="font-mono text-[10px] text-[#666] tracking-widest uppercase">Score</p>
              <p className="font-mono text-2xl text-[#e0e0e0] mt-1">{score}%</p>
            </div>
            {result.analysis != null && (
              <p className="font-mono text-xs text-[#888] leading-relaxed">{String(result.analysis)}</p>
            )}
            {(result.strengths as string[])?.length > 0 && (
              <div>
                <p className="font-mono text-[9px] tracking-widest text-[#666] uppercase mb-2">Strengths</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(result.strengths as string[]).map((s) => (
                    <span key={s} className="border border-[#2a2a2a] px-3 py-1 font-mono text-[10px] text-[#888] uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(result.weaknesses as string[])?.length > 0 && (
              <div>
                <p className="font-mono text-[9px] tracking-widest text-[#666] uppercase mb-2">Needs Work</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(result.weaknesses as string[]).map((w) => (
                    <span key={w} className="border border-[#ff3b3b]/30 px-3 py-1 font-mono text-[10px] text-[#cc6666] uppercase tracking-widest">{w}</span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white transition-colors"
            >
              — Go to Dashboard
            </button>
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
      <div className="w-full max-w-lg border border-[#2a2a2a] bg-[#111]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#666]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">
              Question {currentIndex + 1} / {quiz.length}
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-widest text-[#666] uppercase border border-[#2a2a2a] px-2 py-1">
            {question?.difficulty}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-[#2a2a2a]">
          <div className="h-px bg-[#f5f5f5] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="border border-[#ff3b3b]/40 px-4 py-3 font-mono text-xs text-[#ff6b6b]">✕ {error}</div>
          )}

          <p className="font-mono text-sm text-[#e0e0e0] leading-relaxed">{question?.question}</p>

          <div className="space-y-2">
            {question?.options.map((opt) => {
              const letter = opt.split('.')[0]
              const isSelected = answers[question.id] === letter
              return (
                <button
                  key={letter}
                  onClick={() => selectAnswer(letter)}
                  className={`w-full text-left px-4 py-3 border font-mono text-xs tracking-wide transition-all ${isSelected
                      ? 'border-[#f5f5f5] bg-[#f5f5f5] text-[#0a0a0a]'
                      : 'border-[#2a2a2a] text-[#999] hover:border-[#444] hover:text-[#f5f5f5]'
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
              className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white disabled:opacity-40 transition-colors mt-2"
            >
              {submitting ? '— Evaluating…' : '— Submit Answers'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
