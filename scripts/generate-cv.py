"""Regenerate Sandeep Kafle's CV without the References section.

Run from the portfolio root:
    python scripts/generate-cv.py

Writes to public/cv/Sandeep_Kafle_CV.pdf
"""

from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    ListFlowable,
    ListItem,
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY


def build():
    out_dir = Path(__file__).resolve().parent.parent / "public" / "cv"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "Sandeep_Kafle_CV.pdf"

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name",
        parent=styles["Title"],
        fontName="Times-Bold",
        fontSize=22,
        leading=26,
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=11,
        alignment=TA_CENTER,
        spaceAfter=8,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Times-Bold",
        fontSize=13,
        alignment=TA_CENTER,
        spaceBefore=10,
        spaceAfter=6,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Times-Roman",
        fontSize=11,
        leading=14,
        alignment=TA_JUSTIFY,
    )
    item_style = ParagraphStyle(
        "Item",
        parent=body_style,
        spaceBefore=2,
        spaceAfter=2,
    )
    role_style = ParagraphStyle(
        "Role",
        parent=body_style,
        fontName="Times-Bold",
        spaceBefore=4,
    )

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=LETTER,
        leftMargin=0.9 * inch,
        rightMargin=0.9 * inch,
        topMargin=0.8 * inch,
        bottomMargin=0.8 * inch,
        title="Sandeep Kafle CV",
        author="Sandeep Kafle",
    )

    flow = []

    flow.append(Paragraph("SANDEEP KAFLE", name_style))
    flow.append(
        Paragraph(
            "Waling, Syangja, Nepal &nbsp;&#9642;&nbsp; "
            "NEC Reg. No. 97322",
            contact_style,
        )
    )
    flow.append(
        Paragraph(
            "sandeepkafle31@gmail.com &nbsp;&#9642;&nbsp; "
            "www.linkedin.com/in/31sandeep31",
            contact_style,
        )
    )
    flow.append(HRFlowable(width="100%", thickness=1, color="#000000"))

    flow.append(Paragraph("QUALIFICATIONS SUMMARY", section_style))
    flow.append(
        Paragraph(
            "Civil and Rural Engineer with practical experience in "
            "community projects. Active volunteer with Engineers Without "
            "Borders Nepal. Team player, quick learner, and passionate "
            "about applying engineering skills to real world challenges. "
            "Strong background in leadership, volunteerism, and technical "
            "project coordination. Work well independently and stay "
            "deadline oriented.",
            body_style,
        )
    )

    flow.append(Paragraph("EDUCATION", section_style))
    flow.append(
        Paragraph(
            "<b>Bachelor of Civil and Rural Engineering, 2025,</b> "
            "School of Engineering, Pokhara University",
            item_style,
        )
    )
    flow.append(
        Paragraph(
            "<b>Secondary Education, 10+2,</b> Tilottama Secondary School, "
            "Tilottama",
            item_style,
        )
    )
    flow.append(
        Paragraph(
            "<b>Secondary Education, SEE,</b> Kalika Secondary School, "
            "Butwal",
            item_style,
        )
    )

    flow.append(Paragraph("EXPERIENCE", section_style))
    flow.append(
        Paragraph(
            "<b>Engineers Without Borders Nepal, Pokhara University Chapter</b>",
            role_style,
        )
    )
    flow.append(Paragraph("President 2024 to 2025", item_style))
    flow.append(
        ListFlowable(
            [
                ListItem(
                    Paragraph(
                        "Led formation of a new student cohort and "
                        "managed a smooth leadership transition.",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Coordinated collaborations including the PoU "
                        "and Harvard initiative and local community "
                        "engagement.",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Organized 3D printing and robotics workshops "
                        "and student led projects.",
                        body_style,
                    )
                ),
            ],
            bulletType="bullet",
            leftIndent=18,
        )
    )

    flow.append(Spacer(1, 4))
    flow.append(Paragraph("<b>Undergraduate Project</b>", role_style))
    flow.append(
        ListFlowable(
            [
                ListItem(
                    Paragraph(
                        "Post Earthquake Impact Assessment, Earthquake in "
                        "Jajarkot 2023.",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Dynamics of Land Use and Land Cover Change in "
                        "Pokhara Metropolitan, Kaski District of Nepal.",
                        body_style,
                    )
                ),
            ],
            bulletType="bullet",
            leftIndent=18,
        )
    )

    flow.append(Spacer(1, 4))
    flow.append(
        Paragraph("<b>Volunteering and Affiliations</b>", role_style)
    )
    flow.append(
        ListFlowable(
            [
                ListItem(
                    Paragraph(
                        "Students Accelerator Program, Darchula, 2024 and "
                        "2025. iLAB and iJATRA, Design Thinking Workshop.",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Karyashala Workshop, 2024 and 2025.",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Engineers Without Borders Nepal, since 2024.",
                        body_style,
                    )
                ),
            ],
            bulletType="bullet",
            leftIndent=18,
        )
    )

    flow.append(Paragraph("SKILLS", section_style))
    flow.append(
        ListFlowable(
            [
                ListItem(
                    Paragraph(
                        "AutoCAD, SketchUp, SAP2000 (Intermediate).",
                        body_style,
                    )
                ),
                ListItem(
                    Paragraph(
                        "Post disaster assessment, Structural analysis.",
                        body_style,
                    )
                ),
                ListItem(Paragraph("ArcGIS Pro Basics.", body_style)),
                ListItem(
                    Paragraph(
                        "MS Office, DaVinci Resolve, Canva.",
                        body_style,
                    )
                ),
            ],
            bulletType="bullet",
            leftIndent=18,
        )
    )

    doc.build(flow)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    build()
