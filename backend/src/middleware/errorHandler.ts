import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: number; // For Mongoose duplicate key errors
  errors?: any; // For validation errors
  path?: string; // Added for CastError
  keyValue?: { [key: string]: any }; // Added for DuplicateKeyError
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes
  console.error('ERROR:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose Bad ObjectId Error
  if (err.name === 'CastError' && err.path) {
    message = `Resource not found. Invalid field: ${err.path}`; // Use the path property
    statusCode = 404;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000 && err.keyValue) {
    // Extract field name from the error message if possible
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for: ${field}`;
    statusCode = 400;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError' && err.errors) {
    // Combine multiple validation errors into one message
    const errors = Object.values(err.errors).map((el: any) => el.message);
    message = `Invalid input data. ${errors.join('. ')}`;
    statusCode = 400;
  }

  // Express-validator error (if you format it this way)
  if (err.errors && Array.isArray(err.errors)) {
      message = `Validation failed: ${err.errors.map((e: any) => e.msg).join(', ')}`; // Added 'any' type for e
      statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    // Optionally include stack trace in development
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}; 