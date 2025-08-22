import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AddPet from './pages/AddPet';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPets from './pages/MyPets';
import PetDetail from './pages/PetDetail';
import PetList from './pages/PetList';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/pets/:id" element={<PetDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/my-pets" element={<ProtectedRoute><MyPets /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-pet" element={<ProtectedRoute><AddPet /></ProtectedRoute>} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
