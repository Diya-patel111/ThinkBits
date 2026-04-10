import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Show a styled loading state while verifying the JWT token
  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-on-surface-variant font-medium">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated (no token in localStorage)
  if (!token || (!loading && !user)) {
    // Preserve the intended location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based authorization guard
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;