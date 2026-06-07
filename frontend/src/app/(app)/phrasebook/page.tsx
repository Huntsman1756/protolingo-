'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { getPhrasebookCategories, type Register } from '@/data/phrasebook'
import type { CEFRLevel } from '@/data/types'
import { useLanguageStore } from '@/store/language'

// ── Constants ─────────────────────────────────────────────────────────────────

const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const REGISTERS: Register[] = ['formal', 'neutral', 'informal']

const REGISTER_COLORS: Record<string, string> = {
  formal: 'text-blue-600 dark:text-blue-400',
  neutral: 'text-fl-muted-2',
  informal: 'text-amber-600 dark:text-amber-400',
}

type PhrasebookCategory = ReturnType<typeof getPhrasebookCategories>[number]

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  registerFilter,
}: {
  cat: PhrasebookCategory
  registerFilter: Register | 'All'
}) {
  const t = useTranslations('phrasebook')
  const phrases =
    registerFilter === 'All'
      ? cat.phrases
      : cat.phrases.filter((p) => p.register === registerFilter)

  if (!phrases.length) return null

  return (
    <div className="border-fl-border bg-fl-surface border">
      {/* Card header */}
      <div className="border-fl-border flex items-center gap-3 border-b px-5 py-4">
        <span className="text-xl">{cat.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-fl-fg truncate font-mono text-xs font-bold tracking-wide">
            {cat.situation}
          </p>
        </div>
        <span className="border-fl-border text-fl-label text-fl-muted-3 shrink-0 border px-2 py-0.5 font-mono tracking-widest uppercase">
          {cat.level}
        </span>
      </div>

      {/* Phrases */}
      <ul className="divide-fl-border divide-y">
        {phrases.map((phrase, i) => (
          <li key={i} className="group space-y-1 px-5 py-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-fl-fg flex-1 font-mono text-xs leading-relaxed">
                {phrase.english}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <span
                  className={`text-fl-label font-mono tracking-widest uppercase ${REGISTER_COLORS[phrase.register]}`}
                >
                  {t(phrase.register)}
                </span>
                <CopyButton text={phrase.english} />
              </div>
            </div>
            {phrase.context && (
              <p className="text-fl-label text-fl-muted-3 font-mono italic">
                {phrase.context}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-fl-label text-fl-muted-4 hover:text-fl-fg px-1 font-mono transition-colors"
      title="Copy"
      aria-label="Copy phrase"
    >
      {copied ? '✓' : '📋'}
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PhrasebookPage() {
  const t = useTranslations('phrasebook')
  const tCommon = useTranslations('common')
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)
  const [activeLevel, setActiveLevel] = useState<CEFRLevel | 'All'>('All')
  const [activeRegister, setActiveRegister] = useState<Register | 'All'>('All')

  const phrasebookCategories = useMemo(
    () => getPhrasebookCategories(activeLanguage?.code),
    [activeLanguage?.code]
  )

  const filteredCategories = useMemo(() => {
    return phrasebookCategories.filter((cat) => {
      const matchesLevel = activeLevel === 'All' || cat.level === activeLevel
      const matchesRegister =
        activeRegister === 'All' ||
        cat.phrases.some((p) => p.register === activeRegister)
      return matchesLevel && matchesRegister
    })
  }, [activeLevel, activeRegister, phrasebookCategories])

  const totalPhrases = phrasebookCategories.reduce(
    (acc, c) => acc + c.phrases.length,
    0
  )

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header */}
      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('title')}
          </span>
        </div>
        <div className="space-y-4 px-6 py-5">
          <p className="text-fl-muted-2 font-mono text-xs leading-relaxed">
            {t('statsLine', {
              situationCount: phrasebookCategories.length,
              phraseCount: totalPhrases,
              range: `${CEFR_LEVELS[0]} – ${CEFR_LEVELS[CEFR_LEVELS.length - 1]}`,
            })}
          </p>

          {/* Level filter */}
          <div className="space-y-2">
            <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
              {t('level')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...CEFR_LEVELS] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`text-fl-label border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors ${
                    activeLevel === lvl
                      ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                      : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
                >
                  {lvl === 'All' ? tCommon('all') : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Register filter */}
          <div className="space-y-2">
            <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
              {t('register')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...REGISTERS] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveRegister(reg)}
                  className={`text-fl-label border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors ${
                    activeRegister === reg
                      ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                      : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
                >
                  {reg === 'All' ? tCommon('all') : t(reg)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {(activeLevel !== 'All' || activeRegister !== 'All') && (
        <p className="text-fl-label text-fl-muted-3 font-mono">
          {t('situationsShown', { count: filteredCategories.length })}
        </p>
      )}

      {/* Level sections */}
      {CEFR_LEVELS.map((level) => {
        const cats = filteredCategories.filter((c) => c.level === level)
        if (!cats.length) return null
        return (
          <section key={level} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-fl-fg font-mono text-base font-bold tracking-widest">
                {level}
              </span>
              <div className="bg-fl-border h-px flex-1" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cats.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  registerFilter={activeRegister}
                />
              ))}
            </div>
          </section>
        )
      })}

      {filteredCategories.length === 0 && (
        <div className="border-fl-border bg-fl-surface space-y-4 border px-6 py-10 text-center">
          <p className="text-fl-muted-3 font-mono text-xs tracking-widest uppercase">
            {t('noResults')}
          </p>
          {(activeLevel !== 'All' || activeRegister !== 'All') && (
            <button
              onClick={() => {
                setActiveLevel('All')
                setActiveRegister('All')
              }}
              className="text-fl-label border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg border px-4 py-2 font-mono tracking-widest uppercase transition-colors"
            >
              {tCommon('clearFilters')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
