'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { use } from 'react'
import { grammarTopics } from '@/data/grammar'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Render a Markdown-lite explanation: bold, code, line breaks, lists */
function renderExplanation(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="font-mono text-xs text-fl-muted-1 leading-relaxed">
          <span className="text-fl-muted-3 mr-2">·</span>
          <RichText text={line.slice(2)} />
        </li>
      )
    }
    if (line.trim() === '') return null
    // table row
    if (line.startsWith('|')) {
      return (
        <tr key={i}>
          {line.split('|').filter(Boolean).map((cell, ci) => (
            <td key={ci} className="font-mono text-fl-label text-fl-muted-1 border border-fl-border px-3 py-1.5">
              <RichText text={cell.trim()} />
            </td>
          ))}
        </tr>
      )
    }
    return (
      <p key={i} className="font-mono text-xs text-fl-muted-1 leading-relaxed">
        <RichText text={line} />
      </p>
    )
  })
}

/** Inline bold (**text**) and code (`text`) rendering */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-fl-fg font-bold">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="font-mono bg-fl-surface-2 px-1 text-fl-fg">{part.slice(1, -1)}</code>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GrammarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const topic = grammarTopics.find((t) => t.slug === slug)
  if (!topic) notFound()

  const hasTable = topic.explanation.includes('|')
  const explanationLines = topic.explanation.split('\n')
  const hasList = explanationLines.some((l) => l.startsWith('- '))

  const relatedTopics = topic.related
    .map((s) => grammarTopics.find((t) => t.slug === s))
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-fl-label text-fl-muted-3">
        <Link href="/grammar" className="hover:text-fl-fg transition-colors uppercase tracking-widest">
          Grammar
        </Link>
        <span>›</span>
        <span className="text-fl-muted-2 tracking-widest uppercase">{topic.level}</span>
        <span>›</span>
        <span className="text-fl-fg tracking-wide">{topic.title}</span>
      </nav>

      {/* Title card */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Grammar Reference
          </span>
        </div>
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
              {topic.level}
            </span>
            <span className="border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
              {topic.category}
            </span>
          </div>
          <h1 className="font-mono text-xl font-bold text-fl-fg tracking-wide">
            {topic.title}
          </h1>
          <p className="font-mono text-xs text-fl-muted-2 leading-relaxed">
            {topic.summary}
          </p>
          {topic.structure && (
            <div className="border border-fl-border bg-fl-bg px-4 py-3">
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-1">
                Structure
              </p>
              <p className="font-mono text-xs text-fl-fg">{topic.structure}</p>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Explanation
          </span>
        </div>
        <div className="px-6 py-5 space-y-2">
          {hasTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {renderExplanation(topic.explanation)}
                </tbody>
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

      {/* Key Rules */}
      {topic.rules.length > 0 && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Key Rules
            </span>
          </div>
          <ul className="px-6 py-5 space-y-2">
            {topic.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-fl-label text-fl-muted-3 mt-0.5 shrink-0">{i + 1}.</span>
                <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      {topic.examples.length > 0 && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Examples
            </span>
          </div>
          <div className="px-6 py-5 space-y-3">
            {topic.examples.map((ex, i) => (
              <div key={i} className="border-l-2 border-fl-border pl-4 space-y-0.5">
                <p className="font-mono text-xs text-fl-fg">{ex.english}</p>
                {ex.note && (
                  <p className="font-mono text-fl-label text-fl-muted-3 italic">{ex.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {topic.common_mistakes.length > 0 && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Common Mistakes
            </span>
          </div>
          <div className="px-6 py-5 space-y-4">
            {topic.common_mistakes.map((m, i) => (
              <div key={i} className="space-y-1.5">
                {m.wrong && (
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-fl-label text-red-500 shrink-0">✗</span>
                    <p className="font-mono text-xs text-fl-muted-2 line-through">{m.wrong}</p>
                  </div>
                )}
                {m.correct && (
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-fl-label text-green-500 shrink-0">✓</span>
                    <p className="font-mono text-xs text-fl-fg">{m.correct}</p>
                  </div>
                )}
                {m.note && (
                  <p className="font-mono text-fl-label text-fl-muted-3 pl-5">{m.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
              Related Topics
            </span>
          </div>
          <div className="px-6 py-5 flex flex-wrap gap-2">
            {relatedTopics.map((rt) => rt && (
              <Link
                key={rt.slug}
                href={`/grammar/${rt.slug}`}
                className="border border-fl-border px-3 py-2 font-mono text-fl-label text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg transition-colors uppercase tracking-widest"
              >
                ● {rt.title}
                <span className="ml-2 text-fl-muted-4">{rt.level}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <Link
        href="/grammar"
        className="inline-block font-mono text-fl-label text-fl-muted-2 tracking-widest uppercase hover:text-fl-fg transition-colors"
      >
        ← Back to Grammar
      </Link>
    </div>
  )
}
