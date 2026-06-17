'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  MessageSquareText,
  ShieldAlert,
  Ticket,
  UserPlus,
  Users,
} from 'lucide-react'
import { AdminNav } from '@/components/admin/AdminNav'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { useConfigStore } from '@/store/config'

const actions = [
  {
    href: '/admin/users',
    key: 'manageUsers',
    descriptionKey: 'manageUsersDesc',
    icon: Users,
  },
  {
    href: '/admin/users?create=1',
    key: 'createUser',
    descriptionKey: 'createUserDesc',
    icon: UserPlus,
  },
  {
    href: '/admin/feedback',
    key: 'reviewFeedback',
    descriptionKey: 'reviewFeedbackDesc',
    icon: MessageSquareText,
  },
] as const

export default function AdminOverviewPage() {
  const t = useTranslations('admin')
  const maintenanceMode = useConfigStore((s) => s.maintenanceMode)

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      <AdminPageHeader
        eyebrow={`${t('title')} / ${t('overview')}`}
        title={t('title')}
      />

      <AdminNav />

      <div
        className={`border px-5 py-4 ${
          maintenanceMode
            ? 'border-yellow-500/40 bg-yellow-500/5'
            : 'border-fl-border bg-fl-surface'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ShieldAlert
            className={`size-5 ${
              maintenanceMode ? 'text-yellow-500' : 'text-fl-muted-3'
            }`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-fl-muted-1 font-mono text-xs tracking-widest uppercase">
              {t('maintenanceTitle')}
            </p>
            <p className="text-fl-hint text-fl-muted-3 mt-1 font-mono">
              {maintenanceMode
                ? t('maintenanceOnDesc')
                : t('maintenanceOffDesc')}
            </p>
          </div>
          <Link
            href="/admin/users"
            className="border-fl-border text-fl-label text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 ml-auto border px-3 py-2 font-mono tracking-widest uppercase transition-colors"
          >
            {t('openSystemControls')}
          </Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="border-fl-border bg-fl-surface hover:border-fl-border-2 group border p-5 transition-colors"
            >
              <div className="mb-5 flex items-center justify-between">
                <Icon
                  className="text-fl-muted-2 group-hover:text-fl-fg size-5 transition-colors"
                  aria-hidden="true"
                />
                <Ticket
                  className="text-fl-muted-4 group-hover:text-fl-muted-2 size-4 transition-colors"
                  aria-hidden="true"
                />
              </div>
              <p className="text-fl-fg font-mono text-sm tracking-widest uppercase">
                {t(action.key)}
              </p>
              <p className="text-fl-muted-2 mt-2 font-mono text-xs leading-relaxed">
                {t(action.descriptionKey)}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
