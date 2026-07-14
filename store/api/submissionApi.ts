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
  tagTypes: ['Submission'],
  endpoints: (builder) => ({
    submitAbstract: builder.mutation({
      query: (submissionData) => ({
        url: '/submission',
        method: 'POST',
        body: submissionData,
      }),
      invalidatesTags: ['Submission'],
    }),
    saveDraft: builder.mutation({
      query: (draftData) => ({
        url: '/submission/save-draft',
        method: 'POST',
        body: draftData,
      }),
      invalidatesTags: ['Submission'],
    }),
    getSubmission: builder.query({
      query: (id) => `/submission/${id}`,
      providesTags: (result, error, id) => [{ type: 'Submission', id }],
    }),
    getAllSubmissions: builder.query({
      query: (status) => ({
        url: '/submission',
        params: status ? { status } : undefined,
      }),
      providesTags: ['Submission'],
    }),
    deleteSubmission: builder.mutation({
      query: (id) => ({
        url: `/submission/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Submission'],
    }),
    updateSubmission: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/submission/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Submission', id }, 'Submission'],
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
