import { Button, Text } from '@chakra-ui/react';
import React from 'react';

const CustomTableButton = ({ type, color, hoverbg, hovercolor, text, size, onclick, id }) => {
    return (
        <Button
            type={type}
            size={size}
            backgroundColor={color}
            paddingX={'6'}
            paddingY={'-2'}
            variant={'solid'}
            _hover={{ backgroundColor: hoverbg, color: hovercolor }}
            mt={'2'}
            onClick={() => onclick(id)}
        >
            {text}
        </Button>
    );
};

export default CustomTableButton;
