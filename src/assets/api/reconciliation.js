import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const reconcile = async (data) => {
    const pathVariable = data?.gateway;
    const requestBody = { startDate: data?.startdate, endDate: data?.enddate };
    if (!pathVariable || !requestBody) {
        toast('Reconciliation failed', { type: 'error' });
    }
    //console.log(data);
    try {
        const response = await axios.post(
            `http://localhost:8080/api/user/reconcile/${pathVariable}`,
            requestBody,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return response?.data;
    } catch (error) {
        console.error('Upload error', error);
    }
};

export const useReconciliation = () => {
    const { isPending: isReconciling, mutate: systemReconcile } = useMutation({
        mutationFn: (data) => reconcile(data),
        onSuccess: (data) => {
            toast(data?.message, { type: 'success' });
        },
        onError: (error) => {
            console.error(error.message);
            toast('Reconciliation request failed', { type: 'error' });
        },
    });
    return { isReconciling, systemReconcile };
};
