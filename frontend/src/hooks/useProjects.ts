'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
// Assuming you have these actions and selectors:
// import { fetchProjects } from '@/lib/redux/actions/projectActions';
// import {
//   selectAllProjects,
//   selectProjectsLoading,
//   selectProjectsError,
// } from '@/lib/redux/slices/projectSlice';

export const useProjects = () => {
  const dispatch: AppDispatch = useDispatch();

  // --- Dummy data and state if not using Redux ---
  const isLoading = false;
  const error = null;
  const projects = [
    { id: 1, title: 'Dummy Project 1', description: '...', imageUrl: '', tags: [] },
    { id: 2, title: 'Dummy Project 2', description: '...', imageUrl: '', tags: [] },
  ];
  // ---------------------------------------------

  // --- Uncomment below if using Redux --- 
  // const projects = useSelector(selectAllProjects);
  // const isLoading = useSelector(selectProjectsLoading);
  // const error = useSelector(selectProjectsError);
  //
  // useEffect(() => {
  //   // Example: Fetch projects only if they haven't been loaded yet
  //   if (projects.length === 0 && !isLoading) {
  //     // dispatch(fetchProjects());
  //     console.log('Dispatching fetchProjects (if implemented)');
  //   }
  // }, [dispatch, projects.length, isLoading]);
  // -------------------------------------

  return { projects, isLoading, error };
}; 