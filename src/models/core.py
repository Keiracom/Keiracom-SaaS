from __future__ import annotations
import datetime
from sqlalchemy import (
    ForeignKey,
    String,
    func,
    Text,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from typing import List
from src.models.base import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    tier: Mapped[str] = mapped_column(String(50), default="startup")
    credits: Mapped[int] = mapped_column(default=0)
    keywords: Mapped[List["Keyword"]] = relationship(back_populates="user")


class Keyword(Base):
    __tablename__ = "keywords"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    text: Mapped[str] = mapped_column(String(255))
    domain: Mapped[str] = mapped_column(String(255))
    device: Mapped[str] = mapped_column(String(50), default="desktop")
    location: Mapped[str] = mapped_column(String(255))
    user: Mapped["User"] = relationship(back_populates="keywords")
    ranking_logs: Mapped[List["RankingLog"]] = relationship(back_populates="keyword")


class RankingLog(Base):
    __tablename__ = "ranking_history"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    keyword_id: Mapped[int] = mapped_column(ForeignKey("keywords.id"))
    rank: Mapped[int]
    url: Mapped[str] = mapped_column(String(1024))
    analysis: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        server_default=func.now()
    )
    keyword: Mapped["Keyword"] = relationship(back_populates="ranking_logs")
