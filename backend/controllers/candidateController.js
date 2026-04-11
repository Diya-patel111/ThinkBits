const Candidate = require('../models/Candidate');
const AIService = require('../services/aiService');
const fs = require('fs');

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
        // Send file to Python AI Service
        const parsedData = await AIService.parseResume(file.path);
        
        // Structure the payload
        const candidateData = {
          name: parsedData.name || 'Unknown Candidate',
          email: parsedData.email || `unknown-${Date.now()}@example.com`,
          skills: parsedData.skills || [],
          experience: parsedData.experience !== undefined ? parsedData.experience : 0,
          location: parsedData.location || '',
          phone: parsedData.phone || '',
          rawText: parsedData.rawText || ''
        };

        // Save to DB (using upsert logic)
        const updatedCandidate = await Candidate.upsert(candidateData);

        parseResults.push(updatedCandidate);

        // Optional: Clean up file after parsing
        fs.unlinkSync(file.path);
      } catch (fileErr) {
        errors.push({ filename: file.originalname, error: fileErr.message });
      }
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
