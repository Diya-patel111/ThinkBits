import asyncio
import os
from dotenv import load_dotenv
load_dotenv('.env')
from google import genai
import logging
logging.basicConfig(level=logging.INFO)

async def t():
    c = genai.Client(api_key=os.getenv("GEMINI_API_KEY").strip())
    models = ["gemini-1.5-flash", "gemini-2.0-flash-lite-001", "gemini-2.0-flash-lite-preview-02-05", "gemini-exp-1206", "gemini-2.0-pro-exp", "gemini-2.5-flash"]
    for m in models:
        try:
            res = await c.aio.models.generate_content(model=m, contents="hi")
            print(f"SUCCESS with {m}: {res.text}")
            break # if one succeeds, we stop and use it
        except Exception as e:
            print(f"FAILED {m}: {e}")

asyncio.run(t())