import { toast } from 'react-toastify';
import { axiosInstace } from './axios';
import getCsrf from './csrf';

export const downloadCsv = async (data, setDownloading) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    const csrf = (await getCsrf()) || null;
    if (!pathVariable || !requestBody) {
        console.error('Download error, pathvariable and request body cannot be null');
        return;
    }
    if (!csrf) {
        console.error('Download error, csrf token cannot be null');
        return;
    }
    try {
        setDownloading(true);
        const response = await axiosInstace.post(
            `/user/download/csv/${pathVariable}`,
            requestBody,
            {
                headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrf },
                responseType: 'blob',
            },
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${pathVariable}.csv`);
        document.body.appendChild(link);
        link.click();
        setDownloading(false);
        toast('Report downloaded', { type: 'success' });
    } catch (error) {
        console.error(error?.message || 'Download error');
        setDownloading(false);
        toast('Download failed', { type: 'error' });
    } finally {
        setDownloading(false);
    }
};
