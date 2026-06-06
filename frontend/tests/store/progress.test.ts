import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore } from '@/store/progress'

describe('useProgressStore — initial state', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('starts with streak 0', () => {
    expect(useProgressStore.getState().streak).toBe(0)
  })

  it('starts with xp 0', () => {
    expect(useProgressStore.getState().xp).toBe(0)
  })

  it('starts with empty skills object', () => {
    expect(useProgressStore.getState().skills).toEqual({})
  })

  it('starts with empty todayLessons array', () => {
    expect(useProgressStore.getState().todayLessons).toEqual([])
  })

  it('starts with empty completedToday array', () => {
    expect(useProgressStore.getState().completedToday).toEqual([])
  })

  it('starts with empty currentUnitId', () => {
    expect(useProgressStore.getState().currentUnitId).toBe('')
  })

  it('starts with currentPlanDurationWeeks 12', () => {
    expect(useProgressStore.getState().currentPlanDurationWeeks).toBe(12)
  })

  it('starts with empty unitProgress object', () => {
    expect(useProgressStore.getState().unitProgress).toEqual({})
  })

  it('starts with levelTestUnlocked false', () => {
    expect(useProgressStore.getState().levelTestUnlocked).toBe(false)
  })

  it('starts with levelTestResult null', () => {
    expect(useProgressStore.getState().levelTestResult).toBeNull()
  })
})

describe('useProgressStore — setProgress', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('updates streak, xp, and skills from a full payload', () => {
    useProgressStore.getState().setProgress({
      streak: 7,
      xp: 1500,
      skills: { vocabulary: 0.8, grammar: 0.5 },
    })

    const state = useProgressStore.getState()
    expect(state.streak).toBe(7)
    expect(state.xp).toBe(1500)
    expect(state.skills).toEqual({ vocabulary: 0.8, grammar: 0.5 })
  })

  it('handles zero values for streak and xp', () => {
    useProgressStore.setState({ streak: 5, xp: 500, skills: { reading: 0.4 } })

    useProgressStore.getState().setProgress({
      streak: 0,
      xp: 0,
      skills: { reading: 0.4 },
    })

    const state = useProgressStore.getState()
    expect(state.streak).toBe(0)
    expect(state.xp).toBe(0)
    expect(state.skills).toEqual({ reading: 0.4 })
  })

  it('handles empty skills object', () => {
    useProgressStore.getState().setProgress({
      streak: 1,
      xp: 100,
      skills: {},
    })

    expect(useProgressStore.getState().skills).toEqual({})
  })

  it('overwrites existing skills rather than merging', () => {
    useProgressStore.setState({ skills: { old_skill: 0.9 } })

    useProgressStore.getState().setProgress({
      streak: 3,
      xp: 300,
      skills: { new_skill: 0.7 },
    })

    expect(useProgressStore.getState().skills).toEqual({ new_skill: 0.7 })
  })

  it('handles a skill with value exactly 1.0', () => {
    useProgressStore.getState().setProgress({
      streak: 10,
      xp: 2000,
      skills: { fluency: 1.0 },
    })

    expect(useProgressStore.getState().skills).toEqual({ fluency: 1.0 })
  })
})

describe('useProgressStore — setTodayLessons', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('sets the todayLessons array', () => {
    const lessons = [
      {
        id: 1,
        title: 'Greetings',
        lessonType: 'vocabulary',
        week: 1,
        day: 1,
        objectives: ['Learn greetings'],
        estimatedMinutes: 15,
      },
      {
        id: 2,
        title: 'Numbers',
        lessonType: 'vocabulary',
        week: 1,
        day: 2,
        objectives: ['Learn numbers'],
        estimatedMinutes: 10,
      },
    ]

    useProgressStore.getState().setTodayLessons(lessons)
    expect(useProgressStore.getState().todayLessons).toEqual(lessons)
  })

  it('replaces existing lessons entirely', () => {
    useProgressStore.getState().setTodayLessons([
      { id: 1, title: 'A', lessonType: 'voc', week: 1, day: 1, objectives: [], estimatedMinutes: 5 },
    ])
    useProgressStore.getState().setTodayLessons([
      { id: 2, title: 'B', lessonType: 'gram', week: 1, day: 2, objectives: [], estimatedMinutes: 10 },
    ])

    expect(useProgressStore.getState().todayLessons).toHaveLength(1)
    expect(useProgressStore.getState().todayLessons[0].id).toBe(2)
  })

  it('sets an empty array', () => {
    useProgressStore.getState().setTodayLessons([
      { id: 1, title: 'X', lessonType: 'voc', week: 1, day: 1, objectives: [], estimatedMinutes: 5 },
    ])
    useProgressStore.getState().setTodayLessons([])

    expect(useProgressStore.getState().todayLessons).toEqual([])
  })
})

