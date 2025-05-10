import { useQuery } from '@tanstack/react-query';
import { axiosInstace } from './axios';
import { useSelector } from 'react-redux';
import { toaster } from '@/components/ui/toaster';

export const manualReconcile = async (data, queryClient) => {
    try {
        const response = await axiosInstace.post(
            `/user/manual/reconcile/${data?.trnId}`,
            {},
            {
                params: { gateway: data?.gtw },
            },
        );
        toaster.create({ description: 'Reconciliation completed', type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['unreconciled'] });
        return response;
    } catch (error) {
        console.error(error?.message || 'Manual reconciliation error');
        toaster.create({ description: 'Reconciliation failed', type: 'error' });
    }
};

const getOutstandings = async (page, gateway) => {
    if (page === null || page === undefined || !gateway) {
        console.error('Get outstanding error, page and gateway cannot be null');
        return;
    }
    try {
        const response = await axiosInstace.get(
            `/user/outstanding/all?pageNumber=${page}&gateway=${gateway}`,
        );
        return response?.data;
    } catch (error) {
        console.log(error?.message || 'Error geting outstanding items');
        toaster.create({ description: 'No data found', type: 'error' });
    }
};

export const useGetOutstanding = (gateway) => {
    const page = useSelector((state) => state.pagination.page);
    // const gateway = useSelector((state) => state.outstanding.gateway);

    const { isPending, data, isError, error } = useQuery({
        queryFn: () => getOutstandings(page, gateway),
        queryKey: ['unreconciled', { page: page, gateway: gateway }],
        keepPreviousData: true,
    });

    return { isPending, data, isError, error };
};
