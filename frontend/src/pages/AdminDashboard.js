import React, { useEffect, useState } from 'react';
import { adoptionAPI, petsAPI } from '../api/api';

const AdminDashboard = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [requestsResponse, petsResponse] = await Promise.all([
          adoptionAPI.getAllRequests(),
          petsAPI.getAll()
        ]);
        setAdoptionRequests(requestsResponse.data);
        setPets(petsResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await adoptionAPI.updateRequestStatus(requestId, newStatus);
      // Update the local state
      setAdoptionRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus }
            : request
        )
      );
    } catch (err) {
      console.error('Error updating request status:', err);
      alert('Failed to update request status. Please try again.');
    }
  };

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
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading admin dashboard...</p>
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
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-cog me-2"></i>
            Admin Dashboard
          </h2>
          
          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4" id="adminTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => setActiveTab('requests')}
                type="button"
              >
                <i className="fas fa-clipboard-list me-2"></i>
                Adoption Requests ({adoptionRequests.length})
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'pets' ? 'active' : ''}`}
                onClick={() => setActiveTab('pets')}
                type="button"
              >
                <i className="fas fa-paw me-2"></i>
                All Pets ({pets.length})
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Adoption Requests Tab */}
            {activeTab === 'requests' && (
              <div className="tab-pane fade show active">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-clipboard-list me-2"></i>
                      Adoption Requests
                    </h5>
                  </div>
                  <div className="card-body">
                    {adoptionRequests.length === 0 ? (
                      <p className="text-muted">No adoption requests found.</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Pet</th>
                              <th>Message</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adoptionRequests.map((request) => (
                              <tr key={request.id}>
                                <td>
                                  <strong>{request.user.username}</strong>
                                  <br />
                                  <small className="text-muted">{request.user.email}</small>
                                </td>
                                <td>
                                  <strong>{request.pet.name}</strong>
                                  <br />
                                  <small className="text-muted">{request.pet.type} - {request.pet.breed}</small>
                                </td>
                                <td>
                                  <div style={{ maxWidth: '200px' }}>
                                    {request.message}
                                  </div>
                                </td>
                                <td>
                                  {getStatusBadge(request.status)}
                                </td>
                                <td>
                                  {new Date(request.created_at).toLocaleDateString()}
                                </td>
                                <td>
                                  {request.status === 'pending' && (
                                    <div className="btn-group" role="group">
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleStatusUpdate(request.id, 'approved')}
                                      >
                                        <i className="fas fa-check me-1"></i>
                                        Approve
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                      >
                                        <i className="fas fa-times me-1"></i>
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                  {request.status !== 'pending' && (
                                    <small className="text-muted">
                                      {request.status === 'approved' ? 'Approved' : 'Rejected'}
                                    </small>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Pets Tab */}
            {activeTab === 'pets' && (
              <div className="tab-pane fade show active">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-paw me-2"></i>
                      All Pets
                    </h5>
                  </div>
                  <div className="card-body">
                    {pets.length === 0 ? (
                      <p className="text-muted">No pets found.</p>
                    ) : (
                      <div className="row">
                        {pets.map((pet) => (
                          <div key={pet.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100">
                              <img 
                                src={pet.photo || 'https://via.placeholder.com/300x200?text=Pet+Photo'} 
                                className="card-img-top" 
                                alt={pet.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                              <div className="card-body">
                                <h6 className="card-title">{pet.name}</h6>
                                <p className="card-text">
                                  <small className="text-muted">
                                    <strong>Type:</strong> {pet.type}<br />
                                    <strong>Breed:</strong> {pet.breed}<br />
                                    <strong>Age:</strong> {pet.age} years<br />
                                    <strong>Added by:</strong> {pet.user ? pet.user.username : 'Unknown'}
                                  </small>
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className={`badge bg-${pet.purpose === 'adoption' ? 'success' : pet.purpose === 'sale' ? 'warning' : 'info'}`}>
                                    {pet.purpose}
                                  </span>
                                  <small className="text-muted">
                                    {new Date(pet.created_at).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 