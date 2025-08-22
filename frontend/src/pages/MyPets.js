import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { petsAPI } from '../api/api';

const MyPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchMyPets();
  }, [navigate]);

  const fetchMyPets = async () => {
    try {
      setLoading(true);
      const response = await petsAPI.getUserPets();
      setPets(response.data);
    } catch (err) {
      setError('Failed to fetch your pets. Please try again later.');
      console.error('Error fetching my pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet? This action cannot be undone.')) {
      try {
        await petsAPI.deletePet(petId);
        setPets(prev => prev.filter(pet => pet.id !== petId));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert('Failed to delete pet. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your pets...</p>
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="fas fa-paw me-2 text-success"></i>
              My Pets
            </h2>
            <Link to="/add-pet" className="btn btn-success">
              <i className="fas fa-plus me-2"></i>
              Add New Pet
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '100px', height: '100px' }}>
                <i className="fas fa-paw fa-3x text-muted"></i>
              </div>
              <h4 className="text-muted">No pets yet</h4>
              <p className="text-muted">You haven't added any pets to your profile yet.</p>
              <Link to="/add-pet" className="btn btn-success">
                <i className="fas fa-plus me-2"></i>
                Add Your First Pet
              </Link>
            </div>
          ) : (
            <div className="row">
              {pets.map((pet) => (
                <div key={pet.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img 
                      src={pet.photo || 'https://via.placeholder.com/300x200?text=Pet+Photo'} 
                      className="card-img-top" 
                      alt={pet.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className={`fas fa-${pet.type && pet.type.toLowerCase().includes('dog') ? 'dog' : pet.type && pet.type.toLowerCase().includes('cat') ? 'cat' : 'paw'} me-2 text-success`}></i>
                        {pet.name}
                      </h5>
                      <p className="card-text">
                        <small className="text-muted">
                          <strong>Type:</strong> {pet.type || 'Unknown'}<br />
                          <strong>Breed:</strong> {pet.breed || 'Unknown'}<br />
                          <strong>Age:</strong> {pet.age || 'Unknown'} years old<br />
                          <strong>Gender:</strong> {pet.gender || 'Unknown'}<br />
                          <strong>Purpose:</strong> 
                          <span className={`badge ms-1 bg-${pet.purpose === 'adoption' ? 'success' : pet.purpose === 'sale' ? 'warning text-dark' : 'info'}`}>
                            {pet.purpose ? pet.purpose.charAt(0).toUpperCase() + pet.purpose.slice(1) : 'Unknown'}
                          </span>
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          {pet.description || 'No description available.'}
                        </small>
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Added: {new Date(pet.created_at).toLocaleDateString()}
                        </small>
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/pets/${pet.id}`} 
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="fas fa-eye me-1"></i>
                            View
                          </Link>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeletePet(pet.id)}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Link to="/dashboard" className="btn btn-outline-secondary">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPets; 