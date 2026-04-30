'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
        <aside className="w-56 shrink-0 flex flex-col border-r border-[#2a2a2a] bg-[#0a0a0a] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
            <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase">Chats</span>
            <button
              onClick={newChat}
              className="font-mono text-[10px] tracking-widest text-[#888] hover:text-[#f5f5f5] transition-colors uppercase"
              title="New chat"
            >
              + New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingConvs ? (
              <p className="font-mono text-[10px] text-[#555] px-4 py-4 animate-pulse">Loading…</p>
            ) : conversations.length === 0 ? (
              <p className="font-mono text-[10px] text-[#555] px-4 py-4">No conversations yet</p>
            ) : (
              conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => selectConversation(c.id)}
                  className={`group flex items-center justify-between px-4 py-3 cursor-pointer border-b border-[#1a1a1a] transition-colors ${activeId === c.id ? 'bg-[#1a1a1a] border-l-2 border-l-[#f5f5f5]' : 'hover:bg-[#111] border-l-2 border-l-transparent'
                    }`}
                >
                  <span className={`font-mono text-[10px] leading-tight truncate pr-1 ${activeId === c.id ? 'text-[#f5f5f5]' : 'text-[#888]'}`}>
                    {c.title}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeletePending(c.id) }}
                    className="opacity-0 group-hover:opacity-100 font-mono text-[10px] text-[#ff6b6b] hover:text-[#ff4444] transition-all shrink-0"
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
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="font-mono text-[10px] text-[#777] hover:text-[#f5f5f5] transition-colors mr-1 tracking-widest"
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? '◂' : '▸'}
          </button>
          <span className="text-[10px] text-[#666]">●</span>
          <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">
            {activeId
              ? (conversations.find((c) => c.id === activeId)?.title ?? 'AI Tutor')
              : 'New Chat'}
          </span>
          {sending && (
            <span className="ml-auto font-mono text-[9px] tracking-widest text-[#666] uppercase animate-pulse">thinking…</span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {loadingMsgs ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono text-xs text-[#777] tracking-widest uppercase animate-pulse">Loading…</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <p className="font-mono text-[10px] tracking-widest text-[#666] uppercase">AI Tutor — ready</p>
              <p className="font-mono text-xs text-[#777] max-w-xs leading-relaxed">
                Ask anything about English — grammar, vocabulary, pronunciation, or just practice conversation.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`font-mono text-[9px] tracking-widest uppercase mb-1 ${msg.role === 'user' ? 'text-[#777]' : 'text-[#666]'}`}>
                    {msg.role === 'user' ? 'you' : 'tutor'}
                  </p>
                  <div className={`font-mono text-sm leading-relaxed px-4 py-3 border ${msg.role === 'user'
                    ? 'bg-[#f5f5f5] text-[#0a0a0a] border-[#f5f5f5]'
                    : 'bg-[#111] text-[#e0e0e0] border-[#2a2a2a]'
                    }`}>
                    {msg.content || (sending && i === messages.length - 1
                      ? <span className="animate-pulse text-[#777]">▌</span>
                      : null
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {error && (
            <div className="font-mono text-[10px] text-[#ff6b6b] border border-[#ff3b3b]/30 px-4 py-2">
              ✕ {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#2a2a2a] px-4 py-4 bg-[#0a0a0a] shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={sending || loadingMsgs}
              placeholder="Type a message…"
              className="flex-1 bg-[#111] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] placeholder:text-[#444] focus:outline-none focus:border-[#444] disabled:opacity-40 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim() || loadingMsgs}
              className="bg-[#f5f5f5] text-[#0a0a0a] font-mono text-[10px] font-bold tracking-widest uppercase px-5 hover:bg-white disabled:opacity-30 transition-colors"
            >
              {sending ? '…' : 'SEND'}
            </button>
          </div>
          <p className="font-mono text-[9px] text-[#444] mt-2 tracking-wide">Enter to send</p>
        </div>
      </div>

      <ConfirmDialog
        open={deletePending !== null}
        title="Delete Chat"
        message="This conversation will be permanently deleted and cannot be recovered."
        confirmLabel="Delete"
        danger
        onConfirm={() => deletePending !== null && deleteConversation(deletePending)}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  )
}

