import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      index: true, // Efficient querying by skill domain/category
    },
    synonyms: [
      {
        type: String,
        lowercase: true,
        trim: true,
      }
    ],
    parentSkill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      default: null,
      index: true, // Useful for reconstructing taxonomic hierarchies 
    }
  },
  { timestamps: true }
);

// Text search optimization on name and synonyms for fuzzy searching / autosuggest
skillSchema.index({ name: 'text', synonyms: 'text' });

export default mongoose.model('Skill', skillSchema);
