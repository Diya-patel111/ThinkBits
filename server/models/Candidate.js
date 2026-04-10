import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      location: { type: String },
      linkedin: { type: String },
      portfolio: { type: String }
    },
    skills: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
        isCurrent: Boolean,
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        graduationYear: Number,
      }
    ],
    resumeUrl: {
      type: String,
    }
  },
  { timestamps: true }
);

// Indexing on skills for efficient exact/array querying
candidateSchema.index({ skills: 1 });

// Text search optimization on name, skills, and experience for broad keyword searching
candidateSchema.index({ 
  'personalInfo.firstName': 'text', 
  'personalInfo.lastName': 'text', 
  'skills': 'text',
  'experience.role': 'text',
  'experience.description': 'text'
});

export default mongoose.model('Candidate', candidateSchema);
