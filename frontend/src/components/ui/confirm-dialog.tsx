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
        className="w-full max-w-sm border border-fl-border bg-fl-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-fl-border">
          <span className={`text-fl-label ${danger ? 'text-fl-error-fg' : 'text-fl-muted-2'}`}>●</span>
          <span className="font-mono text-fl-label tracking-widest uppercase text-fl-muted-2">{title}</span>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="font-mono text-xs text-fl-muted-0 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-fl-border py-3 font-mono text-fl-label font-bold tracking-widest uppercase text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg transition-colors"
          >
            — Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 font-mono text-fl-label font-bold tracking-widest uppercase transition-colors ${danger
                ? 'bg-fl-error text-fl-fg-bright hover:bg-fl-error-hover'
                : 'bg-fl-fg text-fl-bg hover:bg-fl-fg-bright'
              }`}
          >
            — {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
