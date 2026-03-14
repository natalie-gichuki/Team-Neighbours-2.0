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
import MemberList from './pages/Admin/MemberList';
import AttendanceList from './pages/Admin/AttendanceList';
import Attendances from './pages/Attendance';
import FineList from './pages/Admin/FinesList';
import Fine from './pages/Fines';

import MemberLoans from './pages/Loans';
import AdminLoanList from './pages/Admin/LoansList';

import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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

        {/* ADMIN MEMBERS */}
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MemberList />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ATTENDANCE */}
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AttendanceList />
            </ProtectedRoute>
          }
        />

        {/* MEMBER ATTENDANCE */}
        <Route
          path="/my-attendance"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <Attendances />
            </ProtectedRoute>
          }
        />

        {/*ADMIN FINES*/}
        <Route
          path="/admin/fine"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FineList />
            </ProtectedRoute>
          }
        />

        {/*MEMBER FINES*/}
        <Route
          path="/my-fines"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <Fine />
            </ProtectedRoute>
          }
        />

        {/*ADMIN LOANS*/}
        <Route
          path="/admin/loan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLoanList />
            </ProtectedRoute>
          }
        />

        {/*MEMBER LOANS*/}
        <Route
          path="my-loans"
          element={
            <ProtectedRoute allowedRoles={["member"]}>
              <MemberLoans />
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
