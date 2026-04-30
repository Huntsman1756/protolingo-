'use client'

import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
]

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('es')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setEmail(user.email || '')
      setNativeLanguage(user.native_language || 'es')
    }
  }, [user])

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      const res = await apiFetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName,
          email: email || null,
          native_language: nativeLanguage,
          ...(password ? { password } : {}),
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      const updated = await res.json()
      setUser({ id: updated.id, username: updated.username, displayName: updated.display_name, role: updated.role, native_language: updated.native_language })
      setMessage({ type: 'ok', text: 'Profile updated.' })
      setPassword('')
    } catch (err: unknown) {
      setMessage({ type: 'err', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/login')
  }

  return (
    <div className="p-6 max-w-lg">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#2a2a2a]">
        <p className="font-mono text-[10px] tracking-widest text-[#555] uppercase mb-1">Account</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-[#f5f5f5]">Settings</h1>
      </div>

      <div className="border border-[#2a2a2a] bg-[#111] p-6 space-y-5 mb-4">
        <div className="flex items-center gap-2 pb-4 border-b border-[#2a2a2a]">
          <span className="text-[10px] text-[#555]">●</span>
          <span className="font-mono text-[10px] tracking-widest text-[#555] uppercase">Profile</span>
        </div>

        {[
          { label: 'Display Name', value: displayName, onChange: setDisplayName, type: 'text' },
          { label: 'Email', value: email, onChange: setEmail, type: 'email' },
        ].map((field) => (
          <div key={field.label}>
            <label className="block font-mono text-[10px] tracking-widest text-[#555] uppercase mb-2">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#555] transition-colors"
            />
          </div>
        ))}

        <div>
          <label className="block font-mono text-[10px] tracking-widest text-[#555] uppercase mb-2">Native Language</label>
          <select
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#555] transition-colors appearance-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-[10px] tracking-widest text-[#555] uppercase mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave empty to keep"
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] placeholder:text-[#333] focus:outline-none focus:border-[#555] transition-colors"
          />
        </div>

        {message && (
          <div className={`font-mono text-xs px-4 py-3 border ${message.type === 'ok' ? 'border-[#2a2a2a] text-[#888]' : 'border-[#ff3b3b]/40 text-[#ff3b3b]'}`}>
            {message.type === 'ok' ? '✓ ' : '✕ '}{message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white disabled:opacity-40 transition-colors"
        >
          {saving ? '— SAVING...' : '— SAVE CHANGES'}
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="w-full font-mono text-[10px] tracking-widest text-[#555] border border-[#2a2a2a] py-3 uppercase hover:text-[#ff3b3b] hover:border-[#ff3b3b]/40 transition-colors"
      >
        — LOGOUT
      </button>
    </div>
  )
}
