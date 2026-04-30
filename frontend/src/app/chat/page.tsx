'use client'

import { useState, useRef, useEffect } from 'react'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || sending) return
    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSending(true)

    try {
      const res = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMsg = { role: 'assistant', content: '' }
      setMessages((prev) => [...prev, assistantMsg])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))
        for (const line of lines) {
          const data = JSON.parse(line.slice(6))
          if (data.token) {
            assistantMsg = {
              ...assistantMsg,
              content: assistantMsg.content + data.token,
            }
            setMessages((prev) => {
              const copy = [...prev]
              copy[copy.length - 1] = assistantMsg
              return copy
            })
          }
          if (data.error) {
            assistantMsg = {
              ...assistantMsg,
              content: assistantMsg.content + `\n[${data.error}]`,
            }
            setMessages((prev) => {
              const copy = [...prev]
              copy[copy.length - 1] = assistantMsg
              return copy
            })
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>AI Tutor</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3 max-h-[60vh]">
          {messages.length === 0 && (
            <p className="text-center text-sm text-zinc-500">
              Ask your AI tutor anything about English!
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </CardContent>
      </Card>
      <div className="mt-3 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={sending}
        />
        <Button onClick={sendMessage} disabled={sending}>
          {sending ? '...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}
