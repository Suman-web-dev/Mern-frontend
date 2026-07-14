import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API slice handles backend submission endpoints
export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitAbstract: builder.mutation({
      query: (submissionData) => ({
        url: '/submission',
        method: 'POST',
        body: submissionData,
      }),
    }),
    saveDraft: builder.mutation({
      query: (draftData) => ({
        url: '/submission/save-draft',
        method: 'POST',
        body: draftData,
      }),
    }),
    getSubmission: builder.query({
      query: (id) => `/submission/${id}`,
    }),
    getAllSubmissions: builder.query({
      query: (status) => ({
        url: '/submission',
        params: status ? { status } : undefined,
      }),
    }),
    deleteSubmission: builder.mutation({
      query: (id) => ({
        url: `/submission/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSubmission: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/submission/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useSubmitAbstractMutation,
  useSaveDraftMutation,
  useGetSubmissionQuery,
  useGetAllSubmissionsQuery,
  useDeleteSubmissionMutation,
  useUpdateSubmissionMutation,
} = submissionApi;
