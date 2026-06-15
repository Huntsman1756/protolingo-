'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { getLanguageByCode } from '@/lib/target-languages'
import { type QuotaStatus } from '@/types/api'
import { PageLoading } from '@/components/ui/page-loading'

interface LanguageStats {
  target_language: string
  cefr_level: string | null
  xp_total: number
  streak_current: number
  active_days: number
  lessons_completed: number
  exercises_correct: number
  exercises_total: number
}

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
  per_language: LanguageStats[]
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
  const [subscriptionSaving, setSubscriptionSaving] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<'none' | 'monthly' | 'yearly'>(
    'none'
  )
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

  useEffect(() => {
    if (!user) {
      setCurrentPlan('none')
      return
    }
    if (
      user.subscription_status !== 'active' &&
      user.subscription_status !== 'trialing'
    ) {
      setCurrentPlan('none')
      return
    }
    if (user.subscription_ends_at) {
      const diffDays = Math.round(
        (new Date(user.subscription_ends_at).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
      setCurrentPlan(diffDays > 60 ? 'yearly' : 'monthly')
      return
    }
    setCurrentPlan('monthly')
  }, [user])

  async function handleSubscriptionChange(plan: 'none' | 'monthly' | 'yearly') {
    if (!userId) return
    setSubscriptionSaving(true)
    try {
      const body: Record<string, string | null> = {}
      if (plan === 'none') {
        body.subscription_status = 'none'
        body.subscription_ends_at = null
      } else {
        body.subscription_status = 'active'
        const days = plan === 'monthly' ? 30 : 365
        const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        body.subscription_ends_at = endDate.toISOString()
      }
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        const updated: AdminUser = await res.json()
        setUser(updated)
      }
    } finally {
      setSubscriptionSaving(false)
    }
  }

  if (loading) {
    return <PageLoading label={t('loading')} />
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
        <div className="border-fl-border flex items-center justify-between border-b py-3">
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('fieldSubscription')}
          </span>
          <select
            value={currentPlan}
            onChange={(e) =>
              handleSubscriptionChange(
                e.target.value as 'none' | 'monthly' | 'yearly'
              )
            }
            disabled={subscriptionSaving}
            className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-accent border py-1.5 pr-5 pl-3 font-mono text-xs tracking-widest uppercase focus:outline-none disabled:opacity-40"
          >
            <option
              value="none"
              className="font-mono tracking-widest uppercase"
            >
              {tBilling('statusNone')}
            </option>
            <option
              value="monthly"
              className="font-mono tracking-widest uppercase"
            >
              {tBilling('planMonthlyName')}
            </option>
            <option
              value="yearly"
              className="font-mono tracking-widest uppercase"
            >
              {tBilling('planYearlyName')}
            </option>
          </select>
        </div>
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

      {/* Languages */}
      {stats.per_language.length > 0 && (
        <Section title={t('sectionLanguages')}>
          <div className="space-y-3 py-3">
            {stats.per_language.map((pl) => {
              const lang = getLanguageByCode(pl.target_language)
              const isActive = pl.cefr_level !== null
              const pct =
                pl.exercises_total > 0
                  ? Math.round(
                      (pl.exercises_correct / pl.exercises_total) * 100
                    )
                  : null
              return (
                <div
                  key={pl.target_language}
                  className={`bg-fl-bg border px-4 py-3 ${
                    isActive ? 'border-fl-accent/50' : 'border-fl-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {lang && (
                      <Image
                        src={lang.flagPath}
                        alt={lang.code}
                        width={24}
                        height={17}
                        className="shrink-0 object-cover"
                      />
                    )}
                    <span className="text-fl-fg truncate font-mono text-sm font-bold">
                      {lang?.name ?? pl.target_language}
                    </span>
                    {isActive ? (
                      <span className="text-fl-label bg-fl-accent/20 text-fl-accent shrink-0 px-2 py-0.5 font-mono text-xs tracking-widest uppercase">
                        {pl.cefr_level} · {t('statsActive')}
                      </span>
                    ) : (
                      <span className="text-fl-label text-fl-muted-2 shrink-0 font-mono text-xs tracking-widest uppercase">
                        —
                      </span>
                    )}
                  </div>
                  <div className="text-fl-muted-2 mt-2 flex flex-wrap gap-x-3 gap-y-0 font-mono text-xs">
                    <span>XP: {pl.xp_total.toLocaleString()}</span>
                    <span>Racha: {pl.streak_current}d</span>
                    <span>Lecciones: {pl.lessons_completed}</span>
                    <span>
                      Ejer: {pl.exercises_correct}/{pl.exercises_total}
                      {pct != null && ` (${pct}%)`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* Activity (global totals) */}
      <Section title={t('sectionActivity')}>
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
