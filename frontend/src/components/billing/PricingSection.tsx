'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

interface PricingSectionProps {
  stripeEnabled: boolean
  trialDays: number
  hasSession: boolean
}

export default function PricingSection({
  stripeEnabled,
  trialDays,
  hasSession,
}: PricingSectionProps) {
  const tBilling = useTranslations('billing')
  const tCommon = useTranslations('common')
  // null = checking (only when hasSession=true), true = subscribed (hide pricing), false = show pricing
  const [subscribed, setSubscribed] = useState<boolean | null>(
    hasSession ? null : false
  )

  useEffect(() => {
    if (!hasSession) return
    async function checkSubscription() {
      try {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })
        if (!refreshRes.ok) {
          setSubscribed(false)
          return
        }
        const { access_token } = await refreshRes.json()

        const meRes = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${access_token}` },
          credentials: 'include',
        })
        if (!meRes.ok) {
          setSubscribed(false)
          return
        }
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

  // Loading state: show full-screen overlay while verifying subscription
  if (subscribed === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-fl-bg/80 absolute inset-0 backdrop-blur-sm" />
        <span className="text-fl-muted-2 relative animate-pulse font-mono text-xs tracking-widest uppercase">
          {tCommon('loading')}
        </span>
      </div>
    )
  }

  if (subscribed) return null

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24">
      <div className="mb-10 text-center">
        <h2 className="text-fl-fg mb-2 font-mono text-base font-bold">
          {tBilling('pricingTitle')}
        </h2>
        <p className="text-fl-muted-1 font-mono text-xs tracking-widest">
          {tBilling('pricingDesc', { days: trialDays })}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Free plan */}
        <div className="border-fl-border bg-fl-surface flex flex-col gap-4 border p-6">
          <div className="border-fl-border flex items-center gap-2 border-b pb-3">
            <span className="text-fl-muted-2 text-sm">○</span>
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {tBilling('planFreeName')}
            </span>
          </div>
          <p
            className="text-fl-muted-2 invisible font-mono text-sm"
            aria-hidden="true"
          >
            &nbsp;
          </p>
          <p
            className="text-fl-fg invisible font-mono text-xl font-bold"
            aria-hidden="true"
          >
            &nbsp;
          </p>
          <ul className="flex flex-col gap-1.5">
            {['f1', 'f2', 'f3', 'f4', 'f5'].map((k) => (
              <li
                key={k}
                className="text-fl-muted-1 flex items-center gap-2 font-mono text-xs"
              >
                <span className="text-fl-accent">✓</span>{' '}
                {tBilling(`freeFeature.${k}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly plan */}
        <div className="border-fl-border bg-fl-surface flex flex-col gap-4 border p-6">
          <div className="border-fl-border flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <span className="text-fl-muted-2 text-sm">◎</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {tBilling('planMonthlyName')}
              </span>
            </div>
            <span className="text-fl-hint text-fl-accent border-fl-accent/30 border px-2 py-0.5 font-mono tracking-widest uppercase">
              {tBilling('trialBadge')}
            </span>
          </div>
          <p className="text-fl-muted-2 font-mono text-sm line-through">
            19.95 € / {tBilling('month')}
          </p>
          <p className="text-fl-fg font-mono text-xl font-bold">
            14.95
            <span className="text-fl-muted-1 text-sm">
              {' '}
              € / {tBilling('month')}
            </span>
          </p>
          <p className="text-fl-hint text-fl-muted-2 border-fl-border border-t pt-3 font-mono tracking-widest uppercase">
            {tBilling('everythingFree')}
          </p>
          <ul className="flex flex-col gap-1.5">
            {['feature1', 'feature2', 'feature3', 'feature4'].map((k) => (
              <li
                key={k}
                className="text-fl-muted-1 flex items-center gap-2 font-mono text-xs"
              >
                <span className="text-fl-accent">✓</span>{' '}
                {tBilling(`planFeature.${k}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Yearly plan */}
        <div className="border-fl-accent/30 bg-fl-surface flex flex-col gap-4 border p-6">
          <div className="border-fl-border flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <span className="text-fl-muted-2 text-sm">▣</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {tBilling('planYearlyName')}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <span className="text-fl-hint text-fl-accent border-fl-accent/30 border px-2 py-0.5 font-mono tracking-widest uppercase">
                {tBilling('bestValue')}
              </span>
              <span className="text-fl-hint text-fl-accent border-fl-accent/30 border px-2 py-0.5 font-mono tracking-widest uppercase">
                {tBilling('trialBadge')}
              </span>
            </div>
          </div>
          <p className="text-fl-muted-2 font-mono text-sm line-through">
            199.50 € / {tBilling('year')}
          </p>
          <p className="text-fl-fg font-mono text-xl font-bold">
            149.50
            <span className="text-fl-muted-1 text-sm">
              {' '}
              € / {tBilling('year')}
            </span>
          </p>
          <p className="text-fl-hint text-fl-muted-2 border-fl-border border-t pt-3 font-mono tracking-widest uppercase">
            {tBilling('everythingFree')}
          </p>
          <ul className="flex flex-col gap-1.5">
            {['feature1', 'feature2', 'feature3', 'feature4'].map((k) => (
              <li
                key={k}
                className="text-fl-muted-1 flex items-center gap-2 font-mono text-xs"
              >
                <span className="text-fl-accent">✓</span>{' '}
                {tBilling(`planFeature.${k}`)}
              </li>
            ))}
            <li className="text-fl-muted-1 flex items-center gap-2 font-mono text-xs">
              <span className="text-fl-accent">✓</span>{' '}
              {tBilling('planFeature.feature5')}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={hasSession ? '/dashboard' : '/register'}
          className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 inline-block px-10 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
        >
          {tBilling('ctaRegister')}
        </Link>
      </div>

      {/* Open Source Banner */}
      <div className="border-fl-border bg-fl-surface mt-6 flex flex-col items-center justify-between gap-4 border px-8 py-5 sm:flex-row">
        <div className="flex items-center gap-4">
          <Image
            src="/github.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="block opacity-80 dark:hidden"
          />
          <Image
            src="/github_white.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="hidden opacity-80 dark:block"
          />
          <div className="text-left">
            <p className="text-fl-fg font-mono text-xs font-bold tracking-widest uppercase">
              {tBilling('openSourceTitle')}
            </p>
            <p className="text-fl-hint text-fl-muted-2 mt-0.5 font-mono tracking-widest uppercase">
              {tBilling('openSourceDesc')}
            </p>
          </div>
        </div>
        <a
          href="https://github.com/ArtCC/freelingo"
          target="_blank"
          rel="noopener noreferrer"
          className="border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-6 py-2.5 font-mono text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-colors"
        >
          {tBilling('openSourceCta')}
        </a>
      </div>
    </section>
  )
}
