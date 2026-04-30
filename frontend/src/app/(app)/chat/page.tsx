'use client'

import { useState, useRef, useEffect } from 'react'
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
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
      setMessages((prev) => prev.filter((_, i) => i < prev.length - (messages.length === prev.length - 1 ? 0 : 1)))
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh)] max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a] shrink-0">
        <span className="text-[10px] text-[#555]">●</span>
        <span className="font-mono text-[10px] tracking-widest text-[#555] uppercase">AI Tutor</span>
        {sending && (
          <span className="ml-auto font-mono text-[9px] tracking-widest text-[#555] uppercase animate-pulse">thinking...</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <p className="font-mono text-[10px] tracking-widest text-[#555] uppercase">AI Tutor — ready</p>
            <p className="font-mono text-xs text-[#333] max-w-xs">Ask anything about English — grammar, vocabulary, pronunciation, or just chat.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <p className={`font-mono text-[9px] tracking-widest uppercase mb-1 ${msg.role === 'user' ? 'text-[#444]' : 'text-[#555]'}`}>
                {msg.role === 'user' ? 'you' : 'tutor'}
              </p>
              <div className={`font-mono text-sm leading-relaxed px-4 py-3 border ${
                msg.role === 'user'
                  ? 'bg-[#f5f5f5] text-[#0a0a0a] border-[#f5f5f5]'
                  : 'bg-[#111] text-[#f5f5f5] border-[#2a2a2a]'
              }`}>
                {msg.content || (sending && i === messages.length - 1 ? (
                  <span className="animate-pulse text-[#555]">▌</span>
                ) : null)}
              </div>
            </div>
          </div>
        ))}
        {error && (
          <div className="font-mono text-[10px] text-[#ff3b3b] border border-[#ff3b3b]/30 px-4 py-2">
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
            disabled={sending}
            placeholder="Type a message..."
            className="flex-1 bg-[#111] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] placeholder:text-[#333] focus:outline-none focus:border-[#555] disabled:opacity-40 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={sending || !input.trim()}
            className="bg-[#f5f5f5] text-[#0a0a0a] font-mono text-[10px] font-bold tracking-widest uppercase px-5 hover:bg-white disabled:opacity-30 transition-colors"
          >
            {sending ? '...' : 'SEND'}
          </button>
        </div>
        <p className="font-mono text-[9px] text-[#333] mt-2 tracking-wide">Enter to send · Shift+Enter for newline</p>
      </div>
    </div>
  )
}
