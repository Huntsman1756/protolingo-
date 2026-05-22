/**
 * /conversation — Voice conversation page.
 *
 * ConversationMode uses @ricky0123/vad-react (ONNX/WASM) and the Web Audio
 * API, neither of which are compatible with SSR. It is loaded client-side only
 * via `dynamic({ ssr: false })`.
 */
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { ChatContextItem } from '@/lib/conversation-ws'
import { PaywallGate } from '@/components/billing/PaywallBanner'
import { MaintenanceGate } from '@/components/billing/MaintenanceBanner'
import { apiFetch } from '@/lib/api'

const ConversationMode = dynamic(
  () => import('@/components/conversation/ConversationMode'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[calc(100vh-56px)] md:min-h-screen items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          ● Loading...
        </span>
      </div>
    ),
  },
)

export default function ConversationPage() {
  const [initialContext, setInitialContext] = useState<ChatContextItem[] | undefined>(undefined)
  const [autoStart, setAutoStart] = useState(false)
  const [cefrLevel, setCefrLevel] = useState<string | null>(null)
  const [planReady, setPlanReady] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('voice_context')
    if (raw) {
      sessionStorage.removeItem('voice_context')
      try {
        const parsed = JSON.parse(raw) as unknown
        if (Array.isArray(parsed)) {
          setInitialContext(parsed as ChatContextItem[])
          setAutoStart(true)
        }
      } catch {
        // malformed — ignore
      }
    }
    apiFetch('/api/plan/today')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.cefr_level) setCefrLevel(data.cefr_level) })
      .catch(() => { /* sin plan — usa default 1500ms */ })
      .finally(() => setPlanReady(true))
  }, [])

  if (!planReady) return null

  return <MaintenanceGate><PaywallGate><ConversationMode initialContext={initialContext} autoStart={autoStart} cefrLevel={cefrLevel} /></PaywallGate></MaintenanceGate>
}
