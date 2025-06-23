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
import SubmittedWork from "./SubmittedWork"; // ✅ Completed/Submitted Works
import UnsubmittedWorks from "./UnsubmittedWorks"; // ✅ Newly added

const JobSeekerDashboard = () => {
  const dispatch = useDispatch();
  const { list: jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState("available");

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

  // --- Tab Content Renderer ---
  const renderTabContent = () => {
    if (activeTab === "available") {
      if (loading) return <p className="text-gray-600">Loading jobs...</p>;
      if (error) return <p className="text-red-600">Error: {error}</p>;

      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Jobs
          </h2>
          <JobList jobs={jobs} onApplyClick={setSelectedJob} />
        </div>
      );
    }

    if (activeTab === "applied") {
      return <JobSeekerApplication />;
    }

    if (activeTab === "submitted") {
      return <UnsubmittedWorks />; // ✅ Only works that haven't been submitted yet
    }

    if (activeTab === "completed") {
      return <SubmittedWork />; // ✅ Submitted/completed works
    }
    if (activeTab === "submitted") {
      return <UnsubmittedWorks />;
    }

    if (activeTab === "completed") {
      return <SubmittedWork />;
    }

    return null;
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

        {/* Toggle Tabs */}
        <div className="flex space-x-6 border-b mb-6">
          <button
            className={`pb-2 px-3 text-sm font-medium ${
              activeTab === "available"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Jobs
          </button>
          <button
            className={`pb-2 px-3 text-sm font-medium ${
              activeTab === "applied"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("applied")}
          >
            Applied Jobs
          </button>
          
         
          <button
            className={`pb-2 px-3 text-sm font-medium ${
              activeTab === "submitted"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("submitted")}
          >
            Works to Submit
          </button>

          <button
            className={`pb-2 px-3 text-sm font-medium ${
              activeTab === "completed"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Works
          </button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Quotation Modal */}
        <Modal
          isOpen={selectedJob !== null}
          onClose={() => setSelectedJob(null)}
        >
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
