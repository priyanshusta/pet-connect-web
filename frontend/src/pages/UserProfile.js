import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      setUser(response.data);
      setForm({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        email: response.data.email || '',
        username: response.data.username || ''
      });
    } catch (err) {
      setError('Failed to fetch user profile. Please try again later.');
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateSuccess(false);
    setError(null);

    try {
      await authAPI.updateProfile(form);
      setUpdateSuccess(true);
      setIsEditing(false);
      fetchUserProfile(); // Refresh user data
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile...</p>
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
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3>
                <i className="fas fa-user-edit me-2"></i>
                User Profile
              </h3>
            </div>
            <div className="card-body p-4">
              {!isEditing ? (
                // Display Mode
                <div>
                  <div className="text-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '80px', height: '80px' }}>
                      <i className="fas fa-user fa-2x"></i>
                    </div>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Username</label>
                      <p className="form-control-plaintext">{user.username}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email</label>
                      <p className="form-control-plaintext">{user.email}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">First Name</label>
                      <p className="form-control-plaintext">{user.first_name || 'Not provided'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Last Name</label>
                      <p className="form-control-plaintext">{user.last_name || 'Not provided'}</p>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Account Type</label>
                      <p className="form-control-plaintext">
                        {user.is_staff ? (
                          <span className="badge bg-danger">Administrator</span>
                        ) : (
                          <span className="badge bg-success">Regular User</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit Profile
                    </button>
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => navigate('/dashboard')}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="username" 
                        value={form.username} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="first_name" 
                        value={form.first_name} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="last_name" 
                        value={form.last_name} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  {updateSuccess && (
                    <div className="alert alert-success mt-3">
                      <i className="fas fa-check-circle me-2"></i>
                      Profile updated successfully!
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger mt-3">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div className="d-grid gap-2 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={() => setIsEditing(false)}
                      disabled={updateLoading}
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 