import React from "react";
import { useSelector } from "react-redux";
import UpdatePassword from "../components/Updatepassword";
import ProfileImageUpload from "../components/ProfileImageUpload"; // <-- Add this

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      {/* Profile image uploader */}
      <div className="mb-6">
        <ProfileImageUpload />
      </div>

      <div className="space-y-3 mb-8">
        <div>
          <span className="font-medium">Name: </span>
          <span>{user?.name} {user?.lastName}</span>
        </div>
        <div>
          <span className="font-medium">Email: </span>
          <span>{user?.email}</span>
        </div>
        <div>
          <span className="font-medium">Role: </span>
          <span>{user?.role}</span>
        </div>
      </div>

      <UpdatePassword />
    </div>
  );
};

export default AdminProfile;
