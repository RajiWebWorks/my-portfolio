import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
import projectReducer from './slices/projectSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here:
    projects: projectReducer,
    contact: contactReducer,
    // Example placeholder reducer if you don't have slices yet
    // placeholder: (state = {}) => state,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { projects: ProjectsState, contact: ContactState } // Updated type inference
export type AppDispatch = typeof store.dispatch; 