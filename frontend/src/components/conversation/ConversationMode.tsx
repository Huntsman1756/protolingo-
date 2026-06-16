'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useMicVAD } from '@ricky0123/vad-react'
import { useTranslations } from 'next-intl'
import { useAuthStore } from '@/store/auth'
import { apiFetch } from '@/lib/api'
import { float32ToWav, createAudioQueue, type AudioQueue } from '@/lib/audio'
import {
  buildConversationWsUrl,
  type WsMessage,
  type ChatContextItem,
} from '@/lib/conversation-ws'
import StatusIndicator, { type ConvStatus } from './StatusIndicator'
import TranscriptBubble from './TranscriptBubble'
import SessionTimeoutBanner from './SessionTimeoutBanner'
import MicButton from './MicButton'
import { type QuotaStatus } from '@/types/api'

interface TranscriptEntry {
  id: number
  role: 'user' | 'assistant'
  text: string
}

function QuotaBar({
  label,
  used,
  limit,
  unlimited,
}: {
  label: string
  used: number
  limit: number
  unlimited: boolean
}) {
  const pct =
    unlimited || limit === 0
      ? null
      : Math.min(100, Math.round((used / limit) * 100))
  const exceeded = !unlimited && limit > 0 && used >= limit
  return (
    <div className="flex items-center gap-3">
      <span className="text-fl-hint text-fl-muted-4 w-36 shrink-0 font-mono tracking-widest uppercase">
        {label}
      </span>
      {unlimited ? (
        <span className="text-fl-hint text-fl-muted-2 font-mono">∞</span>
      ) : (
        <>
          <div className="bg-fl-surface-2 h-1 flex-1 overflow-hidden">
            <div
              className={`h-full transition-all ${exceeded ? 'bg-fl-error' : 'bg-fl-accent'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span
            className={`text-fl-hint font-mono tabular-nums ${exceeded ? 'text-fl-error' : 'text-fl-muted-2'}`}
          >
            {used}&thinsp;/&thinsp;{limit}
          </span>
        </>
      )}
    </div>
  )
}

function quotaPillSummary(quota: QuotaStatus): {
  text: string
  alert: boolean
} {
  const parts: string[] = []
  let alert = false

  if (!quota.sessions_unlimited) {
    parts.push(`${quota.sessions_this_week}/${quota.sessions_limit} ses`)
    if (quota.sessions_this_week >= quota.sessions_limit) alert = true
  }

  if (!quota.time_unlimited) {
    parts.push(`${quota.minutes_today}/${quota.minutes_limit} min`)
    if (quota.minutes_today >= quota.minutes_limit) alert = true
  }

  if (!quota.tokens_unlimited) {
    const kUsed = Math.round((quota.tokens_this_month ?? 0) / 1000)
    const kLimit = Math.round((quota.tokens_monthly_limit ?? 0) / 1000)
    parts.push(`${kUsed}k/${kLimit}k tok`)
    if ((quota.tokens_this_month ?? 0) >= (quota.tokens_monthly_limit ?? 0))
      alert = true
  }

  return { text: parts.length ? parts.join(' · ') : '∞', alert }
}

function QuotaPill({
  quota,
  t,
}: {
  quota: QuotaStatus
  t: (k: string) => string
}) {
  const [open, setOpen] = useState(false)
  const { text, alert } = quotaPillSummary(quota)

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`text-fl-hint flex w-full items-center justify-between border px-3 py-1.5 font-mono tracking-widest uppercase transition-colors ${
          alert
            ? 'border-fl-error/50 text-fl-error hover:border-fl-error'
            : 'border-fl-border text-fl-muted-3 hover:border-fl-border-2 hover:text-fl-muted-1'
        }`}
      >
        <span>● {text}</span>
        <span className="text-fl-muted-4">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="border-fl-border bg-fl-surface space-y-1.5 border border-t-0 px-4 py-3">
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
          {!quota.tokens_unlimited && (
            <QuotaBar
              label={t('quotaTokens')}
              used={quota.tokens_this_month ?? 0}
              limit={quota.tokens_monthly_limit ?? 0}
              unlimited={false}
            />
          )}
        </div>
      )}
    </div>
  )
}

function vadRedemptionMs(cefrLevel: string | null | undefined): number {
  if (!cefrLevel) return 1500
  if (cefrLevel === 'A1' || cefrLevel === 'A2') return 2000
  if (cefrLevel === 'B1' || cefrLevel === 'B2') return 1750
  return 1500 // C1, C2
}

export default function ConversationMode({
  initialContext,
  autoStart,
  cefrLevel,
  targetLanguage,
  onClose,
}: {
  initialContext?: ChatContextItem[]
  autoStart?: boolean
  cefrLevel?: string | null
  targetLanguage?: string
  onClose?: () => void
}) {
  const t = useTranslations('conversation')
  const tCommon = useTranslations('common')
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
  const [memoryToast, setMemoryToast] = useState(false)
  const [quota, setQuota] = useState<QuotaStatus | null>(null)

  // 6 random starters picked once per component mount, shown alphabetically
  const visibleStarters = useMemo(
    () =>
      (t.raw('starters') as string[])
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .sort((a, b) => a.localeCompare(b)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // ─── Fetch quota on mount ─────────────────────────────────────────────────
  const refreshQuota = useCallback(() => {
    apiFetch('/api/auth/quota')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: QuotaStatus | null) => data && setQuota(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    refreshQuota()
  }, [refreshQuota])

  // ─── Refs ─────────────────────────────────────────────────────────────────
  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioQueueRef = useRef<AudioQueue | null>(null)
  const transcriptIdRef = useRef(0)
  const transcriptEndRef = useRef<HTMLDivElement | null>(null)
  // Tracks whether the session ended cleanly so ws.onclose doesn't overwrite state
  const cleanEndRef = useRef(false)
  const mountedRef = useRef(true)
  const startAttemptRef = useRef(0)

  // ─── VAD ──────────────────────────────────────────────────────────────────
  // MicVAD.new() loads the ONNX model but does NOT request mic permission yet.
  // getUserMedia() is called only when vad.start() is invoked (inside handleStart,
  // which runs during a user-gesture click).
  const vad = useMicVAD({
    baseAssetPath: '/vad/',
    onnxWASMBasePath: '/vad/',
    model: 'v5',
    startOnLoad: false,
    redemptionMs: vadRedemptionMs(cefrLevel),
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
        errMsg.includes('NotAllowedError') ||
        errMsg.includes('PermissionDeniedError')
      setErrorMsg(
        isPermission
          ? t('errorMic')
          : `${t('errorVadInit')}${errMsg ? ` — ${errMsg}` : ''}`
      )
      setStatus('error')
      return
    }
    if (status === 'loading') setStatus('ready')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vad.loading, vad.errored])

  const finalizeSession = useCallback(() => {
    if (!mountedRef.current) return
    wsRef.current?.close()
    wsRef.current = null
    vad.pause()
    setAssistantSpeaking(false)
    setUserSpeaking(false)
    setStreamingText(null)
    audioQueueRef.current?.cancel()
    audioQueueRef.current = null
    if (audioCtxRef.current) {
      void audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
    setSessionActive(false)
  }, [vad])

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, streamingText])

  // ─── Auto-start when opened as overlay from chat ────────────────────────
  const pendingAutoStartRef = useRef(false)

  useEffect(() => {
    if (autoStart && !sessionActive) {
      pendingAutoStartRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

  useEffect(() => {
    if (
      pendingAutoStartRef.current &&
      !vad.loading &&
      !vad.errored &&
      !!accessToken &&
      !sessionActive
    ) {
      pendingAutoStartRef.current = false
      void handleStart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vad.loading, vad.errored, accessToken])

  // ─── WebSocket ────────────────────────────────────────────────────────────
  const connectWs = useCallback(
    (token: string, context?: ChatContextItem[]) => {
      const url = buildConversationWsUrl()
      const ws = new WebSocket(url)
      ws.binaryType = 'arraybuffer'
      wsRef.current = ws

      ws.onopen = () => {
        const authPayload: Record<string, unknown> = { type: 'auth', token }
        const storedVoice =
          typeof window !== 'undefined'
            ? localStorage.getItem('tts_voice')
            : null
        if (storedVoice) authPayload.voice = storedVoice
        if (context?.length) authPayload.context = context
        if (targetLanguage) authPayload.target_language = targetLanguage
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
                  {
                    id: transcriptIdRef.current++,
                    role: 'user',
                    text: msg.text,
                  },
                ])
              } else {
                // LLM token stream
                if (msg.final) {
                  setStreamingText(null)
                  setTranscript((prev) => [
                    ...prev,
                    {
                      id: transcriptIdRef.current++,
                      role: 'assistant',
                      text: msg.text,
                    },
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
                      : msg.code === 'quota_exceeded_tokens'
                        ? t('quotaExceededTokens')
                        : msg.code === 'no_active_plan'
                          ? tCommon('noActivePlan')
                          : (msg.message ?? t('errorConnection'))
              )
              setStatus('error')
              ws.close()
              break

            case 'memory_updated':
              setMemoryToast(true)
              setTimeout(() => setMemoryToast(false), 3500)
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
          finalizeSession()
        }
      }

      ws.onclose = (ev) => {
        if (!cleanEndRef.current) {
          if (ev.code === 1008) {
            setErrorMsg(t('errorUnauthorized'))
          } else if (ev.code !== 1000) {
            setErrorMsg(
              `${t('errorConnection')} [code ${ev.code}: ${ev.reason || 'no reason'} → ${url}]`
            )
          }
          setStatus('error')
          finalizeSession()
        }
        cleanEndRef.current = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, targetLanguage, finalizeSession]
  )

  // ─── Session lifecycle ────────────────────────────────────────────────────
  async function handleStart(topicContext?: ChatContextItem[]) {
    if (
      !accessToken ||
      vad.loading ||
      vad.errored ||
      sessionActive ||
      status === 'warming' ||
      status === 'connecting' ||
      status === 'live'
    )
      return

    const startAttempt = ++startAttemptRef.current

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
    const warmupPromise = Promise.race([
      apiFetch('/api/conversation/warmup', { method: 'POST' }).catch(
        () => undefined
      ),
      new Promise<undefined>((resolve) =>
        setTimeout(() => resolve(undefined), 15_000)
      ),
    ])

    // Start mic (requests permission if not already granted)
    vad.start().catch((e: unknown) => {
      if (!mountedRef.current || startAttemptRef.current !== startAttempt)
        return
      startAttemptRef.current++
      setErrorMsg(e instanceof Error ? e.message : t('errorMic'))
      setStatus('error')
      setSessionActive(false)
      audioCtxRef.current?.close()
      audioCtxRef.current = null
      audioQueueRef.current = null
    })

    await warmupPromise
    if (!mountedRef.current || startAttemptRef.current !== startAttempt) {
      ctx.close()
      return
    }
    const latestToken = useAuthStore.getState().accessToken
    if (!latestToken) {
      setErrorMsg(t('errorUnauthorized'))
      setStatus('error')
      setSessionActive(false)
      ctx.close()
      audioCtxRef.current = null
      audioQueueRef.current = null
      return
    }
    connectWs(latestToken, topicContext ?? initialContext)
  }

  function handleStop() {
    startAttemptRef.current++
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
      mountedRef.current = false
      startAttemptRef.current++
      cleanEndRef.current = true
      wsRef.current?.close()
      vad.pause()
      audioQueueRef.current?.cancel()
      audioCtxRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-56px)] max-w-2xl flex-col p-4 md:min-h-screen md:p-6">
      {/* Header */}
      <div className="border-fl-border mb-6 flex items-end justify-between border-b pb-4">
        <div>
          <p className="text-fl-label text-fl-muted-2 mb-1 font-mono tracking-widest uppercase">
            {t('subtitle')}
          </p>
          <h1 className="text-fl-fg font-mono text-2xl font-bold tracking-tight">
            {t('title')}
          </h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-fl-hint text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            ← {tCommon('back')}
          </button>
        )}
      </div>

      {/* Memory updated toast */}
      {memoryToast && (
        <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center">
          <div className="border-fl-border bg-fl-surface text-fl-muted-1 animate-in fade-in slide-in-from-top-2 pointer-events-auto border px-4 py-2 font-mono text-xs tracking-widest uppercase shadow-lg">
            {t('memoryUpdated')}
          </div>
        </div>
      )}

      {/* Timeout warning */}
      {warningSeconds !== null && (
        <SessionTimeoutBanner seconds={warningSeconds} />
      )}

      {/* Transcript area */}
      <div className="mb-4 min-h-[120px] flex-1 space-y-3 overflow-y-auto px-2">
        {transcript.length === 0 && !streamingText && status === 'live' && (
          <p className="text-fl-label text-fl-muted-4 py-8 text-center font-mono">
            {t('tapToStart')}
          </p>
        )}
        {(() => {
          const lastUserIdx = transcript.reduce(
            (acc, e, j) => (e.role === 'user' ? j : acc),
            -1
          )
          return transcript.map((entry, i) => (
            <TranscriptBubble
              key={entry.id}
              role={entry.role}
              text={entry.text}
              speaking={
                entry.role === 'user' && userSpeaking && i === lastUserIdx
              }
              userAvatar={user?.avatar}
              userInitial={(user?.displayName || user?.username || '?')[0]}
            />
          ))
        })()}
        {streamingText !== null && (
          <TranscriptBubble
            role="assistant"
            text={streamingText}
            streaming
            speaking={assistantSpeaking}
            userAvatar={user?.avatar}
            userInitial={(user?.displayName || user?.username || '?')[0]}
          />
        )}
        <div ref={transcriptEndRef} />
      </div>

      {/* Status message */}
      {status === 'error' && errorMsg && (
        <div className="border-fl-error/40 bg-fl-surface text-fl-error mb-4 border px-4 py-3 font-mono text-xs">
          ✕ {errorMsg}
        </div>
      )}
      {status === 'ended' && (
        <div className="border-fl-border bg-fl-surface text-fl-muted-2 mb-4 border px-4 py-3 font-mono text-xs">
          — {t('sessionEnded')}
        </div>
      )}

      {/* Conversation starters — shown when idle, hidden as soon as session starts */}
      {!sessionActive &&
        (status === 'ready' || status === 'ended' || status === 'error') && (
          <div className="mb-4">
            <p className="text-fl-hint text-fl-muted-3 mb-3 text-center font-mono tracking-widest uppercase">
              {t('startersHint')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {visibleStarters.map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    void handleStart([
                      {
                        role: 'user',
                        content: `I'd like to practice English by talking about ${topic}.`,
                      },
                    ])
                  }
                  className="text-fl-muted-1 border-fl-border hover:border-fl-border-2 hover:text-fl-fg border px-3 py-2 font-mono text-xs tracking-wide transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 pb-2">
        {/* Quota pill */}
        {quota && <QuotaPill quota={quota} t={t} />}
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
