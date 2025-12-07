"Apollo.io API Client for Keiracom v3.0

This module provides a client for interacting with the Apollo.io API
to perform contact and company data enrichment.
"

import asyncio
import os
import json
from typing import Dict, Any, Optional, List

import aiohttp
from dotenv import load_dotenv

from src.config.settings import settings

class ApolloClient:
    """
    A client for Apollo.io API to enrich contact data.
    """
    BASE_URL = "https://api.apollo.io/v1"

    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("APOLLO_API_KEY must be provided for ApolloClient.")
        self.api_key = api_key

    @property
    def _headers(self) -> Dict[str, str]:
        return {
            "Content-Type": "application/json",
            "X-Api-Key": self.api_key # Apollo.io uses X-Api-Key header
        }

    async def _make_request(self, endpoint: str, method: str = "GET", params: Optional[Dict] = None, json_data: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Internal helper to make requests to the Apollo.io API.
        """
        url = f"{self.BASE_URL}/{endpoint}"
        
        async with aiohttp.ClientSession(headers=self._headers) as session:
            try:
                print(f"Apollo API Request: {method} {url}")
                if method == "GET":
                    async with session.get(url, params=params) as response:
                        response.raise_for_status()
                        return await response.json()
                elif method == "POST":
                    async with session.post(url, json=json_data) as response:
                        response.raise_for_status()
                        return await response.json()
                else:
                    raise ValueError(f"Unsupported HTTP method: {method}")
            except aiohttp.ClientResponseError as e:
                print(f"❌ Apollo API HTTP Error ({endpoint}): {e.status} - {e.message}")
                print(f"Response: {e.history[-1].text if e.history else 'N/A'}")
                raise
            except Exception as e:
                print(f"❌ Apollo API Request Error ({endpoint}): {e}")
                raise

    async def search_contact(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Searches for a contact by email and returns basic contact data.
        """
        endpoint = "people/search"
        json_data = {
            "api_key": self.api_key, # Apollo.io also expects API key in body for some endpoints
            "q_organization_domains": [], # Not needed for email search
            "person_titles": [],
            "email_statuses": [],
            "per_page": 1,
            "page": 1,
            "email": email,
        }
        
        try:
            response_data = await self._make_request(endpoint, method="POST", json_data=json_data)
            people = response_data.get('people', [])
            if people:
                print(f"✅ Found contact for {email}.")
                return people[0]
            print(f"⚠️ No contact found for {email}.")
            return None
        except Exception:
            return None

    async def enrich_contact(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Enriches contact data by email. This might involve searching first
        and then fetching more details.
        For simplicity, we'll use search endpoint to get initial enrichment.
        """
        print(f"Enriching contact for email: {email}...")
        contact_data = await self.search_contact(email)
        
        # In a more advanced scenario, we might use a dedicated enrichment endpoint
        # if search_contact only returns basic data. For Apollo, search often provides
        # sufficient details for initial enrichment.
        return contact_data

async def main():
    load_dotenv()
    
    # Attempt to get API key from settings
    apollo_api_key_secret = settings.APOLLO_API_KEY
    if not apollo_api_key_secret:
        print("❌ APOLLO_API_KEY not set in .env or settings. Exiting test.")
        return
    apollo_api_key = apollo_api_key_secret.get_secret_value()

    client = ApolloClient(api_key=apollo_api_key)
    
    test_email = "elon.musk@tesla.com" # Example email
    print(f"\n--- Testing ApolloClient with email: {test_email} ---")
    
    try:
        enriched_data = await client.enrich_contact(test_email)
        if enriched_data:
            print("\n--- Enriched Contact Data ---")
            print(json.dumps(enriched_data, indent=2))
        else:
            print("\nNo enriched data found for the test email.")
    except Exception as e:
        print(f"\nFailed to enrich contact: {e}")

if __name__ == "__main__":
    print("--- Running Apollo.io Client Test ---")
    asyncio.run(main())
    print("--- Apollo.io Client Test Finished ---")
