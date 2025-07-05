import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ViewProfile = () => {
  const { user: profileData } = useSelector((state) => state.auth);

  if (!profileData) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  const isJobSeeker = profileData.role === "jobseeker";
  const isHiringPerson = profileData.role === "hiringperson";

  const getProfileImage = () => {
    if (profileData?.profileimg) {
      if (
        profileData.profileimg.startsWith("http") ||
        profileData.profileimg.startsWith("data:image")
      ) {
        return profileData.profileimg;
      } else {
        return `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/${profileData.profileimg}`;
      }
    }
    return "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-purple-700 text-white p-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {profileData.name} {profileData.lastName}
            </h1>
            <p className="text-sm mt-1">{profileData.email}</p>
          </div>

          <Link
            to={
              profileData.role === "hiringperson"
                ? "/user/updateHiringprofile"
                : "/user/profile/edit"
            }
            className="bg-white text-purple-700 px-4 py-2 rounded-full text-sm hover:bg-gray-100 border border-purple-300 flex items-center gap-1"
          >
            ✏️ Edit Profile
          </Link>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-4">
        <img
          src={getProfileImage()}
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover shadow-md border-4 border-white -mt-12"
        />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {isJobSeeker && (
          <>
            {/* Skills */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                Skills
              </h2>
              {profileData.skills && profileData.skills.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {profileData.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No skills added yet. Time to showcase your talents!
                </p>
              )}
            </section>

            {/* Education */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                Education
              </h2>
              {profileData.education ? (
                <p className="text-gray-700">{profileData.education}</p>
              ) : (
                <p className="text-gray-500 italic">
                  No education entries yet. Share your academic journey!
                </p>
              )}
            </section>

            {/* Experience */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                Experience
              </h2>
              {profileData.experience ? (
                <p className="text-gray-700">{profileData.experience}</p>
              ) : (
                <p className="text-gray-500 italic">
                  No experience added yet. Time to shine!
                </p>
              )}
            </section>
          </>
        )}

        {isHiringPerson && (
          <>
            {/* Company Name */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                Company Name
              </h2>
              <p className="text-gray-700 font-medium">
                {profileData.companyName || "Not provided"}
              </p>
            </section>

            {/* Company Description */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                Company Description
              </h2>
              <p className="text-gray-700 font-medium whitespace-pre-line">
                {profileData.companyDescription || "Not provided"}
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
