'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const COOKIE_KEY = 'fl_cookie_consent'

export function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable (SSR, private mode) — don't show
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(COOKIE_KEY, 'accepted')
    } catch { /* ignore */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-fl-border bg-fl-surface">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-mono text-xs text-fl-fg-2 leading-relaxed flex-1">
          {t('message')}{' '}
          <Link href="/privacy" className="underline text-fl-fg hover:text-fl-fg-bright">
            {t('learnMore')}
          </Link>
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 font-mono text-xs tracking-widest uppercase px-6 py-2 bg-fl-fg text-fl-bg hover:bg-fl-fg-bright transition-colors whitespace-nowrap"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
