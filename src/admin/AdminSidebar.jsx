import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  FaHome,
  FaUsers,
  FaFolder,
  FaCreditCard,
  FaExclamationCircle,
  FaComments,
  FaSignOutAlt as FaLogout,
  FaBars as FaHamburger,
} from 'react-icons/fa';
import { logout } from "../store/slices/authSlice";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FaFolder, label: 'Manage Projects', path: '/admin/projects' },
    { icon: FaUsers, label: 'Manage Users', path: '/admin/users' },
    { icon: FaCreditCard, label: 'Payment Logs', path: '/admin/payments' },
    { icon: FaExclamationCircle, label: 'Fraud Reports', path: '/admin/fraud' },
    { icon: FaComments, label: 'Profile', path: '/admin/profile' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/login"); // Make sure this matches your routing
  };

  return (
    <div className="flex">
      {/* Mobile Hamburger Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button onClick={toggleSidebar} className="text-white p-2 bg-gray-800 rounded-lg">
          <FaHamburger className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-60 bg-gray-800 h-full transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 lg:static`}
      >
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Admin Panel</h2>
          <nav className="space-y-1 flex-grow">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-lg"
              >
                <item.icon className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-red-400 hover:bg-gray-700 hover:text-red-500 transition-colors rounded-lg"
            >
              <FaLogout className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="absolute inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminSidebar;
