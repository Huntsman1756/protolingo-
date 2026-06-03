'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useLogout } from '@/hooks/useLogout'
import { ProfileSection } from '@/components/settings/ProfileSection'
import { ConversationSection } from '@/components/settings/ConversationSection'
import { VoiceSection } from '@/components/settings/VoiceSection'
import { UsageLimitsSection } from '@/components/settings/UsageLimitsSection'
import { AppearanceSection } from '@/components/settings/AppearanceSection'
import { BillingSection } from '@/components/settings/BillingSection'

export default function SettingsPage() {
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const handleLogout = useLogout()

  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Header */}
      <div className="border-fl-border mb-8 border-b pb-4">
        <p className="text-fl-label text-fl-muted-2 mb-1 font-mono tracking-widest uppercase">
          {t('sectionAccount')}
        </p>
        <h1 className="text-fl-fg font-mono text-2xl font-bold tracking-tight">
          {t('title')}
        </h1>
      </div>

      <ProfileSection />

      {/* Memory */}
      <div className="border-fl-border bg-fl-surface mt-4 border p-6">
        <div className="border-fl-border mb-4 flex items-center gap-2 border-b pb-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('sectionMemory')}
          </span>
        </div>
        <Link
          href="/settings/memories"
          className="text-fl-muted-1 hover:text-fl-fg group flex items-center justify-between font-mono text-xs transition-colors"
        >
          <span className="tracking-widest uppercase">{t('memoryManage')}</span>
          <span className="text-fl-muted-3 group-hover:text-fl-fg transition-colors">
            ›
          </span>
        </Link>
      </div>

      <ConversationSection />
      <VoiceSection />
      <UsageLimitsSection />
      <AppearanceSection />

      {/* Author */}
      <div className="border-fl-border bg-fl-surface mt-4 border p-6">
        <div className="border-fl-border mb-5 flex items-center gap-2 border-b pb-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('sectionAuthor')}
          </span>
        </div>
        <p className="text-fl-fg font-mono text-sm">{t('authorDescription')}</p>
        <div className="mt-3 flex flex-col gap-2">
          <a
            href="https://arturocarreterocalvo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fl-muted-2 hover:text-fl-fg inline-flex items-center gap-2 font-mono text-xs transition-colors hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t('websiteLink')}
          </a>
          <a
            href="https://github.com/artcc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fl-muted-2 hover:text-fl-fg inline-flex items-center gap-2 font-mono text-xs transition-colors hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t('githubProfile')}
          </a>
        </div>
      </div>

      <BillingSection />

      {/* Legal */}
      <div className="border-fl-border bg-fl-surface mt-4 border p-6">
        <div className="border-fl-border mb-4 flex items-center gap-2 border-b pb-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('sectionLegal')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="/terms?from=settings"
            className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('termsOfService')}
          </a>
          <a
            href="/privacy?from=settings"
            className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('privacyPolicy')}
          </a>
        </div>
      </div>

      <button
        onClick={() => setLogoutConfirm(true)}
        className="text-fl-label text-fl-muted-2 border-fl-border hover:text-fl-error hover:border-fl-error/40 mt-4 w-full border py-3 font-mono tracking-widest uppercase transition-colors"
      >
        — {tCommon('logout')}
      </button>

      {user?.role !== 'admin' && (
        <button
          onClick={() => setDeleteConfirm(true)}
          disabled={deleting}
          className="text-fl-label text-fl-error border-fl-error/40 hover:border-fl-error/70 mt-2 w-full border py-3 font-mono tracking-widest uppercase transition-colors disabled:opacity-40"
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
