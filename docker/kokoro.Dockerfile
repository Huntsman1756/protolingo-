# Custom Kokoro-FastAPI for Blackwell GPUs (RTX 5000 series, sm_120)
# The upstream image ships PyTorch <= 2.5 which only supports up to sm_90.
# This layer upgrades torch/torchaudio to 2.7+ cu128 wheels, adding sm_120
# support while remaining compatible with all previous NVIDIA architectures.
# See: https://github.com/remsky/Kokoro-FastAPI/issues/443
FROM ghcr.io/remsky/kokoro-fastapi-gpu:latest

RUN /app/.venv/bin/pip install --upgrade --no-cache-dir \
    torch torchaudio \
    --index-url https://download.pytorch.org/whl/cu128