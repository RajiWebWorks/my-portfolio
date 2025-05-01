import express from 'express';
import {
  submitContactForm,
  getAllContactMessages,
  deleteContactMessage,
} from '@/controllers/contactController';

import { contactValidationRules, handleValidationErrors } from '@/middleware/validationMiddleware';
import asyncHandler from '@/middleware/asyncHandler';

const router = express.Router();

// Public route to submit form
router.route('/')
  .post(contactValidationRules, handleValidationErrors, asyncHandler(submitContactForm));

// --- Optional Admin Routes --- 
// Example: Protect routes for getting/deleting messages
// router.route('/')
//   .get(protect, admin, asyncHandler(getAllContactMessages));
//
// router.route('/:id')
//   .delete(protect, admin, asyncHandler(deleteContactMessage));
// --- Remove or implement protection for these if keeping --- 
router.route('/')
  .get(asyncHandler(getAllContactMessages)); // Public for now
router.route('/:id')
  .delete(asyncHandler(deleteContactMessage)); // Public for now

export default router;
