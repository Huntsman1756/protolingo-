import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import PricingSection from '@/components/billing/PricingSection'
import { LandingFAQ } from '@/components/ui/landing-faq'
import { ContactButton } from '@/components/ui/contact-button'

export const metadata: Metadata = {
  title: 'FreeLingo: AI-powered language learning',
  description:
    'Learn languages with an AI tutor, real-time voice conversations, spaced-repetition flashcards, and structured grammar lessons. Self-hosted and privacy-friendly.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'FreeLingo: AI-powered language learning',
    description:
      'Learn languages with an AI tutor, real-time voice conversations, spaced-repetition flashcards, and structured grammar lessons.',
    url: 'https://freelingo.app',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreeLingo: AI-powered language learning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeLingo: AI-powered language learning',
    description:
      'Learn languages with an AI tutor, real-time voice conversations, spaced-repetition flashcards, and structured grammar lessons.',
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FreeLingo',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'Web',
  url: 'https://freelingo.app',
  description:
    'Self-hosted AI-powered language learning platform with voice conversation, flashcards, grammar lessons, and a personal AI tutor.',
  author: {
    '@type': 'Person',
    name: 'Arturo Carretero Calvo',
    url: 'https://arturocarreterocalvo.com',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default async function Home() {
  const cookieStore = await cookies()
  const hasSession = cookieStore.has('refresh_token')
  const t = await getTranslations('landing')
  const tCommon = await getTranslations('common')

  let stripeEnabled = false
  let trialDays = 7
  let priceMonthly = 0.0
  let priceYearly = 0.0
  let totalPriceMonthly = 0.0
  let totalPriceYearly = 0.0
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000'
    const configRes = await fetch(`${backendUrl}/api/config`, {
      next: { revalidate: 3600 },
    })
    if (configRes.ok) {
      const cfg = await configRes.json()
      stripeEnabled = cfg.stripe_enabled ?? false
      trialDays = cfg.stripe_trial_days ?? 7
      priceMonthly = cfg.price_monthly ?? 0.0
      priceYearly = cfg.price_yearly ?? 0.0
      totalPriceMonthly = cfg.total_price_monthly ?? 0.0
      totalPriceYearly = cfg.total_price_yearly ?? 0.0
    }
  } catch {
    /* non-fatal */
  }

  return (
    <div className="bg-fl-bg bg-dot-grid text-fl-fg flex min-h-screen flex-col scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="border-fl-border bg-fl-bg/80 sticky top-0 z-10 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="FreeLingo" width={28} height={28} />
            <span className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
              FreeLingo
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t('navFeatures')}
            </a>
            {stripeEnabled && (
              <a
                href="#pricing"
                className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
              >
                {t('navPricing')}
              </a>
            )}
            <a
              href="#faq"
              className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t('navFAQ')}
            </a>
            <Link
              href={hasSession ? '/dashboard' : '/login'}
              className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {hasSession ? t('dashboard') : t('signIn')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="FreeLingo"
            width={64}
            height={64}
            className="mb-6 opacity-90"
          />
          <span className="text-fl-label text-fl-muted-2 mb-4 font-mono tracking-widest uppercase">
            {tCommon('tagline')}
          </span>
          <h1 className="text-fl-fg mb-4 max-w-xl font-sans text-3xl leading-tight font-bold tracking-tight md:text-5xl">
            {t('hero')}
          </h1>
          <p className="text-fl-muted-1 mb-8 max-w-lg font-sans text-base leading-relaxed md:text-lg">
            {t('heroSub')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={hasSession ? '/dashboard' : '/login'}
            className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
          >
            {hasSession ? t('dashboard') : t('signIn')}
          </Link>
          <a
            href="#features"
            className="border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-8 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
          >
            {t('howItWorks')} ↓
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: t('feature1Title'), desc: t('feature1Desc'), icon: '◎' },
            { title: t('feature2Title'), desc: t('feature2Desc'), icon: '▣' },
            { title: t('feature3Title'), desc: t('feature3Desc'), icon: '△' },
            { title: t('feature4Title'), desc: t('feature4Desc'), icon: '◈' },
            { title: t('feature5Title'), desc: t('feature5Desc'), icon: '◻' },
            { title: t('feature6Title'), desc: t('feature6Desc'), icon: '◇' },
          ].map((f) => (
            <div
              key={f.title}
              className="border-fl-border bg-fl-surface border p-6"
            >
              <div className="border-fl-border mb-4 flex items-center gap-2 border-b pb-3">
                <span className="text-fl-muted-2 text-sm">{f.icon}</span>
                <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                  {f.title}
                </span>
              </div>
              <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <PricingSection
          stripeEnabled={stripeEnabled}
          trialDays={trialDays}
          hasSession={hasSession}
          priceMonthly={priceMonthly}
          priceYearly={priceYearly}
          totalPriceMonthly={totalPriceMonthly}
          totalPriceYearly={totalPriceYearly}
        />
      </div>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-3xl px-6 pb-16">
        <h2 className="text-fl-label text-fl-muted-2 mb-8 text-center font-mono tracking-widest uppercase">
          {t('faqTitle')}
        </h2>
        <LandingFAQ />
      </section>

      {/* Footer */}
      <footer className="border-fl-border border-t px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 md:flex-row">
          <span className="text-fl-hint text-fl-muted-3 font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} FreeLingo
          </span>
          <div className="flex gap-6">
            <ContactButton />
            <a
              href="https://arturocarreterocalvo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 font-mono tracking-widest uppercase transition-colors"
            >
              {t('aboutMe')}
            </a>
            <a
              href="https://github.com/ArtCC/freelingo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 font-mono tracking-widest uppercase transition-colors"
            >
              {t('github')}
            </a>
            <Link
              href="/privacy?from=landing"
              className="text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 font-mono tracking-widest uppercase transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms?from=landing"
              className="text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 font-mono tracking-widest uppercase transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
