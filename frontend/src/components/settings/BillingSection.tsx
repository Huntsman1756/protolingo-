'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore, isSubscribed } from '@/store/auth'
import { useConfigStore } from '@/store/config'

export function BillingSection() {
  const tBilling = useTranslations('billing')
  const user = useAuthStore((s) => s.user)
  const stripeEnabled = useConfigStore((s) => s.stripeEnabled)
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState<string | null>(null)

  if (!stripeEnabled) return null

  async function handleManageSubscription() {
    setPortalLoading(true)
    setPortalError(null)
    try {
      const res = await apiFetch('/api/billing/portal', { method: 'POST' })
      if (!res.ok) throw new Error(tBilling('portalError'))
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setPortalError(
        err instanceof Error ? err.message : tBilling('portalError')
      )
      setPortalLoading(false)
    }
  }

  return (
    <div className="border-fl-border bg-fl-surface mt-4 border p-6">
      <div className="border-fl-border mb-4 flex items-center gap-2 border-b pb-4">
        <span className="text-fl-label text-fl-muted-2">●</span>
        <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
          {tBilling('section')}
        </span>
      </div>
      <div className="space-y-4">
        {/* Status badge */}
        <div className="flex items-center justify-between">
          <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
            {tBilling('status')}
          </span>
          <span
            className={`border px-2.5 py-1 font-mono text-xs font-bold tracking-widest uppercase ${
              user?.subscription_status === 'active'
                ? 'border-green-600/40 text-green-500'
                : user?.subscription_status === 'trialing'
                  ? 'border-fl-accent/40 text-fl-accent'
                  : user?.subscription_status === 'past_due'
                    ? 'border-yellow-500/40 text-yellow-500'
                    : 'border-fl-border text-fl-muted-3'
            }`}
          >
            {user?.subscription_status === 'active' && tBilling('statusActive')}
            {user?.subscription_status === 'trialing' &&
              tBilling('statusTrialing')}
            {user?.subscription_status === 'past_due' &&
              tBilling('statusPastDue')}
            {(!user?.subscription_status ||
              user?.subscription_status === 'none' ||
              user?.subscription_status === 'canceled') &&
              tBilling('statusNone')}
          </span>
        </div>

        {/* Next billing / end date */}
        {user?.subscription_ends_at && (
          <div className="flex items-center justify-between">
            <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
              {user.subscription_status === 'canceled'
                ? tBilling('accessUntil')
                : tBilling('nextBilling')}
            </span>
            <span className="text-fl-muted-1 font-mono text-xs">
              {new Date(user.subscription_ends_at).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Manage or subscribe button */}
        {isSubscribed(user, stripeEnabled) ? (
          <button
            onClick={handleManageSubscription}
            disabled={portalLoading}
            className="border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 w-full border py-2.5 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {portalLoading ? '...' : `— ${tBilling('manage')}`}
          </button>
        ) : (
          <a
            href="/dashboard"
            className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 block w-full py-2.5 text-center font-mono text-xs tracking-widest uppercase transition-colors"
          >
            — {tBilling('subscribe')}
          </a>
        )}

        {portalError && (
          <p className="text-fl-hint font-mono text-red-500">{portalError}</p>
        )}
      </div>
    </div>
  )
}
