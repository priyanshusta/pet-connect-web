import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { petsAPI } from '../api/api';

const AddPet = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    type: '',
    age: '',
    breed: '',
    description: '',
    purpose: 'adoption',
    gender: 'unknown',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await petsAPI.addPet(formData);
      setSuccess(true);
      setTimeout(() => navigate('/pets'), 1500);
    } catch (err) {
      setError('Failed to add pet. Please try again.');
      console.error('Error adding pet:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-success text-white text-center">
              <h3><i className="fas fa-plus-circle me-2"></i>Add a New Pet</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Pet Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter pet name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Type *</label>
                    <select 
                      className="form-select" 
                      name="type" 
                      value={form.type} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="fish">Fish</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Age (years) *</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="age" 
                      value={form.age} 
                      onChange={handleChange} 
                      required 
                      min="0" 
                      max="30"
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Breed *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="breed" 
                      value={form.breed} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter breed"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Gender</label>
                    <select 
                      className="form-select" 
                      name="gender" 
                      value={form.gender} 
                      onChange={handleChange}
                    >
                      <option value="unknown">Unknown</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Purpose *</label>
                    <select 
                      className="form-select" 
                      name="purpose" 
                      value={form.purpose} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="adoption">Adoption</option>
                      <option value="sale">Sale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-bold">Description *</label>
                    <textarea 
                      className="form-control" 
                      name="description" 
                      value={form.description} 
                      onChange={handleChange} 
                      required 
                      rows="4"
                      placeholder="Describe the pet's personality, health, and any special needs..."
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-bold">Photo *</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      name="photo" 
                      accept="image/*" 
                      onChange={handleChange} 
                      required 
                    />
                    <small className="text-muted">Upload a clear photo of the pet (JPG, PNG, GIF)</small>
                  </div>
                </div>
                
                {error && (
                  <div className="alert alert-danger mt-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success mt-3">
                    <i className="fas fa-check-circle me-2"></i>
                    Pet added successfully! Redirecting to pets list...
                  </div>
                )}
                
                <div className="d-grid gap-2 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Pet...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus-circle me-2"></i>
                        Add Pet
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary" 
                    onClick={() => navigate('/pets')}
                    disabled={loading}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Pets
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPet;