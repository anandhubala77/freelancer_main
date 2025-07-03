import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaSearch,
  FaFilter,
  FaSortUp,
  FaCheck,
  FaTrash,
} from 'react-icons/fa';
import { fetchFraudReports } from '../store/slices/adminFraudSlice';

const FraudReports = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.adminFraud);

  useEffect(() => {
    dispatch(fetchFraudReports());
  }, [dispatch]);

  return (
    <div className="w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Fraud Reports</h1>

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

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow p-2 sm:p-4 overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm text-left">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-4">Reported ID</th>
              <th className="p-4">Reported By</th>
              <th className="p-4">Type</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4" colSpan="6">Loading...</td></tr>
            ) : error ? (
              <tr><td className="p-4 text-red-500" colSpan="6">{error}</td></tr>
            ) : reports.length === 0 ? (
              <tr><td className="p-4 text-gray-500" colSpan="6">No reports found.</td></tr>
            ) : (
              reports.map((report, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 break-all text-xs text-gray-800">{report._id}</td>
                  <td className="p-4 break-all text-xs text-gray-800">{report.reportedBy}</td>
                  <td className="p-4 text-xs font-medium">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      report.type === 'project'
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 max-w-[200px] break-words text-xs">{report.reason}</td>
                  <td className="p-4 text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="text-green-500 hover:text-green-600"
                        title="Mark as Resolved"
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FraudReports;