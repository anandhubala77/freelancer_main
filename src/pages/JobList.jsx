import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { reportProject } from "../store/slices/projectSlice";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {job.image && (
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-3">{job.description}</p>

              <p className="text-sm text-gray-700">
                <strong>Budget:</strong> ₹{job.budget}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Timeline:</strong> {job.timeline || "Not specified"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {job.location || "Remote"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Skills:</strong>{" "}
                {Array.isArray(job.skillsRequired)
                  ? job.skillsRequired.join(", ")
                  : job.skillsRequired}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted on:{" "}
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => onApplyClick(job)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply
              </Button>
              <Button
                onClick={() => handleReportClick(job)}
                className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                Report
              </Button>
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
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmitReport}
            >
              Submit Report
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JobList;
