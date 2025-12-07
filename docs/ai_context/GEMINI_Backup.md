# Project: Keiracom v3.0 (SaaS)
> **Memory Bank Status:** Active
> **Current Phase:** PHASE II - INTEGRATION (UX PoC required before proceeding)
> **Last Updated:** December 4, 2025

## 1. Roles & Protocols
### The Hierarchy
- **CEO (User):** Visionary, Approval, Bridge.
- **CTO / COO (Browser Gemini):** Architect, Prompt Engineer.
- **Sr. DevOps Engineer (Gemini CLI):** Builder, Executor.

### Operational Protocol
1. **Context First:** The CLI must read this file at the start of every session.
2. **Atomic Execution:** One specific task at a time.
3. **Reference Truth:** Always read `BLUEPRINT.md` for Logic.

## 2. Master Prompt Template
> **Standard Command Format:**
```text
[CONTEXT]: Read GEMINI.md and BLUEPRINT.md.
[ROLE]: Sr. DevOps Engineer.
[TASK]: Create/Update [FILE_PATH].
[REQUIREMENTS]:
1. [Specific Logic A]
2. [Specific Logic B]
[CONSTRAINTS]: Strict AsyncIO. No placeholders. Return full code.
```

## 3. Directory Map (Consolidated)
- /src/config: settings.py
- /src/utils: db.py, ai.py, gsc_client.py, models.py, dataforseo_client.py
- /src/flows: Prefect workflows (The 6 SEO Engines)
- /src/marketing: Sales Automation Scripts
- /src/api: FastAPI Routers
- /keiracom-web: Frontend Project (Next.js)
- /main.py: FastAPI Entry Point

## 4. Development Log (The Truth)
| Sprint | Task | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1. Skeleton** | 1.1 - 1.6 Setup | **✅ DONE** | Env, Config, DB, AI Client verified. |
| **2. Memory** | 2.1 - 2.2 DB Tasks | **✅ DONE** | Schemas updated, tables initialized. |
| **3. Logic Definition** | 3.1 - 3.6 Engines | **✅ DONE** | All 6 Engines logic defined in Blueprint. |
3.5 DB Upgrade	Define Granular Models	🚀 NEXT	Add KeywordOpportunity, CompetitorGap tables.
| **4. The Engines (Backend)** | 4.1 - 4.6 All Flows | **✅ DONE** | Prefect flows for all 6 Engines are coded. |
4. Real Engines	4.1 Real Engine 3	🔴 Pending	Logic: Fetch Rankings -> Filter 11-20 -> Store.
4.2 Real Engine 4	🔴 Pending	Logic: Competitor Diff -> Store Gaps.
4.3 Real Engine 1	🔴 Pending	Logic: Rank Drop Monitor -> Store Risks.
| **5. The API (FastAPI)** | 5.1 - 5.3 Routes | **✅ DONE** | API built, main.py updated, project/engine routes created. |
| **6. The Terminal (Frontend)** | 6.1 - 6.4 UI | **✅ DONE** | Next.js setup, Ticker, and all 3 core widgets integrated. |
| | **6.5 UX PoC: Inject Data** | 🔴 Pending | Inject mock data into SQLite DB for API to fetch. |
| | **6.6 UX PoC: Code Fetch** | 🔴 Pending | Implement API fetch logic in \`page.jsx\`. |
| | **6.7 UX PoC: Run Test** | 🔴 Pending | Run Fast API + Next.js to validate full stack connection. |
| **7. Sales Automation (Post-Product)**| 7.1 Cold Email: Apollo/Instantly | 🔴 Pending | Create `/src/marketing/apollo_client.py` (Enrichment). |
| | 7.2 Cold Email: Orchestration | 🔴 Pending | Create `/src/marketing/sales_flow.py` (Prefect Flow). |
| | 7.3 Direct Mail: PDF Builder | 🔴 Pending | Create `/src/marketing/pdf_gen.py` (Engine 3 data → PDF). |
| | 7.4 Direct Mail: Dispatch | 🔴 Pending | Create `/src/marketing/lob_client.py` (Lob.com API integration). |
| | 7.5 API Webhook | 🔴 Pending | Update `main.py` to expose `/api/marketing/trigger` endpoint. |
| **8. Production Readiness (Pre-Launch)** | 8.1 GSC Client Finalization | 🔴 Pending | Finalize `src/utils/gsc_client.py` (Real OAuth logic). |
| | 8.2 Prefect Deployment | 🔴 Pending | Create `deploy.py` script to push all 6 flows to Prefect Server. |
| | 8.3 Backend QA / Debug | 🔴 Pending | Create `tests/api/test_engine_triggers.py` (Unit Tests). |
| | 8.4 Frontend QA / Final UI | 🔴 Pending | Finalize navigation and settings UI components. |
| | 8.5 Database Migration | 🔴 Pending | Implement **Alembic** for safe production migrations. |

## 5. Pending Infrastructure (Critical)
- [ ] Execute **UX Proof of Concept (PoC)** to validate the full stack works before proceeding to automation.
