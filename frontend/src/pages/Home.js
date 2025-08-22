import React from 'react';
import { Link } from 'react-router-dom';
import birdImg from '../Photo/bird.webp';
import catImg from '../Photo/cat.webp';
import dogImg from '../Photo/dog.webp';
import fishImg from '../Photo/fish.webp';
import rabbitImg from '../Photo/rabbit.jpeg';

const Home = () => {
  const petCategories = [
    { name: 'Cats', image: catImg, link: '/pets?type=cat' },
    { name: 'Dogs', image: dogImg, link: '/pets?type=dog' },
    { name: 'Birds', image: birdImg, link: '/pets?type=bird' },
    { name: 'Rabbits', image: rabbitImg, link: '/pets?type=rabbit' },
    { name: 'Fish', image: fishImg, link: '/pets?type=fish' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-center py-5 position-relative">
        {/* Background Illustration */}
        <div className="hero-background">
          <div className="floating-pets">
            <i className="fas fa-paw pet-float-1"></i>
            <i className="fas fa-bone pet-float-2"></i>
            <i className="fas fa-dog pet-float-3"></i>
            <i className="fas fa-cat pet-float-4"></i>
            <i className="fas fa-heart pet-float-5"></i>
          </div>
        </div>
        
        <div className="container position-relative z-2">
          <h1 className="display-4 fw-bold mb-4">
            <span className="text-dark">Find Your Perfect</span>
            <br />
            <span className="text-warning">Pet Companion</span>
          </h1>
          <p className="lead mb-5 text-muted">
            Connect with loving pet owners, discover adorable pets looking for homes, and join a community that celebrates the bond between humans and animals.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-5">
            <Link to="/pets" className="btn btn-success btn-lg px-4 py-3 shadow hero-btn">
              <i className="fas fa-search me-2 btn-icon"></i>
              Browse Pets
            </Link>
            <Link to="/register" className="btn btn-outline-secondary btn-lg px-4 py-3 shadow hero-btn">
              <i className="fas fa-users me-2 btn-icon"></i>
              Join Community
            </Link>
          </div>
        </div>
      </div>

      {/* Pet Categories Section */}
      <div className="pet-categories-section py-5">
        <div className="container">
          <h3 className="text-center mb-5">Explore Pet Categories</h3>
          <div className="row justify-content-center">
            {petCategories.map((category, index) => (
              <div key={index} className="col-md-2 col-4 col-6 mb-4 text-center">
                <Link to={category.link} className="text-decoration-none">
                  <div className="pet-category-circle">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="pet-category-img"
                    />
                    <div className="pet-category-overlay">
                      <span className="pet-category-text">{category.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #FFF8F0 0%, #FAFAFA 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          z-index: 1;
        }
        
        .floating-pets {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .pet-float-1, .pet-float-2, .pet-float-3, .pet-float-4, .pet-float-5 {
          position: absolute;
          font-size: 3rem;
          color:rgb(91, 215, 60);
          animation: float 6s ease-in-out infinite;
        }
        
        .pet-float-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .pet-float-2 { top: 30%; right: 15%; animation-delay: 1s; }
        .pet-float-3 { bottom: 25%; left: 20%; animation-delay: 2s; }
        .pet-float-4 { bottom: 15%; right: 25%; animation-delay: 3s; }
        .pet-float-5 { top: 50%; left: 50%; animation-delay: 4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .hero-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .hero-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .hero-btn:hover .btn-icon {
          transform: translateX(5px);
        }
        
        .btn-icon {
          transition: transform 0.3s ease;
        }
        
        .btn-success {
          background-color: #00C897;
          border-color: #00C897;
          color: white;
        }
        
        .btn-success:hover {
          background-color: #00B386;
          border-color: #00B386;
          color: white;
        }
        
        .pet-categories-section {
          background-color: #FFF8F0;
        }
        
        .pet-category-circle {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .pet-category-circle:hover {
          transform: scale(1.15) translateY(-5px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.2);
        }
        
        .pet-category-circle:hover .pet-category-text {
          color: #444444;
        }
        
        .pet-category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .pet-category-circle:hover .pet-category-img {
          transform: scale(1.1);
        }
        
        .pet-category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(255,255,255,0.9));
          color: #444444;
          padding: 15px 5px 8px;
          font-size: 12px;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .pet-category-text {
          display: block;
          text-align: center;
          transition: color 0.3s ease;
        }
        
        .z-2 {
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default Home;