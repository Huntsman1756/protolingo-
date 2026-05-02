import { useTranslations } from 'next-intl'
import type { ConvStatus } from './StatusIndicator'

interface Props {
  status: ConvStatus
  sessionActive: boolean
  onStart: () => void
  onStop: () => void
}

export default function MicButton({ status, sessionActive, onStart, onStop }: Props) {
  const t = useTranslations('conversation')

  if (status === 'loading') {
    return (
      <button
        disabled
        className="w-16 h-16 rounded-full border-2 border-fl-border bg-fl-surface flex items-center justify-center opacity-40"
        aria-label={t('statusLoading')}
      >
        <span className="font-mono text-xl text-fl-muted-4 animate-pulse">◌</span>
      </button>
    )
  }

  if (status === 'connecting') {
    return (
      <button
        disabled
        className="w-16 h-16 rounded-full border-2 border-fl-border bg-fl-surface flex items-center justify-center opacity-60"
        aria-label={t('statusConnecting')}
      >
        <span className="font-mono text-xl text-fl-muted-2 animate-pulse">○</span>
      </button>
    )
  }

  if (status === 'ready') {
    return (
      <button
        onClick={onStart}
        className="px-8 py-3 bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase hover:bg-fl-accent/90 transition-colors"
      >
        — {t('start')}
      </button>
    )
  }

  if (status === 'live') {
    return (
      <button
        onClick={onStop}
        className="w-16 h-16 rounded-full border-2 border-fl-error/60 bg-fl-surface flex items-center justify-center hover:bg-fl-error/10 transition-colors group"
        aria-label={t('stop')}
        title={t('stop')}
      >
        <span className="font-mono text-lg text-fl-error group-hover:scale-110 transition-transform">■</span>
      </button>
    )
  }

  // ended or error → offer restart
  return (
    <button
      onClick={onStart}
      className="px-8 py-3 border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase hover:text-fl-fg hover:border-fl-border-2 transition-colors"
    >
      — {t('startNew')}
    </button>
  )
}
