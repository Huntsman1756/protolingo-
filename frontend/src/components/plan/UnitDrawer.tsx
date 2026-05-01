'use client'

import { useEffect, useRef } from 'react'
import type { CurriculumUnit } from '@/data/curriculum'

interface Lesson {
  id: number | null
  title: string
  lesson_type: string
  week: number
  day: number
  completed: boolean
}

interface Props {
  unit: CurriculumUnit
  lessons: Lesson[]
  onClose: () => void
  onStartLesson: (lessonId: number) => void
}

export default function UnitDrawer({ unit, lessons, onClose, onStartLesson }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const lessonTypeLabel: Record<string, string> = {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    reading: 'Reading',
    writing: 'Writing',
    conversation: 'Conversation',
    review: 'Review',
    level_test: 'Level Test',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-fl-bg/80 backdrop-blur-sm p-0 sm:p-4">
      <div
        ref={ref}
        className="w-full sm:max-w-lg max-h-[80vh] overflow-y-auto border border-fl-border bg-fl-surface"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fl-border sticky top-0 bg-fl-surface z-10">
          <div>
            <span className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase">
              {unit.level} · Unit
            </span>
            <p className="font-mono text-fl-body text-fl-fg mt-0.5">{unit.title}</p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-fl-muted-3 hover:text-fl-fg transition-colors text-lg leading-none"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Grammar points */}
        {unit.grammar_points.length > 0 && (
          <div className="px-6 py-4 border-b border-fl-border">
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-2">
              Grammar covered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {unit.grammar_points.map((gp) => (
                <span
                  key={gp}
                  className="font-mono text-fl-hint border border-fl-border px-2 py-1 text-fl-muted-1"
                >
                  {gp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lessons */}
        <div className="divide-y divide-fl-border">
          {lessons.length === 0 ? (
            <div className="px-6 py-6">
              <p className="font-mono text-fl-label text-fl-muted-3">
                No lessons scheduled yet for this unit.
              </p>
            </div>
          ) : (
            lessons.map((lesson, i) => (
              <div
                key={lesson.id ?? i}
                className="flex items-center gap-3 px-6 py-3"
              >
                <span className={`font-mono text-base w-4 shrink-0 ${lesson.completed ? 'text-fl-fg' : 'text-fl-muted-3'}`}>
                  {lesson.completed ? '✓' : '○'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-fl-label ${lesson.completed ? 'text-fl-muted-2 line-through' : 'text-fl-muted-1'}`}>
                    {lesson.title}
                  </p>
                  <p className="font-mono text-fl-hint text-fl-muted-3">
                    Week {lesson.week}, Day {lesson.day} ·{' '}
                    {lessonTypeLabel[lesson.lesson_type] ?? lesson.lesson_type}
                  </p>
                </div>
                {lesson.id != null && !lesson.completed && (
                  <button
                    onClick={() => onStartLesson(lesson.id!)}
                    className="font-mono text-fl-hint tracking-widest text-fl-muted-2 uppercase border border-fl-border px-3 py-1.5 hover:border-fl-border-2 hover:text-fl-fg transition-colors shrink-0"
                  >
                    Start
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Close */}
        <div className="px-6 py-4 border-t border-fl-border">
          <button
            onClick={onClose}
            className="w-full border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