describe('useProgressStore — completeLesson', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('adds a lesson id to completedToday', () => {
    useProgressStore.getState().completeLesson(1)
    expect(useProgressStore.getState().completedToday).toEqual([1])
  })

  it('adds multiple distinct lesson ids', () => {
    useProgressStore.getState().completeLesson(1)
    useProgressStore.getState().completeLesson(2)
    useProgressStore.getState().completeLesson(3)

    expect(useProgressStore.getState().completedToday).toEqual([1, 2, 3])
  })

  it('allows duplicate ids (append, no dedup)', () => {
    useProgressStore.getState().completeLesson(1)
    useProgressStore.getState().completeLesson(1)

    expect(useProgressStore.getState().completedToday).toEqual([1, 1])
  })

  it('does not mutate previous state (immutability)', () => {
    useProgressStore.getState().completeLesson(5)

    const firstState = useProgressStore.getState().completedToday
    useProgressStore.getState().completeLesson(6)

    expect(firstState).toEqual([5])
    expect(useProgressStore.getState().completedToday).toEqual([5, 6])
  })
})

describe('useProgressStore — setCurrentUnit', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('updates currentUnitId', () => {
    useProgressStore.getState().setCurrentUnit('unit-1')
    expect(useProgressStore.getState().currentUnitId).toBe('unit-1')
  })

  it('accepts empty string', () => {
    useProgressStore.getState().setCurrentUnit('unit-1')
    useProgressStore.getState().setCurrentUnit('')

    expect(useProgressStore.getState().currentUnitId).toBe('')
  })

  it('switches between units', () => {
    useProgressStore.getState().setCurrentUnit('unit-a')
    expect(useProgressStore.getState().currentUnitId).toBe('unit-a')

    useProgressStore.getState().setCurrentUnit('unit-b')
    expect(useProgressStore.getState().currentUnitId).toBe('unit-b')
  })
})

describe('useProgressStore — setPlanDuration', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('updates plan duration weeks', () => {
    useProgressStore.getState().setPlanDuration(24)
    expect(useProgressStore.getState().currentPlanDurationWeeks).toBe(24)
  })

  it('handles zero weeks', () => {
    useProgressStore.getState().setPlanDuration(0)
    expect(useProgressStore.getState().currentPlanDurationWeeks).toBe(0)
  })

  it('handles large values', () => {
    useProgressStore.getState().setPlanDuration(999)
    expect(useProgressStore.getState().currentPlanDurationWeeks).toBe(999)
  })
})

