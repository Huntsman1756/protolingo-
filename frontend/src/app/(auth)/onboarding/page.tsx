'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import TargetLanguageSelector from '@/components/TargetLanguageSelector'
import { DEFAULT_TARGET_LANGUAGE } from '@/lib/target-languages'

export default function OnboardingPage() {
  const t = useTranslations('onboarding')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_TARGET_LANGUAGE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_language: targetLanguage }),
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
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">{t('title')}</span>
          </div>

          <p className="font-mono text-sm text-fl-fg mb-6">{t('subtitle')}</p>

          {error && (
            <div className="mb-5 border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error tracking-wide">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-3">
                {t('chooseVariant')}
              </label>
              <TargetLanguageSelector value={targetLanguage} onChange={setTargetLanguage} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
            >
              {loading ? `— ${tCommon('saving')}` : `— ${t('continue')}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
