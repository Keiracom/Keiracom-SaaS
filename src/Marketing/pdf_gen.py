"""
PDF Generation for Direct Mail Campaigns (Keiracom Engine 03 Data)

This module generates PDF reports for Keyword Opportunity data identified
by Engine 03 (Strike Distance Sniper), intended for direct mail outreach.
"""

import asyncio
import os
from datetime import datetime
from typing import List

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch

from dotenv import load_dotenv
from sqlmodel import Session, select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.utils.db import get_db # To get session in main block
from src.utils.models import Project, KeywordOpportunity # Assuming these are SQLModel


# 1. Configuration (reusing from db.py for consistency)
DATABASE_URL = "sqlite+aiosqlite:///./keiracom.db"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def generate_direct_mail_pdf(project_id: int, output_path: str):
    """
    Generates a PDF report of Keyword Opportunity data for direct mail.

    Args:
        project_id: The ID of the project to generate the report for.
        output_path: The full path to save the generated PDF file.
    """
    load_dotenv() # Ensure .env is loaded
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = ParagraphStyle(
        name='TitleStyle',
        parent=styles['h1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        alignment=1, # TA_CENTER
        spaceAfter=14
    )
    story.append(Paragraph("Keiracom Direct Mail Opportunity Report", title_style))
    story.append(Spacer(1, 0.2 * inch))

    # Date
    date_style = ParagraphStyle(
        name='DateStyle',
        parent=styles['Normal'],
        alignment=2, # TA_RIGHT
        fontSize=10,
        spaceAfter=12
    )
    story.append(Paragraph(f"Date: {datetime.now().strftime('%Y-%m-%d')}", date_style))
    story.append(Spacer(1, 0.2 * inch))

    async with AsyncSessionLocal() as session:
        # Get Project Name
        project = await session.exec(select(Project).where(Project.id == project_id)).first()
        project_name = project.name if project else f"Project ID: {project_id}"
        story.append(Paragraph(f"<b>Project:</b> {project_name}", styles['h2']))
        story.append(Spacer(1, 0.1 * inch))

        story.append(Paragraph(
            "Here are the top keyword opportunities identified by the Keiracom Strike Distance Sniper (Engine 03), "
            "ranking between positions 11-20 in Google. These are high-potential keywords that, with strategic "
            "action, can be pushed to page 1 to capture significant organic traffic.",
            styles['Normal']
        ))
        story.append(Spacer(1, 0.2 * inch))

        # Retrieve Keyword Opportunities
        query = select(KeywordOpportunity).where(
            KeywordOpportunity.project_id == project_id,
            KeywordOpportunity.engine_source == 'strike_distance'
        )
        opportunities: List[KeywordOpportunity] = (await session.exec(query)).all()

        if opportunities:
            data = [
                ["Keyword", "Rank", "SV", "CPC", "YES Score", "Target URL"]
            ]
            for op in opportunities:
                data.append([
                    op.keyword,
                    str(op.current_rank),
                    str(op.search_volume),
                    f"${op.cpc:.2f}",
                    f"{op.yes_score:.2f}",
                    op.target_url
                ])
            
            table_style = TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ])
            table = Table(data)
            table.setStyle(table_style)
            story.append(table)
        else:
            story.append(Paragraph("No Strike Distance opportunities found for this project.", styles['Normal']))
    
    try:
        doc.build(story)
        print(f"✅ PDF report generated successfully at: {output_path}")
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")

if __name__ == "__main__":
    load_dotenv()
    # Ensure a project exists for testing.
    # We will temporarily run db.py's init_db to ensure data is there.
    print("--- Ensuring database is initialized for PDF generation test ---")
    from src.utils.db import init_db
    asyncio.run(init_db())
    print("--- Database initialized ---")

    async def test_pdf_gen():
        # Fetch an existing project's ID
        async with AsyncSessionLocal() as session:
            project = await session.exec(select(Project)).first()
            if not project:
                print("❌ No project found in DB to generate PDF for. Please run db.py first.")
                return

            output_file = f"reports/direct_mail_report_project_{project.id}.pdf"
            os.makedirs("reports", exist_ok=True)
            await generate_direct_mail_pdf(project.id, output_file)

    print("--- Running PDF Generation Test ---")
    asyncio.run(test_pdf_gen())
    print("--- PDF Generation Test Finished ---")
