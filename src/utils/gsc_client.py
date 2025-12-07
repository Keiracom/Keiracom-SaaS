"""
Google Search Console (GSC) API Client for Keiracom v3.0

This module provides a client for interacting with the Google Search Console API,
handling OAuth2 authentication and making authenticated requests.
"""

import asyncio
import os
import json
from typing import Dict, Any, Optional, List

from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from dotenv import load_dotenv

from src.config.settings import settings

class GSCClient:
    """
    A client for Google Search Console API, handling OAuth2.
    """
    SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
    API_SERVICE_NAME = 'webmasters'
    API_VERSION = 'v3'

    def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
        if not client_id or not client_secret or not redirect_uri:
            raise ValueError("GSC Client ID, Secret, and Redirect URI must be provided.")
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self._credentials: Optional[Credentials] = None

    def _get_flow(self) -> Flow:
        """
        Creates an OAuth2 flow object.
        """
        return Flow.from_client_config(
            client_config={
                "web": {
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [self.redirect_uri]
                }
            },
            scopes=self.SCOPES
        )

    def get_auth_url(self) -> str:
        """
        Generates the URL for user authorization.
        """
        flow = self._get_flow()
        flow.redirect_uri = self.redirect_uri
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )
        # Store the state for verification later (e.g., in a session)
        self._state = state
        print(f"Please go to this URL to authorize: {authorization_url}")
        return authorization_url

    async def exchange_code_for_token(self, authorization_response: str) -> bool:
        """
        Exchanges an authorization code for an access token and refresh token.
        """
        flow = self._get_flow()
        flow.redirect_uri = self.redirect_uri
        
        try:
            flow.fetch_token(authorization_response=authorization_response)
            self._credentials = flow.credentials
            print("✅ Successfully exchanged code for token.")
            return True
        except Exception as e:
            print(f"❌ Error exchanging code for token: {e}")
            return False

    def get_service(self):
        """
        Returns an authenticated Google Search Console service object.
        Refreshes tokens if necessary.
        """
        if not self._credentials:
            raise ValueError("Credentials not set. Please complete OAuth flow first.")
        
        # This will automatically refresh tokens if needed
        return build(self.API_SERVICE_NAME, self.API_VERSION, credentials=self._credentials)

    async def list_sites(self) -> List[str]:
        """
        Lists all sites verified in the authenticated Google Search Console account.
        """
        try:
            service = self.get_service()
            site_list = service.sites().list().execute()
            sites = [s['siteUrl'] for s in site_list.get('siteEntry', [])]
            print(f"✅ Found {len(sites)} sites in GSC.")
            return sites
        except HttpError as e:
            print(f"❌ GSC API HTTP Error listing sites: {e.resp.status} - {e._get_reason()}")
            return []
        except Exception as e:
            print(f"❌ Error listing sites: {e}")
            return []

async def main():
    load_dotenv()
    
    # Get GSC API keys from settings
    client_id_secret = settings.GOOGLE_CLIENT_ID
    client_secret_secret = settings.GOOGLE_CLIENT_SECRET
    redirect_uri = settings.GOOGLE_REDIRECT_URI

    if not client_id_secret or not client_secret_secret:
        print("❌ GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env. Exiting test.")
        return

    client_id = client_id_secret.get_secret_value()
    client_secret = client_secret_secret.get_secret_value()

    gsc_client = GSCClient(client_id, client_secret, redirect_uri)

    print("\n--- GSC Client OAuth Test ---")
    
    # 1. Get authorization URL
    auth_url = gsc_client.get_auth_url()
    print(f"Please open this URL in your browser to authorize Keiracom: {auth_url}")
    
    # Simulate user interaction to get the authorization response URL
    authorization_response = input("Paste the full redirect URL here after authorization: ")
    
    # 2. Exchange code for token
    if await gsc_client.exchange_code_for_token(authorization_response):
        # 3. List sites
        print("\n--- Listing GSC Sites ---")
        sites = await gsc_client.list_sites()
        if sites:
            print("Verified sites in your GSC account:")
            for site in sites:
                print(f"- {site}")
        else:
            print("No verified sites found or error listing sites.")
    else:
        print("Failed to get credentials. GSC test aborted.")

if __name__ == "__main__":
    print("--- Running Google Search Console Client Test ---")
    asyncio.run(main())
    print("--- GSC Client Test Finished ---")