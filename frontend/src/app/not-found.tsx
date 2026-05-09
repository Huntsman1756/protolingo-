import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="min-h-screen bg-fl-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-fl-border bg-fl-surface">
        {/* Header */}
        <div className="px-8 py-6 border-b border-fl-border flex items-center gap-3">
          <span className="font-mono text-fl-muted-2 text-sm">●</span>
          <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">FreeLingo</span>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              404
            </p>
            <h1 className="font-mono text-xl font-bold tracking-tight text-fl-fg">
              {t('title')}
            </h1>
          </div>

          <p className="font-mono text-sm text-fl-fg-2 leading-relaxed">
            {t('body')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard"
              className="flex-1 font-mono text-xs tracking-widest uppercase px-6 py-3 bg-fl-fg text-fl-bg hover:bg-fl-fg-bright transition-colors text-center"
            >
              {t('dashboard')}
            </Link>
            <Link
              href="/"
              className="flex-1 font-mono text-xs tracking-widest uppercase px-6 py-3 border border-fl-border text-fl-fg-2 hover:bg-fl-surface-2 transition-colors text-center"
            >
              {t('home')}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-fl-border">
          <p className="font-mono text-fl-hint text-fl-muted-2 text-center">
            &copy; FreeLingo
          </p>
        </div>
      </div>
    </div>
  )
}
