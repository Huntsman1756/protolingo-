import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('returns single class unchanged', () => {
    expect(cn('bg-red-500')).toBe('bg-red-500')
  })

  it('merges multiple classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('filters out falsy values', () => {
    expect(cn('a', false && 'b', 'c', undefined, null, '')).toBe('a c')
  })

  it('resolves tailwind conflicts (twMerge behavior)', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    expect(cn('base', isActive && 'active')).toBe('base active')
    expect(cn('base', !isActive && 'inactive')).toBe('base')
  })

  it('handles array input', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })

  it('handles object input', () => {
    expect(cn({ active: true, disabled: false })).toBe('active')
  })

  it('handles mixed inputs', () => {
    expect(cn('base', ['flex', 'col'], { hidden: false, visible: true })).toBe(
      'base flex col visible'
    )
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })

  it('handles undefined and null gracefully', () => {
    expect(cn('a', undefined, null, 'b')).toBe('a b')
  })
})
