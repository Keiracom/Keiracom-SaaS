from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class RankingResponse(BaseModel):
    keyword: str
    domain: str
    rank: int
    device: str
    analysis: Optional[str]
    last_updated: datetime

    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    user_email: str
    active_keywords: List[RankingResponse]
    
    class Config:
        from_attributes = True
