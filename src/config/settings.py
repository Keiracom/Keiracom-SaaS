from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from functools import lru_cache

class Settings(BaseSettings):
    # Database
    # Defaulting to sqlite for now so it works without Postgres installed yet
    DATABASE_URL: str = "sqlite+aiosqlite:///./test.db" 

    # AI
    GOOGLE_API_KEY: SecretStr

    # External
    DATAFORSEO_LOGIN: str = "placeholder"
    DATAFORSEO_PASSWORD: str = "placeholder"
    DATAFORSEO_API_TOKEN: str | None = None
    APOLLO_API_KEY: SecretStr | None = None
    LOB_API_KEY: SecretStr | None = None
    VERCEL_TOKEN: SecretStr | None = None

    # Google OAuth (for GSC)
    GOOGLE_CLIENT_ID: SecretStr | None = None
    GOOGLE_CLIENT_SECRET: SecretStr | None = None
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/oauth2callback" # Default redirect URI



    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache
def get_settings():
    return Settings()

settings = get_settings()