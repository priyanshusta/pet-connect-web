import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { petsAPI } from '../api/api';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [genderFilter, setGenderFilter] = useState(searchParams.get('gender') || '');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await petsAPI.getAll();
        setPets(response.data);
      } catch (err) {
        setError('Failed to fetch pets. Please try again later.');
        console.error('Error fetching pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (typeFilter) params.set('type', typeFilter);
    if (genderFilter) params.set('gender', genderFilter);
    setSearchParams(params);
  }, [search, typeFilter, genderFilter, setSearchParams]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearch('');
        break;
      case 'type':
        setTypeFilter('');
        break;
      case 'gender':
        setGenderFilter('');
        break;
      default:
        break;
    }
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = !search || (pet.name && pet.name.toLowerCase().includes(search.toLowerCase()));
    const matchesType = !typeFilter || (pet.type && pet.type.toLowerCase() === typeFilter.toLowerCase());
    const matchesGender = !genderFilter || (pet.gender && pet.gender.toLowerCase() === genderFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesGender;
  });

  const hasActiveFilters = search || typeFilter || genderFilter;

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading pets...</p>
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
    <div className="pet-list-container">
      {/* Search and Filter Section */}
      <div className="search-filter-section mb-4">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="search-box">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search pets..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select filter-select"
                value={typeFilter}
                onChange={handleTypeChange}
              >
                <option value="">All Types</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
                <option value="rabbit">Rabbit</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select filter-select"
                value={genderFilter}
                onChange={handleGenderChange}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearch('');
                  setTypeFilter('');
                  setGenderFilter('');
                }}
                disabled={!hasActiveFilters}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="active-filters mt-3">
              <div className="d-flex flex-wrap gap-2">
                {search && (
                  <span className="badge bg-success d-flex align-items-center">
                    Search: {search}
                    <button
                      className="btn-close btn-close-white ms-2"
                      onClick={() => removeFilter('search')}
                    ></button>
                  </span>
                )}
                {typeFilter && (
                  <span className="badge bg-primary d-flex align-items-center">
                    Type: {typeFilter}
                    <button
                      className="btn-close btn-close-white ms-2"
                      onClick={() => removeFilter('type')}
                    ></button>
                  </span>
                )}
                {genderFilter && (
                  <span className="badge bg-warning text-dark d-flex align-items-center">
                    Gender: {genderFilter}
                    <button
                      className="btn-close btn-close-white ms-2"
                      onClick={() => removeFilter('gender')}
                    ></button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="container mb-4">
        <h5 className="text-muted">
          {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''} found
        </h5>
      </div>

      {/* Pet Cards */}
      <div className="container">
        <div className="row">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="col-md-4 col-lg-3 mb-4">
              <div className="pet-card">
                <img 
                  src={pet.photo || 'https://via.placeholder.com/300x200?text=Pet+Photo'} 
                  className="pet-card-img" 
                  alt={pet.name || 'Pet'}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Pet+Photo';
                  }}
                />
                <div className="pet-card-body">
                  <h5 className="pet-card-title">
                    <i className={`fas fa-${pet.type && pet.type.toLowerCase().includes('dog') ? 'dog' : pet.type && pet.type.toLowerCase().includes('cat') ? 'cat' : 'paw'} me-2 text-success`}></i>
                    {pet.name || 'Unnamed Pet'}
                  </h5>
                  <p className="pet-card-text">
                    <strong>Type:</strong> {pet.type || 'Unknown'}<br />
                    <strong>Breed:</strong> {pet.breed || 'Unknown'}<br />
                    <strong>Age:</strong> {pet.age || 'Unknown'} years old<br />
                    <strong>Purpose:</strong> 
                    <span className={`badge ms-1 bg-${pet.purpose === 'adoption' ? 'success' : pet.purpose === 'sale' ? 'warning text-dark' : 'info'}`}>
                      {pet.purpose ? pet.purpose.charAt(0).toUpperCase() + pet.purpose.slice(1) : 'Unknown'}
                    </span>
                  </p>
                  <p className="pet-card-description">{pet.description || 'No description available.'}</p>
                  <Link to={`/pets/${pet.id}`} className="btn btn-success w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPets.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <p className="text-muted">No pets match your search criteria.</p>
          </div>
        )}
      </div>

      <style>{`
        .pet-list-container {
          background-color: #FAFAFA;
          min-height: 100vh;
          padding-top: 2rem;
        }
        
        .search-filter-section {
          background-color: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        
        .search-box {
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          z-index: 10;
        }
        
        .search-input {
          padding-left: 45px;
          border-radius: 25px;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          border-color: #00C897;
          box-shadow: 0 0 0 0.2rem rgba(0, 200, 151, 0.25);
        }
        
        .filter-select {
          border-radius: 25px;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .filter-select:focus {
          border-color: #00C897;
          box-shadow: 0 0 0 0.2rem rgba(0, 200, 151, 0.25);
        }
        
        .active-filters {
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 10px;
        }
        
        .pet-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .pet-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .pet-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .pet-card-body {
          padding: 1.5rem;
        }
        
        .pet-card-title {
          color: #333;
          margin-bottom: 1rem;
        }
        
        .pet-card-text {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .pet-card-description {
          color: #888;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }
        
        .btn-success {
          background-color: #00C897;
          border-color: #00C897;
          border-radius: 25px;
          transition: all 0.3s ease;
        }
        
        .btn-success:hover {
          background-color: #00B386;
          border-color: #00B386;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default PetList; 