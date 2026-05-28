import { create } from 'zustand'

interface TodayLesson {
  id: number | null
  title: string
  lessonType: string
  week: number
  day: number
  objectives: string[]
  estimatedMinutes: number
  unitId?: string
  isCompleted?: boolean
}

interface UnitProgress {
  unitId: string
  completedLessons: number
  totalLessons: number
  competencies: Record<string, number> // competency text → score 0–1
}

export type LevelTestRecommendation = 'advance' | 'extend' | 'repeat'

interface LevelTestResult {
  score: number
  recommendation: LevelTestRecommendation
  nextLevel: string | null
}

interface ProgressStore {
  streak: number
  xp: number
  skills: Record<string, number>
  todayLessons: TodayLesson[]
  completedToday: number[]
  // Curriculum-aware fields
  currentUnitId: string
  currentPlanDurationWeeks: number
  unitProgress: Record<string, UnitProgress>
  levelTestUnlocked: boolean
  levelTestResult: LevelTestResult | null
  // Actions
  setProgress: (data: {
    streak: number
    xp: number
    skills: Record<string, number>
  }) => void
  setTodayLessons: (lessons: TodayLesson[]) => void
  completeLesson: (id: number) => void
  setCurrentUnit: (unitId: string) => void
  setPlanDuration: (weeks: number) => void
  updateUnitProgress: (unitId: string, progress: Partial<UnitProgress>) => void
  unlockLevelTest: () => void
  setLevelTestResult: (result: LevelTestResult) => void
}

export const useProgressStore = create<ProgressStore>((set) => ({
  streak: 0,
  xp: 0,
  skills: {},
  todayLessons: [],
  completedToday: [],
  currentUnitId: '',
  currentPlanDurationWeeks: 12,
  unitProgress: {},
  levelTestUnlocked: false,
  levelTestResult: null,
  setProgress: (data) =>
    set({ streak: data.streak, xp: data.xp, skills: data.skills }),
  setTodayLessons: (lessons) => set({ todayLessons: lessons }),
  completeLesson: (id) =>
    set((state) => ({ completedToday: [...state.completedToday, id] })),
  setCurrentUnit: (unitId) => set({ currentUnitId: unitId }),
  setPlanDuration: (weeks) => set({ currentPlanDurationWeeks: weeks }),
  updateUnitProgress: (unitId, progress) =>
    set((state) => ({
      unitProgress: {
        ...state.unitProgress,
        [unitId]: { ...state.unitProgress[unitId], ...progress, unitId },
      },
    })),
  unlockLevelTest: () => set({ levelTestUnlocked: true }),
  setLevelTestResult: (result) => set({ levelTestResult: result }),
}))
