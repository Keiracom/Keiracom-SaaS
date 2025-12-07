import asyncio
import sys

# 1. Test AI Loading
try:
    from src.utils.ai import GeminiClient
    print("[SUCCESS] Found src.utils.ai")
except ImportError as e:
    print(f"[FAIL] Could not import AI: {e}")

# 2. Test DB Loading
try:
    from src.utils.db import engine
    print("[SUCCESS] Found src.utils.db")
except ImportError as e:
    print(f"[FAIL] Could not import DB: {e}")

async def main():
    print("\n--- Starting Deep Check ---")

    # Check AI Key
    try:
        client = GeminiClient()
        # We won't actually call the API yet, just check if the client initializes
        if client:
            print("[SUCCESS] Gemini Client Initialized (API Key found)")
    except Exception as e:
        print(f"[FAIL] Gemini Client Error: {e}")
        print("Did you put your GOOGLE_API_KEY in the .env file?")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())