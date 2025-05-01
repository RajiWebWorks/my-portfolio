// backend/src/controllers/projectController.ts

import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project'; // Corrected path
import { ErrorMessages } from '../utils/errorMessages'; // Corrected path
import mongoose from 'mongoose';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest
  res.status(200).json({ success: true, count: projects.length, data: projects });
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const projectId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ success: false, error: ErrorMessages.INVALID_ID });
    return; // Exit function
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404).json({ success: false, error: ErrorMessages.NOT_FOUND('Project') });
    return; // Exit function
  }
  res.status(200).json({ success: true, data: project });
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Add authentication middleware later if needed)
export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Validation should have happened via middleware before this point
  const { title, description, imageUrl, demoUrl, codeUrl } = req.body;

  const project = await Project.create({
      title,
      description,
      imageUrl,
      demoUrl,
      codeUrl
      // Add other fields as necessary
  });

  res.status(201).json({ success: true, data: project });
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Add authentication middleware later if needed)
export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const projectId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ success: false, error: ErrorMessages.INVALID_ID });
    return;
  }

  let project = await Project.findById(projectId);
  if (!project) {
    res.status(404).json({ success: false, error: ErrorMessages.NOT_FOUND('Project') });
    return;
  }

  // Add authorization check here if implementing user ownership

  // Validation should happen via middleware for PUT routes too
  const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators on update
  });

  // Check if findByIdAndUpdate returned null (shouldn't happen if findById worked, but good practice)
  if (!updatedProject) {
     res.status(404).json({ success: false, error: ErrorMessages.NOT_FOUND('Project after update attempt') });
     return;
  }

  res.status(200).json({ success: true, data: updatedProject });
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Add authentication middleware later if needed)
export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const projectId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ success: false, error: ErrorMessages.INVALID_ID });
    return;
  }

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404).json({ success: false, error: ErrorMessages.NOT_FOUND('Project') });
    return;
  }

  // Add authorization check here

  await project.deleteOne(); // Use deleteOne() on the document instance

  res.status(200).json({ success: true, data: {} }); // Or status 204 (No Content)
};
