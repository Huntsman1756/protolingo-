from __future__ import annotations

import asyncio
import base64
import io
import logging
import re
import subprocess
from pathlib import Path

from PIL import Image

from app.core.config import settings
from app.services.llm_adapter import llm_adapter

logger = logging.getLogger(__name__)

_OCR_SYSTEM_PROMPT = """You are an OCR assistant. Extract all text content from the provided image.
Return only the extracted text, preserving paragraphs and layout as much as possible.
Do not add commentary, descriptions, or formatting. Just return the plain text."""


def extract_text_from_pdf(path: str) -> str:
    """Extract text from a PDF file using PyMuPDF.

    If PyMuPDF returns no text (e.g. scanned/image PDF), returns an empty string.
    The caller should use the async OCR fallback for such cases.
    """
    import fitz  # PyMuPDF

    doc = fitz.open(path)
    pages: list[str] = []
    for page in doc:
        text = page.get_text()
        if text.strip():
            pages.append(text)
    doc.close()
    return "\n\n".join(pages)


def _pdf_page_to_image(path: str, page_num: int) -> Image.Image:
    """Render a single PDF page as a PIL Image at high resolution."""
    import fitz  # PyMuPDF

    doc = fitz.open(path)
    page = doc[page_num]
    matrix = fitz.Matrix(2, 2)  # 2x zoom for better OCR accuracy
    pix = page.get_pixmap(matrix=matrix)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    return img


# ---------------------------------------------------------------------------
# OCR via Tesseract (local, no LLM needed, works on any platform)
# ---------------------------------------------------------------------------


def _ocr_with_tesseract_page(img: Image.Image) -> str:
    """Run Tesseract OCR on a single PIL Image."""
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    try:
        result = subprocess.run(
            ["tesseract", "stdin", "stdout"],
            stdin=buf,
            capture_output=True,
            text=True,
            timeout=60,
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except FileNotFoundError:
        logger.warning("document_extractor: tesseract binary not found")
    except subprocess.TimeoutExpired:
        logger.warning("document_extractor: tesseract timed out")
    return ""


def _ocr_with_tesseract_pdf(path: str) -> str:
    """OCR fallback using Tesseract for PDFs with no extractable text."""
    import fitz  # PyMuPDF

    doc = fitz.open(path)
    pages: list[str] = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        matrix = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=matrix)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        text = _ocr_with_tesseract_page(img)
        if text.strip():
            pages.append(text)
    doc.close()
    return "\n\n".join(pages)


# ---------------------------------------------------------------------------
# OCR via Ollama vision model (e.g. qwen2.5-vl, llava)
# ---------------------------------------------------------------------------


async def _ollama_chat(messages: list[dict]) -> str:
    """Call Ollama /api/chat endpoint with image support.

    Uses the native Ollama chat API (not OpenAI-compatible) which supports
    base64-encoded images via the "images" field.
    """
    import httpx  # noqa: PLC0415

    ollama_url = settings.OLLAMA_BASE_URL
    ollama_model = settings.OLLAMA_MODEL

    # Build messages for Ollama's native API format
    # Ollama expects: {"role": "user", "content": "text", "images": ["base64string"]}
    ollama_messages = []
    for m in messages:
        msg = {"role": m["role"], "content": m.get("content", "")}
        if "images" in m and m["images"]:
            msg["images"] = m["images"]
        ollama_messages.append(msg)

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{ollama_url}/api/chat",
            json={
                "model": ollama_model,
                "messages": ollama_messages,
                "stream": False,
            },
        )
        response.raise_for_status()
        data = response.json()
        return data.get("message", {}).get("content", "")


async def _ollama_supports_vision() -> bool:
    """Check if the configured Ollama model is available and likely vision-capable."""
    import httpx  # noqa: PLC0415

    ollama_url = settings.OLLAMA_BASE_URL
    ollama_model = settings.OLLAMA_MODEL

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.get(f"{ollama_url}/api/tags")
            resp.raise_for_status()
            tags = resp.json().get("models", [])
            return any(ollama_model in m.get("name", "") for m in tags)
        except Exception:
            return False


