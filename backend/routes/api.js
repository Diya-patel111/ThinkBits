const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const candidateController = require('../controllers/candidateController');
const authController = require('../controllers/authController');

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);

// Candidate routes
router.post('/parse', upload.array('resumes', 10), candidateController.parseResumes);
router.post('/match', candidateController.matchJobs);
router.get('/candidates', candidateController.getCandidates);

module.exports = router;
