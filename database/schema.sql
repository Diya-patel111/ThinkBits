-- PostgreSQL Database Schema for NexHire

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Candidates Table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    raw_resume_text TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) -- e.g., 'Programming', 'Tools', 'Soft Skills'
);

-- 4. Candidate Skills Table (Many-to-Many resolution)
CREATE TABLE candidate_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50),
    years_of_experience NUMERIC(4,1),
    UNIQUE (candidate_id, skill_id) -- A candidate can have a specific skill only once
);

-- 5. Jobs Table
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Matches Table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    match_score NUMERIC(5,2) NOT NULL, -- e.g., 94.50
    missing_skills JSONB, -- Stores an array or object of skills that matched poorly
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (candidate_id, job_id) -- Prevent duplicate scores for the exact same job+candidate combination
);

-- -----------------------------------------------------------------------------
-- PERFORMANCE INDEXES 
-- -----------------------------------------------------------------------------

-- Indexing Foreign Keys for optimal JOIN performance
CREATE INDEX idx_candidate_skills_candidate_id ON candidate_skills(candidate_id);
CREATE INDEX idx_candidate_skills_skill_id ON candidate_skills(skill_id);

CREATE INDEX idx_matches_candidate_id ON matches(candidate_id);
CREATE INDEX idx_matches_job_id ON matches(job_id);

-- Indexing for match score querying (Optimized for retrieving top candidates)
CREATE INDEX idx_matches_score ON matches(match_score DESC);

-- Indexing for full text search operations on jobs and candidates (optional but highly recommended)
-- CREATE INDEX idx_jobs_description_fts ON jobs USING gin(to_tsvector('english', description));
-- CREATE INDEX idx_candidates_resume_fts ON candidates USING gin(to_tsvector('english', raw_resume_text));

-- Generalized Inverted Index (GIN) for querying missing skills directly from JSONB
CREATE INDEX idx_matches_missing_skills ON matches USING gin (missing_skills);
