import { usePaginationContext } from '@/assets/context/Pagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const manualReconcile = async id => {
    try {
        const response = await axios.post(`http://localhost:8080/api/user/manual/reconcile/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const useManualReconcile = () => {
    const queryClient = useQueryClient();
    const { isPending, mutate: reconcile } = useMutation({
        mutationFn: id => manualReconcile(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['unreconciled'] });
            toast('Item closed', { type: 'success' });
        },
        onError: error => {
            console.error(error.message);
            toast('Failed to reconcile', { type: 'error' });
        },
    });
    return { isPending, reconcile };
};

const getOutstandings = async page => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/outstanding/all', {
            params: { pageNumber: page },
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const useGetOutstanding = () => {
    const { page } = usePaginationContext();
    const { isPending, data, isError, error } = useQuery({
        queryFn: () => getOutstandings(page),
        queryKey: ['unreconciled', { page: page }],
    });

    return { isPending, data, isError, error };
};
