// Example: Using createAsyncThunk for fetching projects from an API
/*
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '@/types/Project';

// Assume an API function exists: e.g., import { fetchProjectsAPI } from '@/lib/api';

export const fetchProjects = createAsyncThunk<
  Project[], // Return type of the payload creator
  void,    // First argument to the payload creator (e.g., void if no args)
  { rejectValue: string } // Optional fields for defining thunkApi config
>(
  'projects/fetchProjects', // Action type string
  async (_, { rejectWithValue }) => {
    try {
      // const response = await fetchProjectsAPI();
      // return response.data; // Assuming API returns data property
      // Placeholder data:
      const placeholderData: Project[] = [
        { id: 1, title: 'Fetched Project 1', description: '...', imageUrl: '', tags: [] },
      ];
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return placeholderData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch projects');
    }
  }
);
*/

// You can define synchronous action creators here if needed, though often handled by slice reducers directly. 