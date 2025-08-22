import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      console.log('Registration successful:', response.data);
      alert('Welcome to the Pet Pack! 🐾 Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error details:', err);

      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        if (status === 400) {
          if (data.username) {
            setError(`🐾 Username issue: ${data.username[0]}`);
          } else if (data.email) {
            setError(`📧 Email issue: ${data.email[0]}`);
          } else if (data.password) {
            setError(`🔐 Password issue: ${data.password[0]}`);
          } else {
            setError('Invalid registration data. Please check your info.');
          }
        } else if (status === 409) {
          setError('That pawfile already exists! 🐶 Try a different one.');
        } else {
          setError(`Registration failed (${status}). Try again soon!`);
        }
      } else if (err.request) {
        setError('🐾 Server not responding. Check your internet connection.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center" style={{ backgroundColor: '#fdf6f0', minHeight: '100vh', padding: '2rem' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm border-0" style={{ borderRadius: '20px' }}>
          <div className="card-header text-center bg-light" style={{ borderRadius: '20px 20px 0 0' }}>
            <h3 className="text-primary">🐾 Join the PetConnect Pack</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label" font='bold'>Pet Lover Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="e.g., HappyTail123"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="yourname@pets.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Create Paw-word</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="At least 6 characters"
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? 'Registering your pawfile...' : '🐾 Create Account'}
              </button>
            </form>

            <div className="text-center mt-3">
              <p>
                Already part of the pack?{' '}
                <Link to="/login" className="text-decoration-none">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
