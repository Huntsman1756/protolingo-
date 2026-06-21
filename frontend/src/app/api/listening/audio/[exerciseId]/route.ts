/**
 * Listening audio proxy — forwards the request to the backend and streams back binary MP3.
 *
 * A dedicated Route Handler is needed because the generic next.config.ts rewrite
 * would break binary audio data (same issue as TTS).
 */

import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
): Promise<NextResponse> {
  const { exerciseId } = await params

  const headers = new Headers()

  const auth = request.headers.get('Authorization')
  if (auth) headers.set('Authorization', auth)

  const cookie = request.headers.get('Cookie')
  if (cookie) headers.set('Cookie', cookie)

  const backendRes = await fetch(
    `${BACKEND_URL}/api/listening/audio/${exerciseId}`,
    {
      method: 'GET',
      headers,
    }
  )

  if (!backendRes.ok) {
    const errorText = await backendRes.text()
    return new NextResponse(errorText, { status: backendRes.status })
  }

  const audioBuffer = await backendRes.arrayBuffer()

  const outHeaders = new Headers()
  outHeaders.set('Content-Type', 'audio/mpeg')
  outHeaders.set('Accept-Ranges', 'bytes')

  return new NextResponse(audioBuffer, {
    status: 200,
    headers: outHeaders,
  })
}
