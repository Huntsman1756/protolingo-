'use client'

import { Suspense, useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

const LANGUAGES = ['es', 'fr', 'pt', 'de', 'it', 'pl', 'nl', 'ro', 'ru'] as const

function RegisterForm() {
  const t = useTranslations('auth.register')
  const tLang = useTranslations('languages')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite')
  const setTokens = useAuthStore((s) => s.setTokens)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('es')
  const [termsAccepted, setTermsAccepted] = useState(false)
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
      if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,25}$/.test(password)) {
        setError(t('invalidPassword'))
        return
      }
      if (!termsAccepted) {
        setError(t('termsRequired'))
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
          const data = await res.json().catch(() => ({}))
          let msg = t('error')
          if (typeof data.detail === 'string') {
            if (data.detail === 'Username already taken') msg = t('usernameTaken')
            else if (data.detail === 'Email already taken') msg = t('emailTaken')
            else if (data.detail === 'Registration is closed') msg = t('registrationClosed')
            else if (data.detail === 'Invalid or expired invite') msg = t('invalidInvite')
            else if (data.detail === 'Email domain not allowed') msg = t('invalidEmail')
          } else if (Array.isArray(data.detail) && data.detail.length > 0) {
            const first = data.detail[0] as { loc?: string[]; msg?: string }
            const loc = (first.loc ?? []).join('.')
            if (loc.includes('email') || first.msg?.toLowerCase().includes('email')) {
              msg = t('invalidEmail')
            } else if (loc.includes('password')) {
              msg = t('invalidPassword')
            }
          }
          throw new Error(msg)
        }
        const data = await res.json()
        setTokens(data.access_token)
        router.push('/onboarding')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t('error'))
      } finally {
        setLoading(false)
      }
    },
    [username, email, password, confirmPassword, displayName, nativeLanguage, termsAccepted, invite, router, t, setTokens]
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-fl-bg px-4"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Image src="/logo.png" alt="FreeLingo" width={80} height={80} className="mb-4" />
          <h1 className="font-mono text-xl font-bold tracking-widest text-fl-fg uppercase">FreeLingo</h1>
          <p className="font-mono text-fl-caption text-fl-muted-2 tracking-widest uppercase mt-1">{tCommon('tagline')}</p>
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
                  autoCorrect={field.type === 'email' || field.type === 'password' ? 'off' : undefined}
                  autoCapitalize={field.type === 'email' || field.type === 'password' ? 'none' : undefined}
                  spellCheck={field.type === 'email' || field.type === 'password' ? false : undefined}
                  className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
                />
              </div>
            ))}

            {/* Legal acceptance */}
            <div className="flex items-start gap-3 py-1">
              <input
                id="terms-accept"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 flex-shrink-0 w-4 h-4 accent-fl-accent cursor-pointer"
              />
              <label htmlFor="terms-accept" className="font-mono text-xs text-fl-muted-2 leading-relaxed cursor-pointer select-none">
                {t('termsAccept')}{' '}
                <a href="/terms?from=register" className="text-fl-muted-1 hover:text-fl-fg underline underline-offset-2 transition-colors">{t('termsLink')}</a>
                {' '}{t('andWord')}{' '}
                <a href="/privacy?from=register" className="text-fl-muted-1 hover:text-fl-fg underline underline-offset-2 transition-colors">{t('privacyLink')}</a>
              </label>
            </div>

            <div>
              <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('nativeLanguage')}</label>
              <select
                value={nativeLanguage}
                onChange={(e) => setNativeLanguage(e.target.value)}
                className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg focus:outline-none focus:border-fl-border-2 transition-colors appearance-none"
              >
                {[...LANGUAGES].sort((a, b) => tLang(a).localeCompare(tLang(b))).map((code) => (
                  <option key={code} value={code}>{tLang(code)}</option>
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
