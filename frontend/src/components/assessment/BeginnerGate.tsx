'use client'

import { useTranslations } from 'next-intl'

interface Props {
  onBeginner: () => void
  onHasExperience: () => void
}

export default function BeginnerGate({ onBeginner, onHasExperience }: Props) {
  const t = useTranslations('assessment')

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {t('step1')}
          </span>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="font-mono text-fl-body text-fl-fg">
              {t('studiedBefore')}
            </p>
            <p className="font-mono text-fl-label text-fl-muted-3">
              {t('studiedBeforeHint')}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={onBeginner}
              className="w-full border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-4 hover:border-fl-border-2 hover:text-fl-fg transition-colors text-left px-5"
            >
              <span className="text-fl-muted-3 mr-3">○</span>
              {t('beginnerOption')}
              <span className="block text-fl-hint text-fl-muted-3 normal-case mt-1 ml-6">
                {t('beginnerOptionHint')}
              </span>
            </button>
            <button
              onClick={onHasExperience}
              className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-4 hover:bg-fl-fg-bright transition-colors text-left px-5"
            >
              <span className="mr-3">●</span>
              {t('hasExperienceOption')}
              <span className="block text-fl-hint font-normal normal-case mt-1 ml-6 opacity-70">
                {t('hasExperienceOptionHint')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
