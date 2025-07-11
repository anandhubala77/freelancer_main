import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadProfileImage } from "../store/slices/authSlice";

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleUpload = () => {
    if (!image) {
      toast.warning("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profile", image);

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      toast.error("Session expired or token missing. Please login again.");
      return;
    }

    dispatch(uploadProfileImage({ formData, token }))
      .unwrap()
      .then(() => toast.success("Profile image uploaded successfully!"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ProfileImageUpload;
