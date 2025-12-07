from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from typing import List

from src.api.schemas import DashboardResponse, RankingResponse
from src.utils.database import get_db
from src.models.core import User, Keyword, RankingLog

router = APIRouter()

@router.get("/dashboard/{user_id}", response_model=DashboardResponse)
async def get_dashboard_state(user_id: int, db: AsyncSession = Depends(get_db)):
    # Fetch User
    user_result = await db.execute(select(User).filter(User.id == user_id))
    user = user_result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch Keywords for the User
    keywords_result = await db.execute(select(Keyword).filter(Keyword.user_id == user_id))
    keywords = keywords_result.scalars().all()

    active_keywords_data: List[RankingResponse] = []
    for keyword in keywords:
        # Fetch the latest RankingLog for each keyword
        latest_ranking_log_result = await db.execute(
            select(RankingLog)
            .filter(RankingLog.keyword_id == keyword.id)
            .order_by(desc(RankingLog.created_at))
            .limit(1)
        )
        latest_ranking_log = latest_ranking_log_result.scalars().first()

        if latest_ranking_log:
            active_keywords_data.append(
                RankingResponse(
                    keyword=keyword.text,
                    domain=keyword.domain,
                    rank=latest_ranking_log.rank,
                    device=keyword.device,
                    analysis=latest_ranking_log.analysis,
                    last_updated=latest_ranking_log.created_at
                )
            )
        else:
            # If no ranking log, still include the keyword with default/empty values
            active_keywords_data.append(
                RankingResponse(
                    keyword=keyword.text,
                    domain=keyword.domain,
                    rank=0,  # Or a suitable default
                    device=keyword.device,
                    analysis="No ranking data available yet.",
                    last_updated=datetime.now() # placeholder
                )
            )

    return DashboardResponse(
        user_email=user.email,
        active_keywords=active_keywords_data
    )
