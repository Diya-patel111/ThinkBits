// @desc    Get parsed candidate data by ID
// @route   GET /api/v1/candidates/:id
// @access  Public (or protected if needed later)
export const getCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Simulate fetching from database
    const candidateData = {
      _id: id,
      name: 'Simulated Candidate Name',
      email: `candidate-${id.substring(0, 4)}@example.com`,
      phone: '+1 (555) 000-0000',
      education: 'B.Sc. in Computer Science',
      status: 'parsed',
      updatedAt: new Date().toISOString(),
    };

    // Return the parsed data
    res.status(200).json({
      success: true,
      data: candidateData,
    });
  } catch (error) {
    next(error);
  }
};