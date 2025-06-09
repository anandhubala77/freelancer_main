import React, { useState, useEffect } from 'react';
import InputField from './InputField'; // Assuming this handles text, textarea, number inputs
import Button from './Button';

const JobPostingForm = ({ onSubmit, job }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    skillsRequired: '',
    timeline: '',
    location: '',
  });

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
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : null,
      skillsRequired: formData.skillsRequired
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== ''),
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className=" h-1/4 bg-white p-5 rounded-lg shadow-xl border border-gray-200 
                 max-w-100 mx-auto" // Added max-width and auto margins for centering
    >
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
        {job ? 'Edit Project Details' : 'Post a New Project'}
      </h2>

      <div>
        <InputField
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Build a React Native Mobile App"
          required
        />
      </div>
      
      <div>
        {/* Consider using a <select> for category if you have fixed categories */}
        <InputField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Web Development, Mobile, Design"
          required
        />
      </div>
      
      <div>
        <InputField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          rows={4} // Reduced rows for less height
          placeholder="Provide a detailed description of your project, including scope, deliverables, and specific requirements."
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Used grid for horizontal layout */}
        <div>
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
        </div>

        <div>
          <InputField
            label="Timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g., 2-4 weeks, Flexible"
          />
        </div>
      </div>

      <div>
        <InputField
          label="Skills Required (comma-separated)"
          name="skillsRequired"
          value={formData.skillsRequired}
          onChange={handleChange}
          placeholder="e.g., React, Node.js, MongoDB, UI/UX"
        />
      </div>

      <div>
        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Remote, Kochi (On-site)"
        />
      </div>
      
      <Button type="submit" variant="primary" className="w-full py-3 text-lg mt-6">
        {job ? 'Update Project' : 'Post Project'}
      </Button>
    </form>
  );
};

export default JobPostingForm;