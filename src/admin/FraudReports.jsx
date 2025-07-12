import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaFilter, FaSortUp } from "react-icons/fa";
import {
  fetchFraudReports,
  sendReportResponse,
  clearResponseStatus,
} from "../store/slices/adminFraudSlice";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const FraudReports = () => {
  const dispatch = useDispatch();
  const { reports, loading, error, responseLoading } = useSelector(
    (state) => state.adminFraud
  );

  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    dispatch(fetchFraudReports());
  }, [dispatch]);

  const openResponseModal = (report) => {
    setSelectedReport(report);
    setResponseText(report.responseMessage || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
    setResponseText("");
  };

  const handleSendResponse = async () => {
    if (responseText.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    try {
      await dispatch(
        sendReportResponse({
          reportType: selectedReport.type,
          reportId: selectedReport.reportId,
          responseMessage: responseText,
        })
      ).unwrap();

      toast.success("Response sent successfully.");
      dispatch(clearResponseStatus());
      closeModal();
    } catch (err) {
      toast.error("Failed to send response.");
    }
  };

  return (
    <div className="w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Fraud Reports
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center">
            <FaFilter className="mr-2" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center">
            <FaSortUp className="mr-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full text-xs sm:text-sm text-left">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-4">Report ID</th>
              <th className="p-4">Reported By</th>
              <th className="p-4">Type</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan="6">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-4 text-red-500" colSpan="6">
                  {error}
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan="6">
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((report, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 break-all text-xs text-gray-800">
                    {report.reportId}
                  </td>
                  <td className="p-4 break-all text-xs text-gray-800">
                    {report.reportedBy}
                  </td>
                  <td className="p-4 text-xs font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        report.type === "project"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 max-w-[200px] break-words text-xs">
                    {report.reason || "—"}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex flex-col sm:flex-row gap-2">
                    {!!report.responseMessage ? (
                      <div className="flex flex-col text-xs text-green-700">
                        <span className="font-semibold text-green-800">
                          ✅ Response already sent
                        </span>
                        <span className="italic text-gray-800 mt-1">
                          {report.responseMessage}
                        </span>
                        {report.responseAt && (
                          <span className="text-gray-500 text-xs mt-1">
                            Responded on{" "}
                            {new Date(report.responseAt).toLocaleString()}
                          </span>
                        )}
                        <button
                          onClick={() => openResponseModal(report)}
                          className="mt-1 text-blue-600 hover:underline text-xs"
                        >
                          Edit Response
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => openResponseModal(report)}
                        className="text-blue-600 text-xs hover:underline"
                      >
                        Respond
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Respond to Fraud Report
          </h2>
          <p className="text-sm text-gray-600">
            <strong>To:</strong> {selectedReport?.reportedBy} ({selectedReport?.type})
          </p>
          <textarea
            rows="4"
            className="w-full p-2 border rounded text-sm"
            placeholder="Type your response message here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendResponse}
              disabled={responseLoading}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {responseLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FraudReports;
