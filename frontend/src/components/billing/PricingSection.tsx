'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

interface PricingSectionProps {
  stripeEnabled: boolean
  trialDays: number
  hasSession: boolean
}

export default function PricingSection({ stripeEnabled, trialDays, hasSession }: PricingSectionProps) {
  const tBilling = useTranslations('billing')
  // null = not yet determined, true = subscribed (hide), false = not subscribed (show)
  const [subscribed, setSubscribed] = useState<boolean | null>(hasSession ? null : false)

  useEffect(() => {
    if (!hasSession) return
    async function checkSubscription() {
      try {
        // Refresh to get an access token (same pattern as app layout)
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })
        if (!refreshRes.ok) { setSubscribed(false); return }
        const { access_token } = await refreshRes.json()

        const meRes = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${access_token}` },
          credentials: 'include',
        })
        if (!meRes.ok) { setSubscribed(false); return }
        const me = await meRes.json()
        const status: string = me.subscription_status ?? 'none'
        setSubscribed(status === 'active' || status === 'trialing')
      } catch {
        setSubscribed(false)
      }
    }
    checkSubscription()
  }, [hasSession])

  if (!stripeEnabled) return null
  // Still checking — render nothing to avoid layout shift
  if (subscribed === null) return null
  if (subscribed) return null

  return (
    <section className="max-w-4xl mx-auto px-6 pb-24 w-full">
      <div className="text-center mb-10">
        <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-4 block">
          {tBilling('pricingLabel')}
        </span>
        <h2 className="font-mono text-base font-bold text-fl-fg mb-2">
          {tBilling('pricingTitle')}
        </h2>
        <p className="font-mono text-xs text-fl-muted-1 tracking-widest">
          {tBilling('pricingDesc', { days: trialDays })}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly plan */}
        <div className="border border-fl-border bg-fl-surface p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-fl-border">
            <span className="text-fl-muted-2 text-sm">◎</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              {tBilling('planMonthlyName')}
            </span>
          </div>
          <p className="font-mono text-xl font-bold text-fl-fg">
            14.95<span className="text-sm text-fl-muted-1"> € / {tBilling('month')}</span>
          </p>
          <ul className="flex flex-col gap-1.5">
            {['feature1', 'feature2', 'feature3', 'feature4'].map((k) => (
              <li key={k} className="font-mono text-xs text-fl-muted-1 flex items-center gap-2">
                <span className="text-fl-accent">✓</span> {tBilling(`planFeature.${k}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Yearly plan */}
        <div className="border border-fl-accent/30 bg-fl-surface p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-fl-border">
            <div className="flex items-center gap-2">
              <span className="text-fl-muted-2 text-sm">▣</span>
              <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
                {tBilling('planYearlyName')}
              </span>
            </div>
            <span className="font-mono text-fl-hint text-fl-accent border border-fl-accent/30 px-2 py-0.5 uppercase tracking-widest">
              {tBilling('bestValue')}
            </span>
          </div>
          <p className="font-mono text-xl font-bold text-fl-fg">
            149.50<span className="text-sm text-fl-muted-1"> € / {tBilling('year')}</span>
          </p>
          <ul className="flex flex-col gap-1.5">
            {['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((k) => (
              <li key={k} className="font-mono text-xs text-fl-muted-1 flex items-center gap-2">
                <span className="text-fl-accent">✓</span> {tBilling(`planFeature.${k}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={hasSession ? '/dashboard' : '/register'}
          className="inline-block font-mono text-xs font-bold tracking-widest uppercase py-3 px-10 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 transition-colors"
        >
          — {tBilling('ctaStart', { days: trialDays })}
        </Link>
      </div>
    </section>
  )
}
