"""
Engine 1: Revenue Shield Prefect Flow (Live Data Integration)

This flow implements the "Active Portfolio Optimization" logic for KeiraCom v3.0.
This updated version integrates the live DataForSEO client to fetch real
competitor data (Source B).

It performs the following steps:
1.  Fetches keyword opportunities from external sources (Source B is live).
2.  Filters them based on an 'Affordability Gate'.
3.  Calculates a proprietary 'YES Score'.
4.  Executes a 'Zero-Latency Swap' if a better opportunity is found.
"""
import asyncio
from prefect import flow, task
from sqlalchemy import select, asc
from typing import List, Dict, Any

# Project-specific imports
from src.config.settings import settings
from src.utils.db import get_session
from src.utils.models import Keyword, Project
from src.utils.dataforseo_client import DataForSEOClient # Import the real client

# --- Prefect Tasks ---

@task
def authenticate_dataforseo() -> DataForSEOClient:
    """
    Task to authenticate and instantiate the live DataForSEO API client.
    """
    print("--- Task: Authenticating Live DataForSEO Client ---")
    try:
        client = DataForSEOClient()
        return client
    except ValueError as e:
        print(f"FATAL: DataForSEO client initialization failed: {e}")
        # In a real scenario, we might want to fail the flow here
        raise

@task
def fetch_opportunities(client: DataForSEOClient, user_da: int) -> List[Dict[str, Any]]:
    """
    Task to fetch keyword opportunities from multiple sources and filter them
    through the 'Affordability Gate'. Source B is from the live API.
    """
    print(f"--- Task: Fetching Opportunities (User DA: {user_da}) ---")
    
    # --- Source B (Rivals) - LIVE DATA ---
    print("Fetching LIVE data for competitor 'amazon.com' (Source B)...")
    try:
        # Using a generic, high-authority competitor for testing purposes as requested
        rival_keywords_raw = client.get_ranked_keywords(domain="amazon.com", location_name="United States", limit=50)
    except Exception as e:
        print(f"ERROR: Live data call for Source B failed: {e}")
        rival_keywords_raw = []

    # Transform live data into the flow's expected internal format
    source_b_opportunities = []
    for item in rival_keywords_raw:
        kd = item.get('keyword_data', {})
        if kd.get('keyword') and kd.get('keyword_difficulty') is not None:
             source_b_opportunities.append({
                'term': kd.get('keyword'),
                'vol': kd.get('search_volume'),
                'cpc': kd.get('cpc'),
                'diff': kd.get('keyword_difficulty'),
             })
    print(f"Retrieved and processed {len(source_b_opportunities)} opportunities from Source B.")

    # --- Source A (GSC - Mocked) & Source C (Arbitrage - Mocked) ---
    print("Adding MOCK data for Source A (GSC) and Source C (Arbitrage)...")
    mock_opportunities = [
        {'term': 'internal gsc keyword opportunity', 'vol': 500, 'cpc': 2.5, 'diff': 15},
        {'term': 'high cpc arbitrage keyword', 'vol': 1000, 'cpc': 55.0, 'diff': 35},
    ]

    all_opportunities = source_b_opportunities + mock_opportunities
    
    # --- Affordability Gate ---
    affordability_threshold = user_da + 15
    print(f"Affordability Gate Threshold set to: Difficulty < {affordability_threshold}")
    
    eligible_opportunities = []
    for opp in all_opportunities:
        if opp.get('diff') is not None and opp['diff'] < affordability_threshold:
            eligible_opportunities.append(opp)
            print(f"  [PASS] '{opp['term']}' (Diff: {opp['diff']})")
        else:
            print(f"  [FAIL] '{opp['term']}' (Diff: {opp.get('diff', 'N/A')}) - Exceeds threshold or missing data.")
            
    return eligible_opportunities

@task
def calculate_yes_score(opportunities: list[dict]) -> list[dict]:
    """
    Task to calculate the YES Score for each opportunity based on the formula
    from BLUEPRINT.md and sort the results.
    """
    print("--- Task: Calculating YES Scores ---")
    if not opportunities:
        print("No opportunities to score.")
        return []

    for opp in opportunities:
        volume = opp.get('vol', 0) or 0
        cpc = opp.get('cpc', 0) or 0
        difficulty = opp.get('diff', 1) or 1

        yes_score = (volume * cpc) / (difficulty ** 1.5)
        opp['yes_score'] = round(yes_score, 2)
        print(f"  - Calculated YES Score for '{opp['term']}': {opp['yes_score']}")

    sorted_list = sorted(opportunities, key=lambda x: x.get('yes_score', 0), reverse=True)
    print("Opportunities sorted by YES Score (descending).")
    return sorted_list

