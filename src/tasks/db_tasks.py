from prefect import task
from src.utils.database import async_session
from src.models.core import Keyword, RankingLog
from sqlalchemy.future import select
from typing import List

@task
async def get_active_keywords() -> List[Keyword]:
    async with async_session() as session:
        result = await session.execute(select(Keyword))
        return result.scalars().all()

@task
async def save_rank_history(keyword_id: int, rank: int, url: str, analysis: str | None = None):
    async with async_session() as session:
        async with session.begin():
            ranking_log = RankingLog(keyword_id=keyword_id, rank=rank, url=url, analysis=analysis)
            session.add(ranking_log)
