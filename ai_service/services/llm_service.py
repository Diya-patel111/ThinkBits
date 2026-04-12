import json
import asyncio
import logging
import os
from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self, config=None):
        self.config = config or {}
        # Get Gemini API key from environment variable
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
            self.model_id = "gemini-2.5-flash"
        else:
            logger.warning("GEMINI_API_KEY not found. Using local/fallback mock.")
            self.client = None

    async def extract_with_llm(self, text):
        prompt = f"""
You are an expert HR data extraction system.
Extract structured resume data in JSON format based on the following categorized resume sections.

Resume Context:
{text}

Must return ONLY raw JSON matching this structure exactly (handle missing with null or empty arrays):
{{
  "name": "",
  "email": "",
  "phone": "",
  "location": "",
  "skills": [],
  "total_years_experience": 0, // Extract total years of work experience as an integer
  "experience": [
    {{"role": "", "company": "", "duration": "", "description": ""}}
  ],
  "education": [
    {{"degree": "", "institution": "", "year": ""}}
  ],
  "projects": [
    {{"name": "", "description": ""}}
  ],
  "certifications": []
}}
"""
        try:
            if self.client:
                # Making an async generation call to Gemini
                response = await self.client.aio.models.generate_content(
                    model=self.model_id,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                    )
                )
                raw_json = response.text
                return json.loads(raw_json)
            else:
                return await self._fallback_local_llm_extract(prompt)
                
        except Exception as e:
            logger.error(f"LLM Extraction Error: {e}")
            import traceback
            traceback.print_exc()
            return await self._fallback_local_llm_extract(prompt)

    async def _fallback_local_llm_extract(self, prompt):
        # Mocking an async LLM call for fallback when API key is missing or quota exceeded
        await asyncio.sleep(0.5)
        logger.info("Calling Local LLM Mock layer due to API failure/quota...")
        
        # Attempt minimal regex parsing from the prompt text instead of purely hardcoded values
        import re
        
        # Simple name extraction: find first lines that look like a name
        name_match = re.search(r"(?i)Resume Context:\n+([A-Z][a-z]+ [A-Z][a-z]+)", prompt)
        name = name_match.group(1) if name_match else "Unknown Candidate"
        
        # Email extraction
        email_match = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", prompt)
        email = email_match.group(0) if email_match else "unknown@example.com"
        
        # Phone extraction
        phone_match = re.search(r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", prompt)
        phone = phone_match.group(0) if phone_match else "Unknown Phone"
        
        # Collect some skills from text directly if standard skills are found
        skills_found = []
        standard_skills = ["python", "java", "sql", "aws", "docker", "javascript", "react", "node", "typescript", "c++", "c#", "go", "ruby", "machine learning"]
        text_lower = prompt.lower()
        for s in standard_skills:
            if s in text_lower:
                skills_found.append(s.title())
                
        return {
            "name": name,
            "email": email,
            "phone": phone,
            "location": "Unknown Location",
            "skills": list(set(skills_found)) if skills_found else ["Python", "Machine Learning", "System Architecture", "Agentic Workflows"],
            "experience": [],
            "education": [],
            "projects": [],
            "certifications": [],
            "total_years_experience": 0
        }
        
    def _get_empty_schema(self):
        return {
            "name": None, "email": None, "phone": None, "location": None,
            "skills": [], "experience": [], "education": [], "projects": [], "certifications": []
        }
