'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

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
  const [users, setUsers] = useState<AdminUserItem[]>([])
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

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/api/admin/users')
      if (res.ok) {
        setUsers(await res.json())
      } else if (res.status === 403) {
        setError('Admin access required')
      }
    } catch {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadUsers() }, [loadUsers])

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
      await loadUsers()
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
    await loadUsers()
  }

  async function deleteUser(user: AdminUserItem) {
    if (!confirm(`Delete user "${user.username}"? This cannot be undone.`)) return
    const res = await apiFetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.detail || 'Failed to delete user')
    } else {
      await loadUsers()
    }
  }

  async function generateInvite() {
    const res = await apiFetch('/api/admin/invite', { method: 'POST' })
    const data = await res.json()
    setInviteUrl(`${window.location.origin}${data.invite_url}`)
  }

  const inputCls = 'w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-xs text-[#f5f5f5] placeholder:text-[#555] focus:outline-none focus:border-[#444] transition-colors'

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-[#777] tracking-widest uppercase animate-pulse">Loading users…</span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#777]">●</span>
          <span className="font-mono text-xs tracking-widest text-[#888] uppercase">Admin / Users</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={generateInvite}
            className="border border-[#2a2a2a] px-4 py-2 font-mono text-[10px] tracking-widest text-[#888] uppercase hover:text-[#f5f5f5] hover:border-[#444] transition-colors"
          >
            + Invite Link
          </button>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className={`border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${showCreate
              ? 'border-[#444] text-[#f5f5f5]'
              : 'border-[#2a2a2a] text-[#888] hover:text-[#f5f5f5] hover:border-[#444]'
              }`}
          >
            + Create User
          </button>
        </div>
      </div>

      {/* Invite URL banner */}
      {inviteUrl && (
        <div className="border border-[#2a2a2a] bg-[#111] px-5 py-4">
          <p className="font-mono text-[10px] tracking-widest text-[#777] uppercase mb-2">Invite Link (valid 48h)</p>
          <p className="font-mono text-xs text-[#888] break-all">{inviteUrl}</p>
        </div>
      )}

      {/* Create user form */}
      {showCreate && (
        <div className="border border-[#2a2a2a] bg-[#111]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
            <span className="text-[10px] text-[#777]">●</span>
            <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Create User</span>
          </div>
          {error && (
            <div className="mx-6 mt-4 border border-[#ff3b3b]/40 px-4 py-3 font-mono text-xs text-[#ff3b3b]">✕ {error}</div>
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
              className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white transition-colors mt-1"
            >
              — Create
            </button>
          </form>
        </div>
      )}

      {/* User list */}
      <div className="border border-[#2a2a2a] bg-[#111]">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
          <span className="text-[10px] text-[#777]">●</span>
          <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">Users</span>
          <span className="ml-auto font-mono text-[9px] text-[#555] uppercase tracking-widest">{users.length} total</span>
        </div>
        {users.length === 0 ? (
          <p className="px-6 py-8 font-mono text-xs text-[#777] text-center">No users found</p>
        ) : (
          <div>
            {users.map((u, i) => (
              <div
                key={u.id}
                className={`flex items-center justify-between px-6 py-4 ${i < users.length - 1 ? 'border-b border-[#2a2a2a]' : ''}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[#f5f5f5]">{u.display_name}</span>
                    <span className={`font-mono text-[9px] tracking-widest uppercase border px-2 py-0.5 ${u.role === 'admin' ? 'border-[#f5f5f5]/40 text-[#f5f5f5]' : 'border-[#2a2a2a] text-[#777]'
                      }`}>{u.role}</span>
                    {!u.is_active && (
                      <span className="font-mono text-[9px] tracking-widest uppercase border border-[#ff3b3b]/30 text-[#ff6b6b] px-2 py-0.5">inactive</span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-[#777]">
                    {u.username} {u.email ? `· ${u.email}` : ''} · {u.native_language}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(u)}
                    className={`border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${u.is_active
                      ? 'border-[#ff3b3b]/30 text-[#ff6b6b] hover:border-[#ff3b3b]'
                      : 'border-[#2a2a2a] text-[#888] hover:text-[#f5f5f5] hover:border-[#444]'
                      }`}
                  >
                    {u.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteUser(u)}
                    className="border border-[#ff3b3b]/30 px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-[#ff6b6b] hover:border-[#ff3b3b] hover:text-[#ff4444] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
