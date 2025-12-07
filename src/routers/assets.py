from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.utils.database import get_db
from src.utils.models import KeywordOpportunity, Project
from src.utils.auth import get_current_user
from src.schemas.assets import AssetResponse

router = APIRouter(
    prefix="/assets",
    tags=["Assets"],
)

@router.get("/strike-list", response_model=List[AssetResponse])
async def get_strike_list(
    session: AsyncSession = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    """
    Get a list of all keyword opportunities, sorted by the highest 'YES Score'.
    This represents the 'High Yield' view for the asset manager.
    """
    # Clerk User ID is in the 'sub' claim
    user_id = user.get("sub")
    
    result = await session.exec(
        select(KeywordOpportunity)
        .join(Project)
        .where(Project.user_id == user_id)
        .order_by(KeywordOpportunity.yes_score.desc())
    )
    assets = result.all()
    return assets
