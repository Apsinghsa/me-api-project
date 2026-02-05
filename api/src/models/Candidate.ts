import mongoose, { Schema, Model } from 'mongoose';
import { ICandidateDocument, IProject } from '../types';

// Project sub-schema
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    stack: {
      type: [String],
      default: [],
    },
    links: {
      github: {
        type: String,
        trim: true,
      },
      demo: {
        type: String,
        trim: true,
      },
    },
  },
  { _id: true }
);

// Candidate schema
const candidateSchema = new Schema<ICandidateDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
    },
    education: {
      type: Schema.Types.Mixed,
      required: [true, 'Education is required'],
    },
    skills: {
      type: [String],
      default: [],
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    links: {
      type: Map,
      of: String,
      default: new Map(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        // Convert Map to plain object for JSON response
        if (ret.links instanceof Map) {
          ret.links = Object.fromEntries(ret.links);
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Text index for search functionality
candidateSchema.index({
  name: 'text',
  email: 'text',
  skills: 'text',
  'projects.title': 'text',
  'projects.description': 'text',
});

// Virtual for project count
candidateSchema.virtual('projectCount').get(function (this: ICandidateDocument) {
  return this.projects.length;
});

// Instance method to get projects by skill
candidateSchema.methods.getProjectsBySkill = function (
  this: ICandidateDocument,
  skill: string
): IProject[] {
  return this.projects.filter((project) =>
    project.stack.some((tech) => tech.toLowerCase().includes(skill.toLowerCase()))
  );
};

// Static method to search candidates
candidateSchema.statics.searchByText = async function (
  this: Model<ICandidateDocument>,
  searchQuery: string
): Promise<ICandidateDocument | null> {
  return this.findOne({
    $text: { $search: searchQuery },
  });
};

// Pre-save middleware
candidateSchema.pre('save', function (next) {
  // Trim all string fields in skills array
  if (this.skills && Array.isArray(this.skills)) {
    this.skills = this.skills.map((skill) => skill.trim()).filter(Boolean);
  }
  next();
});

const Candidate = mongoose.model<ICandidateDocument>('Candidate', candidateSchema);

export default Candidate;
