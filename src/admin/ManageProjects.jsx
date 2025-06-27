import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjects,
  adminDeleteProject,
  selectAdminProjects,
  getAdminProjectsStatus,
  getAdminProjectsError,
} from "../store/slices/adminProjectSlice";

import { MdSearch, MdFilterList, MdSort, MdDelete } from "react-icons/md";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAdminProjects) || [];
  const status = useSelector(getAdminProjectsStatus);
  const error = useSelector(getAdminProjectsError);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  // Ensure projects is an array before filtering
  const filtered = (projects || []).filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    console.log("Delete clicked:", id);
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(adminDeleteProject(id))
        .unwrap()
        .then(() => toast.success("Project deleted successfully"))
        .catch(() => toast.error("Failed to delete project"));
    }
  };
  

  console.log("Projects from Redux:", projects);

  return (
    <div className="ml-0 sm:ml-64 p-4 sm:p-6" style={{ position: "relative", zIndex: 50 }}>
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

      {/* Search Bar and Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <MdFilterList className="inline-block mr-1" />
          Filter
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <MdSort className="inline-block mr-1" />
          Sort
        </button>
      </div>

      {/* Loading/Error Messages */}
      {status === "loading" && <p>Loading projects…</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      {/* Table */}
      {status === "succeeded" && (
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <table className="min-w-max w-full table-auto text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-2 text-left">Title</th>
                <th className="py-2 px-2 text-left">Budget</th>
                <th className="py-2 px-2 text-left">Status</th>
                <th className="py-2 px-2 text-left">Reports</th>
                <th className="py-2 px-2 text-left">Posted By</th>
                <th className="py-2 px-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((proj) => (
                <tr key={proj._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{proj.title}</td>
                  <td className="py-3 px-2">₹{proj.budget}</td>
                  <td className="py-3 px-2 capitalize">{proj.status}</td>
                  <td className="py-3 px-2">{proj.reports?.length || 0}</td>
                  <td className="py-3 px-2">
                    {proj.userId?.name} {proj.userId?.lastName}
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1"
                      style={{ position: "relative", zIndex: 50 }}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
