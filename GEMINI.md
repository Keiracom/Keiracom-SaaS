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
| **Real Engines** | 4.1 Real Engine 3 | ✅ CODE COMPLETE | API Connected. Waiting for Keys. |
| | 4.2 Real Engine 4 | ✅ CODE COMPLETE | Logic verified. 98 Gaps Found. |
| | 4.2a Debug API Client | ✅ DONE | Client fixed, logic verified. |
| | 4.3 Real Engine 1 | 🔴 Pending | Logic: Revenue Shield. |
| **🚀 PHASE IV: ASSET MGMT & SAAS** | | | **Focus: Auth -> Payments -> Dashboard** |
| **SaaS Skeleton** | 4.0 Auth Setup | 🚀 NEXT | Clerk Integration + API Security. |
| **Asset API** | 1.1 DB Seeding | **✅ DONE** | `strike_data.json` loaded. |
| **Asset API** | 1.2 API Endpoint | **✅ DONE** | `GET /api/v1/assets/strike-list`. |
| **IPO Engine** | 1.3 Vercel Client | **✅ DONE** | `src/utils/vercel_client.py` for Domain Buy. |
| **IPO Engine** | 1.4 IPO API | **✅ DONE** | `POST /api/v1/ipo/purchase` & Provisioning. |
| **API Upgrade** | 5.4 Data Grid Endpoints | 🚀 NEXT | Endpoints for frontend tables. |
| **UI** | 6.8 Data Grid | 🔴 Pending | Reusable Table Component. |
| **UI** | 6.9 Connect Engine 3 | 🔴 Pending | Live Data Display. |
| **❓ UNVERIFIED (Sales Auto)** | | | **Status: Code exists but likely Shells.** |
| **8. Sales Auto** | 8.1 - 8.5 All Tasks | ⚠️ SHELL | Audit pending. Do not use yet. |