describe('useProgressStore — updateUnitProgress', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('creates a new unit progress entry with unitId', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { completedLessons: 3, totalLessons: 10 })

    const state = useProgressStore.getState()
    expect(state.unitProgress['unit-1']).toBeDefined()
    expect(state.unitProgress['unit-1'].unitId).toBe('unit-1')
    expect(state.unitProgress['unit-1'].completedLessons).toBe(3)
    expect(state.unitProgress['unit-1'].totalLessons).toBe(10)
  })

  it('merges partial updates into an existing unit entry', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { completedLessons: 3, totalLessons: 10 })

    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { completedLessons: 5 })

    const state = useProgressStore.getState()
    expect(state.unitProgress['unit-1'].completedLessons).toBe(5)
    expect(state.unitProgress['unit-1'].totalLessons).toBe(10)
    expect(state.unitProgress['unit-1'].unitId).toBe('unit-1')
  })

  it('merges competencies into an existing unit entry', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { completedLessons: 2, totalLessons: 8 })

    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { competencies: { grammar: 0.7, vocabulary: 0.8 } })

    const state = useProgressStore.getState()
    expect(state.unitProgress['unit-1'].competencies).toEqual({
      grammar: 0.7,
      vocabulary: 0.8,
    })
    expect(state.unitProgress['unit-1'].completedLessons).toBe(2)
    expect(state.unitProgress['unit-1'].totalLessons).toBe(8)
  })

  it('overwrites competencies when updated again', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { competencies: { grammar: 0.7 } })

    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { competencies: { vocabulary: 0.9 } })

    expect(useProgressStore.getState().unitProgress['unit-1'].competencies).toEqual({
      vocabulary: 0.9,
    })
  })

  it('tracks multiple units independently', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-1', { completedLessons: 5, totalLessons: 10 })
    useProgressStore
      .getState()
      .updateUnitProgress('unit-2', { completedLessons: 2, totalLessons: 6 })

    const state = useProgressStore.getState()
    expect(state.unitProgress['unit-1'].completedLessons).toBe(5)
    expect(state.unitProgress['unit-2'].completedLessons).toBe(2)
    expect(Object.keys(state.unitProgress)).toHaveLength(2)
  })

  it('always includes unitId in the merged result', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-99', { completedLessons: 0, totalLessons: 20 })

    expect(useProgressStore.getState().unitProgress['unit-99'].unitId).toBe('unit-99')
  })

  it('handles zero values in progress', () => {
    useProgressStore
      .getState()
      .updateUnitProgress('unit-x', { completedLessons: 0, totalLessons: 0 })

    const state = useProgressStore.getState()
    expect(state.unitProgress['unit-x'].completedLessons).toBe(0)
    expect(state.unitProgress['unit-x'].totalLessons).toBe(0)
  })
})

describe('useProgressStore — unlockLevelTest', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('sets levelTestUnlocked to true', () => {
    useProgressStore.getState().unlockLevelTest()
    expect(useProgressStore.getState().levelTestUnlocked).toBe(true)
  })

  it('stays true on repeated calls', () => {
    useProgressStore.getState().unlockLevelTest()
    useProgressStore.getState().unlockLevelTest()

    expect(useProgressStore.getState().levelTestUnlocked).toBe(true)
  })
})

describe('useProgressStore — setLevelTestResult', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('sets the level test result', () => {
    const result = { score: 85, recommendation: 'advance' as const, nextLevel: 'B2' }
    useProgressStore.getState().setLevelTestResult(result)

    expect(useProgressStore.getState().levelTestResult).toEqual(result)
  })

  it('sets extend recommendation', () => {
    const result = { score: 60, recommendation: 'extend' as const, nextLevel: null }
    useProgressStore.getState().setLevelTestResult(result)

    expect(useProgressStore.getState().levelTestResult).toEqual(result)
  })

  it('sets repeat recommendation with a next level', () => {
    const result = { score: 30, recommendation: 'repeat' as const, nextLevel: 'A2' }
    useProgressStore.getState().setLevelTestResult(result)

    expect(useProgressStore.getState().levelTestResult).toEqual(result)
  })

  it('overwrites a previous result', () => {
    useProgressStore.getState().setLevelTestResult({
      score: 70,
      recommendation: 'extend',
      nextLevel: 'B1',
    })
    useProgressStore.getState().setLevelTestResult({
      score: 90,
      recommendation: 'advance',
      nextLevel: 'C1',
    })

    const result = useProgressStore.getState().levelTestResult
    expect(result?.score).toBe(90)
    expect(result?.recommendation).toBe('advance')
    expect(result?.nextLevel).toBe('C1')
  })

  it('handles null nextLevel', () => {
    useProgressStore.getState().setLevelTestResult({
      score: 50,
      recommendation: 'repeat',
      nextLevel: null,
    })

    expect(useProgressStore.getState().levelTestResult?.nextLevel).toBeNull()
  })

  it('handles score of 0', () => {
    useProgressStore.getState().setLevelTestResult({
      score: 0,
      recommendation: 'repeat',
      nextLevel: 'A1',
    })

    expect(useProgressStore.getState().levelTestResult?.score).toBe(0)
  })

  it('handles score of 100', () => {
    useProgressStore.getState().setLevelTestResult({
      score: 100,
      recommendation: 'advance',
      nextLevel: 'C2',
    })

    expect(useProgressStore.getState().levelTestResult?.score).toBe(100)
    expect(useProgressStore.getState().levelTestResult?.recommendation).toBe('advance')
  })
})

