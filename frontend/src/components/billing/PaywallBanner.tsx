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
  const priceMonthly = useConfigStore((s) => s.priceMonthly)
  const priceYearly = useConfigStore((s) => s.priceYearly)
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="border-fl-border bg-fl-surface w-full max-w-md border p-8">
        {/* Icon */}
        <div className="text-fl-muted-2 mb-4 text-2xl">◎</div>

        {/* Headline */}
        <p className="text-fl-label text-fl-muted-2 mb-2 font-mono tracking-widest uppercase">
          {t('paywallLabel')}
        </p>
        <h2 className="text-fl-fg mb-3 font-mono text-base font-bold">
          {t('paywallTitle')}
        </h2>
        <p className="text-fl-muted-1 mb-6 font-mono text-xs leading-relaxed">
          {t('paywallDesc', { days: trialDays })}
        </p>

        {/* Plan buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleCheckout('monthly')}
            disabled={loading !== null}
            className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 w-full px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {loading === 'monthly'
              ? '...'
              : t('planMonthly', { price: String(priceMonthly) })}
          </button>
          <button
            onClick={() => handleCheckout('yearly')}
            disabled={loading !== null}
            className="border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 w-full border px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {loading === 'yearly'
              ? '...'
              : t('planYearly', { price: String(priceYearly) })}
          </button>
        </div>

        {error && (
          <p className="text-fl-hint mt-4 font-mono text-red-500">{error}</p>
        )}

        <p className="text-fl-hint text-fl-muted-3 mt-6 font-mono tracking-widest uppercase">
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

  if (!stripeEnabled || isSubscribed(user, stripeEnabled))
    return <>{children}</>
  return <PaywallBanner />
}
