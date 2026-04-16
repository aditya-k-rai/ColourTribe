import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/adminAuthStore';

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useAdminAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // For initial load before checkAuth might have finished (if it was an async Firebase call)
  // Since it's sync sessionStorage here, isAuthenticated will be immediately true if logged in.
  const isAuth = window.sessionStorage.getItem('ct_admin_auth') === 'true' || isAuthenticated;

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
