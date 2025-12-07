import google.generativeai as genai
from src.config.settings import settings
from google.api_core.exceptions import GoogleAPIError

class GeminiAgent:
    def __init__(self, model_name: str = "gemini-2.5-flash"):
        self.model_name = model_name
        self.model = None

        api_key = settings.GEMINI_API_KEY
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set in environment variables.")
        
        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel(self.model_name)
        except Exception as e:
            print(f"Gemini Error: Failed to configure Gemini client with model '{self.model_name}': {str(e)}")
            self.model = None # Ensure model is None if configuration fails

    async def generate_content(self, prompt: str) -> str:
        if not self.model:
            return "Analysis unavailable due to API error."
        try:
            response = await self.model.generate_content_async(prompt)
            # Check for empty response or other issues
            if not response or not response.text:
                print("Gemini Error: Empty response or text from API.")
                return "Analysis unavailable due to empty API response."
            return response.text
        except GoogleAPIError as e:
            print(f"Gemini Error: Google API error during content generation: {str(e)}")
            return "Analysis unavailable due to API error."
        except Exception as e:
            print(f"Gemini Error: An unexpected error occurred during content generation: {str(e)}")
            return "Analysis unavailable due to API error."

# Initialize a global GeminiAgent instance with the default model
gemini_agent = GeminiAgent()