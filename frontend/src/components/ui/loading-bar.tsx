'use client'

import { useLoadingStore } from '@/store/loading'

export function LoadingBar() {
  const loading = useLoadingStore((s) => s.count > 0)

  if (!loading) return null

  return (
    <div className="fixed top-0 right-0 left-0 z-[300] h-px overflow-hidden">
      <div
        className="bg-fl-fg animate-loading-bar h-full"
        style={{ width: '100%' }}
      />
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(-20%); }
          100% { transform: translateX(0%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
