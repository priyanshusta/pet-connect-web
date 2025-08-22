import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adoptionAPI } from '../api/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await adoptionAPI.getUserRequests();
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch your adoption requests. Please try again later.');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning',
      approved: 'bg-success',
      rejected: 'bg-danger'
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">My Dashboard</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>My Adoption Requests</h5>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p className="text-muted">You haven't submitted any adoption requests yet.</p>
              ) : (
                <div className="list-group">
                  {requests.map((request) => (
                    <div key={request.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{request.pet.name}</h6>
                          <p className="mb-1">
                            <strong>Pet:</strong> {request.pet.type} - {request.pet.breed}
                          </p>
                          <p className="mb-1">
                            <strong>Message:</strong> {request.message}
                          </p>
                          <small className="text-muted">
                            Submitted on: {new Date(request.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <div>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/pets')}
                >
                  Browse Pets
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/gallery')}
                >
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 