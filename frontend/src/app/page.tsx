import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const cookieStore = await cookies()
  const hasSession = cookieStore.has('refresh_token')
  const t = await getTranslations('landing')
  const tCommon = await getTranslations('common')

  return (
    <div
      className="min-h-screen flex flex-col bg-fl-bg text-fl-fg"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Nav */}
      <nav className="border-b border-fl-border bg-fl-bg/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="FreeLingo" width={28} height={28} />
            <span className="font-mono text-sm font-bold tracking-widest uppercase text-fl-fg">
              FreeLingo
            </span>
          </div>
          <Link
            href={hasSession ? '/dashboard' : '/login'}
            className="font-mono text-xs tracking-widest uppercase px-5 py-2 border border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors"
          >
            {hasSession ? `— ${t('dashboard')}` : `— ${t('signIn')}`}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="flex flex-col items-center mb-10">
          <Image src="/logo.png" alt="FreeLingo" width={72} height={72} className="mb-6 opacity-90" />
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-4">
            {tCommon('tagline')}
          </span>
          <h1 className="font-mono text-xl md:text-2xl font-bold text-fl-fg max-w-lg leading-snug mb-3">
            {t('hero')}
          </h1>
          <p className="font-mono text-sm text-fl-muted-1 tracking-widest uppercase">
            {t('heroSub')}
          </p>
        </div>
        <Link
          href={hasSession ? '/dashboard' : '/login'}
          className="font-mono text-xs font-bold tracking-widest uppercase px-8 py-3 bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 transition-colors"
        >
          {hasSession ? `— ${t('dashboard')}` : `— ${t('signIn')}`}
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: t('feature1Title'), desc: t('feature1Desc'), icon: '◎' },
            { title: t('feature2Title'), desc: t('feature2Desc'), icon: '▣' },
            { title: t('feature3Title'), desc: t('feature3Desc'), icon: '△' },
          ].map((f) => (
            <div key={f.title} className="border border-fl-border bg-fl-surface p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-fl-border">
                <span className="text-fl-muted-2 text-sm">{f.icon}</span>
                <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
                  {f.title}
                </span>
              </div>
              <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fl-border py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-mono text-fl-hint text-fl-muted-3 tracking-widest uppercase">
            © {new Date().getFullYear()} FreeLingo · {t('footer')}
          </span>
          <div className="flex gap-6">
            <Link href="/terms?from=landing" className="font-mono text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 tracking-widest uppercase transition-colors">
              {t('terms')}
            </Link>
            <Link href="/privacy?from=landing" className="font-mono text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 tracking-widest uppercase transition-colors">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

