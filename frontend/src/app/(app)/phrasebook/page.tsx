'use client'

import { useState, useMemo } from 'react'
import { phrasebookCategories, type Register } from '@/data/phrasebook'
import type { CEFRLevel } from '@/data/grammar'

// ── Constants ─────────────────────────────────────────────────────────────────

const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2']
const REGISTERS: Register[] = ['formal', 'neutral', 'informal']

const REGISTER_COLORS: Record<Register, string> = {
  formal: 'text-blue-600 dark:text-blue-400',
  neutral: 'text-fl-muted-2',
  informal: 'text-amber-600 dark:text-amber-400',
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  registerFilter,
}: {
  cat: typeof phrasebookCategories[0]
  registerFilter: Register | 'All'
}) {
  const phrases =
    registerFilter === 'All'
      ? cat.phrases
      : cat.phrases.filter((p) => p.register === registerFilter)

  if (!phrases.length) return null

  return (
    <div className="border border-fl-border bg-fl-surface">
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-fl-border">
        <span className="text-xl">{cat.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs font-bold text-fl-fg tracking-wide truncate">
            {cat.situation}
          </p>
        </div>
        <span className="shrink-0 border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
          {cat.level}
        </span>
      </div>

      {/* Phrases */}
      <ul className="divide-y divide-fl-border">
        {phrases.map((phrase, i) => (
          <li key={i} className="px-5 py-3 space-y-1 group">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-xs text-fl-fg leading-relaxed flex-1">
                {phrase.english}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`font-mono text-fl-label tracking-widest uppercase ${REGISTER_COLORS[phrase.register]}`}>
                  {phrase.register}
                </span>
                <CopyButton text={phrase.english} />
              </div>
            </div>
            {phrase.context && (
              <p className="font-mono text-fl-label text-fl-muted-3 italic">
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
    } catch { /* ignore */ }
  }

  return (
    <button
      onClick={handleCopy}
      className="font-mono text-fl-label text-fl-muted-4 hover:text-fl-fg transition-colors px-1"
      title="Copy"
      aria-label="Copy phrase"
    >
      {copied ? '✓' : '📋'}
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PhrasebookPage() {
  const [activeLevel, setActiveLevel] = useState<CEFRLevel | 'All'>('All')
  const [activeRegister, setActiveRegister] = useState<Register | 'All'>('All')

  const filteredCategories = useMemo(() => {
    return phrasebookCategories.filter((cat) => {
      const matchesLevel = activeLevel === 'All' || cat.level === activeLevel
      const matchesRegister =
        activeRegister === 'All' || cat.phrases.some((p) => p.register === activeRegister)
      return matchesLevel && matchesRegister
    })
  }, [activeLevel, activeRegister])

  const totalPhrases = phrasebookCategories.reduce((acc, c) => acc + c.phrases.length, 0)

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Phrasebook
          </span>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">
            {phrasebookCategories.length} situations · {totalPhrases} phrases · A1 – B2
          </p>

          {/* Level filter */}
          <div className="space-y-2">
            <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase">Level</p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...CEFR_LEVELS] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeLevel === lvl
                      ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                      : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Register filter */}
          <div className="space-y-2">
            <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase">Register</p>
            <div className="flex flex-wrap gap-2">
              {(['All', ...REGISTERS] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveRegister(reg)}
                  className={`font-mono text-fl-label tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeRegister === reg
                      ? 'border-fl-fg text-fl-fg bg-fl-surface-2'
                      : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {(activeLevel !== 'All' || activeRegister !== 'All') && (
        <p className="font-mono text-fl-label text-fl-muted-3">
          {filteredCategories.length} situation{filteredCategories.length !== 1 ? 's' : ''} shown
        </p>
      )}

      {/* Level sections */}
      {CEFR_LEVELS.map((level) => {
        const cats = filteredCategories.filter((c) => c.level === level)
        if (!cats.length) return null
        return (
          <section key={level} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-fl-fg tracking-widest">{level}</span>
              <div className="flex-1 h-px bg-fl-border" />
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
        <div className="border border-fl-border bg-fl-surface px-6 py-10 text-center">
          <p className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase">
            No phrases match your filters
          </p>
        </div>
      )}
    </div>
  )
}
