'use client'

import { useState, useEffect, useCallback } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { use } from 'react'
import { useTranslations } from 'next-intl'
import {
  getGrammarDrills,
  getGrammarTopics,
  type GrammarDrillQuestion,
  type GrammarTopic,
} from '@/data/grammar'
import { useLanguageStore } from '@/store/language'
import { PageLoading } from '@/components/ui/page-loading'

function renderExplanation(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('- ')) {
      return (
        <li
          key={i}
          className="text-fl-muted-1 font-mono text-xs leading-relaxed"
        >
          <span className="text-fl-muted-3 mr-2">{'\u00b7'}</span>
          <RichText text={line.slice(2)} />
        </li>
      )
    }
    if (line.trim() === '') return null
    if (line.startsWith('|')) {
      return (
        <tr key={i}>
          {line
            .split('|')
            .filter(Boolean)
            .map((cell, ci) => (
              <td
                key={ci}
                className="text-fl-label text-fl-muted-1 border-fl-border border px-3 py-1.5 font-mono"
              >
                <RichText text={cell.trim()} />
              </td>
            ))}
        </tr>
      )
    }
    return (
      <p key={i} className="text-fl-muted-1 font-mono text-xs leading-relaxed">
        <RichText text={line} />
      </p>
    )
  })
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-fl-fg font-bold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="bg-fl-surface-2 text-fl-fg px-1 font-mono">
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default function GrammarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const t = useTranslations('grammar')
  const tCommon = useTranslations('common')
  const tNav = useTranslations('nav')
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)
  const { slug } = use(params)

  const [topics, setTopics] = useState<GrammarTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [drillQuestions, setDrillQuestions] = useState<GrammarDrillQuestion[]>([])
  const [drillBaseQuestions, setDrillBaseQuestions] = useState<
    GrammarDrillQuestion[]
  >([])
  const [drillLoading, setDrillLoading] = useState(false)
  const [drillError, setDrillError] = useState(false)
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({})
  const [drillSubmitted, setDrillSubmitted] = useState(false)
  const [drillStarted, setDrillStarted] = useState(false)
  const [drillWrongIndexes, setDrillWrongIndexes] = useState<number[]>([])
  const [drillInRetryMode, setDrillInRetryMode] = useState(false)

  const fetchTopics = useCallback(async (lang: string) => {
    setLoading(true)
    setLoadError(false)
    try {
      const data = await getGrammarTopics(lang)
      setTopics(data)
    } catch {
      setLoadError(true)
      setTopics([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDrills = useCallback(async (lang: string) => {
    setDrillLoading(true)
    setDrillError(false)
    setDrillQuestions([])
    setDrillAnswers({})
    setDrillSubmitted(false)
    setDrillStarted(false)
    setDrillWrongIndexes([])
    setDrillInRetryMode(false)
    try {
      const data = await getGrammarDrills(
        slug,
        lang
      )
      if (data?.questions?.length) {
        setDrillBaseQuestions(data.questions)
        setDrillQuestions(data.questions)
      } else {
        setDrillError(true)
      }
    } catch {
      setDrillError(true)
    } finally {
      setDrillLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchTopics(activeLanguage?.code ?? 'en-US')
  }, [activeLanguage?.code, fetchTopics])

  useEffect(() => {
    fetchDrills(activeLanguage?.code ?? 'en-US')
  }, [activeLanguage?.code, fetchDrills])

  if (loading) {
    return <PageLoading />
  }

  if (loadError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-fl-muted-2 font-mono text-sm">{tCommon('error')}</p>
        <button
          onClick={() => fetchTopics(activeLanguage?.code ?? 'en-US')}
          className="text-fl-accent font-mono text-xs tracking-widest uppercase underline"
        >
          {tCommon('retry')}
        </button>
      </div>
    )
  }

  const topic = topics.find((t) => t.slug === slug)
  if (!topic) notFound()

  const drillCorrect = drillQuestions.reduce((acc, q) => {
    const selected = drillAnswers[String(q.index)]
    return acc + (selected === q.correct ? 1 : 0)
  }, 0)
  const drillTotal = drillQuestions.length
  const allDrillAnswered =
    drillTotal > 0 &&
    drillQuestions.every((q) => typeof drillAnswers[String(q.index)] === 'string')
  const isDrillDone = drillSubmitted && drillQuestions.length > 0
  const hasWrongAnswers = drillWrongIndexes.length > 0

  const drillPercent = drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : 0

  const hasTable = topic.explanation.includes('|')
  const explanationLines = topic.explanation.split('\n')
  const hasList = explanationLines.some((l) => l.startsWith('- '))

  const relatedTopics = topic.related
    .map((s) => topics.find((t) => t.slug === s))
    .filter(Boolean)

  function startDrillSession() {
    setDrillQuestions(drillBaseQuestions)
    setDrillInRetryMode(false)
    setDrillStarted(true)
    setDrillSubmitted(false)
    setDrillAnswers({})
    setDrillWrongIndexes([])
  }

  function setDrillAnswer(index: number, value: string) {
    setDrillAnswers((prev) => ({ ...prev, [String(index)]: value }))
  }

  function submitDrill() {
    const wrongIndexes = drillQuestions
      .filter((q) => drillAnswers[String(q.index)] !== q.correct)
      .map((q) => q.index)
    setDrillWrongIndexes(wrongIndexes)
    setDrillSubmitted(true)
  }

  function retryWrongDrills() {
    const wrongQuestions = drillQuestions.filter((q) =>
      drillWrongIndexes.includes(q.index)
    )
    if (wrongQuestions.length === 0) {
      startDrillSession()
      return
    }

    setDrillQuestions(wrongQuestions)
    setDrillInRetryMode(true)
    setDrillSubmitted(false)
    setDrillAnswers({})
    setDrillWrongIndexes([])
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <nav className="text-fl-label text-fl-muted-3 flex items-center gap-2 font-mono">
        <Link
          href="/grammar"
          className="hover:text-fl-fg tracking-widest uppercase transition-colors"
        >
          {tNav('grammar')}
        </Link>
        <span>{'\u203a'}</span>
        <span className="text-fl-muted-2 tracking-widest uppercase">
          {topic.level}
        </span>
        <span>{'\u203a'}</span>
        <span className="text-fl-fg tracking-wide">{topic.title}</span>
      </nav>

      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span className="text-fl-label text-fl-muted-3">{'\u25cf'}</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('backToGrammar')}
          </span>
        </div>
        <div className="space-y-3 px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border-fl-border text-fl-label text-fl-muted-3 border px-2 py-0.5 font-mono tracking-widest uppercase">
              {topic.level}
            </span>
            <span className="border-fl-border text-fl-label text-fl-muted-3 border px-2 py-0.5 font-mono tracking-widest uppercase">
              {topic.category}
            </span>
          </div>
          <h1 className="text-fl-fg font-mono text-xl font-bold tracking-wide">
            {topic.title}
          </h1>
          <p className="text-fl-muted-2 font-mono text-xs leading-relaxed">
            {topic.summary}
          </p>
          {topic.structure && (
            <div className="border-fl-border bg-fl-bg border px-4 py-3">
              <p className="text-fl-label text-fl-muted-3 mb-1 font-mono tracking-widest uppercase">
                {t('structure')}
              </p>
              <p className="text-fl-fg font-mono text-xs">{topic.structure}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('explanation')}
          </span>
        </div>
        <div className="space-y-2 px-6 py-5">
          {hasTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>{renderExplanation(topic.explanation)}</tbody>
              </table>
            </div>
          ) : hasList ? (
            <ul className="space-y-1">
              {renderExplanation(topic.explanation)}
            </ul>
          ) : (
            <div className="space-y-2">
              {renderExplanation(topic.explanation)}
            </div>
          )}
        </div>
      </div>

      {topic.rules.length > 0 && (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('keyRules')}
            </span>
          </div>
          <ul className="space-y-2 px-6 py-5">
            {topic.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-fl-label text-fl-muted-3 mt-0.5 shrink-0 font-mono">
                  {i + 1}.
                </span>
                <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                  {rule}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.examples.length > 0 && (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('examples')}
            </span>
          </div>
          <div className="space-y-3 px-6 py-5">
            {topic.examples.map((ex, i) => (
              <div
                key={i}
                className="border-fl-border space-y-0.5 border-l-2 pl-4"
              >
                <p className="text-fl-fg font-mono text-xs">{ex.text}</p>
                {ex.note && (
                  <p className="text-fl-label text-fl-muted-3 font-mono italic">
                    {ex.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.common_mistakes.length > 0 && (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('commonMistakes')}
            </span>
          </div>
          <div className="space-y-4 px-6 py-5">
            {topic.common_mistakes.map((m, i) => (
              <div key={i} className="space-y-1.5">
                {m.wrong && (
                  <div className="flex items-start gap-2">
                    <span className="text-fl-label shrink-0 font-mono text-red-500">
                      {'\u2717'}
                    </span>
                    <p className="text-fl-muted-2 font-mono text-xs line-through">
                      {m.wrong}
                    </p>
                  </div>
                )}
                {m.correct && (
                  <div className="flex items-start gap-2">
                    <span className="text-fl-label shrink-0 font-mono text-green-500">
                      {'\u2713'}
                    </span>
                    <p className="text-fl-fg font-mono text-xs">{m.correct}</p>
                  </div>
                )}
                {m.note && (
                  <p className="text-fl-label text-fl-muted-3 pl-5 font-mono">
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {drillLoading ? (
        <div className="border-fl-border bg-fl-surface border p-4">
          <p className="text-fl-muted-3 font-mono text-xs tracking-widest uppercase">
            {tCommon('loading')}
          </p>
        </div>
      ) : (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center justify-between gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {topic.level} • Drills
            </span>
            {drillQuestions.length > 0 && (
              <button
                onClick={startDrillSession}
                className={`border-fl-border text-fl-label text-fl-muted-2 border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors ${
                  drillStarted
                    ? 'hover:border-fl-border-2 hover:text-fl-fg'
                    : 'border-fl-accent text-fl-accent'
                }`}
              >
                {drillStarted ? tCommon('retry') : tCommon('start')}
              </button>
            )}
          </div>
          <div className="space-y-4 px-6 py-5">
            {drillError || drillQuestions.length === 0 ? (
              <p className="text-fl-muted-2 font-mono text-xs">
                No drills available yet.
              </p>
            ) : (
              <>
                {drillStarted && (
                  <>
                    {drillQuestions.map((q) => {
                      const key = String(q.index)
                      const selected = drillAnswers[key]
                      return (
                        <div key={q.index} className="space-y-3">
                          <p className="text-fl-fg font-mono text-xs">
                            {q.index + 1}. {q.question}
                          </p>
                          <div className="space-y-2">
                            {q.options.map((option, i) => {
                              const label = String.fromCharCode(65 + i)
                              const isSelected = selected === option
                              const isCorrect = isDrillDone && option === q.correct
                              const isWrong = isDrillDone && isSelected && selected !== q.correct
                              return (
                                <button
                                  key={label}
                                  onClick={() => setDrillAnswer(q.index, option)}
                                  className={`w-full border px-3 py-2 text-left text-xs font-mono transition-colors ${
                                    isCorrect
                                      ? 'border-green-500 bg-green-950/30 text-fl-fg'
                                      : isWrong
                                        ? 'border-red-500 bg-red-950/30 text-red-200'
                                        : isSelected
                                          ? 'border-fl-accent bg-fl-surface-2 text-fl-fg'
                                          : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg hover:bg-fl-surface-2'
                                  }`}
                                >
                                  {label}. {option}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}

                    {(!isDrillDone || drillInRetryMode) && (
                      <button
                        onClick={submitDrill}
                        disabled={!allDrillAnswered}
                        className="border-fl-border bg-fl-surface text-fl-fg w-full border py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {tCommon('submit')}
                      </button>
                    )}

                    {isDrillDone && (
                      <div className="border-fl-border bg-fl-surface-2 border px-4 py-3 font-mono text-xs">
                        <p className="text-fl-fg tracking-widest uppercase">
                          {tCommon('score')}: {drillCorrect}/{drillTotal} ({drillPercent}%)
                        </p>
                        {hasWrongAnswers && (
                          <button
                            onClick={retryWrongDrills}
                            className="mt-3 w-full border border-fl-border bg-fl-surface px-3 py-2 font-mono tracking-widest uppercase"
                          >
                            {tCommon('retry')} ({drillWrongIndexes.length})
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {relatedTopics.length > 0 && (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('relatedTopics')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 px-6 py-5">
            {relatedTopics.map(
              (rt) =>
                rt && (
                  <Link
                    key={rt.slug}
                    href={`/grammar/${rt.slug}`}
                    className="border-fl-border text-fl-label text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
                  >
                    {'\u25cf'} {rt.title}
                    <span className="text-fl-muted-4 ml-2">{rt.level}</span>
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      <Link
        href="/grammar"
        className="text-fl-label text-fl-muted-2 hover:text-fl-fg inline-block font-mono tracking-widest uppercase transition-colors"
      >
        {'\u2190'} {t('backLink')}
      </Link>
    </div>
  )
}
