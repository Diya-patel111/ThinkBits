import asyncio
import os
from dotenv import load_dotenv
load_dotenv('.env')

from services.llm_service import LLMService

async def test():
    svc = LLMService()
    print('API KEY loaded:', bool(svc.api_key))
    if svc.client is None:
        print('Client is None')
        return
    try:
        res = await svc.client.aio.models.generate_content(
            model=svc.model_id,
            contents='Return JSON {"status": "ok"}'
        )
        print('Success:', res.text)
    except Exception as e:
        print('FAILED ERROR:', e)

asyncio.run(test())