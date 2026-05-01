'use client'

interface Props {
  onBeginner: () => void
  onHasExperience: () => void
}

export default function BeginnerGate({ onBeginner, onHasExperience }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Step 1 / 3 — Your level
          </span>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="font-mono text-fl-body text-fl-fg">
              Have you studied English before?
            </p>
            <p className="font-mono text-fl-label text-fl-muted-3">
              This helps us start the quiz at the right level.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={onBeginner}
              className="w-full border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-4 hover:border-fl-border-2 hover:text-fl-fg transition-colors text-left px-5"
            >
              <span className="text-fl-muted-3 mr-3">○</span>
              I am a complete beginner
              <span className="block text-fl-hint text-fl-muted-3 normal-case mt-1 ml-6">
                I will start at A1 — no quiz needed.
              </span>
            </button>
            <button
              onClick={onHasExperience}
              className="w-full bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-4 hover:bg-fl-fg-bright transition-colors text-left px-5"
            >
              <span className="mr-3">●</span>
              Yes, I have some experience
              <span className="block text-fl-hint font-normal normal-case mt-1 ml-6 opacity-70">
                I will take a short adaptive quiz (≈12 questions).
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
