'use client'

import { type ReactNode } from 'react'

interface UnitStatus {
  completed: boolean
  active: boolean
  locked: boolean
  isLevelTest: boolean
}

interface Props {
  unitId: string
  title: string
  index: number
  lessonCount: number
  grammarCount: number
  competency: number       // 0–1, completion ratio
  status: UnitStatus
  onClick: () => void
}

function StatusIcon({ status }: { status: UnitStatus }): ReactNode {
  if (status.isLevelTest) return <span className="text-fl-muted-1">⊞</span>
  if (status.completed) return <span className="text-fl-fg">✓</span>
  if (status.active) return <span className="text-fl-fg animate-pulse">●</span>
  if (status.locked) return <span className="text-fl-muted-3">○</span>
  return <span className="text-fl-muted-2">◦</span>
}

export default function UnitCard({
  unitId,
  title,
  index,
  lessonCount,
  grammarCount,
  competency,
  status,
  onClick,
}: Props) {
  const barWidth = Math.round(competency * 100)

  return (
    <button
      onClick={onClick}
      disabled={status.locked}
      className={`w-full text-left border transition-colors group ${status.locked
          ? 'border-fl-border opacity-40 cursor-default'
          : status.active
            ? 'border-fl-fg bg-fl-surface hover:bg-fl-surface-2'
            : 'border-fl-border bg-fl-surface hover:border-fl-border-2'
        }`}
      aria-label={`Unit ${index + 1}: ${title}`}
    >
      {/* Top bar: status + index + title */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="font-mono text-base w-4 shrink-0">
          <StatusIcon status={status} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`font-mono text-fl-label truncate ${status.locked ? 'text-fl-muted-3' : 'text-fl-muted-1 group-hover:text-fl-fg'
                }`}
            >
              {title}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono text-fl-hint text-fl-muted-3">
              {lessonCount} lessons
            </span>
            {grammarCount > 0 && (
              <span className="font-mono text-fl-hint text-fl-muted-3">
                {grammarCount} grammar
              </span>
            )}
            {status.isLevelTest && (
              <span className="font-mono text-fl-hint text-fl-muted-2 uppercase tracking-widest border border-fl-border px-1.5 py-0.5">
                Level Test
              </span>
            )}
          </div>
        </div>
        {!status.locked && (
          <span className="font-mono text-fl-hint text-fl-muted-3 shrink-0">
            {barWidth}%
          </span>
        )}
      </div>

      {/* Progress bar */}
      {!status.locked && (
        <div className="h-px bg-fl-border">
          <div
            className="h-px bg-fl-fg transition-all duration-500"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      )}
    </button>
  )
}
