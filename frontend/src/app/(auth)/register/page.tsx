'use client'

import { Suspense, useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
]

function RegisterForm() {
  const t = useTranslations('auth.register')
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
        setError(t('passwordMismatch'))
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
          throw new Error(data.detail || t('error'))
        }
        router.push('/login?registered=true')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t('error'))
      } finally {
        setLoading(false)
      }
    },
    [username, email, password, confirmPassword, displayName, nativeLanguage, invite, router, t]
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
            <span className="font-mono text-xs tracking-widest text-fl-muted-2 uppercase">{t('title')}</span>
            {invite && <span className="ml-auto font-mono text-fl-hint text-fl-muted-1 uppercase tracking-widest">{t('inviteActive')}</span>}
          </div>

          {error && (
            <div className="mb-5 border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error tracking-wide">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: t('username'), value: username, onChange: setUsername, type: 'text', required: true },
              { label: t('displayName'), value: displayName, onChange: setDisplayName, type: 'text', required: false, placeholder: t('displayNamePlaceholder') },
              { label: t('email'), value: email, onChange: setEmail, type: 'email', required: true },
              { label: t('password'), value: password, onChange: setPassword, type: 'password', required: true },
              { label: t('confirmPassword'), value: confirmPassword, onChange: setConfirmPassword, type: 'password', required: true },
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
              <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('nativeLanguage')}</label>
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
              className="w-full mt-2 bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
            >
              {loading ? `— ${t('creatingAccount')}` : `— ${t('submit')}`}
            </button>
          </form>

          <p className="mt-6 font-mono text-fl-label text-fl-muted-2 tracking-wide text-center">
            {t('hasAccount')}{' '}
            <a href="/login" className="text-fl-muted-1 hover:text-fl-fg transition-colors">{t('login')}</a>
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
