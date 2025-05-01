import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

router.route('/')
  .get(asyncHandler(getProjects))
  .post(asyncHandler(createProject));

router.route('/:id')
  .get(asyncHandler(getProjectById))
  .put(asyncHandler(updateProject))
  .delete(asyncHandler(deleteProject));

export default router;