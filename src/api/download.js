import { axiosInstace } from './axios';
import { toaster } from '@/components/ui/toaster';

export const downloadCsv = async (data, setDownloading) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    if (!pathVariable || !requestBody) {
        console.error('Download error, pathvariable and request body cannot be null');
        toaster.create({ description: 'Reconciliation failed', type: 'error' });
        return;
    }

    try {
        setDownloading(true);
        const response = await axiosInstace.post(
            `/user/download/csv/${pathVariable}`,
            requestBody,
            {
                headers: { 'Content-Type': 'application/json' },
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
        toaster.create({ description: 'Report downloaded', type: 'success' });
    } catch (error) {
        console.error(error?.message || 'Download error');
        setDownloading(false);
        toaster.create({ description: 'Download failed', type: 'error' });
    } finally {
        setDownloading(false);
    }
};
