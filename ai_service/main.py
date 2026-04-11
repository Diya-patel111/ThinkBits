from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer, util
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import tempfile
from pathlib import Path
from dotenv import load_dotenv

# Local project imports
from database import get_db, engine
import models
from models import Candidate
from utils.file_parser import FileParser
from services.llm_service import LLMService

# Load environment variables
load_dotenv(Path(__file__).resolve().parent / ".env")

# Initialize models and DB
models.Base.metadata.create_all(bind=engine)
model = SentenceTransformer('all-MiniLM-L6-v2')
llm_service = LLMService()

# Constants
STANDARD_SKILLS = ["python", "java", "sql", "aws", "docker", "javascript", "react", "node", "typescript", "c++", "c#", "go", "ruby"]

app = FastAPI(title="NexHire AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/resume/parse")
async def parse_resume_api(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    suffix = Path(file.filename or "resume").suffix
    temp_file = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix or ".tmp") as buffer:
            shutil.copyfileobj(file.file, buffer)
            temp_file = buffer.name
            
        # 1. Extract raw text from the file using your FileParser
        text_blocks = FileParser.extract_text(temp_file)
        full_text = "\n".join([b["text"] for b in text_blocks])

        # 2. Directly call the LLM service
        parsed_data = await llm_service.extract_with_llm(full_text)

        # Basic Cleanup
        if "skills" in parsed_data and parsed_data["skills"]:
            parsed_data["skills"] = [str(s).lower() for s in parsed_data["skills"]]

        return {
            "data": parsed_data,
            "confidence_score": 0.95,
            "execution_trace": ["Parsed successfully using direct LLM call"]
        }
    except Exception as e:
        print("FastAPI parsing error:", e)
        return {"data": {}, "confidence_score": 0.0, "execution_trace": [f"API Error: {e}"]}
    finally:
        if temp_file and os.path.exists(temp_file):
            os.remove(temp_file)

# --- Agent 3: Matching ---

class MatchRequest(BaseModel):
    job_description: str

class MathRequestWithCandidates(BaseModel):
    jobDescription: str
    candidates: list

def compute_match_score(candidate_text: str, job_description: str) -> float:
    # 1. Semantic similarity using a snippet of the candidate text
    embeddings1 = model.encode(candidate_text[:1000], convert_to_tensor=True)
    embeddings2 = model.encode(job_description, convert_to_tensor=True)
    
    cosine_score = util.cos_sim(embeddings1, embeddings2).item()
    
    # 2. Keyword matching boost
    job_lower = job_description.lower()
    cand_lower = candidate_text.lower()
    
    boost = 0.0
    matched_skills = 0
    
    for skill in STANDARD_SKILLS:
        if skill.lower() in job_lower:
            if skill.lower() in cand_lower:
                boost += 25.0
                matched_skills += 1
            else:
                boost -= 10.0
                
    base_score = max(0, cosine_score * 100)
    
    if base_score > 15:
        base_score += 40
        
    final_score = base_score + boost
    return max(0.0, min(final_score, 100.0))

@app.post("/match")
async def match_candidates(req: MathRequestWithCandidates):
    try:
        results = []
        for cand in req.candidates:
            cand_text = cand.get('text', '')
            score = compute_match_score(cand_text, req.jobDescription)
            results.append({
                "id": str(cand.get('id')),
                "score": round(score, 2)
            })
        return results
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/match-all")
async def match_all_candidates(req: MatchRequest, db: Session = Depends(get_db)):
    try:
        candidates = db.query(Candidate).all()
        results = []
        for cand in candidates:
            cand_text = " ".join([s.skill.name for s in cand.skills])
            score = compute_match_score(cand_text, req.job_description)
            results.append({
                "id": str(cand.id),
                "name": cand.name,
                "role": "Candidate",
                "score": round(score, 2),
                "skills": [s.skill.name for s in cand.skills]
            })
        
        results.sort(key=lambda x: x['score'], reverse=True)
        return {"matches": results}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/candidates")
async def get_candidates(db: Session = Depends(get_db)):
    try:
        candidates = db.query(Candidate).order_by(Candidate.created_at.desc()).all()
        results = []
        for cand in candidates:
            results.append({
                "id": str(cand.id),
                "name": cand.name,
                "email": cand.email,
                "skills": [s.skill.name for s in cand.skills],
                "created_at": cand.created_at
            })
        return {"candidates": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
