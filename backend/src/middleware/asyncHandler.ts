import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define the type for an async controller function, ensuring void promise return
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Wraps an async route handler function to automatically catch errors
 * and pass them to the Express error handling middleware (next(error)).
 * @param fn The async route handler function to wrap.
 * @returns A standard Express RequestHandler.
 */
const asyncHandler = (fn: AsyncRequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler; 