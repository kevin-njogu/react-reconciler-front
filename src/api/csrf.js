import { axiosInstace } from './axios';

export const getCsrf = async () => {
    let csrf;
    try {
        const csrfResponse = await axiosInstace.get(`/auth/csrf`);
        csrf = csrfResponse?.data?.token;
        return csrf;
    } catch (error) {
        console.error(error?.message || 'Error fetching csrf');
        return null;
    }
};

export default getCsrf;
