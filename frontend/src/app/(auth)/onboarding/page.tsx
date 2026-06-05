'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { mapUser } from '@/lib/mappers'
import { useAuthStore } from '@/store/auth'
import { useLanguageStore } from '@/store/language'
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
  const searchParams = useSearchParams()
  const setUser = useAuthStore((s) => s.setUser)
  const user = useAuthStore((s) => s.user)
  const fetchLanguages = useLanguageStore((s) => s.fetchLanguages)
  const availableLanguageCodes = useLanguageStore(
    (s) => s.availableLanguageCodes
  )

  const isNewLanguage = searchParams.get('new') === 'true'
  const queryLanguage = searchParams.get('language')

  const [step, setStep] = useState<1 | 2>(1)
  const [targetLanguage, setTargetLanguage] = useState(
    queryLanguage ?? DEFAULT_TARGET_LANGUAGE
  )
  const [selectedGoals, setSelectedGoals] = useState<LearningGoal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [languagesLoaded, setLanguagesLoaded] = useState(false)

  useEffect(() => {
    fetchLanguages().then(() => {
      setLanguagesLoaded(true)
      const codes = useLanguageStore.getState().availableLanguageCodes
      if (codes.length > 0 && !codes.includes(targetLanguage)) {
        setTargetLanguage(codes[0])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchLanguages])

  function toggleGoal(goal: LearningGoal) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
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
      setUser(mapUser(updated, user))
      router.push('/assessment')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-fl-bg bg-dot-grid flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="FreeLingo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-fl-fg font-mono text-xl font-bold tracking-widest uppercase">
            FreeLingo
          </h1>
          <p className="text-fl-caption text-fl-muted-2 mt-1 font-mono tracking-widest uppercase">
            {tCommon('tagline')}
          </p>
        </div>

        <div className="border-fl-border bg-fl-surface border p-8">
          {/* Step indicator */}
          <div className="border-fl-border mb-6 flex items-center justify-between gap-2 border-b pb-4">
            <div className="flex items-center gap-2">
              <span className="text-fl-label text-fl-muted-2">●</span>
              <span className="text-fl-muted-2 font-mono text-xs tracking-widest uppercase">
                {step === 1
                  ? isNewLanguage
                    ? t('newLanguageHeadline')
                    : t('title')
                  : t('goals.title')}
              </span>
            </div>
            <span className="text-fl-hint text-fl-muted-4 font-mono tabular-nums">
              {step}/2
            </span>
          </div>

          {error && (
            <div className="border-fl-error/40 text-fl-error mb-5 border px-4 py-3 font-mono text-xs tracking-wide">
              ✕ {error}
            </div>
          )}

          {/* Step 1: Language */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <p className="text-fl-fg mb-4 font-mono text-sm">
                {isNewLanguage ? t('newLanguageSubtitle') : t('subtitle')}
              </p>
              <div>
                <label className="text-fl-label text-fl-muted-2 mb-3 block font-mono tracking-widest uppercase">
                  {t('chooseVariant')}
                </label>
                {!languagesLoaded ? (
                  <div className="border-fl-border text-fl-muted-2 border px-4 py-3 font-mono text-xs tracking-widest">
                    …
                  </div>
                ) : availableLanguageCodes.length > 0 ? (
                  <TargetLanguageSelector
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                    availableCodes={availableLanguageCodes}
                  />
                ) : (
                  <div className="space-y-3 text-center">
                    <p className="text-fl-muted-2 font-mono text-xs">
                      {t('saveFailed')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguagesLoaded(false)
                        fetchLanguages()
                      }}
                      className="text-fl-label text-fl-accent font-mono text-xs tracking-widest uppercase underline"
                    >
                      {tCommon('retry')}
                    </button>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 w-full py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {tCommon('next')}
              </button>
            </form>
          )}

          {/* Step 2: Learning goals */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="text-fl-fg font-mono text-sm">
                {t('goals.subtitle')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LEARNING_GOALS.map((goal) => {
                  const active = selectedGoals.includes(goal)
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`text-fl-label border px-3 py-3 text-left font-mono tracking-widest uppercase transition-colors ${
                        active
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
                className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 w-full py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-40"
              >
                {loading ? tCommon('saving') : t('continue')}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleStep2(true)}
                className="text-fl-label text-fl-muted-4 hover:text-fl-muted-2 w-full py-1 font-mono tracking-widest uppercase transition-colors disabled:opacity-40"
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
