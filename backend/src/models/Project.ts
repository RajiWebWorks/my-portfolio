// backend/src/models/Project.ts

import mongoose, { Schema, Document } from 'mongoose';

// Interface matching the frontend Project type
export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[]; // Keep optional if not always present
  demoUrl?: string | null; // Changed from liveUrl, allow null
  codeUrl?: string | null; // Changed from repoUrl, allow null
  categories?: string[]; // Added based on frontend type
  techStack?: string[]; // Added based on frontend type
  createdAt: Date; // Added by timestamps: true
  updatedAt: Date; // Added by timestamps: true
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      // Consider adding trim: true here as well if desired
    },
    imageUrl: {
      type: String,
      required: [true, 'Project image URL is required'],
      // Consider adding trim: true here if URLs might have whitespace
    },
    tags: {
      type: [String], // Array of strings
      default: [],    // Default to an empty array
    },
    demoUrl: { // Changed from liveUrl
      type: String,
      trim: true,
      default: null // Explicitly allow null, useful if URL is optional
      // You might add a validator here if you want to ensure it's a valid URL format when provided
      // match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please use a valid URL for Demo URL']
    },
    codeUrl: { // Changed from repoUrl
      type: String,
      trim: true,
      default: null // Explicitly allow null
      // Add URL validation if needed
      // match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please use a valid URL for Code URL']
    },
    // Added fields based on frontend type, assuming they might be in data
    categories: {
        type: [String],
        default: [] // Default to an empty array
    },
    techStack: {
        type: [String],
        default: [] // Default to an empty array
    }
  },
  {
    // Mongoose options
    timestamps: true, // Automatically adds createdAt and updatedAt fields managed by Mongoose
  }
);

// Create and export the Mongoose model
export default mongoose.model<IProject>('Project', ProjectSchema);