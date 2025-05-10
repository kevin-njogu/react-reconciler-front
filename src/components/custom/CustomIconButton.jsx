import { Button, Icon, Text } from '@chakra-ui/react';
import React from 'react';

const CustomIconButton = ({ handleLogout, icon, text, color }) => {
    return (
        <Button onClick={handleLogout}>
            <Icon color={color}>{icon}</Icon> <Text>{text}</Text>
        </Button>
    );
};

export default CustomIconButton;
