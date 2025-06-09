// components/UpdateProfile.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const UpdateProfile = ({ onClose }) => {
     const navigate = useNavigate('');
  // State for basic profile info
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState(''); // Add lastName state
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState(''); 
  // This will be a comma-separated string for display/input

  // State for education entries (array of objects)
  const [education, setEducation] = useState([]);
  // State for experience entries (array of objects)
  const [experience, setExperience] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the JWT token (replace with your actual token retrieval logic)
  const getAuthToken = () => {
    // Assuming your token is stored in localStorage after login
    const token = sessionStorage.getItem('token');
    return token;
  };

  // --- Fetch User Profile Data (Initial Load) ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication token not found. Please log in.');
        }

        const response = await fetch('http://localhost:5000/user/profile', { // Adjust URL if needed
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
        const user = data.user_data;

        setName(user.name || '');
        setLastName(user.lastName || ''); // Set lastName
        setEmail(user.email || '');
        // Join skills array into a comma-separated string for the textarea
        setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || '');
        setEducation(user.education || []);
        setExperience(user.experience || []);

      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on component mount


  // --- Handlers for input changes ---
  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value); // Add lastName handler
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSkillsChange = (e) => setSkills(e.target.value);

  // --- Handlers for Education ---
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = education.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { id: Date.now(), degree: '', institution: '', year: '' }]);
  };

  const handleRemoveEducation = (idToRemove) => {
    setEducation(education.filter(entry => entry.id !== idToRemove));
  };

  // --- Handlers for Experience ---
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = experience.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setExperience(updatedExperience);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveExperience = (idToRemove) => {
    setExperience(experience.filter(entry => entry.id !== idToRemove));
  };

  // --- Handle Save Changes ---
  const handleSaveChanges = async () => {
    setLoading(true); // Indicate saving in progress
    setError(null);
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Convert skills string back to an array for the backend
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

      const updatedProfileData = {
        name,
        lastName, // Include lastName
        email,
        skills: skillsArray, // Send as array
        education,
        experience,
      };

      const response = await fetch('http://localhost:5000/user/profile', { // Adjust URL if needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile. Please try again.');
      }

      const result = await response.json();
      console.log('Profile update successful:', result);
      alert(result.message); // Show success message from backend
     
      navigate('profile/view')

    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message); // Display error to user
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleclose = () => {
    onClose(); // Call the onClose prop to close the modal or navigate back
  }
  // --- Handle Change Password (placeholder for a separate modal/flow) ---
  const handleChangePasswordClick = () => {
    alert('A separate modal or page for changing password will appear here. This requires submitting current password for verification.');
    // In a real app, you'd likely open another modal or redirect
    // e.g., setShowChangePasswordModal(true);
  };

  if (loading && !error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto text-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto text-center text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Your Profile</h2>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                readOnly // Email is often read-only after registration, or requires more complex update
                disabled // Visually indicate it's not editable
              />
               <p className="mt-1 text-xs text-gray-500">Email cannot be changed directly here. Contact support if needed.</p>
            </div>

            {/* Change Password Option */}
            <div>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={handleChangePasswordClick}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Your Skills (e.g., React, Node.js, UI/UX Design, Project Management)
            </label>
            <textarea
              id="skills"
              name="skills"
              rows="3"
              value={skills}
              onChange={handleSkillsChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="List your skills, separated by commas (e.g., JavaScript, React, MongoDB)"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">Separate skills with commas.</p>
          </div>
        </div>

        {/* Education Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
          {education.length === 0 && <p className="text-gray-500 text-sm">No education entries yet.</p>}
          {education.map((edu, index) => (
            <div key={edu.id || `new-edu-${index}`} className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-3 relative">
              <button
                onClick={() => handleRemoveEducation(edu.id || `new-edu-${index}`)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remove Education"
              >
                &times;
              </button>
              <div className="space-y-2">
                <div>
                  <label htmlFor={`degree-${edu.id || `new-edu-${index}`}`} className="block text-xs font-medium text-gray-600">Degree</label>
                  <input
                    type="text"
                    id={`degree-${edu.id || `new-edu-${index}`}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., B.Sc. Computer Science"
                  />
                </div>
                <div>
                  <label htmlFor={`institution-${edu.id || `new-edu-${index}`}`} className="block text-xs font-medium text-gray-600">Institution</label>
                  <input
                    type="text"
                    id={`institution-${edu.id || `new-edu-${index}`}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., University of Example"
                  />
                </div>
                <div>
                  <label htmlFor={`edu-year-${edu.id || `new-edu-${index}`}`} className="block text-xs font-medium text-gray-600">Year</label>
                  <input
                    type="text"
                    id={`edu-year-${edu.id || `new-edu-${index}`}`}
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="mt-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleAddEducation}
          >
            + Add New Education
          </button>
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Work Experience</h3>
          {experience.length === 0 && <p className="text-gray-500 text-sm">No work experience entries yet.</p>}
          {experience.map((exp, index) => (
            <div key={exp.id || `new-exp-${index}`} className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-3 relative">
              <button
                onClick={() => handleRemoveExperience(exp.id || `new-exp-${index}`)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                title="Remove Experience"
              >
                &times;
              </button>
              <div className="space-y-2">
                <div>
                  <label htmlFor={`title-${exp.id || `new-exp-${index}`}`} className="block text-xs font-medium text-gray-600">Job Title</label>
                  <input
                    type="text"
                    id={`title-${exp.id || `new-exp-${index}`}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., Senior Web Developer"
                  />
                </div>
                <div>
                  <label htmlFor={`company-${exp.id || `new-exp-${index}`}`} className="block text-xs font-medium text-gray-600">Company</label>
                  <input
                    type="text"
                    id={`company-${exp.id || `new-exp-${index}`}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., Tech Solutions Inc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`start-date-${exp.id || `new-exp-${index}`}`} className="block text-xs font-medium text-gray-600">Start Date</label>
                    <input
                      type="text"
                      id={`start-date-${exp.id || `new-exp-${index}`}`}
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="e.g., Jan 2023"
                    />
                  </div>
                  <div>
                    <label htmlFor={`end-date-${exp.id || `new-exp-${index}`}`} className="block text-xs font-medium text-gray-600">End Date</label>
                    <input
                      type="text"
                      id={`end-date-${exp.id || `new-exp-${index}`}`}
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="e.g., Present or Dec 2024"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`description-${exp.id || `new-exp-${index}`}`} className="block text-xs font-medium text-gray-600">Description</label>
                  <textarea
                    id={`description-${exp.id || `new-exp-${index}`}`}
                    rows="3"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="Responsibilities and achievements..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="mt-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleAddExperience}
          >
            + Add New Experience
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleclose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleSaveChanges}
          disabled={loading} // Disable button while saving
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};










// // components/UpdateProfile.jsx
// import React from 'react';

// export const UpdateProfile = ({ onClose }) => {
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto"> {/* Increased max-width for more content */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Your Profile</h2>

//       <div className="space-y-6"> {/* Increased spacing between major sections */}
//         {/* Basic Information Section */}
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
//           <div className="space-y-4">
//             {/* Name Field */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 defaultValue="John Doe" // Replace with actual logged-in user's name
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>

//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 defaultValue="john.doe@example.com" // Replace with actual logged-in user's email
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>

//             {/* Change Password Option */}
//             <div>
//               <button
//                 type="button"
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                 onClick={() => alert('Change password functionality will be added here!')} // Placeholder for now
//               >
//                 Change Password
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Skills Section */}
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
//           <div>
//             <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//               Your Skills (e.g., React, Node.js, UI/UX Design, Project Management)
//             </label>
//             <textarea
//               id="skills"
//               name="skills"
//               rows="3"
//               defaultValue="React, Node.js, MongoDB, JavaScript, HTML, CSS, RESTful APIs, Git" // Dummy skills
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="List your skills, separated by commas or new lines"
//             ></textarea>
//           </div>
//         </div>

//         {/* Education Section */}
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
//           {/* Example Education Entry */}
//           <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//             <h4 className="font-medium text-gray-800">Bachelor of Technology in Computer Science</h4>
//             <p className="text-sm text-gray-600">University of Example, City, Country</p>
//             <p className="text-sm text-gray-600">Graduated: May 20XX</p>
//             {/* You would typically add edit/delete buttons here for multiple entries */}
//             {/* <button className="text-blue-500 text-xs mt-2">Edit</button> */}
//           </div>
//           {/* You could add a button here to "Add New Education" */}
//           <button
//             type="button"
//             className="mt-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             onClick={() => alert('Add new education functionality will be added here!')}
//           >
//             + Add New Education
//           </button>
//         </div>

//         {/* Experience Section */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Work Experience</h3>
//           {/* Example Experience Entry */}
//           <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//             <h4 className="font-medium text-gray-800">Senior Web Developer - Tech Solutions Inc.</h4>
//             <p className="text-sm text-gray-600">Jan 20XX - Present</p>
//             <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
//               <li>Developed and maintained web applications using React and Node.js.</li>
//               <li>Led a team of 3 developers in agile sprints.</li>
//               <li>Implemented RESTful APIs for various services.</li>
//             </ul>
//             {/* You would typically add edit/delete buttons here for multiple entries */}
//             {/* <button className="text-blue-500 text-xs mt-2">Edit</button> */}
//           </div>
//           {/* Another Example Experience Entry (optional) */}
//           <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
//             <h4 className="font-medium text-gray-800">Junior Developer - Creative Apps</h4>
//             <p className="text-sm text-gray-600">June 20XX - Dec 20XX</p>
//             <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
//               <li>Assisted in front-end development using HTML, CSS, and JavaScript.</li>
//               <li>Collaborated on bug fixing and testing.</li>
//             </ul>
//           </div>
//           {/* You could add a button here to "Add New Experience" */}
//           <button
//             type="button"
//             className="mt-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             onClick={() => alert('Add new experience functionality will be added here!')}
//           >
//             + Add New Experience
//           </button>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           onClick={() => alert('Profile updated (dummy save)!')} // Placeholder for now
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };