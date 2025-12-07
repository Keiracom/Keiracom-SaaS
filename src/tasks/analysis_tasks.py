from prefect import task
from src.utils.gemini_client import GeminiAgent

@task
async def analyze_ranking(keyword: str, rank: int, url: str) -> str:
    agent = GeminiAgent()
    
    prompt = f"You are an SEO Strategist. The keyword '{keyword}' is currently ranking #{rank} for URL '{url}'.\n"
    
    if rank > 100:
        prompt += "Prescribe a 'Foundation & Indexing' strategy."
    elif 11 <= rank <= 20:
        prompt += "Prescribe a 'Strike Distance' optimization strategy."
    elif 1 <= rank <= 10:
        prompt += "Prescribe a 'Defense & CTR' strategy."
    else: # rank == 0 or other cases
        prompt += "The domain was not found in the top 100. Prescribe a 'Foundation & Indexing' strategy."

    prompt += "\nKeep the output under 50 words, actionable and prescriptive."
    
    analysis = await agent.generate_content(prompt)
    return analysis
