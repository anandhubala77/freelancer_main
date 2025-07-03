
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { registerApi } from '../services/authService'; // adjust path if needed

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

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    rememberMe: false,
  });

  const handleRegister = async () => {
    const { name, lastName, email, password, role } = userData;

    if (!name || !lastName || !email || !password || !role) {
      toast.warning("Please fill in all the fields");
      return;
    }

    try {
      const result = await registerApi(userData);

      console.log("API response:", result);

      // If you use axios, result.status is here, otherwise adapt:
      if (result.status === 201) {
        toast.success("User registered successfully");

        setUserData({
          name: "",
          lastName: "",
          email: "",
          password: "",
          role: "",   
        });

        navigate("/Login");
        
      } else {
        // try to show error message if available
        const errorMsg = result.data?.message || "Something went wrong";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data || error.message || "Registration failed");
    }
  };

  useEffect(() => {
    setUserData({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600"><Logo /></span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mt-2">Sign up</h2>
        </div>

        <div className="space-y-3 mb-6">
          <button type="button" className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <GoogleIcon /> Continue with Google
          </button>
          <button type="button" className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <FacebookIcon /> Continue with Facebook
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

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="rounded-md w-full px-3 py-2 border"
                required
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                className="rounded-md w-full px-3 py-2 border"
                required
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="rounded-md w-full px-3 py-2 border"
            required
          />

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="rounded-md w-full px-3 py-2 border"
              required
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              <EyeIcon />
            </button>
          </div>
          <div className="relative">

            <select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              className="rounded-md w-full px-3 py-2 border"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="admin">Admin</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="hiringperson">Hiring Person</option>
            </select>
          </div>



          <div className="flex items-center">
            <input id="agree" name="agree" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"

            //checked={userData.rememberMe}
            // onChange={(e) => setUserData({ ...userData, rememberMe: e.target.checked })}
            //required
            />
            <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;




































//--------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import Logo from '../components/Logo';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// // Simple SVG icons as placeholders
// const GoogleIcon = () => (
//   <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
//     <path fill="#EA4335" d="M24 9.5c3.21 0 5.99 1.1 8.03 3.03l6.36-6.36C34.04 2.86 29.63 1 24 1 14.32 1 6.36 6.7 3.18 15.18l7.86 6.1C12.25 14.68 17.68 9.5 24 9.5z"></path>
//     <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 2.73-2.2 5.04-4.64 6.62l7.27 5.66C43.46 37.1 46.98 31.35 46.98 24.55z"></path>
//     <path fill="#FBBC05" d="M11.04 21.28c-.47 1.48-.73 3.04-.73 4.6s.26 3.12.73 4.6l-7.86 6.1C1.23 32.75 0 28.5 0 24s1.23-8.75 3.18-12.52l7.86 6.1z"></path>
//     <path fill="#34A853" d="M24 47c6.48 0 11.93-2.13 15.89-5.82l-7.27-5.66c-2.13 1.44-4.86 2.3-7.62 2.3-6.36 0-11.73-4.16-13.63-9.82l-7.86 6.1C6.36 40.3 14.32 47 24 47z"></path>
//     <path fill="none" d="M0 0h48v48H0z"></path>
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
//   </svg>
// );

// // Simple eye icon using SVG for password visibility toggle (visual only)
// const EyeIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );



// const [userData, setUserData] = useState({
//   name: "",
//   lastName: "",
//   email: "",
//   password: "",
// }
// )

//   const handleRegister=async()=>{
//     console.log("user enterd Data");
//     console.log(userData);

//     const { name, email, password } = userData;

//     if (!name || !email || !password) {
//       toast.warning("please fill the data");
//     } else {
//       const result = await registerApi(userData);
//       if (result.status == 201) {
//         toast.success("user registred successfully");

//         setUserData({
//           name: "",
//           email: "",
//           password: "",
//         });
//         //navigate to login page

//       }
//       else {
//         toast.error("something happend")
//       }
//     }
//   }
//   // No state or handlers needed for UI-only component



//   return (
//     // Main container centered on the page with padding
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//       {/* Registration card */}
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

//         <div className="text-center mb-6 flex items-center justify-center ">

//           <span className="text-2xl font-bold text-blue-600 "> <Logo />
//           </span>

//         </div>

//         <div className='text-center mb-6 flex items-center justify-center'>
//           <h2 className="text-xl font-semibold text-gray-700 mt-2">Sign up</h2>
//         </div>

//         {/* Social Login Buttons */}
//         <div className="space-y-3 mb-6">
//           <button type="button" className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//             <GoogleIcon />
//             Continue with Google
//           </button>
//           <button type="button" className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//             <FacebookIcon />
//             Continue with Facebook
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="relative mb-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">OR</span>
//           </div>
//         </div>

//         {/* Registration Form */}
//         <form className="space-y-4"> {/* Removed onSubmit */}
//           {/* Name Fields */}
//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <label htmlFor="first-name" className="sr-only">First Name</label>
//               <input
//                 id="first-name"
//                 name="first-name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="First Name"
//                 onChange={(e) =>
//                   setUserData({ ...userData, name: e.target.value })
//                 }
//               // Removed value and onChange
//               />
//             </div>
//             <div className="w-1/2">
//               <label htmlFor="last-name" className="sr-only">Last Name</label>
//               <input
//                 id="last-name"
//                 name="last-name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Last Name"
//                 onChange={(e) =>
//                   setUserData({ ...userData, name: e.target.value })
//                 }
//               // Removed value and onChange
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email-address" className="sr-only">Email address</label>
//             <input
//               id="email-address"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Email address"
//               onChange={(e) =>
//                 setUserData({ ...userData, email: e.target.value })
//               }
//             // Removed value and onChange
//             />
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password" // Set type directly to password
//               autoComplete="new-password"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Password"
//               onChange={(e) =>
//                 setUserData({ ...userData, password: e.target.value })
//               }

//             // Removed value and onChange
//             />
//             {/* Show/Hide password button (visual only) */}
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
//               aria-label="Show password" // Static label
//             >
//               <EyeIcon /> {/* Display static eye icon */}
//             </button>
//           </div>



//           {/* Agreement Checkbox */}
//           <div className="flex items-center">
//             <input
//               id="agree"
//               name="agree"
//               type="checkbox"
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               required // Keep required for form validation if needed
//             // Removed checked and onChange
//             />
//             <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
//               I agree to the{' '}
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 User Agreement
//               </a>{' '}
//               and{' '}
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Privacy Policy
//               </a>
//               .
//             </label>
//           </div>




//           {/* Submit Button */}
//           <div>
//             {/* Changed to type="button" as there's no form submission logic */}
//             <button
//               type="button"
//               className="group relative w-full flex justify-center
//               py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
//                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               onClick={handleRegister}
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         {/* Login Link */}
//         <div className="text-sm text-center mt-6">
//           <p className="text-gray-600">
//             Already have an account?
//             <Link to="/login" className='text-decoration-none'>
//             <span className="font-medium text-indigo-600 hover:text-indigo-500"> Log in</span>
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
