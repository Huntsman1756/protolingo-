'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [loadingHistory, setLoadingHistory] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollBottom() }, [messages, scrollBottom])

  // Load persisted history on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await apiFetch('/api/chat/history')
        if (res.ok) {
          const data = await res.json()
          if (data.messages?.length) {
            setMessages(data.messages)
          }
        }
      } catch { /* ignore */ }
      finally { setLoadingHistory(false) }
    }
    loadHistory()
  }, [])

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
        body: JSON.stringify({ message: text }),
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
            if (data.token) {
              assistantContent += data.token
              setMessages((prev) => {
                const copy = [...prev]
                copy[copy.length - 1] = { role: 'assistant', content: assistantContent }
                return copy
              })
            }
            if (data.error) setError(data.error)
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
    <div className="flex flex-col w-full h-[calc(100dvh-0px)] md:h-screen mx-auto max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] shrink-0">
        <span className="text-[10px] text-[#666]">●</span>
        <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase">AI Tutor</span>
        {sending && (
          <span className="ml-auto font-mono text-[9px] tracking-widest text-[#666] uppercase animate-pulse">thinking…</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loadingHistory ? (
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
                <div className={`font-mono text-sm leading-relaxed px-4 py-3 border ${
                  msg.role === 'user'
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
            disabled={sending || loadingHistory}
            placeholder="Type a message…"
            className="flex-1 bg-[#111] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] placeholder:text-[#444] focus:outline-none focus:border-[#444] disabled:opacity-40 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={sending || !input.trim() || loadingHistory}
            className="bg-[#f5f5f5] text-[#0a0a0a] font-mono text-[10px] font-bold tracking-widest uppercase px-5 hover:bg-white disabled:opacity-30 transition-colors"
          >
            {sending ? '…' : 'SEND'}
          </button>
        </div>
        <p className="font-mono text-[9px] text-[#444] mt-2 tracking-wide">Enter to send</p>
      </div>
    </div>
  )
}
