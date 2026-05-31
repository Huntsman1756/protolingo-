from __future__ import annotations

from contextlib import asynccontextmanager

from app.core.database import AsyncSessionLocal


@asynccontextmanager
async def db_session():
    async with AsyncSessionLocal() as session:
        yield session
