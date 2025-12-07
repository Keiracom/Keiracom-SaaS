import os
import aiohttp
import logging
from typing import Dict, Any, List

# Configure logger
logger = logging.getLogger("instantly_client")

class InstantlyClient:
    """
    Client for interacting with the Instantly.ai API.
    Handles adding leads to campaigns and checking campaign status.
    """
    
    BASE_URL = "https://api.instantly.ai/api/v1"

    def __init__(self, api_key: str = None):
        """
        Initialize the client. 
        Args:
            api_key: Instantly API Key. Defaults to env var INSTANTLY_API_KEY.
        """
        self.api_key = api_key or os.getenv("INSTANTLY_API_KEY")
        if not self.api_key:
            logger.warning("INSTANTLY_API_KEY not found. Client disabled.")
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    async def add_lead_to_campaign(self, campaign_id: str, email: str, first_name: str, 
                                   last_name: str, company_name: str, custom_vars: Dict = None) -> bool:
        """
        Adds a single lead to a specific campaign.
        """
        if not self.api_key: return False

        url = f"{self.BASE_URL}/lead/add"
        
        payload = {
            "campaign_id": campaign_id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "company_name": company_name,
            "skip_if_in_workspace": True  # Prevent duplicate spam
        }
        
        if custom_vars:
            payload["custom_variables"] = custom_vars

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=payload, headers=self.headers) as response:
                    if response.status == 200:
                        logger.info(f"Successfully added {email} to campaign {campaign_id}")
                        return True
                    else:
                        error_text = await response.text()
                        logger.error(f"Failed to add lead: {response.status} - {error_text}")
                        return False
        except Exception as e:
            logger.error(f"Instantly API Error: {str(e)}")
            return False

    async def list_campaigns(self) -> List[Dict]:
        """
        Fetches all active campaigns to find the correct ID (e.g., 'Agency Rescue').
        """
        if not self.api_key: return []

        url = f"{self.BASE_URL}/campaign/list"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self.headers) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get("campaigns", [])
                    return []
        except Exception as e:
            logger.error(f"Error fetching campaigns: {e}")
            return []