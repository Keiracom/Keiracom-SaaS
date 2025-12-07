"""
Engine 2: Freshness Attack Flow

This engine identifies "Decaying Assets"—pages that were once successful but have
slipped in rankings due to stale content. It then uses Gemini to generate a 
"Freshness Injection": new sections, updated data points, or a 'From the Field' 
insight box to satisfy Google's 'QDF' (Query Deserves Freshness) algorithm.

Status: ACTIVE (Real AI Connected)
"""

import asyncio
from prefect import flow, task
from src.utils.gemini_client import gemini_agent, GeminiAgent

# --- Mock Data Source (Replacing with Real DataForSEO in Phase V) ---
# For now, we mock the "Traffic History" to identify a decaying page.

def get_decaying_pages(user_domain: str) -> list[dict]:
    """
    (Mock) Simulates fetching GSC/Analytics data to find pages with
    >20% traffic drop YoY.
    """
    return [
        {
            'url': f'https://{user_domain}/services/cosmetic-dentistry',
            'top_keyword': 'cosmetic dentistry trends',
            'last_updated_months_ago': 24,
            'traffic_drop_pct': 35,
            'current_content_snippet': "Cosmetic dentistry is popular in 2021. Veneers are a great option."
        }
    ]

# --- Prefect Tasks ---

@task
def identify_decay_candidates(user_domain: str) -> list[dict]:
    """Scans for pages that have lost significant traffic and haven't been updated."""
    print(f"--- Task: Scanning {user_domain} for Decay Candidates ---")
    candidates = get_decaying_pages(user_domain)
    if candidates:
        print(f"Found {len(candidates)} decaying pages.")
        for c in candidates:
            print(f"  > VICTIM: {c['url']} (Drop: -{c['traffic_drop_pct']}%)")
    else:
        print("No decaying pages found. Portfolio is healthy.")
    return candidates

@task
async def generate_freshness_update(page: dict, agent: GeminiAgent) -> str:
    """
    Generates a text update to refresh the stale content.
    We explicitly ask for 'New Trends' and 'Modern Data' to satisfy QDF.
    """
    print(f"--- Task: Generating Freshness Update for '{page['top_keyword']}' ---")
    
    prompt = f"""
    You are an expert SEO Content Editor.
    The following content is OUTDATED (from {2025 - (page['last_updated_months_ago'] // 12)}).
    
    Target Keyword: "{page['top_keyword']}"
    Old Snippet: "{page['current_content_snippet']}"
    
    Task: Write a new '2025 Update' section (approx 200 words) for this page.
    1. Include 3 bullet points on CURRENT trends for 2025.
    2. Add a 'Pro Tip' box content.
    3. Ensure the tone is authoritative and modern.
    
    Return ONLY the content in Markdown format.
    """
    
    return await agent.generate_content(prompt)

# --- Main Flow ---

@flow(name="Engine 2: Freshness Attack", log_prints=True)
async def freshness_attack_flow(user_domain: str):
    """Orchestrates the Freshness Attack engine."""
    print(f"--- Starting Engine 2: Freshness Attack for {user_domain} ---")
    
    candidates = identify_decay_candidates(user_domain)
    
    if not candidates:
        print("Flow Complete: No actions needed.")
        return

    # Process the top decay candidate
    victim = candidates[0]
    update_content = await generate_freshness_update(victim, gemini_agent)
    
    print("\n--- FINAL OUTPUT: FRESHNESS INJECTION ---")
    print(update_content)
    print("-----------------------------------------")

if __name__ == "__main__":
    asyncio.run(freshness_attack_flow("brightsmiledental.com"))
