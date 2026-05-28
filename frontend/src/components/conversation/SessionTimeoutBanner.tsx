'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  /** Remaining seconds as reported by the backend session_warning message */
  seconds: number
}

export default function SessionTimeoutBanner({ seconds }: Props) {
  const t = useTranslations('conversation')
  // Count down locally from the value the backend sent
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000)
    return () => clearInterval(id)
  }, [remaining])

  return (
    <div className="border-fl-error/40 bg-fl-surface text-fl-error mb-4 flex items-center gap-3 border px-4 py-3 font-mono text-xs">
      <span className="animate-pulse">▲</span>
      <span>{t('warningTimeout', { seconds: remaining })}</span>
    </div>
  )
}
