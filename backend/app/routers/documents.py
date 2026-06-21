from __future__ import annotations

import logging
import os
from pathlib import Path

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import require_subscription
from app.models.document import Document
from app.models.user import User
from app.schemas.document import (
    CitationOut,
    DocumentListResponse,
    DocumentOut,
    DocumentUploadResponse,
    QueryRequest,
    QueryResponse,
)
from app.services.document_rag_service import (
    process_document_background,
    query_all_documents,
    query_document,
)
from app.utils.db import db_session

router = APIRouter(prefix="/api/documents", tags=["documents"])
logger = logging.getLogger(__name__)

_MAX_LIMIT = 50


@router.get("", response_model=DocumentListResponse)
async def list_documents(
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> DocumentListResponse:
    """List the current user's documents, newest first."""
    limit = min(limit, _MAX_LIMIT)

    total_result = await db.execute(
        select(func.count(Document.id)).where(Document.user_id == current_user.id)
    )
    total: int = total_result.scalar_one()

    result = await db.execute(
        select(Document)
        .where(Document.user_id == current_user.id)
        .order_by(Document.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    items = [
        DocumentOut(
            id=doc.id,
            filename=doc.filename,
            file_size=doc.file_size,
            file_type=doc.file_type,
            title=doc.title,
            status=doc.status,
            chunk_count=doc.chunk_count,
            error_message=doc.error_message,
            created_at=doc.created_at,
        )
        for doc in result.scalars().all()
    ]

    return DocumentListResponse(items=items, total=total, skip=skip, limit=limit)


@router.post("/upload", response_model=DocumentUploadResponse, status_code=status.HTTP_202_ACCEPTED)
async def upload_document(
    file: UploadFile,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> DocumentUploadResponse:
    """Upload a document file (PDF, DOCX, TXT, PNG, JPG, JPEG).

    Processing (extraction, chunking, embedding) runs as a background task.
    Poll GET /api/documents to see when status becomes 'ready'.
    """
    filename = file.filename or "untitled"
    ext = Path(filename).suffix.lower()

    if ext not in settings.DOCUMENT_ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Format not supported. Allowed: {', '.join(settings.DOCUMENT_ALLOWED_EXTENSIONS)}",
        )

    # Read file content and check size
    content = await file.read()
    file_size = len(content)
    if file_size > settings.DOCUMENT_MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File is too large. Maximum size is 500 MB.",
        )

    # Create document record
    title = Path(filename).stem
    doc = Document(
        user_id=current_user.id,
        filename=filename,
        file_path="",  # set after we have the ID
        file_size=file_size,
        file_type=ext.lstrip("."),
        title=title,
        status="processing",
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)

    # Save file to disk using document ID
    user_dir = os.path.join(settings.DOCUMENT_STORAGE_PATH, str(current_user.id))
    os.makedirs(user_dir, exist_ok=True)
    file_path = os.path.join(user_dir, f"{doc.id}{ext}")
    with open(file_path, "wb") as fh:
        fh.write(content)

    doc.file_path = file_path
    await db.commit()

    # Start background processing
    background_tasks.add_task(
        process_document_background,
        doc.id,
        file_path,
        ext.lstrip("."),
        db_session,
    )

    return DocumentUploadResponse(id=doc.id, status="processing", title=title)


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: int,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Delete a document and all its chunks."""
    doc = await db.get(Document, document_id)
    if not doc or doc.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")

    # Delete file from disk
    if doc.file_path and os.path.isfile(doc.file_path):
        try:
            os.remove(doc.file_path)
        except OSError:
            logger.warning("Could not delete file %s", doc.file_path)

    await db.delete(doc)
    await db.commit()


@router.post("/{document_id}/query", response_model=QueryResponse)
async def query_single_document(
    document_id: int,
    body: QueryRequest,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> QueryResponse:
    """Ask a question about a specific document."""
    if not body.query.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query cannot be empty")

    doc = await db.get(Document, document_id)
    if not doc or doc.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    if doc.status != "ready":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Document is {doc.status}, not ready for queries",
        )

    answer, citations = await query_document(document_id, body.query, db)

    return QueryResponse(
        answer=answer,
        citations=[CitationOut(**c) for c in citations],
        document_id=doc.id,
        document_title=doc.title,
    )


@router.post("/query", response_model=QueryResponse)
async def query_all_documents_endpoint(
    body: QueryRequest,
    current_user: User = Depends(require_subscription),
    db: AsyncSession = Depends(get_db),
) -> QueryResponse:
    """Ask a question across all of your documents."""
    if not body.query.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query cannot be empty")

    # Check if user has any ready documents
    count_result = await db.execute(
        select(func.count(Document.id)).where(
            Document.user_id == current_user.id,
            Document.status == "ready",
        )
    )
    ready_count: int = count_result.scalar_one()
    if ready_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No documents ready for querying. Upload a document first.",
        )

    answer, citations = await query_all_documents(current_user.id, body.query, db)

    return QueryResponse(
        answer=answer,
        citations=[CitationOut(**c) for c in citations],
    )
