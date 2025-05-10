import { Button, Text } from '@chakra-ui/react';
import React from 'react';

const CustomButton = ({
    type,
    color,
    hoverbg,
    hovercolor,
    text,
    loading,
    loadingtext,
    size,
    onclick,
}) => {
    return (
        <Button
            type={type}
            size={size}
            backgroundColor={color}
            paddingX={'8'}
            paddingY={'2'}
            variant={'solid'}
            _hover={{ backgroundColor: hoverbg, color: hovercolor }}
            mt={'2'}
            loading={loading}
            loadingText={loadingtext}
            onClick={onclick}
        >
            <Text>{text}</Text>
        </Button>
    );
};

export default CustomButton;
