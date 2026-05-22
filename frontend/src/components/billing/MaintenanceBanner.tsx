'use client'

import { useTranslations } from 'next-intl'
import { useConfigStore } from '@/store/config'

export function MaintenanceBanner() {
  const t = useTranslations('maintenance')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 text-center">
      <div className="border border-yellow-500/40 bg-yellow-500/5 max-w-md w-full p-8">
        <div className="text-2xl mb-4">⚙</div>

        <p className="font-mono text-fl-label tracking-widest text-yellow-500 uppercase mb-2">
          {t('label')}
        </p>
        <h2 className="font-mono text-base font-bold text-fl-fg mb-3">
          {t('title')}
        </h2>
        <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">
          {t('description')}
        </p>
      </div>
    </div>
  )
}

/** Gate that renders a maintenance banner when maintenance mode is active. */
export function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const maintenanceMode = useConfigStore((s) => s.maintenanceMode)

  if (maintenanceMode) return <MaintenanceBanner />
  return <>{children}</>
}
