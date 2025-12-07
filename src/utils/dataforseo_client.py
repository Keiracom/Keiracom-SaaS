import aiohttp
import json
from typing import List, Dict, Any

from src.config.settings import settings

async def get_ranked_keywords(
    target_domain: str,
    location_code: int = 2840,
    language_code: str = "en",
    filters: list = None
) -> List[Dict[str, Any]]:
    """
    Fetches ranked keywords from DataForSEO Labs API.
    Endpoint: /v3/dataforseo_labs/google/ranked_keywords/live
    """
    api_url = "https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live"
    
    auth = aiohttp.BasicAuth(
        login=settings.DATAFORSEO_LOGIN,
        password=settings.DATAFORSEO_PASSWORD
    )

    payload_entry = {
        "target": target_domain,
        "location_code": location_code,
        "language_code": language_code,
        "limit": 1000,
        "ignore_synonyms": True
    }
    if filters:
        payload_entry["filters"] = filters
    payload = [payload_entry]

    print(f"📡 Requesting ranked keywords for '{target_domain}' from DataForSEO Labs... {'with filters' if filters else ''}")

    try:
        async with aiohttp.ClientSession(auth=auth) as session:
            async with session.post(api_url, json=payload) as response:
                response.raise_for_status() # Raises ClientResponseError for 4xx/5xx
                
                data = await response.json()
                print(f"🐛 RAW API RESPONSE: {data}")
                
                # Check for logical errors within the API response structure
                if data and data.get("tasks") and data["tasks"][0].get("status_code") and data["tasks"][0]["status_code"] >= 40000:
                    print(f"❌ API Logical Error: {data['tasks'][0]['status_message']}")
                    return []
                
                # Safe parsing of the response
                if not (data and data.get("tasks") and data["tasks"][0].get("result")):
                    print("⚠️ API returned success, but no result array was found.")
                    return []
                
                result = data["tasks"][0]["result"]
                if not result or not result[0].get("items"):
                    print("⚠️ API returned success, but no items were found in the result.")
                    return []

                items = result[0]["items"]
                parsed_keywords = []
                for item in items:
                    keyword_data = item.get("keyword_data", {})
                    keyword_info = keyword_data.get("keyword_info", {})
                    ranked_serp_element = item.get("ranked_serp_element", {})
                    serp_item = ranked_serp_element.get("serp_item", {})

                    # The 'competition_level' seems to be a string, not a number.
                    # Mapping to a 0-100 scale will require more info on the possible values.
                    # For now, we'll just store it as is, or default to a numeric value.
                    competition = keyword_info.get('competition_level')
                    diff_value = 0
                    if isinstance(competition, str):
                        # Simple mapping for now, this may need to be more sophisticated
                        if competition == "HIGH": diff_value = 80
                        elif competition == "MEDIUM": diff_value = 50
                        elif competition == "LOW": diff_value = 20
                    
                    parsed_keywords.append({
                        'kw': keyword_data.get('keyword'),
                        'vol': keyword_info.get('search_volume'),
                        'cpc': keyword_info.get('cpc'),
                        'rank': serp_item.get('rank_group'),
                        'diff': diff_value
                    })
                
                print(f"✅ Successfully parsed {len(parsed_keywords)} keywords.")
                return parsed_keywords

    except aiohttp.ClientResponseError as e:
        print(f"❌ API Error: {e.status} - {e.message}")
        return []
    except Exception as e:
        print(f"❌ Unexpected Error: {str(e)}")
        return []
