"""
Engine 6: SERP Heist Prefect Flow

This flow implements the "Snippet Thief" logic from BLUEPRINT.md. It is
designed to identify keywords where a competitor holds the "Position 0"
Featured Snippet and generate a superior, optimized HTML asset to steal it.

The flow operates as follows:
1.  Finds keywords from the user's portfolio where a Featured Snippet exists
    but is not owned by the user.
2.  Analyzes the format of the competitor's snippet (e.g., paragraph, list).
3.  Uses a powerful AI call (Gemini) with a highly specific prompt to rewrite
    the competitor's content into a more concise and structured format (e.g.,
    an HTML bulleted list).
4.  Outputs a clean HTML block that is ready for injection into the user's
    target page.
"""

import asyncio
from prefect import flow, task
from typing import List, Dict, Any
from src.utils.gemini_client import gemini_agent, GeminiAgent

# --- Prefect Tasks ---

@task
def find_snippet_opportunities(project_id: int) -> List[Dict[str, Any]]:
    """(Mock) Finds keywords where a competitor owns a stealable Featured Snippet."""
    print(f"--- Task: Finding Snippet Opportunities for project_id={project_id} (Mock) ---")
    mock_opportunities = [
        {
            "term": "What is SEO",
            "current_snippet": "Search engine optimization is the art and science of getting pages to rank higher in search engines like Google. Because search is one of the main ways in which people discover content online, ranking higher in search engines can lead to an increase in traffic to a website.",
            "target_url": "https://user-site.com/blog/what-is-seo",
        },
        {
            "term": "How do dental implants work",
            "current_snippet": "A dental implant is a prosthesis that interfaces with the bone of the jaw or skull to support a dental prosthesis. The basis for modern dental implants is a biologic process called osseointegration in which materials, such as titanium, form an intimate bond to bone.",
            "target_url": "https://user-site.com/services/implants",
        },
    ]
    print(f"Found {len(mock_opportunities)} snippet theft opportunities.")
    return mock_opportunities

@task
def analyze_snippet_format(opportunity: Dict[str, Any]) -> str:
    """(Mock) Analyzes the snippet to determine the required transformation."""
    snippet, term = opportunity['current_snippet'], opportunity['term']
    print(f"--- Task: Analyzing Snippet Format for '{term}' ---")
    
    # Heuristic: If it's a long paragraph without HTML list tags, it's a target.
    if len(snippet) > 100 and "<li>" not in snippet:
        transformation = "PARAGRAPH_TO_LIST"
        print(f"  - Analysis: Detected a paragraph. Recommended transformation: {transformation}")
        return transformation
    
    print("  - Analysis: Snippet format is not a target for transformation.")
    return "FORMAT_OK"

@task
async def rewrite_and_optimize(opportunity: Dict[str, Any], transformation_type: str, agent: GeminiAgent) -> str:
    """Uses Gemini to rewrite the snippet into a more optimized HTML format."""
    term, current_snippet, target_url = opportunity['term'], opportunity['current_snippet'], opportunity['target_url']
    
    if transformation_type != "PARAGRAPH_TO_LIST":
        return f"<!-- No rewrite necessary for '{term}' -->"
    
    prompt = (
        f'The competitor snippet for "{term}" is: "{current_snippet}". '
        f'Rewrite this to be more concise (under 60 words) and format it as a clean HTML bulleted list, '
        f'suitable for injection into {target_url}. Return ONLY the <ul> or <ol> HTML block. '
        "Do not include markdown or explanations."
    )
    # Using real Gemini Agent
    response = await agent.generate_content(prompt)
    return response.strip().replace("```html", "").replace("```", "").strip()

# --- Main Prefect Flow ---

@flow(name="Engine 6: SERP Heist", log_prints=True)
async def serp_heist_flow(project_id: int):
    """Orchestrates the SERP Heist engine to steal Featured Snippets."""
    print(f"--- Starting Engine 6: SERP Heist (REAL AI) for project_id={project_id} ---")
    
    # Use real global agent
    ai_agent = gemini_agent

    opportunities = find_snippet_opportunities(project_id)
    if not opportunities:
        print("Flow complete: No snippet opportunities found.")
        return

    generated_assets = []
    for opp in opportunities:
        transformation = analyze_snippet_format(opp)
        if transformation == "PARAGRAPH_TO_LIST":
            new_html_asset = await rewrite_and_optimize(opp, transformation, ai_agent)
            generated_assets.append({
                "term": opp['term'],
                "target_url": opp['target_url'],
                "new_html": new_html_asset.strip(),
            })
            print(f"\nSuccessfully generated new HTML for '{opp['term']}'.")
        else:
            print(f"\nSkipping rewrite for '{opp['term']}' as its format is not a target.")

    if generated_assets:
        print("\n--- FINAL OUTPUT: All Generated HTML Snippets ---")
        for asset in generated_assets:
            print(f"--- For Keyword: '{asset['term']}' ---")
            print(f"Target URL: {asset['target_url']}")
            print("HTML Asset:")
            print(asset['new_html'])
            print("-------------------------------------------------")

    print("--- SERP Heist Flow Finished ---")

if __name__ == "__main__":
    test_project_id = 1
    asyncio.run(serp_heist_flow(project_id=test_project_id))
