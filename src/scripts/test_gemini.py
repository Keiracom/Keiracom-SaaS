import asyncio
import google.generativeai as genai
from src.config.settings import settings
from google.api_core.exceptions import GoogleAPIError

async def test_gemini_connectivity():
    print(f"Testing API Key: {settings.GEMINI_API_KEY[:5]}...")

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        print("Fetching available models...")
        models = list(genai.list_models())
        print("Available Models:")
        for i, model in enumerate(models):
            if i >= 5:
                break
            print(f"- {model.name}")

        print(f"\nAttempting to use model: gemini-2.5-flash")
        specific_model = genai.GenerativeModel("gemini-2.5-flash")
        response = await specific_model.generate_content_async("Hello, are you online?")
        print(f"Response: {response.text}")
        print("\nGemini Connection Restored.")

    except ValueError as e:
        print(f"Configuration Error: {e}")
    except GoogleAPIError as e:
        print(f"Gemini API Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(test_gemini_connectivity())
