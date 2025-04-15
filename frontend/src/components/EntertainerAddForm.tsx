// EntertainerAddForm.tsx
import React, { useState } from 'react';
import { addEntertainer } from '../api/EntertainerAPI';
import { EntertainerAddRequest } from '../../types/entertainer'; // Correct import

interface EntertainerAddFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const EntertainerAddForm: React.FC<EntertainerAddFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<EntertainerAddRequest>({
    entertainerId: 0,
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntertainer(formData);
      onSuccess();
    } catch (error) {
      console.error('Error adding entertainer:', error);
      alert('Failed to add entertainer. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Entertainer</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Stage Name</label>
          <input
            type="text"
            name="entStageName"
            value={formData.entStageName}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">SSN</label>
          <input
            type="text"
            name="entSSN"
            value={formData.entSSN}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            name="entStreetAddress"
            value={formData.entStreetAddress}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="entCity"
            value={formData.entCity}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            name="entState"
            value={formData.entState}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            name="entZipCode"
            value={formData.entZipCode}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="entPhoneNumber"
            value={formData.entPhoneNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Web Page</label>
          <input
            type="text"
            name="entWebPage"
            value={formData.entWebPage || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="text"
            name="entEMailAddress"
            value={formData.entEMailAddress || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date Entered</label>
          <input
            type="text"
            name="dateEntered"
            value={formData.dateEntered}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Add Entertainer
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EntertainerAddForm;
