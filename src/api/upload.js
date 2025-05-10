import { axiosInstace } from './axios';
import { toaster } from '@/components/ui/toaster';

export const upload = async (formData, setLoading) => {
    try {
        setLoading(true);
        const response = await axiosInstace.post('/user/upload/statement', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        toaster.create({ description: 'Upload successfull', type: 'success' });
        setLoading(false);
        return response;
    } catch (error) {
        console.error(error || 'Upload error');
        setLoading(false);
        toaster.create({ description: 'File upload failed', type: 'error' });
    } finally {
        setLoading(false);
    }
};
