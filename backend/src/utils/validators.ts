// backend/src/utils/validators.ts

import { body } from 'express-validator';

// Utility function (if needed elsewhere, though not used by current validators)
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Allow empty URLs (optional fields)
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

// Validation rules for Contact Form
export const validateContactSubmission = [
  body('name', 'Name is required').not().isEmpty().trim().escape(),
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('message', 'Message is required').not().isEmpty().trim().escape(),
];

// Validation rules for Project Creation/Update
export const validateProject = [
  // Title and Description are required
  body('title', 'Project title is required')
    .not().isEmpty({ ignore_whitespace: true }) // Don't allow just spaces
    .trim()
    .escape(),
  body('description', 'Project description is required')
    .not().isEmpty({ ignore_whitespace: true }) // Don't allow just spaces
    .trim(),

  // imageUrl is optional, but if provided, should not be empty after trimming. Allows relative paths.
  body('imageUrl')
    .optional()
    .trim()
    .not().isEmpty({ ignore_whitespace: true }).withMessage('Image URL cannot be empty if provided'),

  // demoUrl is optional, but if provided, must be a valid http/https URL
  body('demoUrl')
    .optional({ checkFalsy: true }) // Treat empty strings as absent
    .isURL({ protocols: ['http', 'https'], require_protocol: true, require_valid_protocol: true })
    .withMessage('Demo URL must be a valid URL starting with http:// or https://')
    .trim(),

  // codeUrl is optional, but if provided, must be a valid http/https URL
  body('codeUrl')
    .optional({ checkFalsy: true }) // Treat empty strings as absent
    .isURL({ protocols: ['http', 'https'], require_protocol: true, require_valid_protocol: true })
    .withMessage('Code URL must be a valid URL starting with http:// or https://')
    .trim(),

  // Add validation for other fields like 'tags' if you implement them later
];