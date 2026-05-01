'use client'

import { Suspense, useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { apiFetch } from '@/lib/api'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
]

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('es')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      setLoading(true)
      try {
        const body: Record<string, string | null> = {
          username,
          email,
          password,
          display_name: displayName || username,
          native_language: nativeLanguage,
        }
        if (invite) body.invite_token = invite

        const res = await apiFetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.detail || 'Registration failed')
        }
        router.push('/login?registered=true')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Registration failed')
      } finally {
        setLoading(false)
      }
    },
    [username, email, password, confirmPassword, displayName, nativeLanguage, invite, router]
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Image src="/logo.png" alt="FreeLingo" width={80} height={80} className="mb-4" />
          <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
          <p className="font-mono text-fl-caption text-fl-muted-2 tracking-widest uppercase mt-1">self-hosted language learning</p>
        </div>

        <div className="border border-fl-border bg-fl-surface p-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-fl-border">
            <span className="text-fl-label text-fl-muted-2">●</span>
            <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">Register</span>
            {invite && <span className="ml-auto font-mono text-fl-hint text-fl-muted-1 uppercase tracking-widest">Invite active</span>}
          </div>

          {error && (
            <div className="mb-5 border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error tracking-wide">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Username', value: username, onChange: setUsername, type: 'text', required: true },
              { label: 'Display Name', value: displayName, onChange: setDisplayName, type: 'text', required: false, placeholder: 'Same as username if empty' },
              { label: 'Email', value: email, onChange: setEmail, type: 'email', required: true },
              { label: 'Password', value: password, onChange: setPassword, type: 'password', required: true },
              { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword, type: 'password', required: true },
            ].map((field) => (
              <div key={field.label}>
                <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required={field.required}
                  placeholder={'placeholder' in field ? field.placeholder : undefined}
                  className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">Native Language</label>
              <select
                value={nativeLanguage}
                onChange={(e) => setNativeLanguage(e.target.value)}
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg focus:outline-none focus:border-fl-border-2 transition-colors appearance-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright disabled:opacity-40 transition-colors"
            >
              {loading ? '— CREATING...' : '— CREATE ACCOUNT'}
            </button>
          </form>

          <p className="mt-6 font-mono text-fl-label text-fl-muted-2 tracking-wide text-center">
            Have an account?{' '}
            <a href="/login" className="text-fl-muted-1 hover:text-fl-fg transition-colors">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
