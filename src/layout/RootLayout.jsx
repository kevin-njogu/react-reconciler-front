import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <Box w={'full'} h={'100vh'} p={'0.5'}>
            <Outlet />
        </Box>
    );
};

export default RootLayout;
