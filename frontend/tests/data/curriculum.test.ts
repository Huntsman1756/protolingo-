import { describe, it, expect } from 'vitest'
import { getCurriculum, CEFR_LEVELS } from '@/data/curriculum'

describe('getCurriculum — multi-language dispatcher', () => {
  it('returns English curriculum for en-US', () => {
    const c = getCurriculum('en-US')
    expect(c.A1).toBeDefined()
    expect(c.C2).toBeDefined()
  })

  it('returns English curriculum for en-GB', () => {
    const c = getCurriculum('en-GB')
    expect(c.A1).toBeDefined()
  })

  it('returns Spanish curriculum for es-ES', () => {
    const c = getCurriculum('es-ES')
    expect(c.A1).toBeDefined()
    expect(c.A1.title).toBe('Beginner Spanish')
  })

  it('returns Italian curriculum for it-IT', () => {
    const c = getCurriculum('it-IT')
    expect(c.A1).toBeDefined()
    expect(c.A1.title).toBe('Beginner Italian')
  })

  it('returns Portuguese curriculum for pt-PT', () => {
    const c = getCurriculum('pt-PT')
    expect(c.A1).toBeDefined()
    expect(c.A1.title).toBe('Beginner Portuguese')
  })

  it('falls back to English for unsupported languages', () => {
    const c = getCurriculum('fr-FR')
    expect(c.A1).toBeDefined()
    expect(c.A1.title).toBe('Beginner English')
  })

  it('all 5 language codes have complete CEFR levels', () => {
    for (const code of ['en-US', 'en-GB', 'es-ES', 'it-IT', 'pt-PT']) {
      const c = getCurriculum(code)
      for (const level of CEFR_LEVELS) {
        expect(c[level]).toBeDefined()
        expect(c[level].level).toBe(level)
      }
    }
  })
})
