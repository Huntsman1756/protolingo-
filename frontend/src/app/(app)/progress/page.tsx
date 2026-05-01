'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { getCurriculumUnits, type CurriculumUnit } from '@/data/curriculum'
import { vocabularySets } from '@/data/vocabulary'
import type { CEFRLevel } from '@/data/grammar'

// ── Types ──────────────────────────────────────────────────────────────────────

interface CompetencyRecord {
  unit_id: string
  score: number          // 0–1 average
  mastered_count: number
  total_count: number
}

interface ProgressSummary {
  total_xp: number
  current_streak: number
  total_lessons: number
  total_exercises: number
  exercises_correct: number
  accuracy: number
  skills: Record<string, number>
}

interface StudyPlan {
  id: number
  cefr_level: string
}

type CompetencyStatus = 'mastered' | 'in-progress' | 'not-started'

// ── Helpers ────────────────────────────────────────────────────────────────────

function getCompetencyStatus(
  itemIndex: number,
  masteredCount: number,
  totalCount: number,
  score: number,
): CompetencyStatus {
  if (itemIndex < masteredCount) return 'mastered'
  if (score > 0 && itemIndex < totalCount) return 'in-progress'
  return 'not-started'
}

const STATUS_ICON: Record<CompetencyStatus, string> = {
  mastered: '✅',
  'in-progress': '🔄',
  'not-started': '⬜',
}

