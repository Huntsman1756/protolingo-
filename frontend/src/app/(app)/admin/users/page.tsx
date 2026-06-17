'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  Check,
  Clipboard,
  ExternalLink,
  FilterX,
  LinkIcon,
  Loader2,
  Plus,
  Search,
  ShieldAlert,
  UserPlus,
} from 'lucide-react'
import { AdminNav } from '@/components/admin/AdminNav'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { PageLoading } from '@/components/ui/page-loading'
import { Pagination } from '@/components/ui/pagination'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { apiFetch } from '@/lib/api'
import {
  DEFAULT_TARGET_LANGUAGE,
  SUPPORTED_TARGET_LANGUAGES,
} from '@/lib/target-languages'
import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '@/store/config'
import { useLanguageStore } from '@/store/language'

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

const PAGE_SIZE = 10

function statusBadgeClass(status: string) {
  switch (status) {
    case 'active':
      return 'border-green-500/40 text-green-400'
    case 'trialing':
      return 'border-blue-500/40 text-blue-400'
    case 'past_due':
      return 'border-yellow-500/40 text-yellow-400'
    case 'canceled':
      return 'border-fl-border text-fl-muted-2'
    default:
      return 'border-fl-border text-fl-muted-3'
  }
}

export default function AdminUsersPage() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const tBilling = useTranslations('billing')
  const tLang = useTranslations('languages')
  const tTarget = useTranslations('targetLanguages')
  const searchParams = useSearchParams()
  const [users, setUsers] = useState<AdminUserItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get('q') ?? ''
  )
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get('q') ?? ''
  )
  const [subscriptionFilter, setSubscriptionFilter] = useState(() => {
    const subscription = searchParams.get('subscription')
    return subscription &&
      ['none', 'trialing', 'active', 'past_due', 'canceled'].includes(
        subscription
      )
      ? subscription
      : ''
  })
  const [roleFilter, setRoleFilter] = useState(() => {
    const role = searchParams.get('role')
    return role === 'user' || role === 'admin' ? role : ''
  })
  const [activeFilter, setActiveFilter] = useState(() => {
    const active = searchParams.get('is_active')
    return active === 'true' || active === 'false' ? active : ''
  })
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [inviteUrl, setInviteUrl] = useState('')
  const [inviteCopied, setInviteCopied] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    native_language: 'es',
    target_language: DEFAULT_TARGET_LANGUAGE,
    role: 'user',
  })
  const [error, setError] = useState('')
  const [createSaving, setCreateSaving] = useState(false)
  const [actionBusy, setActionBusy] = useState<string | null>(null)
  const [deletePending, setDeletePending] = useState<AdminUserItem | null>(null)
  const [activePending, setActivePending] = useState<AdminUserItem | null>(null)
  const currentUserId = useAuthStore((s) => s.user?.id)
  const availableLanguageCodes = useLanguageStore(
    (s) => s.availableLanguageCodes
  )
  const maintenanceMode = useConfigStore((s) => s.maintenanceMode)
  const [maintenanceLoading, setMaintenanceLoading] = useState(false)

  useEffect(() => {
    if (window.location.search.includes('create=1')) {
      setShowCreate(true)
    }
  }, [])

  const visibleTargetLanguages = useMemo(() => {
    if (availableLanguageCodes.length === 0) return SUPPORTED_TARGET_LANGUAGES
    return SUPPORTED_TARGET_LANGUAGES.filter((l) =>
      availableLanguageCodes.includes(l.code)
    )
  }, [availableLanguageCodes])

  const loadUsers = useCallback(
    async (
      pageIndex: number,
      query: string,
      subscription: string,
      role: string,
      active: string
    ) => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({
          skip: String(pageIndex * PAGE_SIZE),
          limit: String(PAGE_SIZE),
        })
        if (query.trim()) params.set('q', query.trim())
        if (subscription) params.set('subscription', subscription)
        if (role) params.set('role', role)
        if (active) params.set('is_active', active)
        const res = await apiFetch(`/api/admin/users?${params.toString()}`)
        if (res.ok) {
          const data = await res.json()
          setUsers(data.items)
          setTotal(data.total)
        } else if (res.status === 403) {
          setError(t('adminRequired'))
        } else {
          setError(t('usersLoadError'))
        }
      } catch {
        setError(t('usersLoadError'))
      } finally {
        setLoading(false)
      }
    },
    [t]
  )

  useEffect(() => {
    loadUsers(page, searchTerm, subscriptionFilter, roleFilter, activeFilter)
  }, [loadUsers, page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (page !== 0) {
      setPage(0)
    } else {
      loadUsers(0, searchTerm, subscriptionFilter, roleFilter, activeFilter)
    }
  }, [subscriptionFilter, roleFilter, activeFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch() {
    const term = searchInput
    setSearchTerm(term)
    if (page !== 0) {
      setPage(0)
    } else {
      loadUsers(0, term, subscriptionFilter, roleFilter, activeFilter)
    }
  }

  function clearFilters() {
    setSearchInput('')
    setSearchTerm('')
    setSubscriptionFilter('')
    setRoleFilter('')
    setActiveFilter('')
    if (page !== 0) {
      setPage(0)
    } else {
      loadUsers(0, '', '', '', '')
    }
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!/^[a-zA-Z0-9._\s-]+$/.test(form.username)) {
      setError(t('invalidUsernameChars'))
      return
    }
    setCreateSaving(true)
    try {
      const sanitizedUsername = form.username.replace(/\s+/g, '_').toLowerCase()
      const res = await apiFetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, username: sanitizedUsername }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || t('createUserError'))
      }
      setShowCreate(false)
      setForm({
        username: '',
        email: '',
        password: '',
        display_name: '',
        native_language: 'es',
        target_language: DEFAULT_TARGET_LANGUAGE,
        role: 'user',
      })
      await loadUsers(
        page,
        searchTerm,
        subscriptionFilter,
        roleFilter,
        activeFilter
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('createUserError'))
    } finally {
      setCreateSaving(false)
    }
  }

  async function toggleActive(user: AdminUserItem) {
    setActionBusy(`active-${user.id}`)
    const res = await apiFetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !user.is_active }),
    })
    setActivePending(null)
    setActionBusy(null)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.detail || t('updateUserError'))
      return
    }
    await loadUsers(
      page,
      searchTerm,
      subscriptionFilter,
      roleFilter,
      activeFilter
    )
  }

  async function deleteUser(user: AdminUserItem) {
    setActionBusy(`delete-${user.id}`)
    const res = await apiFetch(`/api/admin/users/${user.id}`, {
      method: 'DELETE',
    })
    setDeletePending(null)
    setActionBusy(null)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.detail || t('deleteUserError'))
    } else {
      const newTotal = total - 1
      const maxPage = Math.max(0, Math.ceil(newTotal / PAGE_SIZE) - 1)
      const targetPage = Math.min(page, maxPage)
      if (targetPage !== page) {
        setPage(targetPage)
      } else {
        await loadUsers(
          targetPage,
          searchTerm,
          subscriptionFilter,
          roleFilter,
          activeFilter
        )
      }
    }
  }

  async function generateInvite() {
    setActionBusy('invite')
    setError('')
    setInviteCopied(false)
    try {
      const res = await apiFetch('/api/admin/invite', { method: 'POST' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setInviteUrl(`${window.location.origin}${data.invite_url}`)
    } catch {
      setError(t('inviteError'))
    } finally {
      setActionBusy(null)
    }
  }

  async function copyInvite() {
    if (!inviteUrl) return
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setInviteCopied(true)
      window.setTimeout(() => setInviteCopied(false), 2000)
    } catch {
      setError(t('copyInviteError'))
    }
  }

  async function toggleMaintenance() {
    setMaintenanceLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/admin/maintenance', { method: 'PATCH' })
      if (res.ok) {
        const data = await res.json()
        useConfigStore.setState({ maintenanceMode: data.maintenance_mode })
      } else {
        setError(t('maintenanceError'))
      }
    } catch {
      setError(t('maintenanceError'))
    } finally {
      setMaintenanceLoading(false)
    }
  }

  const inputCls =
    'w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors'

  const hasFilters =
    searchTerm ||
    subscriptionFilter ||
    roleFilter ||
    activeFilter ||
    searchInput

  if (loading && users.length === 0) {
    return <PageLoading label={t('loading')} />
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-6">
      <AdminPageHeader
        eyebrow={`${t('title')} / ${t('users')}`}
        title={t('users')}
        actions={
          <>
            <button
              onClick={generateInvite}
              disabled={actionBusy === 'invite'}
              className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 inline-flex items-center gap-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors disabled:opacity-40"
            >
              {actionBusy === 'invite' ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <LinkIcon className="size-3.5" aria-hidden="true" />
              )}
              {t('inviteBtn')}
            </button>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 inline-flex items-center gap-2 px-3 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              {t('createUserBtn')}
            </button>
          </>
        }
      />

      <AdminNav />

      <div
        className={`border px-5 py-4 ${maintenanceMode ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-fl-border bg-fl-surface'}`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <ShieldAlert
              className={`mt-0.5 size-5 shrink-0 ${maintenanceMode ? 'text-yellow-500' : 'text-fl-muted-3'}`}
              aria-hidden="true"
            />
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
                  {t('maintenanceTitle')}
                </span>
                <span
                  className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                    maintenanceMode
                      ? 'border-yellow-500/40 text-yellow-500'
                      : 'border-fl-border text-fl-muted-3'
                  }`}
                >
                  {maintenanceMode ? t('maintenanceOn') : t('maintenanceOff')}
                </span>
              </div>
              <p className="text-fl-hint text-fl-muted-2 font-mono">
                {t('maintenanceDesc')}
              </p>
            </div>
          </div>
          <button
            onClick={toggleMaintenance}
            disabled={maintenanceLoading}
            className={`inline-flex shrink-0 items-center justify-center gap-2 px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors ${
              maintenanceMode
                ? 'bg-fl-fg text-fl-bg hover:bg-fl-fg/90'
                : 'bg-yellow-500 text-black hover:bg-yellow-500/90'
            } disabled:opacity-50`}
          >
            {maintenanceLoading && (
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            )}
            {maintenanceMode ? t('maintenanceDisable') : t('maintenanceEnable')}
          </button>
        </div>
      </div>

      {inviteUrl && (
        <div className="border-fl-border bg-fl-surface border px-5 py-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
              {t('inviteLink')}
            </p>
            <button
              onClick={copyInvite}
              className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 inline-flex items-center gap-2 border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors"
            >
              {inviteCopied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Clipboard className="size-3.5" aria-hidden="true" />
              )}
              {inviteCopied ? tCommon('copied') : t('copyLink')}
            </button>
          </div>
          <p className="text-fl-muted-1 font-mono text-xs break-all">
            {inviteUrl}
          </p>
          <p className="text-fl-hint text-fl-muted-4 mt-2 font-mono">
            {t('inviteExpiry')}
          </p>
        </div>
      )}

      {error && (
        <div className="border-fl-error/40 text-fl-error border px-4 py-3 font-mono text-xs">
          {error}
        </div>
      )}

      <div className="border-fl-border bg-fl-surface border">
        <div className="border-fl-border flex flex-wrap items-center gap-2 border-b px-5 py-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('users')}
          </span>
          {loading && (
            <Loader2
              className="text-fl-muted-3 size-3.5 animate-spin"
              aria-hidden="true"
            />
          )}
          <span className="text-fl-hint text-fl-muted-4 ml-auto font-mono tracking-widest uppercase">
            {total} {t('total')}
          </span>
        </div>

        <div className="border-fl-border grid gap-2 border-b px-5 py-3 lg:grid-cols-[minmax(14rem,1fr)_auto_auto_auto_auto]">
          <div className="flex min-w-0">
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
              className="bg-fl-bg border-fl-border text-fl-fg placeholder:text-fl-muted-4 focus:border-fl-border-2 min-w-0 flex-1 border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-fl-bg border-fl-border text-fl-muted-3 hover:text-fl-fg hover:border-fl-border-2 -ml-px inline-flex w-10 shrink-0 items-center justify-center border transition-colors"
              aria-label={t('searchAction')}
            >
              <Search className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-border-2 appearance-none border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
            aria-label={t('roleFilter')}
          >
            <option value="">{t('allRoles')}</option>
            <option value="user">{t('roleUser')}</option>
            <option value="admin">{t('roleAdmin')}</option>
          </select>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-border-2 appearance-none border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
            aria-label={t('statusFilter')}
          >
            <option value="">{t('allStatuses')}</option>
            <option value="true">{t('active')}</option>
            <option value="false">{t('inactive')}</option>
          </select>
          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="bg-fl-bg border-fl-border text-fl-fg focus:border-fl-border-2 appearance-none border px-4 py-2 font-mono text-xs transition-colors focus:outline-none"
            aria-label={t('subscriptionFilter')}
          >
            <option value="">{t('allSubscriptions')}</option>
            <option value="none">{tBilling('statusNone')}</option>
            <option value="active">{tBilling('statusActive')}</option>
            <option value="trialing">{tBilling('statusTrialing')}</option>
            <option value="past_due">{tBilling('statusPastDue')}</option>
            <option value="canceled">{tBilling('statusCanceled')}</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="border-fl-border text-fl-label text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2 inline-flex items-center justify-center gap-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <FilterX className="size-3.5" aria-hidden="true" />
            {t('clearFilters')}
          </button>
        </div>

        {users.length === 0 ? (
          <p className="text-fl-muted-2 px-6 py-10 text-center font-mono text-xs">
            {t('noUsers')}
          </p>
        ) : (
          <>
            <div className="hidden lg:block">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-fl-border border-b">
                    <th className="text-fl-label text-fl-muted-4 w-[30%] px-5 py-3 text-left font-mono tracking-widest uppercase">
                      {t('userColumn')}
                    </th>
                    <th className="text-fl-label text-fl-muted-4 w-[24%] px-5 py-3 text-left font-mono tracking-widest uppercase">
                      {t('fieldEmail')}
                    </th>
                    <th className="text-fl-label text-fl-muted-4 w-[11%] px-5 py-3 text-left font-mono tracking-widest uppercase">
                      {t('role')}
                    </th>
                    <th className="text-fl-label text-fl-muted-4 w-[12%] px-5 py-3 text-left font-mono tracking-widest uppercase">
                      {t('status')}
                    </th>
                    <th className="text-fl-label text-fl-muted-4 w-[13%] px-5 py-3 text-left font-mono tracking-widest uppercase">
                      {t('fieldSubscription')}
                    </th>
                    <th className="text-fl-label text-fl-muted-4 w-[10%] px-5 py-3 text-right font-mono tracking-widest uppercase">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-fl-border hover:bg-fl-bg/60 border-b last:border-0"
                    >
                      <td className="px-5 py-4 align-middle">
                        <p className="text-fl-fg truncate font-mono text-sm">
                          {u.display_name}
                        </p>
                        <p className="text-fl-label text-fl-muted-3 truncate font-mono">
                          #{u.id} / @{u.username.toLowerCase()} /{' '}
                          {u.native_language}
                        </p>
                      </td>
                      <td className="text-fl-muted-2 truncate px-5 py-4 align-middle font-mono text-xs">
                        {u.email || '—'}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <span
                          className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                            u.role === 'admin'
                              ? 'border-fl-fg/40 text-fl-fg'
                              : 'border-fl-border text-fl-muted-2'
                          }`}
                        >
                          {u.role === 'admin' ? t('roleAdmin') : t('roleUser')}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <span
                          className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                            u.is_active
                              ? 'border-green-500/40 text-green-400'
                              : 'border-fl-error/30 text-fl-error-fg'
                          }`}
                        >
                          {u.is_active ? t('active') : t('inactive')}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <span
                          className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${statusBadgeClass(u.subscription_status)}`}
                        >
                          {subscriptionLabel(u.subscription_status, tBilling)}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex justify-end gap-1">
                          <Link
                            href={`/admin/users/${u.id}`}
                            className="border-fl-border text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2 inline-flex size-8 items-center justify-center border transition-colors"
                            aria-label={t('viewStats')}
                          >
                            <ExternalLink
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          </Link>
                          <button
                            onClick={() => setActivePending(u)}
                            disabled={u.id === currentUserId}
                            className={`inline-flex size-8 items-center justify-center border transition-colors ${
                              u.id === currentUserId
                                ? 'cursor-not-allowed opacity-20'
                                : u.is_active
                                  ? 'border-fl-error/30 text-fl-error-fg hover:border-fl-error'
                                  : 'border-fl-border text-fl-muted-2 hover:text-fl-fg hover:border-fl-border-2'
                            }`}
                            aria-label={
                              u.is_active ? t('deactivate') : t('activate')
                            }
                            title={
                              u.id === currentUserId
                                ? t('cannotDeactivateSelf')
                                : u.is_active
                                  ? t('deactivate')
                                  : t('activate')
                            }
                          >
                            {actionBusy === `active-${u.id}` ? (
                              <Loader2
                                className="size-3.5 animate-spin"
                                aria-hidden="true"
                              />
                            ) : (
                              <ShieldAlert
                                className="size-3.5"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                          <button
                            onClick={() => setDeletePending(u)}
                            disabled={u.id === currentUserId}
                            className="border-fl-error/30 text-fl-error-fg hover:border-fl-error hover:text-fl-error inline-flex size-8 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-20"
                            aria-label={t('delete')}
                            title={
                              u.id === currentUserId
                                ? t('cannotDeleteSelf')
                                : t('delete')
                            }
                          >
                            {actionBusy === `delete-${u.id}` ? (
                              <Loader2
                                className="size-3.5 animate-spin"
                                aria-hidden="true"
                              />
                            ) : (
                              <span className="text-xs leading-none">X</span>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">
              {users.map((u, i) => (
                <div
                  key={u.id}
                  className={`space-y-3 px-4 py-4 ${i < users.length - 1 ? 'border-fl-border border-b' : ''}`}
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
                      <span
                        className={`text-fl-hint border px-2 py-0.5 font-mono tracking-widest uppercase ${
                          u.is_active
                            ? 'border-green-500/40 text-green-400'
                            : 'border-fl-error/30 text-fl-error-fg'
                        }`}
                      >
                        {u.is_active ? t('active') : t('inactive')}
                      </span>
                    </div>
                    <p className="text-fl-label text-fl-muted-2 font-mono break-all">
                      <span className="text-fl-muted-4">#{u.id}</span> /{' '}
                      {u.username.toLowerCase()} {u.email ? `/ ${u.email}` : ''}{' '}
                      / {u.native_language}
                    </p>
                    <span
                      className={`text-fl-hint inline-flex border px-2 py-0.5 font-mono tracking-widest uppercase ${statusBadgeClass(u.subscription_status)}`}
                    >
                      {subscriptionLabel(u.subscription_status, tBilling)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 inline-flex items-center gap-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
                    >
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                      {t('viewStats')}
                    </Link>
                    <button
                      onClick={() => setActivePending(u)}
                      disabled={u.id === currentUserId}
                      className={`text-fl-label inline-flex items-center gap-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors ${
                        u.id === currentUserId
                          ? 'cursor-not-allowed opacity-20'
                          : u.is_active
                            ? 'border-fl-error/30 text-fl-error-fg hover:border-fl-error'
                            : 'border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2'
                      }`}
                    >
                      {actionBusy === `active-${u.id}` && (
                        <Loader2
                          className="size-3.5 animate-spin"
                          aria-hidden="true"
                        />
                      )}
                      {u.is_active ? t('deactivate') : t('activate')}
                    </button>
                    <button
                      onClick={() => setDeletePending(u)}
                      disabled={u.id === currentUserId}
                      className="border-fl-error/30 text-fl-label text-fl-error-fg hover:border-fl-error hover:text-fl-error inline-flex items-center gap-2 border px-3 py-2 font-mono tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      {actionBusy === `delete-${u.id}` && (
                        <Loader2
                          className="size-3.5 animate-spin"
                          aria-hidden="true"
                        />
                      )}
                      {t('delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={Math.ceil(total / PAGE_SIZE)}
        loading={loading}
        onPageChange={setPage}
        prevLabel={t('prevPage')}
        nextLabel={t('nextPage')}
      />

      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent
          className="border-fl-border bg-fl-surface w-full overflow-y-auto sm:max-w-md"
          showCloseButton={false}
        >
          <SheetHeader className="border-fl-border border-b px-6 py-5">
            <div className="flex items-center gap-2">
              <UserPlus className="text-fl-muted-2 size-4" aria-hidden="true" />
              <SheetTitle className="text-fl-fg font-mono text-sm tracking-widest uppercase">
                {t('createUser')}
              </SheetTitle>
            </div>
            <SheetDescription className="text-fl-muted-2 font-mono text-xs">
              {t('createUserSheetDesc')}
            </SheetDescription>
          </SheetHeader>

          <form
            id="admin-create-user-form"
            onSubmit={createUser}
            className="space-y-4 px-6 py-5"
          >
            {[
              {
                key: 'username',
                label: t('fieldUsername'),
                required: true,
                type: 'text',
              },
              {
                key: 'email',
                label: t('fieldEmail'),
                required: false,
                type: 'email',
              },
              {
                key: 'password',
                label: t('fieldPassword'),
                required: true,
                type: 'password',
              },
              {
                key: 'display_name',
                label: t('fieldDisplayName'),
                required: true,
                type: 'text',
              },
            ].map(({ key, label, required, type }) => (
              <label key={key} className="block">
                <span className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                  {label}
                </span>
                <input
                  type={type}
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
              </label>
            ))}
            <label className="block">
              <span className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldNativeLanguage')}
              </span>
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
            </label>
            <label className="block">
              <span className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldTargetLanguage')}
              </span>
              <select
                value={form.target_language}
                onChange={(e) =>
                  setForm({ ...form, target_language: e.target.value })
                }
                className={inputCls + ' appearance-none'}
              >
                {visibleTargetLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {tTarget(lang.code)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-fl-label text-fl-muted-3 mb-1 block font-mono text-xs tracking-widest uppercase">
                {t('fieldRole')}
              </span>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputCls + ' appearance-none'}
              >
                <option value="user">{t('roleUser')}</option>
                <option value="admin">{t('roleAdmin')}</option>
              </select>
            </label>
          </form>

          <SheetFooter className="border-fl-border border-t px-6 py-5">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="border-fl-border text-fl-label text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg border py-3 font-mono font-bold tracking-widest uppercase transition-colors"
            >
              {tCommon('cancel')}
            </button>
            <button
              type="submit"
              form="admin-create-user-form"
              disabled={createSaving}
              className="bg-fl-accent text-fl-accent-fg hover:bg-fl-accent/90 inline-flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50"
            >
              {createSaving && (
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              )}
              {t('submitCreate')}
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={activePending !== null}
        title={
          activePending?.is_active ? t('deactivateUser') : t('activateUser')
        }
        message={
          activePending?.is_active
            ? t('deactivateUserMessage')
            : t('activateUserMessage')
        }
        confirmLabel={
          activePending?.is_active ? t('deactivate') : t('activate')
        }
        danger={activePending?.is_active}
        onConfirm={() => activePending && toggleActive(activePending)}
        onCancel={() => setActivePending(null)}
      />

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

function subscriptionLabel(
  status: string,
  tBilling: (
    key:
      | 'statusActive'
      | 'statusTrialing'
      | 'statusPastDue'
      | 'statusCanceled'
      | 'statusNone'
  ) => string
) {
  switch (status) {
    case 'active':
      return tBilling('statusActive')
    case 'trialing':
      return tBilling('statusTrialing')
    case 'past_due':
      return tBilling('statusPastDue')
    case 'canceled':
      return tBilling('statusCanceled')
    default:
      return tBilling('statusNone')
  }
}
