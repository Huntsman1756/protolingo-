'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { getCurriculumUnits, type CurriculumUnit } from '@/data/curriculum'
import UnitCard from '@/components/plan/UnitCard'
import UnitDrawer from '@/components/plan/UnitDrawer'
import LevelTestBanner from '@/components/plan/LevelTestBanner'
import type { CEFRLevel } from '@/data/grammar'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Lesson {
  id: number | null
  title: string
  lesson_type: string
  week: number
  day: number
  unit_id?: string
  completed?: boolean
}

interface StudyPlan {
  id: number
  cefr_level: string
  duration_weeks: number
  days_per_week: number
  current_unit: string
  completion_test_taken: boolean
  completion_test_score: number | null
  completion_test_recommendation: string | null
  generated_plan: {
    weekly_plan: {
      week: number
      days: {
        day: number
        title: string
        lesson_type: string
        unit_id: string
      }[]
    }[]
  }
}

interface CompetencyMap {
  [unitId: string]: number  // 0–1
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function flattenLessons(plan: StudyPlan): Lesson[] {
  const result: Lesson[] = []
  for (const week of plan.generated_plan.weekly_plan) {
    for (const day of week.days) {
      result.push({
        id: null,
        title: day.title,
        lesson_type: day.lesson_type,
        week: week.week,
        day: day.day,
        unit_id: day.unit_id,
        completed: false,
      })
    }
  }
  return result
}

function lessonsByUnit(lessons: Lesson[]): Record<string, Lesson[]> {
  const map: Record<string, Lesson[]> = {}
  for (const l of lessons) {
    const key = l.unit_id ?? '__unassigned'
    if (!map[key]) map[key] = []
    map[key].push(l)
  }
  return map
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PlanPage() {
  const t = useTranslations('plan')
  const tCommon = useTranslations('common')
  const router = useRouter()

  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [competencies, setCompetencies] = useState<CompetencyMap>({})
  const [activeDrawer, setActiveDrawer] = useState<CurriculumUnit | null>(null)

  const loadPlan = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [planRes, compRes] = await Promise.all([
        apiFetch('/api/study-plan/current'),
        apiFetch('/api/progress/competencies').catch(() => null),
      ])

      if (!planRes.ok) {
        if (planRes.status === 404) {
          router.push('/assessment')
          return
        }
        throw new Error(`Failed to load plan (${planRes.status})`)
      }

      const planData = (await planRes.json()) as StudyPlan
      setPlan(planData)

      if (compRes?.ok) {
        const compData = await compRes.json()
        // Backend returns [{unit_id, score}, ...] or Record<string, number>
        if (Array.isArray(compData)) {
          const map: CompetencyMap = {}
          for (const item of compData as { unit_id: string; score: number }[]) {
            map[item.unit_id] = item.score
          }
          setCompetencies(map)
        } else {
          setCompetencies(compData as CompetencyMap)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    void loadPlan()
  }, [loadPlan])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase animate-pulse">
          {tCommon('loading')}
        </span>
      </div>
    )
  }

