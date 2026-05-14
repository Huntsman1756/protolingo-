'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useConfigStore } from '@/store/config'
import { useAuthStore, isSubscribed } from '@/store/auth'

export function PaywallBanner() {
  const t = useTranslations('billing')
  const user = useAuthStore((s) => s.user)
  const stripeEnabled = useConfigStore((s) => s.stripeEnabled)
  const trialDays = useConfigStore((s) => s.stripeTrialDays)
  const [loading, setLoading] = useState<'monthly' | 'yearly' | null>(null)
  const [error, setError] = useState<string | null>(null)

  // If stripe is disabled or user is subscribed, render nothing (children show normally)
  if (!stripeEnabled || isSubscribed(user, stripeEnabled)) return null

  async function handleCheckout(interval: 'monthly' | 'yearly') {
    setLoading(interval)
    setError(null)
    try {
      const res = await apiFetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: interval }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail ?? t('checkoutError'))
      }
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : t('checkoutError'))
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 text-center">
      <div className="border border-fl-border bg-fl-surface max-w-md w-full p-8">
        {/* Icon */}
        <div className="text-2xl text-fl-muted-2 mb-4">◎</div>

        {/* Headline */}
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">
          {t('paywallLabel')}
        </p>
        <h2 className="font-mono text-base font-bold text-fl-fg mb-3">
          {t('paywallTitle')}
        </h2>
        <p className="font-mono text-xs text-fl-muted-1 leading-relaxed mb-6">
          {t('paywallDesc', { days: trialDays })}
        </p>

        {/* Plan buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleCheckout('monthly')}
            disabled={loading !== null}
            className="w-full font-mono text-xs tracking-widest uppercase py-3 px-4 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 disabled:opacity-50 transition-colors"
          >
            {loading === 'monthly' ? '...' : t('planMonthly', { price: '14.95' })}
          </button>
          <button
            onClick={() => handleCheckout('yearly')}
            disabled={loading !== null}
            className="w-full font-mono text-xs tracking-widest uppercase py-3 px-4 border border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 disabled:opacity-50 transition-colors"
          >
            {loading === 'yearly' ? '...' : t('planYearly', { price: '149.50' })}
          </button>
        </div>

        {error && (
          <p className="mt-4 font-mono text-fl-hint text-red-500">{error}</p>
        )}

        <p className="mt-6 font-mono text-fl-hint text-fl-muted-3 tracking-widest uppercase">
          {t('paywallNoCharge')}
        </p>
      </div>
    </div>
  )
}

/** Wrap a page's content. Renders the paywall when Stripe is enabled and the user lacks an active subscription. */
export function PaywallGate({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const stripeEnabled = useConfigStore((s) => s.stripeEnabled)

  if (!stripeEnabled || isSubscribed(user, stripeEnabled)) return <>{children}</>
  return <PaywallBanner />
}
