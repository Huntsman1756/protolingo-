'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAuthStore } from '@/store/auth'

interface AudioPlayerProps {
  text: string
  voice?: string
  size?: 'sm' | 'md'
  className?: string
}

type PlayerState = 'idle' | 'loading' | 'playing' | 'error'

export function AudioPlayer({ text, voice, size = 'sm', className = '' }: AudioPlayerProps) {
  const [state, setState] = useState<PlayerState>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const accessToken = useAuthStore((s) => s.accessToken)
  const t = useTranslations('audioPlayer')

  async function handleClick() {
    if (state === 'loading') return

    if (state === 'playing') {
      audioRef.current?.pause()
      audioRef.current = null
      setState('idle')
      return
    }

    setState('loading')
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ text, voice }),
      })
      if (!res.ok) throw new Error(`TTS error ${res.status}`)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      setState('playing')

      await audio.play()

      audio.onended = () => {
        URL.revokeObjectURL(url)
        audioRef.current = null
        setState('idle')
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        audioRef.current = null
        setState('error')
        setTimeout(() => setState('idle'), 2000)
      }
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 2000)
    }
  }

  const sizeClass = size === 'sm' ? 'px-2 py-1 text-fl-hint' : 'px-3 py-2 text-xs'

  const label =
    state === 'loading' ? '...' :
      state === 'playing' ? '■' :
        state === 'error' ? '✕' : '▶'

  const colorClass =
    state === 'playing' ? 'border-fl-border-2 text-fl-fg' :
      state === 'loading' ? 'border-fl-border text-fl-muted-3 animate-pulse' :
        state === 'error' ? 'border-fl-error/40 text-fl-error-fg' :
          'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'

  return (
    <button
      onClick={handleClick}
      title={state === 'playing' ? t('stop') : t('listen')}
      aria-label={state === 'playing' ? t('ariaStop') : t('ariaListen')}
      className={`border font-mono tracking-widest uppercase transition-colors ${colorClass} ${sizeClass} ${className}`}
    >
      {label}
    </button>
  )
}
