from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.dashboard import router as dashboard_router
from src.api.engine_data_routes import router as engine_data_router
from src.api.engine_routes import router as engine_router
from src.api.marketing_routes import router as marketing_router
from src.api.project_routes import router as project_router
from src.api.payment_routes import router as payment_router
from src.routers.assets import router as assets_router
from src.api.ipo_routes import router as ipo_router

import sentry_sdk
import os
from dotenv import load_dotenv

load_dotenv()

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)

app = FastAPI(title="Keiracom v3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api/v1/dashboard")
app.include_router(engine_data_router, prefix="/api/v1/engine-data")
app.include_router(engine_router, prefix="/api/v1/engines")
app.include_router(marketing_router, prefix="/api/v1/marketing")
app.include_router(project_router, prefix="/api/v1/projects")
app.include_router(payment_router, prefix="/api/v1/payments")
app.include_router(assets_router, prefix="/api/v1/assets")
app.include_router(ipo_router, prefix="/api/v1/ipo")

@app.get("/")
async def root():
    return {"status": "online", "version": "3.0"}