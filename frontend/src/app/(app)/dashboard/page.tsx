'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useProgressStore } from '@/store/progress'

interface TodayLessonItem {
  id: number | null
  title: string
  lesson_type: string
  week: number
  day: number
  objectives: string[]
  estimated_minutes: number
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { streak, xp, skills, todayLessons, completedToday, setProgress, setTodayLessons } =
    useProgressStore()
  const [loading, setLoading] = useState(true)
  const [hasPlan, setHasPlan] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [progRes, planRes] = await Promise.all([
        apiFetch('/api/progress/summary'),
        apiFetch('/api/study-plan/today'),
      ])
      if (progRes.ok) setProgress(await progRes.json())
      if (planRes.ok) {
        const plan = await planRes.json()
        setTodayLessons(plan.lessons.map((l: TodayLessonItem) => ({
          id: l.id, title: l.title, lessonType: l.lesson_type,
          week: l.week, day: l.day, objectives: l.objectives || [],
          estimatedMinutes: l.estimated_minutes || 25,
        })))
        setHasPlan(plan.lessons.length > 0)
      }
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [setProgress, setTodayLessons])

  useEffect(() => { loadData() }, [loadData])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="font-mono text-xs tracking-widest text-[#777] uppercase animate-pulse">loading...</span>
      </div>
    )
  }

  const skillEntries = Object.entries(skills)

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#2a2a2a]">
        <p className="font-mono text-[10px] tracking-widest text-[#777] uppercase mb-1">Welcome back</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-[#f5f5f5]">
          {user?.displayName || user?.username}
        </h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#2a2a2a] mb-8">
        {[
          { label: 'STREAK', value: `${streak}d` },
          { label: 'XP', value: xp },
          { label: 'LEVEL', value: xp > 500 ? 'B1' : xp > 200 ? 'A2' : 'A1' },
          { label: 'SKILLS', value: skillEntries.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111] px-5 py-5">
            <p className="font-mono text-[9px] tracking-widest text-[#777] uppercase mb-2">{stat.label}</p>
            <p className="font-mono text-3xl font-bold text-[#f5f5f5] tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-px bg-[#2a2a2a] mb-8">
        {/* Skills */}
        <div className="bg-[#111] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-[#777]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Skills</span>
          </div>
          {skillEntries.length > 0 ? (
            <div className="space-y-3">
              {skillEntries.map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] tracking-widest text-[#888] uppercase">{skill}</span>
                    <span className="font-mono text-[10px] text-[#777]">{Math.round((value as number) * 100)}%</span>
                  </div>
                  <div className="h-px bg-[#2a2a2a] w-full">
                    <div className="h-px bg-[#f5f5f5]" style={{ width: `${(value as number) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-[#777]">Complete the assessment to track skills.</p>
          )}
        </div>

        {/* Today's lessons */}
        <div className="bg-[#111] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-[#777]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Today</span>
          </div>
          {todayLessons.length > 0 ? (
            <div className="space-y-2">
              {todayLessons.map((lesson, i) => (
                <div key={i} className="flex items-center justify-between border border-[#2a2a2a] px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-[#f5f5f5]">{lesson.title}</p>
                    <p className="font-mono text-[10px] text-[#777] uppercase tracking-wider mt-0.5">
                      {lesson.lessonType} · {lesson.estimatedMinutes}min
                    </p>
                  </div>
                  {lesson.id && completedToday.includes(lesson.id) ? (
                    <span className="font-mono text-[10px] text-[#777] uppercase tracking-widest">✓ done</span>
                  ) : lesson.id ? (
                    <Link href={`/lesson/${lesson.id}`}>
                      <button className="font-mono text-[10px] tracking-widest text-[#0a0a0a] bg-[#f5f5f5] px-3 py-1 uppercase hover:bg-white transition-colors">
                        START
                      </button>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-mono text-xs text-[#777]">
                {hasPlan ? 'All caught up.' : 'Start with an assessment.'}
              </p>
              <Link href="/assessment">
                <button className="font-mono text-[10px] tracking-widest text-[#0a0a0a] bg-[#f5f5f5] px-4 py-2 uppercase hover:bg-white transition-colors">
                  Take Assessment →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 flex-wrap">
        <Link href="/flashcards">
          <button className="font-mono text-[10px] tracking-widest text-[#f5f5f5] border border-[#2a2a2a] px-4 py-2 uppercase hover:border-[#444] transition-colors">
            Flashcards
          </button>
        </Link>
        <Link href="/chat">
          <button className="font-mono text-[10px] tracking-widest text-[#f5f5f5] border border-[#2a2a2a] px-4 py-2 uppercase hover:border-[#444] transition-colors">
            AI Tutor
          </button>
        </Link>
        <Link href="/assessment">
          <button className="font-mono text-[10px] tracking-widest text-[#f5f5f5] border border-[#2a2a2a] px-4 py-2 uppercase hover:border-[#444] transition-colors">
            Assessment
          </button>
        </Link>
      </div>
    </div>
  )
}
