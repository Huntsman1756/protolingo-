'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { vocabularySets } from '@/data/vocabulary'
import type { CEFRLevel } from '@/data/grammar'

// ── Constants ─────────────────────────────────────────────────────────────────

const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// ── Set card ──────────────────────────────────────────────────────────────────

function SetCard({ s }: { s: typeof vocabularySets[0] }) {
  return (
    <Link
      href={`/vocabulary/${s.id}`}
      className="block border border-fl-border bg-fl-surface hover:border-fl-border-2 hover:bg-fl-surface-2 transition-colors group"
    >
      <div className="px-4 py-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-xs font-bold text-fl-fg tracking-wide leading-snug group-hover:text-fl-fg-bright transition-colors">
            {s.topic}
          </p>
          <span className="shrink-0 border border-fl-border font-mono text-fl-label tracking-widest uppercase px-1.5 py-0.5 text-fl-muted-3">
            {s.level}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest">
            {s.words.length} words
          </span>
          <span className="font-mono text-fl-label text-fl-muted-4 uppercase tracking-widest">
            {s.unit_ref}
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VocabularyIndexPage() {
  const [activeLevel, setActiveLevel] = useState<CEFRLevel | 'All'>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return vocabularySets.filter((s) => {
      const matchesLevel = activeLevel === 'All' || s.level === activeLevel
      const matchesSearch = !q || s.topic.toLowerCase().includes(q) || s.id.includes(q)
      return matchesLevel && matchesSearch
    })
  }, [activeLevel, search])

  const totalWords = vocabularySets.reduce((acc, s) => acc + s.words.length, 0)
  const usedLevels = [...new Set(vocabularySets.map((s) => s.level))] as CEFRLevel[]

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Vocabulary Hub
          </span>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">
            {vocabularySets.length} sets · {totalWords} words · A1 – B1
          </p>
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics…"
            className="w-full max-w-sm bg-fl-bg border border-fl-border px-4 py-2.5 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
          />
          {/* Level filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLevel('All')}
              className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeLevel === 'All'
                  ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                  : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                }`}
            >
              All
            </button>
            {usedLevels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(activeLevel === level ? 'All' : level)}
                className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeLevel === level
                    ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                    : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Level sections */}
      {CEFR_LEVELS.map((level) => {
        const sets = filtered.filter((s) => s.level === level)
        if (!sets.length) return null
        return (
          <section key={level} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-fl-fg tracking-widest">{level}</span>
              <div className="flex-1 h-px bg-fl-border" />
              <span className="font-mono text-fl-label text-fl-muted-3">
                {sets.length} set{sets.length !== 1 ? 's' : ''} ·{' '}
                {sets.reduce((a, s) => a + s.words.length, 0)} words
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sets.map((s) => (
                <SetCard key={s.id} s={s} />
              ))}
            </div>
          </section>
        )
      })}

      {filtered.length === 0 && (
        <div className="border border-fl-border bg-fl-surface px-6 py-10 text-center">
          <p className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase">
            No vocabulary sets match your search
          </p>
        </div>
      )}
    </div>
  )
}
