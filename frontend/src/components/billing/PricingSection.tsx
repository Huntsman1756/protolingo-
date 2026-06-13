'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Circle, CircleDot, Diamond, Check, Minus } from 'lucide-react'
import { PageLoading } from '@/components/ui/page-loading'

interface PricingSectionProps {
  stripeEnabled: boolean
  trialDays: number
  hasSession: boolean
  priceMonthly: number
  priceYearly: number
  totalPriceMonthly: number
  totalPriceYearly: number
}

export default function PricingSection({
  stripeEnabled,
  trialDays,
  hasSession,
  priceMonthly,
  priceYearly,
  totalPriceMonthly,
  totalPriceYearly,
}: PricingSectionProps) {
  const tBilling = useTranslations('billing')
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

  if (subscribed === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-fl-bg/80 absolute inset-0 backdrop-blur-sm" />
        <PageLoading fullScreen={false} showDot={false} className="relative" />
      </div>
    )
  }

  if (subscribed) return null

  const planIcons = [Circle, CircleDot, Diamond]

  const freeRows = ['f1', 'f2', 'f3', 'f4', 'f5']
  const paidRows = ['feature1', 'feature2', 'feature3', 'feature4']
  const tableRows = [
    ...freeRows.map((k) => ({
      label: tBilling(`freeFeature.${k}`),
      free: true,
      monthly: true,
      yearly: true,
    })),
    ...paidRows.map((k) => ({
      label: tBilling(`planFeature.${k}`),
      free: false,
      monthly: true,
      yearly: true,
    })),
    {
      label: tBilling('planFeature.feature5'),
      free: false,
      monthly: false,
      yearly: true,
    },
  ]

  const plans = [
    {
      name: tBilling('planFreeName'),
      icon: planIcons[0],
      price: null,
      priceLabel: null,
      badge: tBilling('planFreeBadge'),
      badgeStyle: 'text-fl-muted-2 border-fl-border bg-fl-bg-alt',
      href: hasSession ? '/dashboard' : '/register',
      cta: tBilling('ctaRegister'),
      isFree: true,
    },
    {
      name: tBilling('planMonthlyName'),
      icon: planIcons[1],
      price: priceMonthly,
      priceLabel: tBilling('month'),
      originalPrice: totalPriceMonthly,
      badge: tBilling('trialBadge'),
      badgeStyle: 'text-fl-accent border-fl-accent/30',
      href: hasSession ? '/dashboard' : '/register',
      cta: tBilling('ctaRegister'),
      isFree: false,
    },
    {
      name: tBilling('planYearlyName'),
      icon: planIcons[2],
      price: priceYearly,
      priceLabel: tBilling('year'),
      originalPrice: totalPriceYearly,
      badge: tBilling('bestValue'),
      badgeStyle: 'text-fl-accent border-fl-accent/30',
      href: hasSession ? '/dashboard' : '/register',
      cta: tBilling('ctaRegister'),
      isFree: false,
    },
  ]

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24">
      <div className="mb-10 text-center">
        <h2 className="text-fl-fg mb-2 font-sans text-xl font-bold tracking-tight">
          {tBilling('pricingTitle')}
        </h2>
        <p className="text-fl-muted-1 font-sans text-sm">
          {tBilling('pricingDesc', { days: trialDays })}
        </p>
      </div>

      {/* Plan cards */}
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon
          return (
            <div
              key={plan.name}
              className={`flex flex-col gap-4 border p-6 ${
                plan.isFree
                  ? 'border-fl-border-2 bg-fl-bg-alt'
                  : plan.name === tBilling('planYearlyName')
                    ? 'border-fl-accent/30 bg-fl-surface'
                    : 'border-fl-border bg-fl-surface'
              }`}
            >
              <div className="border-fl-border flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="text-fl-muted-2 h-4 w-4" />
                  <span className="text-fl-label text-fl-muted-2 font-sans text-sm font-semibold tracking-tight">
                    {plan.name}
                  </span>
                </div>
                {plan.badge && (
                  <span
                    className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${plan.badgeStyle}`}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              {plan.price !== null ? (
                <>
                  <p className="text-fl-muted-2 font-mono text-sm line-through">
                    {plan.originalPrice} € / {plan.priceLabel}
                  </p>
                  <p className="text-fl-fg flex items-baseline gap-2 font-mono text-xl font-bold">
                    {plan.price}
                    <span className="text-fl-muted-1 text-sm">
                      € / {plan.priceLabel}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p
                    className="text-fl-muted-2 invisible font-mono text-sm"
                    aria-hidden
                  >
                    &nbsp;
                  </p>
                  <p className="text-fl-fg font-mono text-xl font-bold">€0</p>
                </>
              )}

              <Link
                href={plan.href}
                className={`inline-block px-6 py-2.5 text-center font-mono text-xs font-bold tracking-widest uppercase transition-colors ${
                  plan.isFree
                    ? 'border-fl-border-2 text-fl-muted-1 hover:text-fl-fg hover:border-fl-border border'
                    : 'bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          )
        })}
      </div>

      {/* Comparison table */}
      <div className="border-fl-border overflow-hidden border">
        <table className="w-full">
          <thead>
            <tr className="border-fl-border bg-fl-surface border-b">
              <th className="text-fl-label text-fl-muted-2 px-5 py-3 text-left font-mono tracking-widest uppercase">
                &nbsp;
              </th>
              <th className="text-fl-label text-fl-muted-2 px-4 py-3 text-center font-mono tracking-widest uppercase">
                {tBilling('planFreeName')}
              </th>
              <th className="text-fl-label text-fl-muted-2 px-4 py-3 text-center font-mono tracking-widest uppercase">
                {tBilling('planMonthlyName')}
              </th>
              <th className="text-fl-label text-fl-muted-2 px-4 py-3 text-center font-mono tracking-widest uppercase">
                {tBilling('planYearlyName')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr
                key={i}
                className={
                  i < tableRows.length - 1 ? 'border-fl-border border-b' : ''
                }
              >
                <td className="text-fl-muted-1 px-5 py-3 font-mono text-xs">
                  {row.label}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.free ? (
                    <Check className="text-fl-accent mx-auto h-3.5 w-3.5" />
                  ) : (
                    <Minus className="text-fl-muted-4 mx-auto h-3.5 w-3.5" />
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.monthly ? (
                    <Check className="text-fl-accent mx-auto h-3.5 w-3.5" />
                  ) : (
                    <Minus className="text-fl-muted-4 mx-auto h-3.5 w-3.5" />
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.yearly ? (
                    <Check className="text-fl-accent mx-auto h-3.5 w-3.5" />
                  ) : (
                    <Minus className="text-fl-muted-4 mx-auto h-3.5 w-3.5" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={hasSession ? '/dashboard' : '/register'}
          className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 inline-block px-10 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
        >
          {tBilling('ctaRegister')}
        </Link>
      </div>
    </section>
  )
}
