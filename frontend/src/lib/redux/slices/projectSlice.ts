import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Project } from '@/types/Project'; // Assuming Project type exists

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Add other reducers like addProject, updateProject, deleteProject if needed
  },
  // Example for handling async actions with extraReducers (using createAsyncThunk)
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProjects.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
  //       state.items = action.payload;
  //       state.loading = false;
  //     })
  //     .addCase(fetchProjects.rejected, (state, action) => {
  //       state.error = action.error.message || 'Failed to fetch projects';
  //       state.loading = false;
  //     });
  // },
});

export const { setProjects, setLoading, setError } = projectSlice.actions;

// Selector
export const selectAllProjects = (state: RootState) => state.projects.items;
export const selectProjectsLoading = (state: RootState) => state.projects.loading;
export const selectProjectsError = (state: RootState) => state.projects.error;

export default projectSlice.reducer; 