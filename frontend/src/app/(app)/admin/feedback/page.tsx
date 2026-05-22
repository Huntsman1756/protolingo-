'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedbackAuthor {
  id: number
  username: string
  display_name: string
}

interface FeedbackEntry {
  id: number
  type: 'feature' | 'bug'
  title: string
  description: string
  status: string
  author: FeedbackAuthor
  vote_count: number
  comment_count: number
  created_at: string
}

type TabFilter = 'all' | 'feature' | 'bug'

const PAGE_SIZE = 20

const STATUS_OPTIONS = ['pending', 'planned', 'in_progress', 'done', 'declined'] as const
type Status = (typeof STATUS_OPTIONS)[number]

const STATUS_STYLES: Record<string, string> = {
  pending: 'border-fl-border text-fl-muted-2',
  planned: 'border-blue-500/40 text-blue-400',
  in_progress: 'border-yellow-500/40 text-yellow-400',
  done: 'border-green-500/40 text-green-400',
  declined: 'border-fl-error/30 text-fl-error-fg',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminFeedbackPage() {
  const t = useTranslations('feedback')
  const tAdmin = useTranslations('admin')

  const [entries, setEntries] = useState<FeedbackEntry[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [typeFilter, setTypeFilter] = useState<TabFilter>('all')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Inline status edit state
  const [editingStatus, setEditingStatus] = useState<number | null>(null)
  const [savingStatus, setSavingStatus] = useState<number | null>(null)

  // Delete confirm
  const [deletePending, setDeletePending] = useState<FeedbackEntry | null>(null)

  const loadEntries = useCallback(
    async (
      pageIndex: number,
      currentType: TabFilter,
      currentStatus: string
    ) => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams({
          sort: 'date',
          order: 'desc',
          skip: String(pageIndex * PAGE_SIZE),
          limit: String(PAGE_SIZE),
        })
        if (currentType !== 'all') params.set('type', currentType)
        if (currentStatus) params.set('status', currentStatus)

        const res = await apiFetch(`/api/feedback?${params.toString()}`)
        if (res.status === 403) {
          setError(tAdmin('loading') + ' — admin access required')
          return
        }
        if (!res.ok) throw new Error()
        const data = await res.json()
        setEntries(data.items)
        setTotal(data.total)
      } catch {
        setError(t('errorLoad'))
      } finally {
        setLoading(false)
      }
    },
    [t, tAdmin]
  )

  useEffect(() => {
    loadEntries(page, typeFilter, statusFilter)
  }, [loadEntries, page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (page !== 0) {
      setPage(0)
    } else {
      loadEntries(0, typeFilter, statusFilter)
    }
  }, [typeFilter, statusFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleStatusChange(entry: FeedbackEntry, newStatus: string) {
    setSavingStatus(entry.id)
    try {
      const res = await apiFetch(`/api/feedback/${entry.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? { ...e, status: newStatus } : e))
        )
      }
    } finally {
      setSavingStatus(null)
      setEditingStatus(null)
    }
  }

  async function handleDelete(entry: FeedbackEntry) {
    const res = await apiFetch(`/api/feedback/${entry.id}`, { method: 'DELETE' })
    setDeletePending(null)
    if (res.ok) {
      const newTotal = total - 1
      setTotal(newTotal)
      setEntries((prev) => prev.filter((e) => e.id !== entry.id))
      const maxPage = Math.max(0, Math.ceil(newTotal / PAGE_SIZE) - 1)
      const targetPage = Math.min(page, maxPage)
      if (targetPage !== page) {
        setPage(targetPage)
      } else {
        await loadEntries(targetPage, typeFilter, statusFilter)
      }
    }
  }

  function getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: t('statusPending'),
      planned: t('statusPlanned'),
      in_progress: t('statusInProgress'),
      done: t('statusDone'),
      declined: t('statusDeclined'),
    }
    return map[status] ?? status
  }

  const typeFilterOptions: { value: TabFilter; label: string }[] = [
    { value: 'all', label: t('filterAll') },
    { value: 'feature', label: t('tabFeatures') },
    { value: 'bug', label: t('tabBugs') },
  ]

  const statusFilterOptions = [
    { value: '', label: t('filterAll') },
    ...STATUS_OPTIONS.map((s) => ({ value: s, label: getStatusLabel(s) })),
  ]

  if (loading && entries.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          {tAdmin('loading')}
        </span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-fl-label text-fl-muted-2">●</span>
          <span className="font-mono text-xs tracking-widest text-fl-muted-1 uppercase">
            {tAdmin('title')} /{' '}
            <Link
              href="/admin/users"
              className="hover:text-fl-fg transition-colors"
            >
              {tAdmin('users')}
            </Link>{' '}
            / {t('title')}
          </span>
        </div>
        <span className="font-mono text-fl-hint text-fl-muted-4 uppercase tracking-widest">
          {total} {tAdmin('total')}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center border border-fl-border bg-fl-surface px-5 py-3">
        {/* Type filter */}
        <span className="font-mono text-fl-hint tracking-widest uppercase text-fl-muted-4">
          {t('tabFeatures').toLowerCase()}/{t('tabBugs').toLowerCase()}
        </span>
        {typeFilterOptions.map((o) => (
          <button
            key={o.value}
            onClick={() => setTypeFilter(o.value)}
            className={`font-mono text-fl-hint tracking-widest uppercase border px-3 py-1 transition-colors ${
              typeFilter === o.value
                ? 'border-fl-fg/40 text-fl-fg'
                : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
            }`}
          >
            {o.label}
          </button>
        ))}

        <span className="font-mono text-fl-hint tracking-widest uppercase text-fl-muted-4 ml-2">
          {t('filterStatus')}
        </span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-fl-bg border border-fl-border px-3 py-1 font-mono text-fl-hint text-fl-muted-1 focus:outline-none focus:border-fl-border-2 transition-colors appearance-none"
        >
          {statusFilterOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-fl-error/40 px-4 py-3 font-mono text-xs text-fl-error">
          ✕ {error}
        </div>
      )}

      {/* Entry list */}
      <div className="border border-fl-border bg-fl-surface">
        {entries.length === 0 && !loading ? (
          <p className="px-6 py-10 font-mono text-xs text-fl-muted-2 text-center">
            {t('noEntries')}
          </p>
        ) : (
          <div>
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className={`px-5 py-4 space-y-2 ${i < entries.length - 1 ? 'border-b border-fl-border' : ''}`}
              >
                {/* Row 1: type badge + title + status */}
                <div className="flex flex-wrap items-start gap-2">
                  <span
                    className={`font-mono text-fl-hint tracking-widest uppercase border px-2 py-0.5 shrink-0 ${
                      entry.type === 'feature'
                        ? 'border-fl-border text-fl-muted-2'
                        : 'border-fl-error/20 text-fl-error-fg'
                    }`}
                  >
                    {entry.type === 'feature' ? t('tabFeatures') : t('tabBugs')}
                  </span>
                  <span className="font-mono text-sm font-semibold text-fl-fg flex-1 min-w-0">
                    {entry.title}
                  </span>
                </div>

                {/* Row 2: description preview */}
                <p className="font-mono text-xs text-fl-muted-2 line-clamp-2 leading-relaxed">
                  {entry.description}
                </p>

                {/* Row 3: meta + actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-fl-hint text-fl-muted-4">
                    {t('by')} {entry.author.display_name} · {formatDate(entry.created_at)}
                  </span>
                  {entry.type === 'feature' && (
                    <span className="font-mono text-fl-hint text-fl-muted-4">
                      ▲ {entry.vote_count}
                    </span>
                  )}
                  {entry.comment_count > 0 && (
                    <span className="font-mono text-fl-hint text-fl-muted-4">
                      ◌ {entry.comment_count}
                    </span>
                  )}

                  {/* Status selector */}
                  <div className="ml-auto flex items-center gap-2">
                    {editingStatus === entry.id ? (
                      <div className="flex items-center gap-1">
                        <select
                          defaultValue={entry.status}
                          autoFocus
                          onChange={(e) => handleStatusChange(entry, e.target.value)}
                          onBlur={() => setEditingStatus(null)}
                          disabled={savingStatus === entry.id}
                          className="bg-fl-bg border border-fl-border px-2 py-1 font-mono text-fl-hint text-fl-muted-1 focus:outline-none focus:border-fl-border-2 transition-colors appearance-none"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {getStatusLabel(s)}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingStatus(entry.id)}
                        className={`font-mono text-fl-hint tracking-widest uppercase border px-2 py-0.5 transition-colors hover:border-fl-border-2 ${
                          STATUS_STYLES[entry.status] ?? STATUS_STYLES.pending
                        }`}
                      >
                        {getStatusLabel(entry.status)}
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => setDeletePending(entry)}
                      className="border border-fl-error/30 px-3 py-1 font-mono text-fl-hint tracking-widest uppercase text-fl-error-fg hover:border-fl-error hover:text-fl-error transition-colors"
                    >
                      {tAdmin('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between border border-fl-border bg-fl-surface px-6 py-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="border border-fl-border px-4 py-2 font-mono text-fl-label tracking-widest uppercase text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {tAdmin('prevPage')}
          </button>
          <span className="font-mono text-fl-label text-fl-muted-2 tracking-widest">
            {page + 1} / {Math.ceil(total / PAGE_SIZE)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * PAGE_SIZE >= total}
            className="border border-fl-border px-4 py-2 font-mono text-fl-label tracking-widest uppercase text-fl-muted-1 hover:text-fl-fg hover:border-fl-border-2 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {tAdmin('nextPage')}
          </button>
        </div>
      )}

      {/* Confirm delete */}
      <ConfirmDialog
        open={deletePending !== null}
        title={t('deleteEntryConfirmTitle')}
        message={t('deleteEntryConfirmMessage')}
        confirmLabel={t('deleteEntryConfirm')}
        danger
        onConfirm={() => deletePending && handleDelete(deletePending)}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  )
}
