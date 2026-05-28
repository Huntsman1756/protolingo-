'use client'

import { useTranslations } from 'next-intl'
import { useConfigStore } from '@/store/config'

export function MaintenanceBanner() {
  const t = useTranslations('maintenance')

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-md border border-yellow-500/40 bg-yellow-500/5 p-8">
        <div className="mb-4 text-2xl">⚙</div>

        <p className="text-fl-label mb-2 font-mono tracking-widest text-yellow-500 uppercase">
          {t('label')}
        </p>
        <h2 className="text-fl-fg mb-3 font-mono text-base font-bold">
          {t('title')}
        </h2>
        <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
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
