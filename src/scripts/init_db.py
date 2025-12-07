import asyncio
from src.utils.database import engine, async_session
from src.models.base import Base
from src.models.core import User, Keyword

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        async with session.begin():
            test_user = User(email="admin@keiracom.com", tier="enterprise", credits=1000)
            session.add(test_user)
            await session.flush()  # Flush to get the user ID

            test_keyword = Keyword(
                user_id=test_user.id,
                text="seo automation software",
                domain="keiracom.com",
                device="desktop",
                location="United States"
            )
            session.add(test_keyword)

if __name__ == "__main__":
    asyncio.run(init_db())
