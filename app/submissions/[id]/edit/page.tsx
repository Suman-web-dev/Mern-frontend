'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetSubmissionQuery, useUpdateSubmissionMutation } from '@/store/api/submissionApi';
import { toast } from 'sonner';

export default function EditSubmissionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const { data: submission, isLoading, error } = useGetSubmissionQuery(id);
  const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();

  useEffect(() => {
    if (error) {
      // Use setTimeout to avoid calling toast during render
      setTimeout(() => {
        toast.error('Failed to load submission');
      }, 0);
    }
  }, [error]);

  const handleUpdate = async () => {
    try {
      // For now, redirect to view page with a message
      // In a full implementation, this would be a form to edit the submission
      toast.info('Edit functionality will be implemented with the form component');
      router.push(`/submissions/${id}`);
    } catch (err) {
      toast.error('Failed to update submission');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading submission...</div>
      </div>
    );
  }

  if (!submission?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Submission not found</div>
      </div>
    );
  }

  const sub = submission.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.push(`/submissions/${id}`)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
          >
            ← Back to Submission
          </button>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
          >
            {isUpdating ? 'Updating...' : 'Update Submission'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Submission</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Edit Mode Coming Soon
            </h2>
            <p className="text-yellow-700">
              The full edit functionality will be integrated with the submission form component. 
              For now, you can view the submission details and delete if needed.
            </p>
            <div className="mt-4">
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Create New Submission
              </button>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <span className="font-medium">Journal:</span> {sub.journal}
            </div>
            <div>
              <span className="font-medium">Presenter:</span> {sub.presenter?.name}
            </div>
            <div>
              <span className="font-medium">Status:</span> {sub.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
