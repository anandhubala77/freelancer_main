import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.profile ? `/${user.profile}` : null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!image) {
      toast.warning("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profile", image);

    dispatch(uploadProfileImage(formData))
      .unwrap()
      .then(() => toast.success("Profile image uploaded successfully"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Profile Image</h3>
      <div className="flex items-center gap-4">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover border"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
