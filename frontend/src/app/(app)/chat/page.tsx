'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: number
  title: string
  created_at: string
  updated_at: string
}

export default function ChatPage() {
  const t = useTranslations('chat')
  const tCommon = useTranslations('common')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [loadingConvs, setLoadingConvs] = useState(true)
  const [loadingMsgs, setLoadingMsgs] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [deletePending, setDeletePending] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollBottom() }, [messages, scrollBottom])

  const loadConversations = useCallback(async () => {
    try {
      const res = await apiFetch('/api/chat/conversations')
      if (res.ok) {
        const data: Conversation[] = await res.json()
        setConversations(data)
        return data
      }
    } catch { /* ignore */ }
    return []
  }, [])

  // Load conversations on mount, auto-select the most recent
  useEffect(() => {
    async function init() {
      setLoadingConvs(true)
      const data = await loadConversations()
      if (data.length > 0) {
        selectConversation(data[0].id)
      }
      setLoadingConvs(false)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function selectConversation(id: number) {
    setActiveId(id)
    setMessages([])
    setError('')
    setLoadingMsgs(true)
    try {
      const res = await apiFetch(`/api/chat/conversations/${id}/messages`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch { /* ignore */ }
    finally { setLoadingMsgs(false) }
  }

  async function newChat() {
    // Don't create — let the first message auto-create the conversation
    setActiveId(null)
    setMessages([])
    setError('')
    inputRef.current?.focus()
  }

  async function deleteConversation(id: number) {
    await apiFetch(`/api/chat/conversations/${id}`, { method: 'DELETE' })
    setDeletePending(null)
    const updated = await loadConversations()
    if (activeId === id) {
      if (updated.length > 0) {
        selectConversation(updated[0].id)
      } else {
        setActiveId(null)
        setMessages([])
      }
    }
  }

  async function sendMessage() {
    if (!input.trim() || sending) return
    const text = input.trim()
    setInput('')
    setError('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setSending(true)

    try {
      const res = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversation_id: activeId }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Error ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.conversation_id && !activeId) {
              setActiveId(data.conversation_id)
              // Refresh sidebar with the new conversation
              loadConversations().then((list) => setConversations(list))
            }
            if (data.token) {
              assistantContent += data.token
              setMessages((prev) => {
                const copy = [...prev]
                copy[copy.length - 1] = { role: 'assistant', content: assistantContent }
                return copy
              })
            }
            if (data.error) setError(data.error)
            if (data.done) {
              // Refresh sidebar to update updated_at order
              loadConversations().then((list) => setConversations(list))
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex w-full h-[calc(100dvh-56px)] md:h-screen overflow-hidden">

      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-56 shrink-0 flex flex-col border-r border-fl-border bg-fl-bg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-fl-border">
            <span className="font-mono text-fl-hint tracking-widest text-fl-muted-2 uppercase">{t('conversations')}</span>
            <button
              onClick={newChat}
              className="font-mono text-fl-label tracking-widest text-fl-muted-1 hover:text-fl-fg transition-colors uppercase"
              title={t('newConversation')}
            >
              + New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingConvs ? (
              <p className="font-mono text-fl-label text-fl-muted-4 px-4 py-4 animate-pulse">{tCommon('loading')}</p>
            ) : conversations.length === 0 ? (
              <p className="font-mono text-fl-label text-fl-muted-4 px-4 py-4">{t('noConversation')}</p>
            ) : (
              conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => selectConversation(c.id)}
                  className={`group flex items-center justify-between px-4 py-3 cursor-pointer border-b border-fl-surface-2 transition-colors ${activeId === c.id ? 'bg-fl-surface-2 border-l-2 border-l-fl-fg' : 'hover:bg-fl-surface border-l-2 border-l-transparent'
                    }`}
                >
                  <span className={`font-mono text-fl-label leading-tight truncate pr-1 ${activeId === c.id ? 'text-fl-fg' : 'text-fl-muted-1'}`}>
                    {c.title}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletePending(c.id) }}
                    className="opacity-0 group-hover:opacity-100 font-mono text-fl-label text-fl-error-fg hover:text-fl-error transition-all shrink-0"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>
      )}

      {/* Main chat area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-fl-border bg-fl-bg shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="font-mono text-fl-label text-fl-muted-2 hover:text-fl-fg transition-colors mr-1 tracking-widest"
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? '◂' : '▸'}
          </button>
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            {activeId
              ? (conversations.find((c) => c.id === activeId)?.title ?? t('title'))
              : t('newConversation')}
          </span>
          {sending && (
            <span className="ml-auto font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase animate-pulse">{t('thinking')}</span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {loadingMsgs ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">{tCommon('loading')}</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <p className="font-mono text-fl-label tracking-widest text-fl-muted-3 uppercase">{t('title')}</p>
              <p className="font-mono text-xs text-fl-muted-2 max-w-xs leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`font-mono text-fl-hint tracking-widest uppercase mb-1 ${msg.role === 'user' ? 'text-fl-muted-2' : 'text-fl-muted-3'}`}>
                    {msg.role === 'user' ? 'you' : 'tutor'}
                  </p>
                  <div className={`font-mono text-sm leading-relaxed px-4 py-3 border ${msg.role === 'user'
                    ? 'bg-fl-accent text-fl-accent-fg border-fl-accent'
                    : 'bg-fl-surface text-fl-fg-2 border-fl-border'
                    }`}>
                    {msg.content || (sending && i === messages.length - 1
                      ? <span className="animate-pulse text-fl-muted-2">▌</span>
                      : null
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {error && (
            <div className="font-mono text-fl-label text-fl-error-fg border border-fl-error/30 px-4 py-2">
              ✕ {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-fl-border px-4 py-4 bg-fl-bg shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={sending || loadingMsgs}
              placeholder={t('placeholder')}
              className="flex-1 bg-fl-surface border border-fl-border px-4 py-3 font-mono text-sm text-fl-fg placeholder:text-fl-border-2 focus:outline-none focus:border-fl-border-2 disabled:opacity-40 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim() || loadingMsgs}
              className="bg-fl-accent text-fl-accent-fg font-mono text-fl-label font-bold tracking-widest uppercase px-5 hover:bg-fl-accent/90 disabled:opacity-30 transition-colors"
            >
              {sending ? '…' : t('send')}
            </button>
          </div>
          <p className="font-mono text-fl-hint text-fl-border-2 mt-2 tracking-wide">{t('enterToSend')}</p>
        </div>
      </div>

      <ConfirmDialog
        open={deletePending !== null}
        title={t('deleteTitle')}
        message={t('deleteMessage')}
        confirmLabel={t('deleteConfirm')}
        danger
        onConfirm={() => deletePending !== null && deleteConversation(deletePending)}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  )
}

