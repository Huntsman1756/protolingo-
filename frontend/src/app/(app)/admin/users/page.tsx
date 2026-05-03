'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface AdminUserItem {
  id: number
  username: string
  email: string | null
  display_name: string
  role: string
  native_language: string
  is_active: boolean
}

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
]

export default function AdminUsersPage() {
  const t = useTranslations('admin')
  const [users, setUsers] = useState<AdminUserItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 20
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [inviteUrl, setInviteUrl] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    display_name: '',
    native_language: 'es',
    role: 'user',
  })
  const [error, setError] = useState('')
  const [deletePending, setDeletePending] = useState<AdminUserItem | null>(null)
  const currentUserId = useAuthStore((s) => s.user?.id)

  const loadUsers = useCallback(async (pageIndex = 0) => {
    setLoading(true)
    try {
      const res = await apiFetch(`/api/admin/users?skip=${pageIndex * PAGE_SIZE}&limit=${PAGE_SIZE}`)
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
  }, [])

  useEffect(() => { loadUsers(page) }, [loadUsers, page])

  async function createUser(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await apiFetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).detail)
      setShowCreate(false)
      setForm({ username: '', email: '', password: '', display_name: '', native_language: 'es', role: 'user' })
      await loadUsers(page)
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
    await loadUsers(page)
  }

  async function deleteUser(user: AdminUserItem) {
    const res = await apiFetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
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
        await loadUsers(targetPage)
      }
    }
  }

  async function generateInvite() {
    const res = await apiFetch('/api/admin/invite', { method: 'POST' })
    const data = await res.json()
    setInviteUrl(`${window.location.origin}${data.invite_url}`)
  }

  const inputCls = 'w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-xs text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors'

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">{t('loading')}</span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-xs tracking-widest text-fl-muted-1 uppercase">{t('title')} / {t('users')}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={generateInvite}
            className="border border-fl-border px-4 py-2 font-mono text-fl-label tracking-widest text-fl-muted-1 uppercase hover:text-fl-fg hover:border-fl-border-2 transition-colors"
          >
            {t('inviteBtn')}
          </button>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className={`border px-4 py-2 font-mono text-fl-label tracking-widest uppercase transition-colors ${showCreate
              ? 'border-fl-border-2 text-fl-fg'
              : 'border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2'
              }`}
          >
            {showCreate ? `- ${t('createUser')}` : t('createUserBtn')}
          </button>
        </div>
      </div>

      {/* Invite URL banner */}
      {inviteUrl && (
        <div className="border border-fl-border bg-fl-surface px-5 py-4">
          <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('inviteLink')}</p>
          <p className="font-mono text-xs text-fl-muted-1 break-all">{inviteUrl}</p>
        </div>
      )}

      {/* Create user form */}
      {showCreate && (
        <div className="border border-fl-border bg-fl-surface">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('createUser')}</span>
          </div>
          {error && (
            <div className="mx-6 mt-4 border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">✕ {error}</div>
          )}
          <form onSubmit={createUser} className="p-6 space-y-3">
            {[
              { key: 'username', placeholder: 'Username', required: true, type: 'text' },
              { key: 'email', placeholder: 'Email (optional)', required: false, type: 'email' },
              { key: 'password', placeholder: 'Password', required: true, type: 'password' },
              { key: 'display_name', placeholder: 'Display Name', required: true, type: 'text' },
            ].map(({ key, placeholder, required, type }) => (
              <input
                key={key}
                type={type}
                placeholder={placeholder}
                required={required}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputCls}
              />
            ))}
            <select
              value={form.native_language}
              onChange={(e) => setForm({ ...form, native_language: e.target.value })}
              className={inputCls + ' appearance-none'}
            >
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputCls + ' appearance-none'}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 transition-colors mt-1"
            >
              — Create
            </button>
          </form>
        </div>
      )}

      {/* User list */}
      <div className="border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('users')}</span>
          <span className="ml-auto font-mono text-fl-hint text-fl-muted-4 uppercase tracking-widest">{total} {t('total')}</span>
        </div>
        {users.length === 0 ? (
          <p className="px-6 py-8 font-mono text-xs text-fl-muted-2 text-center">{t('noUsers')}</p>
        ) : (
          <div>
            {users.map((u, i) => (
              <div
                key={u.id}
                className={`flex items-center justify-between px-6 py-4 ${i < users.length - 1 ? 'border-b border-fl-border' : ''}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-fl-fg">{u.display_name}</span>
                    <span className={`font-mono text-fl-hint tracking-widest uppercase border px-2 py-0.5 ${u.role === 'admin' ? 'border-fl-fg/40 text-fl-fg' : 'border-fl-border text-fl-muted-2'
                      }`}>{u.role}</span>
                    {!u.is_active && (
                      <span className="font-mono text-fl-hint tracking-widest uppercase border border-fl-error/30 text-fl-error-fg px-2 py-0.5">inactive</span>
                    )}
                  </div>
                  <p className="font-mono text-fl-label text-fl-muted-2">
                    {u.username} {u.email ? `· ${u.email}` : ''} · {u.native_language}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(u)}
                    className={`border px-4 py-2 font-mono text-fl-label tracking-widest uppercase transition-colors ${u.is_active
                      ? 'border-fl-error/30 text-fl-error-fg hover:border-fl-error'
                      : 'border-fl-border text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2'
                      }`}
                  >
                    {u.is_active ? t('deactivate') : t('activate')}
                  </button>
                  <button
                    onClick={() => setDeletePending(u)}
                    disabled={u.id === currentUserId}
                    className="border border-fl-error/30 px-4 py-2 font-mono text-fl-label tracking-widest uppercase text-fl-error-fg hover:border-fl-error hover:text-fl-error transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    title={u.id === currentUserId ? 'Cannot delete your own account' : 'Delete user'}
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
        <div className="flex items-center justify-between border border-fl-border bg-fl-surface px-6 py-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="border border-fl-border px-4 py-2 font-mono text-fl-label tracking-widest uppercase text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {t('prevPage')}
          </button>
          <span className="font-mono text-fl-label text-fl-muted-2 tracking-widest">
            {page + 1} / {Math.ceil(total / PAGE_SIZE)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * PAGE_SIZE >= total}
            className="border border-fl-border px-4 py-2 font-mono text-fl-label tracking-widest uppercase text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
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
