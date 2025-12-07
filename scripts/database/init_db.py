"""
Database Initialization Script for KeiraCom v3.0

This script connects to the database and initializes the schema.
It first drops all existing tables and then creates them anew based on the
SQLAlchemy models defined in `src.utils.models`.

This is intended for development and setup purposes to ensure a clean database
state.
"""
import asyncio
import os
import sys
from dotenv import load_dotenv

load_dotenv()

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from sqlmodel import SQLModel
from src.utils.database import engine, AsyncSessionLocal
from src.utils.models import Project, KeyMetric, FlowRun, KeywordOpportunity, CompetitorGap # Import models explicitly


async def create_tables():
    """
    Asynchronously connects to the database, drops all existing tables,
    and creates new tables based on the defined SQLAlchemy models.
    Then, it seeds the database with initial data.
    """
    print("Initializing database schema...")
    async with engine.begin() as conn:
        print("Dropping all existing tables...")
        await conn.run_sync(SQLModel.metadata.drop_all)
        print("Creating new tables...")
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Database tables created successfully.")

    print("Seeding database with initial data...")
    async with AsyncSessionLocal() as session:
        # Import the seeder function locally to avoid circular deps if any
        from src.utils.db import seed_live_data
        await seed_live_data(session)
    print("Database seeded successfully.")


if __name__ == "__main__":
    # In Python 3.8+ on Windows, the default event loop policy is
    # WindowsSelectorEventLoopPolicy, which does not support subprocesses.
    # ProactorEventLoopPolicy is required for compatibility with asyncio's
    # subprocess features. This setup is forward-compatible.
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    
    asyncio.run(create_tables())
