import { axiosInstace } from './axios';
import { toast } from 'react-toastify';
import { loginUser, logoutUser } from '../store/authSlice';
import { toaster } from '@/components/ui/toaster';

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
        localStorage.setItem('user', apiResponse?.username);
        localStorage.setItem('token', apiResponse?.token);
        dispatch(loginUser(apiResponse));
        setLoading(false);
        toaster.create({ description: 'Login successfull', type: 'success' });
        navigate('/reconciliation');
        return response;
    } catch (error) {
        console.error(error || 'Login Error');
        setLoading(false);
        toaster.create({ description: error?.response?.data, type: 'error' });
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigate('/login');
        toaster.create({ description: 'Logged out', type: 'success' });
        return response;
    } catch (error) {
        console.error(error?.message || 'Logout error');
        toaster.create({ description: 'Logout failed', type: 'error' });
    }
};
