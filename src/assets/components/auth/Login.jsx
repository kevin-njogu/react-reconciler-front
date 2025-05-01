import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router';
import InputField from '../shared/InputField';
import { login } from '../../api/authentication';
import Loader from '../shared/Loader';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-lg py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center lg:text-3xl text-2xl font-semibold">
                        Login here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black" />
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        register={register}
                        errors={errors}
                        message="*Username is required"
                        placeHolder="Enter username"
                    />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        register={register}
                        errors={errors}
                        message="*Password is required"
                        placeHolder="Enter password"
                    />
                </div>
                <div className="flex justify-center mt-5 mb-5">
                    <button disabled={loading} className="generalButton">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <span>Login</span>
                                <span>
                                    <AiOutlineLogin />
                                </span>
                            </>
                        )}
                    </button>
                </div>
                <p className="text-center text-sm">
                    Don't have an account?
                    <Link className="font-semibold underline hover:text-black" to={'/register'}>
                        <span>SignUp</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
