import crypto from 'crypto';

// @desc    Parse a single uploaded file
// @route   POST /api/v1/parse
// @access  Public (or protected if needed later)
export const parseSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file');
    }

    // Generate a unique ID simulating a database or user ID
    const candidateId = crypto.randomUUID();

    // Simulate AI parsing delay & structured output
    const parsedData = {
      candidateId,
      name: 'John Doe (Extracted)',
      email: 'johndoe@example.com',
      phone: '+1 (555) 123-4567',
      skills: ['Node.js', 'Express', 'React', 'MongoDB', 'AI Tooling'],
      experience: 4, // Years
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
    };

    res.status(200).json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Parse multiple uploaded files in a batch
// @route   POST /api/v1/parse/batch
// @access  Public (or protected if needed later)
export const parseBatchFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('Please upload at least one file for the batch');
    }

    const jobId = crypto.randomUUID();

    res.status(202).json({
      success: true,
      jobId,
      message: `Batch job ${jobId} successfully started for ${req.files.length} files.`,
      status: 'processing',
    });
  } catch (error) {
    next(error);
  }
};