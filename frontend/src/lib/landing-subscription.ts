let subscriptionStatusPromise: Promise<boolean> | null = null

export async function hasActiveLandingSubscription(): Promise<boolean> {
  if (subscriptionStatusPromise) return subscriptionStatusPromise

  subscriptionStatusPromise = (async () => {
    try {
      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })
      if (!refreshRes.ok) return false

      const { access_token } = await refreshRes.json()

      const meRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${access_token}` },
        credentials: 'include',
      })
      if (!meRes.ok) return false

      const me = await meRes.json()
      const status: string = me.subscription_status ?? 'none'
      return status === 'active' || status === 'trialing'
    } catch {
      return false
    }
  })()

  return subscriptionStatusPromise
}
