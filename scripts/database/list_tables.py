
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = "postgresql+asyncpg://postgres.dbhiffkfttukacwwbnok:110883Biteme12%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

async def list_tables():
    print(f"Connecting to: {DATABASE_URL.split('@')[1]}")
    engine = create_async_engine(DATABASE_URL)
    async with engine.connect() as conn:
        print("Connected. Fetching tables...")
        result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = result.fetchall()
        print("Tables found in DB:")
        for t in tables:
            print(f" - {t[0]}")
            
        if not tables:
            print("WARNING: No tables found in public schema.")
            
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(list_tables())
