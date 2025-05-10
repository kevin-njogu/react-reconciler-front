import { NavLink, useNavigate } from 'react-router';
import { HiRefresh } from 'react-icons/hi';
import { LuTimerReset } from 'react-icons/lu';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { TbLogout } from 'react-icons/tb';
import { logout } from '../api/authentication';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import CustomAvatar from '@/components/custom/CustomAvatar';
import CustomSidebarNavItem from '@/components/custom/CustomSidebarNavItem';
import { FaPowerOff } from 'react-icons/fa';
import CustomIconButton from '@/components/custom/CustomIconButton';

const SideBar = () => {
    const user = useSelector((state) => state.authentication.user);
    const userName = user?.username;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout(navigate, dispatch);
    };

    return (
        <Box
            h={'full'}
            backgroundColor={'#fafafa'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignContent={'center'}
            paddingY={'3'}
            paddingX={'6'}
            gap={'8'}
        >
            <CustomAvatar username={userName} />

            <Box
                as={'ul'}
                listStyleType={'none'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignContent={'center'}
                gap={'6'}
            >
                <CustomSidebarNavItem text={'reconciliation'} icon={<HiRefresh />} />
                <CustomSidebarNavItem text={'outstandings'} icon={<LuTimerReset />} />
            </Box>

            <Box flexDirection={'column'} justifyContent={'center'} alignContent={'center'}>
                <CustomIconButton
                    handleLogout={handleLogout}
                    icon={<FaPowerOff />}
                    text={'Logout'}
                    color={'red.500'}
                />
            </Box>
        </Box>
    );
};

export default SideBar;
