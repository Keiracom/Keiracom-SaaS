import asyncio
from sqlmodel import SQLModel, select
from src.utils.database import engine, AsyncSessionLocal
from src.utils.models import Project, KeywordOpportunity, CompetitorGap

async def main():
    """
    Creates all database tables and seeds the initial project if it doesn't exist.
    """
    print("--- Starting DB Seed Script ---")

    # Step 1: Create Tables
    async with engine.begin() as conn:
        # For a clean seed, you might want to drop tables first.
        # Be careful with this in production.
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
    print("✅ Database Tables Created.")

    # Step 2: Seed Project
    async with AsyncSessionLocal() as session:
        # Check if project "dripify.com" exists
        result = await session.exec(select(Project).where(Project.name == "dripify.com"))
        existing_project = result.first()
        
        if not existing_project:
            print("Project 'dripify.com' not found. Seeding...")
            proj = Project(name="dripify.com", mode="global", active=True)
            session.add(proj)
            await session.commit()
            print("✅ Project 'dripify.com' Seeded.")
        else:
            print("✅ Project 'dripify.com' already exists.")

    print("--- DB Seed Script Finished ---")

if __name__ == "__main__":
    asyncio.run(main())
