'use client'

import type { AssessmentQuestion } from '@/data/assessment-bank'

interface Props {
  question: AssessmentQuestion
  questionNumber: number
  totalQuestions: number
  onAnswer: (answer: string) => void
}

export default function AdaptiveQuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const progress = Math.round((questionNumber / totalQuestions) * 100)

  const skillLabel: Record<string, string> = {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    reading: 'Reading',
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="w-full max-w-lg border border-fl-border bg-fl-surface">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fl-border">
          <div className="flex items-center gap-2">
            <span className="text-fl-label text-fl-muted-3">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Step 2 / 3 — Question {questionNumber} / {totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase border border-fl-border px-2 py-1">
              {question.difficulty}
            </span>
            <span className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase border border-fl-border px-2 py-1">
              {skillLabel[question.skill] ?? question.skill}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-fl-border">
          <div
            className="h-px bg-fl-fg transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="p-8 space-y-6">
          <p className="font-mono text-fl-body text-fl-fg leading-relaxed">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, i) => {
              const labels = ['A', 'B', 'C', 'D']
              return (
                <button
                  key={option}
                  onClick={() => onAnswer(option)}
                  className="w-full text-left flex items-start gap-3 px-4 py-3 border border-fl-border text-fl-muted-1 font-mono text-fl-label hover:border-fl-border-2 hover:text-fl-fg hover:bg-fl-surface-2 transition-colors"
                >
                  <span className="text-fl-muted-3 shrink-0">{labels[i]}.</span>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
