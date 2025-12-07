"""
Diagnostic script to inspect the raw API response from DataForSEO.

This script helps to debug issues where API credits are consumed but no
data is displayed, by showing the exact output received from the API.
"""

import asyncio
import os
from dotenv import load_dotenv

from src.utils.dataforseo_client import get_domain_overview

async def diagnose():
    """
    Diagnoses the DataForSEO API connection and raw response.
    """
    load_dotenv()
    target_domain = os.getenv("TARGET_DOMAIN")

    if not target_domain:
        print("❌ Error: TARGET_DOMAIN not set in .env file.")
        return

    # Sanitize domain, reusing logic from db.py
    clean_domain = (
        target_domain.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .rstrip("/")
    )

    print(f"🔍 Testing DataForSEO Connection for: {clean_domain}...")
    print(f" (Original TARGET_DOMAIN: {target_domain})")

    data = await get_domain_overview(clean_domain)

    print("\n--- Raw API Output ---")
    print(data)
    print("----------------------")

    if data:
        print("✅ Data received successfully (may contain None values).")
        # Check if key metrics within the data are None, which was the original problem
        if all(value is None for value in data.values()):
            print("⚠️ All key metrics in the received data are None.")
            print("   This might indicate DataForSEO has no data for this specific domain,")
            print("   or the API call succeeded but returned empty results due to filters/settings.")
    else:
        print("❌ API returned None. This usually means the API call failed.")
        print("   Possible reasons: Invalid credentials, network error, or unexpected API response structure.")
        print("   Check previous logs for 'DataForSEO API error' messages.")

if __name__ == "__main__":
    asyncio.run(diagnose())
