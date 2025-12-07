from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.dashboard import router as dashboard_router
from src.api.engine_data_routes import router as engine_data_router
from src.api.project_routes import router as project_router
from src.routers.assets import router as assets_router

app = FastAPI(title="Keiracom v3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins during local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(engine_data_router, prefix="/api/v1/engine-data", tags=["Engine Data"])
app.include_router(project_router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(assets_router, prefix="/api/v1", tags=["Assets"])


@app.get("/")
async def root():
    return {"status": "online", "mode": "Phase III"}