const STATUS_COLOR: Record<CompetencyStatus, string> = {
  mastered: 'text-fl-fg',
  'in-progress': 'text-amber-600 dark:text-amber-400',
  'not-started': 'text-fl-muted-4',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function UnitCompetencyBlock({
  unit,
  record,
}: {
  unit: CurriculumUnit
  record: CompetencyRecord | undefined
}) {
  const masteredCount = record?.mastered_count ?? 0
  const totalCount = unit.competency_checklist.length
  const score = record?.score ?? 0
  const pct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0

  return (
    <div className="border border-fl-border bg-fl-surface">
      {/* Unit header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-fl-border">
        <div className="flex items-center gap-2">
          <span className="font-mono text-fl-label text-fl-muted-3 tracking-widest uppercase">
            Unit {unit.unit_number}
          </span>
          <span className="font-mono text-xs font-bold text-fl-fg">{unit.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-fl-label text-fl-muted-3">
            {masteredCount}/{totalCount} mastered
          </span>
          {record && (
            <span className="font-mono text-fl-label text-fl-muted-2">
              {Math.round(score * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-fl-border">
        <div
          className="h-full bg-fl-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Competency list */}
      <ul className="px-5 py-3 space-y-2">
        {unit.competency_checklist.map((text, idx) => {
          const status = getCompetencyStatus(idx, masteredCount, record?.total_count ?? 0, score)
          return (
            <li key={idx} className="flex items-start gap-3">
              <span className="shrink-0 text-base leading-none mt-0.5">{STATUS_ICON[status]}</span>
              <span className={`font-mono text-xs leading-relaxed ${STATUS_COLOR[status]}`}>
                {text}
              </span>
              {status === 'in-progress' && record && (
                <span className="ml-auto shrink-0 font-mono text-fl-label text-fl-muted-3">
                  {Math.round(score * 100)}%
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProgressPage() {
  const t = useTranslations('progress')
  const [summary, setSummary] = useState<ProgressSummary | null>(null)
  const [competencies, setCompetencies] = useState<CompetencyRecord[]>([])
  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [sumRes, compRes, planRes] = await Promise.all([
          apiFetch('/api/progress/summary'),
          apiFetch('/api/progress/competencies'),
          apiFetch('/api/study-plan/current'),
        ])
        if (sumRes.ok) setSummary(await sumRes.json() as ProgressSummary)
        if (compRes.ok) setCompetencies(await compRes.json() as CompetencyRecord[])
        if (planRes.ok) setPlan(await planRes.json() as StudyPlan)
      } catch { /* ignore */ }
      finally { setLoading(false) }
    }
    void load()
  }, [])

  const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  const cefrLevel = plan?.cefr_level as CEFRLevel | undefined
  const levelUnits = cefrLevel
    ? getCurriculumUnits(cefrLevel)
    : CEFR_LEVELS.flatMap((l) => getCurriculumUnits(l))

  const compMap = Object.fromEntries(competencies.map((c) => [c.unit_id, c]))

  const levelVocabSets = cefrLevel
    ? vocabularySets.filter((s) => s.level === cefrLevel)
    : []
  const totalLevelWords = levelVocabSets.reduce((a, s) => a + s.words.length, 0)

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase animate-pulse">
          {t('loading')}
        </span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-8">
      {/* Header */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {t('subtitle')}
          </span>
          {cefrLevel && (
            <span className="ml-auto border border-fl-border font-mono text-fl-label tracking-widest uppercase px-2 py-0.5 text-fl-muted-3">
              {cefrLevel} Programme
            </span>
          )}
        </div>

        {/* XP + streak */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-fl-border border-b border-fl-border">
            {[
              { label: t('xp'), value: summary.total_xp.toLocaleString() },
              { label: t('streak'), value: `${summary.current_streak}d 🔥` },
              { label: t('lessons'), value: summary.total_lessons },
              { label: t('accuracy'), value: `${Math.round(summary.accuracy * 100)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4 text-center">
                <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase mb-1">
                  {label}
                </p>
                <p className="font-mono text-sm font-bold text-fl-fg">{value}</p>
              </div>
            ))}
          </div>
        )}

        {!plan && (
          <div className="px-6 py-6 text-center">
            <p className="font-mono text-xs text-fl-muted-3 leading-relaxed">
              {t('noActivePlanDesc')}
            </p>
          </div>
        )}
      </div>

      {/* Grammar Competencies */}
      {levelUnits.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-fl-fg tracking-widest">
              {cefrLevel ? t('competenciesSection', { level: cefrLevel }) : t('competencies')}
            </span>
            <div className="flex-1 h-px bg-fl-border" />
          </div>

          {levelUnits.map((unit) => (
            <UnitCompetencyBlock
              key={unit.id}
              unit={unit}
              record={compMap[unit.id]}
            />
          ))}

          {competencies.length === 0 && (
            <div className="border border-fl-border bg-fl-surface px-6 py-8 text-center">
              <p className="font-mono text-xs text-fl-muted-3 leading-relaxed">
                {t('noCompetencies')}
              </p>
              <Link
                href="/plan"
                className="inline-block mt-4 font-mono text-fl-label tracking-widest uppercase text-fl-muted-2 hover:text-fl-fg transition-colors"
              >
                {t('goToMyPlan')}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Vocabulary Progress */}
      {levelVocabSets.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-fl-fg tracking-widest">
              {cefrLevel ? t('vocabularyHeader', { level: cefrLevel }) : t('vocabularySection')}
            </span>
            <div className="flex-1 h-px bg-fl-border" />
            <span className="font-mono text-fl-label text-fl-muted-3">
              {totalLevelWords} words
            </span>
          </div>

          <div className="border border-fl-border bg-fl-surface divide-y divide-fl-border">
            {levelVocabSets.map((s) => (
              <div key={s.id} className="flex items-center gap-4 px-5 py-3">
                <Link
                  href={`/vocabulary/${s.id}`}
                  className="font-mono text-xs text-fl-muted-1 hover:text-fl-fg transition-colors flex-1 min-w-0 truncate"
                >
                  {s.topic}
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-fl-border">
                    <div className="h-full bg-fl-accent" style={{ width: '0%' }} />
                  </div>
                  <span className="font-mono text-fl-label text-fl-muted-3 w-12 text-right">
                    {s.words.length}w
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-fl-label text-fl-muted-4">
            {t('addToFlashcards')}
          </p>
        </section>
      )}

      {/* Skills breakdown */}
      {summary && Object.keys(summary.skills).length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold text-fl-fg tracking-widest">
              {t('skills')}
            </span>
            <div className="flex-1 h-px bg-fl-border" />
          </div>
          <div className="border border-fl-border bg-fl-surface divide-y divide-fl-border">
            {Object.entries(summary.skills).map(([skill, value]) => (
              <div key={skill} className="flex items-center gap-4 px-5 py-3">
                <span className="font-mono text-fl-label tracking-widest uppercase text-fl-muted-2 w-24">
                  {skill}
                </span>
                <div className="flex-1 h-1.5 bg-fl-border">
                  <div
                    className="h-full bg-fl-accent"
                    style={{ width: `${Math.round(value * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-fl-label text-fl-muted-2 w-10 text-right">
                  {Math.round(value * 100)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
