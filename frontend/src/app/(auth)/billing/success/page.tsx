'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
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
          setUser({
            id: me.id,
            username: me.username,
            displayName: me.display_name,
            email: me.email,
            native_language: me.native_language,
            target_language: me.target_language,
            role: me.role,
            conversation_max_duration: me.conversation_max_duration,
            conversation_inactivity_timeout: me.conversation_inactivity_timeout,
            avatar: me.avatar ?? null,
            is_verified: me.is_verified ?? true,
            bio: me.bio ?? null,
            learning_goals: me.learning_goals ?? [],
            subscription_status: me.subscription_status ?? 'none',
            subscription_ends_at: me.subscription_ends_at ?? null,
          })
        }
      } catch { /* non-fatal */ }
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
    <div
      className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="w-full max-w-sm border border-fl-border bg-fl-surface p-8 text-center space-y-5">
        <div className="text-2xl text-fl-accent">◎</div>
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
          {t('successLabel')}
        </p>
        <h1 className="font-mono text-base font-bold text-fl-fg">
          {t('successTitle')}
        </h1>
        <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">
          {t('successDesc')}
        </p>
        <p className="font-mono text-fl-hint text-fl-muted-3 tracking-widest uppercase">
          {t('successRedirect', { seconds: countdown })}
        </p>
        <Link
          href="/dashboard"
          className="block font-mono text-xs font-bold tracking-widest uppercase py-3 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 transition-colors"
        >
          — {t('successCta')}
        </Link>
      </div>
    </div>
  )
}
