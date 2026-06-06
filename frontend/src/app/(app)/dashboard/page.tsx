'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useProgressStore } from '@/store/progress'
import { useLanguageStore } from '@/store/language'
import OnboardingTour from '@/components/tour/OnboardingTour'
import WhatsNew from '@/components/whats-new/WhatsNew'

interface TodayLessonItem {
  id: number | null
  title: string
  lesson_type: string
  week: number
  day: number
  objectives: string[]
  estimated_minutes: number
  is_completed: boolean
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const tNav = useTranslations('nav')
  const tPlan = useTranslations('plan')
  const tError = useTranslations('error')
  const user = useAuthStore((s) => s.user)
  const {
    streak,
    xp,
    skills,
    todayLessons,
    completedToday,
    setProgress,
    setTodayLessons,
  } = useProgressStore()
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [hasPlan, setHasPlan] = useState(false)
  const [cefrLevel, setCefrLevel] = useState<string | null>(null)
  const [progressDay, setProgressDay] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [skipping, setSkipping] = useState(false)
  const [skipError, setSkipError] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [progRes, planRes] = await Promise.all([
        apiFetch('/api/progress/summary'),
        apiFetch('/api/study-plan/today'),
      ])
      if (progRes.ok) {
        const prog = await progRes.json()
        setProgress({
          streak: prog.current_streak ?? 0,
          xp: prog.total_xp ?? 0,
          skills: prog.skills ?? {},
        })
      } else {
        setProgress({ streak: 0, xp: 0, skills: {} })
      }
      if (planRes.ok) {
        const plan = await planRes.json()
        setCefrLevel(plan.cefr_level ?? null)
        setProgressDay(plan.progress_day ?? 0)
        setTotalDays(plan.total_days ?? 0)
        setPendingCount(plan.pending_count ?? 0)
        setTodayLessons(
          plan.lessons.map((l: TodayLessonItem) => ({
            id: l.id,
            title: l.title,
            lessonType: l.lesson_type,
            week: l.week,
            day: l.day,
            objectives: l.objectives || [],
            estimatedMinutes: l.estimated_minutes || 25,
            isCompleted: l.is_completed,
          }))
        )
        setHasPlan(true)
      } else {
        setCefrLevel(null)
        setProgressDay(0)
        setTotalDays(0)
        setPendingCount(0)
        setTodayLessons([])
        setHasPlan(false)
      }
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-fetch when active language changes
  }, [setProgress, setTodayLessons, activeLanguage?.code])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function skipDay() {
    if (skipping) return
    setSkipping(true)
    try {
      await apiFetch('/api/study-plan/skip-day', { method: 'POST' })
      await loadData()
    } catch {
      setSkipError(true)
    } finally {
      setSkipping(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          {t('loadingProgress')}
        </span>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-fl-muted-2 font-mono text-sm">{tError('body')}</p>
        <button
          onClick={() => {
            setLoadError(false)
            setLoading(true)
            loadData()
          }}
          className="text-fl-accent font-mono text-xs tracking-widest uppercase underline"
        >
          {tError('retry')}
        </button>
      </div>
    )
  }

  const skillEntries = Object.entries(skills)

  return (
    <>
      <OnboardingTour />
      <WhatsNew />
      <div className="mx-auto max-w-4xl p-6">
        {/* Header */}
        <div className="border-fl-border mb-8 border-b pb-4">
          <p className="text-fl-label text-fl-muted-2 mb-1 font-mono tracking-widest uppercase">
            {t('welcomeBack')}
          </p>
          <h1 className="text-fl-fg font-mono text-2xl font-bold tracking-tight">
            {user?.displayName || user?.username}
          </h1>
          {activeLanguage && (
            <p className="text-fl-muted-1 mt-2 font-mono text-sm">
              {activeLanguage.name}
              {cefrLevel ? ` (${cefrLevel})` : ''}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="bg-fl-border mb-8 grid grid-cols-2 gap-px sm:grid-cols-4">
          {[
            { label: t('streak'), value: `${streak}d`, accent: streak > 0 },
            { label: t('xp'), value: xp, accent: false },
            { label: t('level'), value: cefrLevel ?? '—', accent: false },
            { label: t('skills'), value: skillEntries.length, accent: false },
          ].map((stat) => (
            <div key={stat.label} className="bg-fl-surface px-5 py-5">
              <p className="text-fl-hint text-fl-muted-2 mb-2 font-mono tracking-widest uppercase">
                {stat.label}
              </p>
              <p
                className={`font-mono text-3xl font-bold tracking-tight ${stat.accent ? 'text-fl-accent' : 'text-fl-fg'}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-fl-border mb-8 grid gap-px sm:grid-cols-2">
          {/* Skills */}
          <div className="bg-fl-surface p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-fl-label text-fl-muted-2">●</span>
              <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                {t('skills')}
              </span>
            </div>
            {skillEntries.length > 0 ? (
              <div className="space-y-3">
                {skillEntries.map(([skill, value]) => (
                  <div key={skill}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-fl-label text-fl-muted-1 font-mono tracking-widest uppercase">
                        {tPlan(`lessonTypes.${skill}`)}
                      </span>
                      <span className="text-fl-label text-fl-muted-2 font-mono">
                        {Math.round((value as number) * 100)}%
                      </span>
                    </div>
                    <div className="bg-fl-border h-px w-full">
                      <div
                        className="bg-fl-accent h-px"
                        style={{ width: `${(value as number) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-fl-muted-2 font-mono text-xs">
                {t('noSkills')}
              </p>
            )}
          </div>

          {/* Today's lessons */}
          <div className="bg-fl-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-fl-label text-fl-muted-2">●</span>
                <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                  {t('today')}
                </span>
              </div>
              {hasPlan && totalDays > 0 && (
                <span className="text-fl-hint text-fl-muted-3 font-mono tracking-widest">
                  {t('dayProgress', {
                    current: Math.min(progressDay + 1, totalDays),
                    total: totalDays,
                  })}
                </span>
              )}
            </div>

            {/* Plan progress bar */}
            {hasPlan && totalDays > 0 && (
              <div className="bg-fl-border mb-4 h-px w-full">
                <div
                  className="bg-fl-accent h-px transition-all duration-500"
                  style={{
                    width: `${Math.round((progressDay / totalDays) * 100)}%`,
                  }}
                />
              </div>
            )}

            {todayLessons.length > 0 ? (
              <div className="space-y-2">
                {todayLessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="border-fl-border flex items-center justify-between border px-4 py-3"
                  >
                    <div>
                      <p className="text-fl-fg font-mono text-xs">
                        {lesson.title}
                      </p>
                      <p className="text-fl-label text-fl-muted-2 mt-0.5 font-mono tracking-wider uppercase">
                        {tPlan(`lessonTypes.${lesson.lessonType}`)} ·{' '}
                        {lesson.estimatedMinutes}min
                      </p>
                    </div>
                    {lesson.id &&
                    (completedToday.includes(lesson.id) ||
                      lesson.isCompleted) ? (
                      <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
                        ✓ {t('lessonDone')}
                      </span>
                    ) : lesson.id ? (
                      <Link href={`/lesson/${lesson.id}`}>
                        <button className="text-fl-label text-fl-bg bg-fl-fg hover:bg-fl-accent/90 px-3 py-1 font-mono tracking-widest uppercase transition-colors">
                          {t('startLesson')}
                        </button>
                      </Link>
                    ) : null}
                  </div>
                ))}
                <div className="pt-1">
                  <button
                    onClick={skipDay}
                    disabled={skipping}
                    className="text-fl-hint text-fl-muted-3 hover:text-fl-muted-1 font-mono tracking-widest uppercase transition-colors disabled:opacity-40"
                  >
                    {skipping ? '…' : t('skipDay')}
                  </button>
                  {skipError && (
                    <p className="text-fl-error mt-1 font-mono text-xs">
                      {tError('title')}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-fl-muted-2 font-mono text-xs">
                  {hasPlan ? t('allCaughtUp') : t('startWithAssessment')}
                </p>
                {!hasPlan && (
                  <Link href="/assessment">
                    <button className="text-fl-label text-fl-bg bg-fl-fg hover:bg-fl-accent/90 px-4 py-2 font-mono tracking-widest uppercase transition-colors">
                      {t('takeAssessmentArrow')}
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          {hasPlan && (
            <Link href="/plan">
              <button className="text-fl-label text-fl-bg bg-fl-fg hover:bg-fl-accent/90 px-4 py-2 font-mono tracking-widest uppercase transition-colors">
                {t('goToMyPlan')}
              </button>
            </Link>
          )}
          {pendingCount > 0 && (
            <Link href="/plan">
              <button className="text-fl-label text-fl-fg border-fl-accent/50 hover:border-fl-accent border px-4 py-2 font-mono tracking-widest uppercase transition-colors">
                {pendingCount} {t('pendingLessons')} →
              </button>
            </Link>
          )}
          <Link href="/flashcards">
            <button className="text-fl-label text-fl-fg border-fl-border hover:border-fl-border-2 border px-4 py-2 font-mono tracking-widest uppercase transition-colors">
              {tNav('flashcards')}
            </button>
          </Link>
          <Link href="/chat">
            <button className="text-fl-label text-fl-fg border-fl-border hover:border-fl-border-2 border px-4 py-2 font-mono tracking-widest uppercase transition-colors">
              {tNav('tutor')}
            </button>
          </Link>
          <Link href="/assessment">
            <button className="text-fl-label text-fl-fg border-fl-border hover:border-fl-border-2 border px-4 py-2 font-mono tracking-widest uppercase transition-colors">
              {tNav('assessment')}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
