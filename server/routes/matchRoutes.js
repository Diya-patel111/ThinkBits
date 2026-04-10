import express from 'express';
import { matchCandidate } from '../controllers/matchController.js';

const router = express.Router();

router.post('/', matchCandidate);

export default router;