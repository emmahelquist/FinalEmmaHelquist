import React, { useEffect, useState } from 'react';
import { Entertainer } from '../../types/entertainer';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEntertainer } from '../api/EntertainerAPI'; // Import the update API

function EntertainerDetails() {
  const { id } = useParams<{ id: string }>();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5142/api/entertainer/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch entertainer');
        }
        const data = await response.json();
        setEntertainer(data);
      } catch (error) {
        console.error('Error fetching entertainer:', error);
      }
    };

    if (id) {
      fetchEntertainer();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (entertainer) {
      try {
        await updateEntertainer(entertainer.entertainerId, entertainer);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating entertainer:', error);
        alert('Failed to update entertainer. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (entertainer) {
      setEntertainer({ ...entertainer, [e.target.name]: e.target.value });
    }
  };

  if (!entertainer) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{entertainer.entStageName} - Details</h2>
      <ul className="list-unstyled">
        {/* ... (your existing list items) ... */}
        <li className="mb-2">
          <strong>Address:</strong>
          {isEditing ? (
            <input
              type="text"
              name="entStreetAddress"
              value={entertainer.entStreetAddress}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            ` ${entertainer.entStreetAddress}, ${entertainer.entCity}, ${entertainer.entState} ${entertainer.entZipCode}`
          )}
        </li>
        <li className="mb-2">
          <strong>Phone:</strong>
          {isEditing ? (
            <input
              type="text"
              name="entPhoneNumber"
              value={entertainer.entPhoneNumber}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            ` ${entertainer.entPhoneNumber}`
          )}
        </li>
        {/* ... (other list items similarly) ... */}
      </ul>
      <div className="mt-4">
        {isEditing ? (
          <>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger me-2">Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EntertainerDetails;
