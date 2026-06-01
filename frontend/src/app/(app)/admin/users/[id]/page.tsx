'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { type QuotaStatus } from '@/types/api'

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
  is_verified: boolean
  subscription_status: string
  subscription_ends_at: string | null
  stripe_customer_id: string | null
  conversation_weekly_sessions: number
  conversation_daily_minutes: number
  conversation_weekly_minutes: number
  monthly_tokens_limit: number
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-fl-border flex items-center justify-between border-b py-3 last:border-0">
      <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
        {label}
      </span>
      <span className="text-fl-fg font-mono text-sm">{value}</span>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-fl-border bg-fl-surface border">
      <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
        <span className="text-fl-label text-fl-muted-2">●</span>
        <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
          {title}
        </span>
      </div>
      <div className="px-6">{children}</div>
    </div>
  )
}

export default function AdminUserStatsPage() {
  const t = useTranslations('admin')
  const tLang = useTranslations('languages')
  const tBilling = useTranslations('billing')
  const params = useParams()
  const userId = params?.id as string

  const [user, setUser] = useState<AdminUser | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [quota, setQuota] = useState<QuotaStatus | null>(null)
  const [quotaWeekly, setQuotaWeekly] = useState<string>('')
  const [quotaDaily, setQuotaDaily] = useState<string>('')
  const [quotaWeeklyMinutes, setQuotaWeeklyMinutes] = useState<string>('')
  const [quotaMonthlyTokens, setQuotaMonthlyTokens] = useState<string>('')
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
        setQuotaMonthlyTokens(String(uData.monthly_tokens_limit))
        if (qRes.ok) {
          const qData: QuotaStatus = await qRes.json()
          setQuota(qData)
        }
      })
      .catch(() => setError('loadError'))
      .finally(() => setLoading(false))
  }, [userId])

  async function toggleVerified() {
    if (!userId || !user) return
    const res = await apiFetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_verified: !user.is_verified }),
    })
    if (res.ok) {
      const updated: AdminUser = await res.json()
      setUser(updated)
    }
  }

  async function saveQuota() {
    if (!userId) return
    setQuotaSaving(true)
    setQuotaSaved(false)
    const weekly = parseInt(quotaWeekly, 10)
    const daily = parseInt(quotaDaily, 10)
    const weeklyMin = parseInt(quotaWeeklyMinutes, 10)
    const monthlyTok = parseInt(quotaMonthlyTokens, 10)
    if (
      isNaN(weekly) ||
      weekly < 0 ||
      isNaN(daily) ||
      daily < 0 ||
      isNaN(weeklyMin) ||
      weeklyMin < 0 ||
      isNaN(monthlyTok) ||
      monthlyTok < 0
    ) {
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
          monthly_tokens_limit: monthlyTok,
        }),
      })
      if (res.ok) {
        const updated: AdminUser = await res.json()
        setUser(updated)
        setQuotaWeekly(String(updated.conversation_weekly_sessions))
        setQuotaDaily(String(updated.conversation_daily_minutes))
        setQuotaWeeklyMinutes(String(updated.conversation_weekly_minutes))
        setQuotaMonthlyTokens(String(updated.monthly_tokens_limit))
        // Refresh quota display so new limits are reflected immediately
        const qRes = await apiFetch(`/api/admin/users/${userId}/quota`)
        if (qRes.ok) {
          const qData: QuotaStatus = await qRes.json()
          setQuota(qData)
        }
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
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          {t('loading')}
        </span>
      </div>
    )
  }

  if (error || !user || !stats) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="border-fl-error/40 text-fl-error border px-4 py-3 font-mono text-xs">
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
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/users"
            className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            {t('users')}
          </Link>
          <span className="text-fl-muted-4 text-fl-label font-mono">/</span>
          <span className="text-fl-label text-fl-fg font-mono tracking-widest uppercase">
            {user.display_name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!user.is_active && (
            <span className="text-fl-hint border-fl-error/30 text-fl-error-fg border px-2 py-0.5 font-mono tracking-widest uppercase">
              {t('inactive')}
            </span>
          )}
          <span
            className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
              user.role === 'admin'
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
        <StatRow
          label={t('fieldUsername')}
          value={user.username.toLowerCase()}
        />
        {user.email && <StatRow label={t('fieldEmail')} value={user.email} />}
        {user.email && (
          <div className="border-fl-border flex items-center justify-between border-b py-3">
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {user.is_verified ? t('emailVerified') : t('emailNotVerified')}
            </span>
            <button
              onClick={toggleVerified}
              className="text-fl-hint hover:border-fl-fg hover:text-fl-fg border-fl-border text-fl-muted-2 border px-2 py-0.5 font-mono tracking-widest uppercase transition-colors"
            >
              {user.is_verified ? t('unverifyEmail') : t('verifyEmail')}
            </button>
          </div>
        )}
        <StatRow
          label={t('fieldNativeLanguage')}
          value={tLang(
            user.native_language as
              | 'en'
              | 'es'
              | 'fr'
              | 'pt'
              | 'de'
              | 'it'
              | 'pl'
              | 'nl'
              | 'ro'
              | 'ru'
          )}
        />
        <StatRow
          label={t('fieldSubscription')}
          value={
            <span
              className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                user.subscription_status === 'active'
                  ? 'border-green-500/40 text-green-400'
                  : user.subscription_status === 'trialing'
                    ? 'border-blue-500/40 text-blue-400'
                    : user.subscription_status === 'past_due'
                      ? 'border-yellow-500/40 text-yellow-400'
                      : 'border-fl-border text-fl-muted-2'
              }`}
            >
              {user.subscription_status === 'active'
                ? tBilling('statusActive')
                : user.subscription_status === 'trialing'
                  ? tBilling('statusTrialing')
                  : user.subscription_status === 'past_due'
                    ? tBilling('statusPastDue')
                    : user.subscription_status === 'canceled'
                      ? tBilling('statusCanceled')
                      : tBilling('statusNone')}
            </span>
          }
        />
        {user.subscription_ends_at && (
          <StatRow
            label={t('fieldEndsRenews')}
            value={new Date(user.subscription_ends_at).toLocaleDateString()}
          />
        )}
        {user.stripe_customer_id && (
          <StatRow
            label={t('fieldStripeCustomer')}
            value={user.stripe_customer_id}
          />
        )}
      </Section>

      {/* Study plan */}
      <Section title={t('statsCefr')}>
        <StatRow label={t('statsCefr')} value={stats.current_cefr ?? '—'} />
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
          <p className="text-fl-muted-2 py-4 font-mono text-xs">
            {t('statsTokensNote')}
          </p>
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
              value={
                quota.sessions_unlimited
                  ? t('quotaUnlimitedLabel')
                  : `${quota.sessions_this_week} / ${quota.sessions_limit}`
              }
            />
            <StatRow
              label={t('quotaUsedMinutes')}
              value={
                quota.time_unlimited
                  ? t('quotaUnlimitedLabel')
                  : `${quota.minutes_today} / ${quota.minutes_limit} min`
              }
            />
            <StatRow
              label={t('quotaUsedWeeklyMinutes')}
              value={
                quota.weekly_minutes_unlimited
                  ? t('quotaUnlimitedLabel')
                  : `${quota.minutes_this_week} / ${quota.weekly_minutes_limit} min`
              }
            />
          </>
        )}
        <div className="space-y-3 py-3">
          <div className="flex items-center justify-between gap-4">
            <label className="text-fl-label text-fl-muted-2 shrink-0 font-mono tracking-widest uppercase">
              {t('quotaWeeklySessions')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaWeekly}
              onChange={(e) => setQuotaWeekly(e.target.value)}
              className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-accent w-24 border px-3 py-1.5 text-right font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-fl-label text-fl-muted-2 shrink-0 font-mono tracking-widest uppercase">
              {t('quotaDailyMinutes')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaDaily}
              onChange={(e) => setQuotaDaily(e.target.value)}
              className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-accent w-24 border px-3 py-1.5 text-right font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label
              className="text-fl-label text-fl-muted-2 max-w-[10rem] shrink-0 truncate font-mono tracking-widest uppercase"
              title={t('quotaWeeklyMinutes')}
            >
              {t('quotaWeeklyMinutes')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaWeeklyMinutes}
              onChange={(e) => setQuotaWeeklyMinutes(e.target.value)}
              className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-accent w-24 border px-3 py-1.5 text-right font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label
              className="text-fl-label text-fl-muted-2 max-w-[10rem] shrink-0 truncate font-mono tracking-widest uppercase"
              title={t('quotaMonthlyTokens')}
            >
              {t('quotaMonthlyTokens')}
            </label>
            <input
              type="number"
              min={0}
              value={quotaMonthlyTokens}
              onChange={(e) => setQuotaMonthlyTokens(e.target.value)}
              className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-accent w-24 border px-3 py-1.5 text-right font-mono text-sm focus:outline-none"
            />
          </div>
          <p className="text-fl-hint text-fl-muted-4 font-mono">
            {t('quotaUnlimitedLabel')}
          </p>
          <button
            onClick={saveQuota}
            disabled={quotaSaving}
            className="border-fl-border bg-fl-surface text-fl-label text-fl-muted-2 hover:text-fl-fg hover:border-fl-fg w-full border px-4 py-2 font-mono tracking-widest uppercase transition-colors disabled:opacity-40"
          >
            {quotaSaved ? `✓ ${t('quotaSaved')}` : t('quotaSave')}
          </button>
        </div>
      </Section>
    </div>
  )
}
