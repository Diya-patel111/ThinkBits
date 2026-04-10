import express from 'express';
import multer from 'multer';
import { parseSingleFile, parseBatchFiles } from '../controllers/parseController.js';

const router = express.Router();

// Using memory storage for faster, ephemeral file processing via AI.
const upload = multer({ storage: multer.memoryStorage() });

// single file parsing
router.post('/', upload.single('file'), parseSingleFile);

// batch parsing, limited to a max number of files (e.g., 20)
router.post('/batch', upload.array('files', 20), parseBatchFiles);

export default router;