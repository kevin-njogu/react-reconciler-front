import { toast } from 'react-toastify';
import { axiosInstace } from './axios';
import getCsrf from './csrf';
import Cookies from 'js-cookie';

export const upload = async (formData, setLoading) => {
    const csrf = (await getCsrf()) || null;
    if (!csrf) {
        console.error('Reconciloation error, csrf token cannot be null');
        return;
    }

    try {
        setLoading(true);
        const response = await axiosInstace.post('/user/upload/statement', formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'X-XSRF-TOKEN': csrf },
            withCredentials: true,
        });
        toast('Upload successfull', { type: 'success' });
        setLoading(false);
        return response;
    } catch (error) {
        console.error(error?.message || 'Upload error');
        console.error(error || 'Upload error');
        setLoading(false);
        toast('Upload error', { type: 'error' });
    } finally {
        setLoading(false);
    }
};
