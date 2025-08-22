import React, { useEffect, useState } from 'react';
import { galleryAPI } from '../api/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadForm, setUploadForm] = useState({ image: null, caption: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      setGallery(response.data);
    } catch (err) {
      setError('Failed to fetch gallery images. Please try again later.');
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setUploadForm({
      ...uploadForm,
      image: e.target.files[0]
    });
  };

  const handleCaptionChange = (e) => {
    setUploadForm({
      ...uploadForm,
      caption: e.target.value
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.image || !uploadForm.caption) {
      setUploadError('Please select an image and provide a caption.');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      
      const formData = new FormData();
      formData.append('image', uploadForm.image);
      formData.append('caption', uploadForm.caption);
      
      await galleryAPI.upload(formData);
      
      setUploadForm({ image: null, caption: '' });
      fetchGallery(); // Refresh gallery
      alert('Image uploaded successfully!');
    } catch (err) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading gallery...</p>
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
    <div>
      <h2 className="mb-4">Photo Gallery</h2>
      
      {isAuthenticated && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>Upload New Image</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpload}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Select Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="caption" className="form-label">
                      Caption
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="caption"
                      value={uploadForm.caption}
                      onChange={handleCaptionChange}
                      placeholder="Enter image caption..."
                      required
                    />
                  </div>
                </div>
              </div>
              
              {uploadError && (
                <div className="alert alert-danger" role="alert">
                  {uploadError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <div className="row">
        {gallery.map((item) => (
          <div key={item.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.caption}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Gallery+Image';
                }}
              />
              <div className="card-body">
                <p className="card-text">{item.caption}</p>
                <small className="text-muted">
                  {new Date(item.uploaded_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {gallery.length === 0 && (
        <div className="text-center">
          <p className="text-muted">No images in the gallery yet.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery; 