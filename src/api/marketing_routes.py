"""
FastAPI Marketing Router for Keiracom v3.0

This module defines API endpoints for triggering marketing-related automation
flows, such as cold email campaigns and direct mail dispatch.
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

# 1. Initialize APIRouter
router = APIRouter()

# 2. Pydantic Schemas for Request Body
class MarketingTriggerRequest(BaseModel):
    campaign_id: str
    target_email: Optional[str] = None
    target_contact_id: Optional[str] = None
    trigger_type: str # e.g., "cold_email", "direct_mail"


# 3. Implement Endpoints
@router.post("/trigger")
async def trigger_marketing_flow(request: MarketingTriggerRequest):
    """
    Triggers a specified marketing automation flow.

    In a real scenario, this would likely enqueue a Prefect flow run
    based on the trigger_type and provided parameters.
    """
    print(f"Marketing Flow Triggered: Campaign ID - {request.campaign_id}, Type - {request.trigger_type}")
    if request.target_email:
        print(f"Target Email: {request.target_email}")
    if request.target_contact_id:
        print(f"Target Contact ID: {request.target_contact_id}")

    # TODO: Integrate with Prefect to actually trigger the flow (e.g., cold_email_sales_flow)

    return {
        "status": "success",
        "message": f"Marketing flow '{request.trigger_type}' triggered for campaign '{request.campaign_id}'.",
        "details": request.model_dump()
    }
