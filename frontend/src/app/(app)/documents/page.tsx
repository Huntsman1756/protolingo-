'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { PaywallGate } from '@/components/billing/PaywallBanner'
import { MaintenanceGate } from '@/components/billing/MaintenanceBanner'
import { type DocumentItem, type Citation } from '@/types/api'
import { PageLoading } from '@/components/ui/page-loading'

type ViewState = 'list' | 'query'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function DocumentsPageContent() {
  const t = useTranslations('documents')
  const tCommon = useTranslations('common')

  const [view, setView] = useState<ViewState>('list')
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null)
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [citations, setCitations] = useState<Citation[]>([])
  const [querying, setQuerying] = useState(false)
  const [error, setError] = useState('')
  const [skip, setSkip] = useState(0)
  const limit = 20
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadDocuments = useCallback(async (reset = false, offset = 0) => {
    setLoading(true)
    setError('')
    const nextOffset = reset ? 0 : offset
    try {
      const res = await apiFetch(`/api/documents?skip=${nextOffset}&limit=${limit}`)
      if (!res.ok) throw new Error('Failed to load documents')
      const data = await res.json()
      setDocuments((current) => (reset ? data.items : [...current, ...data.items]))
      setTotal(data.total)
      setSkip(nextOffset + data.items.length)
    } catch {
      setError(tCommon('error'))
    } finally {
      setLoading(false)
    }
  }, [tCommon])

  useEffect(() => {
    loadDocuments(true)
  }, [loadDocuments])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await apiFetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Upload failed')
      }
      await loadDocuments(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      if (msg.includes('No text could be extracted')) {
        setError(
          `${t('extractError')}. This may be a scanned PDF. Try converting it to a text or DOCX file first.`,
        )
      } else {
        setError(msg)
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (doc: DocumentItem) => {
    if (!confirm(t('confirmDelete'))) return
    try {
      const res = await apiFetch(`/api/documents/${doc.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      if (selectedDoc?.id === doc.id) {
        setView('list')
        setSelectedDoc(null)
      }
      await loadDocuments(true)
    } catch {
      setError(tCommon('error'))
    }
  }

  const handleQuery = async (doc?: DocumentItem) => {
    if (!query.trim()) return
    setQuerying(true)
    setError('')
    setAnswer('')
    setCitations([])
    try {
      const url = doc
        ? `/api/documents/${doc.id}/query`
        : '/api/documents/query'
      const res = await apiFetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Query failed')
      }
      const data = await res.json()
      setAnswer(data.answer)
      setCitations(data.citations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed')
    } finally {
      setQuerying(false)
    }
  }

  const openDocument = (doc: DocumentItem) => {
    if (doc.status !== 'ready') return
    setSelectedDoc(doc)
    setView('query')
    setQuery('')
    setAnswer('')
    setCitations([])
    setError('')
  }

  const backToList = () => {
    setView('list')
    setSelectedDoc(null)
    setQuery('')
    setAnswer('')
    setCitations([])
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return (
          <span className="text-fl-fg bg-fl-surface-2 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {t('ready')}
          </span>
        )
      case 'processing':
        return (
          <span className="bg-fl-accent/10 text-fl-accent rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {t('processing')}
          </span>
        )
      case 'error':
        return (
          <span className="bg-red-900/20 text-red-400 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {t('error')}
          </span>
        )
      default:
        return null
    }
  }

  const showErrorTooltip = (doc: DocumentItem) => {
    if (doc.status === 'error' && doc.error_message) {
      return (
        <div className="text-red-400 mt-2 font-mono text-[10px] leading-relaxed opacity-80">
          {doc.error_message}
        </div>
      )
    }
    return null
  }

  if (view === 'query' && selectedDoc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={backToList}
          className="text-fl-muted-2 hover:text-fl-fg mb-6 font-mono text-xs tracking-widest uppercase transition-colors"
        >
          ← {t('backToList')}
        </button>

        <div className="border-fl-border bg-fl-surface mb-6 rounded-lg border p-4">
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-wider">
            {selectedDoc.title}
          </h1>
          <p className="text-fl-muted-2 mt-1 font-mono text-xs">
            {selectedDoc.filename} · {formatFileSize(selectedDoc.file_size)} ·{' '}
            {selectedDoc.chunk_count} chunks
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleQuery(selectedDoc)
              }}
              placeholder={t('queryPlaceholder')}
              className="border-fl-border bg-fl-bg text-fl-fg placeholder-fl-muted-4 min-w-0 flex-1 rounded-lg border px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-white/30"
            />
            <button
              onClick={() => handleQuery(selectedDoc)}
              disabled={querying || !query.trim()}
              className="bg-fl-accent text-fl-fg hover:bg-fl-accent/90 disabled:bg-fl-muted-4 rounded-lg px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed"
            >
              {querying ? '...' : t('ask')}
            </button>
          </div>
        </div>

        {error && (
          <div className="border-red-900/30 bg-red-900/10 text-red-400 mb-4 rounded-lg border px-4 py-3 font-mono text-xs">
            {error}
          </div>
        )}

        {answer && (
          <div className="border-fl-border bg-fl-surface rounded-lg border p-5">
            <div className="text-fl-fg prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {answer}
            </div>

            {citations.length > 0 && (
              <div className="border-fl-border mt-5 border-t pt-4">
                <h3 className="text-fl-muted-2 mb-3 font-mono text-[10px] tracking-widest uppercase">
                  {t('sources')}
                </h3>
                <div className="space-y-2">
                  {citations.map((c, i) => (
                    <div
                      key={i}
                      className="border-fl-border bg-fl-bg rounded border p-3"
                    >
                      <div className="text-fl-muted-2 mb-1 font-mono text-[10px] tracking-wider">
                        [{c.chunk_index}] · {t('relevance')}:{' '}
                        {(c.relevance_score * 100).toFixed(0)}%
                        {c.document_title && (
                          <span> · {c.document_title}</span>
                        )}
                      </div>
                      <p className="text-fl-muted-1 font-mono text-xs leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
          {t('title')}
        </h1>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-fl-accent text-fl-fg hover:bg-fl-accent/90 disabled:bg-fl-muted-4 rounded-lg px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed"
          >
            {uploading ? t('uploading') : t('upload')}
          </button>
        </div>
      </div>

      {error && (
        <div className="border-red-900/30 bg-red-900/10 text-red-400 mb-4 rounded-lg border px-4 py-3 font-mono text-xs">
          {error}
        </div>
      )}

      {loading && documents.length === 0 ? (
        <PageLoading label={tCommon('loading')} />
      ) : documents.length === 0 ? (
        <div className="border-fl-border bg-fl-surface rounded-lg border p-8 text-center">
          <p className="text-fl-muted-2 font-mono text-sm">
            {t('emptyStateTitle')}
          </p>
          <p className="text-fl-muted-4 mt-2 font-mono text-xs">
            {t('emptyStateDesc')}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`border-fl-border bg-fl-surface hover:border-fl-muted-4 cursor-pointer rounded-lg border p-4 transition-colors ${
                  doc.status !== 'ready' ? 'opacity-60' : ''
                }`}
                onClick={() => openDocument(doc)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-fl-fg truncate font-mono text-sm font-bold tracking-wider">
                        {doc.title}
                      </h3>
                      {statusBadge(doc.status)}
                    </div>
                    <p className="text-fl-muted-3 mt-1 truncate font-mono text-xs">
                      {doc.filename}
                    </p>
                    <div className="text-fl-muted-4 mt-1 flex items-center gap-3 font-mono text-[10px]">
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>·</span>
                      <span>{doc.chunk_count} chunks</span>
                      <span>·</span>
                      <span>{formatDate(doc.created_at)}</span>
                    </div>
                    {showErrorTooltip(doc)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(doc)
                    }}
                    className="text-fl-muted-4 hover:text-red-400 shrink-0 font-mono text-xs transition-colors"
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {documents.length < total && (
            <div className="mt-4 text-center">
              <button
                onClick={() => loadDocuments(false, skip)}
                disabled={loading}
                className="text-fl-muted-2 hover:text-fl-fg font-mono text-xs tracking-widest uppercase transition-colors"
              >
                {loading ? '...' : tCommon('loadMore')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function DocumentsPage() {
  return (
    <MaintenanceGate>
      <PaywallGate>
        <DocumentsPageContent />
      </PaywallGate>
    </MaintenanceGate>
  )
}
