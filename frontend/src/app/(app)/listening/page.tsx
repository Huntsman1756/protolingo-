'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { apiFetch } from '@/lib/api'
import { useLanguageStore } from '@/store/language'
import { PaywallGate } from '@/components/billing/PaywallBanner'
import { MaintenanceGate } from '@/components/billing/MaintenanceBanner'
import { type ListeningExercise } from '@/types/api'
import { WordTooltip, useWordSave } from '@/components/ui/WordTooltip'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CorrectAnswer {
  index: number
  correct: string
}

interface SubmitResult {
  score: number
  xp_earned: number
  correct_answers: CorrectAnswer[]
  text: string
}

interface AttemptItem {
  id: number
  score: number
  xp_earned: number
  completed_at: string
  exercise: ListeningExercise
  text: string
  answers: Record<string, string>
}

type PageState =
  | 'loading'
  | 'idle'
  | 'generating'
  | 'exercise'
  | 'results'
  | 'history'

// ---------------------------------------------------------------------------
// Audio player for listening exercises
// Fetches audio via apiFetch (adds Authorization header automatically)
// ---------------------------------------------------------------------------

function ExerciseAudioPlayer({
  exerciseId,
  onFirstPlay,
}: {
  exerciseId: number
  onFirstPlay?: () => void
}) {
  const t = useTranslations('listening')
  const [state, setState] = useState<
    'idle' | 'loading' | 'playing' | 'paused' | 'error'
  >('idle')
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const blobUrlRef = useRef<string | null>(null)
  const playedRef = useRef(false)

  async function handlePlayPause() {
    if (state === 'loading') return

    if (state === 'playing') {
      audioRef.current?.pause()
      setState('paused')
      return
    }

    if (state === 'paused' && audioRef.current) {
      await audioRef.current.play()
      setState('playing')
      return
    }

    // First play: fetch audio blob
    setState('loading')
    try {
      const res = await apiFetch(`/api/listening/audio/${exerciseId}`)
      if (!res.ok) throw new Error(`${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      blobUrlRef.current = url

      const audio = new Audio(url)
      audioRef.current = audio

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      audio.addEventListener('timeupdate', () => {
        if (audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100)
        }
      })
      audio.addEventListener('ended', () => {
        setProgress(100)
        setState('idle')
      })
      audio.addEventListener('error', () => setState('error'))

      await audio.play()
      setState('playing')

      if (!playedRef.current) {
        playedRef.current = true
        onFirstPlay?.()
      }
    } catch {
      setState('error')
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || audio.duration === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
    setProgress(ratio * 100)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
    }
  }, [])

  const icon = state === 'loading' ? '◌' : state === 'playing' ? '▐▐' : '▶'
  const label = state === 'playing' ? 'Pause' : 'Play'

  return (
    <div className="border-fl-border bg-fl-surface space-y-2 border p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          disabled={state === 'loading'}
          aria-label={label}
          className="text-fl-fg hover:text-fl-fg-bright w-8 shrink-0 text-center font-mono text-base transition-colors disabled:opacity-40"
        >
          {icon}
        </button>

        {/* Progress bar — clickable scrubber */}
        <div
          className="bg-fl-border relative h-1.5 flex-1 cursor-pointer"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="bg-fl-accent h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {duration > 0 && (
          <span className="text-fl-label text-fl-muted-3 shrink-0 font-mono tabular-nums">
            {Math.ceil(duration)}s
          </span>
        )}
      </div>
      {state === 'error' && (
        <p className="text-fl-label font-mono text-red-500">
          {t('audioError')}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page logic
// ---------------------------------------------------------------------------

function ListeningPage() {
  const t = useTranslations('listening')
  const tCommon = useTranslations('common')
  const activeLanguage = useLanguageStore((s) => s.activeLanguage)
  const {
    selectedWord,
    tooltipPos,
    saveState,
    handleTextMouseUp,
    handleSaveWord,
    dismissTooltip,
  } = useWordSave()

  const [pageState, setPageState] = useState<PageState>('loading')
  const [exercise, setExercise] = useState<ListeningExercise | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [history, setHistory] = useState<AttemptItem[]>([])
  const [historyTotal, setHistoryTotal] = useState(0)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [isReplay, setIsReplay] = useState(false)
  const generateAbortRef = useRef<AbortController | null>(null)

  // Cancel in-flight long-poll on unmount
  useEffect(() => {
    return () => {
      generateAbortRef.current?.abort()
    }
  }, [])

  const loadNext = useCallback(async () => {
    setPageState('loading')
    setError('')
    dismissTooltip()
    try {
      const res = await apiFetch('/api/listening/next')
      if (!res.ok) {
        setPageState('idle')
        return
      }
      const data = (await res.json()) as {
        available: boolean
        exercise?: ListeningExercise
      }
      if (data.available && data.exercise) {
        setExercise(data.exercise)
        setAnswers({})
        setResult(null)
        setIsReplay(false)
        setPageState('exercise')
      } else {
        setPageState('idle')
      }
    } catch {
      setError(t('errorLoading'))
      setPageState('idle')
    }
  }, [t, dismissTooltip])

  useEffect(() => {
    loadNext()
  }, [loadNext, activeLanguage?.code])

  async function handleGenerate() {
    const voice =
      typeof window !== 'undefined'
        ? (localStorage.getItem('tts_voice') ?? '')
        : ''
    const voiceQ = voice ? `?voice=${encodeURIComponent(voice)}` : ''
    try {
      const res = await apiFetch(`/api/listening/generate${voiceQ}`, {
        method: 'POST',
      })
      if (res.ok || res.status === 202) {
        setPageState('generating')
        // Single long-poll request — server waits (async) until exercise is ready.
        // AbortController cancels the request if the component unmounts first.
        const controller = new AbortController()
        generateAbortRef.current = controller
        const nextRes = await apiFetch('/api/listening/next?wait=true', {
          signal: controller.signal,
        })
        generateAbortRef.current = null
        if (nextRes.ok) {
          const data = (await nextRes.json()) as {
            available: boolean
            exercise?: ListeningExercise
          }
          if (data.available && data.exercise) {
            setExercise(data.exercise)
            setAnswers({})
            setResult(null)
            setIsReplay(false)
            setPageState('exercise')
            return
          }
        }
        setPageState('idle')
      } else {
        const d = (await res.json().catch(() => ({}))) as { detail?: string }
        setError(
          d.detail === 'No active study plan found'
            ? tCommon('noActivePlan')
            : t('errorLoading')
        )
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setPageState('idle')
    }
  }

  async function handleSubmit() {
    if (!exercise) return
    setSubmitting(true)
    setError('')
    try {
      const res = await apiFetch('/api/listening/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise_id: exercise.id,
          answers,
          replay: isReplay,
        }),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { detail?: string }
        setError(
          d.detail === 'already_attempted'
            ? t('alreadyAttempted')
            : t('errorSubmit')
        )
        return
      }
      const data = (await res.json()) as SubmitResult
      setResult(data)
      setPageState('results')
    } catch {
      setError(t('errorSubmit'))
    } finally {
      setSubmitting(false)
    }
  }

  async function loadHistory() {
    setPageState('history')
    try {
      const res = await apiFetch('/api/listening/history')
      if (res.ok) {
        const data = (await res.json()) as {
          items: AttemptItem[]
          total: number
        }
        setHistory(data.items)
        setHistoryTotal(data.total)
      }
    } catch {
      /* ignore */
    }
  }

  const allAnswered = exercise
    ? Object.keys(answers).length === exercise.questions.length
    : false

  // ── Loading ──────────────────────────────────────────────────────────────
  if (pageState === 'loading') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center md:min-h-screen">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          ● {tCommon('loading')}
        </span>
      </div>
    )
  }

  // ── Generating (poll) ─────────────────────────────────────────────────────
  if (pageState === 'generating') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-3 px-4 md:min-h-screen">
        <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
          ● {t('generating')}
        </span>
        <p className="text-fl-label text-fl-muted-4 max-w-xs text-center font-mono">
          {t('generatingDesc')}
        </p>
      </div>
    )
  }

  // ── History ───────────────────────────────────────────────────────────────
  if (pageState === 'history') {
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-6 md:min-h-0 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('historyTitle')}
          </h1>
          <button
            onClick={loadNext}
            className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            {t('practiceMore')}
          </button>
        </div>

        {history.length === 0 ? (
          <div className="border-fl-border bg-fl-surface border p-6 text-center">
            <p className="text-fl-muted-3 font-mono text-xs tracking-wide">
              {t('historyEmpty')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="border-fl-border bg-fl-surface border p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-fl-fg truncate font-mono text-xs font-bold tracking-wide">
                      {item.exercise.topic}
                    </p>
                    <p className="text-fl-label text-fl-muted-3 mt-0.5 font-mono tracking-widest uppercase">
                      {item.exercise.level} · {item.exercise.exercise_type}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-fl-fg font-mono text-xs font-bold">
                      {item.score}/{item.exercise.questions.length}
                    </p>
                    <p className="text-fl-label text-fl-accent font-mono">
                      +{item.xp_earned} XP
                    </p>
                  </div>
                </div>
                <p
                  className="text-fl-label text-fl-muted-2 border-fl-border word-selectable mb-3 cursor-text border-t pt-3 font-mono leading-relaxed select-text"
                  onMouseUp={() =>
                    handleTextMouseUp(item.text, item.exercise.level ?? 'B1')
                  }
                >
                  {item.text}
                </p>
                <button
                  onClick={() => {
                    setExercise(item.exercise)
                    setAnswers({})
                    setResult(null)
                    setIsReplay(true)
                    setPageState('exercise')
                  }}
                  className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
                >
                  {t('practiceAgain')}
                </button>
              </div>
            ))}
            {historyTotal > history.length && (
              <p className="text-fl-label text-fl-muted-4 py-2 text-center font-mono">
                {t('moreInHistory', { count: historyTotal - history.length })}
              </p>
            )}
          </div>
        )}

        {/* Word-save tooltip */}
        {selectedWord && (
          <WordTooltip
            word={selectedWord}
            pos={tooltipPos}
            saveState={saveState}
            onSave={() => handleSaveWord()}
            onDismiss={dismissTooltip}
            labels={{
              saveWord: tCommon('saveWord'),
              wordSaved: tCommon('wordSaved'),
              wordSaveError: tCommon('wordSaveError'),
            }}
          />
        )}
      </div>
    )
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (pageState === 'results' && result && exercise) {
    return (
      <div className="mx-auto min-h-screen max-w-2xl space-y-5 px-4 py-6 md:min-h-0 md:px-8">
        {/* Score card */}
        <div className="border-fl-border bg-fl-surface border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
                {t('resultsLabel')}
              </p>
              <p className="text-fl-fg mt-1 font-mono text-2xl font-bold">
                {result.score}/{exercise.questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
                XP
              </p>
              {isReplay ? (
                <p className="text-fl-label text-fl-muted-3 mt-1 font-mono">
                  {t('replayNoXp')}
                </p>
              ) : (
                <p className="text-fl-accent mt-1 font-mono text-xl font-bold">
                  +{result.xp_earned}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div>
          <p className="text-fl-label text-fl-muted-3 mb-2 font-mono tracking-widest uppercase">
            {t('transcript')}
          </p>
          <div className="border-fl-border bg-fl-surface border p-4">
            <p
              className="text-fl-fg word-selectable cursor-text font-mono text-xs leading-relaxed select-text"
              onMouseUp={() =>
                handleTextMouseUp(result.text, exercise?.level ?? 'B1')
              }
            >
              {result.text}
            </p>
          </div>
        </div>

        {/* Question review */}
        <div className="space-y-3">
          <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
            {t('review')}
          </p>
          {exercise.questions.map((q) => {
            const correctKey = result.correct_answers.find(
              (c) => c.index === q.index
            )?.correct
            const userAnswer = answers[String(q.index)]
            const isCorrect = userAnswer === correctKey
            return (
              <div
                key={q.index}
                className={`border p-4 ${
                  isCorrect
                    ? 'border-green-600/50 bg-green-950/30'
                    : 'border-red-600/50 bg-red-950/30'
                }`}
              >
                <p className="text-fl-fg mb-3 font-mono text-xs leading-relaxed">
                  {q.index + 1}. {q.question}
                </p>
                <div className="space-y-1">
                  {Object.entries(q.options).map(([k, v]) => (
                    <div
                      key={k}
                      className={`text-fl-label px-3 py-1.5 font-mono ${
                        k === correctKey
                          ? 'font-bold text-green-400'
                          : k === userAnswer && !isCorrect
                            ? 'text-red-400 line-through opacity-70'
                            : 'text-fl-muted-3'
                      }`}
                    >
                      <span className="font-bold">{k}.</span> {v}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={loadNext}
            className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 flex-1 border py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('nextExercise')}
          </button>
          <button
            onClick={loadHistory}
            className="border-fl-border bg-fl-surface text-fl-muted-2 hover:text-fl-fg hover:bg-fl-surface-2 border px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('viewHistory')}
          </button>
        </div>

        {/* Word-save tooltip */}
        {selectedWord && (
          <WordTooltip
            word={selectedWord}
            pos={tooltipPos}
            saveState={saveState}
            onSave={() => handleSaveWord()}
            onDismiss={dismissTooltip}
            labels={{
              saveWord: tCommon('saveWord'),
              wordSaved: tCommon('wordSaved'),
              wordSaveError: tCommon('wordSaveError'),
            }}
          />
        )}
      </div>
    )
  }

  // ── Idle (no exercises available) ─────────────────────────────────────────
  if (pageState === 'idle') {
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-6 md:min-h-0 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('title')}
          </h1>
          <button
            onClick={loadHistory}
            className="text-fl-label text-fl-muted-2 hover:text-fl-fg font-mono tracking-widest uppercase transition-colors"
          >
            {t('history')}
          </button>
        </div>

        {error && (
          <p className="text-fl-label mb-4 font-mono text-red-500">{error}</p>
        )}

        <div className="border-fl-border bg-fl-surface flex flex-col items-center gap-5 border p-8 text-center">
          <p className="text-fl-muted-2 font-mono text-xs tracking-wide">
            {t('noExercises')}
          </p>
          <button
            onClick={handleGenerate}
            className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 border px-8 py-3 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('generate')}
          </button>
        </div>
      </div>
    )
  }

  // ── Exercise ──────────────────────────────────────────────────────────────
  if (!exercise) return null

  return (
    <div className="mx-auto min-h-screen max-w-2xl space-y-5 px-4 py-6 md:min-h-0 md:px-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-fl-fg font-mono text-sm font-bold tracking-widest uppercase">
            {t('title')}
          </h1>
          <p className="text-fl-label text-fl-muted-3 mt-0.5 font-mono tracking-widest uppercase">
            {exercise.level} · {exercise.exercise_type}
          </p>
        </div>
        <button
          onClick={loadHistory}
          className="text-fl-label text-fl-muted-2 hover:text-fl-fg shrink-0 font-mono tracking-widest uppercase transition-colors"
        >
          {t('history')}
        </button>
      </div>

      {/* Topic */}
      <div className="border-fl-border bg-fl-surface border px-4 py-3">
        <p className="text-fl-label text-fl-muted-3 font-mono tracking-widest uppercase">
          {t('topic')}
        </p>
        <p className="text-fl-fg mt-1 font-mono text-xs font-bold">
          {exercise.topic}
        </p>
      </div>

      {/* Audio player */}
      <div>
        <p className="text-fl-label text-fl-muted-3 mb-2 font-mono tracking-widest uppercase">
          {t('listenLabel')}
        </p>
        <ExerciseAudioPlayer exerciseId={exercise.id} />
      </div>

      {/* Questions */}
      <div>
        <p className="text-fl-label text-fl-muted-3 mb-3 font-mono tracking-widest uppercase">
          {t('questionsLabel')}
        </p>
        <div className="space-y-4">
          {exercise.questions.map((q) => (
            <div
              key={q.index}
              className="border-fl-border bg-fl-surface border p-4"
            >
              <p className="text-fl-fg mb-3 font-mono text-xs leading-relaxed">
                {q.index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {Object.entries(q.options).map(([k, v]) => {
                  const selected = answers[String(q.index)] === k
                  return (
                    <button
                      key={k}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [String(q.index)]: k,
                        }))
                      }
                      className={`text-fl-label w-full border px-3 py-2 text-left font-mono transition-colors ${
                        selected
                          ? 'border-fl-accent bg-fl-surface-2 text-fl-fg'
                          : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg hover:bg-fl-surface-2'
                      }`}
                    >
                      <span className="font-bold">{k}.</span> {v}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-fl-label font-mono text-red-500">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
        className="border-fl-border bg-fl-surface text-fl-fg hover:bg-fl-surface-2 w-full border py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? tCommon('checking') : t('submit')}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Export — wrapped in PaywallGate (requires subscription)
// ---------------------------------------------------------------------------

export default function ListeningPageWrapper() {
  return (
    <MaintenanceGate>
      <PaywallGate>
        <ListeningPage />
      </PaywallGate>
    </MaintenanceGate>
  )
}
