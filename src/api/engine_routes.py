"""
API routes for triggering the 6 core Keiracom SEO Engines.

This module provides a single, dynamic endpoint to trigger any of the
Prefect workflows associated with the main SEO engines.
"""

from fastapi import APIRouter, HTTPException, status, Depends
import asyncio
from src.utils.auth import get_current_user

# from src.engines.engine_02 import FreshnessAttackEngine
# from src.engines.engine_05 import CannibalizationEngine
from src.utils.database import get_db
from sqlmodel.ext.asyncio.session import AsyncSession

# ... existing code ...

# @router.get("/cannibalization/{project_id}", summary="Run Highlander Protocol")
# async def run_cannibalization_scan(
#     project_id: int,
#     db: AsyncSession = Depends(get_db),
#     user: dict = Depends(get_current_user)
# ):
#     """
#     Executes Engine 5 (Cannibalization Resolver).
#     Returns a list of keyword conflicts.
#     """
#     # engine = CannibalizationEngine(db_session=db)
#     # results = await engine.scan_project(project_id)
#     return []
# 
# 
# # ... existing code ...
# 
# @router.get("/freshness/{project_id}", summary="Run Freshness Attack Scan")
# async def run_freshness_scan(
#     project_id: int,
#     db: AsyncSession = Depends(get_db),
#     user: dict = Depends(get_current_user)
# ):
#     """
#     Executes Engine 2 (Freshness Attack) for a specific project.
#     Returns a list of assets that are decaying.
#     """
#     # engine = FreshnessAttackEngine(db_session=db)
#     # results = await engine.scan_project(project_id)
#     return []

# --- Integration Hint ---
# To activate...

# --- Mock Prefect Flow Imports ---
# In a real application, these would be the actual flow functions imported
# from their respective files in `src/flows/`.

class MockPrefectFlow:
    """A mock class to simulate an imported Prefect flow function."""
    def __init__(self, name: str):
        self.name = name
        print(f"Mock flow '{name}' loaded.")

    async def trigger(self, *args, **kwargs):
        """Simulates triggering the flow, like a Prefect deployment run."""
        print(f"--- MOCK PREFECT: Triggering '{self.name}' ---")
        print(f"    - Args: {args}")
        print(f"    - Kwargs: {kwargs}")
        await asyncio.sleep(0.2)  # Simulate scheduling/API call latency
        print(f"--- MOCK PREFECT: '{self.name}' run submitted. ---")
        return {"status": "SUBMITTED", "flow_run_id": f"mock-run-{self.name}-123"}

# Instantiate a mock for each of the 6 engine flows
engine_01 = MockPrefectFlow("revenue_shield_flow")
engine_02 = MockPrefectFlow("freshness_attack_flow")
engine_03 = MockPrefectFlow("strike_distance_flow")
engine_04 = MockPrefectFlow("authority_architect_flow")
engine_05 = MockPrefectFlow("cannibalization_resolver_flow")
engine_06 = MockPrefectFlow("serp_heist_flow")

# --- Engine Route to Flow Mapping ---
# This dictionary is the core of the routing logic, connecting the
# user-facing engine name to the backend flow object.
ENGINE_MAP = {
    "revenue_shield": engine_01,
    "freshness_attack": engine_02,
    "strike_distance": engine_03,
    "authority_architect": engine_04,
    "cannibalization": engine_05,
    "serp_heist": engine_06,
}

# --- Router Initialization ---

router = APIRouter(
    prefix="",
    tags=["Engine Actions"],
    responses={404: {"description": "Engine not found"}},
)

# --- API Route Definition ---

@router.post(
    "/trigger/{engine_name}",
    summary="Trigger a Core SEO Engine Flow",
    status_code=status.HTTP_202_ACCEPTED,
)
async def trigger_engine(engine_name: str, user: dict = Depends(get_current_user)):
    """
    Triggers a specific SEO engine's Prefect workflow.

    The `engine_name` must be one of the following:
    - `revenue_shield`
    - `freshness_attack`
    - `strike_distance`
    - `authority_architect`
    - `cannibalization`
    - `serp_heist`
    """
    user_id = user.get("sub")
    print(f"Received trigger request for engine: '{engine_name}' for user: '{user_id}'")

    flow_to_run = ENGINE_MAP.get(engine_name)

    if not flow_to_run:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Engine '{engine_name}' not found. Available engines: {list(ENGINE_MAP.keys())}",
        )

    # In a real application, you would pass relevant parameters to the flow run.
    # For now, we just pass the user_id for demonstration.
    await flow_to_run.trigger(user_id=user_id)

    return {
        "status": "Engine Flow Queued",
        "engine": engine_name,
        "user": user_id,
        "detail": f"Successfully queued flow: {flow_to_run.name}",
    }

# --- Integration Hint ---
# To activate these engine routes, this router must be included in the main
# FastAPI application. In `main.py`, add the following lines:
#
# from src.api import engine_routes
#
# app.include_router(engine_routes.router)
