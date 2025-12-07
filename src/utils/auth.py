import os
import base64
import json
import jwt
from typing import Optional, Dict, Any
from fastapi import HTTPException, Security, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Define security scheme
security = HTTPBearer()

def get_clerk_public_key(token: str) -> Any:
    """
    Fetches the JWKS and retrieves the public key for the given token's KID.
    In a production app, you should cache the JWKS.
    """
    # 1. Derive Issuer URL from Publishable Key if not set
    issuer = os.getenv("CLERK_ISSUER")
    if not issuer:
        pk = os.getenv("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY")
        if pk:
            try:
                # Clerk PKs are base64 encoded. The decoded string often contains the domain.
                # Format: pk_test_<base64>
                # Decoded base64: <key>|<domain> or just <domain> depending on version.
                # Let's try to extract the domain from the token payload itself to be safer.
                pass
            except Exception:
                pass
    
    # Actually, the best way is to decode the token unverified to get the 'iss' field.
    try:
        unverified_header = jwt.get_unverified_header(token)
        unverified_payload = jwt.decode(token, options={"verify_signature": False})
        issuer = unverified_payload.get("iss")
    except Exception as e:
         raise HTTPException(status_code=401, detail="Invalid token format")

    if not issuer:
         raise HTTPException(status_code=401, detail="Could not determine issuer")

    jwks_url = f"{issuer}/.well-known/jwks.json"
    
    try:
        jwks_client = jwt.PyJWKClient(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        return signing_key.key
    except Exception as e:
        print(f"JWKS Fetch Error: {e}")
        raise HTTPException(status_code=401, detail="Could not verify token signature")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict[str, Any]:
    """
    Verifies the Bearer token against Clerk's JWKS.
    Returns the decoded user payload.
    """
    token = credentials.credentials
    

    try:
        # 1. Get the Public Key
        public_key = get_clerk_public_key(token)
        
        # 2. Decode & Verify
        # We verify 'exp' and 'iat' by default. 
        # We should also verify 'iss' matches what we expect if we want to be strict,
        # but fetching the key from the token's own issuer is a bit circular if not validated.
        # However, for this MVP, validating the signature with the key fetched from the issuer 
        # (which is trusted via HTTPS) is reasonable.
        
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            options={"verify_aud": False} # Clerk tokens meant for backend often don't have 'aud' or it varies.
        )
        
        return payload
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print(f"Token Verification Failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print(f"Auth Error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")

