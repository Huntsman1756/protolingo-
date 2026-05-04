'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { grammarTopics, type GrammarCategory, type GrammarTopic } from '@/data/grammar'
import { CEFR_LEVELS } from '@/data/curriculum'

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_CATEGORIES: GrammarCategory[] = [
  'Tenses',
  'Questions',
  'Nouns',
  'Pronouns',
  'Adjectives & Adverbs',
  'Modals',
  'Conditionals',
  'Passive Voice',
  'Reported Speech',
  'Clauses',
  'Articles',
  'Prepositions',
  'Phrasal Verbs',
  'Advanced',
]

// ── Topic card ────────────────────────────────────────────────────────────────

function TopicCard({ topic }: { topic: GrammarTopic }) {
  return (
    <Link
      href={`/grammar/${topic.slug}`}
      className="block border border-fl-border bg-fl-surface hover:border-fl-border-2 hover:bg-fl-surface-2 transition-colors group"
    >
      <div className="px-4 py-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-xs font-bold text-fl-fg tracking-wide leading-snug group-hover:text-fl-fg-bright transition-colors">
            {topic.title}
          </p>
          <span className="shrink-0 border border-fl-border font-mono text-fl-label tracking-widest uppercase px-1.5 py-0.5 text-fl-muted-3">
            {topic.level}
          </span>
        </div>
        <p className="font-mono text-fl-label text-fl-muted-2 leading-relaxed">
          {topic.summary}
        </p>
        <span className="inline-block border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
          {topic.category}
        </span>
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GrammarIndexPage() {
  const t = useTranslations('grammar')
  const tCommon = useTranslations('common')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GrammarCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return grammarTopics.filter((t) => {
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      const matchesCategory =
        activeCategory === 'All' || t.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const usedCategories = useMemo(() => {
    const cats = new Set(grammarTopics.map((t) => t.category))
    return ALL_CATEGORIES.filter((c) => cats.has(c))
  }, [])

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {t('title')}
          </span>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">
            {grammarTopics.length} topics · A1 – C2
          </p>
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full max-w-sm bg-fl-bg border border-fl-border px-4 py-2.5 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
          />
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeCategory === 'All'
                ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                }`}
            >
              {t('allCategories')}
            </button>
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeCategory === cat
                  ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                  : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count when filtering */}
      {(search || activeCategory !== 'All') && (
        <p className="font-mono text-fl-label text-fl-muted-3">
          {t('topicsFound', { count: filtered.length })}
        </p>
      )}

      {/* Level sections */}
      {CEFR_LEVELS.map((level) => {
        const topics = filtered.filter((t) => t.level === level)
        if (!topics.length) return null
        return (
          <section key={level} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-fl-fg tracking-widest">
                {level}
              </span>
              <div className="flex-1 h-px bg-fl-border" />
              <span className="font-mono text-fl-label text-fl-muted-3">
                {topics.length} topic{topics.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <TopicCard key={t.slug} topic={t} />
              ))}
            </div>
          </section>
        )
      })}

      {filtered.length === 0 && (
        <div className="border border-fl-border bg-fl-surface px-6 py-10 text-center space-y-4">
          <p className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase">
            {t('noResults')}
          </p>
          {(search || activeCategory !== 'All') && (
            <button
              onClick={() => { setSearch(''); setActiveCategory('All') }}
              className="font-mono text-fl-label tracking-widest uppercase px-4 py-2 border border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
            >
              {tCommon('clearFilters')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
