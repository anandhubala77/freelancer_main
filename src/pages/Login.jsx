import React, { useState } from 'react';
import Logo from '../components/Logo';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

// Reusable SVG Icons
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.21 0 5.99 1.1 8.03 3.03l6.36-6.36C34.04 2.86 29.63 1 24 1 14.32 1 6.36 6.7 3.18 15.18l7.86 6.1C12.25 14.68 17.68 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 2.73-2.2 5.04-4.64 6.62l7.27 5.66C43.46 37.1 46.98 31.35 46.98 24.55z"></path>
    <path fill="#FBBC05" d="M11.04 21.28c-.47 1.48-.73 3.04-.73 4.6s.26 3.12.73 4.6l-7.86 6.1C1.23 32.75 0 28.5 0 24s1.23-8.75 3.18-12.52l7.86 6.1z"></path>
    <path fill="#34A853" d="M24 47c6.48 0 11.93-2.13 15.89-5.82l-7.27-5.66c-2.13 1.44-4.86 2.3-7.62 2.3-6.36 0-11.73-4.16-13.63-9.82l-7.86 6.1C6.36 40.3 14.32 47 24 47z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
  </svg>
);

// --- Login Component ---
function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = userData;

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await loginApi(userData);

      if (result.status === 200) {
        const userRole = result.data.user_data.role;
        const user = result.data.user_data;

        sessionStorage.setItem("existingUser", JSON.stringify(user));
        sessionStorage.setItem("token", result.data.jwt_Token);
        toast.success("Login successful");

        // Navigate based on role
        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "jobseeker") {
          navigate("/user/jobseeker");
        } else if (userRole === "hiringperson") {
          navigate("/user/hiring");
        } else {
          toast.error("Unknown user role");
        }
      } else if (result.status === 406) {
        toast.error("Email or password mismatch");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <Logo />
          <h2 className="text-xl font-semibold text-gray-700 mt-3">Sign in</h2>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <GoogleIcon />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <FacebookIcon />
            Continue with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Email or Username"
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={e => setUserData({ ...userData, password: e.target.value })}
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
              <span className="ml-2 text-gray-900">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white text-sm font-medium ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
