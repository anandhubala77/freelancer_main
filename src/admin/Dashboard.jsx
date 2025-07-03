import React from 'react';
import {
  FaUsers,
  FaFolder,
  FaDollarSign,
  FaShieldAlt,
  FaUser,
  FaChartLine,
  FaCreditCard,
  FaComments,
  FaClock,
} from 'react-icons/fa';

const Dashboard = () => {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const scrollPosition = localStorage.getItem('adminDashboardScroll');
    if (scrollPosition && contentRef.current) {
      contentRef.current.scrollTop = parseInt(scrollPosition);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (contentRef.current) {
        localStorage.setItem('adminDashboardScroll', contentRef.current.scrollTop.toString());
      }
    };
  }, []);

  const metrics = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: FaUsers,
      color: 'bg-blue-500',
      change: '+2.5%',
    },
    {
      title: 'Active Projects',
      value: '87',
      icon: FaFolder,
      color: 'bg-green-500',
      change: '+15',
    },
    {
      title: 'Total Earnings',
      value: '$23,456',
      icon: FaDollarSign,
      color: 'bg-purple-500',
      change: '+12.8%',
    },
    {
      title: 'Pending Approvals',
      value: '12',
      icon: FaShieldAlt,
      color: 'bg-yellow-500',
      change: '+3',
    },
  ];

  const recentProjects = [
    {
      title: 'E-commerce Website',
      client: 'Tech Corp',
      status: 'In Progress',
      budget: '$5,000',
      progress: 60,
    },
    {
      title: 'Mobile App Development',
      client: 'Mobile Solutions',
      status: 'New',
      budget: '$8,500',
      progress: 0,
    },
    {
      title: 'Content Management System',
      client: 'Media Group',
      status: 'Completed',
      budget: '$3,200',
      progress: 100,
    },
  ];

  const recentBids = [
    {
      title: 'Full Stack Developer',
      bidder: 'John Doe',
      amount: '$3,500',
      status: 'Pending',
      time: 'Just Now',
    },
    {
      title: 'UI/UX Designer',
      bidder: 'Jane Smith',
      amount: '$2,800',
      status: 'Approved',
      time: '5 mins ago',
    },
    {
      title: 'Backend Developer',
      bidder: 'Mike Johnson',
      amount: '$4,200',
      status: 'Rejected',
      time: '10 mins ago',
    },
  ];

  return (
    <div ref={contentRef} className="w-full px-4 py-6 lg:px-6 overflow-y-auto min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base">
            Export Data
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm sm:text-base">
            Generate Report
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md flex items-center ${metric.color} hover:shadow-lg transition-all duration-200`}
          >
            <metric.icon className="w-8 h-8 text-white mr-4" />
            <div>
              <h3 className="text-lg font-bold text-white">{metric.value}</h3>
              <p className="text-sm text-white/80">{metric.title}</p>
              <p
                className={`text-xs mt-1 ${metric.change.includes('+') ? 'text-green-100' : 'text-red-100'}`}
              >
                {metric.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Projects</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between gap-4"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{project.title}</h3>
                  <p className="text-sm text-gray-500">Client: {project.client}</p>
                  <p className="text-sm text-gray-500">Budget: {project.budget}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      project.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : project.status === 'New'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bids */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Bids</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div className="space-y-4">
            {recentBids.map((bid, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between gap-4"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{bid.title}</h3>
                  <p className="text-sm text-gray-500">Bidder: {bid.bidder}</p>
                  <p className="text-sm text-gray-500">Amount: {bid.amount}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      bid.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : bid.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {bid.status}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{bid.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <button className="p-4 text-center rounded-lg hover:bg-gray-50 transition-colors">
            <FaFolder className="w-6 h-6 text-blue-500 mb-2" />
            <span className="block text-sm font-medium text-gray-800">Approve Projects</span>
          </button>
          <button className="p-4 text-center rounded-lg hover:bg-gray-50 transition-colors">
            <FaUser className="w-6 h-6 text-green-500 mb-2" />
            <span className="block text-sm font-medium text-gray-800">Verify Users</span>
          </button>
          <button className="p-4 text-center rounded-lg hover:bg-gray-50 transition-colors">
            <FaDollarSign className="w-6 h-6 text-purple-500 mb-2" />
            <span className="block text-sm font-medium text-gray-800">Process Payments</span>
          </button>
          <button className="p-4 text-center rounded-lg hover:bg-gray-50 transition-colors">
            <FaShieldAlt className="w-6 h-6 text-yellow-500 mb-2" />
            <span className="block text-sm font-medium text-gray-800">Approve Bids</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
