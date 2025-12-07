from prefect import flow, task, get_run_logger
from .instantly_client import InstantlyClient
from .apollo_client import ApolloClient
from .phantombuster_client import PhantomBusterClient
import asyncio

# --- CONFIGURATION ---
# Campaign IDs from Instantly.ai (You find these in their dashboard)
CAMPAIGN_IDS = {
    "agency": "uuid-for-agency-rescue-campaign",
    "medical": "uuid-for-med-tech-campaign",
    "saas": "uuid-for-saas-automator-campaign"
}

# Phantom Agent IDs (You find these in PhantomBuster dashboard)
PHANTOM_IDS = {
    "maps_scraper": "1234567890" 
}

@task
async def hunt_leads(target_industry: str, city: str):
    """Step 1: Use PhantomBuster to find raw leads from Google Maps."""
    logger = get_run_logger()
    client = PhantomBusterClient()
    
    logger.info(f"Hunting {target_industry} in {city}...")
    
    # 1. Trigger the Map Scraper
    args = {"queries": [f"{target_industry} in {city}"]}
    container_id = await client.launch_phantom(PHANTOM_IDS["maps_scraper"], args)
    
    if not container_id:
        logger.error("Failed to launch hunter.")
        return []
        
    # 2. Wait for results (Simplified logic)
    # In production, we'd use a robust poller here.
    logger.info(f"Scraper running (Container {container_id})...")
    # Simulation of returning data
    return [
        {"company": "Acme Agency", "website": "acme.com"},
        {"company": "Beta Digital", "website": "beta.co.uk"}
    ]

@task
async def enrich_leads(raw_leads: list):
    """Step 2: Use Apollo to find the CEO's email."""
    logger = get_run_logger()
    client = ApolloClient()
    enriched_leads = []
    
    for lead in raw_leads:
        # Find the CEO
        person = await client.enrich_person(name="CEO", company_domain=lead['website'])
        if person:
            logger.info(f"Found Verified Email: {person['email']} for {lead['company']}")
            lead.update(person) # Add email/name to lead dict
            enriched_leads.append(lead)
        else:
            logger.info(f"No email found for {lead['company']}")
            
    return enriched_leads

@task
async def push_to_instantly(enriched_leads: list, campaign_type: str):
    """Step 3: Push to Instantly.ai to start the cold email sequence."""
    logger = get_run_logger()
    client = InstantlyClient()
    
    campaign_id = CAMPAIGN_IDS.get(campaign_type)
    if not campaign_id:
        logger.error(f"Unknown campaign type: {campaign_type}")
        return

    for lead in enriched_leads:
        success = await client.add_lead_to_campaign(
            campaign_id=campaign_id,
            email=lead['email'],
            first_name=lead.get('first_name', 'there'),
            last_name=lead.get('last_name', ''),
            company_name=lead['company']
        )
        if success:
            logger.info(f"Sent {lead['email']} to Instantly Campaign.")

@flow(name="Daily Marketing Engine")
async def daily_marketing_flow():
    """
    The Master Flow. Runs daily to fill the pipeline.
    """
    logger = get_run_logger()
    logger.info("Starting Daily Marketing Engine...")
    
    # Campaign A: Hunt Agencies in London
    raw_agencies = await hunt_leads("Marketing Agency", "London")
    clean_agencies = await enrich_leads(raw_agencies)
    await push_to_instantly(clean_agencies, "agency")
    
    # Campaign B: Hunt Med Spas in New York
    # raw_medspas = await hunt_leads("Medical Spa", "New York")
    # clean_medspas = await enrich_leads(raw_medspas)
    # await push_to_instantly(clean_medspas, "medical")
    
    logger.info("Daily Marketing Engine Finished.")

if __name__ == "__main__":
    asyncio.run(daily_marketing_flow())