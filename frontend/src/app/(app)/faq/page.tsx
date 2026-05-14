'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface FAQItem {
  q: string
  a: React.ReactNode
}

export default function FAQPage() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<number | null>(null)

  const strong = (chunks: React.ReactNode) => <strong className="text-fl-fg">{chunks}</strong>
  const code = (chunks: React.ReactNode) => <code className="text-fl-fg bg-fl-surface-2 px-1">{chunks}</code>
  const adminLink = (chunks: React.ReactNode) => (
    <Link href="/admin/users" className="text-fl-fg underline underline-offset-2">{chunks}</Link>
  )
  const settingsLink = (chunks: React.ReactNode) => (
    <Link href="/settings" className="text-fl-fg underline underline-offset-2">{chunks}</Link>
  )

  const workflowSteps = [
    t('workflowStep1'),
    t('workflowStep2'),
    t('workflowStep3'),
    t('workflowStep4'),
    t('workflowStep5'),
    t('workflowStep6'),
  ]

  const providers: [string, string][] = [
    ['ollama', t('provider_ollama')],
    ['openai', t('provider_openai')],
    ['anthropic', t('provider_anthropic')],
    ['deepseek', t('provider_deepseek')],
  ]

  const faqs: FAQItem[] = [
    { q: t('q_start'), a: t.rich('a_start', { strong }) },
    {
      q: t('q_workflow'),
      a: (
        <ol className="list-none space-y-1">
          {workflowSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono text-fl-label text-fl-muted-4 mt-0.5 shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      ),
    },
    { q: t('q_language'), a: t('a_language') },
    { q: t('q_assessment'), a: t('a_assessment') },
    { q: t('q_studyPlan'), a: t.rich('a_studyPlan', { strong }) },
    { q: t('q_flashcards'), a: t.rich('a_flashcards', { strong }) },
    { q: t('q_tutor'), a: t('a_tutor') },
    { q: t('q_voice'), a: t.rich('a_voice', { strong }) },
    {
      q: t('q_providers'),
      a: (
        <>
          {t.rich('a_providers_intro', { code })}
          <ul className="mt-2 space-y-1 list-none">
            {providers.map(([name, desc]) => (
              <li key={name} className="flex items-start gap-2">
                <code className="text-fl-muted-1 shrink-0">{name}</code>
                <span className="text-fl-muted-2">— {desc}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    { q: t('q_invite'), a: t.rich('a_invite', { adminLink, code }) },
    { q: t('q_password'), a: t.rich('a_password', { settingsLink }) },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-fl-border">
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-1">{t('title')}</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-fl-fg">{t('subtitle')}</h1>
      </div>

      {/* Accordion */}
      <div className="border border-fl-border">
        {faqs.map((item, i) => (
          <div key={i} className={i < faqs.length - 1 ? 'border-b border-fl-border' : ''}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-fl-surface transition-colors"
            >
              <span className="font-mono text-xs text-fl-fg tracking-wide pr-4">{item.q}</span>
              <span className="font-mono text-fl-muted-2 text-sm shrink-0">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 font-mono text-xs text-fl-muted-1 leading-relaxed border-t border-fl-border pt-4 bg-fl-bg-alt">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
