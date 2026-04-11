const Candidate = require('../models/Candidate');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const PYTHON_AI_BASE_URL = (process.env.PYTHON_AI_URL || 'http://localhost:8000').replace(/\/+$/, '');
const PYTHON_PARSE_ENDPOINT = `${PYTHON_AI_BASE_URL}/api/v1/resume/parse`;
const PYTHON_AI_TIMEOUT_MS = Number(process.env.PYTHON_AI_TIMEOUT_MS) || 120000;

const getParserErrorInfo = (error) => {
  if (error?.code === 'ECONNREFUSED') {
    return {
      status: 503,
      code: 'PARSER_UNAVAILABLE',
      message: 'Resume parser service is unavailable. Start the AI service and try again.'
    };
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      status: 504,
      code: 'PARSER_TIMEOUT',
      message: 'Resume parsing timed out. Please retry in a moment.'
    };
  }

  const parserMessage =
    error?.response?.data?.detail ||
    error?.response?.data?.error ||
    (typeof error?.response?.data === 'string' ? error.response.data : '') ||
    (typeof error?.message === 'string' ? error.message : '');

  const cleanedMessage = parserMessage && parserMessage.trim() ? parserMessage.trim() : 'Failed to process this resume file.';

  return {
    status: error?.response?.status || 500,
    code: error?.code || 'PARSER_ERROR',
    message: cleanedMessage
  };
};

const safeDeleteUpload = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (cleanupErr) {
    console.warn(`Unable to delete temp upload ${filePath}:`, cleanupErr?.message || cleanupErr);
  }
};

/**
 * Process a resume upload
 * Accepts multiple files, uploads them, sends to Python AI for parsing,
 * saves results in MongoDB.
 */
exports.parseResumes = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No resume files provided' });
    }

    const parseResults = [];
    const errors = [];

    // Loop through uploaded files
    for (const file of req.files) {
      try {
        // Forward the file directly to the Python AI service
        const formData = new FormData();
        const fileStream = fs.createReadStream(file.path);
        formData.append('file', fileStream, file.originalname);

        const pythonResponse = await axios.post(PYTHON_PARSE_ENDPOINT, formData, {
            headers: {
                ...formData.getHeaders(),
            },
            timeout: PYTHON_AI_TIMEOUT_MS // Parser startup/model warm-up can exceed 30s
        });
        
        const aiData = pythonResponse.data;
        const parsedData = aiData.data || {};
        
        // Structure the payload for the Database
        const candidateData = {
          name: parsedData.name || 'Unknown Candidate',
          email: parsedData.email || `unknown-${Date.now()}@example.com`,
          skills: parsedData.skills || [],
          experience: Array.isArray(parsedData.experience) ? parsedData.experience.length : 0,
          location: parsedData.location || '',
          phone: parsedData.phone || '',
          rawText: '' // Omitted for brevity, but you can send raw text back if needed
        };

        // Save to DB (using upsert logic)
        const updatedCandidate = await Candidate.upsert(candidateData);

        parseResults.push({
            ...updatedCandidate,
            ...parsedData, // Merge the full AI extracted JSON (skills, experience, projects) back to frontend
            confidence_score: aiData.confidence_score
        });
      } catch (fileErr) {
        const parserError = getParserErrorInfo(fileErr);
        console.error("Resume file processing error:", parserError, fileErr);
        errors.push({
          filename: file.originalname,
          error: parserError.message,
          code: parserError.code,
          status: parserError.status
        });
      } finally {
        await safeDeleteUpload(file.path);
      }
    }

    if (parseResults.length === 0 && errors.length > 0) {
      const primaryError = errors[0];
      return res.status(primaryError.status || 500).json({
        error: primaryError.error || 'Failed to process resume.',
        details: errors
      });
    }

    return res.status(200).json({
      message: 'Resumes processed',
      successCount: parseResults.length,
      failCount: errors.length,
      candidates: parseResults,
      errors
    });
  } catch (error) {
    console.error('Error in parseResumes:', error);
    res.status(500).json({ error: 'Internal server error processing resumes.' });
  }
};

/**
 * Fetch matches for a given job description
 */
exports.matchJobs = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    // Retrieve all active candidates from database
    const candidates = await Candidate.getAll();

    if (candidates.length === 0) {
      return res.status(200).json({ message: 'No candidates currently available to match', matches: [] });
    }

    // Prepare data format for python
    const aiCandidatesPayload = candidates.map(c => ({
      id: c.id, 
      text: `${(c.skills || []).join(', ')} ${c.raw_resume_text || ''}`
    }));

    // Perform AI Matching via Python Service
    const aiMatchesResponse = await AIService.getCandidateMatches(jobDescription, aiCandidatesPayload);

    // Merge match score with DB profiles based on ID returned from Python backend
    // Expected python response mapping: { [candidateId]: matchScorePercent } or [ { id, score } ]
    
    let scoredCandidates = candidates.map(c => {
      let scoreObj = Array.isArray(aiMatchesResponse) ? aiMatchesResponse.find(m => m.id && m.id.toString() === c.id.toString()) : null;
      let aiScore = scoreObj ? scoreObj.score : 0;
      return { ...c, matchScore: aiScore };
    });

    // Sort heavily by matchScore descending
    scoredCandidates.sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      message: 'Job mapping complete.',
      jobDescription,
      matches: scoredCandidates
    });
  } catch (error) {
    console.error('Error in matchJobs:', error);
    res.status(500).json({ error: 'Failed to process job matching.' });
  }
};

/**
 * Get the list of all uploaded candidates
 */
exports.getCandidates = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const candidates = await Candidate.getAll();
    
    return res.status(200).json({
      count: candidates.length,
      data: candidates.slice(0, limit)
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Error fetching candidates.' });
  }
};
