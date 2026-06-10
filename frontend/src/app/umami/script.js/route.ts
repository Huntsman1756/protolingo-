export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
  if (!url) return new Response('Umami not configured', { status: 404 })

  try {
    const res = await fetch(url)
    if (!res.ok) return new Response(null, { status: res.status })
    const body = await res.text()
    return new Response(body, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    return new Response(null, { status: 502 })
  }
}
