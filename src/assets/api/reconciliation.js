import { toast } from 'react-toastify';
import { axiosInstace } from './axios';
import getCsrf from './csrf';

export const reconcileGateway = async (data, setReconciling) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    const csrf = (await getCsrf()) || null;
    if (!pathVariable || !requestBody) {
        console.error('Reconciloation error, pathvariable and request body cannot be null');
        return;
    }
    if (!csrf) {
        console.error('Reconciloation error, csrf token cannot be null');
        return;
    }
    try {
        setReconciling(true);
        const response = await axiosInstace.post(`/user/reconcile/${pathVariable}`, requestBody, {
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrf },
        });
        toast('Reconciliation completed', { type: 'success' });
        setReconciling(false);
        return response;
    } catch (error) {
        console.error(error?.message || 'Reconciliation error');
        setReconciling(false);
        toast('Reconciliation failed', { type: 'error' });
    } finally {
        setReconciling(false);
    }
};
