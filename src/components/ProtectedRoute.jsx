import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Tampilkan loading spinner atau halaman kosong selagi cek token
        return <div>Loading...</div>;
    }

    if (!token) {
        // Jika tidak ada token, arahkan ke halaman login
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
