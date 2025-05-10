import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { login } from '../api/authentication';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import CustomInput from '@/components/custom/CustomInput';
import CustomButton from '@/components/custom/CustomButton';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });

    const loginHandler = async (data) => {
        login(data, setLoading, navigate, dispatch);
        reset();
    };

    return (
        <Box
            h="100vh"
            w="100vw"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                shadow={'md'}
                padding="6"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
                width="30vw"
            >
                <VStack gap={'8'} w="100%">
                    <Heading>Login Here</Heading>
                    <form onSubmit={handleSubmit(loginHandler)} className="w-full">
                        <VStack gap={'4'} w="100%">
                            <CustomInput
                                label="Username"
                                type="text"
                                placeholder="username"
                                register={register}
                                errors={errors}
                                id="username"
                            />
                            <CustomInput
                                label="Password"
                                type="password"
                                placeholder="password"
                                register={register}
                                errors={errors}
                                id="password"
                            />
                            <CustomButton
                                type="submit"
                                color="#22c55e"
                                hoverbg="#16a34a"
                                hovercolor="#f0fdf4"
                                text="Login"
                                loading={loading}
                                loadingtext="Loading..."
                                size={'md'}
                            />
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Box>
    );
};

export default Login;
