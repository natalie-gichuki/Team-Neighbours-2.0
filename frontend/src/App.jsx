import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Contributions from './pages/Contributions';
import ContributionsList from './pages/Admin/ContributionsList';

// Route guard component to protect routes that require authentication
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        {/*Public routes*/}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/*Protected routes*/}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["member", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* MEMBER CONTRIBUTIONS */}
        <Route
          path="/my-contributions"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <Contributions />
            </ProtectedRoute>
          }
        />

        {/* ADMIN CONTRIBUTIONS */}

        <Route
          path="/admin/contributions"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ContributionsList />
            </ProtectedRoute>
          }
        />

        {/*Fallback route*/}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App;
