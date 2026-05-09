'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useMicVAD } from '@ricky0123/vad-react'
import { useTranslations } from 'next-intl'
import { useAuthStore } from '@/store/auth'
import { apiFetch } from '@/lib/api'
import { float32ToWav, createAudioQueue, type AudioQueue } from '@/lib/audio'
import { buildConversationWsUrl, type WsMessage, type ChatContextItem } from '@/lib/conversation-ws'
import StatusIndicator, { type ConvStatus } from './StatusIndicator'
import TranscriptBubble from './TranscriptBubble'
import SessionTimeoutBanner from './SessionTimeoutBanner'
import MicButton from './MicButton'

interface TranscriptEntry {
  id: number
  role: 'user' | 'assistant'
  text: string
}

interface QuotaStatus {
  sessions_this_week: number
  sessions_limit: number
  sessions_unlimited: boolean
  minutes_today: number
  minutes_limit: number
  time_unlimited: boolean
}

function QuotaBar({ label, used, limit, unlimited }: { label: string; used: number; limit: number; unlimited: boolean }) {
  const pct = unlimited || limit === 0 ? null : Math.min(100, Math.round((used / limit) * 100))
  const exceeded = !unlimited && limit > 0 && used >= limit
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-fl-hint tracking-widest text-fl-muted-4 uppercase w-36 shrink-0">{label}</span>
      {unlimited ? (
        <span className="font-mono text-fl-hint text-fl-muted-2">∞</span>
      ) : (
        <>
          <div className="flex-1 h-1 bg-fl-surface-2 overflow-hidden">
            <div
              className={`h-full transition-all ${exceeded ? 'bg-fl-error' : 'bg-fl-accent'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={`font-mono text-fl-hint tabular-nums ${exceeded ? 'text-fl-error' : 'text-fl-muted-2'}`}>
            {used}&thinsp;/&thinsp;{limit}
          </span>
        </>
      )}
    </div>
  )
}

export default function ConversationMode({ initialContext }: { initialContext?: ChatContextItem[] }) {
  const t = useTranslations('conversation')
  const accessToken = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)

  // ─── UI State ────────────────────────────────────────────────────────────
  const [status, setStatus] = useState<ConvStatus>('loading')
  const [sessionActive, setSessionActive] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [streamingText, setStreamingText] = useState<string | null>(null)
  const [warningSeconds, setWarningSeconds] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [userSpeaking, setUserSpeaking] = useState(false)
  const [assistantSpeaking, setAssistantSpeaking] = useState(false)
  const [quota, setQuota] = useState<QuotaStatus | null>(null)

  // ─── Fetch quota on mount ─────────────────────────────────────────────────
  const refreshQuota = useCallback(() => {
    apiFetch('/api/auth/quota')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: QuotaStatus | null) => data && setQuota(data))
      .catch(() => { })
  }, [])

  useEffect(() => { refreshQuota() }, [refreshQuota])

  // ─── Refs ─────────────────────────────────────────────────────────────────
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioQueueRef = useRef<AudioQueue | null>(null)
  const transcriptIdRef = useRef(0)
  const transcriptEndRef = useRef<HTMLDivElement | null>(null)
  // Tracks whether the session ended cleanly so ws.onclose doesn't overwrite state
  const cleanEndRef = useRef(false)

  // ─── VAD ──────────────────────────────────────────────────────────────────
  // MicVAD.new() loads the ONNX model but does NOT request mic permission yet.
  // getUserMedia() is called only when vad.start() is invoked (inside handleStart,
  // which runs during a user-gesture click).
  const vad = useMicVAD({
    baseAssetPath: '/vad/',
    onnxWASMBasePath: '/vad/',
    model: 'v5',
    startOnLoad: false,
    ortConfig: (ort) => {
      // Single-threaded ONNX — no SharedArrayBuffer / COOP headers required
      ort.env.wasm.numThreads = 1
    },
    onSpeechStart: () => {
      // Barge-in: immediately cancel any in-progress TTS playback
      if (audioQueueRef.current) {
        audioQueueRef.current.cancel()
        setAssistantSpeaking(false)
      }
      setUserSpeaking(true)
    },
    onSpeechEnd: (audio: Float32Array) => {
      setUserSpeaking(false)
      const ws = wsRef.current
      if (ws && ws.readyState === WebSocket.OPEN) {
        const wav = float32ToWav(audio, 16000)
        ws.send(wav)
      }
    },
  })

  // Transition from loading → ready when VAD finishes initialising
  useEffect(() => {
    if (vad.loading) return
    if (vad.errored) {
      const errMsg = typeof vad.errored === 'string' ? vad.errored : ''
      const isPermission =
        errMsg.includes('NotAllowedError') || errMsg.includes('PermissionDeniedError')
      setErrorMsg(isPermission ? t('errorMic') : `${t('errorVadInit')}${errMsg ? ` — ${errMsg}` : ''}`)
      setStatus('error')
      return
    }
    if (status === 'loading') setStatus('ready')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vad.loading, vad.errored])

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, streamingText])

  // ─── WebSocket ────────────────────────────────────────────────────────────
  const connectWs = useCallback(
    (token: string, context?: ChatContextItem[]) => {
      const url = buildConversationWsUrl()
      const ws = new WebSocket(url)
      ws.binaryType = 'arraybuffer'
      wsRef.current = ws

      ws.onopen = () => {
        const authPayload: Record<string, unknown> = { type: 'auth', token }
        if (context?.length) authPayload.context = context
        ws.send(JSON.stringify(authPayload))
        setStatus('live')
      }

      ws.onmessage = async (event) => {
        // Binary → TTS audio chunk
        if (event.data instanceof ArrayBuffer) {
          setAssistantSpeaking(true)
          await audioQueueRef.current?.enqueue(event.data)
          return
        }

        // Text → JSON control message
        try {
          const msg = JSON.parse(event.data as string) as WsMessage
          switch (msg.type) {
            case 'transcript':
              if (msg.role === 'user') {
                // STT result — always final
                setTranscript((prev) => [
                  ...prev,
                  { id: transcriptIdRef.current++, role: 'user', text: msg.text },
                ])
              } else {
                // LLM token stream
                if (msg.final) {
                  setStreamingText(null)
                  setTranscript((prev) => [
                    ...prev,
                    { id: transcriptIdRef.current++, role: 'assistant', text: msg.text },
                  ])
                  setAssistantSpeaking(false)
                } else {
                  setStreamingText(msg.text)
                }
              }
              break

            case 'barge_in':
              audioQueueRef.current?.cancel()
              setAssistantSpeaking(false)
              setStreamingText(null)
              break

            case 'session_warning':
              setWarningSeconds(msg.remaining_seconds)
              break

            case 'session_end':
              cleanEndRef.current = true
              setStatus('ended')
              setSessionActive(false)
              vad.pause()
              ws.close(1000, 'session_end')
              break

            case 'error':
              cleanEndRef.current = true
              setErrorMsg(
                msg.code === 'services_disabled'
                  ? t('errorServicesDisabled')
                  : msg.code === 'quota_exceeded_sessions'
                    ? t('quotaExceededSessions')
                    : msg.code === 'quota_exceeded_time'
                      ? t('quotaExceededTime')
                      : (msg.message ?? t('errorConnection')),
              )
              setStatus('error')
              ws.close()
              break
          }
        } catch {
          // Non-JSON (shouldn't happen for text frames) — ignore
        }
      }

      ws.onerror = () => {
        if (!cleanEndRef.current) {
          setErrorMsg(`${t('errorConnection')} [onerror → ${url}]`)
          setStatus('error')
          setSessionActive(false)
        }
      }

      ws.onclose = (ev) => {
        if (!cleanEndRef.current) {
          if (ev.code === 1008) {
            setErrorMsg(t('errorUnauthorized'))
          } else if (ev.code !== 1000) {
            setErrorMsg(`${t('errorConnection')} [code ${ev.code}: ${ev.reason || 'no reason'} → ${url}]`)
          }
          setStatus('error')
          setSessionActive(false)
        }
        cleanEndRef.current = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  // ─── Session lifecycle ────────────────────────────────────────────────────
  async function handleStart() {
    if (!accessToken || vad.loading || vad.errored) return

    // AudioContext MUST be created during a user-gesture (this click handler)
    const ctx = new AudioContext()
    audioCtxRef.current = ctx
    audioQueueRef.current = createAudioQueue(ctx)

    cleanEndRef.current = false
    setStatus('connecting')
    setSessionActive(true)
    setTranscript([])
    setStreamingText(null)
    setWarningSeconds(null)
    setErrorMsg(null)
    setUserSpeaking(false)
    setAssistantSpeaking(false)
    refreshQuota()

    // Trigger model warmup on TTS/STT services and WAIT for them to be ready
    // before opening the WebSocket. Models are loaded lazily by the backend;
    // this ensures the first transcription/synthesis in the session is fast.
    // Runs in parallel with VAD mic permission request.
    setStatus('warming')
    const warmupPromise = apiFetch('/api/conversation/warmup', { method: 'POST' }).catch(() => undefined)

    // Start mic (requests permission if not already granted)
    vad.start().catch((e: unknown) => {
      setErrorMsg(e instanceof Error ? e.message : t('errorMic'))
      setStatus('error')
      setSessionActive(false)
    })

    await warmupPromise
    connectWs(accessToken, initialContext)
  }

  function handleStop() {
    cleanEndRef.current = true
    wsRef.current?.close(1000, 'user_stopped')
    wsRef.current = null
    vad.pause()
    audioQueueRef.current?.cancel()
    audioCtxRef.current?.close()
    audioCtxRef.current = null
    audioQueueRef.current = null
    setSessionActive(false)
    setStatus('ended')
    // Allow a moment for the backend to record session seconds, then refresh
    setTimeout(() => refreshQuota(), 1500)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanEndRef.current = true
      wsRef.current?.close()
      audioCtxRef.current?.close()
    }
  }, [])

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-56px)] md:min-h-screen p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-fl-border">
        <p className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase mb-1">
          {t('subtitle')}
        </p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-fl-fg">{t('title')}</h1>
      </div>

      {/* Timeout warning */}
      {warningSeconds !== null && <SessionTimeoutBanner seconds={warningSeconds} />}

      {/* Transcript area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-[120px]">
        {transcript.length === 0 && !streamingText && status === 'live' && (
          <p className="font-mono text-fl-label text-fl-muted-4 text-center py-8">
            {t('tapToStart')}
          </p>
        )}
        {transcript.map((entry) => (
          <TranscriptBubble
            key={entry.id}
            role={entry.role}
            text={entry.text}
            userAvatar={user?.avatar}
            userInitial={(user?.displayName || user?.username || '?')[0]}
          />
        ))}
        {streamingText !== null && (
          <TranscriptBubble
            role="assistant"
            text={streamingText}
            streaming
            userAvatar={user?.avatar}
            userInitial={(user?.displayName || user?.username || '?')[0]}
          />
        )}
        <div ref={transcriptEndRef} />
      </div>

      {/* Status message */}
      {status === 'error' && errorMsg && (
        <div className="mb-4 border border-fl-error/40 bg-fl-surface px-4 py-3 font-mono text-xs text-fl-error">
          ✕ {errorMsg}
        </div>
      )}
      {status === 'ended' && (
        <div className="mb-4 border border-fl-border bg-fl-surface px-4 py-3 font-mono text-xs text-fl-muted-2">
          — {t('sessionEnded')}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 pb-2">
        {/* Quota widget */}
        {quota && (
          <div className="w-full space-y-1.5 border border-fl-border bg-fl-surface px-4 py-3">
            <QuotaBar
              label={t('quotaSessions')}
              used={quota.sessions_this_week}
              limit={quota.sessions_limit}
              unlimited={quota.sessions_unlimited}
            />
            <QuotaBar
              label={t('quotaMinutes')}
              used={quota.minutes_today}
              limit={quota.minutes_limit}
              unlimited={quota.time_unlimited}
            />
          </div>
        )}
        <StatusIndicator
          status={status}
          userSpeaking={userSpeaking}
          assistantSpeaking={assistantSpeaking}
        />
        <MicButton
          status={status}
          sessionActive={sessionActive}
          onStart={handleStart}
          onStop={handleStop}
        />
      </div>
    </div>
  )
}
