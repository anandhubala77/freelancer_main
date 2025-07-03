import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPayments } from "../store/slices/adminPaymentSlice";
import { FaEye, FaTrash, FaUndo } from "react-icons/fa";

const PaymentLogs = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector(
    (state) => state.adminPayments
  );

  useEffect(() => {
    dispatch(fetchAdminPayments());
  }, [dispatch]);

  return (
    <div className="w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Payment Logs
      </h1>

      {loading && <p className="text-blue-500">Loading payments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && payments?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-2 sm:p-4 md:p-6 overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="py-2 px-2 sm:py-3 sm:px-4">Date</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Amount</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Status</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Sender</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Receiver</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Project</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(payment.paidAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold text-blue-700">
                    ₹{payment.amount}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span className="block">{payment.paidBy?.name}</span>
                    <span className="block text-xs text-gray-500 break-all">
                      {payment.paidBy?.email}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span className="block">{payment.paidTo?.name}</span>
                    <span className="block text-xs text-gray-500 break-all">
                      {payment.paidTo?.email}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {payment.jobId?.title || "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 flex flex-wrap gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs sm:text-sm transition-colors">
                      <FaEye /> View
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs sm:text-sm transition-colors">
                      <FaTrash /> Delete
                    </button>
                    {payment.status === "completed" && (
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs sm:text-sm transition-colors">
                        <FaUndo /> Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && payments.length === 0 && (
        <p className="text-gray-500 mt-4">No payments found.</p>
      )}
    </div>
  );
};

export default PaymentLogs;
