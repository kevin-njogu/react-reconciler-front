import { toast } from 'react-toastify';
import { axiosInstace } from './axios';
import getCsrf from './csrf';

export const upload = async (formData, setLoading) => {
    const csrf = (await getCsrf()) || null;
    if (!csrf) {
        console.error('Download error, csrf token cannot be null');
        return;
    }
    try {
        setLoading(true);
        const response = await axiosInstace.post('/user/upload/statement', formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'X-XSRF-TOKEN': csrf },
        });
        toast('Upload successfull', { type: 'success' });
        setLoading(false);
        return response;
    } catch (error) {
        console.error(error?.message || 'Upload error');
        setLoading(false);
        toast('Upload error', { type: 'error' });
    } finally {
        setLoading(false);
    }
};
