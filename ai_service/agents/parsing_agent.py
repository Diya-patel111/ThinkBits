import json
import asyncio
import time
import logging
from services.llm_service import LLMService
from services.embedding_service import EmbeddingService
from utils.file_parser import FileParser
from utils.validators import OutputValidator

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class ResumeParsingAgent:
    def __init__(self):
        # Initialize specialized sub-services
        self.llm_service = LLMService()
        self.embedding_service = EmbeddingService()

    async def parse(self, filepath):
        execution_trace = []
        start_time = time.time()
        
        try:
            # 🟢 Layer 1: Layout-Aware Text Extraction
            logging.info(f"Extracting layout from {filepath}...")
            blocks = FileParser.extract_text(filepath)
            execution_trace.append(f"Extracted {len(blocks)} layout-aware text blocks.")
            
            # 🟡 Layer 2: Semantic Section Detection
            logging.info("Detecting semantic sections...")
            sections = self.embedding_service.detect_sections(blocks)
            execution_trace.append(f"Detected sections using embeddings: {list(sections.keys())}")
            
            # 🔵 Layer 3: LLM-Based Extraction (Gemini)
            logging.info("Running Gemini LLM extraction...")
            # Combine intelligent segments for the prompt
            context_string = "\n".join([f"[{k.upper()}] {v}" for k, v in sections.items() if v])
            
            raw_extracted_data = await self.llm_service.extract_with_llm(context_string)
            execution_trace.append("Gemini LLM extracted structured JSON data successfully.")
            
            # 🟣 Layer 4: Validation & Post-processing
            logging.info("Validating and cleaning output...")
            result = OutputValidator.validate_and_clean(raw_extracted_data)
            execution_trace.append("Validated, cleaned output, and calculated confidence score.")
            
            end_time = time.time()
            processing_time = round(end_time - start_time, 2)
            execution_trace.append(f"Parsing completed in {processing_time} seconds.")
            
            if processing_time > 5.0:
                logging.warning(f"Performance warning: Parsing took {processing_time}s (Limit is 5s).")

            return {
                "data": result["data"],
                "confidence_score": result["confidence_score"],
                "execution_trace": execution_trace
            }
            
        except Exception as e:
            logging.error(f"Error parsing resume: {str(e)}")
            execution_trace.append(f"FAILED: {str(e)}")
            return {
                "data": {},
                "confidence_score": 0.0,
                "execution_trace": execution_trace
            }

# Example usage local testing
async def main():
    agent = ResumeParsingAgent()
    # Assume user uploaded a file:
    result = await agent.parse("sample_resume.txt")
    import json
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(main())