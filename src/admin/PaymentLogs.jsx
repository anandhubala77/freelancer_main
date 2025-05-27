import React from 'react';
import {
  FaSearch as SearchIcon,
  FaFilter as FilterIcon,
  FaSortAlphaUp as SortAscIcon,
  FaSortAlphaDown as SortDescIcon,
  FaCreditCard as CreditCardIcon,
  FaMoneyBill as BanknotesIcon,
  FaArrowRight as ArrowRightIcon,
  FaArrowLeft as ArrowLeftIcon,
  FaEye as EyeIcon,
  FaTrash as TrashIcon,
  FaDownload as DownloadIcon,
} from 'react-icons/fa';

const PaymentLogs = () => {
  const paymentTypes = [
    { id: 1, name: 'All', count: 256 },
    { id: 2, name: 'Project Payments', count: 189 },
    { id: 3, name: 'Membership Fees', count: 45 },
    { id: 4, name: 'Refunds', count: 22 },
  ];

  const paymentStatus = [
    { id: 1, name: 'All', count: 256 },
    { id: 2, name: 'Completed', count: 220 },
    { id: 3, name: 'Pending', count: 25 },
    { id: 4, name: 'Failed', count: 11 },
  ];

  const payments = [
    {
      id: 1,
      date: '2025-05-01',
      amount: '$2,500.00',
      type: 'Project Payment',
      status: 'Completed',
      payer: 'John Doe',
      receiver: 'Jane Smith',
      project: 'Web Development Project',
      paymentMethod: 'Credit Card',
    },
    {
      id: 2,
      date: '2025-04-28',
      amount: '$50.00',
      type: 'Membership Fee',
      status: 'Pending',
      payer: 'Mike Johnson',
      receiver: 'System',
      project: '-',
      paymentMethod: 'PayPal',
    },
    // Add more sample payments
  ];

  return (
    <div className="ml-4 sm:ml-64 p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Logs</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <FilterIcon className="inline-block mr-2" />
          Filter
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <SortAscIcon className="inline-block mr-2" />
          Sort
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          <DownloadIcon className="inline-block mr-2" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Payment Types</h2>
          <div className="grid grid-cols-1 gap-4">
            {paymentTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{type.name}</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
          <div className="grid grid-cols-1 gap-4">
            {paymentStatus.map((status) => (
              <div
                key={status.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{status.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status.name === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : status.name === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Date</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Type</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Payer</th>
                <th className="py-3 text-left">Receiver</th>
                <th className="py-3 text-left">Project</th>
                <th className="py-3 text-left">Method</th>
                <th className="py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="py-4">{payment.date}</td>
                  <td className="py-4 font-medium">{payment.amount}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {payment.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4">{payment.payer}</td>
                  <td className="py-4">{payment.receiver}</td>
                  <td className="py-4">{payment.project}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:text-green-600">
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <ArrowLeftIcon className="w-5 h-5" />
                      </button>
                      <button className="text-blue-500 hover:text-blue-600">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        <TrashIcon className="w-5 h-5" />
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

export default PaymentLogs;
