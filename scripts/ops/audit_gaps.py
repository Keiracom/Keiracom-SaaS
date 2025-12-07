import asyncio
from sqlmodel import select
from src.utils.database import AsyncSessionLocal
from src.utils.models import Project, CompetitorGap

async def audit_gaps():
    """
    Audits the CompetitorGap table to find the top 5 gaps for a project.
    """
    print("--- Running Competitor Gap Audit ---")
    
    async with AsyncSessionLocal() as session:
        # 1. Get the Project ID for 'dripify.com'
        project_result = await session.exec(select(Project).where(Project.name == "dripify.com"))
        project = project_result.first()
        
        if not project:
            print("❌ Project 'dripify.com' not found. Cannot audit gaps.")
            return
            
        print(f"Auditing gaps for project: {project.name} (ID: {project.id})")

        # 2. Query for the top 5 competitor gaps
        gap_result = await session.exec(
            select(CompetitorGap)
            .where(CompetitorGap.project_id == project.id)
            .order_by(CompetitorGap.gap_strength.desc())
            .limit(5)
        )
        top_gaps = gap_result.all()

        if not top_gaps:
            print("🤷 No competitor gaps found in the database for this project.")
        else:
            print("\n🔥 Top 5 Gaps found:")
            for gap in top_gaps:
                print(f"  - Keyword: '{gap.missing_keyword}', Strength (Volume): {gap.gap_strength}")

    print("--- Audit Complete ---")

if __name__ == "__main__":
    asyncio.run(audit_gaps())
