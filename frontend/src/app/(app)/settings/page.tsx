'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/theme'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

const LANGUAGES = ['es', 'fr', 'pt', 'de', 'it'] as const

export default function SettingsPage() {
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')
  const tLang = useTranslations('languages')
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('es')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  const [convMaxDuration, setConvMaxDuration] = useState<900 | 1800>(1800)
  const [convInactivityTimeout, setConvInactivityTimeout] = useState<60 | 180 | 300>(180)
  const [convMessage, setConvMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [savingConv, setSavingConv] = useState(false)

  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState<string | null>(null)

  function resizeImage(file: File, maxPx: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        let { width, height } = img
        if (width > maxPx || height > maxPx) {
          if (width > height) { height = Math.round((height * maxPx) / width); width = maxPx }
          else { width = Math.round((width * maxPx) / height); height = maxPx }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width; canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error()), file.type, 0.9)
      }
      img.onerror = reject
      img.src = url
    })
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setAvatarError(t('avatarTypeError'))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError(t('avatarSizeError'))
      return
    }
    setAvatarUploading(true)
    setAvatarError(null)
    try {
      const blob = await resizeImage(file, 1024)
      const form = new FormData()
      form.append('file', blob, file.name)
      const res = await apiFetch('/api/auth/me/avatar', { method: 'POST', body: form })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setUser({ ...user!, avatar: updated.avatar })
    } catch {
      setAvatarError(t('avatarTypeError'))
    } finally {
      setAvatarUploading(false)
    }
  }

  async function handleAvatarRemove() {
    setAvatarUploading(true)
    setAvatarError(null)
    try {
      const res = await apiFetch('/api/auth/me/avatar', { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setUser({ ...user!, avatar: null })
    } catch {
      setAvatarError(t('avatarTypeError'))
    } finally {
      setAvatarUploading(false)
    }
  }

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setEmail(user.email || '')
      setNativeLanguage(user.native_language || 'es')
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
          ...(password ? { password } : {}),
        }),
      })
      if (!res.ok) throw new Error(t('saveFailed'))
      const updated = await res.json()
      setUser({ id: updated.id, username: updated.username, displayName: updated.display_name, email: updated.email, role: updated.role, native_language: updated.native_language, target_language: updated.target_language, conversation_max_duration: updated.conversation_max_duration, conversation_inactivity_timeout: updated.conversation_inactivity_timeout, avatar: updated.avatar ?? user?.avatar ?? null })
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
      setUser({ id: updated.id, username: updated.username, displayName: updated.display_name, email: updated.email, role: updated.role, native_language: updated.native_language, target_language: updated.target_language, conversation_max_duration: updated.conversation_max_duration, conversation_inactivity_timeout: updated.conversation_inactivity_timeout, avatar: updated.avatar ?? user?.avatar ?? null })
      setConvMessage({ type: 'ok', text: t('conversationSaved') })
    } catch (err: unknown) {
      setConvMessage({ type: 'err', text: err instanceof Error ? err.message : t('saveFailed') })
    } finally {
      setSavingConv(false)
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    try {
      await apiFetch('/api/auth/me', { method: 'DELETE' })
      logout()
      router.push('/login')
    } catch {
      setDeleting(false)
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

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarUploading}
            className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border border-fl-border hover:border-fl-border-2 transition-colors focus:outline-none disabled:opacity-60"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-fl-surface-2 flex items-center justify-center">
                <span className="font-mono text-xl text-fl-muted-1 select-none">
                  {(user?.displayName || user?.username || '?')[0].toUpperCase()}
                </span>
              </div>
            )}
            {avatarUploading && (
              <div className="absolute inset-0 bg-fl-bg/70 flex items-center justify-center">
                <span className="font-mono text-fl-hint text-fl-muted-2 animate-pulse">…</span>
              </div>
            )}
          </button>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
              className="block font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase hover:text-fl-fg transition-colors disabled:opacity-40"
            >
              — {avatarUploading ? t('avatarUploading') : t('avatarChange')}
            </button>
            {user?.avatar && !avatarUploading && (
              <button
                type="button"
                onClick={handleAvatarRemove}
                className="block font-mono text-fl-label tracking-widest text-fl-muted-4 uppercase hover:text-fl-error transition-colors"
              >
                — {t('avatarRemove')}
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        {avatarError && (
          <div className="font-mono text-xs px-4 py-3 border border-fl-error/40 text-fl-error">✕ {avatarError}</div>
        )}

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
            {LANGUAGES.map((code) => (
              <option key={code} value={code}>{tLang(code)}</option>
            ))}
          </select>
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

      {/* Legal */}
      <div className="border border-fl-border bg-fl-surface p-6 mt-4">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionLegal')}</span>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="/terms?from=settings"
            className="font-mono text-xs text-fl-muted-2 hover:text-fl-fg tracking-widest uppercase transition-colors"
          >
            {t('termsOfService')}
          </a>
          <a
            href="/privacy?from=settings"
            className="font-mono text-xs text-fl-muted-2 hover:text-fl-fg tracking-widest uppercase transition-colors"
          >
            {t('privacyPolicy')}
          </a>
        </div>
      </div>

      <button
        onClick={() => setLogoutConfirm(true)}
        className="w-full font-mono text-fl-label tracking-widest text-fl-muted-2 border border-fl-border py-3 mt-4 uppercase hover:text-fl-error hover:border-fl-error/40 transition-colors"
      >
        — {tCommon('logout')}
      </button>

      {user?.role !== 'admin' && (
        <button
          onClick={() => setDeleteConfirm(true)}
          disabled={deleting}
          className="w-full font-mono text-fl-label tracking-widest text-fl-muted-2 border border-fl-border py-3 mt-2 uppercase hover:text-fl-error hover:border-fl-error/40 disabled:opacity-40 transition-colors"
        >
          — {t('deleteAccount')}
        </button>
      )}

      <ConfirmDialog
        open={logoutConfirm}
        title={tCommon('logoutConfirmTitle')}
        message={tCommon('logoutConfirmMessage')}
        confirmLabel={tCommon('logout')}
        onConfirm={handleLogout}
        onCancel={() => setLogoutConfirm(false)}
      />

      <ConfirmDialog
        open={deleteConfirm}
        title={t('deleteAccountTitle')}
        message={t('deleteAccountMessage')}
        confirmLabel={t('deleteAccountConfirm')}
        danger
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  )
}
