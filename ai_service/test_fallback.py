import asyncio
from services.llm_service import LLMService
async def main():
    service = LLMService()
    try:
        with open("sample_resume.txt", "r") as f:
            text = f.read()
    except FileNotFoundError:
        text = "Diya Patel\ndiya.patel@example.com\n1234567890\nPython Java\nWorked 5 years"
    res = await service._fallback_local_llm_extract(f"Resume Context:\n{text}")
    print(res)

if __name__ == "__main__":
    asyncio.run(main())