  if (error || !plan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md border border-fl-border bg-fl-surface p-8 space-y-4">
          <p className="font-mono text-fl-label text-fl-error-fg">
            {error || t('noPlan')}
          </p>
          <button
            onClick={() => router.push('/assessment')}
            className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors"
          >
            — {t('startAssessment')}
          </button>
        </div>
      </div>
    )
  }

  const level = plan.cefr_level as CEFRLevel
  const units = getCurriculumUnits(level)
  const allLessons = flattenLessons(plan)
  const byUnit = lessonsByUnit(allLessons)
  const currentUnitId = plan.current_unit

  const allUnitsCompleted =
    units.length > 0 &&
    units.every((u) => (competencies[u.id] ?? 0) >= 0.8)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* ── Header ── */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {t('learningRoadmap')}
          </span>
        </div>
        <div className="px-6 py-4 flex flex-wrap items-center gap-4">
          <div>
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase">{t('level')}</p>
            <p className="font-mono text-2xl font-bold text-fl-fg tracking-widest">{level}</p>
          </div>
          <div className="h-8 w-px bg-fl-border" />
          <div>
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase">{t('duration')}</p>
            <p className="font-mono text-fl-body text-fl-muted-1">
              {plan.duration_weeks} weeks · {plan.days_per_week} days/week
            </p>
          </div>
          <div className="h-8 w-px bg-fl-border" />
          <div>
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase">{t('unitsLabel')}</p>
            <p className="font-mono text-fl-body text-fl-muted-1">{units.length}</p>
          </div>
        </div>
      </div>

      {/* ── Unit list ── */}
      <div className="space-y-2">
        {units.length === 0 && (
          <div className="border border-fl-border bg-fl-surface px-6 py-10 text-center space-y-3">
            <p className="font-mono text-xs text-fl-muted-3 tracking-widest uppercase">
              {t('noUnitsForLevel', { level })}
            </p>
            <p className="font-mono text-fl-label text-fl-muted-4">
              {t('noUnitsDesc')}
            </p>
          </div>
        )}
        {units.map((unit, i) => {
          const unitLessons = byUnit[unit.id] ?? []
          const completedLessons = unitLessons.filter((l) => l.completed).length
          const isActive = unit.id === currentUnitId
          const unitComp = competencies[unit.id] ?? 0
          const isCompleted = unitComp >= 0.8 || (completedLessons > 0 && completedLessons === unitLessons.length)

          // A unit is locked if its prerequisite is not completed
          const prereqUnit = unit.prerequisite_unit
          const prereqCompleted = prereqUnit
            ? (competencies[prereqUnit] ?? 0) >= 0.8
            : true
          const isLocked = !isActive && !isCompleted && !prereqCompleted && i > 0

          return (
            <UnitCard
              key={unit.id}
              title={unit.title}
              index={i}
              lessonCount={unitLessons.length || unit.lesson_types.length}
              grammarCount={unit.grammar_points.length}
              competency={unitComp}
              status={{
                completed: isCompleted,
                active: isActive,
                locked: isLocked,
                isLevelTest: false,
              }}
              onClick={() => setActiveDrawer(unit)}
            />
          )
        })}

        {/* Level test pseudo-unit */}
        {units.length > 0 && (
          <UnitCard
            title={t('completionTestTitle', { level })}
            index={units.length}
            lessonCount={1}
            grammarCount={0}
            competency={plan.completion_test_score != null ? plan.completion_test_score : 0}
            status={{
              completed: plan.completion_test_taken,
              active: allUnitsCompleted && !plan.completion_test_taken,
              locked: !allUnitsCompleted,
              isLevelTest: true,
            }}
            onClick={() => {
              if (allUnitsCompleted && !plan.completion_test_taken) {
                router.push(`/assessment/level-test?plan=${plan.id}`)
              }
            }}
          />
        )}
      </div>

      {/* ── Level test banner ── */}
      {allUnitsCompleted && !plan.completion_test_taken && (
        <LevelTestBanner planId={plan.id} level={level} />
      )}

      {/* ── Completion test result ── */}
      {plan.completion_test_taken && (
        <div className="border border-fl-border bg-fl-surface px-6 py-4 space-y-2">
          <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase">
            {t('levelTestResult')}
          </p>
          <p className="font-mono text-fl-body text-fl-fg">
            {t('testScore')}{' '}
            <span className="font-bold">
              {plan.completion_test_score != null
                ? `${Math.round(plan.completion_test_score * 100)}%`
                : 'n/a'}
            </span>
          </p>
          {plan.completion_test_recommendation && (
            <p className="font-mono text-fl-label text-fl-muted-1">
              {plan.completion_test_recommendation}
            </p>
          )}
        </div>
      )}

      {/* ── Active drawer ── */}
      {activeDrawer && (
        <UnitDrawer
          unit={activeDrawer}
          lessons={(byUnit[activeDrawer.id] ?? []).map((l) => ({
            ...l,
            completed: l.completed ?? false,
          }))}
          onClose={() => setActiveDrawer(null)}
          onStartLesson={(lessonId) => {
            setActiveDrawer(null)
            router.push(`/lesson/${lessonId}`)
          }}
        />
      )}
    </div>
  )
}
