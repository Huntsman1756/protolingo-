'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { mapUser } from '@/lib/mappers'
import { useAuthStore } from '@/store/auth'

export default function BillingSuccessPage() {
  const t = useTranslations('billing')
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const [countdown, setCountdown] = useState(5)

  // Refresh the user object so subscription_status is up-to-date
  useEffect(() => {
    async function refreshUser() {
      try {
        const res = await apiFetch('/api/auth/me')
        if (res.ok) {
          const me = await res.json()
          setUser(mapUser(me))
        }
      } catch {
        /* non-fatal */
      }
    }
    void refreshUser()
  }, [setUser])

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/dashboard')
      return
    }
    const id = setTimeout(() => setCountdown((n) => n - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown, router])

  return (
    <div className="bg-fl-bg bg-dot-grid flex min-h-screen items-center justify-center px-4">
      <div className="border-fl-border bg-fl-surface w-full max-w-sm space-y-5 border p-8 text-center">
        <div className="text-fl-accent text-2xl">◎</div>
        <p className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
          {t('successLabel')}
        </p>
        <h1 className="text-fl-fg font-mono text-base font-bold">
          {t('successTitle')}
        </h1>
        <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
          {t('successDesc')}
        </p>
        <p className="text-fl-hint text-fl-muted-3 font-mono tracking-widest uppercase">
          {t('successRedirect', { seconds: countdown })}
        </p>
        <Link
          href="/dashboard"
          className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 block py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
        >
          — {t('successCta')}
        </Link>
      </div>
    </div>
  )
}
