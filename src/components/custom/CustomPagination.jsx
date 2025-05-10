import React from 'react';
import { next, previous } from '../../store/paginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

const CustomPagination = ({ items }) => {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.pagination.page);

    const totalElements = items?.totalElements;
    const lastPage = items?.lastPage;
    const totalPages = items?.totalPages - 1;

    function handlePreviousPage() {
        if (page > 0) {
            dispatch(previous());
        }
    }

    function handleNextPage() {
        if (!lastPage) {
            dispatch(next());
        }
    }

    return (
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Box>
                    <Text fontSize={'sm'}>
                        Showing {page} of {totalPages} pages with {totalElements} transactions
                    </Text>
                </Box>
            </Box>
            <Box as={'ul'} listStyleType={'none'} display={'flex'}>
                <li>
                    <button className="paginationButton rounded-s-lg" onClick={handlePreviousPage}>
                        Previous
                    </button>
                </li>
                <li>
                    <p className="paginationButton">{page}</p>
                </li>
                <li>
                    <button className="paginationButton" onClick={handleNextPage}>
                        Next
                    </button>
                </li>
            </Box>
        </Box>
    );
};

export default CustomPagination;
