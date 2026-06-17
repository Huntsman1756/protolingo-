'use client'

import { type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  eyebrow: string
  actions?: ReactNode
}

export function AdminPageHeader({
  title,
  eyebrow,
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
            {eyebrow}
          </span>
        </div>
        <h1 className="text-fl-fg font-mono text-xl font-semibold tracking-normal">
          {title}
        </h1>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function AdminPanel({
  title,
  meta,
  children,
}: {
  title?: string
  meta?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="border-fl-border bg-fl-surface border">
      {(title || meta) && (
        <div className="border-fl-border flex flex-wrap items-center gap-2 border-b px-5 py-4">
          {title && (
            <>
              <span className="text-fl-label text-fl-muted-2">●</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {title}
              </span>
            </>
          )}
          {meta && <div className="ml-auto">{meta}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export function AdminMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: ReactNode
  icon: LucideIcon
}) {
  return (
    <div className="border-fl-border bg-fl-surface flex items-center justify-between gap-3 border px-4 py-3">
      <div className="min-w-0">
        <p className="text-fl-label text-fl-muted-4 mb-1 font-mono tracking-widest uppercase">
          {label}
        </p>
        <p className="text-fl-fg truncate font-mono text-lg">{value}</p>
      </div>
      <Icon className="text-fl-muted-3 size-5 shrink-0" aria-hidden="true" />
    </div>
  )
}

export function AdminBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
}) {
  const toneClass = {
    neutral: 'border-fl-border text-fl-muted-2',
    info: 'border-blue-500/40 text-blue-400',
    success: 'border-green-500/40 text-green-400',
    warning: 'border-yellow-500/40 text-yellow-400',
    danger: 'border-fl-error/30 text-fl-error-fg',
  }[tone]

  return (
    <span
      className={`text-fl-hint inline-flex border px-2 py-0.5 font-mono tracking-widest uppercase ${toneClass}`}
    >
      {children}
    </span>
  )
}
