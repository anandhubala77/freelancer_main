import React from 'react';
import { MdSearch, MdFilterList, MdSort, MdVisibility, MdDelete, MdCheckCircle, MdCancel } from 'react-icons/md';

const ManageProjects = () => {
  const projectStatus = [
    { id: 1, name: 'All', count: 87 },
    { id: 2, name: 'Pending', count: 23 },
    { id: 3, name: 'Approved', count: 54 },
    { id: 4, name: 'Rejected', count: 10 },
  ];

  const projects = [
    {
      id: 1,
      title: 'Web Development Project',
      client: 'John Doe',
      budget: '$2,500',
      status: 'Pending',
      bids: 15,
      created: '2025-05-01',
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'Jane Smith',
      budget: '$3,200',
      status: 'Approved',
      bids: 22,
      created: '2025-04-28',
    },
    // Add more sample projects
  ];

  return (
    <div className="ml-0 sm:ml-64 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <MdFilterList className="inline-block mr-2" />
          Filter
        </button>
        <button className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <MdSort className="inline-block mr-2" />
          Sort
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {projectStatus.map((status) => (
          <div
            key={status.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span>{status.name}</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {status.count}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Project Title</th>
                <th className="py-3 text-left">Client</th>
                <th className="py-3 text-left">Budget</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Bids</th>
                <th className="py-3 text-left">Created</th>
                <th className="py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="py-4">{project.title}</td>
                  <td className="py-4">{project.client}</td>
                  <td className="py-4">{project.budget}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : project.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4">{project.bids}</td>
                  <td className="py-4">{project.created}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-green-500 hover:text-green-600">
                        <MdCheckCircle className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <MdCancel className="w-5 h-5" />
                      </button>
                      <button className="text-blue-500 hover:text-blue-600">
                        <MdVisibility className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        <MdDelete className="w-5 h-5" />
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

export default ManageProjects;
