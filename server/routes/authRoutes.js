import express from 'express';
import { registerUser, loginUser, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// Example of a protected test route
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

export default router;