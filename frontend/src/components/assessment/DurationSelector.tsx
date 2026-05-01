'use client'

export interface DurationOption {
  weeks: number
  daysPerWeek: number
  label: string
  sublabel: string
  approxLessons: string
  intensity: string
}

export const DURATION_OPTIONS: DurationOption[] = [
  {
    weeks: 4,
    daysPerWeek: 5,
    label: '4 weeks',
    sublabel: 'Intensive',
    approxLessons: '~20 lessons',
    intensity: 'intensive',
  },
  {
    weeks: 8,
    daysPerWeek: 5,
    label: '8 weeks',
    sublabel: 'Standard',
    approxLessons: '~40 lessons',
    intensity: 'standard',
  },
  {
    weeks: 12,
    daysPerWeek: 4,
    label: '12 weeks',
    sublabel: 'Relaxed',
    approxLessons: '~48 lessons',
    intensity: 'relaxed',
  },
  {
    weeks: 16,
    daysPerWeek: 3,
    label: '16 weeks',
    sublabel: 'Very relaxed',
    approxLessons: '~48 lessons',
    intensity: 'very_relaxed',
  },
]

export const GOAL_OPTIONS = [
  { id: 'grammar', label: 'Grammar' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'reading', label: 'Reading' },
  { id: 'writing', label: 'Writing' },
  { id: 'conversation', label: 'Conversation' },
]

interface Props {
  selectedWeeks: number
  selectedGoals: string[]
  onSelectDuration: (option: DurationOption) => void
  onToggleGoal: (goal: string) => void
  onConfirm: () => void
  onBack: () => void
  cefr_level: string
  loading: boolean
}

export default function DurationSelector({
  selectedWeeks,
  selectedGoals,
  onSelectDuration,
  onToggleGoal,
  onConfirm,
  onBack,
  cefr_level,
  loading,
}: Props) {
  const selected = DURATION_OPTIONS.find((o) => o.weeks === selectedWeeks) ?? DURATION_OPTIONS[2]

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md border border-fl-border bg-fl-surface">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className="text-fl-label text-fl-muted-3">●</span>
          <span className="font-mono text-fl-label tracking-widest text-fl-muted-2 uppercase">
            Step 3 / 3 — Your programme
          </span>
        </div>

        <div className="p-8 space-y-8">
          {/* Duration */}
          <div>
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-3">
              How many weeks for level {cefr_level}?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.weeks}
                  onClick={() => onSelectDuration(opt)}
                  className={`border px-4 py-3 text-left transition-colors ${selectedWeeks === opt.weeks
                      ? 'bg-fl-fg text-fl-bg border-fl-fg'
                      : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  <p className="font-mono text-xs font-bold tracking-widest uppercase">
                    {opt.label}
                  </p>
                  <p
                    className={`font-mono text-fl-hint mt-0.5 ${selectedWeeks === opt.weeks ? 'opacity-70' : 'text-fl-muted-3'
                      }`}
                  >
                    {opt.sublabel} · {opt.approxLessons}
                  </p>
                  <p
                    className={`font-mono text-fl-hint mt-0.5 ${selectedWeeks === opt.weeks ? 'opacity-60' : 'text-fl-muted-3'
                      }`}
                  >
                    {opt.daysPerWeek} days/week
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <p className="font-mono text-fl-hint tracking-widest text-fl-muted-3 uppercase mb-3">
              Main goals (select all that apply)
            </p>
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => onToggleGoal(g.id)}
                  className={`px-3 py-1.5 font-mono text-xs tracking-widest uppercase border transition-colors ${selectedGoals.includes(g.id)
                      ? 'bg-fl-fg text-fl-bg border-fl-fg'
                      : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
                    }`}
                >
                  {selectedGoals.includes(g.id) ? '✓ ' : ''}{g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border border-fl-border px-4 py-3 font-mono text-fl-label text-fl-muted-1 tracking-wide space-y-1">
            <p>Level: <span className="text-fl-fg font-bold">{cefr_level}</span></p>
            <p>
              Duration: <span className="text-fl-fg">{selected.weeks} weeks</span>
              {' · '}
              <span className="text-fl-fg">{selected.daysPerWeek} days/week</span>
            </p>
            <p>
              Goals: <span className="text-fl-fg">
                {selectedGoals.length > 0 ? selectedGoals.join(', ') : 'none selected'}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="flex-1 border border-fl-border text-fl-muted-2 font-mono text-xs tracking-widest uppercase py-3 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={onConfirm}
              disabled={loading || selectedGoals.length === 0}
              className="flex-[2] bg-fl-fg text-fl-bg font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-fl-fg-bright disabled:opacity-40 transition-colors"
            >
              {loading ? '— Building plan…' : '— Start my plan →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
