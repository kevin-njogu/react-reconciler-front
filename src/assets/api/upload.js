import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstace } from './axios';

const upload = async (formData) => {
    try {
        const response = await axiosInstace.post('/user/upload/statement', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        // console.log("Upload successful", response?.data)
        return response?.data;
    } catch (error) {
        console.error(error.message);
        toast('File upload error ' + error.message, { type: 'error' });
    }
};

export const useUpload = () => {
    const { isPending: isUploading, mutate: uploadFile } = useMutation({
        mutationFn: (formData) => upload(formData),
        onSuccess: (data) => {
            toast(data?.message, { type: 'success' });
        },
        onError: (error) => {
            console.error(error.message);
            toast('Failed to upload', { type: 'error' });
        },
    });
    return { isUploading, uploadFile };
};
