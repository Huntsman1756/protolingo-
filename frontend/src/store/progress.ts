import { create } from 'zustand'

interface TodayLesson {
  id: number | null
  title: string
  lessonType: string
  week: number
  day: number
  objectives: string[]
  estimatedMinutes: number
}

interface ProgressStore {
  streak: number
  xp: number
  skills: Record<string, number>
  todayLessons: TodayLesson[]
  completedToday: number[]
  setProgress: (data: {
    streak: number
    xp: number
    skills: Record<string, number>
  }) => void
  setTodayLessons: (lessons: TodayLesson[]) => void
  completeLesson: (id: number) => void
}

export const useProgressStore = create<ProgressStore>((set) => ({
  streak: 0,
  xp: 0,
  skills: {},
  todayLessons: [],
  completedToday: [],
  setProgress: (data) =>
    set({ streak: data.streak, xp: data.xp, skills: data.skills }),
  setTodayLessons: (lessons) => set({ todayLessons: lessons }),
  completeLesson: (id) =>
    set((state) => ({
      completedToday: [...state.completedToday, id],
    })),
}))
