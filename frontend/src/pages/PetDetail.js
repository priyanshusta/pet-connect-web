import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionAPI, petsAPI } from '../api/api';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adoptionForm, setAdoptionForm] = useState({ message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const response = await petsAPI.getById(id);
        setPet(response.data);
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
        console.error('Error fetching pet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();
    
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      
      await adoptionAPI.create({
        pet_id: pet.id,
        message: adoptionForm.message
      });
      
      alert('Adoption request submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      setSubmitError('Failed to submit adoption request. Please try again.');
      console.error('Error submitting adoption request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading pet details...</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="alert alert-danger" role="alert">
        {error || 'Pet not found.'}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <img 
          src={pet.photo} 
          className="img-fluid rounded" 
          alt={pet.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Pet+Photo';
          }}
        />
      </div>
      
      <div className="col-md-6">
        <h2>{pet.name}</h2>
        <div className="mb-3">
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age} years old</p>
          <p><strong>Description:</strong></p>
          <p>{pet.description}</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Adoption Request</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleAdoptionSubmit}>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Why would you like to adopt {pet.name}?
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  value={adoptionForm.message}
                  onChange={(e) => setAdoptionForm({ message: e.target.value })}
                  placeholder="Tell us about your interest in adopting this pet..."
                  required
                />
              </div>
              
              {submitError && (
                <div className="alert alert-danger" role="alert">
                  {submitError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Adoption Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail; 