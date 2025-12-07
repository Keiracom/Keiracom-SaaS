"""
Engine 3: Strike Distance Sniper Prefect Flow (V2)

This flow implements the "Page 1 Accelerator" logic. It identifies keywords
ranking in the 'strike distance' (11-20) and provides a specific, actionable
'nudge' to push them onto the first page.

This version includes a more detailed diagnostic step, comparing the user's page
against mocked competitor data across three vectors: Content Depth, Schema
Markup, and Title Relevance.

Logic Overview:
1.  Fetch user's keyword rankings.
2.  Filter for keywords in the 'strike zone' (ranks 11-20).
3.  Sort by 'Impact Score' (Volume * CPC) to find the top target.
4.  Diagnose the ranking gap by comparing the target page to competitor averages.
5.  Craft a precise, AI-generated nudge to resolve the identified gap.
"""

import asyncio
import re
from prefect import flow, task

# --- Mock Clients for Development ---

class MockGeminiClient:
    """Mocks the Gemini AI client for nudge generation tasks."""
    def __init__(self):
        print("MockGeminiClient initialized.")

    async def generate_text(self, prompt: str) -> str:
        """Simulates a call to the Gemini API to generate a nudge."""
        print("\n--- Task: Crafting Nudge (Mock Gemini) ---")
        print(f"Received Prompt:\n'''{prompt}'''")
        await asyncio.sleep(0.5)

        if "JSON-LD FAQ schema" in prompt:
            return """
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is considered a dental emergency?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Any dental issue that requires immediate attention to save a tooth, stop ongoing bleeding, or alleviate severe pain is an emergency. This includes abscesses, knocked-out teeth, and severe toothaches."
    }
  },{
    "@type": "Question",
    "name": "How much does an emergency dental visit cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The cost varies depending on the necessary treatment. We provide a full cost estimate before any procedure begins."
    }
  }]
}
```
"""
        elif "extend an article" in prompt:
            return """
**H2: Common Signs Your Home Has a Hidden Water Leak**
*   An unexpected and significant increase in your water bill.
*   The persistent sound of running water when all faucets are off.
*   Musty smells or visible mold growth on walls, ceilings, or floors.
*   Damp spots or discoloration appearing on drywall.
*   A water meter dial that spins even when you're not using any water.
"""
        return "Unrecognized prompt for nudge generation."

# --- Helper for Mock Data ---

def get_mock_competitor_data(keyword: str) -> dict:
    """Returns mock competitor data for a keyword to test diagnostic logic."""
    if 'dentist' in keyword:
        # Competitors have schema, making it the primary gap for our page.
        return {'competitor_avg_word_count': 1500, 'competitors_use_schema': True}
    if 'plumber' in keyword:
        # Competitors have much longer content, making our page 'thin'.
        return {'competitor_avg_word_count': 2500, 'competitors_use_schema': False}
    # Default case for 'root canal' - will trigger title mismatch.
    return {'competitor_avg_word_count': 1200, 'competitors_use_schema': False}

# --- Prefect Tasks ---

@task
def fetch_user_rankings(user_domain: str, location_code: str) -> list[dict]:
    """(Mock) Fetches user's current keyword rankings with detailed page attributes."""
    print(f"--- Task: Fetching User Rankings for {user_domain} (Mock) ---")
    return [
        {'term': 'emergency dentist open now', 'rank': 12, 'url': f'https://{user_domain}/emergency', 'h1': 'Our Emergency Services', 'cpc': 35.0, 'vol': 800, 'da_score': 30, 'word_count': 1200, 'has_schema': False},
        {'term': 'leaky pipe plumber', 'rank': 15, 'url': f'https://{user_domain}/leaks', 'h1': 'Plumbing Services for Leaks', 'cpc': 45.0, 'vol': 450, 'da_score': 30, 'word_count': 800, 'has_schema': False},
        {'term': 'affordable root canal', 'rank': 18, 'url': f'https://{user_domain}/procedures', 'h1': 'Our Dental Procedures', 'cpc': 15.0, 'vol': 300, 'da_score': 30, 'word_count': 1300, 'has_schema': False},
        {'term': 'best local dentist', 'rank': 5, 'url': f'https://{user_domain}/', 'h1': 'Best Local Dentist', 'cpc': 20.0, 'vol': 600, 'da_score': 30, 'word_count': 2000, 'has_schema': True},
    ]

