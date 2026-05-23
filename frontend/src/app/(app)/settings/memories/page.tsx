'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface MItem { id: number; content: string; source: string; created_at: string }

export default function SettingsMemoriesPage() {
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')

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
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchMemories() }, [fetchMemories])

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
    <div className="p-6 max-w-2xl mx-auto">
      <nav className="flex items-center gap-2 font-mono text-fl-label text-fl-muted-3 mb-8">
        <Link href="/settings" className="hover:text-fl-fg transition-colors uppercase tracking-widest">
          {t('title')}
        </Link>
        <span>›</span>
        <span className="text-fl-fg tracking-widest uppercase">{t('sectionMemory')}</span>
      </nav>

      <div className="border border-fl-border bg-fl-surface p-6">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">{t('sectionMemory')}</span>
        </div>

        {loading ? (
          <p className="font-mono text-fl-hint text-fl-muted-2">{tCommon('loading')}</p>
        ) : memories.length === 0 ? (
          <p className="font-mono text-fl-hint text-fl-muted-2">{t('memoryEmpty')}</p>
        ) : (
          <>
            <div className="flex flex-col gap-3 mb-4">
              {memories.map((m) => (
                <div key={m.id} className="flex items-start justify-between gap-3 border border-fl-border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-mono text-xs text-fl-muted-1 leading-relaxed">{m.content}</p>
                    <p className="font-mono text-fl-label text-fl-muted-3 uppercase tracking-widest">{m.source}</p>
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
              className="w-full font-mono text-fl-hint text-fl-muted-2 border border-fl-border py-2 tracking-widest uppercase hover:text-fl-error hover:border-fl-error/40 transition-colors"
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
