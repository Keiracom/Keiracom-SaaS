from typing import List
from fastapi import APIRouter, Depends, Query
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.utils.database import get_db
from src.utils.models import KeywordOpportunity, CompetitorGap

router = APIRouter()

@router.get("/opportunities")
async def get_opportunities(
    project_id: int = Query(..., description="The ID of the project to fetch opportunities for"),
    session: AsyncSession = Depends(get_db)
) -> List[KeywordOpportunity]:
    """
    Fetch all keyword opportunities for a given project, sorted by YES score.
    """
    result = await session.exec(
        select(KeywordOpportunity)
        .where(KeywordOpportunity.project_id == project_id)
        .order_by(KeywordOpportunity.yes_score.desc())
    )
    opportunities = result.all()
    return opportunities if opportunities else []

@router.get("/gaps")
async def get_gaps(
    project_id: int = Query(..., description="The ID of the project to fetch gaps for"),
    session: AsyncSession = Depends(get_db)
) -> List[CompetitorGap]:
    """
    Fetch all competitor gaps for a given project, sorted by gap strength.
    """
    result = await session.exec(
        select(CompetitorGap)
        .where(CompetitorGap.project_id == project_id)
        .order_by(CompetitorGap.gap_strength.desc())
    )
    gaps = result.all()
    return gaps if gaps else []