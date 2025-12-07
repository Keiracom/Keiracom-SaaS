import asyncio
import os
import sys

# Add the project root to the sys.path to allow absolute imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from src.utils.dataforseo_client import get_ranked_keywords

async def main():
    print("Starting probe_ranks script...")
    target_domain = "dripify.com"
    print(f"Fetching ranked keywords for {target_domain}...")
    ranked_keywords = await get_ranked_keywords(target_domain)

    if not ranked_keywords:
        print("No ranked keywords received.")
        return

    print(f"Received {len(ranked_keywords)} keywords. Processing first 10 and looking for rank > 10.")

    found_high_rank = False
    for i, item in enumerate(ranked_keywords):
        if i < 10:
            rank_value = item.get('rank')
            print(f"DEBUG: Keyword '{item.get('kw')}' | Rank: {rank_value} | Type: {type(rank_value)}")
        
        if item.get('rank') is not None and item.get('rank') > 10 and not found_high_rank:
            print(f"FOUND HIGH RANK: Keyword '{item.get('kw')}' | Rank: {item.get('rank')}")
            found_high_rank = True

    if not found_high_rank:
        print("No keyword with rank > 10 found in the results.")


if __name__ == "__main__":
    asyncio.run(main())
