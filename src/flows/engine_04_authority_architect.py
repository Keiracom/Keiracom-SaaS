
import asyncio
import json
from prefect import flow, task
from src.utils.gemini_client import gemini_agent, GeminiAgent

# --- Helper Functions for Mock Data ---

def get_mock_rival_keywords() -> list[str]:
    """Generates a large list of mock keywords to simulate competitor analysis."""
    base_keywords = [
        "dental check-up", "teeth cleaning", "cavity filling", "family dentist",
        "teeth whitening", "veneers cost", "smile makeover", "cosmetic dentist near me",
        "invisalign cost", "invisalign vs braces", "invisalign provider", "clear aligners", "adult braces",
        "dental implants cost", "single tooth implant", "all-on-4 implants", "implant dentist", "crowns and bridges",
        "emergency dentist", "toothache relief", "broken tooth fix", "24/7 dental care",
        "dentist accepts medicare", "dental insurance ppo", "financing options", "payment plans"
    ]
    # Multiply to simulate high volume from multiple competitors
    return base_keywords * 10

def get_mock_user_sitemap() -> list[str]:
    """Returns a mock list of URLs representing the user's existing content."""
    return [
        "/services/general-dentistry",
        "/services/cosmetic/teeth-whitening",
        "/services/restorative/implants",
        "/about-our-practice",
        "/contact-us",
        "/emergency-dental-care"
    ]

# --- Prefect Tasks ---

@task
def fetch_competitor_keywords() -> list[str]:
    """(Mock) Fetches and aggregates keywords from top competitor domains."""
    print("--- Task: Fetching Competitor Keywords (Mock) ---")
    keywords = get_mock_rival_keywords()
    print(f"Fetched {len(keywords)} total keywords from rivals.")
    return keywords

@task
async def create_semantic_clusters(all_keywords: list[str], agent: GeminiAgent) -> dict:
    """Uses Gemini to group a large list of keywords into semantic clusters."""
    print("--- Task: Creating Semantic Clusters via Gemini ---")
    keyword_sample = ", ".join(list(set(all_keywords))[:40])
    prompt = (
        "Act as an expert NLP Strategist. Take this list of keywords and group them into 5-10 distinct "
        "semantic clusters (e.g., 'Pricing', 'Integrations'). "
        f"Keyword list sample: [{keyword_sample}]. "
        "Return the result strictly as a valid JSON object: { 'cluster_name': ['kw1', 'kw2', ...], ... }. "
        "Do not include Markdown formatting or code blocks."
    )
    # Using real Gemini Agent
    response = await agent.generate_content(prompt)
    try:
        # Clean response if it contains markdown code blocks
        clean_response = response.replace("```json", "").replace("```", "").strip()
        cluster_map = json.loads(clean_response)
        print(f"Successfully parsed JSON and created {len(cluster_map)} semantic clusters.")
        return cluster_map
    except json.JSONDecodeError:
        print(f"ERROR: Failed to decode JSON from Gemini's clustering response. Raw: {response}")
        return {}

@task
def diagnose_topic_gaps(cluster_map: dict, sitemap: list[str]) -> list[str]:
    """Identifies topic gaps by comparing clusters against the user's sitemap."""
    print("--- Task: Diagnosing Topic Gaps ---")
    critical_gaps = []
    for cluster_name, keywords in cluster_map.items():
        # Heuristic: does a keyword from the cluster match a path in the sitemap?
        # A match suggests the user has *some* content on this topic.
        is_covered = any(
            any(part in url for url in sitemap if len(part) > 3)
            for keyword in keywords
            for part in keyword.replace(" and ", " ").split()
        )
        
        if not is_covered:
            print(f"  [GAP IDENTIFIED] No content found for cluster: '{cluster_name}'.")
            critical_gaps.append(cluster_name)
        else:
            print(f"  [COVERED] Content exists for cluster: '{cluster_name}'.")
    return critical_gaps

@task
async def generate_pillar_brief(missing_cluster: str, agent: GeminiAgent) -> dict:
    """Generates a JSON content pillar blueprint for a missing topic."""
    print(f"--- Task: Generating Pillar Brief for '{missing_cluster}' ---")
    prompt = (
        f"Based on the missing topic cluster '{missing_cluster}', generate a Content Pillar Blueprint. "
        'Output strictly a valid JSON object with fields: "pillar_title" (The Hub), "support_titles" '
        ' (a list of 3 spokes), "target_word_count", and "internal_link_strategy". '
        "Do not include Markdown formatting or code blocks."
    )
    # Using real Gemini Agent
    response = await agent.generate_content(prompt)
    try:
        clean_response = response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_response)
    except json.JSONDecodeError:
        print(f"ERROR: Failed to decode JSON for pillar brief. Raw: {response}")
        return {}

# --- Main Prefect Flow ---

@flow(name="Engine 4: Authority Architect", log_prints=True)
async def authority_architect_flow():
    """Orchestrates the Authority Architect engine to find and plan for content gaps."""
    print("--- Starting Engine 4: Authority Architect Flow (REAL AI) ---")
    
    # Use the real global agent
    ai_agent = gemini_agent
    
    keywords = fetch_competitor_keywords()
    cluster_map = await create_semantic_clusters(keywords, ai_agent)
    
    if not cluster_map:
        print("Flow terminating: Semantic clustering failed.")
        return
        
    sitemap = get_mock_user_sitemap()
    gaps = diagnose_topic_gaps(cluster_map, sitemap)
    
    if not gaps:
        print("Flow complete: No critical content gaps were identified.")
        return
        
    first_gap = gaps[0]
    print(f"\n[ATTACK PLAN] Generating content pillar blueprint for first gap: '{first_gap}'")
    
    pillar_blueprint = await generate_pillar_brief(first_gap, ai_agent)
    
    if pillar_blueprint:
        print("\n--- FINAL OUTPUT: PILLAR BLUEPRINT ---")
        print(json.dumps(pillar_blueprint, indent=2))
        print("--------------------------------------")
    
    print("--- Authority Architect Flow Finished ---")

if __name__ == "__main__":
    asyncio.run(authority_architect_flow())
