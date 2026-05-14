'use client'

import { type ReactNode } from 'react'
import { useTranslations } from 'next-intl'

interface UnitStatus {
  completed: boolean
  active: boolean
  locked: boolean
  isLevelTest: boolean
}

interface Props {
  title: string
  index: number
  lessonCount: number
  grammarCount: number
  competency: number       // 0–1, completion ratio
  status: UnitStatus
  onClick: () => void
  /** When provided and status.active, an EMPEZAR CTA is rendered on the card */
  onStartLesson?: () => void
}

function StatusIcon({ status }: { status: UnitStatus }): ReactNode {
  if (status.isLevelTest) return <span className="text-fl-muted-1">⊞</span>
  if (status.completed) return <span className="text-fl-fg">✓</span>
  if (status.active) return <span className="text-fl-fg animate-pulse">●</span>
  if (status.locked) return <span className="text-fl-muted-3">○</span>
  return <span className="text-fl-muted-2">◦</span>
}

export default function UnitCard({
  title,
  index,
  lessonCount,
  grammarCount,
  competency,
  status,
  onClick,
  onStartLesson,
}: Props) {
  const t = useTranslations('plan')
  const tCommon = useTranslations('common')
  const barWidth = Math.round(competency * 100)

  return (
    <div
      className={`w-full border transition-colors ${status.locked
        ? 'border-fl-border opacity-40'
        : status.active
          ? 'border-fl-fg bg-fl-surface'
          : 'border-fl-border bg-fl-surface'
        }`}
    >
      {/* Clickable card header — opens drawer */}
      <button
        onClick={onClick}
        disabled={status.locked}
        className={`w-full text-left group ${status.locked
          ? 'cursor-default'
          : status.active
            ? 'hover:bg-fl-surface-2'
            : 'hover:border-fl-border-2'
          }`}
        aria-label={t('unitAriaLabel', { index: index + 1, title })}
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
                {t('nLessons', { count: lessonCount })}
              </span>
              {grammarCount > 0 && (
                <span className="font-mono text-fl-hint text-fl-muted-3">
                  {t('nGrammar', { count: grammarCount })}
                </span>
              )}
              {status.isLevelTest && (
                <span className="font-mono text-fl-hint text-fl-muted-2 uppercase tracking-widest border border-fl-border px-1.5 py-0.5">
                  {t('levelTestLabel')}
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

      {/* EMPEZAR CTA — only shown on the active unit when a lesson is ready */}
      {status.active && onStartLesson && (
        <div className="border-t border-fl-fg/30 px-4 py-2.5 flex justify-end">
          <button
            onClick={onStartLesson}
            className="font-mono text-xs font-bold tracking-widest uppercase bg-fl-fg text-fl-bg px-4 py-2 hover:bg-fl-fg/90 transition-colors"
          >
            — {tCommon('start')} →
          </button>
        </div>
      )}
    </div>
  )
}
