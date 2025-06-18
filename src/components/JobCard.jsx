import React from "react";
import { Trash2, Pencil, UserPlus } from "lucide-react";
import Button from "./Button";

const JobCard = ({ job, onEdit, onDelete, onHire, status }) => {
  const handleHireJobSeeker = () => {
  if (job._id && job.freelancer && job.freelancer._id) {
    onHire(job._id, job.freelancer._id);
  } else {
    console.error("Missing job ID or freelancer ID", job);
  }
};
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col justify-between h-full">
      {/* Job Info Section */}
      <div>
        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
          {job.description}
        </p>
        <p className="text-blue-600 text-sm font-medium">
          Budget: ${job.budget}
        </p>
        <p className="text-xs text-gray-500 mt-1">Status: {job.status}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
        {/* Edit/Delete */}
        <div className="flex gap-2">
          <Button
            onClick={onEdit}
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 text-sm flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>

          <Button
            onClick={onDelete}
            className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 text-sm flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>

        {/* Hire Button (only for 'posted' jobs) */}
        {status === "posted" ? (
          <Button
             onClick={() => handleHireJobSeeker(job._id)}
            className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 text-sm flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Hire
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default JobCard;
