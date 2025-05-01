import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstace } from './axios';
import { useSelector } from 'react-redux';
import getCsrf from './csrf';

export const manualReconcile = async (data, setLoading, queryClient) => {
    const csrf = (await getCsrf()) || null;
    if (!csrf) {
        console.error('Manual reconcile error, csrf token cannot be null');
        return;
    }
    try {
        setLoading(true);
        const response = await axiosInstace.post(
            `/user/manual/reconcile/${data?.trnId}`,
            {},
            {
                params: { gateway: data?.gtw },
                headers: { 'X-XSRF-TOKEN': csrf },
            },
        );
        toast('Item closed', { type: 'success' });
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ['unreconciled'] });
        return response;
    } catch (error) {
        console.error(error?.message || 'Manual reconciliation error');
        toast('Failed to reconcile', { type: 'error' });
        setLoading(false);
    } finally {
        setLoading(false);
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
        toast('Failed to fetch data', { type: 'error' });
    }
};

export const useGetOutstanding = () => {
    const page = useSelector((state) => state.pagination.page);
    const gateway = useSelector((state) => state.outstanding.gateway);

    const { isPending, data, isError, error } = useQuery({
        queryFn: () => getOutstandings(page, gateway),
        queryKey: ['unreconciled', { page: page, gateway: gateway }],
        keepPreviousData: true,
    });

    return { isPending, data, isError, error };
};
