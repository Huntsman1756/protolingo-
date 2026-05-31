from __future__ import annotations

from contextlib import asynccontextmanager

from redis.asyncio import Redis

from app.core.config import settings


@asynccontextmanager
async def redis_client():
    client = Redis.from_url(settings.REDIS_URL, decode_responses=True)
    try:
        yield client
    finally:
        await client.aclose()
