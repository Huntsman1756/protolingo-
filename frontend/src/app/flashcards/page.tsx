'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

export default function FlashcardsPage() {
  const [cards, setCards] = useState<CardData[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadDue()
  }, [])

  async function loadDue() {
    setLoading(true)
    try {
      const res = await apiFetch('/api/flashcards/due')
      const data = await res.json()
      setCards(data.due)
      setTotal(data.total)
      setCurrent(0)
      setFlipped(false)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Loading flashcards...</p>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-zinc-500">
            No flashcards due for review. {total} total cards.
          </p>
          <Button variant="outline" onClick={loadDue}>
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  const card = cards[current]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 gap-6">
      <p className="text-sm text-zinc-500">
        {current + 1} of {cards.length} due · {total} total
      </p>

      <Card
        className="w-full max-w-md cursor-pointer select-none min-h-[200px] flex items-center justify-center"
        onClick={() => setFlipped(!flipped)}
      >
        <CardContent className="text-center p-8">
          {!flipped ? (
            <div>
              <p className="text-3xl font-bold">{card.word}</p>
              <p className="mt-2 text-sm text-zinc-500">Tap to reveal</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg">{card.definition}</p>
              <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
                {card.example_sentence}
              </p>
              <p className="text-xs text-zinc-400">{card.translation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {flipped && (
        <div className="flex gap-2 flex-wrap justify-center">
          <Button variant="destructive" onClick={() => reviewCard(0)}>
            Blackout
          </Button>
          <Button variant="outline" onClick={() => reviewCard(1)}>
            Wrong
          </Button>
          <Button variant="secondary" onClick={() => reviewCard(3)}>
            Hard
          </Button>
          <Button onClick={() => reviewCard(4)}>
            Good
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => reviewCard(5)}>
            Perfect
          </Button>
        </div>
      )}
    </div>
  )
}
