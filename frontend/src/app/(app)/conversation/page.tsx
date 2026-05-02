/**
 * /conversation — Voice conversation page.
 *
 * ConversationMode uses @ricky0123/vad-react (ONNX/WASM) and the Web Audio
 * API, neither of which are compatible with SSR. It is loaded client-side only
 * via `dynamic({ ssr: false })`.
 */
'use client'

import dynamic from 'next/dynamic'

const ConversationMode = dynamic(
  () => import('@/components/conversation/ConversationMode'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[calc(100vh-56px)] md:min-h-screen items-center justify-center">
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">
          ● Loading…
        </span>
      </div>
    ),
  },
)

export default function ConversationPage() {
  return <ConversationMode />
}
