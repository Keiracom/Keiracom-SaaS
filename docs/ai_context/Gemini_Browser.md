# 🧠 KEIRACOM STRATEGIC GOVERNANCE (Browser Agent Only)
> **Role:** The Architect's Notebook & Strategic Memory.
> **Access:** PRIVATE (Do not share with CLI).
> **Last Strategic Review:** [DATE]

## 1. 🌟 The North Star (Product Vision)
> *What are we actually building? (Immutable Vision)*
* **Core Promise:** "Bloomberg Terminal for SEO" (High-Fidelity, Granular Data).
* **Differentiation:** We don't just "report" data; we act as an **Automated Hedge Fund**, swapping keywords like assets based on Yield Efficiency Scores (YES).
* **Primary User Persona:** The "Asset Manager" (SEO Pro who wants high ROI, not busy work).

## 2. 👤 CEO Preferences & Style Guide
> *How does the User want to work? (The "Constitution")*
### Communication Style
* **No Fluff:** Do not summarize the previous prompt. Start immediately with the answer.
* **Visuals First:** Use [Image] tags for architecture/flows. Tables for data.
* **Tone:** "CTO to CEO" – Candid, professional, solution-oriented.

### Operational Protocols (The "Short Leash")
1.  **Atomic Execution:** One task at a time. Never chain 3 tasks in one prompt.
2.  **Verify then Save:** Always check file size/content > Update `GEMINI.md` > Move on.
3.  **No "Zombie Code":** If a file is <20 lines, it is rejected automatically.
4.  **"Stop & Wait":** After every major output, ask for confirmation before proceeding.

## 3. 🧠 Knowledge Graph & Learned Constraints
> *What have we learned that we must not forget?*
* **API Constraint:** `DataForSEO` credits are expensive. Use Mock Data for logic tests; use Real Data only for "Ignition Tests."
* **Tech Stack:** FastAPI (Backend) + Next.js (Frontend) + Prefect (Orchestration).
    * *Constraint:* Prefect flows cannot use FastAPI `Depends()` injections. They must use `AsyncSessionLocal` context managers.
* **File Structure:** `src/engines/` must contain flat files (e.g., `engine_03.py`), not subfolders or hyphenated names.

## 4. 🏛️ Decision Log (Architecture Decision Records)
> *Why did we make these choices? (Prevent circular debates)*
| Date | Decision | Rationale | Status |
| :--- | :--- | :--- | :--- |
| **Dec 04** | **Pause Sales Auto** | Complex 3rd party integrations (Apollo/Lob) were distracting from Core Product Value. | ⏸️ PAUSED |
| **Dec 05** | **Engine 3 First** | "Strike Distance" (Rank 11-20) offers fastest user ROI and easiest math for MVP. | ✅ ACTIVE |
| **Dec 05** | **Split Context Files** | Separated Strategy (`gemini_browser.md`) from Tactics (`GEMINI.md`) to prevent hallucinations. | ✅ ACTIVE |

## 5. 🕹️ CLI Agent Governance (The "Worker" Rules)
> *How do we manage the Junior Dev (CLI)?*
* **Master Prompt:** "Read `GEMINI.md`. Act as Sr. DevOps. [TASK]. Constraints: Strict AsyncIO, No Placeholders."
* **Audit Protocol:**
    * *Before Run:* Check `GEMINI.md` is accurate.
    * *After Run:* Run `audit.py` or `ls -l` to verify file creation.

## 6. 📝 Session Journal (The Running Log)
> *What happened in previous sessions? (High-Level)*
* **Session [Dec 05]:** Disaster Recovery. CLI hallucinated `engine_03.py`.
    * *Action:* Audited file system. Rebuilt `main.py` (API).
    * *Outcome:* API Online. Governance protocols established.
* **Session [Today]:** Building "Live Fire" Engine 3.
    * *Focus:* Connecting DataForSEO client to Database.

## 7. 🛡️ The "Anti-Drift" Protocols (New)
> *Lessons learned from the "Engine 3 Wiring" incident.*

### A. The "Pre-Flight Check" Rule
* **Trigger:** Before building any new file that imports from `src/utils` or `src/config`.
* **The Risk:** The CLI guesses function names (e.g., `get_ranked_keywords` vs `get_ranked_keywords_for_domain`), leading to import errors.
* **The Protocol:** DO NOT just say "Build File X".
* **The Prompt:**
  > "Read `src/utils/client.py`. List the EXACT function names and argument signatures. THEN write `src/engines/engine_x.py` using those exact names."

### B. The "Auto-Debug" Boundary
* **Scenario:** The CLI hits an error. Do we let it fix itself?
* **❌ NO (Architecture/Wiring):** Errors involving `ImportError`, `AttributeError`, `Config`, or `Filenames`.
    * *Why:* The CLI will hallucinate new file paths to "fix" the import, corrupting the architecture.
    * *Action:* STOP. User/CTO manually identifies the mismatch and issues a single surgical fix command.
* **✅ YES (Logic/Math):** Errors involving `ZeroDivisionError`, `ValueError`, o`JSONDecodeError`.
    * *Why:* The blast radius is contained within the function.
    * *Action:* Allow CLI to "Fix the math error."

## 8. 🧠 Learned Constraints (Updated)
* **DataForSEO Client:** The `aiohttp` error object has changed. Do not use `e.reason`. Use `e.status` and `e.message`.
* **Pydantic Settings:** `settings.py` is strict. Engine scripts must have a valid `.env` (even with dummy keys) or they will fail to boot.
* **SQLModel Syntax:** When using `session.exec()`, the result is already iterable. **DO NOT** call `.scalars()` on it (unlike vanilla SQLAlchemy).