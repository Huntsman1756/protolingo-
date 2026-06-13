'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { PageLoading } from '@/components/ui/page-loading'

interface MItem {
  id: number
  content: string
  source: string
  created_at: string
}

export default function SettingsMemoriesPage() {
  const t = useTranslations('settings')

  const [memories, setMemories] = useState<MItem[]>([])
  const [loading, setLoading] = useState(true)
  const [clearConfirm, setClearConfirm] = useState(false)

  const fetchMemories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/api/memories')
      if (res.ok) {
        const data = await res.json()
        setMemories(data.memories || [])
      }
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  async function handleDelete(id: number) {
    await apiFetch(`/api/memories/${id}`, { method: 'DELETE' })
    setMemories((prev) => prev.filter((m) => m.id !== id))
  }

  async function handleClearAll() {
    await apiFetch('/api/memories', { method: 'DELETE' })
    setMemories([])
    setClearConfirm(false)
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <nav className="text-fl-label text-fl-muted-3 mb-8 flex items-center gap-2 font-mono">
        <Link
          href="/settings"
          className="hover:text-fl-fg tracking-widest uppercase transition-colors"
        >
          {t('title')}
        </Link>
        <span>›</span>
        <span className="text-fl-fg tracking-widest uppercase">
          {t('sectionMemory')}
        </span>
      </nav>

      <div className="border-fl-border bg-fl-surface border p-6">
        <div className="border-fl-border mb-4 flex items-center gap-2 border-b pb-4">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {t('sectionMemory')}
          </span>
        </div>

        {loading ? (
          <PageLoading fullScreen={false} />
        ) : memories.length === 0 ? (
          <p className="text-fl-hint text-fl-muted-2 font-mono">
            {t('memoryEmpty')}
          </p>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3">
              {memories.map((m) => (
                <div
                  key={m.id}
                  className="border-fl-border flex items-start justify-between gap-3 border p-3"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                      {m.content}
                    </p>
                    <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
                      {m.source}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-fl-muted-2 hover:text-fl-error shrink-0 transition-colors"
                  >
                    <span className="font-mono text-xs">×</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setClearConfirm(true)}
              className="text-fl-hint text-fl-muted-2 border-fl-border hover:text-fl-error hover:border-fl-error/40 w-full border py-2 font-mono tracking-widest uppercase transition-colors"
            >
              — {t('memoryClearAll')}
            </button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={clearConfirm}
        title={t('memoryClearAllTitle')}
        message={t('memoryClearAllMessage')}
        confirmLabel={t('memoryClearAllConfirm')}
        danger
        onConfirm={handleClearAll}
        onCancel={() => setClearConfirm(false)}
      />
    </div>
  )
}
