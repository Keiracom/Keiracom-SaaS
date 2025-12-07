"""
API routes for Project management in the Keiracom application.

This module defines the FastAPI router for handling CRUD operations and other
actions related to the 'Project' entity. It includes endpoints for creating,
listing, and managing projects, as well as initiating connections to external
services like Google Search Console.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import asyncio
from sqlmodel import select # Import select
from src.utils.auth import get_current_user # Auth import

from src.utils.database import get_db
from sqlmodel.ext.asyncio.session import AsyncSession
from src.utils.models import Project

# --- Pydantic Schemas ---

class ProjectIn(BaseModel):
    """Schema for input data when creating a project."""
    domain: str = Field(..., description="The full domain name of the project.", example="example.com")
    project_mode: Literal['local', 'global'] = Field(..., description="The project's operational mode.", example="global")

    class Config:
        orm_mode = True

class ProjectOut(ProjectIn):
    """Schema for representing a project in API output."""
    id: int = Field(..., description="The unique identifier of the project.", example=1)
    da_score: Optional[float] = Field(None, description="The Domain Authority score, if available.", example=35.5)
    created_at: datetime = Field(..., description="The timestamp when the project was created.")

    class Config:
        orm_mode = True

# --- Router Initialization ---

router = APIRouter(
    prefix="/project",
    tags=["Projects"],
    responses={404: {"description": "Not found"}},
)

# --- API Routes ---

@router.post(
    "/",
    response_model=ProjectOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create a New Project"
)
async def create_project(
    project_in: ProjectIn, 
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    """
    Creates a new project for the authenticated user.
    """
    user_id = user.get("sub")
    print(f"Received request to create project '{project_in.domain}' for user {user_id}")
    
    # Check for existing project for this user
    # (Unique constraint is usually global on Project.name, but user should get a clear error)
    
    db_project = Project(
        name=project_in.domain, 
        user_id=user_id,
        mode=project_in.project_mode, 
        active=True
    )
    
    db.add(db_project)
    await db.commit()
    await db.refresh(db_project)
    
    # Map back to schema (name -> domain)
    # Pydantic's from_attributes usually handles direct mapping if fields match.
    # Since fields mismatch (name vs domain), we might need manual mapping or aliases.
    # For now, simplistic return:
    return ProjectOut(
        domain=db_project.name,
        project_mode=db_project.mode,
        id=db_project.id,
        da_score=0.0, # Placeholder
        created_at=db_project.created_at
    )

@router.get("/", response_model=List[ProjectOut], summary="Get User Projects")
async def get_all_projects(
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    """
    Retrieves a list of all projects belonging to the authenticated user.
    If no project exists, creates a 'Sandbox Project' and seeds it with demo data.
    """
    user_id = user.get("sub")
    
    result = await db.exec(select(Project).where(Project.user_id == user_id))
    projects = result.all()

    # --- AUTO-SEEDING LOGIC FOR DEMO ---
    if not projects:
        print(f"No projects found for user {user_id}. creating Sandbox Project...")
        # 1. Create Sandbox Project
        sandbox_project = Project(
            name="Sandbox Project",
            user_id=user_id,
            mode="local", # Default to local for safety
            active=True
        )
        db.add(sandbox_project)
        await db.commit()
        await db.refresh(sandbox_project)
        
        # 2. Seed with Strike Data
        try:
            import json
            from src.utils.models import KeywordOpportunity
            
            import os
            # Use absolute path relative to this file
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            # base_dir is /src/api/.. -> /src
            # We want /src/seeds/strike_data.json
            # Actually __file__ is src/api/project_routes.py
            # dirname is src/api
            # dirname is src
            seed_path = os.path.join(base_dir, "seeds", "strike_data.json")
            
            with open(seed_path, "r") as f:
                seed_data = json.load(f)
                
            for item in seed_data:
                # Ensure we only add if it doesn't duplicate logic (simplified here)
                asset = KeywordOpportunity(
                    project_id=sandbox_project.id,
                    keyword=item["keyword"],
                    target_url=item["target_url"],
                    search_volume=item["search_volume"],
                    difficulty=item["difficulty"],
                    cpc=item["cpc"],
                    current_rank=item["current_rank"],
                    yes_score=item["yes_score"],
                    engine_source=item["engine_source"],
                    status="active"
                )
                db.add(asset)
            await db.commit()
            print(f"Seeded {len(seed_data)} assets for Sandbox Project {sandbox_project.id}")
        except Exception as e:
            print(f"Failed to seed data: {e}")
            
        projects = [sandbox_project]

    # Map back to ProjectOut schema
    return [
        ProjectOut(
            domain=p.name,
            project_mode=p.mode,
            id=p.id,
            da_score=0.0,
            created_at=p.created_at
        ) for p in projects
    ]

@router.post("/{project_id}/connect-gsc", summary="Initialize GSC OAuth Flow")
async def connect_gsc(project_id: int):
    """
    Mocks the initialization of the Google Search Console OAuth flow for a project.
    
    In a real implementation, this would:
    1. Generate a unique 'state' token and store it.
    2. Construct the authorization URL with the client_id, redirect_uri, scopes, and state.
    3. Return the URL to the frontend to initiate the redirect.
    """
    print(f"Initializing mock GSC OAuth flow for project_id: {project_id}")
    
    mock_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        "client_id=MOCK_CLIENT_ID.apps.googleusercontent.com&"
        "redirect_uri=https://app.keiracom.com/oauth/google/callback&"
        "scope=https://www.googleapis.com/auth/webmasters.readonly&"
        "response_type=code&"
        "access_type=offline&"
        "prompt=consent"
    )
    
    return {
        "status": "OAuth flow initialized",
        "project_id": project_id,
        "authorization_url": mock_auth_url
    }
