# Project: Keiracom v3.0 (SaaS)
> **Memory Bank Status:** Active
> **Current Phase:** PHASE IV - ASSET MANAGEMENT
> **Last Updated:** December 6, 2025 (Post-Asset API)

## 1. Roles & Protocols
- **CEO (User):** Visionary, Approval.
- **CTO (Browser Gemini):** Architect, Prompt Engineer.
- **DevOps (CLI):** Builder. *PROTOCOL: EXECUTE -> VERIFY -> SAVE.*

### Operational Protocol
1. **Context First:** The CLI must read this file at the start of every session.
2. **Atomic Execution:** One specific task at a time.
3. **Reference Truth:** Always read `BLUEPRINT.md` for Business Logic.

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

## 2. Directory Map (Verified)
- /src/utils: db.py, models.py (Verified)
- /src/engines: engine_03.py (Fixed)
- /src/routers/assets.py: Handles Asset Management endpoints. (NEW)
  - Endpoint: `GET /api/v1/assets/strike-list` (Active).
- /src/seeds/strike_data.json: Seed data for high-yield assets. (NEW)
- /main.py: FastAPI Entry Point (Rebuilt & Updated)

## 3. Development Log (The Truth)
| Sprint | Task | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1-3. Foundation** | Skeleton & DB Setup | **✅ DONE** | Base config and DB connection verified. |
| **3. Logic Def** | 3.5 DB Upgrade | **✅ DONE** | `models.py` verified (96 lines). |
| **🚧 PHASE III: RECOVERY & LOGIC** | | | **Focus: Fix API -> Build Engine 3** |
| **Recovery** | **5.5 API Repair** | **✅ DONE** | Rebuild `main.py` entry point. |
| **Real Engines** | 4.1 Real Engine 3 | **✅ LIVE** | Connected to Real Gemini AI + API Key Fixed. |
| | 4.2 Real Engine 2 | **✅ LIVE** | Freshness Attack connected to Real Gemini AI. |
| | 4.3 Real Engine 1 | **✅ LIVE** | Revenue Shield (DataForSEO logic valid). |
| | 4.4 Engines 4-6 | ⚠️ PROTOTYPE | Still using Mock AI. Needs Upgrade. |
| **🚀 PHASE IV: ASSET MGMT & SAAS** | | | **Focus: Auth -> Payments -> Dashboard** |
| **SaaS Skeleton** | 4.0 Auth Setup | **✅ DONE** | Clerk Integration + API Security + Vercel Env Vars. |
| **Deployment** | 4.1 Vercel Deploy | **✅ DONE** | Site is LIVE (v3.0.1-beta). |
| | 4.2 Sentry Config | **✅ DONE** | Error tracking active (API v8). |
| **Asset API** | 1.1 DB Seeding | **✅ DONE** | `strike_data.json` loaded. |
| **Asset API** | 1.2 API Endpoint | **✅ DONE** | `GET /api/v1/assets/strike-list`. |
| **UI Upgrade** | 6.0 Data Grid | **✅ DONE** | Basic Strike List Table active. |
| **UI Upgrade** | 6.1 Rich Dashboard | 🚀 NEXT | **The "Hedge Fund" Analytics Interface.** |
| **UI Upgrade** | 6.2 Multi-Panel | 🔴 Pending | Cannibalization, Gaps, Content Tracker Panels. |

## 4. Roadmap: Phase V - The Analytics Dashboard (Current Focus)
**Goal:** Transform the minimal terminal UI into the "Hedge Fund" analytics dashboard (User Design).

1.  **Engine Upgrade (Phase 1):**
    *   [x] Upgrade Engine 4 (Authority Architect) to Real AI.
    *   [x] Upgrade Engine 5 (Cannibalization) to Real AI.
    *   [x] Upgrade Engine 6 (SERP Heist) to Real AI.

2.  **Dashboard Redesign (Phase 2):**
    *   [ ] **Layout:** Multi-panel grid layout (Report Config, Alerts, Charts).
    *   [ ] **Charts:** Integrate Recharts/Chart.js for "Content Activity" & "Winning Concept".
    *   [ ] **Components:**
        *   `ReportConfigModule`: Domain selection.
        *   `CannibalizationAlert`: "High Value Alert" cards.
        *   `StrategicGapChart`: Bar chart matching design.
        *   `InsightFeed`: List of AI recommendations.
        *   `KeywordValuation`: Data table.
        *   `CompetitorRadar`: Competitor tracking.

3.  **Real Data Integration (Phase 3):**
    *   [ ] Connect DataForSEO to all Engine Flows.
    *   [ ] Integrate Google Search Console API.