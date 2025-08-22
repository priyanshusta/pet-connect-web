import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  login: (credentials) => api.post('/token/', credentials),
  register: (userData) => api.post('/register/', userData),
  getProfile: () => api.get('/profile/'),
  updateProfile: (userData) => api.put('/profile/', userData),
};

export const petsAPI = {
  getAll: () => api.get('/pets/'),
  getById: (id) => api.get(`/pets/${id}/`),
  addPet: (formData) => api.post('/pets/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updatePet: (id, formData) => api.put(`/pets/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deletePet: (id) => api.delete(`/pets/${id}/`),
  getUserPets: () => api.get('/pets/my-pets/'),  // This is correct as it's handled by the router
};

export const adoptionAPI = {
  create: (data) => api.post('/adoption-requests/', data),
  getUserRequests: () => api.get('/adoption-requests/my-adoption-requests/'),  // Fixed endpoint
  getAllRequests: () => api.get('/adoption-requests/'),
  updateRequestStatus: (requestId, status) => api.put(`/admin/adoption-requests/${requestId}/`, { status }),
};

export const galleryAPI = {
  getAll: () => api.get('/gallery/'),
  upload: (formData) => api.post('/gallery/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api; 