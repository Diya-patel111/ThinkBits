import fitz  # PyMuPDF
import docx
import os
import re

class FileParser:
    @staticmethod
    def extract_text_from_pdf(filepath):
        # Extract text WITH fonts, size, and styling
        doc = fitz.open(filepath)
        blocks_data = []
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            page_dict = page.get_text("dict") # Gets dict containing span properties
            for block in page_dict.get("blocks", []):
                if block.get("type") == 0:  # text block
                    for line in block.get("lines", []):
                        for span in line.get("spans", []):
                            text = span.get("text", "").strip()
                            if text:
                                # Determine if bold (checking flags or font name)
                                is_bold = "bold" in span.get("font", "").lower() or bool(span.get("flags", 0) & 2**4)
                                blocks_data.append({
                                    "text": text,
                                    "font_size": span.get("size", 12),
                                    "is_bold": is_bold,
                                    "bbox": span.get("bbox")
                                })
        
        # Calculate median font size for heuristic heading detection
        if not blocks_data: return []
        fonts = sorted([b["font_size"] for b in blocks_data])
        median_font = fonts[len(fonts)//2]
        
        for b in blocks_data:
            # Heuristic algorithm: Heading if text is noticeably larger than median OR (bold and short)
            b["is_heading"] = b["font_size"] > median_font + 1.0 or (b["is_bold"] and len(b["text"].split()) < 8)
        return blocks_data

    @staticmethod
    def extract_text_from_docx(filepath):
        doc = docx.Document(filepath)
        blocks_data = []
        for i, para in enumerate(doc.paragraphs):
            text = para.text.strip()
            if text:
                is_heading = 'Heading' in para.style.name or (len(text.split()) < 8 and any(run.bold for run in para.runs))
                blocks_data.append({
                    "text": text,
                    "is_heading": is_heading
                })
        return blocks_data

    @staticmethod
    def extract_text(filepath):
        ext = os.path.splitext(filepath)[1].lower()
        if ext == ".pdf":
            return FileParser.extract_text_from_pdf(filepath)
        elif ext in [".docx", ".doc"]:
            return FileParser.extract_text_from_docx(filepath)
        elif ext == ".txt":
            with open(filepath, 'r', encoding='utf-8') as f:
                return [{"text": line.strip(), "is_heading": False} for line in f.readlines() if line.strip()]
        else:
            raise ValueError(f"Unsupported format: {ext}")
