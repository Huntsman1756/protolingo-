from sqlalchemy import engine_from_config

from alembic import context
from app.core.config import settings
from app.core.database import Base

# Import all models so Base.metadata includes them for autogenerate
import app.models.user  # noqa: F401
import app.models.study_plan  # noqa: F401
import app.models.lesson  # noqa: F401
import app.models.flashcard  # noqa: F401
import app.models.progress  # noqa: F401
import app.models.chat_history  # noqa: F401

target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    connectable = engine_from_config(
        {"url": settings.DATABASE_URL},
        prefix="",
    )
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    import asyncio

    asyncio.run(run_migrations_online())
