import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';

const CustomAvatar = ({ username }) => {
    return (
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
            <Avatar.Root variant={'solid'}>
                <Avatar.Fallback name={username} />
            </Avatar.Root>
        </Box>
    );
};

export default CustomAvatar;
