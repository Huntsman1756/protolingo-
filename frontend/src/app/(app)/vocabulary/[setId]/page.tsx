'use client'

import { useState, use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { vocabularySets } from '@/data/vocabulary'
import { apiFetch } from '@/lib/api'

const POS_LABELS: Record<string, string> = {
  noun: 'n.',
  verb: 'v.',
  adjective: 'adj.',
  adverb: 'adv.',
  phrase: 'phr.',
  conjunction: 'conj.',
  preposition: 'prep.',
  numeral: 'num.',
  pronoun: 'pron.',
}

export default function VocabularySetPage({
  params,
}: {
  params: Promise<{ setId: string }>
}) {
  const { setId } = use(params)
  const router = useRouter()
  const t = useTranslations('vocabulary')
  const vocabSet = vocabularySets.find((s) => s.id === setId)
  if (!vocabSet) notFound()

  const [adding, setAdding] = useState(false)
  const [addedCount, setAddedCount] = useState<number | null>(null)
  const [error, setError] = useState('')

  async function handleAddAll() {
    if (!vocabSet) return
    setAdding(true)
    setError('')
    try {
      const cards = vocabSet.words.map((w) => ({
        word: w.word,
        definition: w.definition,
        example_sentence: w.example,
        translation: '',   // user's native language translation will be added by LLM generation
      }))
      const res = await apiFetch('/api/flashcards/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flashcards: cards }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error((d as { detail?: string }).detail ?? `Error ${res.status}`)
      }
      const data = await res.json() as { created: number }
      setAddedCount(data.created)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add flashcards.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-fl-label text-fl-muted-3">
        <Link href="/vocabulary" className="hover:text-fl-fg transition-colors uppercase tracking-widest">
          Vocabulary
        </Link>
        <span>›</span>
        <span className="text-fl-muted-2 tracking-widest uppercase">{vocabSet.level}</span>
        <span>›</span>
        <span className="text-fl-fg tracking-wide">{vocabSet.topic}</span>
      </nav>

      {/* Header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {t('vocabularySet')}
          </span>
        </div>
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
              {vocabSet.level}
            </span>
            <span className="border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
              {vocabSet.unit_ref}
            </span>
          </div>
          <h1 className="font-mono text-xl font-bold text-fl-fg tracking-wide">
            {vocabSet.topic}
          </h1>
          <p className="font-mono text-fl-label text-fl-muted-3">
            {vocabSet.words.length} {t('words')}
          </p>

          {/* Add to flashcards */}
          {addedCount !== null ? (
            <div className="border border-green-500 px-4 py-2">
              <p className="font-mono text-xs text-green-600 dark:text-green-400">
                ✓ {t('cardsAdded', { count: addedCount })}{' '}
                <button
                  onClick={() => router.push('/flashcards')}
                  className="underline hover:no-underline"
                >
                  {t('goToFlashcards')}
                </button>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddAll}
                disabled={adding}
                className="bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
              >
                {adding ? '— Adding...' : `— ${t('addAll', { count: vocabSet.words.length })}`}
              </button>
            </div>
          )}
          {error && (
            <p className="font-mono text-xs text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* Word list */}
      <div className="border border-fl-border bg-fl-surface divide-y divide-fl-border">
        {vocabSet.words.map((word, i) => (
          <div key={i} className="px-5 py-4 space-y-1.5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-fl-fg">{word.word}</span>
              <span className="font-mono text-fl-label text-fl-muted-3 italic">
                {POS_LABELS[word.pos] ?? word.pos}
              </span>
              {word.ipa && (
                <span className="font-mono text-fl-label text-fl-muted-3">{word.ipa}</span>
              )}
              {word.frequency_rank && (
                <span className="ml-auto font-mono text-fl-label text-fl-muted-4">
                  #{word.frequency_rank}
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">
              {word.definition}
            </p>
            <p className="font-mono text-xs text-fl-muted-3 italic leading-relaxed">
              &ldquo;{word.example}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/vocabulary"
        className="inline-block font-mono text-fl-label text-fl-muted-2 tracking-widest uppercase hover:text-fl-fg transition-colors"
      >
        ← {t('backToVocabulary')}
      </Link>
    </div>
  )
}
