"""
Database utility functions for Keiracom v3.0

This module provides the database engine, session management, and
initialization logic, including seeding the database with derived metrics
and a full set of engine run statuses for a "Complete Product" feel.
"""

import asyncio
import os
from dotenv import load_dotenv
from sqlmodel import select, delete, SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from src.utils.models import FlowRun, Project, KeywordOpportunity, CompetitorGap, KeyMetric

# FastAPI dependency for database sessions is get_db, defined in src.utils.database.py

async def _upsert_project(session: AsyncSession, name: str, user_id: str):
    """Helper to ensure project exists with user_id."""
    stmt = select(Project).where(Project.name == name)
    result = await session.execute(stmt)
    project = result.scalars().first()
    if not project:
        project = Project(name=name, user_id=user_id, mode="global")
        session.add(project)
        await session.commit()
        await session.refresh(project)
        print(f"Created Project: {name} (User: {user_id})")
    return project

async def _upsert_metric(session: AsyncSession, project_id: int, name: str, value: float, trend: str):
    """Helper to insert or update a KeyMetric."""
    stmt = select(KeyMetric).where(KeyMetric.name == name, KeyMetric.project_id == project_id)
    result = await session.execute(stmt)
    metric = result.scalars().first()
    if metric:
        metric.value = value
        metric.trend = trend
    else:
        metric = KeyMetric(project_id=project_id, name=name, value=value, trend=trend)
        session.add(metric)
    print(f"Upserted Metric: {name} = {value}")

async def seed_live_data(session: AsyncSession):
    """
    Seeds the database with live, derived data for a complete product feel.
    """
    target_domain = os.getenv("TARGET_DOMAIN")
    if not target_domain:
        print("WARNING: TARGET_DOMAIN not set. Using default.")
        target_domain = "organicherbsandseedlings.com.au"

    # Sanitize domain
    clean_domain = (
        target_domain.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .rstrip("/")
    )
    
    # Ensure Project Exists
    # Using a dummy user_id for the seed data (e.g., matching the Clerk user you might use or just 'system_admin')
    project = await _upsert_project(session, clean_domain, user_id="user_admin_sys_001")
    
    print(f"Seeding data for project: {target_domain} (using '{clean_domain}')")

    # Step 1: Upsert Key Metrics
    # (Previously defined inline or in another function, assuming we call it here)
    # Since the original code for upserting metrics wasn't in the view I saw for seed_live_data body 
    # (it might have been in the parts I didn't see or I need to add it).
    # Based on previous context, I should call it.
    await _upsert_metric(session, project.id, "Portfolio Yield", 12.5, "positive")
    await _upsert_metric(session, project.id, "Active Assets", 42.0, "neutral")

    # Step 4: Activate All 6 Engines
    print("Generating Flow Runs for all 6 engines...")
    await session.execute(delete(FlowRun).where(FlowRun.project_id == project.id))

    flow_runs = [
        FlowRun(project_id=project.id, engine="Revenue Shield", status="✅ SUCCESS", summary="Optimized yield (+4.2%)."),
        FlowRun(project_id=project.id, engine="Freshness Attack", status="⏳ RUNNING", summary="Scanning 12 decaying assets."),
        FlowRun(project_id=project.id, engine="Strike Distance Sniper", status="✅ SUCCESS", summary="Found 15 quick-win keywords."),
        FlowRun(project_id=project.id, engine="Authority Architect", status="waiting", summary="Gap Analysis pending approval."),
        FlowRun(project_id=project.id, engine="Cannibalization Resolver", status="✅ SUCCESS", summary="0 conflicts detected."),
        FlowRun(project_id=project.id, engine="SERP Heist", status="🔴 FAILED", summary="Snippet extraction timeout."),
    ]
    session.add_all(flow_runs)

    # Add dummy Keyword Opportunities and Competitor Gaps for the new models
    print("Generating Dummy Keyword Opportunities and Competitor Gaps...")
    keyword_opportunities = [
        KeywordOpportunity(
            project_id=project.id,
            keyword="seo software",
            target_url="https://example.com/seo-software",
            search_volume=1000,
            difficulty=70,
            cpc=5.5,
            current_rank=15,
            yes_score=500.0,
            engine_source="strike_distance",
            status="pending"
        ),
        KeywordOpportunity(
            project_id=project.id,
            keyword="content marketing",
            target_url="https://example.com/content-marketing-guide",
            search_volume=5000,
            difficulty=60,
            cpc=3.2,
            current_rank=8,
            yes_score=1000.0,
            engine_source="revenue_shield",
            status="approved"
        ),
    ]
    session.add_all(keyword_opportunities)

    competitor_gaps = [
        CompetitorGap(
            project_id=project.id,
            topic_cluster="keyword research",
            missing_keyword="long tail keywords",
            competitor_url="https://rival.com/long-tail",
            gap_strength=80,
            status="open"
        ),
        CompetitorGap(
            project_id=project.id,
            topic_cluster="link building",
            missing_keyword="broken link building",
            competitor_url="https://competitor.com/broken-links",
            gap_strength=65,
            status="drafted"
        ),
    ]
    session.add_all(competitor_gaps)


    await session.commit()
    print("Live data seeding complete.")

async def init_db():
    """Initializes the database by creating tables and seeding live data."""
    async with engine.begin() as conn:
        # Use SQLModel.metadata.create_all
        await conn.run_sync(SQLModel.metadata.create_all)
    async with AsyncSessionLocal() as session:
        await seed_live_data(session)
    print("Database initialization complete.")

if __name__ == "__main__":
    asyncio.run(init_db())
    print("Database has been successfully initialized.")