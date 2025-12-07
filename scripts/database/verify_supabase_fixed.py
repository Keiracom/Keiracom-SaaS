
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = "postgresql+asyncpg://postgres.dbhiffkfttukacwwbnok:110883Biteme12%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

async def check_data_fixed():
    print(f"Connecting to: {DATABASE_URL.split('@')[1]} (with PGBouncer fix)")
    
    # FIX: statement_cache_size=0 for Supabase Transaction Pooler
    engine = create_async_engine(
        DATABASE_URL, 
        connect_args={"server_settings": {"jit": "off"}, "statement_cache_size": 0} 
        # statement_cache_size is passed to asyncpg via connect_args directly or in query string? 
        # For SQLAlchemy create_async_engine, it's usually inside connect_args directly for asyncpg.
        # Let's try the key specifically.
    )

    async with engine.connect() as conn:
        print("Connected. Listing tables...")
        # Force a simple query first
        result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = [t[0] for t in result.fetchall()]
        print(f"Tables: {tables}")

        if 'project' in tables:
            r = await conn.execute(text("SELECT count(*) FROM project"))
            print(f"  -> 'project' rows: {r.scalar()}")
        elif 'projects' in tables:
             r = await conn.execute(text("SELECT count(*) FROM projects"))
             print(f"  -> 'projects' rows: {r.scalar()}")
        else:
            print("  -> Project table not found.")

    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_data_fixed())
