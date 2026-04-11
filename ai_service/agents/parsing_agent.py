import json
from services.llm_service import model

def parse_resume_text(text: str):
    prompt = f"""
    Extract the following information from the resume text and return it strictly as a JSON object:
    - skills (list of strings)
    - experience (list of strings or objects)
    - education (list of strings or objects)

    Resume Text:
    {text}
    """
    
    try:
        # Use .invoke() for LangChain GoogleGenerativeAI
        response = model.invoke(prompt)
        
        # Extract the text content from the response
        # If response is a string, use it. If it's a ChatMessage, use .content
        response_text = response.content if hasattr(response, 'content') else str(response)

        # Clean up Markdown formatting if Gemini adds it
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()

        return json.loads(response_text)

    except Exception as e:
        print(f"Detailed Parsing Error: {e}")
        # Return empty structure so the backend doesn't crash
        return {"skills": [], "experience": [], "education": []}