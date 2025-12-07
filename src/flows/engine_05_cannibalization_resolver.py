"""
Engine 5: Cannibalization Resolver Prefect Flow

This flow implements the "Highlander Protocol" to resolve internal keyword
cannibalization, ensuring that only one URL ("The Winner") targets a specific
keyword, thereby consolidating authority.

The flow operates as follows:
1.  Identifies keywords for which the user's project has multiple URLs ranking
    in the top 50 (a "conflict").
2.  For each conflict, it calculates a "Strength Score" for every competing URL
    based on rank, backlinks, and traffic.
3.  The URL with the highest score is designated the "Winner," and all others
    are marked as "Losers."
4.  It then uses an AI call (Gemini) to generate a deployable `.htaccess` 301
    redirect rule to permanently redirect each Loser URL to the Winner URL.

"""

import asyncio
from prefect import flow, task
from typing import List, Dict, Any
import re

# --- Mock Clients for Development ---

class MockGeminiClient:
    """Mocks the Gemini AI client for generating redirect code snippets."""
    def __init__(self):
        print("MockGeminiClient initialized.")

    async def generate_text(self, prompt: str) -> str:
        """Simulates a call to the Gemini API to generate an .htaccess rule."""
        print("\n--- Task: Generating Redirect Code (Mock Gemini) ---")
        print(f"Received Prompt:\n'''{prompt}'''")
        await asyncio.sleep(0.5)

        match = re.search(r"redirect (https://.*?) to (https://.*?)\.", prompt)
        if match:
            loser_url, winner_url = match.groups()
            # For .htaccess, we typically use the path, not the full URL.
            loser_path = "/" + "/".join(loser_url.split("/")[3:])
            winner_path = "/" + "/".join(winner_url.split("/")[3:])
            return f"Redirect 301 {loser_path} {winner_url}"
        
        return "# Error: Could not parse URLs from prompt."

# --- Prefect Tasks ---

@task
def find_conflicts(project_id: int) -> List[Dict[str, Any]]:
    """(Mock) Finds keyword cannibalization conflicts from a simulated DB query."""
    print(f"--- Task: Finding Cannibalization Conflicts for project_id={project_id} (Mock) ---")
    mock_conflicts = [
        {
            "term": "affordable dental implants",
            "urls": [
                {"url": "https://user-site.com/implants-main-page", "rank": 8, "backlinks": 12, "traffic": 500},
                {"url": "https://user-site.com/blog/are-implants-worth-it", "rank": 14, "backlinks": 2, "traffic": 100},
            ],
        },
        {
            "term": "teeth whitening options",
            "urls": [
                {"url": "https://user-site.com/services/whitening", "rank": 9, "backlinks": 20, "traffic": 800},
                {"url": "https://user-site.com/blog/at-home-vs-pro-whitening", "rank": 11, "backlinks": 5, "traffic": 300},
                {"url": "https://user-site.com/pricing", "rank": 25, "backlinks": 50, "traffic": 50},
            ],
        },
    ]
    print(f"Found {len(mock_conflicts)} keywords with conflicting URLs.")
    return mock_conflicts

@task
def judge_winner(conflict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Applies the Strength Score formula to adjudicate a winner from competing URLs.
    Formula: Score = (Rank * -1) + (Backlinks * 0.5) + (Traffic * 0.2)
    """
    print(f"--- Task: Judging Winner for Conflict: '{conflict['term']}' ---")
    scored_urls = []
    for url_data in conflict['urls']:
        score = (
            (url_data.get('rank', 99) * -1) +
            (url_data.get('backlinks', 0) * 0.5) +
            (url_data.get('traffic', 0) * 0.2)
        )
        scored_urls.append({**url_data, 'strength_score': score})
        print(f"  - Calculated Score for {url_data['url']}: {score:.2f}")

    sorted_urls = sorted(scored_urls, key=lambda x: x['strength_score'], reverse=True)
    winner, losers = sorted_urls[0], sorted_urls[1:]
    
    print(f"  [WINNER] {winner['url']} (Score: {winner['strength_score']:.2f})")
    
    return {
        "term": conflict['term'],
        "winner": winner,
        "losers": losers
    }

@task
async def generate_redirect_code(winner_url: str, loser_url: str, client: MockGeminiClient) -> str:
    """Generates a 301 redirect rule using the Gemini client."""
    prompt = (
        f"Generate a standard Apache .htaccess 301 redirect rule to permanently redirect "
        f"{loser_url} to {winner_url}. Return ONLY the redirect code snippet."
    )
    return await client.generate_text(prompt)

# --- Main Prefect Flow ---

@flow(name="Engine 5: Cannibalization Resolver", log_prints=True)
async def cannibalization_resolver_flow(project_id: int):
    """Orchestrates the Highlander Protocol to resolve keyword cannibalization."""
    print(f"--- Starting Engine 5: Cannibalization Resolver for project_id={project_id} ---")
    ai_client = MockGeminiClient()

    conflicts = find_conflicts(project_id)
    if not conflicts:
        print("Flow complete: No cannibalization conflicts found.")
        return

    all_redirects = []
    for conflict in conflicts:
        adjudicated_conflict = judge_winner(conflict)
        winner = adjudicated_conflict['winner']
        
        for loser in adjudicated_conflict['losers']:
            print(f"\nProcessing redirect for term '{conflict['term']}':")
            print(f"  - Loser: {loser['url']}")
            print(f"  - Winner: {winner['url']}")
            
            redirect_code = await generate_redirect_code(
                winner_url=winner['url'],
                loser_url=loser['url'],
                client=ai_client
            )
            all_redirects.append({"term": conflict['term'], "rule": redirect_code})

    if all_redirects:
        print("\n--- FINAL OUTPUT: All Generated Redirect Rules ---")
        for item in all_redirects:
            print(f"  - For '{item['term']}': {item['rule']}")
        print("---------------------------------------------")

    print("--- Cannibalization Resolver Flow Finished ---")

if __name__ == "__main__":
    test_project_id = 42
    asyncio.run(cannibalization_resolver_flow(project_id=test_project_id))
