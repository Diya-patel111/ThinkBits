import express from 'express';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully',
  });
});

export default router;