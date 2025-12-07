from fastapi import FastAPI
from src.api.routes import router

app = FastAPI()

app.include_router(router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"status": "Keiracom API Online"}
