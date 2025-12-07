"""
FastAPI Dashboard Router for Keiracom v3.0

This module defines the API endpoints for fetching dashboard-related data,
including project overview, key metrics, and recent flow runs.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, ConfigDict
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.utils.database import get_db
from src.utils.auth import get_current_user
from src.utils.models import FlowRun, KeyMetric, Project

# 1. Initialize APIRouter
router = APIRouter()

# 2. Pydantic Schemas for Response (inline)
class MetricOut(BaseModel):
    name: str
    value: float
    trend: str

    model_config = ConfigDict(from_attributes=True)


class RunOut(BaseModel):
    engine_name: str = Field(alias="engine")
    status: str
    output_summary: str = Field(alias="summary")

    model_config = ConfigDict(from_attributes=True)


class ProjectOut(BaseModel):
    name: str
    mode: str
    is_active: bool = Field(alias="active")
    metrics: List[MetricOut]
    recent_runs: List[RunOut]

    model_config = ConfigDict(from_attributes=True)


# 3. Endpoint Logic
@router.get("/", response_model=ProjectOut)
async def get_dashboard_data(
    session: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    """
    Fetches comprehensive dashboard data for the authenticated user's active project.
    """
    # Clerk User ID
    user_id = user.get("sub")

    # Query the first active Project for THIS user
    project_stmt = select(Project).where(Project.user_id == user_id, Project.active == True).limit(1)
    project_result = await session.execute(project_stmt)
    project = project_result.scalars().first()

    if not project:
        # AUTO-SEEDING FOR DASHBOARD if Project Missing
        print(f"No active project for {user_id}. Auto-creating Sandbox for Dashboard...")
        sandbox_project = Project(
            name="Sandbox Project",
            user_id=user_id,
            mode="local",
            active=True
        )
        session.add(sandbox_project)
        await session.commit()
        await session.refresh(sandbox_project)
        project = sandbox_project
        
        # Seed Assets
        try:
            import json
            from src.utils.models import KeywordOpportunity
            with open("src/seeds/strike_data.json", "r") as f:
                seed_data = json.load(f)
            for item in seed_data:
                asset = KeywordOpportunity(
                    project_id=project.id,
                    keyword=item["keyword"],
                    target_url=item.get("target_url", "https://example.com"),
                    search_volume=item["search_volume"],
                    difficulty=item["difficulty"],
                    cpc=item.get("cpc", 1.0),
                    current_rank=item["current_rank"],
                    yes_score=item.get("yes_score", 50.0),
                    engine_source=item.get("engine_source", "manual"),
                    status="active"
                )
                session.add(asset)
            await session.commit()
        except Exception as e:
            print(f"Failed to seed dashboard assets: {e}")

    # Query KeyMetric records for THIS project
    metrics_stmt = select(KeyMetric).where(KeyMetric.project_id == project.id)
    metrics_result = await session.execute(metrics_stmt)
    metrics = metrics_result.scalars().all()

    # Query the 5 most recent FlowRun records for THIS project
    runs_stmt = (
        select(FlowRun)
        .where(FlowRun.project_id == project.id)
        .order_by(FlowRun.created_at.desc())
        .limit(5)
    )
    runs_result = await session.execute(runs_stmt)
    recent_runs = runs_result.scalars().all()

    # Construct the response using Pydantic models
    return ProjectOut(
        name=project.name,
        mode=project.mode,
        active=project.active,
        metrics=metrics,
        recent_runs=recent_runs,
    )