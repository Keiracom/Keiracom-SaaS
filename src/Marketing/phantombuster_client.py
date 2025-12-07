import os
import aiohttp
import logging
import asyncio
from typing import Dict, List

logger = logging.getLogger("phantom_client")

class PhantomBusterClient:
    """
    Client for PhantomBuster.
    Role: Triggers 'Phantoms' (Scrapers) and retrieves the JSON result.
    """
    
    BASE_URL = "https://api.phantombuster.com/api/v2"

    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("PHANTOMBUSTER_API_KEY")
        self.headers = {
            "X-Phantombuster-Key": self.api_key,
            "Content-Type": "application/json"
        }

    async def launch_phantom(self, agent_id: str, argument: Dict) -> str:
        """
        Triggers a scraper (e.g., Google Maps Scraper).
        Returns the container_id to track progress.
        """
        url = f"{self.BASE_URL}/agents/{agent_id}/launch"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json={"argument": argument}, headers=self.headers) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get("containerId")
                    return None
        except Exception as e:
            logger.error(f"Phantom Launch Error: {e}")
            return None

    async def get_output(self, container_id: str) -> List[Dict]:
        """
        Waits for the scraper to finish and grabs the result JSON.
        """
        url = f"{self.BASE_URL}/containers/{container_id}/output"
        # In a real scenario, this needs a polling loop with retries.
        # Simplified for this artifacts.
        return []