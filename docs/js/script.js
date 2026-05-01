function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre')
  navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
    btn.textContent = 'Copied!'
    btn.classList.add('copied')
    setTimeout(() => {
      btn.textContent = 'Copy'
      btn.classList.remove('copied')
    }, 2000)
  })
}