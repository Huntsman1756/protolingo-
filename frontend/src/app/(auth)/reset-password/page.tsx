'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'

function ResetPasswordContent() {
  const t = useTranslations('auth.resetPassword')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError(t('mismatch'))
      return
    }
    if (password.length < 8) {
      setError(t('tooShort'))
      return
    }
    setLoading(true)
    try {
      const res = await apiFetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || t('error'))
      }
      setDone(true)
      setTimeout(() => router.push('/login'), 2000)
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

          {done ? (
            <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{t('success')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!token && (
                <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">{t('missingToken')}</div>
              )}
              {error && (
                <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">✕ {error}</div>
              )}
              <input
                type="password"
                placeholder={t('newPassword')}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
              />
              <input
                type="password"
                placeholder={t('confirmPassword')}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors disabled:opacity-50"
              >
                {loading ? t('saving') : t('submit')}
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

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  )
}
