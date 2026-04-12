import os
from google import genai
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
client = genai.Client()

models = ["gemini-1.5-pro", "gemini-1.0-pro", "gemini-1.5-flash", "gemini-1.5-flash-8b"]
for m in models:
    try:
        r = client.models.generate_content(model=m, contents="hello")
        print(f"[{m}] SUCCESS")
    except Exception as e:
        print(f"[{m}] FAILED: {str(e)[:150]}")