@task
async def execute_swap(sorted_list: list[dict], project_id: int):
    """
    Task to perform the 'Zero-Latency Swap'. It replaces the lowest-performing active
    keyword in the user's portfolio with a higher-value opportunity.
    """
    print(f"--- Task: Executing Swap Logic for project_id: {project_id} ---")
    if not sorted_list:
        print("No new opportunities available to evaluate for a swap.")
        return

    highest_opportunity = sorted_list[0]
    highest_opp_yes = highest_opportunity.get('yes_score', 0)
    print(f"Highest scoring opportunity: '{highest_opportunity['term']}' (YES Score: {highest_opp_yes})")

    async with get_session() as session:
        lowest_keyword_stmt = (
            select(Keyword)
            .where(Keyword.project_id == project_id, Keyword.status == 'active')
            .order_by(asc(Keyword.yes_score).nullsfirst())
            .limit(1)
        )
        result = await session.execute(lowest_keyword_stmt)
        lowest_active_keyword = result.scalar_one_or_none()

        if not lowest_active_keyword:
            print("No active keywords in portfolio to compare against. Cannot swap.")
            return

        lowest_active_yes = lowest_active_keyword.yes_score or 0
        print(f"Lowest active keyword: '{lowest_active_keyword.term}' (YES Score: {lowest_active_yes})")

        if highest_opp_yes > lowest_active_yes:
            print(f"SWAP EXECUTED: New YES ({highest_opp_yes}) > Old YES ({lowest_active_yes})")
            
            lowest_active_keyword.status = 'paused'
            print(f"  - Setting status to 'paused' for old keyword: '{lowest_active_keyword.term}'")
            
            existing_keyword_stmt = select(Keyword).where(
                Keyword.project_id == project_id,
                Keyword.term == highest_opportunity['term']
            )
            existing_keyword_res = await session.execute(existing_keyword_stmt)
            existing_keyword = existing_keyword_res.scalar_one_or_none()
            
            if existing_keyword:
                print(f"  - Reactivating existing keyword: '{existing_keyword.term}'")
                existing_keyword.status = 'active'
                existing_keyword.yes_score = highest_opp_yes
            else:
                print(f"  - Creating new keyword entry: '{highest_opportunity['term']}'")
                new_keyword = Keyword(
                    project_id=project_id,
                    term=highest_opportunity['term'],
                    yes_score=highest_opp_yes,
                    status='active'
                )
                session.add(new_keyword)
            
            await session.commit()
            print("Database successfully updated.")
        else:
            print("No swap needed. Highest opportunity is not better than the portfolio's weakest keyword.")

# --- Main Prefect Flow ---

@flow(name="Engine 1: Revenue Shield", log_prints=True)
async def revenue_shield_flow(project_id: int, user_da: int):
    """
    Main flow to orchestrate the Revenue Shield engine.
    """
    print(f"--- Starting Revenue Shield Flow for project_id={project_id}, user_da={user_da} ---")
    
    try:
        client = authenticate_dataforseo()
        opportunities = fetch_opportunities(client, user_da)
        
        if opportunities:
            sorted_list = calculate_yes_score(opportunities)
            # Using .submit() to run the task in the background on a worker
            await execute_swap.submit(sorted_list, project_id)
        else:
            print("Flow finished early: No eligible opportunities found.")
    
    except Exception as e:
        print(f"An error occurred during the flow execution: {e}")

    print(f"--- Revenue Shield Flow for project_id={project_id} complete. ---")

if __name__ == "__main__":
    async def main():
        # A real project_id and DA score would be passed from the API trigger
        test_project_id = 1
        test_da_score = 40 
        
        print("NOTE: Running this flow directly requires valid DataForSEO credentials in settings.")
        await revenue_shield_flow(project_id=test_project_id, user_da=test_da_score)

    asyncio.run(main())
