'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetSubmissionQuery } from '@/store/api/submissionApi';
import { useToastErrorHandler } from '@/lib/hooks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SubmissionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const { data: submission, isLoading, error } = useGetSubmissionQuery(id);

  useToastErrorHandler(error, 'Failed to load submission');

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
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/submissions')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
            >
              ← Back to Submissions
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{sub.journal}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sub.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : sub.status === 'submitted'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
            </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Abstract Information</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-medium">Journal:</span> {sub.journal}
                </div>
                <div>
                  <span className="font-medium">Presentation Type:</span> {sub.presentationType}
                </div>
                <div>
                  <span className="font-medium">Research Area:</span> {sub.researchArea}
                </div>
                <div>
                  <span className="font-medium">Year:</span> {sub.year}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {sub.duration}
                </div>
                <div>
                  <span className="font-medium">Keywords:</span> {sub.keywords}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Presenter Details</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-medium">Name:</span> {sub.presenter?.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {sub.presenter?.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {sub.presenter?.phone}
                </div>
                <div>
                  <span className="font-medium">Institution:</span> {sub.presenter?.institution}
                </div>
                <div>
                  <span className="font-medium">Department:</span> {sub.presenter?.department}
                </div>
                <div>
                  <span className="font-medium">Country:</span> {sub.presenter?.country}
                </div>
                {sub.presenter?.orcid && (
                  <div>
                    <span className="font-medium">ORCID:</span> {sub.presenter.orcid}
                  </div>
                )}
              </div>
            </div>

            {sub.coAuthors && sub.coAuthors.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Co-Authors</h2>
                <div className="space-y-3">
                  {sub.coAuthors.map((author: any, index: number) => (
                    <div key={author.id || index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-gray-700">
                        <div>
                          <span className="font-medium">Name:</span> {author.name}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {author.email}
                        </div>
                        <div>
                          <span className="font-medium">Institution:</span> {author.institution}
                        </div>
                        <div>
                          <span className="font-medium">Country:</span> {author.country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Abstract</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {sub.abstract}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Biography</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {sub.biography}
              </p>
            </div>

            {sub.files && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Uploaded Files</h2>
                <div className="space-y-2">
                  {sub.files.abstract && (
                    <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                      <span className="font-medium">Abstract File:</span> {sub.files.abstract.name}
                    </div>
                  )}
                  {sub.files.fullPaper && (
                    <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                      <span className="font-medium">Full Paper:</span> {sub.files.fullPaper.name}
                    </div>
                  )}
                  {sub.files.supplementary && (
                    <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                      <span className="font-medium">Supplementary:</span> {sub.files.supplementary.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Consent Declarations</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className={sub.consentToPublish ? 'text-green-600' : 'text-red-600'}>
                    {sub.consentToPublish ? '✓' : '✗'}
                  </span>
                  <span>Consent to Publish</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className={sub.consentToDataProcessing ? 'text-green-600' : 'text-red-600'}>
                    {sub.consentToDataProcessing ? '✓' : '✗'}
                  </span>
                  <span>Consent to Data Processing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className={sub.confirmAvailability ? 'text-green-600' : 'text-red-600'}>
                    {sub.confirmAvailability ? '✓' : '✗'}
                  </span>
                  <span>Confirm Availability</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>Created: {new Date(sub.createdAt|| '').toLocaleString()}</p>
              <p>Updated: {new Date(sub.updatedAt|| '').toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}
