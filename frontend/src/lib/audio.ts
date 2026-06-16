/**
 * Encodes a Float32Array of mono PCM samples into a standard WAV ArrayBuffer.
 * VAD delivers samples at 16 000 Hz; STT service accepts audio/wav.
 */
export function float32ToWav(
  samples: Float32Array,
  sampleRate: number
): ArrayBuffer {
  const numChannels = 1
  const bitsPerSample = 16
  const blockAlign = numChannels * (bitsPerSample / 8)
  const byteRate = sampleRate * blockAlign
  const dataSize = samples.length * blockAlign
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  function writeStr(offset: number, s: string) {
    for (let i = 0; i < s.length; i++)
      view.setUint8(offset + i, s.charCodeAt(i))
  }

  writeStr(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeStr(8, 'WAVE')
  writeStr(12, 'fmt ')
  view.setUint32(16, 16, true) // PCM chunk size
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)
  writeStr(36, 'data')
  view.setUint32(40, dataSize, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
    offset += 2
  }

  return buffer
}

export interface AudioQueue {
  enqueue: (arrayBuffer: ArrayBuffer) => Promise<void>
  cancel: () => void
}

const MAX_PENDING_CHUNKS = 8

/**
 * Creates a gapless audio playback queue backed by the Web Audio API.
 * Each ArrayBuffer is decoded (MP3/WAV/OGG accepted) and scheduled to play
 * immediately after the previous chunk, avoiding gaps between TTS segments.
 *
 * The AudioContext must be created during a user gesture to satisfy browser
 * autoplay policies.
 */
export function createAudioQueue(ctx: AudioContext): AudioQueue {
  // nextTime tracks when the next chunk should start (in AudioContext time).
  // Using a closure variable (not module-level) so multiple instances are safe.
  let nextTime = 0
  let generation = 0
  const sources: AudioBufferSourceNode[] = []
  const pendingChunks: ArrayBuffer[] = []
  let draining = false
  // Serialize decoding+scheduling so that chunks are always played in the
  // exact order they were enqueued, regardless of how long decodeAudioData
  // takes for each chunk. Without this, a short chunk 2 could decode faster
  // than chunk 1 and get scheduled first, causing out-of-order playback.
  let chain: Promise<void> = Promise.resolve()

  async function _decode(arrayBuffer: ArrayBuffer, generationToken: number): Promise<void> {
    // Resume context if it was suspended (can happen on iOS Safari)
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    let decoded: AudioBuffer
    try {
      decoded = await ctx.decodeAudioData(arrayBuffer.slice(0))
    } catch {
      // Corrupt MP3, unsupported codec, or AudioContext already closed.
      // Skip this chunk rather than breaking the entire playback chain.
      return
    }
    if (generationToken !== generation) return

    let source: AudioBufferSourceNode
    try {
      source = ctx.createBufferSource()
      source.buffer = decoded
      source.connect(ctx.destination)
    } catch {
      return
    }

    // Schedule with a tiny lead to avoid underrun; never schedule in the past
    const startAt = Math.max(ctx.currentTime + 0.05, nextTime)
    try {
      source.start(startAt)
    } catch {
      return
    }
    if (generationToken !== generation) {
      try {
        source.stop(0)
      } catch {
        // ignore
      }
      return
    }
    nextTime = startAt + decoded.duration

    sources.push(source)
    source.onended = () => {
      const idx = sources.indexOf(source)
      if (idx !== -1) sources.splice(idx, 1)
    }
  }

  async function _drain(generationToken: number): Promise<void> {
    try {
      while (generationToken === generation && pendingChunks.length) {
        const nextChunk = pendingChunks.shift()
        if (!nextChunk) break
        await _decode(nextChunk, generationToken)
      }
    } finally {
      if (generationToken === generation && pendingChunks.length === 0) {
        draining = false
      }
    }
  }

  function enqueue(arrayBuffer: ArrayBuffer): Promise<void> {
    const generationToken = generation
    pendingChunks.push(arrayBuffer)
    while (pendingChunks.length > MAX_PENDING_CHUNKS) {
      pendingChunks.shift()
    }
    if (!draining) {
      draining = true
      chain = chain.then(() => _drain(generationToken)).catch(() => {})
    }
    return chain
  }

  function cancel(): void {
    generation += 1
    pendingChunks.length = 0
    for (const s of sources) {
      try {
        s.stop(0)
      } catch {
        // already stopped — ignore
      }
    }
    sources.length = 0
    nextTime = 0
    draining = false
    chain = Promise.resolve()
  }

  return { enqueue, cancel }
}
