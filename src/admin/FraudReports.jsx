import React from 'react';
import {
  FaSearch as FaSearch,
  FaFilter as FaFilter,
  FaSortUp as FaSortAscending,
  FaSortDown as FaSortDescending,
  FaExclamationCircle as FaExclamationCircle,
  FaShieldAlt as FaShieldCheck,
  FaShieldVirus as FaShieldExclamation,
  FaEye as FaEye,
  FaTrash as FaTrash,
  FaBan as FaBan,
  FaCheck as FaCheck,
} from 'react-icons/fa';

const FraudReports = () => {
  const reportTypes = [
    { id: 1, name: 'All', count: 45 },
    { id: 2, name: 'Payment Fraud', count: 20 },
    { id: 3, name: 'Identity Theft', count: 12 },
    { id: 4, name: 'Fake Projects', count: 8 },
    { id: 5, name: 'Scam Bids', count: 5 },
  ];

  const reports = [
    {
      id: 1,
      date: '2025-05-01',
      type: 'Payment Fraud',
      status: 'Pending Review',
      reportedBy: 'John Doe',
      description: 'Suspicious payment of $5,000 from unknown source',
      evidence: 'Transaction ID: TX123456789',
      severity: 'High',
    },
    {
      id: 2,
      date: '2025-04-30',
      type: 'Identity Theft',
      status: 'Under Investigation',
      reportedBy: 'Jane Smith',
      description: 'Multiple accounts created with same email',
      evidence: 'Email: user@example.com',
      severity: 'Medium',
    },
    // Add more sample reports
  ];

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-6">Fraud Reports</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <FaFilter className="inline-block mr-2" />
          Filter
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <FaSortAscending className="inline-block mr-2" />
          Sort
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {reportTypes.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span>{type.name}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              type.name === 'Payment Fraud' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {type.count}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Date</th>
                <th className="py-3 text-left">Type</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Reported By</th>
                <th className="py-3 text-left">Description</th>
                <th className="py-3 text-left">Evidence</th>
                <th className="py-3 text-left">Severity</th>
                <th className="py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="py-4">{report.date}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.type === 'Payment Fraud'
                        ? 'bg-red-100 text-red-800'
                        : report.type === 'Identity Theft'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.status === 'Pending Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'Under Investigation'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4">{report.reportedBy}</td>
                  <td className="py-4">{report.description}</td>
                  <td className="py-4">{report.evidence}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.severity === 'High'
                        ? 'bg-red-100 text-red-800'
                        : report.severity === 'Medium'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.severity}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-600">
                        <FaShieldCheck className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <FaShieldExclamation className="w-5 h-5" />
                      </button>
                      <button className="text-green-500 hover:text-green-600">
                        <FaCheck className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <FaBan className="w-5 h-5" />
                      </button>
                      <button className="text-blue-500 hover:text-blue-600">
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FraudReports;
