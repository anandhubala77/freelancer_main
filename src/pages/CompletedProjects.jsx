// CompletedProjects.jsx
import React from "react";
import loadRazorpayScript from "../utils/loadRazorpayScript";
import { useSelector, useDispatch } from "react-redux";
import { selectAllApplications } from "../store/slices/applicationSlice";
import {
  createPaymentOrder,
  markPaymentSuccess,
} from "../store/slices/paymentSlice";

const CompletedProjects = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectAllApplications);
  const { user } = useSelector((state) => state.auth); // Hiring person

  const handlePay = async (app) => {
    console.log("Sending payment request with:", {
      amount: app.jobId?.budget,
      jobId: app.jobId?._id,
      paidTo: app.userId?._id,
    });

    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load");

    try {
      const res = await dispatch(
        createPaymentOrder({
          amount: app.jobId?.budget || 100,
          jobId: app.jobId?._id,
          paidTo: app.userId?._id,
        })
      );

      if (!res.payload || res.error) {
        throw new Error("Failed to create Razorpay order");
      }

      const data = res.payload;

      const options = {
        key: "rzp_test_HnpMhDOhL0dI1d", // ✅ Updated with your actual Razorpay test key
        amount: data.amount,
        currency: data.currency,
        name: "Freelancer Project Payment",
        description: "Payment for completed project",
        order_id: data.orderId,
        handler: async function (response) {
          await dispatch(
            markPaymentSuccess({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              amount: data.amount / 100,
              jobId: data.jobId,
              quotationId: app._id,
              paidBy: user?._id,
              paidTo: app.userId?._id,
            })
          );
          alert("Payment Successful & Stored!");
        },
        prefill: {
          name: user?.name || "Hiring Person",
          email: user?.email || "example@freelance.com",
        },
        theme: {
          color: "#00246B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div>
      {applications
        .filter((app) => app.submission?.link)
        .map((app) => (
          <div
            key={app._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
          >
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
              <button
                onClick={() => handlePay(app)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Pay
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CompletedProjects;
