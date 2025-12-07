from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Project(SQLModel, table=True):
    """
    Represents a project, which is typically a website domain.
    """
    __tablename__ = "projects" # Explicitly define table name for consistency with previous setup

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, nullable=False) # Clerk User ID
    name: str = Field(index=True, unique=True, nullable=False)
    subscription_id: Optional[str] = Field(default=None, index=True)
    mode: str = Field(default="global")  # 'local' or 'global'
    active: bool = Field(default=True, nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    flow_runs: List["FlowRun"] = Relationship(back_populates="project")
    key_metrics: List["KeyMetric"] = Relationship(back_populates="project")
    keyword_opportunities: List["KeywordOpportunity"] = Relationship(back_populates="project")
    competitor_gaps: List["CompetitorGap"] = Relationship(back_populates="project")


class FlowRun(SQLModel, table=True):
    """
    Represents an execution of a Prefect flow (an Engine run).
    """
    __tablename__ = "flow_runs"

    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="projects.id")
    engine: str = Field(nullable=False)
    status: str = Field(nullable=False)
    summary: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    project: Project = Relationship(back_populates="flow_runs")


class KeyMetric(SQLModel, table=True):
    """
    Represents a key metric for the dashboard.
    """
    __tablename__ = "key_metrics"

    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="projects.id")
    name: str = Field(nullable=False) # Removed unique=True because names repeat across projects
    value: float = Field(nullable=False)
    trend: str = Field(nullable=False)  # 'positive', 'negative', 'neutral'
    updated_at: datetime = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})

    project: Project = Relationship(back_populates="key_metrics")


class KeywordOpportunity(SQLModel, table=True):
    """
    Stores actionable keyword opportunities derived from Engine 1 (Revenue Shield)
    and Engine 3 (Strike Distance).
    Logic Reference: BLUEPRINT.md (Section 3)
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="projects.id") # Use "projects.id" as tablename is "projects"
    
    keyword: str
    target_url: str
    search_volume: int = Field(default=0)
    difficulty: int = Field(default=0)
    cpc: float = Field(default=0.0)
    current_rank: int # Vital for Strike Distance (11-20)
    
    # The 'YES Score' (Yield Efficiency Score)
    # Formula: (Vol * CPC) / Diff^1.5
    yes_score: float = Field(default=0.0)
    
    engine_source: str # 'revenue_shield' or 'strike_distance'
    status: str = Field(default="pending") # pending, approved, rejected, published
    created_at: datetime = Field(default_factory=datetime.utcnow)

    project: Project = Relationship(back_populates="keyword_opportunities")


class CompetitorGap(SQLModel, table=True):
    """
    Stores 'Topical Voids' identified by Engine 4 (Authority Architect).
    Logic Reference: BLUEPRINT.md (Section 3.4)
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="projects.id") # Use "projects.id" as tablename is "projects"
    
    topic_cluster: str # The semantic bucket
    missing_keyword: str # The node we are missing
    competitor_url: str # The rival satisfying this node
    gap_strength: int = Field(default=0) # Priority score
    
    status: str = Field(default="open") # open, drafted, filled
    created_at: datetime = Field(default_factory=datetime.utcnow)

    project: Project = Relationship(back_populates="competitor_gaps")
