import google.generativeai as genai
from src.config.settings import settings
from google.api_core.exceptions import GoogleAPIError

class GeminiClient:
    def __init__(self):
        try:
            genai.configure(api_key=settings.GOOGLE_API_KEY.get_secret_value())
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        except Exception as e:
            # Depending on desired error handling, might re-raise or set self.model to None
            print(f"GeminiClient initialization error: {e}")
            self.model = None

    async def generate_content(self, prompt: str) -> str:
        if not self.model:
            return "GeminiClient not initialized due to previous error."
        try:
            response = await self.model.generate_content_async(prompt)
            if response.text:
                return response.text
            else:
                return "Gemini returned an empty response."
        except GoogleAPIError as e:
            return f"Gemini API Error: {e}"
        except Exception as e:
            return f"An unexpected error occurred with Gemini: {e}"
