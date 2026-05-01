from contextlib import asynccontextmanager
import asyncio

from alembic import command
from alembic.config import Config
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.limiter import limiter
from app.routers import admin, assessment, auth, chat, flashcards, lessons, progress, study_plan


def _run_migrations() -> None:
    alembic_cfg = Config("/app/alembic.ini")
    command.upgrade(alembic_cfg, "head")


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa: ANN201
    await asyncio.to_thread(_run_migrations)
    yield


app = FastAPI(title="FreeLingo API", version="0.1.0", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers_middleware(request: Request, call_next) -> Response:
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-XSS-Protection"] = "0"  # Modern browsers ignore it; CSP is the right tool
    if settings.COOKIE_SECURE:
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(assessment.router)
app.include_router(study_plan.router)
app.include_router(lessons.router)
app.include_router(flashcards.router)
app.include_router(chat.router)
app.include_router(progress.router)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
