'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(t('error'))
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
        </div>

        <div className="border border-fl-border bg-fl-surface p-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="font-mono text-fl-caption tracking-widest text-fl-muted-2 uppercase">{t('title')}</span>
          </div>

          {sent ? (
            <div className="space-y-4">
              <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{t('sent')}</p>
              <Link
                href="/login"
                className="block font-mono text-xs text-fl-muted-2 hover:text-fl-fg transition-colors underline"
              >
                {t('backToLogin')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">{t('description')}</p>
              {error && (
                <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">✕ {error}</div>
              )}
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors disabled:opacity-50"
              >
                {loading ? t('sending') : t('submit')}
              </button>
              <Link
                href="/login"
                className="block font-mono text-xs text-fl-muted-4 hover:text-fl-muted-2 transition-colors text-center"
              >
                {t('backToLogin')}
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
