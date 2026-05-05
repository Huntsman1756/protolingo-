import type { ReactNode } from 'react'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen bg-fl-bg px-4 py-12"
      style={{ backgroundImage: 'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  )
}
