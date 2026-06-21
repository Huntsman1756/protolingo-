'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useLanguageStore } from '@/store/language'
import { PageLoading } from '@/components/ui/page-loading'

interface WeakReviewItem {
  id: number
  source_type: string
  source_id: string | null
  prompt: string
  correct_answer: string
  user_wrong_answer: string | null
  context: string | null
  language: string
  ease_factor: number
  interval: number
  repetitions: number
  consecutive_failures: number
}

interface WeakReviewStats {
  total: number
  due: number
  breakdown: Record<string, number>
}

const SOURCE_LABELS: Record<string, string> = {
  grammar: 'Grammar',
  listening: 'Listening',
  reading: 'Reading',
  speaking: 'Speaking',
  lesson_exercise: 'Lesson',
  writing: 'Writing',
}

const SOURCE_COLORS: Record<string, string> = {
  grammar: '#8b5cf6',
  listening: '#3b82f6',
  reading: '#10b981',
  speaking: '#f59e0b',
  lesson_exercise: '#ec4899',
  writing: '#6366f1',
}

export default function WeakReviewPage() {
  const t = useTranslations('weakReview')
  const tCommon = useTranslations('common')
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)

  const [items, setItems] = useState<WeakReviewItem[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<WeakReviewStats | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [reviewing, setReviewing] = useState(false)

  const loadDue = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/api/weak-review/due')
      if (res.ok) {
        const data = await res.json()
        setItems(data.due)
        setStats(data.stats)
        setCurrent(0)
        setRevealed(false)
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [])

  const activeLangCode = activeLanguage?.code

  useEffect(() => {
    loadDue()
  }, [loadDue, activeLangCode])

  async function reviewItem(quality: number) {
    if (items.length === 0) return
    setReviewing(true)
    const item = items[current]
    await apiFetch(`/api/weak-review/${item.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quality }),
    })
    setReviewing(false)
    if (current < items.length - 1) {
      setCurrent(current + 1)
      setRevealed(false)
    } else {
      await loadDue()
    }
  }

  if (loading) {
    return <PageLoading />
  }

  const item = items[current]
  const sourceLabel = SOURCE_LABELS[item?.source_type] || item?.source_type
  const sourceColor = SOURCE_COLORS[item?.source_type] || '#666'

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('title')}
          </span>
          <span className="text-fl-hint text-fl-muted-2 font-mono tracking-widest">
            {items.length} {t('due')}
          </span>
        </div>
        {stats && stats.due > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.breakdown).map(([type, count]) => (
              <span
                key={type}
                className="text-fl-label font-mono text-xs tracking-widest uppercase"
                style={{ color: SOURCE_COLORS[type] || '#666' }}
              >
                {SOURCE_LABELS[type] || type}: {count}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* No items */}
      {items.length === 0 && (
        <div className="border-fl-border bg-fl-surface border px-6 py-10 text-center">
          <p className="text-fl-muted-1 font-mono text-sm">{t('noDue')}</p>
          <p className="text-fl-muted-2 mt-2 font-mono text-xs">
            {t('noDueHint')}
          </p>
          <button
            onClick={loadDue}
            className="border-fl-border text-fl-label text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2 mt-6 border px-6 py-2 font-mono tracking-widest uppercase transition-colors"
          >
            {tCommon('refresh')}
          </button>
        </div>
      )}

      {/* Review card */}
      {item && (
        <>
          {/* Progress + source badge */}
          <div className="text-fl-label text-fl-muted-3 flex items-center justify-between font-mono tracking-widest uppercase">
            <span>
              {current + 1} / {items.length}
            </span>
            <span
              className="border px-3 py-1 text-xs"
              style={{ borderColor: sourceColor, color: sourceColor }}
            >
              {sourceLabel}
              {item.consecutive_failures > 1 && (
                <span className="ml-1 opacity-60">
                  x{item.consecutive_failures}
                </span>
              )}
            </span>
          </div>

          {/* Question */}
          <div className="border-fl-border bg-fl-surface border">
            <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
              <span className="text-fl-label text-fl-muted-3">●</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {t('question')}
              </span>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <p className="text-fl-fg font-mono text-lg leading-relaxed">
                {item.prompt}
              </p>

              {item.user_wrong_answer && !revealed && (
                <div className="bg-fl-bg border-fl-border border px-4 py-3">
                  <p className="text-fl-label text-fl-muted-3 font-mono text-xs tracking-widest uppercase">
                    {t('yourAnswer')}
                  </p>
                  <p className="text-fl-muted-1 mt-1 font-mono text-sm">
                    {item.user_wrong_answer}
                  </p>
                </div>
              )}

              {item.context && (
                <details className="group">
                  <summary className="text-fl-hint text-fl-muted-3 cursor-pointer font-mono text-xs tracking-widest uppercase">
                    {t('context')}
                  </summary>
                  <p className="text-fl-muted-2 mt-2 font-mono text-xs leading-relaxed">
                    {item.context}
                  </p>
                </details>
              )}
            </div>
          </div>

          {/* Reveal / Correct answer */}
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="border-fl-border text-fl-label text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2 w-full border py-3 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t('reveal')}
            </button>
          ) : (
            <>
              <div className="border-fl-border bg-fl-surface border">
                <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
                  <span className="text-fl-label text-fl-muted-3">●</span>
                  <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                    {t('correctAnswer')}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-fl-fg font-mono text-lg tracking-wide">
                    {item.correct_answer}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'again', q: 0, color: '#ff5555' },
                  { key: 'hard', q: 3, color: 'var(--fl-muted-1)' },
                  { key: 'good', q: 4, color: 'var(--fl-muted-0)' },
                  { key: 'easy', q: 5, color: 'var(--fl-fg)' },
                ].map(({ key, q, color }) => (
                  <button
                    key={q}
                    onClick={() => reviewItem(q)}
                    disabled={reviewing}
                    className="border-fl-border text-fl-label hover:border-fl-border-2 min-w-[80px] flex-1 border py-3 font-mono tracking-widest uppercase transition-all disabled:opacity-40"
                    style={{ color }}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="text-fl-hint text-fl-border-2 text-center font-mono tracking-widest uppercase">
            EF {item.ease_factor.toFixed(2)} · {t('interval')}{' '}
            {item.interval}d · {t('repetitions')} {item.repetitions}
          </p>
        </>
      )}
    </div>
  )
}