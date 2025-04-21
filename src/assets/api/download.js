import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstace } from './axios';

const download = async (data) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    //console.log(requestBody);
    if (!pathVariable || !requestBody) {
        toast('Download failed', { type: 'error' });
    }
    //console.log(data);
    try {
        const response = await axiosInstace.post(
            `/user/download/csv/${pathVariable}`,
            requestBody,
            { headers: { 'Content-Type': 'application/json' }, responseType: 'blob' },
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${pathVariable}.csv`);
        document.body.appendChild(link);
        link.click();
        //console.log("Download successful", response?.data)
    } catch (error) {
        console.error('Upload error', error);
    }
};

export const useDownload = () => {
    const { isPending: isDownloding, mutate: downloadCsv } = useMutation({
        mutationFn: (data) => download(data),
        onSuccess: () => {
            toast('Dowload successful', { type: 'success' });
        },
        onError: (error) => {
            console.error(error);
            toast('Download failed', { type: 'error' });
        },
    });
    return { isDownloding, downloadCsv };
};
