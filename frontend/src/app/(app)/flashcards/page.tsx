'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

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
  { label: 'BLACKOUT', q: 0, color: '#ff3b3b' },
  { label: 'WRONG', q: 1, color: '#ff6b35' },
  { label: 'HARD', q: 3, color: '#888' },
  { label: 'GOOD', q: 4, color: '#aaa' },
  { label: 'PERFECT', q: 5, color: '#f5f5f5' },
]

export default function FlashcardsPage() {
  const [cards, setCards] = useState<CardData[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => { loadDue() }, [])

  async function loadDue() {
    setLoading(true)
    try {
      const res = await apiFetch('/api/flashcards/due')
      const data = await res.json()
      setCards(data.due)
      setTotal(data.total)
      setCurrent(0)
      setFlipped(false)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }

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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-[#555] tracking-widest uppercase animate-pulse">Loading…</span>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
        <div className="border border-[#2a2a2a] bg-[#111] px-8 py-10 text-center">
          <p className="font-mono text-[10px] tracking-widest text-[#555] uppercase mb-3">● Status</p>
          <p className="font-mono text-sm text-[#f5f5f5]">No cards due for review</p>
          <p className="font-mono text-xs text-[#555] mt-1">{total} total cards</p>
          <button
            onClick={loadDue}
            className="mt-6 border border-[#2a2a2a] px-6 py-2 font-mono text-xs tracking-widest text-[#888] uppercase hover:text-[#f5f5f5] hover:border-[#555] transition-colors"
          >
            — Refresh
          </button>
        </div>
      </div>
    )
  }

  const card = cards[current]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6">
      <div className="flex items-center gap-4 font-mono text-[10px] text-[#555] tracking-widest uppercase">
        <span>{current + 1} / {cards.length} due</span>
        <span className="border-l border-[#2a2a2a] pl-4">{total} total</span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md border border-[#2a2a2a] bg-[#111] cursor-pointer select-none transition-colors hover:border-[#555]"
        style={{ minHeight: 220 }}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
          <span className="text-[10px] text-[#555]">●</span>
          <span className="font-mono text-[10px] tracking-widest text-[#555] uppercase">
            {flipped ? 'Definition' : 'Word'}
          </span>
          <span className="ml-auto font-mono text-[9px] text-[#333] uppercase tracking-widest">
            tap to {flipped ? 'hide' : 'reveal'}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-10 gap-4 text-center">
          {!flipped ? (
            <p className="font-mono text-3xl font-bold text-[#f5f5f5] tracking-wide">{card.word}</p>
          ) : (
            <>
              <p className="font-mono text-base text-[#f5f5f5] leading-relaxed">{card.definition}</p>
              {card.example_sentence && (
                <p className="font-mono text-xs text-[#888] italic">{card.example_sentence}</p>
              )}
              {card.translation && (
                <p className="font-mono text-[10px] text-[#555] tracking-widest border-t border-[#2a2a2a] pt-3 mt-1 uppercase">{card.translation}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quality buttons */}
      {flipped && (
        <div className="flex gap-2 flex-wrap justify-center w-full max-w-md">
          {QUALITY_BUTTONS.map(({ label, q, color }) => (
            <button
              key={q}
              onClick={() => reviewCard(q)}
              className="flex-1 min-w-[80px] border border-[#2a2a2a] py-3 font-mono text-[10px] tracking-widest uppercase transition-all hover:border-[#555]"
              style={{ color }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* SM-2 meta */}
      <p className="font-mono text-[9px] text-[#333] tracking-widest uppercase">
        EF {card.ease_factor.toFixed(2)} · Interval {card.interval}d · Rep {card.repetitions}
      </p>
    </div>
  )
}
