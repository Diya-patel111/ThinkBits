from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Candidate
from utils.file_parser import extract_text_from_pdf, extract_text_from_docx
from sentence_transformers import SentenceTransformer, util
from fastapi.middleware.cors import CORSMiddleware
from agents.parsing_agent import ResumeParsingAgent
import shutil
import os
import tempfile
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

model = SentenceTransformer('all-MiniLM-L6-v2')
STANDARD_SKILLS = ["python", "java", "sql", "aws", "docker", "javascript", "react", "node", "typescript", "c++", "c#", "go", "ruby"]

def parse_resume_text(text, filename):
    return {"name": "Test", "email": "", "skills": []}

def normalize_skills(skills):
    return [str(s).lower() for s in skills]

app = FastAPI(title="NexHire AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

parsing_agent = ResumeParsingAgent()

@app.post("/api/v1/resume/parse")
async def parse_resume(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    suffix = Path(file.filename or "resume").suffix
    temp_file = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix or ".tmp") as buffer:
            shutil.copyfileobj(file.file, buffer)
            temp_file = buffer.name
        result = await parsing_agent.parse(temp_file)
        return dict(result)
    except Exception as e:
        print("FastAPI parsing error:", e)
        return {"data": {}, "confidence_score": 0.0, "execution_trace": [f"API Error: {e}"]}
    finally:
        if temp_file and os.path.exists(temp_file):
            os.remove(temp_file)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# --- Agent 3: Matching ---

class MatchRequest(BaseModel):
    job_description: str

def compute_match_score(candidate_text: str, job_description: str) -> float:
    # 1. Semantic similarity using a snippet of the candidate text
    # Limiting to 1000 chars ensures we don't dilute the embedding too much
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
            # If the job asks for a standard skill, check if candidate has it
            if skill.lower() in cand_lower:
                boost += 25.0  # Big boost for explicit skill match
                matched_skills += 1
            else:
                boost -= 10.0  # Penalty for missing a requested skill
                
    # If job description mentions no standard skills, just rely more on semantic
    base_score = max(0, cosine_score * 100)
    
    # We want a base score to be roughly 50-60 if it's somewhat relevant
    if base_score > 15:
        base_score += 40
        
    final_score = base_score + boost
    
    # Ensure realistic capping
    return max(0.0, min(final_score, 100.0))


# --- API Routes ---

@app.post("/parse")
async def parse_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx', '.doc')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
    
    try:
        contents = await file.read()
        
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(contents)
        else:
            text = extract_text_from_docx(contents)
            
        parsed_data = parse_resume_text(text, file.filename)
        
        # apply normalization agent
        normalized_skills = normalize_skills(parsed_data['skills'])
        parsed_data['skills'] = normalized_skills
        
        # Return parsed data, let the Node.js backend handle database persistence
        return parsed_data
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class MathRequestWithCandidates(BaseModel):
    jobDescription: str
    candidates: list

@app.post("/match")
async def match_candidates(req: MathRequestWithCandidates):
    try:
        results = []
        for cand in req.candidates:
            cand_text = cand.get('text', '')
            # encode using candidate text directly
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
            # fetch skills
            cand_text = " ".join([s.skill.name for s in cand.skills])
            score = compute_match_score(cand_text, req.job_description)
            results.append({
                "id": str(cand.id),
                "name": cand.name,
                "role": "Candidate", # Placeholder
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