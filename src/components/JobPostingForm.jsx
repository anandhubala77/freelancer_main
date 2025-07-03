import React, { useState, useEffect } from 'react';
import InputField from './InputField'; // Handles text, textarea, number inputs
import Button from './Button';
import { useDispatch } from "react-redux";
import { createProject } from '../store/slices/projectSlice'; // ✅ Adjust path if needed



const JobPostingForm = ({ onSubmit, job }) => {
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    skillsRequired: '',
    timeline: '',
    location: '',
  });

  const [imageFile, setImageFile] = useState(null); // For file input
  const [imagePreview, setImagePreview] = useState(null); // For preview URL

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        category: job.category || '',
        description: job.description || '',
        budget: job.budget !== undefined && job.budget !== null ? String(job.budget) : '',
        skillsRequired: Array.isArray(job.skillsRequired) ? job.skillsRequired.join(', ') : '',
        timeline: job.timeline || '',
        location: job.location || '',
      });

      // If there's an image URL from backend
      if (job.image) {
        setImagePreview(job.image); // keep preview if editing
      }
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("budget", formData.budget);
    form.append("timeline", formData.timeline);
    form.append("location", formData.location);
  
    const skills = formData.skillsRequired
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    form.append("skillsRequired", skills.join(','));
  
    if (imageFile && imageFile instanceof File) {
      form.append("image", imageFile);
    } else {
      console.warn("❌ Invalid imageFile:", imageFile);
    }
  
    // Debugging output
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }
  
    dispatch(createProject(form)); // or your submit method
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="h-1/4 bg-white p-5 rounded-lg shadow-xl border border-gray-200 max-w-100 mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
        {job ? 'Edit Project Details' : 'Post a New Project'}
      </h2>

      <InputField
        label="Project Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Build a React Native Mobile App"
        required
      />

      <InputField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="e.g., Web Development, Mobile, Design"
        required
      />

      <InputField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        type="textarea"
        rows={4}
        placeholder="Provide a detailed description of your project."
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Budget (USD)"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          type="number"
          min="0"
          placeholder="e.g., 5000"
          required
        />

        <InputField
          label="Timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          placeholder="e.g., 2-4 weeks, Flexible"
        />
      </div>

      <InputField
        label="Skills Required (comma-separated)"
        name="skillsRequired"
        value={formData.skillsRequired}
        onChange={handleChange}
        placeholder="e.g., React, Node.js, MongoDB, UI/UX"
      />

      <InputField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., Remote, Kochi"
      />

      <div className="mt-4">
        <label className="block font-semibold text-gray-700 mb-2">
          Project Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded-md px-3 py-2 w-full text-sm"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 rounded-lg max-h-48 object-cover border"
          />
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full py-3 text-lg mt-6">
        {job ? 'Update Project' : 'Post Project'}
      </Button>
    </form>
  );
};

export default JobPostingForm;
