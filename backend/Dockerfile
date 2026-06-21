FROM python:3.14-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev tesseract-ocr && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Optional PaddleOCR — only installed if DOCUMENT_OCR_PROVIDER includes paddleocr
# paddlepaddle is not available on python 3.14 arm64, so install conditionally
RUN if [ "${INSTALL_PADDLEOCR}" = "true" ]; then \
        pip install --no-cache-dir paddlepaddle paddleocr; \
    fi

ENV UVICORN_WORKERS=1
CMD uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers ${UVICORN_WORKERS}