import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReceivedPayments } from "../store/slices/paymentSlice";

const ReceivedPayments = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { receivedPayments, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    if (user?._id) {
      dispatch(getReceivedPayments(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">💰 Received Payments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : receivedPayments.length === 0 ? (
        <p>No payments received yet.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Payment ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Project</th>
              <th className="p-2">Client</th>
            </tr>
          </thead>
          <tbody>
            {receivedPayments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-2">{payment.razorpayPaymentId}</td>
                <td className="p-2">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
                <td className="p-2">₹{payment.amount}</td>
                <td className="p-2">{payment.jobId?.title || "N/A"}</td>
                <td className="p-2">{payment.paidBy?.name || "Client"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReceivedPayments;
