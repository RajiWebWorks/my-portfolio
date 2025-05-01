'use client';

import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { ContactFormData } from '@/types/Contact'; // Assuming Contact type exists
// Assuming you have these actions and selectors:
// import { submitContactForm } from '@/lib/redux/actions/contactActions';
// import {
//   selectContactStatus,
//   selectContactError,
//   resetContactState,
// } from '@/lib/redux/slices/contactSlice';

export const useContact = () => {
  const dispatch: AppDispatch = useDispatch();

  // --- Local state if not using Redux for form status ---
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  // ---------------------------------------------------

  // --- Uncomment below if using Redux --- 
  // const status = useSelector(selectContactStatus);
  // const error = useSelector(selectContactError);
  // ------------------------------------

  const submitForm = useCallback(async (formData: ContactFormData) => {
    // --- Local state handling ---
    setStatus('loading');
    setError(null);
    try {
      console.log('Submitting form data (local state):', formData);
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async
      // if (error) throw new Error("Simulated error");
      setStatus('succeeded');
    } catch (err: any) {
      setStatus('failed');
      setError(err.message || 'An unknown error occurred');
    }
    // ------------------------

    // --- Redux dispatch handling ---
    // dispatch(submitContactForm(formData));
    // -----------------------------

  }, []); // Add dependencies if needed, e.g., [dispatch] for Redux

  const resetStatus = useCallback(() => {
    // --- Local state handling ---
    setStatus('idle');
    setError(null);
    // ------------------------

    // --- Redux dispatch handling ---
    // dispatch(resetContactState());
    // -----------------------------
  }, []); // Add dependencies if needed, e.g., [dispatch] for Redux

  return { submitForm, status, error, resetStatus };
}; 