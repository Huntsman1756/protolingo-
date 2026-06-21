---
description: "Phase 12 spec — RAG Document Q&A: upload documents (PDF, DOCX, TXT, images), extract text, generate embeddings, and query them with LLM-powered answers and citations."
applyTo: "backend/**, frontend/**"
---

# Phase 12 — RAG Document Q&A

## Overview

A NotebookLM-like feature: users upload documents (PDF, DOCX, TXT, or images), the system extracts text, splits it into chunks, generates vector embeddings via Nan's `qwen3-embedding` model (4096 dimensions), and stores them. Users can then query their documents with natural language questions. Relevant chunks are retrieved via cosine similarity, re-ranked with Nan's `rerank` model for precision, and the LLM (`qwen3.6`) answers with inline citations.

### Key constraints

- **Only Nan provider** — uses `NAN_API_KEY` for everything: chat (`qwen3.6`), embeddings (`qwen3-embedding`, 60 RPM), and reranking (`rerank`, 1000 RPM).
- **Global rate limits**: 60 RPM, 3 concurrent requests, 1.5M TPM for qwen3.6.
- **Max 100 documents per user** (matching NotebookLM's limit).
- **Max 500 chunks per document** — enforced at upload time.
- **Max file size 20 MB** per upload.
- **Supported formats**: `.pdf`, `.docx`, `.txt`, `.png`, `.jpg`, `.jpeg`.
- **Embedding dimension**: 4096 (from `qwen3-embedding`).

---

## Database models

### `documents`

**File:** `backend/app/models/document.py`

| Column      | Type       | Constraints                          | Notes                                    |
| ----------- | ---------- | ------------------------------------ | ---------------------------------------- |
| id          | integer    | PK, autoincrement                    |                                          |
| user_id     | integer    | NOT NULL, FK → users(CASCADE), index | Cascade-deletes with the user            |
| filename    | string(255)| NOT NULL                             | Original uploaded filename               |
| file_path   | string(512)| NOT NULL                             | Path on disk                             |
| file_size   | integer    | NOT NULL                             | Size in bytes                            |
| file_type   | string(50) | NOT NULL                             | Extension or MIME type                   |
| title       | string(255)| NOT NULL                             | Display title (filename without ext)     |
| status        | string(20) | NOT NULL, default `"processing"`     | `processing` → `ready` → `error`         |
| chunk_count   | integer    | NOT NULL, default 0                  | Number of chunks indexed                 |
| error_message | text       | NULL                                 | Last error message if status is `error`  |
| created_at    | datetime   | NOT NULL, default UTC now            |                                          |

**Indexes:** `ix_documents_user_id` on `user_id`.

### `document_chunks`

| Column       | Type       | Constraints                                   | Notes                                  |
| ------------ | ---------- | --------------------------------------------- | -------------------------------------- |
| id           | integer    | PK, autoincrement                             |                                        |
| document_id  | integer    | NOT NULL, FK → documents(CASCADE), index      | Cascade-deletes with the document      |
| chunk_index  | integer    | NOT NULL                                      | Position within document               |
| content      | text       | NOT NULL                                      | Text content of the chunk              |
| embedding    | text       | NOT NULL                                      | JSON array of 4096 floats as text      |
| created_at   | datetime   | NOT NULL, default UTC now                     |                                        |

**Indexes:** `ix_document_chunks_document_id` on `document_id`.

---

## API Endpoints

All routes are under `/api/documents` and require authentication + subscription.

### `GET /api/documents`

List the current user's documents (paginated, newest first).

**Query params:** `skip` (default 0), `limit` (default 20, max 50).

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "filename": "report.pdf",
      "file_size": 1048576,
      "file_type": "pdf",
      "title": "report",
      "status": "ready",
      "chunk_count": 42,
      "error_message": null,
      "created_at": "2026-06-20T10:00:00"
    }
  ],
  "total": 1,
  "skip": 0,
  "limit": 20
}
```

### `POST /api/documents/upload`

Upload a document file. Accepted: `.pdf`, `.docx`, `.txt`, `.png`, `.jpg`, `.jpeg`.

**Request:** `multipart/form-data` with field `file`.

**Response (202 Accepted):**
```json
{
  "id": 1,
  "status": "processing",
  "title": "report"
}
```

Processing (extraction → chunking → embedding) runs as a background task. Frontend can poll `GET /api/documents` to see when `status` becomes `ready`.

### `DELETE /api/documents/{id}`

Delete a document and all its chunks. Returns 204.

### `POST /api/documents/{id}/query`

Query a specific document.

**Request:**
```json
{
  "query": "What are the main findings?"
}
```

**Response:**
```json
{
  "answer": "The main findings indicate that... [1][2]",
  "citations": [
    {
      "chunk_index": 3,
      "content": "The results show a 25% improvement...",
      "relevance_score": 0.91
    },
    {
      "chunk_index": 7,
      "content": "In conclusion, the data supports...",
      "relevance_score": 0.84
    }
  ],
  "document_id": 1,
  "document_title": "report"
}
```

### `POST /api/documents/query`

Query across all of the user's documents.

Same request/response as per-document query, but citation `document_id` and `document_title` are included per citation.

---

## Background processing pipeline

On upload:
1. Validate file type and size.
2. Save raw file to `{DOCUMENT_STORAGE_PATH}/{user_id}/{doc_id}.{ext}`.
3. Insert `Document` row with `status = "processing"`.
4. Run background task:
   a. **Extract text** — PDF via PyMuPDF; if no text is extracted (scanned/image PDF), fall back to OCR. OCR provider configured via `DOCUMENT_OCR_PROVIDER`: `ollama` (Ollama vision model like qwen2.5-vl), `paddleocr` (local PaddleOCR library), or `ollama+paddleocr` (try Ollama first, fall back to PaddleOCR). DOCX via python-docx, TXT via read, images via LLM vision API with PaddleOCR fallback.
   b. **Chunk** — split into segments of ~512 chars with 64-char overlap, max 500 chunks.
   c. **Embed** — batch-send chunks to `POST /v1/embeddings` (model: `qwen3-embedding`, batch size 32, rate-limited to 60 RPM).
   d. **Store** — save `DocumentChunk` rows with embedding as JSON text.
   e. **Mark ready** — update `Document.status = "ready"`.

---

## Query pipeline

On query:
1. Embed query via `qwen3-embedding`.
2. Load all chunks for the document/user.
3. Compute cosine similarity in Python.
4. Take top 20 chunks by similarity.
5. Re-rank with `rerank` model (limit to top 5 after reranking).
6. Build LLM prompt with system instructions + top chunks + user query.
7. Return LLM answer + citation metadata.

---

## Rate limiting considerations

- **Embedding (qwen3-embedding)**: 60 RPM, batch size 32. The service implements a simple token-bucket rate limiter to stay within bounds.
- **Rerank (rerank)**: 1000 RPM, no special throttling needed.
- **Chat (qwen3.6)**: 1.5M TPM, 60 RPM, 3 concurrent max. The query endpoint uses a semaphore for concurrent control.
- **File upload**: 5 requests/minute per user.

---

## Frontend

### Page: `/documents`

Two views:
1. **Document list** — shows all uploaded documents with status, size, date. Upload button opens a file picker. Clicking a document opens the Q&A view.
2. **Document Q&A** — shows the document title, a chat-like interface for asking questions, and answers with citations. Citations are numbered references that highlight the source chunk.

### Navigation

Added to the main nav: `/documents` (Documents) — premium-feature gated.

### i18n keys (per locale)

Keys under `documents` namespace:
- `title` — "Documents"
- `upload` — "Upload document"
- `uploading` — "Processing..."
- `delete` — "Delete"
- `query` — "Ask a question about this document"
- `queryPlaceholder` — "What would you like to know?"
- `noDocuments` — "No documents yet. Upload a PDF, Word document, or text file."
- `citation` — "Source"
- `processing` — "Processing..."
- `ready` — "Ready"
- `error` — "Error"
- `fileTooLarge` — "File is too large. Maximum size is 20 MB."
- `formatNotSupported` — "Format not supported."
- `maxDocuments` — "Maximum 100 documents reached."
- `searchingAll` — "Searching all documents..."
- `emptyStateTitle` — "Upload your first document"
- `emptyStateDesc` — "Upload PDFs, Word documents, or text files and ask questions about them."
- `askUploadFirst` — "Upload a document to get started."
- `confirmDelete` — "Delete this document? All indexed content will be removed."