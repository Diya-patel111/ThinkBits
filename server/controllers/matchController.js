// @desc    Match candidate skills against a job description
// @route   POST /api/v1/match
// @access  Public (or protected)
export const matchCandidate = async (req, res, next) => {
  try {
    const { candidateId, jobDescription } = req.body;

    if (!candidateId || !jobDescription) {
      res.status(400);
      throw new Error('Please provide both candidateId and jobDescription');
    }

    // 1. Simulate fetching the candidate's skills from the database
    // In a real application, you would do: const candidate = await Candidate.findById(candidateId);
    const candidateSkills = [
      'node.js', 'express', 'react', 'mongodb', 'typescript', 'docker', 'git'
    ];

    // 2. Simulate extracting required skills from the job description
    // In a production AI app, you would pass the JD to an LLM (like OpenAI) to extract skills.
    // Here we use a dictionary-based mock extraction for the hackathon MVP.
    const techDictionary = [
      'node.js', 'react', 'mongodb', 'python', 'aws', 'docker', 
      'kubernetes', 'express', 'typescript', 'sql', 'java', 'graphql'
    ];

    const requiredSkills = techDictionary.filter(skill =>
      new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i').test(jobDescription)
    );

    // If no recognizable skills are found in the JD
    if (requiredSkills.length === 0) {
      return res.status(200).json({
        success: true,
        matchScore: 0,
        matchedSkills: [],
        missingSkills: [],
        message: 'No recognizable technical skills found in the Job Description.',
      });
    }

    // 3. Compare skills
    const matchedSkills = requiredSkills.filter(skill => candidateSkills.includes(skill));
    const missingSkills = requiredSkills.filter(skill => !candidateSkills.includes(skill));

    // 4. Calculate Match Score (0 - 100)
    const matchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);

    // 5. Return the result
    res.status(200).json({
      success: true,
      matchScore,
      matchedSkills,
      missingSkills,
      candidateId
    });
  } catch (error) {
    next(error);
  }
};