'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

interface CardData {
  id: number
  word: string
  definition: string
  example_sentence: string
  translation: string
  ease_factor: number
  interval: number
  repetitions: number
}

const QUALITY_BUTTONS = [
  { label: 'BLACKOUT', q: 0, color: '#ff5555' },
  { label: 'WRONG', q: 1, color: '#ff8855' },
  { label: 'HARD', q: 3, color: '#888' },
  { label: 'GOOD', q: 4, color: '#aaa' },
  { label: 'PERFECT', q: 5, color: '#f5f5f5' },
]

export default function FlashcardsPage() {
  const user = useAuthStore((s) => s.user)
  const [cards, setCards] = useState<CardData[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [showGenerate, setShowGenerate] = useState(false)
  const [genTopic, setGenTopic] = useState('')
  const [genCount, setGenCount] = useState(10)
  const [genCefr, setGenCefr] = useState('B1')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  const loadDue = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/api/flashcards/due')
      if (res.ok) {
        const data = await res.json()
        setCards(data.due)
        setTotal(data.total)
        setCurrent(0)
        setFlipped(false)
      }
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadDue() }, [loadDue])

  async function reviewCard(quality: number) {
    if (cards.length === 0) return
    const card = cards[current]
    await apiFetch(`/api/flashcards/${card.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quality }),
    })
    if (current < cards.length - 1) {
      setCurrent(current + 1)
      setFlipped(false)
    } else {
      await loadDue()
    }
  }

  async function generateCards(e: React.FormEvent) {
    e.preventDefault()
    if (!genTopic.trim()) return
    setGenerating(true)
    setGenError('')
    try {
      const res = await apiFetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: genTopic.trim(),
          count: genCount,
          cefr_level: genCefr,
          native_language: user?.native_language ?? 'es',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Error ${res.status}`)
      }
      setShowGenerate(false)
      setGenTopic('')
      await loadDue()
    } catch (err: unknown) {
      setGenError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-[#666] tracking-widest uppercase animate-pulse">Loading…</span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#666]">●</span>
          <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Flashcards</span>
          <span className="font-mono text-[9px] text-[#777] tracking-widest">— {total} total · {cards.length} due</span>
        </div>
        <button
          onClick={() => setShowGenerate(!showGenerate)}
          className={`border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${
            showGenerate
              ? 'border-[#444] text-[#f5f5f5]'
              : 'border-[#2a2a2a] text-[#777] hover:text-[#f5f5f5] hover:border-[#444]'
          }`}
        >
          + Generate
        </button>
      </div>

      {/* Generate panel */}
      {showGenerate && (
        <div className="border border-[#2a2a2a] bg-[#111]">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a2a]">
            <span className="text-[10px] text-[#666]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Generate with AI</span>
          </div>
          {genError && (
            <div className="mx-5 mt-4 border border-[#ff3b3b]/40 px-4 py-3 font-mono text-xs text-[#ff6b6b]">✕ {genError}</div>
          )}
          <form onSubmit={generateCards} className="p-5 space-y-3">
            <div>
              <label className="block font-mono text-[10px] tracking-widest text-[#666] uppercase mb-2">Topic</label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                required
                placeholder="e.g. travel, food, business..."
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] placeholder:text-[#444] focus:outline-none focus:border-[#444] transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-[#666] uppercase mb-2">Count</label>
                <select
                  value={genCount}
                  onChange={(e) => setGenCount(Number(e.target.value))}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#444] appearance-none"
                >
                  {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} cards</option>)}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-[#666] uppercase mb-2">Level</label>
                <select
                  value={genCefr}
                  onChange={(e) => setGenCefr(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#444] appearance-none"
                >
                  {['A1','A2','B1','B2','C1','C2'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={generating || !genTopic.trim()}
              className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white disabled:opacity-40 transition-colors"
            >
              {generating ? '— Generating…' : '— Generate Cards'}
            </button>
          </form>
        </div>
      )}

      {/* No cards */}
      {cards.length === 0 && (
        <div className="border border-[#2a2a2a] bg-[#111] px-6 py-10 text-center">
          <p className="font-mono text-sm text-[#888]">No cards due for review</p>
          {total === 0 && (
            <p className="font-mono text-xs text-[#777] mt-2">Use <span className="text-[#888]">+ Generate</span> to create your first cards with AI</p>
          )}
          <button
            onClick={loadDue}
            className="mt-6 border border-[#2a2a2a] px-6 py-2 font-mono text-[10px] tracking-widest text-[#777] uppercase hover:text-[#f5f5f5] hover:border-[#444] transition-colors"
          >
            — Refresh
          </button>
        </div>
      )}

      {/* Card review */}
      {cards.length > 0 && (
        <>
          <div className="flex items-center gap-4 font-mono text-[10px] text-[#666] tracking-widest uppercase">
            <span>{current + 1} / {cards.length} due</span>
          </div>

          <div
            className="border border-[#2a2a2a] bg-[#111] cursor-pointer select-none transition-colors hover:border-[#444]"
            style={{ minHeight: 220 }}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#666]">●</span>
                <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">
                  {flipped ? 'Definition' : 'Word'}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#444] uppercase tracking-widest">
                tap to {flipped ? 'hide' : 'reveal'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-10 gap-4 text-center">
              {!flipped ? (
                <p className="font-mono text-3xl font-bold text-[#f5f5f5] tracking-wide">{cards[current].word}</p>
              ) : (
                <>
                  <p className="font-mono text-base text-[#e0e0e0] leading-relaxed">{cards[current].definition}</p>
                  {cards[current].example_sentence && (
                    <p className="font-mono text-xs text-[#888] italic">{cards[current].example_sentence}</p>
                  )}
                  {cards[current].translation && (
                    <p className="font-mono text-[10px] text-[#666] tracking-widest border-t border-[#2a2a2a] pt-3 mt-1 uppercase">{cards[current].translation}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {flipped && (
            <div className="flex gap-2 flex-wrap">
              {QUALITY_BUTTONS.map(({ label, q, color }) => (
                <button
                  key={q}
                  onClick={() => reviewCard(q)}
                  className="flex-1 min-w-[80px] border border-[#2a2a2a] py-3 font-mono text-[10px] tracking-widest uppercase transition-all hover:border-[#444]"
                  style={{ color }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <p className="font-mono text-[9px] text-[#444] tracking-widest uppercase text-center">
            EF {cards[current].ease_factor.toFixed(2)} · Interval {cards[current].interval}d · Rep {cards[current].repetitions}
          </p>
        </>
      )}
    </div>
  )
}
