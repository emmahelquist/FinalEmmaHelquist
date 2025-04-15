import React, { useEffect, useState } from 'react';
import { Entertainer } from '../../types/entertainer';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEntertainer } from '../api/EntertainerAPI';

function EntertainerDetails() {
  const { id } = useParams<{ id: string }>();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const navigate = useNavigate();

  // Fetch entertainer details when the component mounts or when the id changes
  // Use async/await for cleaner code
  // Use try/catch for error handling
  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5142/api/entertainer/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntertainer(data);
      } catch (error) {
        console.error('Error fetching entertainer details:', error);
      }
    };

    if (id) {
      fetchEntertainer();
    }
  }, [id]);

  // Function to handle deletion of entertainer
  const handleDelete = async () => {
    if (
      entertainer &&
      window.confirm(
        `Are you sure you want to delete ${entertainer.entStageName}?`
      )
    ) {
      try {
        if (entertainer.entertainerId) {
          await deleteEntertainer(entertainer.entertainerId);
          navigate('/AllEntertainers');
        }
      } catch (error) {
        console.error('Error deleting entertainer:', error);
        alert('Failed to delete entertainer. Please try again.');
      }
    }
  };

  if (!entertainer) return <p>Loading...</p>;

  // Check if entertainer is null or undefined
  return (
    <div className="container mt-4">
      <h2 className="mb-4">{entertainer.entStageName} - Details</h2>
      <ul className="list-unstyled">
        <li className="mb-2">
          <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
          {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
        </li>
        <li className="mb-2">
          <strong>Phone:</strong> {entertainer.entPhoneNumber}
        </li>
        <li className="mb-2">
          <strong>Email:</strong> {entertainer.entEMailAddress ?? 'N/A'}
        </li>
        <li className="mb-2">
          <strong>Web Page:</strong> {entertainer.entWebPage ?? 'N/A'}
        </li>
        <li className="mb-2">
          <strong>Date Entered:</strong> {entertainer.dateEntered}
        </li>
        <li className="mb-2">
          <strong>Total Bookings:</strong> {entertainer.numberOfBookings}
        </li>
        <li className="mb-2">
          <strong>Last Booking Date:</strong>{' '}
          {entertainer.lastBookingDate ?? 'No bookings yet'}
        </li>
      </ul>
      <div className="mt-4">
        <button className="btn btn-danger me-2" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate(`/Edit/${entertainer.entertainerId}`)}
        >
          Edit
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default EntertainerDetails;
