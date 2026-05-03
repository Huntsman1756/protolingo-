'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/theme'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
]

export default function SettingsPage() {
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('es')
  const [englishVariant, setEnglishVariant] = useState<'american' | 'british'>('american')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  const [convMaxDuration, setConvMaxDuration] = useState<900 | 1800>(1800)
  const [convInactivityTimeout, setConvInactivityTimeout] = useState<60 | 180 | 300>(180)
  const [convMessage, setConvMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [savingConv, setSavingConv] = useState(false)

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setEmail(user.email || '')
      setNativeLanguage(user.native_language || 'es')
      setEnglishVariant((user.english_variant as 'american' | 'british') || 'american')
      setConvMaxDuration((user.conversation_max_duration as 900 | 1800) || 1800)
      setConvInactivityTimeout((user.conversation_inactivity_timeout as 60 | 180 | 300) || 180)
    }
  }, [user])

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    if (password && password !== confirmPassword) {
      setMessage({ type: 'err', text: t('passwordMismatch') })
      setSaving(false)
      return
    }
    try {
      const res = await apiFetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName,
          email: email || null,
          native_language: nativeLanguage,
          english_variant: englishVariant,
          ...(password ? { password } : {}),
        }),
      })
      if (!res.ok) throw new Error(t('saveFailed'))
      const updated = await res.json()
      setUser({ id: updated.id, username: updated.username, displayName: updated.display_name, email: updated.email, role: updated.role, native_language: updated.native_language, english_variant: updated.english_variant, conversation_max_duration: updated.conversation_max_duration, conversation_inactivity_timeout: updated.conversation_inactivity_timeout })
      setMessage({ type: 'ok', text: t('saved') })
      setPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      setMessage({ type: 'err', text: err instanceof Error ? err.message : t('saveFailed') })
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveConversation() {
    setSavingConv(true)
    setConvMessage(null)
    try {
      const res = await apiFetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_max_duration: convMaxDuration,
          conversation_inactivity_timeout: convInactivityTimeout,
        }),
      })
      if (!res.ok) throw new Error(t('saveFailed'))
      const updated = await res.json()
      setUser({ id: updated.id, username: updated.username, displayName: updated.display_name, email: updated.email, role: updated.role, native_language: updated.native_language, english_variant: updated.english_variant, conversation_max_duration: updated.conversation_max_duration, conversation_inactivity_timeout: updated.conversation_inactivity_timeout })
      setConvMessage({ type: 'ok', text: t('conversationSaved') })
    } catch (err: unknown) {
      setConvMessage({ type: 'err', text: err instanceof Error ? err.message : t('saveFailed') })
    } finally {
      setSavingConv(false)
    }
  }

  async function handleLogout() {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/login')
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-fl-border">
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-1">{t('sectionAccount')}</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-fl-fg">{t('title')}</h1>
      </div>

      <div className="border border-fl-border bg-fl-surface p-6 space-y-5 mb-4">
        <div className="flex items-center gap-2 pb-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionProfile')}</span>
        </div>

        {[
          { label: t('displayName'), value: displayName, onChange: setDisplayName, type: 'text' },
          { label: t('email'), value: email, onChange: setEmail, type: 'email' },
        ].map((field) => (
          <div key={field.label}>
            <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              autoCorrect={field.type === 'email' ? 'off' : undefined}
              autoCapitalize={field.type === 'email' ? 'none' : undefined}
              spellCheck={field.type === 'email' ? false : undefined}
              className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg focus:outline-none focus:border-fl-border-2 transition-colors"
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

        <div>
          <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('englishVariant')}</label>
          <div className="flex gap-2">
            {(['american', 'british'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setEnglishVariant(v)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs tracking-widest uppercase border transition-colors ${englishVariant === v
                  ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
                  : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
              >
                <Image
                  src={v === 'american' ? '/flags/eeuu.jpg' : '/flags/uk.jpg'}
                  alt={v === 'american' ? 'US flag' : 'UK flag'}
                  width={20}
                  height={16}
                  className="object-cover"
                />
                {v === 'american' ? t('american') : t('british')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('newPassword')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('newPasswordPlaceholder')}
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">{t('confirmPassword')}</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('confirmPasswordPlaceholder')}
            disabled={!password}
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="w-full bg-fl-bg border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg placeholder:text-fl-muted-4 focus:outline-none focus:border-fl-border-2 disabled:opacity-30 transition-colors"
          />
        </div>

        {message && (
          <div className={`font-mono text-xs px-4 py-3 border ${message.type === 'ok' ? 'border-fl-border text-fl-muted-1' : 'border-fl-error/40 text-fl-error'}`}>
            {message.type === 'ok' ? '✓ ' : '✕ '}{message.text}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
        >
          {saving ? `— ${t('saving')}` : `— ${t('saveChanges')}`}
        </button>
      </div>

      {/* Conversation */}
      <div className="border border-fl-border bg-fl-surface p-6 mt-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionConversation')}</span>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">
              {t('conversationMaxDuration')}
            </label>
            <div className="flex gap-2">
              {([900, 1800] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setConvMaxDuration(val)}
                  className={`flex-1 py-3 font-mono text-xs tracking-widest uppercase border transition-colors ${convMaxDuration === val
                    ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
                    : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {val === 900 ? t('min15') : t('min30')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-2">
              {t('conversationInactivityTimeout')}
            </label>
            <div className="flex gap-2">
              {([60, 180, 300] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setConvInactivityTimeout(val)}
                  className={`flex-1 py-3 font-mono text-xs tracking-widest uppercase border transition-colors ${convInactivityTimeout === val
                    ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
                    : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {val === 60 ? t('min1') : val === 180 ? t('min3') : t('min5')}
                </button>
              ))}
            </div>
          </div>

          {convMessage && (
            <div className={`font-mono text-xs px-4 py-3 border ${convMessage.type === 'ok' ? 'border-fl-border text-fl-muted-1' : 'border-fl-error/40 text-fl-error'}`}>
              {convMessage.type === 'ok' ? '✓ ' : '✕ '}{convMessage.text}
            </div>
          )}

          <button
            onClick={handleSaveConversation}
            disabled={savingConv}
            className="w-full bg-fl-accent text-fl-accent-fg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-accent/90 disabled:opacity-40 transition-colors"
          >
            {savingConv ? `— ${t('saving')}` : `— ${t('saveConversation')}`}
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="border border-fl-border bg-fl-surface p-6 mt-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionAppearance')}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-fl-fg tracking-wide">{t('theme')}</p>
            <p className="font-mono text-fl-label text-fl-muted-2 mt-0.5">
              {theme === 'dark' ? t('darkActive') : theme === 'light' ? t('lightActive') : t('systemActive')}
            </p>
          </div>
          <div className="flex gap-1">
            {(['system', 'dark', 'light'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setTheme(opt)}
                className={`border px-3 py-2 font-mono text-fl-label tracking-widest uppercase transition-colors ${theme === opt
                  ? 'border-fl-border-2 text-fl-fg bg-fl-surface-2'
                  : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                  }`}
              >
                {opt === 'system' ? t('themeSystem') : opt === 'dark' ? t('themeDark') : t('themeLight')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="border border-fl-border bg-fl-surface p-6 mt-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionAuthor')}</span>
        </div>
        <p className="font-mono text-sm text-fl-fg">{t('authorDescription')}</p>
        <a
          href="https://github.com/artcc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 font-mono text-xs text-fl-muted-2 hover:text-fl-fg hover:underline transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {t('githubProfile')}
        </a>
      </div>

      <button
        onClick={handleLogout}
        className="w-full font-mono text-fl-label tracking-widest text-fl-muted-2 border border-fl-border py-3 mt-4 uppercase hover:text-fl-error hover:border-fl-error/40 transition-colors"
      >
        — {tCommon('logout')}
      </button>
    </div>
  )
}
