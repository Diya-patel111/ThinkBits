import asyncio, os, google.genai as genai
from dotenv import load_dotenv

load_dotenv('.env')

async def t():
    try:
        c = genai.Client(api_key=os.getenv('GEMINI_API_KEY').strip())
        res = await c.aio.models.generate_content(
            model='gemini-2.5-flash',
            contents='ok'*2000
        )
        print("Success!", len(res.text))
    except Exception as e:
        print("Error:", e)

asyncio.run(t())
