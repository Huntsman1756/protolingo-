'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useProgressStore } from '@/store/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
      if (progRes.ok) {
        const p = await progRes.json()
        setProgress(p)
      }
      if (planRes.ok) {
        const plan = await planRes.json()
        setTodayLessons(
          plan.lessons.map((l: TodayLessonItem) => ({
            id: l.id,
            title: l.title,
            lessonType: l.lesson_type,
            week: l.week,
            day: l.day,
            objectives: l.objectives || [],
            estimatedMinutes: l.estimated_minutes || 25,
          }))
        )
        setHasPlan(plan.lessons.length > 0)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [setProgress, setTodayLessons])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-zinc-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <Button variant="outline" size="sm">Settings</Button>
          </Link>
          {user?.role === 'admin' && (
            <Link href="/admin/users">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{streak} 🔥</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">XP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{xp}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{xp > 500 ? 'B1' : xp > 200 ? 'A2' : 'A1'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-500">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round(
                skills
                  ? Object.values(skills).reduce((a: number, b: unknown) => a + (b as number), 0) /
                      (Object.keys(skills).length || 1) *
                      100
                  : 0
              )}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(skills).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(skills).map(([skill, value]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="capitalize text-sm">{skill}</span>
                    <div className="h-2 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${(value as number) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Complete the assessment to see your skills.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            {todayLessons.length > 0 ? (
              <div className="space-y-2">
                {todayLessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-xs text-zinc-500">
                        {lesson.lessonType} · {lesson.estimatedMinutes} min
                      </p>
                    </div>
                    {lesson.id && completedToday.includes(lesson.id) ? (
                      <span className="text-green-600 text-xs font-medium">Done</span>
                    ) : lesson.id ? (
                      <Link href={`/lesson/${lesson.id}`}>
                        <Button size="sm" variant="outline">Start</Button>
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-zinc-500">
                  {hasPlan ? 'All caught up!' : 'Get started with an assessment.'}
                </p>
                <Link href="/assessment">
                  <Button size="sm">Take Assessment</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link href="/flashcards">
          <Button variant="outline">Flashcards</Button>
        </Link>
        <Link href="/chat">
          <Button variant="outline">AI Tutor Chat</Button>
        </Link>
      </div>
    </div>
  )
}
