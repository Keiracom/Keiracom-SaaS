"Lob.com API Client for Keiracom v3.0

This module provides a client for interacting with the Lob.com API
to send physical mail, such as postcards.
"

import asyncio
import os
import json
import base64
from typing import Dict, Any, Optional

import aiohttp
from dotenv import load_dotenv

from src.config.settings import settings

class LobClient:
    """
    A client for Lob.com API to send physical mail.
    """
    BASE_URL = "https://api.lob.com/v1"

    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("LOB_API_KEY must be provided for LobClient.")
        self.api_key = api_key

    @property
    def _headers(self) -> Dict[str, str]:
        # Lob.com uses Basic Auth with the API key as the username and an empty password
        auth_string = f"{self.api_key}:"
        encoded_auth = base64.b64encode(auth_string.encode()).decode("ascii")
        return {
            "Content-Type": "application/json",
            "Authorization": f"Basic {encoded_auth}"
        }

    async def _make_request(self, endpoint: str, method: str = "POST", json_data: Optional[Dict] = None, form_data: Optional[aiohttp.FormData] = None) -> Dict[str, Any]:
        """
        Internal helper to make requests to the Lob.com API.
        """
        url = f"{self.BASE_URL}/{endpoint}"
        
        async with aiohttp.ClientSession(headers=self._headers) as session:
            try:
                print(f"Lob API Request: {method} {url}")
                if method == "POST":
                    if json_data:
                        async with session.post(url, json=json_data) as response:
                            response.raise_for_status()
                            return await response.json()
                    elif form_data:
                        # For file uploads, headers might need to be adjusted (aiohttp handles Content-Type for FormData)
                        # We'll re-create session without Content-Type header to allow aiohttp to manage it.
                        async with aiohttp.ClientSession(headers={"Authorization": self._headers["Authorization"]}) as file_session:
                            async with file_session.post(url, data=form_data) as response:
                                response.raise_for_status()
                                return await response.json()
                else:
                    raise ValueError(f"Unsupported HTTP method: {method}")
            except aiohttp.ClientResponseError as e:
                print(f"❌ Lob API HTTP Error ({endpoint}): {e.status} - {e.message}")
                print(f"Response: {await e.response.text()}")
                raise
            except Exception as e:
                print(f"❌ Lob API Request Error ({endpoint}): {e}")
                raise

    async def send_postcard(self, to_address: Dict[str, Any], from_address: Dict[str, Any], pdf_file_path: str, description: str = "Keiracom Direct Mail") -> Optional[Dict[str, Any]]:
        """
        Sends a postcard using the Lob.com API.

        Args:
            to_address: Dictionary representing the recipient's address.
            from_address: Dictionary representing the sender's address.
            pdf_file_path: Path to the PDF file to be printed on the postcard.
            description: Description for the postcard (e.g., "Keiracom Direct Mail").
        
        Returns:
            A dictionary with the Lob.com API response for the created postcard, or None on failure.
        """
        # Read PDF content and encode to base64
        try:
            with open(pdf_file_path, "rb") as f:
                pdf_content = base64.b64encode(f.read()).decode("utf-8")
        except FileNotFoundError:
            print(f"❌ PDF file not found at: {pdf_file_path}")
            return None
        except Exception as e:
            print(f"❌ Error reading PDF file: {e}")
            return None

        # Lob.com API expects a form-data style POST for file uploads, not JSON for file itself
        # This will be handled by aiohttp.FormData
        form = aiohttp.FormData()
        form.add_field('description', description)
        form.add_field('to', json.dumps(to_address), content_type='application/json')
        form.add_field('from', json.dumps(from_address), content_type='application/json')
        form.add_field('front', pdf_content) # Base64 encoded PDF for the front
        # For a true postcard, you might need 'back' also. For simplicity, front only.

        try:
            response_data = await self._make_request("postcards", method="POST", form_data=form)
            print(f"✅ Postcard sent successfully: {response_data.get('id')}")
            return response_data
        except Exception as e:
            print(f"❌ Failed to send postcard: {e}")
            return None

async def main():
    load_dotenv()
    
    # Ensure a dummy PDF exists for testing
    dummy_pdf_path = "test_postcard.pdf"
    if not os.path.exists(dummy_pdf_path):
        print(f"Creating dummy PDF for test: {dummy_pdf_path}")
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph
        from reportlab.lib.styles import getSampleStyleSheet
        doc = SimpleDocTemplate(dummy_pdf_path, pagesize=letter)
        styles = getSampleStyleSheet()
        story = [Paragraph("This is a dummy PDF for Lob.com testing.", styles['Normal'])]
        doc.build(story)
        print("Dummy PDF created.")

    # Attempt to get API key from settings
    lob_api_key_secret = settings.LOB_API_KEY
    if not lob_api_key_secret:
        print("❌ LOB_API_KEY not set in .env or settings. Exiting test.")
        return
    lob_api_key = lob_api_key_secret.get_secret_value()

    client = LobClient(api_key=lob_api_key)
    
    # Dummy addresses (Lob.com requires real, deliverable addresses for live API)
    # Use test environment API key to avoid real charges and validate addresses
    to_address_dummy = {
        "name": "Recipient Name",
        "address_line1": "123 Main St",
        "address_city": "San Francisco",
        "address_state": "CA",
        "address_zip": "94107",
        "address_country": "US"
    }
    from_address_dummy = {
        "name": "Sender Name",
        "address_line1": "456 Market St",
        "address_city": "San Francisco",
        "address_state": "CA",
        "address_zip": "94103",
        "address_country": "US"
    }

    print(f"\n--- Testing LobClient: Sending dummy postcard ---")
    
    try:
        postcard_response = await client.send_postcard(to_address_dummy, from_address_dummy, dummy_pdf_path)
        if postcard_response:
            print("\n--- Lob.com Postcard Response ---")
            print(json.dumps(postcard_response, indent=2))
        else:
            print("\nFailed to send postcard.")
    except Exception as e:
        print(f"\nFailed to send postcard: {e}")

if __name__ == "__main__":
    print("--- Running Lob.com Client Test ---")
    asyncio.run(main())
    print("--- Lob.com Client Test Finished ---")
