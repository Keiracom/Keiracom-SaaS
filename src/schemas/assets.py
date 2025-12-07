from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class AssetResponse(BaseModel):
    """
    Pydantic schema for returning KeywordOpportunity data.
    """
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] = None
    project_id: int
    keyword: str
    target_url: str
    search_volume: int
    difficulty: int
    cpc: float
    current_rank: int
    yes_score: float
    engine_source: str
    status: str
    created_at: datetime
