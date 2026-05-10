'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAuthStore, isSubscribed } from '@/store/auth'
import { useConfigStore } from '@/store/config'

interface PricingSectionProps {
  /** Whether Stripe is enabled (from server-side config fetch). */
  stripeEnabled: boolean
  trialDays: number
  /** True if the browser has a refresh_token cookie (user may be logged in). */
  hasSession: boolean
}

export default function PricingSection({ stripeEnabled, trialDays, hasSession }: PricingSectionProps) {
  const tBilling = useTranslations('billing')
  const user = useAuthStore((s) => s.user)
  // Use client-side config when available; fall back to server-side prop.
  const stripeEnabledClient = useConfigStore((s) => s.stripeEnabled)
  const resolvedStripeEnabled = stripeEnabledClient ?? stripeEnabled

  if (!resolvedStripeEnabled) return null

  // Hide for subscribed users. If the user has a session but the store hasn't
  // hydrated yet (user === null), also hide to avoid a flash for subscribed users.
  if (hasSession && (user === null || isSubscribed(user, true))) return null

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
