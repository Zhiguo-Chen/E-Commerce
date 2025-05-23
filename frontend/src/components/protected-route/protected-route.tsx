import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const authTokenKey = process.env.REACT_APP_AUTH_TOKEN || 'authToken';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem(authTokenKey); // Or use a context/global state for authentication

  if (!isAuthenticated) {
    return <Navigate to="/main/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
