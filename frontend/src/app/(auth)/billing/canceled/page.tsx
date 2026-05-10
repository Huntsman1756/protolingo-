'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function BillingCanceledPage() {
  const t = useTranslations('billing')

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="w-full max-w-sm border border-fl-border bg-fl-surface p-8 text-center space-y-5">
        <div className="text-2xl text-fl-muted-2">△</div>
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
          {t('canceledLabel')}
        </p>
        <h1 className="font-mono text-base font-bold text-fl-fg">
          {t('canceledTitle')}
        </h1>
        <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">
          {t('canceledDesc')}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="block font-mono text-xs font-bold tracking-widest uppercase py-3 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 transition-colors"
          >
            — {t('canceledCtaDashboard')}
          </Link>
          <Link
            href="/settings"
            className="block font-mono text-xs tracking-widest uppercase py-3 border border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors"
          >
            — {t('canceledCtaSettings')}
          </Link>
        </div>
      </div>
    </div>
  )
}
