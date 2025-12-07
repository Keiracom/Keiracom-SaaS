from prefect import flow
from src.tasks.db_tasks import get_active_keywords, save_rank_history
from src.tasks.serp_tasks import fetch_rank_live
from src.tasks.analysis_tasks import analyze_ranking

@flow
async def daily_harvest_flow():
    print("Starting daily harvest...")
    keywords = await get_active_keywords()
    
    for keyword in keywords:
        rank, url = await fetch_rank_live(
            keyword=keyword.text,
            domain=keyword.domain,
            location=keyword.location,
            device=keyword.device
        )
        
        analysis = await analyze_ranking(
            keyword=keyword.text,
            rank=rank,
            url=url
        )
        
        await save_rank_history(
            keyword_id=keyword.id,
            rank=rank,
            url=url,
            analysis=analysis
        )
        print(f"Checked '{keyword.text}': Rank {rank}")
        print(f"  > Analysis: {analysis}")
