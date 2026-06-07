'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '@/store/config'
import { useLanguageStore } from '@/store/language'
import { SUPPORTED_TARGET_LANGUAGES } from '@/lib/target-languages'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface AdminUserItem {
  id: number
  username: string
  email: string | null
  display_name: string
  role: string
  native_language: string
  is_active: boolean
  subscription_status: string
}

const LANGUAGES = [
  'en',
  'es',
  'fr',
  'pt',
  'de',
  'it',
  'pl',
  'nl',
  'ro',
  'ru',
] as const

export default function AdminUsersPage() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const tBilling = useTranslations('billing')
  const tLang = useTranslations('languages')
  const tTarget = useTranslations('targetLanguages')
  const tNav = useTranslations('nav')
  const [users, setUsers] = useState<AdminUserItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [subscriptionFilter, setSubscriptionFilter] = useState('')
  const PAGE_SIZE = 10
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [inviteUrl, setInviteUrl] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    native_language: 'es',
    target_language: 'en-US',
    role: 'user',
  })
  const [error, setError] = useState('')
  const [deletePending, setDeletePending] = useState<AdminUserItem | null>(null)
  const currentUserId = useAuthStore((s) => s.user?.id)
  const availableLanguageCodes = useLanguageStore(
    (s) => s.availableLanguageCodes
  )
  const maintenanceMode = useConfigStore((s) => s.maintenanceMode)
  const [maintenanceLoading, setMaintenanceLoading] = useState(false)

  const loadUsers = useCallback(
    async (pageIndex: number, query: string, subscription: string) => {
      setLoading(true)
      try {
        const qs = query.trim() ? `&q=${encodeURIComponent(query.trim())}` : ''
        const ss = subscription
          ? `&subscription=${encodeURIComponent(subscription)}`
          : ''
        const res = await apiFetch(
          `/api/admin/users?skip=${pageIndex * PAGE_SIZE}&limit=${PAGE_SIZE}${qs}${ss}`
        )
        if (res.ok) {
          const data = await res.json()
          setUsers(data.items)
          setTotal(data.total)
        } else if (res.status === 403) {
          setError('Admin access required')
        }
      } catch {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Page changes (e.g. pagination buttons) fire immediately.
  useEffect(() => {
    loadUsers(page, searchTerm, subscriptionFilter)
  }, [loadUsers, page]) // eslint-disable-line react-hooks/exhaustive-deps

  // Subscription filter changes: reset to page 0 immediately.
  useEffect(() => {
    if (page !== 0) {
      setPage(0)
    } else {
      loadUsers(0, searchTerm, subscriptionFilter)
    }
  }, [subscriptionFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch() {
    const term = searchInput
    setSearchTerm(term)
    if (page !== 0) {
      setPage(0)
    } else {
      loadUsers(0, term, subscriptionFilter)
    }
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!/^[a-zA-Z0-9._\s-]+$/.test(form.username)) {
      setError(t('invalidUsernameChars'))
      return
    }
    try {
      const sanitizedUsername = form.username.replace(/\s+/g, '_').toLowerCase()
      const res = await apiFetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, username: sanitizedUsername }),
      })
      if (!res.ok) throw new Error((await res.json()).detail)
      setShowCreate(false)
      setForm({
        username: '',
        email: '',
        password: '',
        display_name: '',
        native_language: 'es',
        target_language: 'en-US',
        role: 'user',
      })
      await loadUsers(page, searchTerm, subscriptionFilter)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
    }
  }

  async function toggleActive(user: AdminUserItem) {
    await apiFetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !user.is_active }),
    })
    await loadUsers(page, searchTerm, subscriptionFilter)
  }

  async function deleteUser(user: AdminUserItem) {
    const res = await apiFetch(`/api/admin/users/${user.id}`, {
      method: 'DELETE',
    })
    setDeletePending(null)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.detail || 'Failed to delete user')
    } else {
      // Si era el último de la página, retroceder una
      const newTotal = total - 1
      const maxPage = Math.max(0, Math.ceil(newTotal / PAGE_SIZE) - 1)
      const targetPage = Math.min(page, maxPage)
      if (targetPage !== page) {
        setPage(targetPage)
      } else {
        await loadUsers(targetPage, searchTerm, subscriptionFilter)
      }
    }
  }

  async function generateInvite() {
    const res = await apiFetch('/api/admin/invite', { method: 'POST' })
    const data = await res.json()
    setInviteUrl(`${window.location.origin}${data.invite_url}`)
  }

  async function toggleMaintenance() {
    setMaintenanceLoading(true)
    try {
      const res = await apiFetch('/api/admin/maintenance', { method: 'PATCH' })
      if (res.ok) {
        const data = await res.json()
        useConfigStore.setState({ maintenanceMode: data.maintenance_mode })
      }
    } catch {
      // ignore
    } finally {
      setMaintenanceLoading(false)
    }
  }

  const inputCls =
    'w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors'

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          {t('loading')}
        </span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
            {t('title')} / {t('users')}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateInvite}
            className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
          >
            {t('inviteBtn')}
          </button>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className={`text-fl-label border px-3 py-2 font-mono tracking-widest uppercase transition-colors ${
              showCreate
                ? 'border-fl-border-2 text-fl-fg'
                : 'border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2'
            }`}
          >
            {showCreate ? `- ${t('createUser')}` : t('createUserBtn')}
          </button>
          <Link
            href="/admin/feedback"
            className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
          >
            {tNav('feedback')}
          </Link>
        </div>
      </div>

      {/* Maintenance mode card */}
      <div
        className={`border px-5 py-4 ${maintenanceMode ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-fl-border bg-fl-surface'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`text-fl-label ${maintenanceMode ? 'text-yellow-500' : 'text-fl-muted-2'}`}
              >
                ●
              </span>
              <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
                {t('maintenanceTitle')}
              </span>
              {maintenanceMode && (
                <span className="text-fl-hint border border-yellow-500/40 px-2 py-0.5 font-mono tracking-widest text-yellow-500 uppercase">
                  {t('maintenanceOn')}
                </span>
              )}
            </div>
            <p className="text-fl-hint text-fl-muted-2 ml-5 font-mono">
              {t('maintenanceDesc')}
            </p>
          </div>
          <button
            onClick={toggleMaintenance}
            disabled={maintenanceLoading}
            className={`shrink-0 px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors ${
              maintenanceMode
                ? 'bg-fl-fg text-fl-bg hover:bg-fl-fg/90'
                : 'bg-yellow-500 text-black hover:bg-yellow-500/90'
            } disabled:opacity-50`}
          >
            {maintenanceLoading
              ? '...'
              : maintenanceMode
                ? t('maintenanceDisable')
                : t('maintenanceEnable')}
          </button>
        </div>
      </div>

      {/* Invite URL banner */}
      {inviteUrl && (
        <div className="border-fl-border bg-fl-surface border px-5 py-4">
          <p className="text-fl-label text-fl-muted-2 mb-2 font-mono tracking-widest uppercase">
            {t('inviteLink')}
          </p>
          <p className="text-fl-muted-1 font-mono text-xs break-all">
            {inviteUrl}
          </p>
        </div>
      )}

      {/* Global error banner (delete failures, etc.) */}
      {error && !showCreate && (
        <div className="border-fl-error/40 text-fl-error border px-4 py-3 font-mono text-xs">
          ✕ {error}
        </div>
      )}

      {/* Create user form */}
      {showCreate && (
        <div className="border-fl-border bg-fl-surface border">
          <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('createUser')}
            </span>
          </div>
          {error && (
            <div className="border-fl-error/40 text-fl-error mx-6 mt-4 border px-4 py-3 font-mono text-xs">
              ✕ {error}
            </div>
          )}
          <form onSubmit={createUser} className="space-y-3 p-6">
            {[
              {
                key: 'username',
                placeholder: t('fieldUsername'),
                required: true,
                type: 'text',
              },
              {
                key: 'email',
                placeholder: t('fieldEmail'),
                required: false,
                type: 'email',
              },
              {
                key: 'password',
                placeholder: t('fieldPassword'),
                required: true,
                type: 'password',
              },
              {
                key: 'display_name',
                placeholder: t('fieldDisplayName'),
                required: true,
                type: 'text',
              },
            ].map(({ key, placeholder, required, type }) => (
              <input
                key={key}
                type={type}
                placeholder={placeholder}
                required={required}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                autoCorrect={
                  type === 'email' || type === 'password' ? 'off' : undefined
                }
                autoCapitalize={
                  type === 'email' || type === 'password' ? 'none' : undefined
                }
                spellCheck={
                  type === 'email' || type === 'password' ? false : undefined
                }
                className={inputCls}
              />
            ))}
            <div>
              <label className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldNativeLanguage')}
              </label>
              <select
                value={form.native_language}
                onChange={(e) =>
                  setForm({ ...form, native_language: e.target.value })
                }
                className={inputCls + ' appearance-none'}
              >
                {[...LANGUAGES]
                  .sort((a, b) => tLang(a).localeCompare(tLang(b)))
                  .map((code) => (
                    <option key={code} value={code}>
                      {tLang(code)}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldTargetLanguage')}
              </label>
              <select
                value={form.target_language}
                onChange={(e) =>
                  setForm({ ...form, target_language: e.target.value })
                }
                className={inputCls + ' appearance-none'}
              >
                {SUPPORTED_TARGET_LANGUAGES.filter((l) =>
                  availableLanguageCodes.includes(l.code)
                ).map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {tTarget(lang.code)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldRole')}
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputCls + ' appearance-none'}
              >
                <option value="user">{t('roleUser')}</option>
                <option value="admin">{t('roleAdmin')}</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 mt-1 w-full py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              — {t('submitCreate')}
            </button>
          </form>
        </div>
      )}

      {/* User list */}
      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('users')}
          </span>
          <span className="text-fl-hint text-fl-muted-4 ml-auto font-mono tracking-widest uppercase">
            {total} {t('total')}
          </span>
        </div>
        {/* Search & filter */}
        <div className="border-fl-border flex gap-2 border-b px-6 py-3">
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="bg-fl-bg border-fl-border text-fl-fg placeholder:text-fl-muted-4 focus:border-fl-border-2 flex-1 border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-fl-bg border-fl-border text-fl-muted-3 hover:text-fl-fg hover:border-fl-border-2 shrink-0 border px-3 py-2 transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-border-2 shrink-0 appearance-none border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
          >
            <option value="">{tCommon('all')}</option>
            <option value="none">{tBilling('statusNone')}</option>
            <option value="active">{tBilling('statusActive')}</option>
            <option value="trialing">{tBilling('statusTrialing')}</option>
            <option value="past_due">{tBilling('statusPastDue')}</option>
            <option value="canceled">{tBilling('statusCanceled')}</option>
          </select>
        </div>
        {users.length === 0 ? (
          <p className="text-fl-muted-2 px-6 py-8 text-center font-mono text-xs">
            {t('noUsers')}
          </p>
        ) : (
          <div>
            {users.map((u, i) => (
              <div
                key={u.id}
                className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${i < users.length - 1 ? 'border-fl-border border-b' : ''}`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-fl-fg font-mono text-sm">
                      {u.display_name}
                    </span>
                    <span
                      className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                        u.role === 'admin'
                          ? 'border-fl-fg/40 text-fl-fg'
                          : 'border-fl-border text-fl-muted-2'
                      }`}
                    >
                      {u.role === 'admin' ? t('roleAdmin') : t('roleUser')}
                    </span>
                    {!u.is_active && (
                      <span className="text-fl-hint border-fl-error/30 text-fl-error-fg border px-2 py-0.5 font-mono tracking-widest uppercase">
                        {t('inactive')}
                      </span>
                    )}
                    {u.subscription_status === 'active' && (
                      <span className="text-fl-hint border border-green-500/40 px-2 py-0.5 font-mono tracking-widest text-green-400 uppercase">
                        {tBilling('statusActive')}
                      </span>
                    )}
                    {u.subscription_status === 'trialing' && (
                      <span className="text-fl-hint border border-blue-500/40 px-2 py-0.5 font-mono tracking-widest text-blue-400 uppercase">
                        {tBilling('statusTrialing')}
                      </span>
                    )}
                    {u.subscription_status === 'past_due' && (
                      <span className="text-fl-hint border border-yellow-500/40 px-2 py-0.5 font-mono tracking-widest text-yellow-400 uppercase">
                        {tBilling('statusPastDue')}
                      </span>
                    )}
                    {u.subscription_status === 'canceled' && (
                      <span className="text-fl-hint border-fl-border text-fl-muted-2 border px-2 py-0.5 font-mono tracking-widest uppercase">
                        {tBilling('statusCanceled')}
                      </span>
                    )}
                  </div>
                  <p className="text-fl-label text-fl-muted-2 font-mono break-all">
                    <span className="text-fl-muted-4">#{u.id}</span> ·{' '}
                    {u.username.toLowerCase()} {u.email ? `· ${u.email}` : ''} ·{' '}
                    {u.native_language}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/admin/users/${u.id}`}
                    className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
                  >
                    {t('viewStats')}
                  </Link>
                  <button
                    onClick={() => toggleActive(u)}
                    disabled={u.id === currentUserId}
                    className={`text-fl-label border px-3 py-2 font-mono tracking-widest uppercase transition-colors ${
                      u.id === currentUserId
                        ? 'cursor-not-allowed opacity-20'
                        : u.is_active
                          ? 'border-fl-error/30 text-fl-error-fg hover:border-fl-error'
                          : 'border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2'
                    }`}
                    title={
                      u.id === currentUserId
                        ? t('cannotDeactivateSelf')
                        : u.is_active
                          ? t('deactivate')
                          : t('activate')
                    }
                  >
                    {u.is_active ? t('deactivate') : t('activate')}
                  </button>
                  <button
                    onClick={() => setDeletePending(u)}
                    disabled={u.id === currentUserId}
                    className="border-fl-error/30 text-fl-label text-fl-error-fg hover:border-fl-error hover:text-fl-error border px-3 py-2 font-mono tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-20"
                    title={
                      u.id === currentUserId
                        ? t('cannotDeleteSelf')
                        : 'Delete user'
                    }
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {total > PAGE_SIZE && (
        <div className="border-fl-border bg-fl-surface flex items-center justify-between border px-6 py-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-4 py-2 font-mono tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          >
            {t('prevPage')}
          </button>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest">
            {page + 1} / {Math.ceil(total / PAGE_SIZE)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * PAGE_SIZE >= total}
            className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 border px-4 py-2 font-mono tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-20"
          >
            {t('nextPage')}
          </button>
        </div>
      )}

      <ConfirmDialog
        open={deletePending !== null}
        title={t('deleteUser')}
        message={t('deleteUserMessage')}
        confirmLabel={t('deleteConfirm')}
        danger
        onConfirm={() => deletePending && deleteUser(deletePending)}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  )
}
