'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'

const STORAGE_KEY = 'fl_tour_done'

const STEP_ICONS = ['◎', '▣', '◈', '△', '◇', '◉', '✦']

export default function OnboardingTour() {
  const t = useTranslations('tour')
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [dir, setDir] = useState<'next' | 'prev'>('next')

  const totalSteps = 7

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }, [])

  const goTo = useCallback(
    (next: number, direction: 'next' | 'prev') => {
      setDir(direction)
      setLeaving(true)
      setTimeout(() => {
        setStep(next)
        setLeaving(false)
      }, 150)
    },
    []
  )

  if (!visible) return null

  const isFirst = step === 0
  const isLast = step === totalSteps - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-fl-bg/80 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md border border-fl-border bg-fl-surface shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-fl-border">
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 w-1.5 rounded-full transition-colors ${i === step ? 'bg-fl-accent' : 'bg-fl-border'
                  }`}
              />
            ))}
          </div>
          <button
            onClick={dismiss}
            className="font-mono text-fl-hint tracking-widest text-fl-muted-3 hover:text-fl-fg uppercase transition-colors"
          >
            {t('skip')}
          </button>
        </div>

        {/* Step content */}
        <div
          className={`px-6 py-7 transition-all duration-150 ${leaving
            ? dir === 'next'
              ? '-translate-x-3 opacity-0'
              : 'translate-x-3 opacity-0'
            : 'translate-x-0 opacity-100'
            }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-fl-accent text-xl">{STEP_ICONS[step]}</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              {t(`step${step + 1}.label`)}
            </span>
          </div>
          <h2 className="font-mono text-base font-bold text-fl-fg mb-2">
            {t(`step${step + 1}.title`)}
          </h2>
          <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">
            {t(`step${step + 1}.desc`)}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={() => goTo(step - 1, 'prev')}
            disabled={isFirst}
            className="font-mono text-fl-label tracking-widest uppercase text-fl-muted-2 hover:text-fl-fg transition-colors disabled:opacity-0"
          >
            ← {t('prev')}
          </button>
          {isLast ? (
            <button
              onClick={dismiss}
              className="font-mono text-fl-label tracking-widest uppercase px-5 py-2 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 transition-colors"
            >
              {t('done')}
            </button>
          ) : (
            <button
              onClick={() => goTo(step + 1, 'next')}
              className="font-mono text-fl-label tracking-widest uppercase text-fl-muted-1 hover:text-fl-fg transition-colors"
            >
              {t('next')} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
