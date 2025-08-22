import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuthenticated = localStorage.getItem('token');

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setIsAdmin(response.data.is_staff);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // If token is invalid, remove it
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, fetchUserProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#ff8c00'}}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-paw me-2"></i>
          PetConnect
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pets">Browse Pets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-pet">
                    <i className="fas fa-plus me-1"></i>
                    Add Pet
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="fas fa-cog me-1"></i>
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn" 
                  data-bs-toggle="dropdown"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <i className="fas fa-user me-1"></i>
                  {user ? user.username : 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user-edit me-2"></i>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-pets">
                      <i className="fas fa-paw me-2"></i>
                      My Pets
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus me-1"></i>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 