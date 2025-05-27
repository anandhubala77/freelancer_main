import React from 'react';
import Button from './Button';

const JobCard = ({ job, onQuote, onEdit, onDelete, onHire, status = 'posted' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-blueeclipse-700">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-blueeclipse-700">{job.title}</h3>
          <p className="text-sm sm:text-base text-blueeclipse-700">{job.category}</p>
          <p className="text-sm sm:text-base text-blueeclipse-700">Budget: ${job.budget}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
          {onEdit && (
            <Button onClick={onEdit} variant="secondary" className="w-full sm:w-auto">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={onDelete} variant="danger" className="w-full sm:w-auto">
              Delete
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm sm:text-base text-stormy-700">{job.description}</p>
      </div>

      {status === 'posted' && (
        <div className="mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {onQuote && (
              <Button onClick={onQuote} variant="primary" className="w-full sm:w-auto">
                View Quotes
              </Button>
            )}
            {onHire && (
              <Button onClick={() => onHire(job.id)} variant="success" className="w-full sm:w-auto">
                Hire Freelancer
              </Button>
            )}
          </div>
        </div>
      )}

      {status === 'active' && (
        <div className="mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-sm sm:text-base text-blueeclipse-700">Assigned to: {job.assignedTo?.name}</p>
            <p className="text-sm sm:text-base text-blueeclipse-700">Progress: {job.progress}%</p>
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div className="mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-green-600">Project Completed</p>
            <p className="text-sm sm:text-base text-blueeclipse-700">Completed on: {job.completionDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
