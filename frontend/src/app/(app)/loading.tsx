// This file is used by Next.js App Router as the Suspense fallback for the
// entire (app) route group. It is shown on hard navigations before the client
// bundle hydrates and the layout's own initializing state takes over.
export default function AppLoading() {
  return (
    <div className="bg-fl-bg bg-dot-grid flex min-h-screen items-center justify-center">
      <span className="text-fl-muted-2 animate-pulse font-mono text-xs tracking-widest uppercase">
        ● loading
      </span>
    </div>
  )
}
