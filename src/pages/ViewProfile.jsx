// src/components/ViewProfile.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

export const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const getAuthToken = () => {
    return sessionStorage.getItem('token');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        if (!token) {
          // If no token, redirect to login page for authentication
          navigate('/login');
          throw new Error('Authentication token not found. Please log in.');
        }

        const response = await fetch('http://localhost:5000/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user profile.');
        }

        const data = await response.json();
        setProfileData(data.user_data);

      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Add navigate to dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-300">
          <p className="text-xl text-red-600 font-semibold mb-4">Error: {error}</p>
          <button
            onClick={() => navigate('/')} // Navigate to dashboard or home on error
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-gray-700 font-semibold mb-4">No profile data available.</p>
          <p className="text-gray-600 mb-6">It looks like your profile isn't complete. Please update it to get started!</p>
          {/* Link to a dedicated update profile page, if you have one */}
          <Link
            to="/user/profile/edit" // Assuming you'll create this route for the update page
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Update Your Profile
          </Link>
          <button
            onClick={() => navigate('/user/jobseeker')} // Or navigate to the jobseeker dashboard
            className="ml-4 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { name, lastName, email, skills, education, experience } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="relative p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
          <h1 className="text-4xl font-extrabold mb-2 leading-tight">
            {name} {lastName}
          </h1>
          <p className="text-lg font-light opacity-90">{email}</p>
          <div className="absolute top-4 right-4">
            <Link
              to="/user/profile/edit" // Ensure this matches your App.jsx route for UpdateProfile as a page
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-full font-semibold text-sm shadow-md hover:bg-gray-100 transition duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Profile Sections Container */}
        <div className="p-8 space-y-10">

          {/* Skills Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">Skills</h2>
            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No skills added yet. Time to showcase your talents!</p>
            )}
          </section>

          {/* Education Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">Education</h2>
            {education && education.length > 0 ? (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu._id || index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-md text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">Graduated: {edu.year}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No education entries yet. Share your academic journey!</p>
            )}
          </section>

          {/* Experience Section */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">Work Experience</h2>
            {experience && experience.length > 0 ? (
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp._id || index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-md text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{exp.startDate} - {exp.endDate}</p>
                    {exp.description && (
                      <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No work experience entries yet. Add your professional experience!</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};