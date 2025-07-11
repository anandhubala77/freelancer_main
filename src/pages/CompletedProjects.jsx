import React, { useState, useEffect } from "react"; // ✅ Add useEffect
import loadRazorpayScript from "../utils/loadRazorpayScript";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllApplications,
  fetchApplicationsByHiringPerson, // ✅ Import thunk
} from "../store/slices/applicationSlice";
import {
  createPaymentOrder,
  markPaymentSuccess,
} from "../store/slices/paymentSlice";

const CompletedProjects = () => {
  const [paidApplications, setPaidApplications] = useState([]);
  const dispatch = useDispatch();
  const applications = useSelector(selectAllApplications);
  const { user } = useSelector((state) => state.auth);
  const { sentPayments } = useSelector((state) => state.payment);

  // ✅ Fetch applications for hiring person on component mount
  useEffect(() => {
    if (user?.role === "hiringperson") {
      dispatch(fetchApplicationsByHiringPerson());
    }
  }, [dispatch, user]);
  

  const handlePay = async (app) => {
    // ...
  };

  return (
    <div>
      {applications
        .filter((app) => app.submission?.link)
        .map((app) => (
          <div key={app._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold">
              {app.jobId?.title || "No Title"}
            </h3>
            <p>
              Job Seeker: {app.userId?.name || "Unknown"} | Status:{" "}
              <span className="capitalize font-semibold">{app.status}</span>
            </p>
            <p className="mb-2">Proposal: {app.message}</p>

            {/* ✅ Submission Section */}
            <div className="mt-2 bg-white p-3 border rounded">
              <p className="font-semibold text-gray-700">🔗 Submitted Work:</p>
              <p>
                Link:{" "}
                <a
                  href={app.submission.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {app.submission.link}
                </a>
              </p>
              <p className="text-sm mt-1 text-gray-800">
                Message: {app.submission.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Submitted at:{" "}
                {new Date(app.submission.submittedAt).toLocaleString()}
              </p>
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => console.log("Request Correction for", app._id)}
              >
                Request Correction
              </button>
              {sentPayments.some((p) => p.quotationId === app._id) ? (
                <button
                  disabled
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                >
                  Paid
                </button>
              ) : (
                <button
                  onClick={() => handlePay(app)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CompletedProjects;
