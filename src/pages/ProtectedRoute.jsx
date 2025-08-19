// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isValidNavigation } from '../pages/navigationGuard';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role } = useSelector(state => state.user);
  const location = useLocation();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has required role (if specified)
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check if navigation was valid
  if (!isValidNavigation()) {
    // Clear the flag to prevent redirect loops
    sessionStorage.removeItem('validNavigation');
    
    // Redirect to dashboard based on role
    if (role === 'academy') {
      return <Navigate to="/aca_dashboard" replace />;
    } else if (role === 'cooperative') {
      return <Navigate to="/dashboard" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;