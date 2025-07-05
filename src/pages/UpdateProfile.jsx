import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../store/slices/authSlice";


export const UpdateProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setSkills(
        Array.isArray(user.skills)
          ? user.skills.join(", ")
          : user.skills || ""
      );
      setEducation(user.education || []);
      setExperience(user.experience || []);
      setProfileImageUrl(user.profileimg || "");
    }
  }, [user]);

  const handleSkillsChange = (e) => setSkills(e.target.value);

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };
  const handleAddEducation = () => {
    setEducation([
      ...education,
      { id: Date.now(), degree: "", institution: "", year: "" },
    ]);
  };
  const handleRemoveEducation = (id) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const handleRemoveExperience = (id) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  const handleclose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // fallback if onClose is not provided
    }
  };

  const handleSaveChanges = async () => {
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const updatedProfileData = {
      name,
      lastName,
      email,
      skills: skillsArray,
      education,
      experience,
      profileimg: profileImageUrl,
    };

    try {
      await dispatch(updateUserProfile(updatedProfileData)).unwrap();
      alert("Profile updated successfully!");
      // navigate("/user/profile/view");
      navigate("/user/jobseeker")
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  if (loading && !user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto text-center">
        Loading profile data...
      </div>
    );
  }

  if (error && !user) {
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Update Your Profile
      </h2>

      {/* ✅ Profile Image via URL */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Profile Image URL
        </h3>
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
        )}
        <input
          type="text"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
          placeholder="Enter image URL"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-4">
        {/* Name, Last Name, Email, Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <textarea
            value={skills}
            onChange={handleSkillsChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="2"
          ></textarea>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {education.map((edu, index) => (
            <div key={edu.id || index} className="border p-3 mb-2 rounded-md bg-gray-50">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                placeholder="Degree"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                placeholder="Institution"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
                placeholder="Year"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <button
                onClick={() => handleRemoveEducation(edu.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddEducation}
            className="text-blue-600 text-sm"
          >
            + Add Education
          </button>
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="border p-3 mb-2 rounded-md bg-gray-50">
              <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
                placeholder="Title"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                placeholder="Company"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                placeholder="Start Date"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                placeholder="End Date"
                className="block w-full mb-1 border px-2 py-1 rounded"
              />
              <textarea
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="block w-full mb-1 border px-2 py-1 rounded"
                rows="2"
              ></textarea>
              <button
                onClick={() => handleRemoveExperience(exp.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddExperience}
            className="text-blue-600 text-sm"
          >
            + Add Experience
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleclose}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};
1 