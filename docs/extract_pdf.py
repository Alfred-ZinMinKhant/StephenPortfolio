#!/usr/bin/env python3
import pdfplumber
import json
import sys
from pathlib import Path


def extract_pdf_content(pdf_path):
    """Extract text content from PDF file"""
    content = {"pages": [], "all_text": "", "metadata": {}, "images_info": []}

    try:
        with pdfplumber.open(pdf_path) as pdf:
            # Extract metadata
            if pdf.metadata:
                content["metadata"] = pdf.metadata

            # Extract text from each page
            for page_num, page in enumerate(pdf.pages, 1):
                page_content = {
                    "page_number": page_num,
                    "text": "",
                    "width": page.width,
                    "height": page.height,
                }

                # Extract text
                if page.extract_text():
                    page_text = page.extract_text().strip()
                    page_content["text"] = page_text
                    content["all_text"] += page_text + "\n\n"

                # Extract images info
                if hasattr(page, "images"):
                    for img in page.images:
                        content["images_info"].append(
                            {
                                "page": page_num,
                                "x0": img.get("x0", 0),
                                "y0": img.get("y0", 0),
                                "x1": img.get("x1", 0),
                                "y1": img.get("y1", 0),
                                "width": img.get("width", 0),
                                "height": img.get("height", 0),
                            }
                        )

                content["pages"].append(page_content)

    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

    return content


def analyze_content_structure(text):
    """Analyze the text structure to identify sections"""
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    structure = {
        "title": "",
        "name": "",
        "role": "",
        "sections": [],
        "contact_info": [],
        "social_links": [],
        "skills": [],
        "projects": [],
        "experience": [],
    }

    # Look for common patterns
    for i, line in enumerate(lines):
        # Check for name/title patterns
        if (
            any(word in line.lower() for word in ["portfolio", "resume", "cv"])
            and not structure["title"]
        ):
            structure["title"] = line

        # Check for names (typically at the beginning)
        if i < 3 and len(line.split()) <= 3 and line.replace(" ", "").isalpha():
            if not structure["name"]:
                structure["name"] = line

        # Check for roles/positions
        if any(
            word in line.lower()
            for word in [
                "designer",
                "developer",
                "manager",
                "specialist",
                "creator",
                "strategist",
            ]
        ):
            if not structure["role"]:
                structure["role"] = line

        # Check for contact info
        if any(
            char in line
            for char in ["@", "+", "linkedin", "behance", "dribbble", "instagram"]
        ):
            structure["contact_info"].append(line)

        # Check for section headers (usually short and may have special formatting)
        if len(line) < 50 and (line.isupper() or line.istitle()):
            if any(
                word in line.lower()
                for word in [
                    "about",
                    "experience",
                    "projects",
                    "skills",
                    "education",
                    "services",
                ]
            ):
                structure["sections"].append(line)

    return structure


def main():
    pdf_path = "Social Media Portfolio.pdf"

    if not Path(pdf_path).exists():
        print(f"PDF file not found: {pdf_path}")
        return

    print("Extracting content from PDF...")
    content = extract_pdf_content(pdf_path)

    if not content:
        print("Failed to extract content from PDF")
        return

    print("\n=== PDF METADATA ===")
    for key, value in content["metadata"].items():
        print(f"{key}: {value}")

    print(f"\n=== EXTRACTED TEXT ({len(content['pages'])} pages) ===")
    print(content["all_text"])

    print("\n=== CONTENT STRUCTURE ANALYSIS ===")
    structure = analyze_content_structure(content["all_text"])

    for key, value in structure.items():
        if value:
            print(f"{key.upper()}: {value}")

    print(f"\n=== IMAGES INFO ===")
    print(f"Found {len(content['images_info'])} images")
    for img in content["images_info"]:
        print(
            f"Page {img['page']}: {img['width']}x{img['height']} at ({img['x0']}, {img['y0']})"
        )

    # Save to JSON for further processing
    with open("pdf_content.json", "w", encoding="utf-8") as f:
        json.dump(
            {"content": content, "structure": structure},
            f,
            indent=2,
            ensure_ascii=False,
        )

    print("\n=== Content saved to pdf_content.json ===")


if __name__ == "__main__":
    main()
