import asyncio, os, google.genai as genai
from dotenv import load_dotenv

load_dotenv('.env')

async def t():
    c = genai.Client(api_key=os.getenv('GEMINI_API_KEY').strip())
    
    for m in ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.0-flash-001', 'gemini-pro-latest']:
        try:
            res = await c.aio.models.generate_content(model=m, contents='hello')
            print(f"[{m}] SUCCESS: {res.text.strip()}")
        except Exception as e:
            print(f"[{m}] FAILED: {e}")

asyncio.run(t())