'use client'

import { useRouter } from 'next/navigation'

interface Props {
  planId: number
  level: string
}

export default function LevelTestBanner({ planId, level }: Props) {
  const router = useRouter()

  return (
    <div className="border border-fl-fg bg-fl-surface mt-2">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-fg/20">
        <span className="font-mono text-fl-label text-fl-fg">⊞</span>
        <span className="font-mono text-fl-label tracking-widest text-fl-fg uppercase">
          Level {level} Complete — Take the Level Test
        </span>
      </div>
      <div className="p-6 space-y-4">
        <p className="font-mono text-fl-label text-fl-muted-1 leading-relaxed">
          You have finished all units for level{' '}
          <span className="text-fl-fg font-bold">{level}</span>. Take the level
          completion test to confirm your progress and unlock the next level.
        </p>
        <p className="font-mono text-fl-hint text-fl-muted-3">
          The test takes approximately 20 minutes and covers grammar, vocabulary, and reading.
        </p>
        <button
          onClick={() => router.push(`/assessment/level-test?plan=${planId}`)}
          className="bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-fl-fg-bright transition-colors"
        >
          — Begin Level Test →
        </button>
      </div>
    </div>
  )
}
