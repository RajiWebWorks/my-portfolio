import { Request, Response, NextFunction } from 'express';
import Contact from '@/models/Contact';
import { ErrorMessages } from '@/utils/errorMessages';
import mongoose from 'mongoose';

// @desc    Submit contact form message
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, message } = req.body;

  // Basic check (although validation middleware should handle this)
  if (!name || !email || !message) {
    // This check is likely redundant if validation middleware is used properly
    res.status(400).json({ success: false, error: 'Please provide name, email, and message' });
    return;
  }

  const newContactMessage = await Contact.create({ name, email, message });

  // Optional: Send an email notification here using a service like SendGrid/Nodemailer
  // try {
  //   await sendEmailNotification(newContactMessage);
  // } catch (emailError) {
  //   console.error('Failed to send contact notification email:', emailError);
  //   // Decide if you want to fail the request if email fails, or just log it.
  // }

  res.status(201).json({ success: true, message: 'Message received successfully!', data: newContactMessage });
};

// --- Optional Admin Routes (Add Authentication/Authorization) ---

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getAllContactMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Add pagination later if needed
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: messages.length, data: messages });
};

// @desc    Delete a contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const messageId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ success: false, error: ErrorMessages.INVALID_ID });
    return;
  }

  const message = await Contact.findById(messageId);
  if (!message) {
    res.status(404).json({ success: false, error: ErrorMessages.NOT_FOUND('Contact message') });
    return;
  }
  await message.deleteOne();
  res.status(200).json({ success: true, data: {} });
}; 