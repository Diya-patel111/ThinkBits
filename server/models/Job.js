import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],
    status: {
      type: String,
      enum: ['open', 'closed', 'draft'],
      default: 'open',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

// Indexing required skills for exact/array queries (e.g. finding jobs by specific skills)
jobSchema.index({ requiredSkills: 1 });

// Text search optimization on title and description 
jobSchema.index({ 
  title: 'text', 
  description: 'text' 
});

export default mongoose.model('Job', jobSchema);
