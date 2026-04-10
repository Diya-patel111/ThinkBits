import express from 'express';
import { getCandidate } from '../controllers/candidateController.js';

const router = express.Router();

router.get('/:id', getCandidate);

export default router;