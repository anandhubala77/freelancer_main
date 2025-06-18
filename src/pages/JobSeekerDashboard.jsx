import React, { useEffect, useState } from "react";
import { QuotationForm } from "../components/QuotationForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
import UserLayout from "../layout/UserLayout";
import { UpdateProfile } from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import JobList from "./JobList";
import { fetchJobs } from "../store/slices/jobSlice";
import { submitQuotation } from "../store/slices/quotationSlice";
import { toast, ToastContainer } from "react-toastify";
import JobSeekerApplication from "./JobseekerApplication";

const JobSeekerDashboard = () => {
  const dispatch = useDispatch();
  const { list: jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  useEffect(() => {
    if (user?.role === "jobseeker") {
      dispatch(fetchJobs());
    }
  }, [dispatch, user]);

  const handleSubmitQuote = async (quoteData) => {
    try {
      await dispatch(
        submitQuotation({
          quoteData: {
            ...quoteData,
            jobId: selectedJob._id,
          },
          token: user.token,
        })
      ).unwrap();

      toast.success("Quotation submitted successfully! 🎉");
      setSelectedJob(null);
    } catch (err) {
      toast.error("Failed to submit quotation ❌");
      console.error(err);
    }
  };

  const handleOpenUpdateProfileModal = () => {
    setShowUpdateProfileModal(true);
  };

  const handleCloseUpdateProfileModal = () => {
    setShowUpdateProfileModal(false);
  };

  return (
    <UserLayout userRole="jobseeker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Jobseeker Dashboard
          </h1>
          <div className="flex space-x-4">
            <Button variant="primary">Submit New Portfolio</Button>
            <Button variant="secondary" onClick={handleOpenUpdateProfileModal}>
              Update Profile
            </Button>
          </div>
        </div>

        {/* Available Jobs */}
        {loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Available Jobs
            </h2>
            <JobList jobs={jobs} onApplyClick={setSelectedJob} />
          </div>
        )}

        {/* Applied Jobs Section */}
        <JobSeekerApplication />

        {/* Quotation Modal */}
        <Modal isOpen={selectedJob !== null} onClose={() => setSelectedJob(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Submit Quotation</h2>
            <QuotationForm
              job={selectedJob}
              onSubmit={handleSubmitQuote}
              onCancel={() => setSelectedJob(null)}
            />
          </div>
        </Modal>

        {/* Update Profile Modal */}
        <Modal
          isOpen={showUpdateProfileModal}
          onClose={handleCloseUpdateProfileModal}
        >
          <UpdateProfile onClose={handleCloseUpdateProfileModal} />
        </Modal>
      </div>

      <ToastContainer />
    </UserLayout>
  );
};

export default JobSeekerDashboard;
