from prefect import task
from src.utils.dataforseo_client import dataforseo_client
from src.config.settings import settings
from typing import Tuple

@task
async def fetch_rank_live(keyword: str, domain: str, location: str, device: str) -> Tuple[int, str]:
    payload = [
        {
            "keyword": keyword,
            "location_name": location,
            "device": device,
            "language_code": "en",
        }
    ]
    
    response = await dataforseo_client.post_request("serp/google/organic/live/regular", payload)
    
    if response and response.get("tasks") and response["tasks"][0].get("result"):
        result = response["tasks"][0]["result"][0]
        if result and result.get("items"):
            for item in result["items"]:
                if item.get("type") == "organic" and item.get("domain") == domain:
                    return item.get("rank_group", 0), item.get("url", "")
    
    return 101, ""  # Not found
