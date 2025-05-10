import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
    const navigate = useNavigate();

    function isTokenExpired(tkn) {
        try {
            const decoded = jwtDecode(tkn);
            console.log(decoded);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            console.error('Invalid token:', error);
            return true;
        }
    }

    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
        navigate('/login');
    }

    return <Outlet />;
};

export default PrivateRoute;
