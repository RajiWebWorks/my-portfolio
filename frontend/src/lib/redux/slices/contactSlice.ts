import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ContactState['status']>) => {
      state.status = action.payload;
      if (action.payload !== 'failed') {
        state.error = null; // Clear error on non-failed statuses
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    resetContactState: () => initialState, // Reset to initial state
  },
  // Example for handling async form submission with extraReducers
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(submitContactForm.pending, (state) => {
  //       state.status = 'loading';
  //       state.error = null;
  //     })
  //     .addCase(submitContactForm.fulfilled, (state) => {
  //       state.status = 'succeeded';
  //     })
  //     .addCase(submitContactForm.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message || 'Failed to submit form';
  //     });
  // },
});

export const { setStatus, setError, resetContactState } = contactSlice.actions;

// Selectors
export const selectContactStatus = (state: RootState) => state.contact.status;
export const selectContactError = (state: RootState) => state.contact.error;

export default contactSlice.reducer; 