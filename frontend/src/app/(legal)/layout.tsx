import type { ReactNode } from 'react'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-fl-bg min-h-screen px-4 py-12"
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--fl-dot) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  )
}