async def _ocr_with_ollama_page(img: Image.Image) -> str:
    """Send a single page image to Ollama vision model for OCR."""
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

    messages = [
        {"role": "system", "content": _OCR_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": "Extract all text from this image.",
            "images": [b64],
        },
    ]
    raw = await _ollama_chat(messages)
    return raw.strip()


async def _ocr_with_ollama_pdf(path: str) -> str:
    """OCR fallback using Ollama vision model for PDFs with no extractable text."""
    if not await _ollama_supports_vision():
        logger.warning(
            "document_extractor: Ollama model '%s' not available — skipping Ollama OCR",
            settings.OLLAMA_MODEL,
        )
        raise RuntimeError(f"Ollama model {settings.OLLAMA_MODEL} not available")

    import fitz  # PyMuPDF

    doc = fitz.open(path)
    page_count = len(doc)
    doc.close()

    images = [_pdf_page_to_image(path, i) for i in range(page_count)]
    tasks = [_ocr_with_ollama_page(img) for img in images]
    results = await asyncio.gather(*tasks)
    return "\n\n".join(results)


# ---------------------------------------------------------------------------
# PDF OCR dispatcher
# ---------------------------------------------------------------------------


async def extract_text_from_pdf_ocr(path: str) -> str:
    """OCR fallback for PDFs with no extractable text.

    Uses the configured DOCUMENT_OCR_PROVIDER:
    - "ollama": Ollama vision model (qwen2.5-vl, llava, etc.)
    - "paddleocr": PaddleOCR local library (optional install)
    - "ollama+paddleocr": try Ollama first, fall back to PaddleOCR
    - "tesseract": Tesseract CLI (no extra Python deps)
    - "tesseract+ollama": try Tesseract first, fall back to Ollama
    """
    provider = settings.DOCUMENT_OCR_PROVIDER

    if provider in ("ollama", "ollama+paddleocr"):
        try:
            text = await _ocr_with_ollama_pdf(path)
            if text.strip():
                logger.info("document_extractor: OCR succeeded via Ollama vision for %s", path)
                return text
        except Exception as exc:
            logger.warning(
                "document_extractor: Ollama OCR failed for %s: %s",
                path,
                exc,
            )

    if provider in ("paddleocr", "ollama+paddleocr"):
        try:
            text = _ocr_with_paddle_pdf(path)
            if text.strip():
                logger.info("document_extractor: OCR succeeded via PaddleOCR for %s", path)
                return text
        except Exception as exc:
            logger.warning(
                "document_extractor: PaddleOCR failed for %s: %s",
                path,
                exc,
            )

    # Always try Tesseract as a universal fallback
    try:
        text = _ocr_with_tesseract_pdf(path)
        if text.strip():
            logger.info("document_extractor: OCR succeeded via Tesseract for %s", path)
            return text
    except Exception as exc:
        logger.warning(
            "document_extractor: Tesseract OCR failed for %s: %s",
            path,
            exc,
        )

    return ""


def _ocr_with_paddle_page(img: Image.Image) -> str:
    """Run PaddleOCR on a single PIL Image."""
    from paddleocr import PaddleOCR  # type: ignore[import-untyped]

    ocr = PaddleOCR(
        use_angle_cls=True,
        lang="en",
        show_log=False,
        use_gpu=False,
    )
    result = ocr.ocr(img, cls=True)
    lines = []
    if result and result[0]:
        for line in result[0]:
            text = line[1][0]
            if text.strip():
                lines.append(text)
    return "\n".join(lines)


def _ocr_with_paddle_pdf(path: str) -> str:
    """OCR fallback using PaddleOCR for PDFs with no extractable text."""
    import fitz  # PyMuPDF

    doc = fitz.open(path)
    pages: list[str] = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        matrix = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=matrix)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        text = _ocr_with_paddle_page(img)
        if text.strip():
            pages.append(text)
    doc.close()
    return "\n\n".join(pages)


# ---------------------------------------------------------------------------
# Image OCR (uses LLM adapter — works with any vision provider)
# ---------------------------------------------------------------------------


