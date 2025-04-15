// AllEntertainers.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EntertainerAddForm from './EntertainerAddForm';
import { Entertainer } from '../../types/entertainer';

function AllEntertainers() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  useEffect(() => {
    const fetchEntertainers = async () => {
      try {
        const response = await fetch(
          'http://localhost:5142/api/entertainer/AllEntertainers'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntertainers(data);
      } catch (error) {
        console.error('Error fetching entertainers:', error);
      }
    };

    fetchEntertainers();
  }, []);

  const handleEntertainerAdded = () => {
    const fetchEntertainers = async () => {
      try {
        const response = await fetch(
          'http://localhost:5142/api/entertainer/AllEntertainers'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntertainers(data);
      } catch (error) {
        console.error('Error fetching entertainers:', error);
      }
    };

    fetchEntertainers();
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1>Entertainers</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add a new entertainer
        </button>
      </div>

      {showForm && (
        <EntertainerAddForm
          onSuccess={handleEntertainerAdded}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="row">
        {entertainers.map((e, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card h-100">
              <h3 className="card-title p-3">{e.entStageName}</h3>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <strong>Bookings: </strong> {e.numberOfBookings}
                  </li>
                  <li>
                    <strong>Last Booking: </strong>{' '}
                    {e.lastBookingDate ? e.lastBookingDate : 'No bookings yet'}
                  </li>
                  <br />
                  <button
                    className="btn btn-info w-100"
                    onClick={() => navigate(`/Details/${e.entertainerId}`)}
                  >
                    View Details
                  </button>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEntertainers;
