import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import projectRoutes from '@/routes/projectRoutes'; // <-- This uses the alias
import contactRoutes from '@/routes/contactRoutes'; // <-- This uses the alias

// Import middleware
import { errorHandler } from '@/middleware/errorHandler'; // <-- This uses the alias

// Load environment variables (optional here, often done in server.ts, but can be early)
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({ // Configure CORS options as needed
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow frontend origin
  // credentials: true, // If you need to handle cookies/sessions
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic Route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Portfolio Backend API Running!');
});

// API Routes (Mount them here)
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Error Handling Middleware (Should be last - after all routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;