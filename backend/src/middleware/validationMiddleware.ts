import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

// Middleware to handle validation results
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format errors for consistent response
    const formattedErrors = errors.array().map(err => ({ field: err.type === 'field' ? err.path : undefined, message: err.msg }));
    res.status(400).json({ success: false, errors: formattedErrors });
    return; // Exit middleware after sending response
  }
  next();
};

// Example validation rules (can be defined here or in routes)
export const contactValidationRules = [
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').notEmpty().withMessage('Message is required').trim().escape(),
];

// Example project validation rules (adjust as needed)
export const projectValidationRules = [
  body('title').notEmpty().withMessage('Title is required').trim().escape(),
  body('description').notEmpty().withMessage('Description is required').trim().escape(),
  body('imageUrl').isURL().withMessage('Valid Image URL is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().isString().trim().escape(), // Validate each tag if array exists
  body('liveUrl').optional().isURL().withMessage('Valid Live URL is required'),
  body('repoUrl').optional().isURL().withMessage('Valid Repo URL is required'),
]; 