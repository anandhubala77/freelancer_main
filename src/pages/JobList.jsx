import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { reportProject } from "../store/slices/projectSlice"; // Ensure this thunk exists
import { toast } from "react-toastify";

const JobList = ({ jobs, onApplyClick }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleReportClick = (job) => {
    setSelectedJob(job);
    setReason("");
    setReportModalOpen(true);
  };

  const handleSubmitReport = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason before submitting.");
      return;
    }

    try {
      await dispatch(
        reportProject({
          projectId: selectedJob._id,
          reason,
          token: user.token,
        })
      ).unwrap();

      toast.success("Job reported successfully!");
      setReportModalOpen(false);
    } catch (err) {
      toast.error("Failed to report the job.");
    }
  };

  if (!jobs || jobs.length === 0) return <p>No jobs available</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500">Budget: ₹{job.budget}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button variant="primary" onClick={() => onApplyClick(job)}>
                Apply
              </Button>
              <button
                onClick={() => handleReportClick(job)}
                className="text-red-500 text-sm underline hover:text-red-700"
              >
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Report */}
      <Modal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">
            Report Job: {selectedJob?.title}
          </h2>
          <textarea
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter reason for reporting..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setReportModalOpen(false)}>
              Cancel
            </Button>
            <button variant="danger" onClick={handleSubmitReport}>
              Submit Report
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JobList;
