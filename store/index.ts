import { configureStore } from '@reduxjs/toolkit';
import { submissionApi } from './api/submissionApi';
import submissionReducer from './slices/submissionSlice';

// Main Redux store configuration
// • Holds all application state
// • Combines API slice (server data) and submission slice (form state)
export const store = configureStore({
  reducer: {
    // • API slice: handles backend server communication
    [submissionApi.reducerPath]: submissionApi.reducer,
    
    // • Submission slice: manages form data and UI state locally
    submission: submissionReducer,
  },
  
  // • Adds API middleware for automatic async API call handling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(submissionApi.middleware),
});

// TypeScript type definitions
// • RootState: type of entire state object
// • AppDispatch: type of dispatch function
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
