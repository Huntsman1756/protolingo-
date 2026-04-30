'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AdminUserItem {
  id: number
  username: string
  email: string | null
  display_name: string
  role: string
  native_language: string
  is_active: boolean
}

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

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

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
      setForm({
        username: '',
        email: '',
        password: '',
        display_name: '',
        native_language: 'es',
        role: 'user',
      })
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

  async function generateInvite() {
    const res = await apiFetch('/api/admin/invite', { method: 'POST' })
    const data = await res.json()
    setInviteUrl(`${window.location.origin}${data.invite_url}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateInvite}>
            Generate Invite
          </Button>
          <Button onClick={() => setShowCreate(!showCreate)}>
            Create User
          </Button>
        </div>
      </div>

      {inviteUrl && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Invite Link (valid 48h):</p>
            <p className="text-xs text-blue-600 break-all">{inviteUrl}</p>
          </CardContent>
        </Card>
      )}

      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={createUser} className="space-y-3">
              <Input
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <Input
                placeholder="Display Name"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                required
              />
              <select
                value={form.native_language}
                onChange={(e) =>
                  setForm({ ...form, native_language: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
              </select>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">
                  {u.display_name}{' '}
                  <span className="text-xs rounded bg-zinc-200 px-1.5 py-0.5 dark:bg-zinc-700">
                    {u.role}
                  </span>
                </p>
                <p className="text-sm text-zinc-500">
                  {u.username} · {u.native_language}
                </p>
              </div>
              <Button
                variant={u.is_active ? 'destructive' : 'default'}
                size="sm"
                onClick={() => toggleActive(u)}
              >
                {u.is_active ? 'Deactivate' : 'Activate'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