@task
def filter_strike_zone(rankings: list[dict]) -> list[dict]:
    """Filters rankings for ranks 11-20 and sorts by Impact Score."""
    print("--- Task: Filtering for Strike Zone & Sorting by Impact ---")
    zone_candidates = [r for r in rankings if 11 <= r.get('rank', 0) <= 20]
    if not zone_candidates:
        print("No candidates found in the strike zone.")
        return []
    for r in zone_candidates:
        r['impact_score'] = r.get('vol', 0) * r.get('cpc', 0)
    sorted_candidates = sorted(zone_candidates, key=lambda x: x['impact_score'], reverse=True)
    print(f"Found and sorted {len(sorted_candidates)} strike zone candidates.")
    return sorted_candidates

@task
def diagnose_ranking_gap(victim: dict) -> tuple[str, dict]:
    """Diagnoses the ranking gap by comparing the victim to mock competitor data."""
    print(f"--- Task: Diagnosing Ranking Gap for '{victim['term']}' ---")
    term, victim_wc, victim_has_schema, victim_h1 = victim['term'], victim['word_count'], victim['has_schema'], victim['h1']
    comp_data = get_mock_competitor_data(term)
    
    print(f"  - Victim Analysis: WC={victim_wc}, HasSchema={victim_has_schema}, H1='{victim_h1}'")
    print(f"  - Competitor Avg: WC={comp_data['competitor_avg_word_count']}, UsesSchema={comp_data['competitors_use_schema']}")

    # Priority 1: Schema Gap (Vector B)
    if comp_data['competitors_use_schema'] and not victim_has_schema:
        return 'MISSING_FAQ_SCHEMA', victim
    # Priority 2: Content Gap (Vector A)
    if victim_wc < (comp_data['competitor_avg_word_count'] - 500):
        return 'CONTENT_THIN', victim
    # Priority 3: Title Gap (Vector C)
    if not all(re.search(r'\b' + re.escape(word) + r'\b', victim_h1, re.IGNORECASE) for word in term.split()):
        return 'TITLE_MISMATCH', victim
        
    return 'NO_GAP_FOUND', victim

@task
async def craft_nudge(gap_info: tuple[str, dict], client: MockGeminiClient) -> str:
    """Uses Gemini to craft a nudge based on the diagnosed gap."""
    gap_type, victim = gap_info
    term = victim['term']
    
    if gap_type == 'MISSING_FAQ_SCHEMA':
        prompt = f"Generate a minimum JSON-LD FAQ schema (using schema.org) for the keyword '{term}'. Return ONLY the JSON code block."
    elif gap_type == 'CONTENT_THIN':
        prompt = f"Write a suggested H2 heading and 5 bullet points to extend an article about '{term}' by 500 words. Return ONLY the new heading and text."
    else:
        return f"// No nudge action defined for GapType '{gap_type}'."
        
    return await client.generate_text(prompt)

# --- Main Prefect Flow ---

@flow(name="Engine 3: Strike Distance Sniper (V2)", log_prints=True)
async def strike_distance_flow(user_domain: str, location_code: str = "1023191"):
    """Orchestrates the Strike Distance Sniper engine with detailed diagnosis."""
    print(f"--- Starting Engine 3: Strike Distance Flow (V2) for '{user_domain}' ---")
    ai_client = MockGeminiClient()
    
    rankings = fetch_user_rankings(user_domain, location_code)
    strike_zone_victims = filter_strike_zone(rankings)
    
    if not strike_zone_victims:
        print("Flow complete: No keywords found in the strike distance zone.")
        return
        
    top_victim = strike_zone_victims[0]
    print(f"\n[ATTACK PLAN] Focusing on highest impact target: '{top_victim['term']}' (Rank: {top_victim['rank']}).")
    
    gap_type, victim = diagnose_ranking_gap(top_victim)
    print(f"Diagnosis Result: '{gap_type}'")
    
    if gap_type != 'NO_GAP_FOUND':
        nudge = await craft_nudge((gap_type, victim), ai_client)
        print("\n--- FINAL OUTPUT: ACTIONABLE NUDGE ---")
        print(nudge)
        print("-----------------------------------")
    else:
        print("\n--- No actionable gap found for the top victim. ---")
    
    print("--- Strike Distance Flow Finished ---")

if __name__ == "__main__":
    test_domain = "brightsmiledental.com"
    asyncio.run(strike_distance_flow(user_domain=test_domain))