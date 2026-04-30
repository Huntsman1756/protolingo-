'use client'

import { useEffect } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(2px)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm border border-[#2a2a2a] bg-[#111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#2a2a2a]">
          <span className={`text-[10px] ${danger ? 'text-[#ff6b6b]' : 'text-[#777]'}`}>●</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#777]">{title}</span>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="font-mono text-xs text-[#aaa] leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#2a2a2a] py-3 font-mono text-[10px] font-bold tracking-widest uppercase text-[#777] hover:border-[#444] hover:text-[#f5f5f5] transition-colors"
          >
            — Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors ${danger
                ? 'bg-[#ff3b3b] text-white hover:bg-[#ff5555]'
                : 'bg-[#f5f5f5] text-[#0a0a0a] hover:bg-white'
              }`}
          >
            — {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
