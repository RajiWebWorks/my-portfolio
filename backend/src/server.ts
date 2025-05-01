import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT not in .env

// Improved CORS configuration
app.use(cors({
  // Define the allowed origins
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = ['http://localhost:3000', 'https://my-portfolio-gules-theta-99.vercel.app'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
}));

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();
    
    // Start the HTTP server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server or connect to database:', error);
    process.exit(1); // Exit process with failure code
  }
};

startServer();