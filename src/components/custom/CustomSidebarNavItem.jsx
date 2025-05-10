import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router';

const CustomSidebarNavItem = ({ text, icon }) => {
    return (
        <li>
            <NavLink to={`/${text}`}>
                <Box display={'flex'} alignContent={'center'} justifyContent={'center'} gap={'2'}>
                    <Icon size={'lg'}>{icon}</Icon>
                    <Text>{text.charAt(0).toUpperCase() + text.slice(1)}</Text>
                </Box>
            </NavLink>
        </li>
    );
};

export default CustomSidebarNavItem;
