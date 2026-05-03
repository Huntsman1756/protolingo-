'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface Props {
  planId: number
  level: string
}

export default function LevelTestBanner({ planId, level }: Props) {
  const t = useTranslations('plan')
  const router = useRouter()

  return (
    <div className="border border-fl-fg bg-fl-surface mt-2">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-fg/20">
        <span className="font-mono text-fl-label text-fl-fg">⊞</span>
        <span className="font-mono text-fl-label tracking-widest text-fl-fg uppercase">
          {t('levelComplete', { level })}
        </span>
      </div>
      <div className="p-6 space-y-4">
        <p className="font-mono text-fl-label text-fl-muted-1 leading-relaxed">
          {t('levelCompleteDesc', { level })}
        </p>
        <p className="font-mono text-fl-hint text-fl-muted-3">
          {t('levelCompleteHint')}
        </p>
        <button
          onClick={() => router.push(`/assessment/level-test?plan=${planId}`)}
          className="bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-fl-fg-bright transition-colors"
        >
          — {t('beginLevelTest')} →
        </button>
      </div>
    </div>
  )
}
