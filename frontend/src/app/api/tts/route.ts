/**
 * TTS proxy — forwards the request to the backend and streams back binary MP3.
 *
 * A dedicated Route Handler is needed because the generic next.config.ts rewrite
 * would return the response as text/event-stream, breaking binary audio data.
 */

import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text()

  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const auth = request.headers.get('Authorization')
  if (auth) headers.set('Authorization', auth)

  const cookie = request.headers.get('Cookie')
  if (cookie) headers.set('Cookie', cookie)

  const backendRes = await fetch(`${BACKEND_URL}/api/tts`, {
    method: 'POST',
    headers,
    body,
  })

  if (!backendRes.ok) {
    const errorText = await backendRes.text()
    return new NextResponse(errorText, { status: backendRes.status })
  }

  const audioBuffer = await backendRes.arrayBuffer()
  return new NextResponse(audioBuffer, {
    status: 200,
    headers: { 'Content-Type': 'audio/mpeg' },
  })
}
