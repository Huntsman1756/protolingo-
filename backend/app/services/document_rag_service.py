from __future__ import annotations

import json
import logging
import math
import time

from openai import AsyncOpenAI
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.document import Document, DocumentChunk
from app.services.llm_adapter import llm_adapter

logger = logging.getLogger(__name__)

_EMBEDDING_DIM = 4096
_TOP_K_RETRIEVAL = 20
_TOP_K_RERANK = 5

# Simple token-bucket rate limiter for embedding API (60 RPM)
_EMBEDDING_RATE_LIMIT = 60  # requests per minute
_embedding_last_reset = 0.0
_embedding_tokens = _EMBEDDING_RATE_LIMIT


def _check_embedding_rate() -> None:
    global _embedding_last_reset, _embedding_tokens  # noqa: PLW0603
    now = time.monotonic()
    elapsed = now - _embedding_last_reset
    _embedding_tokens = min(
        _EMBEDDING_RATE_LIMIT,
        _embedding_tokens + elapsed * (_EMBEDDING_RATE_LIMIT / 60.0),
    )
    _embedding_last_reset = now
    if _embedding_tokens < 1:
        sleep_sec = (1 - _embedding_tokens) / (_EMBEDDING_RATE_LIMIT / 60.0)
        time.sleep(sleep_sec)
        _embedding_tokens = 0
        _embedding_last_reset = time.monotonic()
    _embedding_tokens -= 1


def _get_embedding_client() -> AsyncOpenAI:
    return AsyncOpenAI(
        api_key=settings.NAN_API_KEY,
        base_url=settings.NAN_BASE_URL,
    )


async def generate_embeddings(texts: list[str]) -> list[list[float]]:
    """Generate embeddings for a list of texts via Nan's qwen3-embedding.

    Batches requests to stay within the 32-item batch limit and rate-limits
    to 60 RPM.
    """
    client = _get_embedding_client()
    all_embeddings: list[list[float]] = []
    batch_size = settings.NAN_EMBEDDING_BATCH_SIZE

    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        _check_embedding_rate()
        response = await client.embeddings.create(
            model=settings.NAN_EMBEDDING_MODEL,
            input=batch,
        )
        ordered = sorted(response.data, key=lambda x: x.index)
        all_embeddings.extend([e.embedding for e in ordered])

    return all_embeddings


async def embed_query(query: str) -> list[float]:
    """Embed a single query string."""
    embs = await generate_embeddings([query])
    return embs[0]


async def process_document_background(
    document_id: int,
    file_path: str,
    file_type: str,
    db: AsyncSession,
) -> None:
    """Full background pipeline: extract, chunk, embed, store.

    Runs in a background task after the upload response is sent.
    Owns its own DB session for the duration.
    """
    from app.utils.db import db_session

    try:
        from app.services.document_extractor import extract_and_chunk  # noqa: PLC0415

        chunks = await extract_and_chunk(
            file_path,
            file_type,
            chunk_size=settings.DOCUMENT_CHUNK_SIZE,
            chunk_overlap=settings.DOCUMENT_CHUNK_OVERLAP,
        )

        embeddings = await generate_embeddings(chunks)

        async with db_session() as session:
            doc = await session.get(Document, document_id)
            if doc is None:
                logger.error("document_rag: document %s disappeared during processing", document_id)
                return

            for idx, (content, emb) in enumerate(zip(chunks, embeddings, strict=False)):
                session.add(
                    DocumentChunk(
                        document_id=document_id,
                        chunk_index=idx,
                        content=content,
                        embedding=json.dumps(emb),
                    )
                )

            doc.status = "ready"
            doc.chunk_count = len(chunks)
            await session.commit()

    except Exception as exc:
        logger.exception("document_rag: processing failed for document %s: %s", document_id, exc)
        async with db_session() as session:
            doc = await session.get(Document, document_id)
            if doc is not None:
                doc.status = "error"
                await session.commit()


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(va * vb for va, vb in zip(a, b, strict=False))
    na = math.sqrt(sum(v * v for v in a))
    nb = math.sqrt(sum(v * v for v in b))
    if na == 0 or nb == 0:
        return 0.0
    return dot / (na * nb)


def _load_embedding(embedding_text: str) -> list[float]:
    return json.loads(embedding_text)


