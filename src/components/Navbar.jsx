import React, { useState } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import Logo from "./Logo";
import { findWorkItems, hireFreelancersItems } from "../services/navitems";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // new dropdown state

  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMobileMenuToggle = (menu) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    navigate("/Login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo + Desktop Navigation */}
          <div className="flex items-center align-center gap-8 ">
            <Link to="/" className="flex items-center gap-2 font-bold text-gray-700">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 w-56 lg:w-64"
              />

              {/* Find Work Dropdown */}
              {userRole === "jobseeker" && (
                <div className="relative group">
                  <button className="text-gray-700 flex items-center gap-1">
                    Find Work <FiChevronDown />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-md w-64 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    {findWorkItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Hire Freelancers Dropdown */}
              {userRole === "hiringperson" && (
                <div className="relative group">
                  <button className="text-gray-700 flex items-center gap-1">
                    Hire Freelancers <FiChevronDown />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-md w-64 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    {hireFreelancersItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Auth Buttons + Mobile Icon */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button
                  className="text-gray-700 font-medium hover:bg-gray-200 py-2 px-5 rounded-full"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              ) : (
                <Link to="/register">
                  <button className="text-gray-700 font-medium hover:bg-gray-200 py-2 px-5 rounded-full">
                    Sign up
                  </button>
                </Link>
              )}

              {userRole === "hiringperson" && (
                <div>
                  <Link to="/post-project">
                    <button className="bg-pink-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-pink-600 transition">
                      Post a Project
                    </button>
                  </Link>
                </div>
              )}

              {userRole === "jobseeker" && (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    {/* Avatar Image */}
                    <img
                      src={user?.avatarUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"} // Replace with dynamic avatar URL
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <FiChevronDown className={`mt-1 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <Link
                        to="/user/profile/view"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)} // Close dropdown on click
                      >
                        View Profile
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <HiBars3BottomLeft className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-white px-8 pt-6 transition-all duration-700 ease-in-out lg:hidden ${
          toggleMenu
            ? "h-full opacity-100 scale-100"
            : "h-0 opacity-0 scale-95 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-6 font-semibold">
          {/* Mobile Find Work Dropdown */}
          {userRole === "jobseeker" && (
            <div>
              <button
                onClick={() => handleMobileMenuToggle("findWork")}
                className="w-full text-left py-2 text-gray-700 flex items-center justify-between"
              >
                Find Work <FiChevronDown />
              </button>
              {activeMobileMenu === "findWork" && (
                <div className="pl-4">
                  {findWorkItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Hire Freelancers Dropdown */}
          {userRole === "hiringperson" && (
            <div>
              <button
                onClick={() => handleMobileMenuToggle("hireFreelancers")}
                className="w-full text-left py-2 text-gray-700 flex items-center justify-between"
              >
                Hire Freelancers <FiChevronDown />
              </button>
              {activeMobileMenu === "hireFreelancers" && (
                <div className="pl-4">
                  {hireFreelancersItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Profile Dropdown */}
          {userRole === "jobseeker" && (
            <div>
              <button
                onClick={() => handleMobileMenuToggle("profile")}
                className="w-full text-left py-2 text-gray-700 flex items-center justify-between"
              >
                Profile <FiChevronDown />
              </button>
              {activeMobileMenu === "profile" && (
                <div className="pl-4">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setToggleMenu(false)} // Close mobile menu on click
                  >
                    View Profile
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Auth Buttons */}
          <div className="pt-4">
            {!user && (
              <>
                <Link to="/login">
                  <button className="block w-full border-2 border-gray-300 py-2 px-4 rounded-full text-center hover:bg-gray-700 hover:text-white">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="mt-2 block w-full border-2 border-gray-300 py-2 px-4 rounded-full text-center hover:bg-gray-700 hover:text-white">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </nav>
  );
};

export default Navbar;