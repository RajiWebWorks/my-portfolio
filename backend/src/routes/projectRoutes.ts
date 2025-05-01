// backend/src/routes/projectRoutes.ts

import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController'; // Corrected path
import asyncHandler from '../middleware/asyncHandler'; // Corrected path
import { validateProject } from '../utils/validators'; // Corrected path for project validation rules
import { handleValidationErrors } from '../middleware/validationMiddleware'; // Corrected path

// Import authentication middleware if routes need protection
// import { protect, admin } from '../middleware/authMiddleware'; // Example path

const router = express.Router();

// Public routes to get projects
router.route('/')
  .get(asyncHandler(getProjects));

router.route('/:id')
  .get(asyncHandler(getProjectById));


// Routes for creating, updating, deleting projects
// These should ideally be protected later with authentication/authorization middleware

router.route('/')
  // Apply validation middleware before the controller
  .post(validateProject, handleValidationErrors, asyncHandler(createProject));

router.route('/:id')
  // Apply validation middleware before the controller for updates too
  .put(validateProject, handleValidationErrors, asyncHandler(updateProject))
  .delete(asyncHandler(deleteProject)); // Validation not typically needed for delete by ID

export default router;