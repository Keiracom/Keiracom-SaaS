
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os

# Use the connection string directly to be sure
DATABASE_URL = "postgresql+asyncpg://postgres.dbhiffkfttukacwwbnok:110883Biteme12%21@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

async def check_data():
    print(f"Connecting to: {DATABASE_URL.split('@')[1]}") # Hide password in logs
    try:
        engine = create_async_engine(DATABASE_URL)
        async with engine.connect() as conn:
            print("Connected!")
            
            # Check for Project table data
            # SQLModel defaults to lowercase class name for table name
            try:
                result = await conn.execute(text("SELECT count(*) FROM project"))
                count = result.scalar()
                print(f"Project Table Rows: {count}")
            except Exception as e:
                print(f"Could not query 'project' table: {e}")

            # Check for FlowRun table data (engine runs)
            try:
                result = await conn.execute(text("SELECT count(*) FROM flowrun"))
                count = result.scalar()
                print(f"FlowRun Table Rows: {count}")
            except Exception as e:
                print(f"Could not query 'flowrun' table: {e}")

        await engine.dispose()
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(check_data())
