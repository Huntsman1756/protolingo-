'use client'

import { useState, use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getVocabularySets } from '@/data/vocabulary'
import { useLanguageStore } from '@/store/language'
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
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)
  const vocabSet = getVocabularySets(activeLanguage?.code ?? 'en-US').find(
    (s) => s.id === setId
  )
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
        translation: '', // user's native language translation will be added by LLM generation
      }))
      const res = await apiFetch('/api/flashcards/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flashcards: cards }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(
          (d as { detail?: string }).detail ?? `Error ${res.status}`
        )
      }
      const data = (await res.json()) as { created: number }
      setAddedCount(data.created)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add flashcards.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      {/* Breadcrumb */}
      <nav className="text-fl-label text-fl-muted-3 flex items-center gap-2 font-mono">
        <Link
          href="/vocabulary"
          className="hover:text-fl-fg tracking-widest uppercase transition-colors"
        >
          Vocabulary
        </Link>
        <span>›</span>
        <span className="text-fl-muted-2 tracking-widest uppercase">
          {vocabSet.level}
        </span>
        <span>›</span>
        <span className="text-fl-fg tracking-wide">{vocabSet.topic}</span>
      </nav>

      {/* Header */}
      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('vocabularySet')}
          </span>
        </div>
        <div className="space-y-3 px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border-fl-border text-fl-label text-fl-muted-3 border px-2 py-0.5 font-mono tracking-widest uppercase">
              {vocabSet.level}
            </span>
            <span className="border-fl-border text-fl-label text-fl-muted-3 border px-2 py-0.5 font-mono tracking-widest uppercase">
              {vocabSet.unit_ref}
            </span>
          </div>
          <h1 className="text-fl-fg font-mono text-xl font-bold tracking-wide">
            {vocabSet.topic}
          </h1>
          <p className="text-fl-label text-fl-muted-3 font-mono">
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
                className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-40"
              >
                {adding ? '...' : t('addAll', { count: vocabSet.words.length })}
              </button>
            </div>
          )}
          {error && <p className="font-mono text-xs text-red-500">{error}</p>}
        </div>
      </div>

      {/* Word list */}
      <div className="border-fl-border bg-fl-surface divide-fl-border divide-y border">
        {vocabSet.words.map((word, i) => (
          <div key={i} className="space-y-1.5 px-5 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-fl-fg font-mono text-sm font-bold">
                {word.word}
              </span>
              <span className="text-fl-label text-fl-muted-3 font-mono italic">
                {POS_LABELS[word.pos] ?? word.pos}
              </span>
              {word.ipa && (
                <span className="text-fl-label text-fl-muted-3 font-mono">
                  {word.ipa}
                </span>
              )}
              {word.frequency_rank && (
                <span className="text-fl-label text-fl-muted-4 ml-auto font-mono">
                  #{word.frequency_rank}
                </span>
              )}
            </div>
            <p className="text-fl-muted-2 font-mono text-xs leading-relaxed">
              {word.definition}
            </p>
            <p className="text-fl-muted-3 font-mono text-xs leading-relaxed italic">
              &ldquo;{word.example}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/vocabulary"
        className="text-fl-label text-fl-muted-2 hover:text-fl-fg inline-block font-mono tracking-widest uppercase transition-colors"
      >
        ← {t('backToVocabulary')}
      </Link>
    </div>
  )
}
