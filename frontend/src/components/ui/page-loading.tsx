'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLoadingStore } from '@/store/loading'

interface PageLoadingProps {
  /** Translated label. Defaults to common.loading. */
  label?: string
  /** Optional subtext shown below the main label. */
  subtext?: string
  /** Whether to show the ● decorative dot. Default true. */
  showDot?: boolean
  /** Container min-height Tailwind class. Default "min-h-[60vh]". */
  minHeight?: string
  /** Render as full-screen centered block. Set false for inline usage. */
  fullScreen?: boolean
  /** Extra classes for the outer container / span. */
  className?: string
}

export function PageLoading({
  label,
  subtext,
  showDot = true,
  minHeight = 'min-h-[60vh]',
  fullScreen = true,
  className = '',
}: PageLoadingProps) {
  const t = useTranslations('common')

  useEffect(() => {
    const { inc, dec } = useLoadingStore.getState()
    inc()
    return () => {
      dec()
    }
  }, [])

  const text = label ?? t('loading')

  if (!fullScreen) {
    return (
      <span
        className={`text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase ${className}`}
        role="status"
        aria-busy="true"
        aria-label={text}
      >
        {showDot && '● '}
        {text}
      </span>
    )
  }

  return (
    <div
      className={`flex ${minHeight} items-center justify-center ${className}`}
      role="status"
      aria-busy="true"
      aria-label={text}
    >
      <div className="flex flex-col items-center gap-3 px-4">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          {showDot && '● '}
          {text}
        </span>
        {subtext && (
          <p className="text-fl-muted-4 max-w-xs text-center font-mono text-xs">
            {subtext}
          </p>
        )}
      </div>
    </div>
  )
}
