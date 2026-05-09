'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'

function VerifyEmailContent() {
  const t = useTranslations('auth.verifyEmail')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }
    apiFetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => setStatus(res.ok ? 'success' : 'error'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
        </div>
        <div className="border border-fl-border bg-fl-surface p-8 text-center space-y-6">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="font-mono text-fl-caption tracking-widest text-fl-muted-2 uppercase">{t('title')}</span>
          </div>

          {status === 'loading' && (
            <p className="font-mono text-xs text-fl-muted-2 animate-pulse">{t('loading')}</p>
          )}

          {status === 'success' && (
            <>
              <p className="font-mono text-sm text-fl-fg">{t('success')}</p>
              <Link
                href="/login"
                className="block w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 text-center hover:bg-fl-accent/90 transition-colors"
              >
                {t('goToLogin')}
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <p className="font-mono text-xs text-fl-error">{t('error')}</p>
              <Link
                href="/login"
                className="block font-mono text-xs text-fl-muted-2 hover:text-fl-fg transition-colors underline"
              >
                {t('goToLogin')}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  )
}
