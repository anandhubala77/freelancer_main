// SentPayments.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentPayments } from "../store/slices/paymentSlice"; // create this action

const SentPayment = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sentPayments, loading, error } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchSentPayments(user._id));
    }
  }, [user, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📤 Sent Payments</h2>
      {loading ? (
        <p>Loading payments...</p>
      ) : sentPayments.length === 0 ? (
        <p>No payments made yet.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Payment ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Project</th>
              <th className="p-2">Paid To</th>
            </tr>
          </thead>
          <tbody>
            {sentPayments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-2">{payment.razorpayPaymentId}</td>
                <td className="p-2">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
                <td className="p-2">₹{payment.amount}</td>
                <td className="p-2">{payment.jobId?.title || "N/A"}</td>
                <td className="p-2">
                  {payment.paidTo?.name
                    ? `${payment.paidTo.name} ${payment.paidTo.lastName || ""}`
                    : "Freelancer"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SentPayment;
