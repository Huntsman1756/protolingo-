'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { type QuotaStatus } from '@/types/api'

export function UsageLimitsSection() {
  const t = useTranslations('settings')
  const [quota, setQuota] = useState<QuotaStatus | null>(null)

  useEffect(() => {
    apiFetch('/api/auth/quota')
      .then((r) => r.json())
      .then((data: QuotaStatus) => setQuota(data))
      .catch(() => {
        /* silently ignore — section stays in skeleton state */
      })
  }, [])

  return (
    <div className="border-fl-border bg-fl-surface mt-4 border p-6">
      <div className="border-fl-border mb-5 flex items-center gap-2 border-b pb-4">
        <span className="text-fl-label text-fl-muted-2">●</span>
        <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
          {t('sectionUsageLimits')}
        </span>
      </div>
      {quota === null ? (
        <div className="animate-pulse space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-fl-surface-2 h-4" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {[
            {
              label: t('quotaSessions'),
              used: quota.sessions_this_week,
              limit: quota.sessions_limit,
              unlimited: quota.sessions_unlimited,
              format: (v: number) => String(v),
            },
            {
              label: t('quotaMinutesDay'),
              used: quota.minutes_today,
              limit: quota.minutes_limit,
              unlimited: quota.time_unlimited,
              format: (v: number) => String(v),
            },
            {
              label: t('quotaMinutesWeek'),
              used: quota.minutes_this_week,
              limit: quota.weekly_minutes_limit,
              unlimited: quota.weekly_minutes_unlimited,
              format: (v: number) => String(v),
            },
            {
              label: t('quotaTokens'),
              used: Math.round((quota.tokens_this_month ?? 0) / 1000),
              limit: Math.round((quota.tokens_monthly_limit ?? 0) / 1000),
              unlimited: quota.tokens_unlimited ?? false,
              format: (v: number) => `${v}k`,
            },
          ].map(({ label, used, limit, unlimited, format }) => {
            const pct =
              unlimited || limit === 0
                ? null
                : Math.min(100, Math.round((used / limit) * 100))
            const exceeded = !unlimited && limit > 0 && used >= limit
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="text-fl-hint text-fl-muted-4 w-36 shrink-0 font-mono tracking-widest uppercase">
                  {label}
                </span>
                {unlimited ? (
                  <span className="text-fl-hint text-fl-muted-2 font-mono">
                    {t('quotaUnlimited')}
                  </span>
                ) : (
                  <>
                    <div className="bg-fl-surface-2 h-1 flex-1 overflow-hidden">
                      <div
                        className={`h-full transition-all ${exceeded ? 'bg-fl-error' : 'bg-fl-accent'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`text-fl-hint font-mono tabular-nums ${exceeded ? 'text-fl-error' : 'text-fl-muted-2'}`}
                    >
                      {format(used)}&thinsp;/&thinsp;{format(limit)}
                    </span>
                  </>
                )}
              </div>
            )
          })}
          <p className="text-fl-hint text-fl-muted-3 pt-1 font-mono">
            {t('quotaHint')}
          </p>
        </div>
      )}
    </div>
  )
}
