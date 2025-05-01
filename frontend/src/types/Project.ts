// frontend/src/types/Project.ts

// Defines the structure for a Project object, matching backend data
export interface Project {
  _id: string; // ID from MongoDB
  title: string;
  description: string;
  imageUrl: string; // Made non-optional based on usage
  demoUrl?: string | null; // Optional URL to the live deployment/demo (allow null)
  codeUrl?: string | null; // Optional URL to the code repository (allow null)
  categories?: string[];  // Added optional categories array
  techStack?: string[];   // Added optional tech stack array
  tags?: string[];        // Added optional tags array (if used)
  createdAt?: string;     // Optional timestamp
  updatedAt?: string;     // Optional timestamp
}
