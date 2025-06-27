import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  deleteUser,
  selectAllUsers,
} from "../store/slices/adminUserSlice";
import {
  MdDelete,
  MdSearch,
  MdSort,
  MdContentCopy,
} from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => toast.success("User deleted successfully"))
        .catch(() => toast.error("Failed to delete user"));
    }
  };

  const filteredUsers = users
    .filter(
      (u) =>
        u._id?.toLowerCase().includes(search.toLowerCase()) ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="ml-0 sm:ml-64 p-4 sm:p-6" style={{ position: "relative", zIndex: 50 }}>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by ID, name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={toggleSort}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <MdSort />
          Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">User ID</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Email</th>
              <th className="py-2 px-2">Role</th>
              <th className="py-2 px-2">Registered</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, index) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2 text-xs text-gray-700 break-all select-text">
                  <div className="flex items-center gap-2">
                    <span>{u._id}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(u._id);
                        toast.success("User ID copied!");
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdContentCopy size={16} />
                    </button>
                  </div>
                </td>
                <td className="py-3 px-2">
                  {u.name} {u.lastName}
                </td>
                <td className="py-3 px-2">{u.email}</td>
                <td className="py-3 px-2 capitalize">{u.role}</td>
                <td className="py-3 px-2">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete user"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
