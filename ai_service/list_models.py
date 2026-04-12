import google.genai as genai
import os
from dotenv import load_dotenv

load_dotenv('.env')

c = genai.Client(api_key=os.getenv('GEMINI_API_KEY').strip())

try:
    for m in c.models.list():
        print(m.name)
except Exception as e:
    print(e)
