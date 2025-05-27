import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import JobPostingForm from '../components/JobPostingForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import UserLayout from '../layout/UserLayout';

const HiringPersonDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('posted');
  const [selectedJob, setSelectedJob] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handlePostJob = (jobData) => {
    setJobs(prev => [...prev, jobData]);
    setIsPosting(false);
    setEditingJob(null);
  };

  const handleEditJob = (jobData) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobData.id ? jobData : job
      )
    );
    setIsPosting(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleHireJobSeeker = (jobId, freelancerId) => {
    // TODO: Implement hiring logic
    console.log('Hiring freelancer:', freelancerId, 'for job:', jobId);
  };

  const handleMakePayment = (jobId, amount) => {
    // TODO: Implement payment logic
    setPaymentHistory(prev => [...prev, {
      jobId,
      amount,
      date: new Date().toISOString(),
      status: 'pending'
    }]);
  };

  const jobTabs = [
    { id: 'posted', label: 'Posted Jobs' },
    { id: 'active', label: 'Active Projects' },
    { id: 'completed', label: 'Completed Projects' },
    { id: 'payments', label: 'Payment History' }
  ];

  return (
    <UserLayout userRole="hiring">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold">Hiring Dashboard</h1>
            </div>
            <Button onClick={() => setIsPosting(true)} variant="primary">
              Post New Job
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-md rounded-lg mb-6 sm:mb-8">
          <div className="border-b">
            <nav className="-mb-px flex flex-wrap" aria-label="Tabs">
              {jobTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          {activeTab === 'posted' && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Posted Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {jobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={() => {
                      setEditingJob(job);
                      setIsPosting(true);
                    }}
                    onDelete={() => handleDeleteJob(job.id)}
                    onHire={(freelancerId) => handleHireJobSeeker(job.id, freelancerId)}
                    status="posted"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Active Projects</h2>
              {jobs.filter(job => job.status === 'active').map(job => (
                <div key={job.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600">Status: Active</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          onClick={() => setSelectedJob(job)}
                          variant="secondary"
                          className="w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => handleMakePayment(job.id, job.budget)}
                          variant="primary"
                          className="w-full sm:w-auto"
                        >
                          Make Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Completed Projects</h2>
              {jobs.filter(job => job.status === 'completed').map(job => (
                <div key={job.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600">Status: Completed</p>
                      <p className="text-sm text-gray-600">Completion Date: {job.completionDate}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Button
                        onClick={() => setSelectedJob(job)}
                        variant="secondary"
                        className="w-full sm:w-auto"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Payment History</h2>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Payment #{index + 1}</h3>
                        <p className="text-sm text-gray-600">Amount: ${payment.amount}</p>
                        <p className="text-sm text-gray-600">Date: {new Date(payment.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Status: {payment.status}</p>
                      </div>
                      <div className="text-sm text-gray-600 mt-4 sm:mt-0">
                        Job ID: {payment.jobId}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <Modal isOpen={isPosting} onClose={() => setIsPosting(false)}>
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              {editingJob ? 'Edit Job' : 'Post New Job'}
            </h2>
            <JobPostingForm
              onSubmit={editingJob ? handleEditJob : handlePostJob}
              job={editingJob}
            />
          </div>
        </Modal>

        <Modal isOpen={selectedJob !== null} onClose={() => setSelectedJob(null)}>
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{selectedJob?.title}</h3>
                <p className="text-sm text-gray-600">{selectedJob?.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget: ${selectedJob?.budget}</p>
                <p className="text-sm text-gray-600">Status: {selectedJob?.status}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </UserLayout>
  );
};

export default HiringPersonDashboard;
