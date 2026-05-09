'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'

interface UserStats {
  user_id: number
  current_cefr: string | null
  current_unit: string | null
  plan_duration_weeks: number | null
  completion_test_score: number | null
  xp_total: number
  streak_current: number
  active_days: number
  lessons_completed: number
  exercises_correct: number
  exercises_total: number
  chat_messages_sent: number
  tokens_total: number
  tokens_chat: number
  tokens_conversation: number
}

interface AdminUser {
  id: number
  username: string
  display_name: string
  email: string | null
  role: string
  native_language: string
  is_active: boolean
  conversation_weekly_sessions: number
  conversation_daily_minutes: number
  conversation_weekly_minutes: number
}

interface QuotaStatus {
  sessions_this_week: number
  sessions_limit: number
  sessions_unlimited: boolean
  minutes_today: number
  minutes_limit: number
  time_unlimited: boolean
  minutes_this_week: number
  weekly_minutes_limit: number
  weekly_minutes_unlimited: boolean
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-fl-border last:border-0">
      <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{label}</span>
      <span className="font-mono text-sm text-fl-fg">{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-fl-border bg-fl-surface">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
        <span className="text-fl-label text-fl-muted-2">●</span>
        <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{title}</span>
      </div>
      <div className="px-6">{children}</div>
    </div>
  )
}

