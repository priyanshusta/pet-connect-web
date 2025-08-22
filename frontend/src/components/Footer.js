import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-gradient text-center text-white py-5 mt-auto">
    <div className="container">
      <div className="row mb-4 text-start text-md-center">
        {/* Contact */}
        <div className="col-md-4 mb-4 mb-md-0">
          <h5 className="fw-bold mb-3">📞 Contact Us</h5>
          <p className="mb-2"><i className="fas fa-map-marker-alt me-2 text-warning"></i>AHM LJU GP</p>
          <p className="mb-2"><i className="fas fa-phone me-2 text-warning"></i>+91 98255 05854</p>
          <p><i className="fas fa-envelope me-2 text-warning"></i>pc@petconnect.in</p>
        </div>

        {/* Quick Links */}
        <div className="col-md-4 mb-4 mb-md-0">
          <h5 className="fw-bold mb-3">🚀 Quick Links</h5>
          <div className="d-flex flex-column gap-2 align-items-md-center">
            <Link to="/pets" className="footer-link">🐾 Pets</Link>
            <Link to="/gallery" className="footer-link">📸 Gallery</Link>
            <Link to="/add-pet" className="footer-link">➕ Add Pet</Link>
          </div>
        </div>

        {/* Social */}
        <div className="col-md-4">
          <h5 className="fw-bold mb-3">🌐 Follow Us</h5>
          <div className="d-flex justify-content-md-center gap-4">
            <a href="https://instagram.com/petconnect" target="_blank" rel="noopener noreferrer">instagram
              <i className="fab fa-instagram fa-2x social-icon"></i>
            </a>
            <a href="https://youtube.com/petconnect" target="_blank" rel="noopener noreferrer">youtube
              <i className="fab fa-youtube fa-2x social-icon"></i>
            </a>
            <a href="https://facebook.com/petconnect" target="_blank" rel="noopener noreferrer">facebook
              <i className="fab fa-facebook fa-2x social-icon"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-light" />

      {/* Copyright */}
      <div className="text-center small">
        &copy; {new Date().getFullYear()} <strong>PetConnect</strong>. All rights reserved.
      </div>
    </div>

    <style>{`
      .footer-gradient {
        background: linear-gradient(135deg,rgb(9, 17, 65),rgb(8, 17, 60));
      }

      .footer-link {
        color: white;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .footer-link:hover {
        color: #FFDAB9;
        transform: translateX(5px);
      }

      .social-icon {
        color: white;
        transition: all 0.3s ease;
      }

      .social-icon:hover {
        transform: scale(1.2);
        color: #FFDAB9;
      }

      @media (max-width: 767px) {
        .footer-link {
          text-align: center;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
