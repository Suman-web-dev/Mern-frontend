import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// • Base URL for backend API
// • Uses environment variable for dev/prod switching
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// • API slice handles backend submission endpoints
// • Uses Redux Toolkit Query for auto caching, loading states, error handling
export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  
  // • Configures how all API calls are made
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // • Sets JSON content type
      headers.set('Content-Type', 'application/json');
      
      // • Adds auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  // • Defines all API endpoints
  // • Mutations: data changes (POST, PUT, DELETE)
  // • Queries: data fetching (GET)
  endpoints: (builder) => ({
    // • POST /api/submission - Submit new abstract
    submitAbstract: builder.mutation({
      query: (submissionData) => ({
        url: '/submission',
        method: 'POST',
        body: submissionData,
      }),
    }),
    
    // • POST /api/submission/save-draft - Save draft
    saveDraft: builder.mutation({
      query: (draftData) => ({
        url: '/submission/save-draft',
        method: 'POST',
        body: draftData,
      }),
    }),
    
    // • GET /api/submission/:id - Fetch single submission
    getSubmission: builder.query({
      query: (id) => `/submission/${id}`,
    }),
    
    // • PUT /api/submission/:id - Update existing submission
    updateSubmission: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/submission/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

// • React hooks for API calls
// • Auto-handles loading, error, and data states
export const {
  useSubmitAbstractMutation,
  useSaveDraftMutation,
  useGetSubmissionQuery,
  useUpdateSubmissionMutation,
} = submissionApi;
