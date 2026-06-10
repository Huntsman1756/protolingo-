export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
  if (!scriptUrl) return new Response(null, { status: 404 })

  const { path } = await params
  const base = new URL(scriptUrl).origin
  const url = `${base}/api/${path.join('/')}`

  try {
    const body = await req.text()
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': req.headers.get('Content-Type') ?? 'application/json',
        'User-Agent': req.headers.get('User-Agent') ?? '',
        'Accept-Language': req.headers.get('Accept-Language') ?? '*',
      },
      body,
    })
    return new Response(res.body, { status: res.status })
  } catch {
    return new Response(null, { status: 502 })
  }
}
