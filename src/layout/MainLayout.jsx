import { Outlet } from 'react-router';
import SideBar from './SideBar';
import { Box, HStack, Stack } from '@chakra-ui/react';

const MainLayout = () => {
    return (
        <Box h={'full'} w={'full'}>
            <Stack direction={'row'} h={'full'}>
                <SideBar />
                <Box w={'full'} paddingRight={'2'}>
                    <Outlet />
                </Box>
            </Stack>
        </Box>
    );
};
export default MainLayout;
