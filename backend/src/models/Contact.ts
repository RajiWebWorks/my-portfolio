import mongoose, { Schema, Document } from 'mongoose';

// Interface matching the frontend ContactFormData type
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    // You could add fields like 'read: false' if you want to track viewed messages
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model<IContact>('Contact', ContactSchema); 