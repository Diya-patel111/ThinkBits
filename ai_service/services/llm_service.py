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
            self.model_id = "gemini-1.5-flash"
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
            return self._get_empty_schema()

    async def _fallback_local_llm_extract(self, prompt):
        # Mocking an async LLM call for fallback when API key is missing
        await asyncio.sleep(0.5)
        logger.info("Calling Local LLM Mock layer...")
        return {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+1 555 123 4567",
            "location": "San Francisco, CA",
            "skills": ["Python", "Machine Learning", "System Architecture", "Agentic Workflows"],
            "experience": [],
            "education": [],
            "projects": [],
            "certifications": []
        }
        
    def _get_empty_schema(self):
        return {
            "name": None, "email": None, "phone": None, "location": None,
            "skills": [], "experience": [], "education": [], "projects": [], "certifications": []
        }