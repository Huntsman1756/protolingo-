'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import TargetLanguageSelector from '@/components/TargetLanguageSelector'
import { DEFAULT_TARGET_LANGUAGE } from '@/lib/target-languages'

const LEARNING_GOALS = [
  'travel',
  'work',
  'academic',
  'daily',
  'media',
  'emigration',
  'exams',
  'social',
] as const

type LearningGoal = (typeof LEARNING_GOALS)[number]

export default function OnboardingPage() {
  const t = useTranslations('onboarding')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const [step, setStep] = useState<1 | 2>(1)
  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_TARGET_LANGUAGE)
  const [selectedGoals, setSelectedGoals] = useState<LearningGoal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleGoal(goal: LearningGoal) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    )
  }

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)
  }

  async function handleStep2(skip = false) {
    setLoading(true)
    setError('')
    try {
      const body: Record<string, unknown> = { target_language: targetLanguage }
      if (!skip && selectedGoals.length > 0) body.learning_goals = selectedGoals
      const res = await apiFetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(t('saveFailed'))
      const updated = await res.json()
      setUser({
        id: updated.id,
        username: updated.username,
        displayName: updated.display_name,
        email: updated.email,
        role: updated.role,
        native_language: updated.native_language,
        target_language: updated.target_language,
        conversation_max_duration: updated.conversation_max_duration,
        conversation_inactivity_timeout: updated.conversation_inactivity_timeout,
        learning_goals: updated.learning_goals ?? [],
      })
      router.push('/assessment')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Image src="/logo.png" alt="FreeLingo" width={80} height={80} className="mb-4" />
          <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
          <p className="font-mono text-fl-caption text-fl-muted-2 tracking-widest uppercase mt-1">
            {tCommon('tagline')}
          </p>
        </div>

        <div className="border border-fl-border bg-fl-surface p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-fl-border justify-between">
            <div className="flex items-center gap-2">
              <span className="text-fl-label text-fl-muted-2">●</span>
              <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">
                {step === 1 ? t('title') : t('goals.title')}
              </span>
            </div>
            <span className="font-mono text-fl-hint text-fl-muted-4 tabular-nums">{step}/2</span>
          </div>

          {error && (
            <div className="mb-5 border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error tracking-wide">
              ✕ {error}
            </div>
          )}

          {/* Step 1: Language */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <p className="font-mono text-sm text-fl-fg mb-4">{t('subtitle')}</p>
              <div>
                <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-3">
                  {t('chooseVariant')}
                </label>
                <TargetLanguageSelector value={targetLanguage} onChange={setTargetLanguage} />
              </div>
              <button
                type="submit"
                className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors"
              >
                — {tCommon('next')}
              </button>
            </form>
          )}

          {/* Step 2: Learning goals */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="font-mono text-sm text-fl-fg">{t('goals.subtitle')}</p>
              <div className="grid grid-cols-2 gap-2">
                {LEARNING_GOALS.map((goal) => {
                  const active = selectedGoals.includes(goal)
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`px-3 py-3 font-mono text-fl-label tracking-widest uppercase border text-left transition-colors ${active
                          ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
                          : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                        }`}
                    >
                      {t(`goals.${goal}`)}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleStep2(false)}
                className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
              >
                {loading ? `— ${tCommon('saving')}` : `— ${t('continue')}`}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleStep2(true)}
                className="w-full font-mono text-fl-label tracking-widest text-fl-muted-4 uppercase hover:text-fl-muted-2 disabled:opacity-40 transition-colors py-1"
              >
                {t('goals.skip')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
