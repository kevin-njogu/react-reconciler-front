import { axiosInstace } from './axios';
import { toast } from 'react-toastify';
import { loginUser, logoutUser } from '../store/slices/authSlice';

export const login = async (data, setLoading, navigate, dispatch) => {
    if (!data) {
        return;
    }
    try {
        setLoading(true);
        const response = await axiosInstace.post(`/auth/signin`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        const apiResponse = response?.data;
        localStorage.setItem('auth', JSON.stringify(apiResponse));
        dispatch(loginUser(apiResponse));
        setLoading(false);
        toast('Login successfull', { type: 'success' });
        navigate('/reconciliation');
        return response;
    } catch (error) {
        console.error(error?.message || 'Login Error');
        setLoading(false);
        toast('Login failed', { type: 'error' });
    } finally {
        setLoading(false);
    }
};

export const signup = async (data, navigate, setLoading) => {
    if (!data) {
        return;
    }
    try {
        setLoading(true);
        const response = await axiosInstace.post(`/auth/signup`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false);
        toast('Registration successfull', { type: 'success' });
        navigate('/login');
        return response;
    } catch (error) {
        console.error(error?.message || 'signup error');
        setLoading(false);
        toast('Signup failed', { type: 'error' });
    } finally {
        setLoading(false);
    }
};

export const logout = async (navigate, dispatch) => {
    try {
        const response = await axiosInstace.post(`/auth/signout`);
        localStorage.removeItem('auth');
        dispatch(logoutUser());
        navigate('/login');
        toast('Logged out', { type: 'success' });
        return response;
    } catch (error) {
        console.error(error?.message || 'Logout error');
        toast('Logout failed', { type: 'error' });
    }
};
