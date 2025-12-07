"""
Prefect Flow for Cold Email Sales Automation

This flow orchestrates the contact enrichment process using the ApolloClient
and can be extended to manage cold email campaigns.
"""

from prefect import flow, task
from prefect.deployments import Deployment
from typing import List, Dict, Any

from src.marketing.apollo_client import ApolloClient
from src.config.settings import settings
import asyncio
import os
from dotenv import load_dotenv

@task
async def enrich_contact_task(email: str) -> Dict[str, Any] | None:
    """
    Prefect task to enrich a single contact using ApolloClient.
    """
    load_dotenv() # Ensure .env is loaded within the task context
    apollo_api_key_secret = settings.APOLLO_API_KEY
    if not apollo_api_key_secret:
        print("❌ APOLLO_API_KEY not set for enrichment task.")
        return None
    apollo_api_key = apollo_api_key_secret.get_secret_value()

    client = ApolloClient(api_key=apollo_api_key)
    try:
        enriched_data = await client.enrich_contact(email)
        if enriched_data:
            print(f"✅ Enriched data for {email}: {enriched_data.get('first_name')} {enriched_data.get('last_name')}")
            return enriched_data
        else:
            print(f"⚠️ No enriched data found for {email}.")
            return None
    except Exception as e:
        print(f"❌ Error enriching {email}: {e}")
        return None

@flow(name="Cold Email Sales Automation Flow", log_prints=True)
async def cold_email_sales_flow(emails_to_enrich: List[str]):
    """
    Orchestrates the enrichment of a list of contacts for cold email campaigns.
    """
    print(f"Starting Cold Email Sales Flow for {len(emails_to_enrich)} emails...")
    
    enriched_results = await asyncio.gather(*[enrich_contact_task(email) for email in emails_to_enrich])
    
    successful_enrichments = [res for res in enriched_results if res is not None]
    print(f"Flow finished. Successfully enriched {len(successful_enrichments)} contacts.")
    
    return successful_enrichments

if __name__ == "__main__":
    load_dotenv() # Load env vars for direct script execution

    # Example usage:
    dummy_emails = [
        "elon.musk@example.com", # Use example.com to avoid actual API calls during test
        "bill.gates@example.com",
        "jeff.bezos@example.com",
        "nonexistent@example.com"
    ]
    
    # Check if APOLLO_API_KEY is available before running
    apollo_api_key_secret = settings.APOLLO_API_KEY
    if not apollo_api_key_secret or not apollo_api_key_secret.get_secret_value():
        print("🚨 APOLLO_API_KEY is not set in .env. Skipping Prefect flow test.")
        print("   Please set APOLLO_API_KEY in your .env file and uncomment it.")
    else:
        asyncio.run(cold_email_sales_flow(emails_to_enrich=dummy_emails))

    # --- Deployment Configuration (for Prefect server) ---
    # This section would be used to deploy the flow to a Prefect server.
    # For local testing, you typically run the flow directly.
    # deployment = Deployment.build_from_flow(
    #     flow=cold_email_sales_flow,
    #     name="cold-email-sales-automation",
    #     parameters={"emails_to_enrich": ["test@example.com"]},
    #     tags=["marketing", "cold-email"],
    # )
    # deployment.apply()
