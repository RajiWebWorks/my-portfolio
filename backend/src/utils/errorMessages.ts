// Centralize error messages for consistency

export const ErrorMessages = {
  // General
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_FOUND: (resource: string = 'Resource') => `${resource} not found`,
  INVALID_ID: 'Invalid ID format',
  VALIDATION_FAILED: 'Input validation failed',

  // Project specific
  PROJECT_CREATION_FAILED: 'Failed to create project',
  PROJECT_UPDATE_FAILED: 'Failed to update project',
  PROJECT_DELETE_FAILED: 'Failed to delete project',

  // Contact specific
  CONTACT_SUBMISSION_FAILED: 'Failed to submit contact message',
}; 