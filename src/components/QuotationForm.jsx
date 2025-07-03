import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const QuotationForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    bidAmount: "",
    completionTime: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      jobId: job._id || job.id,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-blue-200"
    >
      <h3 className="text-2xl font-semibold text-blue-800 mb-4">
        Apply for: {job.title}
      </h3>

      <div>
        <InputField
          label="💰 Bid Amount"
          name="bidAmount"
          value={formData.bidAmount}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div>
        <InputField
          label="⏱ Estimated Completion Time (days)"
          name="completionTime"
          value={formData.completionTime}
          onChange={handleChange}
          type="number"
          required
        />
      </div>

      <div>
        <InputField
          label="📝 Message to Employer"
          name="message"
          value={formData.message}
          onChange={handleChange}
          type="textarea"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit Quotation
        </Button>
      </div>
    </form>
  );
};

export { QuotationForm };
