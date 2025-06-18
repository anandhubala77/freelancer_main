// src/pages/JobList.jsx or similar file
import React from "react";
import Button from "../components/Button";

const JobList = ({ jobs, onApplyClick }) => {
  if (!jobs || jobs.length === 0) return <p>No jobs available</p>;

  return (
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
            <p className="text-sm text-gray-500">Budget: ${job.budget}</p>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="primary"
              onClick={() => onApplyClick(job)} // Trigger apply
            >
              Apply
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
