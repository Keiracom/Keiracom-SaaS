from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession # SQLModel's AsyncSession
from src.config.settings import settings

# Ensure we rely on the correct settings attribute
# We default to sqlite if the setting is missing to prevent crashes
connection_string = getattr(settings, "DATABASE_URL", "sqlite+aiosqlite:///./keiracom.db")

engine = create_async_engine(connection_string, echo=False)

# This is the factory the Engines need
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session