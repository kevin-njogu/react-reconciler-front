import { axiosInstace } from './axios';
import { toaster } from '@/components/ui/toaster';

export const reconcileGateway = async (data, setReconciling) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    if (!pathVariable || !requestBody) {
        console.error('Reconciloation error, pathvariable and request body cannot be null');
        toaster.create({ description: 'Reconciliation failed', type: 'error' });
        return;
    }
    try {
        setReconciling(true);
        const response = await axiosInstace.post(`/user/reconcile/${pathVariable}`, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });
        toaster.create({ description: 'Reconciliation completed', type: 'success' });
        setReconciling(false);
        return response;
    } catch (error) {
        console.error(error?.message || 'Reconciliation error');
        setReconciling(false);
        toaster.create({ description: 'Reconciliation failed', type: 'error' });
    } finally {
        setReconciling(false);
    }
};
