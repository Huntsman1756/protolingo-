'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function TermsPage() {
  const t = useTranslations('legal.terms')
  const s2Items = [t('s2i1'), t('s2i2'), t('s2i3'), t('s2i4')]

  return (
    <div>
      <div className="flex flex-col items-center mb-10">
        <Link href="/">
          <Image src="/logo.png" alt="FreeLingo" width={48} height={48} className="mb-3" />
        </Link>
        <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
        <p className="font-mono text-fl-caption text-fl-muted-2 tracking-widest uppercase mt-1">self-hosted language learning</p>
      </div>

      <div className="border border-fl-border bg-fl-surface p-8 space-y-8">
        <div className="flex items-center gap-2 pb-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">{t('pageTitle')}</span>
        </div>

        <p className="font-mono text-fl-hint text-fl-muted-2 tracking-wide">{t('updated')}</p>

        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">{t('s1Title')}</h2>
          <p className="font-mono text-sm text-fl-fg-2 leading-relaxed">{t('s1Body')}</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">{t('s2Title')}</h2>
          <p className="font-mono text-sm text-fl-fg-2 leading-relaxed">{t('s2Intro')}</p>
          <ul className="space-y-1 pl-4">
            {s2Items.map((item) => (
              <li key={item} className="font-mono text-sm text-fl-fg-2 leading-relaxed flex gap-2">
                <span className="text-fl-muted-2 flex-shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {[
          { title: t('s3Title'), body: t('s3Body') },
          { title: t('s4Title'), body: t('s4Body') },
          { title: t('s5Title'), body: t('s5Body') },
          { title: t('s6Title'), body: t('s6Body') },
          { title: t('s7Title'), body: t('s7Body') },
          { title: t('s8Title'), body: t('s8Body') },
        ].map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">{section.title}</h2>
            <p className="font-mono text-sm text-fl-fg-2 leading-relaxed">{section.body}</p>
          </section>
        ))}

        <div className="pt-4 border-t border-fl-border flex gap-6">
          <Link href="/privacy" className="font-mono text-xs text-fl-muted-2 hover:text-fl-fg tracking-widest uppercase transition-colors">
            — {t('linkPrivacy')}
          </Link>
          <Link href="/register" className="font-mono text-xs text-fl-muted-2 hover:text-fl-fg tracking-widest uppercase transition-colors">
            — {t('linkBack')}
          </Link>
        </div>
      </div>
    </div>
  )
}