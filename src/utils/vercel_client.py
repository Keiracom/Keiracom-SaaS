import httpx
from src.config.settings import settings

class VercelClient:
    """
    Client for interacting with Vercel API to manage domains (The Ticker).
    Implements the 'Custodial Domain Protocol'.
    """
    BASE_URL = "https://api.vercel.com"

    def __init__(self):
        token = settings.VERCEL_TOKEN.get_secret_value() if settings.VERCEL_TOKEN else ""
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

    async def check_availability(self, domain: str) -> dict:
        """
        Check if a domain is available and get its price.
        Returns dict with 'available', 'price', 'period'.
        """
        async with httpx.AsyncClient() as client:
            try:
                # Using /v5/domains/price to check availability + price
                resp = await client.get(
                    f"{self.BASE_URL}/v5/domains/price",
                    params={"name": domain},
                    headers=self.headers
                )
                
                if resp.status_code == 200:
                    data = resp.json()
                    return {
                        "available": True,
                        "price": data.get("price"),
                        "period": data.get("period", 1),
                        "currency": "USD" # Vercel usually charges in USD
                    }
                elif resp.status_code == 400: # Not available or invalid
                    # Vercel returns 400 if domain is taken or invalid
                    return {"available": False, "reason": "Unavailable or Invalid"}
                else:
                    return {"available": False, "reason": f"API Error {resp.status_code}"}
                    
            except Exception as e:
                print(f"Vercel API Check Error: {e}")
                return {"available": False, "error": str(e)}

    async def buy_domain(self, domain: str) -> dict:
        """
        Purchase a domain immediately.
        WARNING: This charges the credit card connected to the Vercel Team.
        """
        async with httpx.AsyncClient() as client:
            try:
                payload = {
                    "name": domain,
                    "renew": True 
                }
                resp = await client.post(
                    f"{self.BASE_URL}/v5/domains/buy",
                    json=payload,
                    headers=self.headers
                )
                
                if resp.status_code == 200:
                    return {"success": True, "data": resp.json()}
                else:
                     return {"success": False, "error": resp.text, "status": resp.status_code}
            
            except Exception as e:
                print(f"Vercel Purchase Error: {e}")
                return {"success": False, "error": str(e)}

    async def add_domain_to_project(self, project_id: str, domain: str) -> dict:
        """
        Assign a purchased domain to a Vercel project (The Shell).
        """
        async with httpx.AsyncClient() as client:
            try:
                payload = {"name": domain}
                resp = await client.post(
                    f"{self.BASE_URL}/v9/projects/{project_id}/domains",
                    json=payload,
                    headers=self.headers
                )
                
                if resp.status_code == 200:
                    return {"success": True, "data": resp.json()}
                else:
                    return {"success": False, "error": resp.text, "status": resp.status_code}
            
            except Exception as e:
                return {"success": False, "error": str(e)}

# Singleton or factory
vercel_client = VercelClient()