async def _rerank_chunks(
    query: str,
    chunks: list[tuple[int, str, float]],
) -> list[tuple[int, str, float]]:
    """Re-rank chunks using Nan's rerank model. Returns top results."""
    client = _get_embedding_client()
    documents = [c[1] for c in chunks]

    try:
        response = await client.post(
            path="/rerank",
            cast_to=object,
            body={
                "model": settings.NAN_RERANK_MODEL,
                "query": query,
                "documents": documents,
                "top_n": _TOP_K_RERANK,
            },
        )
        results: list[dict] = response.get("results", [])
        return [
            (chunks[r["index"]][0], r["document"]["text"], r["relevance_score"])
            for r in results
        ]
    except Exception:
        logger.warning("document_rag: rerank failed, falling back to raw similarity scores")
        return chunks[:_TOP_K_RERANK]


async def query_document(
    document_id: int,
    query: str,
    db: AsyncSession,
) -> tuple[str, list[dict]]:
    """Query a single document. Returns (answer_text, citations_list)."""
    chunks = await _get_chunks_for_document(document_id, db)
    answer, citations = await _answer_with_chunks(query, chunks)
    return answer, citations


async def query_all_documents(
    user_id: int,
    query: str,
    db: AsyncSession,
) -> tuple[str, list[dict]]:
    """Query all documents belonging to a user. Returns (answer_text, citations_list)."""
    chunks = await _get_chunks_for_user(user_id, db)
    answer, citations = await _answer_with_chunks(query, chunks)
    return answer, citations


async def _get_chunks_for_document(
    document_id: int,
    db: AsyncSession,
) -> list[tuple[str, str, int | None, str | None, float]]:
    """Return (content, embedding_json, chunk_index, doc_title, pre_score) for all chunks in a document."""
    result = await db.execute(
        select(DocumentChunk, Document.title)
        .join(Document, DocumentChunk.document_id == Document.id)
        .where(DocumentChunk.document_id == document_id)
        .order_by(DocumentChunk.chunk_index)
    )
    rows = result.all()
    doc_title = rows[0][1] if rows else None
    return [
        (r[0].content, r[0].embedding, r[0].chunk_index, doc_title, 0.0)
        for r in rows
    ]


async def _get_chunks_for_user(
    user_id: int,
    db: AsyncSession,
) -> list[tuple[str, str, int | None, str | None, float]]:
    """Return all chunks belonging to a user, with document info."""
    result = await db.execute(
        select(DocumentChunk, Document.title, Document.id)
        .join(Document, DocumentChunk.document_id == Document.id)
        .where(Document.user_id == user_id, Document.status == "ready")
        .order_by(DocumentChunk.document_id, DocumentChunk.chunk_index)
    )
    return [
        (row[0].content, row[0].embedding, row[0].chunk_index, f"{row[1]} (doc #{row[2]})", 0.0)
        for row in result.all()
    ]


async def _answer_with_chunks(
    query: str,
    chunk_data: list[tuple[str, str, int | None, str | None, float]],
) -> tuple[str, list[dict]]:
    """Build answer from query + chunks using cosine similarity, rerank, and LLM.

    chunk_data: list of (content, embedding_json, chunk_index, doc_label, pre_score)
    """
    if not chunk_data:
        return "No documents available to answer your question.", []

    query_emb = await embed_query(query)

    scored: list[tuple[float, str, int | None, str | None]] = []
    for content, emb_json, chunk_index, doc_label in [
        (c, e, i, d) for c, e, i, d, _ in chunk_data
    ]:
        emb = _load_embedding(emb_json)
        score = _cosine_similarity(query_emb, emb)
        scored.append((score, content, chunk_index, doc_label))

    scored.sort(key=lambda x: x[0], reverse=True)
    top_k = scored[:_TOP_K_RETRIEVAL]

    rerank_input = [
        (idx or 0, content, score) for score, content, idx, _ in top_k
    ]
    reranked = await _rerank_chunks(query, rerank_input)

    citations = [
        {
            "chunk_index": idx,
            "content": content[:300],
            "relevance_score": round(score, 4),
        }
        for idx, content, score in reranked
    ]

    context_parts = []
    for i, (_, content, score) in enumerate(reranked):
        context_parts.append(f"[{i + 1}] (relevance: {score:.2f})\n{content}")

    context_str = "\n\n".join(context_parts)
    answer = await _generate_answer(query, context_str)

    return answer, citations


async def _generate_answer(query: str, context: str) -> str:
    """Generate an LLM answer from query + retrieved context."""
    system_prompt = (
        "You are a precise document analysis assistant. Answer the user's question "
        "based solely on the provided document excerpts.\n\n"
        "Guidelines:\n"
        "- Cite sources using [1], [2] etc. matching the numbered excerpts.\n"
        "- If the excerpts don't contain enough information to answer, say so clearly.\n"
        "- Be concise but thorough.\n"
        "- Use the same language as the user's question."
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Document excerpts:\n\n{context}\n\nQuestion: {query}"},
    ]

    return await llm_adapter.chat(messages)
