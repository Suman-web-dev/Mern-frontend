'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllSubmissionsQuery } from '@/store/api/submissionApi';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SubmissionsPage() {
  const router = useRouter();
  const { data: submissions, isLoading, error } = useGetAllSubmissionsQuery(undefined);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      // Use setTimeout to avoid calling toast during render
      setTimeout(() => {
        toast.error('Failed to load submissions');
      }, 0);
    }
  }, [error]);

  const handleView = (id: string) => {
    router.push(`/submissions/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/submissions/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading submissions...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">My Submissions</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium w-full sm:w-auto"
          >
            Create New Submission
          </button>
        </div>

        {submissions?.data && submissions.data.length > 0 ? (
          <div className="grid gap-4 sm:gap-6">
            {submissions.data.map((submission: any) => (
              <div key={submission._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {submission.journal}
                      </h2>
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : submission.status === 'submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1 text-sm sm:text-base">
                      <span className="font-medium">Presenter:</span> {submission.presenter?.name}
                    </p>
                    <p className="text-gray-600 mb-1 text-sm sm:text-base">
                      <span className="font-medium">Email:</span> {submission.presenter?.email}
                    </p>
                    <p className="text-gray-600 mb-1 text-sm sm:text-base">
                      <span className="font-medium">Research Area:</span> {submission.researchArea}
                    </p>
                    <p className="text-gray-600 mb-1 text-sm sm:text-base">
                      <span className="font-medium">Presentation Type:</span> {submission.presentationType}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Created: {new Date(submission.createdAt|| '').toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleView(submission._id)}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm sm:text-base"
                    >
                      View
                    </button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">No submissions yet</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Start by creating your first abstract submission</p>
            <button
              onClick={() => router.push('/')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium w-full sm:w-auto"
            >
              Create Submission
            </button>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </main>
  );
}