async def extract_text_from_image(path: str) -> str:
    """Extract text from an image using the vision LLM.

    The image is base64-encoded and sent to the LLM for OCR.
    Falls back to Tesseract if the LLM call fails.
    """
    image = Image.open(path)
    buf = io.BytesIO()
    image.save(buf, format=image.format or "PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    mime = Image.MIME.get(image.format, "image/png")
    data_url = f"data:{mime};base64,{b64}"

    messages = [
        {"role": "system", "content": _OCR_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Extract all text from this image."},
                {"type": "image_url", "image_url": {"url": data_url}},
            ],
        },
    ]

    try:
        raw = await llm_adapter.chat(messages)
        text = raw.strip()
        if text:
            return text
    except Exception as exc:
        logger.warning("document_extractor: LLM OCR failed for %s: %s — falling back to Tesseract", path, exc)

    # Fall back to Tesseract
    try:
        return _ocr_with_tesseract_page(image)
    except Exception:
        return ""


# ---------------------------------------------------------------------------
# Other extractors
# ---------------------------------------------------------------------------


def extract_text_from_docx(path: str) -> str:
    """Extract text from a DOCX file using python-docx."""
    from docx import Document as DocxDocument

    doc = DocxDocument(path)
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return "\n".join(paragraphs)


def extract_text_from_txt(path: str) -> str:
    """Extract text from a plain text file."""
    with open(path, encoding="utf-8", errors="replace") as fh:
        return fh.read()


# ---------------------------------------------------------------------------
# Text chunking
# ---------------------------------------------------------------------------


def normalize_whitespace(text: str) -> str:
    """Collapse multiple newlines into double newlines (paragraph breaks)."""
    text = re.sub(r"\r\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def chunk_text(text: str, chunk_size: int = 512, overlap: int = 64) -> list[str]:
    """Split text into chunks of approximately chunk_size characters.

    Splits on paragraph breaks first, then sentence boundaries, then word boundaries.
    Adjacent chunks overlap by `overlap` characters.
    """
    text = normalize_whitespace(text)
    if not text:
        return []

    paragraphs = text.split("\n\n")
    chunks: list[str] = []
    current = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        if len(current) + len(para) + 2 <= chunk_size:
            current = (current + "\n\n" + para) if current else para
            continue

        if current:
            chunks.append(current)

        if len(para) <= chunk_size:
            current = para
        else:
            sentences = re.split(r"(?<=[.!?])\s+", para)
            current = ""
            for sent in sentences:
                if len(current) + len(sent) + 1 <= chunk_size:
                    current = (current + " " + sent) if current else sent
                else:
                    if current:
                        chunks.append(current)
                    current = sent

    if current:
        chunks.append(current)

    if overlap > 0 and len(chunks) > 1:
        overlapped: list[str] = []
        for i, chunk in enumerate(chunks):
            if i > 0 and overlap < len(chunks[i - 1]):
                carry = chunks[i - 1][-overlap:]
                chunk = carry + " " + chunk
            overlapped.append(chunk)
        chunks = overlapped

    return chunks


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


async def extract_and_chunk(
    file_path: str,
    file_type: str,
    chunk_size: int = 512,
    chunk_overlap: int = 64,
) -> list[str]:
    """Extract text from a file and split into chunks.

    Raises ValueError if the file type is unsupported or no text could be extracted.
    """
    ext = Path(file_path).suffix.lower()

    if ext == ".pdf":
        text = extract_text_from_pdf(file_path)
        if not text.strip():
            text = await extract_text_from_pdf_ocr(file_path)
    elif ext == ".docx":
        text = extract_text_from_docx(file_path)
    elif ext == ".txt":
        text = extract_text_from_txt(file_path)
    elif ext in {".png", ".jpg", ".jpeg"}:
        text = await extract_text_from_image(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")

    if not text.strip():
        raise ValueError("No text could be extracted from the file")

    chunks = chunk_text(text, chunk_size=chunk_size, overlap=chunk_overlap)

    return chunks
