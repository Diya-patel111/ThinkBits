import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
      index: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Assuming score is calculated as a 0-100 percentage
    },
    missingSkills: [
      {
        type: String,
        lowercase: true,
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

// Compound index to quickly fetch the most relevant candidates for a specific job
matchSchema.index({ jobId: 1, score: -1 });

// Ensure a matched candidate and job are a unique pair
matchSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export default mongoose.model('Match', matchSchema);
