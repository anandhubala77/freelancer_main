import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const QuotationForm = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    completionTime: '',
    message: ''
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
    onSubmit({
      ...formData,
      jobId: job.id
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputField
          label="Bid Amount"
          name="bidAmount"
          value={formData.bidAmount}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div>
        <InputField
          label="Estimated Completion Time (days)"
          name="completionTime"
          value={formData.completionTime}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div>
        <InputField
          label="Message to Employer"
          name="message"
          value={formData.message}
          onChange={handleChange}
          type="textarea"
          required
        />
      </div>

      <Button type="submit" variant="primary">
        Submit Quotation
      </Button>
    </form>
  );
};

export { QuotationForm };
