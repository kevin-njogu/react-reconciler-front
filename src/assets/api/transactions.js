import { usePaginationContext } from '@/assets/context/Pagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstace } from './axios';

const manualReconcile = async (data) => {
    let selectedGateway;

    if (data?.gtw === 'choose a gateway') {
        throw new Error('Choose a gateway');
    } else {
        selectedGateway = data?.gtw;
    }

    //console.log(selectedGateway);
    try {
        const response = await axiosInstace.post(
            `/user/manual/reconcile/${data?.trnId}`,
            {},
            {
                params: { gateway: selectedGateway },
            },
        );
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const useManualReconcile = () => {
    const queryClient = useQueryClient();
    const { isPending, mutate: reconcile } = useMutation({
        mutationFn: (data) => manualReconcile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['unreconciled'] });
            toast('Item closed', { type: 'success' });
        },
        onError: (error) => {
            console.error(error.message);
            toast(error.message, { type: 'error' });
        },
    });
    return { isPending, reconcile };
};

const getOutstandings = async (page, gateway) => {
    let selectedGateway;
    if (gateway === 'choose a gateway') {
        selectedGateway = 'equity';
    } else {
        selectedGateway = gateway;
    }
    try {
        const response = await axiosInstace.get('/user/outstanding/all', {
            params: { pageNumber: page, gateway: selectedGateway },
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const useGetOutstanding = (gateway) => {
    const { page } = usePaginationContext();
    const { isPending, data, isError, error } = useQuery({
        queryFn: () => getOutstandings(page, gateway),
        queryKey: ['unreconciled', { page: page, gateway: gateway }],
    });

    return { isPending, data, isError, error };
};
