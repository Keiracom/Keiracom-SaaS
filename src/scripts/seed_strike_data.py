import asyncio
import json
import os
import sys
from dotenv import load_dotenv
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError

# Add the project root to the sys.path to allow absolute imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from src.utils.database import AsyncSessionLocal
from src.utils.models import KeywordOpportunity, Project

load_dotenv()

async def seed_data():
    """
    Reads strike data from a JSON file and seeds it into the database.
    """
    records_added = 0
    target_domain = os.getenv("TARGET_DOMAIN", "dripify.com")
    json_path = os.path.join(os.path.dirname(__file__), '../seeds/strike_data.json')

    print(f"🌱 Starting to seed strike data for project: {target_domain}")

    async with AsyncSessionLocal() as session:
        try:
            # 1. Get Project ID
            project_result = await session.execute(select(Project).where(Project.name == target_domain))
            project = project_result.scalars().first()
            if not project:
                print(f"Project '{target_domain}' not found. Creating it...")
                project = Project(name=target_domain, mode="global")
                session.add(project)
                await session.commit()
                await session.refresh(project)
                print(f"Project '{target_domain}' created with ID: {project.id}")

            # 2. Read and Process JSON data
            with open(json_path, 'r') as f:
                data = json.load(f)

            for item in data:
                # Check if the keyword opportunity already exists for this project
                stmt = select(KeywordOpportunity).where(
                    KeywordOpportunity.project_id == project.id,
                    KeywordOpportunity.keyword == item['keyword']
                )
                result = await session.execute(stmt)
                exists = result.scalars().first()

                if exists:
                    print(f"Skipping existing keyword: '{item['keyword']}'")
                    continue

                # Create new record
                opportunity = KeywordOpportunity(
                    project_id=project.id,
                    keyword=item['keyword'],
                    target_url=f"https://{target_domain}/blog/{item['keyword'].replace(' ', '-')}", # Example URL
                    search_volume=item['search_volume'],
                    difficulty=item['difficulty'],
                    current_rank=item['current_rank'],
                    yes_score=item['yield_efficiency_score'],
                    engine_source="strike_distance_seed",
                    status="pending"
                )
                session.add(opportunity)
                records_added += 1

            await session.commit()
            print(f"✅ [Asset Manager] Strike Data Loaded: {records_added} records.")

        except IntegrityError as e:
            await session.rollback()
            print(f"❌ DB Integrity Error: {e}")
        except Exception as e:
            await session.rollback()
            print(f"❌ An unexpected error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(seed_data())
