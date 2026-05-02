const fs = require('fs')
const path = require('path')

const dst = path.join(__dirname, '../public/vad')
if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true })

// Copy vad-web ONNX models and worklet bundle
const vadSrc = path.join(__dirname, '../node_modules/@ricky0123/vad-web/dist')
if (fs.existsSync(vadSrc)) {
  fs.readdirSync(vadSrc)
    .filter((f) => f.endsWith('.onnx') || f.endsWith('.wasm') || f === 'vad.worklet.bundle.min.js')
    .forEach((f) => {
      fs.copyFileSync(path.join(vadSrc, f), path.join(dst, f))
      console.log(`[copy-vad-models] copied ${f}`)
    })
} else {
  console.warn('[copy-vad-models] @ricky0123/vad-web/dist not found — skipping.')
}

// Copy onnxruntime-web WASM files (needed when onnxWASMBasePath = '/vad/')
const ortSrc = path.join(__dirname, '../node_modules/onnxruntime-web/dist')
if (fs.existsSync(ortSrc)) {
  fs.readdirSync(ortSrc)
    .filter((f) => f.endsWith('.wasm') || f.endsWith('.mjs'))
    .forEach((f) => {
      fs.copyFileSync(path.join(ortSrc, f), path.join(dst, f))
      console.log(`[copy-vad-models] copied ${f}`)
    })
} else {
  console.warn('[copy-vad-models] onnxruntime-web/dist not found — skipping WASM copy.')
}
