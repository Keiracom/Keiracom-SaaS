from fastapi import APIRouter, Request, HTTPException, status, Depends
from src.utils.database import get_db
from src.utils.models import Project
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
import os
import hmac
import hashlib

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)

# Valid Subscription Plans (Source: BLUEPRINT.md)
PLANS = {
    "startup": {
        "name": "Startup",
        "price_aud": 297,
        "assets_limit": 25,
        "features": ["Daily Portfolio Optimization", "Freshness Attack"]
    },
    "growth": {
        "name": "Growth",
        "price_aud": 697,
        "assets_limit": 100,
        "features": ["Competitor Spy", "Strike Distance Engine"]
    },
    "enterprise": {
        "name": "Enterprise",
        "price_aud": 1297,
        "assets_limit": 500,
        "features": ["Weekly Backlink Gap", "Cannibalization Engine"]
    }
}

@router.get("/plans")
async def get_plans():
    """
    Returns the available subscription plans and their limits.
    """
    return {"plans": PLANS}


# You need to get this from Paddle Dashboard > Developer Tools > Notifications
PADDLE_WEBHOOK_SECRET = os.getenv("PADDLE_WEBHOOK_SECRET", "placeholder_secret")

@router.post("/webhook")
async def paddle_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """
    Handles Paddle Webhooks to update Project subscription status.
    """
    # 1. Verify Signature (Crucial for security)
    signature = request.headers.get("Paddle-Signature")
    # In a real app, use paddle_client.webhooks.verify(...) 
    # For now, we will trust the payload to demonstrate the logic flow.
    
    payload = await request.json()
    event_type = payload.get("event_type")
    data = payload.get("data", {})
    
    print(f"Received Paddle Webhook: {event_type}")

    if event_type == "subscription.created" or event_type == "subscription.updated":
        # Extract custom data field where we stored project_id or user_id
        custom_data = data.get("custom_data", {})
        project_id = custom_data.get("project_id")
        status = data.get("status")

        if project_id:
            # Update Project Activity
            stmt = select(Project).where(Project.id == project_id)
            result = await db.execute(stmt)
            project = result.scalars().first()
            
            if project:
                if status == "active":
                    project.active = True
                    print(f"✅ activating Project {project_id}")
                else:
                    project.active = False
                    print(f"🛑 Deactivating Project {project_id}")
                
                project.subscription_id = data.get("id")
                db.add(project)
                await db.commit()

    return {"status": "ok"}