export default function AdminUserStatsPage() {
  const t = useTranslations('admin')
  const tLang = useTranslations('languages')
  const params = useParams()
  const userId = params?.id as string

  const [user, setUser] = useState<AdminUser | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [quota, setQuota] = useState<QuotaStatus | null>(null)
  const [quotaWeekly, setQuotaWeekly] = useState<string>('')
  const [quotaDaily, setQuotaDaily] = useState<string>('')
  const [quotaWeeklyMinutes, setQuotaWeeklyMinutes] = useState<string>('')
  const [quotaSaving, setQuotaSaving] = useState(false)
  const [quotaSaved, setQuotaSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    Promise.all([
      apiFetch(`/api/admin/users/${userId}`),
      apiFetch(`/api/admin/users/${userId}/stats`),
      apiFetch(`/api/admin/users/${userId}/quota`),
    ])
      .then(async ([uRes, sRes, qRes]) => {
        if (!uRes.ok || !sRes.ok) {
          setError('loadError')
          return
        }
        const [uData, sData] = await Promise.all([uRes.json(), sRes.json()])
        setUser(uData)
        setStats(sData)
        setQuotaWeekly(String(uData.conversation_weekly_sessions))
        setQuotaDaily(String(uData.conversation_daily_minutes))
        setQuotaWeeklyMinutes(String(uData.conversation_weekly_minutes))
        if (qRes.ok) {
          const qData: QuotaStatus = await qRes.json()
          setQuota(qData)
        }
      })
      .catch(() => setError('loadError'))
      .finally(() => setLoading(false))
  }, [userId])

  async function saveQuota() {
    if (!userId) return
    setQuotaSaving(true)
    setQuotaSaved(false)
    const weekly = parseInt(quotaWeekly, 10)
    const daily = parseInt(quotaDaily, 10)
    const weeklyMin = parseInt(quotaWeeklyMinutes, 10)
    if (isNaN(weekly) || weekly < 0 || isNaN(daily) || daily < 0 || isNaN(weeklyMin) || weeklyMin < 0) {
      setQuotaSaving(false)
      return
    }
    try {
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_weekly_sessions: weekly,
          conversation_daily_minutes: daily,
          conversation_weekly_minutes: weeklyMin,
        }),
      })
      if (res.ok) {
        const updated: AdminUser = await res.json()
        setUser(updated)
        setQuotaWeekly(String(updated.conversation_weekly_sessions))
        setQuotaDaily(String(updated.conversation_daily_minutes))
        setQuotaWeeklyMinutes(String(updated.conversation_weekly_minutes))
        setQuotaSaved(true)
        setTimeout(() => setQuotaSaved(false), 3000)
      }
    } finally {
      setQuotaSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          {t('loading')}
        </span>
      </div>
    )
  }

  if (error || !user || !stats) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">
          ✕ {error ? t(error as 'loadError') : t('userNotFound')}
        </div>
      </div>
    )
  }

  const exercisePct =
    stats.exercises_total > 0
      ? Math.round((stats.exercises_correct / stats.exercises_total) * 100)
      : null

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/users"
            className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase hover:text-fl-fg transition-colors"
          >
            {t('users')}
          </Link>
          <span className="text-fl-muted-4 font-mono text-fl-label">/</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-fg uppercase">
            {user.display_name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!user.is_active && (
            <span className="font-mono text-fl-hint tracking-widest uppercase border border-fl-error/30 text-fl-error-fg px-2 py-0.5">
              {t('inactive')}
            </span>
          )}
          <span
            className={`font-mono text-fl-hint tracking-widest uppercase border px-2 py-0.5 ${user.role === 'admin'
              ? 'border-fl-fg/40 text-fl-fg'
              : 'border-fl-border text-fl-muted-2'
              }`}
          >
            {user.role === 'admin' ? t('roleAdmin') : t('roleUser')}
          </span>
        </div>
      </div>

      {/* Identity */}
      <Section title={t('statsTitle')}>
        <StatRow label="ID" value={`#${user.id}`} />
        <StatRow label={t('fieldUsername')} value={user.username} />
        {user.email && <StatRow label={t('fieldEmail')} value={user.email} />}
        <StatRow label={t('fieldNativeLanguage')} value={tLang(user.native_language as 'es' | 'fr' | 'pt' | 'de' | 'it' | 'pl' | 'nl' | 'ro' | 'ru')} />
      </Section>

      {/* Study plan */}
      <Section title={t('statsCefr')}>
        <StatRow
          label={t('statsCefr')}
          value={stats.current_cefr ?? '—'}
        />
        <StatRow
          label={t('statsUnit')}
          value={stats.current_unit != null ? `${stats.current_unit}` : '—'}
        />
        <StatRow
          label={t('statsPlanWeeks')}
          value={
            stats.plan_duration_weeks != null
              ? `${stats.plan_duration_weeks} ${t('weeks')}`
              : '—'
          }
        />
        {stats.completion_test_score != null && (
          <StatRow
            label={t('statsTestScore')}
            value={`${Math.round(stats.completion_test_score * 100)}%`}
          />
        )}
        <StatRow label={t('statsLessons')} value={stats.lessons_completed} />
      </Section>

      {/* Progress */}
      <Section title={t('sectionXpProgress')}>
        <StatRow label={t('statsXp')} value={stats.xp_total.toLocaleString()} />
        <StatRow
          label={t('statsStreak')}
          value={`${stats.streak_current} ${t('statsDays')}`}
        />
        <StatRow label={t('statsActiveDays')} value={stats.active_days} />
        <StatRow
          label={t('statsExercises')}
          value={
            exercisePct != null
              ? `${stats.exercises_correct} / ${stats.exercises_total} (${exercisePct}%)`
              : '—'
          }
        />
      </Section>

      {/* Chat */}
      <Section title="Chat">
        <StatRow label={t('statsMessages')} value={stats.chat_messages_sent} />
      </Section>

      {/* Token usage */}
      <Section title="Tokens">
        {stats.tokens_total === 0 ? (
          <p className="py-4 font-mono text-xs text-fl-muted-2">{t('statsTokensNote')}</p>
        ) : (
          <>
            <StatRow
              label={t('statsTokensTotal')}
              value={stats.tokens_total.toLocaleString()}
            />
            <StatRow
              label={t('statsTokensChat')}
              value={stats.tokens_chat.toLocaleString()}
            />
            <StatRow
              label={t('statsTokensConversation')}
              value={stats.tokens_conversation.toLocaleString()}
            />
          </>
        )}
      </Section>

      {/* Conversation Quotas */}
      <Section title={t('sectionQuota')}>
        {quota && (
          <>
            <StatRow
              label={t('quotaUsedSessions')}
              value={quota.sessions_unlimited ? t('quotaUnlimitedLabel') : `${quota.sessions_this_week} / ${quota.sessions_limit}`}
            />
            <StatRow
              label={t('quotaUsedMinutes')}
              value={quota.time_unlimited ? t('quotaUnlimitedLabel') : `${quota.minutes_today} / ${quota.minutes_limit} min`}
            />
            <StatRow
              label={t('quotaUsedWeeklyMinutes')}
              value={quota.weekly_minutes_unlimited ? t('quotaUnlimitedLabel') : `${quota.minutes_this_week} / ${quota.weekly_minutes_limit} min`}
            />
          </>
        )}
        <div className="py-3 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <label className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase shrink-0">
              {t('quotaWeeklySessions')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaWeekly}
              onChange={(e) => setQuotaWeekly(e.target.value)}
              className="w-24 bg-fl-bg border border-fl-border px-3 py-1.5 font-mono text-sm text-fl-fg text-right focus:outline-none focus:border-fl-accent"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase shrink-0">
              {t('quotaDailyMinutes')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaDaily}
              onChange={(e) => setQuotaDaily(e.target.value)}
              className="w-24 bg-fl-bg border border-fl-border px-3 py-1.5 font-mono text-sm text-fl-fg text-right focus:outline-none focus:border-fl-accent"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase shrink-0 max-w-[10rem] truncate" title={t('quotaWeeklyMinutes')}>
              {t('quotaWeeklyMinutes')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaWeeklyMinutes}
              onChange={(e) => setQuotaWeeklyMinutes(e.target.value)}
              className="w-24 bg-fl-bg border border-fl-border px-3 py-1.5 font-mono text-sm text-fl-fg text-right focus:outline-none focus:border-fl-accent"
            />
          </div>
          <p className="font-mono text-fl-hint text-fl-muted-4">{t('quotaUnlimitedLabel')}</p>
          <button
            onClick={saveQuota}
            disabled={quotaSaving}
            className="w-full border border-fl-border bg-fl-surface px-4 py-2 font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase hover:text-fl-fg hover:border-fl-fg transition-colors disabled:opacity-40"
          >
            {quotaSaved ? `✓ ${t('quotaSaved')}` : t('quotaSave')}
          </button>
        </div>
      </Section>
    </div>
  )
}
