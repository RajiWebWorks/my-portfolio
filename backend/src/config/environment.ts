import dotenv from 'dotenv';

dotenv.config(); // Load .env file contents into process.env

// Basic check for essential variables
if (!process.env.PORT) {
  console.warn('Warning: PORT environment variable is not set. Defaulting might occur.');
}

if (!process.env.FRONTEND_URL) {
  console.warn('Warning: FRONTEND_URL environment variable is not set. CORS might block frontend.');
}

// You could add more sophisticated validation here using libraries like Joi or Zod
// to ensure required variables are present and have the correct format.

// Export loaded variables if needed, though accessing process.env directly is common
// export const config = {
//   port: process.env.PORT || 5000,
//   frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
//   mongoUri: process.env.MONGODB_URI,
// };

// This file primarily ensures dotenv.config() is called early if needed
// Alternatively, just call dotenv.config() directly in server.ts or app.ts 