import io
import re
import tempfile
import docx
import pdfplumber
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from thefuzz import process, fuzz
from sentence_transformers import SentenceTransformer, util
from sqlalchemy.orm import Session
from database import get_db
from models import Candidate, CandidateSkill, Skill

app = FastAPI(title="NexHire AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define normalized skills dictionary
SKILL_MAPPING = {
    "react.js": "React",
    "js": "JavaScript",
    "node.js": "Node.js",
    "ts": "TypeScript",
    "py": "Python",
    "golang": "Go",
    "aws": "AWS",
    "docker": "Docker",
    "k8s": "Kubernetes"
}

STANDARD_SKILLS = [
    "JavaScript", "Python", "React", "Node.js", "Java", "C++",
    "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "TypeScript",
    "Go", "HTML", "CSS", "Machine Learning", "Data Analysis"
]

# --- Agent 1: Resume Parsing ---

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    # docx library requires file-like object
    doc = docx.Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

def parse_resume_text(text: str):
    """Simple regex based extraction of name, emails, and skills"""
    # Exract Email
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    emails = re.findall(email_pattern, text)
    email = emails[0] if emails else ""
    
    # Extract Name (Heuristic: first line or first word)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    name = lines[0] if lines else "Unknown"

    # Extract Skills (Heuristic: look for known skills in text)
    found_skills = []
    text_lower = text.lower()
    for skill in STANDARD_SKILLS:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    # For experience, heuristic: look for years
    experience_pattern = r'(\d+)\+?\s*(years|yrs)'
    exp_matches = re.search(experience_pattern, text_lower)
    experience = int(exp_matches.group(1)) if exp_matches else 0

    return {
        "name": name,
        "email": email,
        "skills": found_skills,
        "experience": experience,
        "raw_text": text
    }


# --- Agent 2: Skill Normalization ---

def normalize_skills(skills: list) -> list:
    normalized = []
    for skill in skills:
        skill_lower = skill.lower()
        if skill_lower in SKILL_MAPPING:
            normalized.append(SKILL_MAPPING[skill_lower])
        else:
            # Fuzzy match against standard skills
            match = process.extractOne(skill, STANDARD_SKILLS, scorer=fuzz.token_sort_ratio)
            if match and match[1] > 80:  # 80 is the fuzzy score threshold
                normalized.append(match[0])
            else:
                normalized.append(skill)
    return list(set(normalized))


# --- Agent 3: Matching ---

class MatchRequest(BaseModel):
    job_description: str

def compute_match_score(candidate_skills: list[str], job_description: str) -> float:
    skills_text = " ".join(candidate_skills)
    
    # Encode
    embeddings1 = model.encode(skills_text, convert_to_tensor=True)
    embeddings2 = model.encode(job_description, convert_to_tensor=True)
    
    # Compute cosine-similarities
    cosine_score = util.cos_sim(embeddings1, embeddings2)
    score = cosine_score.item() * 100 
    
    # Cap score between 0 and 100
    return max(0.0, min(score, 100.0))


# --- API Routes ---

@app.post("/parse")
async def parse_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.pdf', '.docx', '.doc')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
    
    try:
        contents = await file.read()
        
        if file.filename.endswith('.pdf'):
            text = extract_text_from_pdf(contents)
        else:
            text = extract_text_from_docx(contents)
            
        parsed_data = parse_resume_text(text)
        
        # apply normalization agent
        normalized_skills = normalize_skills(parsed_data['skills'])
        parsed_data['skills'] = normalized_skills
        
        # Save to DB
        candidate = Candidate(
            name=parsed_data['name'],
            email=parsed_data['email'],
            raw_resume_text=parsed_data['raw_text'],
            phone="",
            location=""
        )
        db.add(candidate)
        db.flush() # get ID
        
        for skill_name in normalized_skills:
            # Check if skill exists
            skill = db.query(Skill).filter(Skill.name == skill_name).first()
            if not skill:
                skill = Skill(name=skill_name, category="Auto-extracted")
                db.add(skill)
                db.flush()
                
            cs = CandidateSkill(candidate_id=candidate.id, skill_id=skill.id)
            db.add(cs)
            
        db.commit()
        db.refresh(candidate)
        
        parsed_data['id'] = str(candidate.id)
        return parsed_data
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/match-all")
async def match_all_candidates(req: MatchRequest, db: Session = Depends(get_db)):
    try:
        candidates = db.query(Candidate).all()
        results = []
        for cand in candidates:
            # fetch skills
            score = compute_match_score([s.skill.name for s in cand.skills], req.job_description)
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