import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const JobPostingForm = ({ onSubmit, job }) => {
  const [formData, setFormData] = useState(job || {
    title: '',
    category: '',
    description: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <InputField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
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
          required
        />
      </div>
      
      <div>
        <InputField
          label="Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          type="number"
          required
        />
      </div>
      
      <Button type="submit" variant="primary">
        {job ? 'Update Job' : 'Post Job'}
      </Button>
    </form>
  );
};

export default JobPostingForm ;
