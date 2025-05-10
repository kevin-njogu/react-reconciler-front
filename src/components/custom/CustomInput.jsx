import { Field, Input, Text } from '@chakra-ui/react';
import React from 'react';

const CustomInput = ({ label, type, placeholder, register, id, errors }) => {
    return (
        <Field.Root required>
            <Field.Label>
                <Text>{label}</Text> <Field.RequiredIndicator />
            </Field.Label>
            <Input
                placeholder={placeholder}
                variant="outline"
                borderColor={'gray.800'}
                size={'xs'}
                fontSize={'xs'}
                borderWidth={'1px'}
                paddingX={'2'}
                width={'full'}
                type={type}
                {...register(id, { required: true })}
            />
            <Field.ErrorText>{errors[id]?.message}</Field.ErrorText>
        </Field.Root>
    );
};

export default CustomInput;
