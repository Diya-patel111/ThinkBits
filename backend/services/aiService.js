const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const PYTHON_API_URL = process.env.PYTHON_AI_URL || 'http://localhost:8000';

class AIService {
  /**
   * Calls Python service to parse a resume document.
   * @param {string} filePath - Absolute or relative path to the uploaded file
   */
  static async parseResume(filePath) {
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));

      const response = await axios.post(`${PYTHON_API_URL}/parse`, form, {
        headers: {
          ...form.getHeaders()
        }
      });
      return response.data; // Expected { name, email, skills, experience, education, rawText }
    } catch (error) {
      console.error('Error communicating with AI parser service:', error.message);
      
      // Extract filename to display instead of a random mock candidate
      const fileName = path.basename(filePath);
      const displayName = fileName.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

      // Returning mock data using the filename if python service is offline or failing
      return {
        name: displayName || "Mock Candidate",
        email: `${displayName.replace(/\s+/g, '').toLowerCase() || 'candidate'}@example.com`,
        skills: ["Unparsed"],
        experience: 0,
        education: "Unknown",
        rawText: "Failed to extract text. AI Python service may be offline."
      };
    }
  }

  /**
   * Calls Python service for job matching
   * @param {string} jobDescription - Target job description
   * @param {Array} candidates - Array of candidates to score
   */
  static async getCandidateMatches(jobDescription, candidates) {
    try {
      const response = await axios.post(`${PYTHON_API_URL}/match`, {
        jobDescription,
        candidates
      });
      return response.data; // Expected to return array with match percentages
    } catch (error) {
      console.error('Error communicating with AI match service:', error.message);
      // Returning mock scores if python service is offline
      return candidates.map(c => ({
        id: c.id,
        score: Math.floor(Math.random() * 100) // Random score between 0 and 100
      }));
    }
  }
}

module.exports = AIService;