describe('useProgressStore — state transitions / interactions', () => {
  beforeEach(() => {
    useProgressStore.setState({
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
    })
  })

  it('setProgress does not affect other state fields', () => {
    useProgressStore.setState({
      todayLessons: [{ id: 1, title: 'A', lessonType: 'voc', week: 1, day: 1, objectives: [], estimatedMinutes: 5 }],
      completedToday: [1],
      levelTestUnlocked: true,
    })

    useProgressStore.getState().setProgress({
      streak: 3,
      xp: 300,
      skills: { reading: 0.6 },
    })

    const state = useProgressStore.getState()
    expect(state.todayLessons).toHaveLength(1)
    expect(state.completedToday).toEqual([1])
    expect(state.levelTestUnlocked).toBe(true)
    expect(state.streak).toBe(3)
    expect(state.xp).toBe(300)
  })

  it('unlockLevelTest does not affect other fields', () => {
    useProgressStore.setState({
      streak: 5,
      xp: 500,
      skills: { grammar: 0.3 },
      currentUnitId: 'unit-5',
    })

    useProgressStore.getState().unlockLevelTest()

    const state = useProgressStore.getState()
    expect(state.levelTestUnlocked).toBe(true)
    expect(state.streak).toBe(5)
    expect(state.xp).toBe(500)
    expect(state.currentUnitId).toBe('unit-5')
  })

  it('setLevelTestResult does not affect other fields', () => {
    useProgressStore.setState({
      streak: 8,
      currentUnitId: 'unit-3',
      unitProgress: { 'unit-3': { unitId: 'unit-3', completedLessons: 4, totalLessons: 10, competencies: {} } },
    })

    useProgressStore.getState().setLevelTestResult({
      score: 88,
      recommendation: 'advance',
      nextLevel: 'B2',
    })

    const state = useProgressStore.getState()
    expect(state.streak).toBe(8)
    expect(state.currentUnitId).toBe('unit-3')
    expect(state.unitProgress['unit-3'].completedLessons).toBe(4)
    expect(state.levelTestResult?.score).toBe(88)
  })

  it('simulates a full new-user onboarding flow', () => {
    // Initial: all defaults
    expect(useProgressStore.getState().streak).toBe(0)

    // Step 1: first login — set progress from backend
    useProgressStore.getState().setProgress({
      streak: 1,
      xp: 50,
      skills: { vocabulary: 0.1 },
    })
    expect(useProgressStore.getState().streak).toBe(1)

    // Step 2: lessons load
    useProgressStore
      .getState()
      .setTodayLessons([
        { id: 10, title: 'Intro', lessonType: 'vocabulary', week: 1, day: 1, objectives: ['hello'], estimatedMinutes: 10 },
      ])

    // Step 3: complete a lesson
    useProgressStore.getState().completeLesson(10)
    expect(useProgressStore.getState().completedToday).toContain(10)

    // Step 4: update unit progress
    useProgressStore
      .getState()
      .updateUnitProgress('u1', { completedLessons: 1, totalLessons: 20 })

    // Step 5: unlock test
    useProgressStore.getState().unlockLevelTest()

    const final = useProgressStore.getState()
    expect(final.streak).toBe(1)
    expect(final.xp).toBe(50)
    expect(final.completedToday).toEqual([10])
    expect(final.unitProgress['u1'].completedLessons).toBe(1)
    expect(final.levelTestUnlocked).toBe(true)
  })
})
