from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlmodel.ext.asyncio.session import AsyncSession

from src.utils.database import get_db as get_session
from src.utils.models import Project
from src.utils.auth import get_current_user
from src.utils.vercel_client import vercel_client

# Define the request model for purchasing a domain
class IPOPurchaseRequest(BaseModel):
    domain: str
    vibe_code: str  # $SAAS, $TRUST, etc.
    payment_token: str # Stripe/Paddle token (placeholder for now)
    
class IPOResponse(BaseModel):
    status: str
    ticker: str
    project_id: int
    message: str

router = APIRouter(
    prefix="/ipo",
    tags=["IPO Engine"],
)

@router.post("/purchase", response_model=IPOResponse)
async def purchase_ipo(
    request: IPOPurchaseRequest,
    session: AsyncSession = Depends(get_session),
    user: dict = Depends(get_current_user)
):
    """
    Executes the 'Initial Publishing Offering' (IPO).
    1. Validates Payment (Mocked for now).
    2. Buys the Domain (Ticker) via Vercel.
    3. Creates the Project (Shell) in DB.
    4. Triggers Seed Asset Generation (Engine 4) - Async.
    """
    user_id = user.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User authentication required.")

    print(f"🚀 Starting IPO for Ticker: {request.domain} (Vibe: {request.vibe_code})")

    # 1. Check Availability (Double Check)
    availability = await vercel_client.check_availability(request.domain)
    if not availability.get("available"):
         raise HTTPException(status_code=400, detail=f"Domain {request.domain} is no longer available.")

    # 2. Buy the Ticker (Domain)
    # WARNING: In production, we would validate 'request.payment_token' here first.
    purchase_result = await vercel_client.buy_domain(request.domain)
    
    if not purchase_result.get("success"):
        # If purchase fails, abort and return error
        raise HTTPException(status_code=500, detail=f"IPO Failed during Ticker Acquisition: {purchase_result.get('error')}")

    # 3. Create the Shell (Project in DB)
    new_project = Project(
        name=request.domain,
        user_id=user_id,
        mode="global", # IPOs are global by default
        active=True
    )
    session.add(new_project)
    await session.commit()
    await session.refresh(new_project)
    
    # 4. (TODO) Trigger Vercel Project Creation & Link Domain
    # We would call vercel_client.add_domain_to_project() here.
    # For now, we assume the Vercel Project 'keiracom-shell' exists and we will link it later.
    
    # 5. (TODO) Trigger Engine 4 (Seed Assets)
    # celery_app.send_task("generate_seed_assets", args=[new_project.id])

    return IPOResponse(
        status="IPO_SUCCESSFUL",
        ticker=request.domain,
        project_id=new_project.id,
        message="The Ticker has been acquired. The Shell is being provisioned."
    )
