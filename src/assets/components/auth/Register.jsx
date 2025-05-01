import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../api/authentication';
import { FaRegUser } from 'react-icons/fa';
import InputField from '../shared/InputField';
import { Link, useNavigate } from 'react-router';
import Loader from '../shared/Loader';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onTouched' });

    const registerHandler = async (data) => {
        signup(data, navigate, setLoading);
        reset();
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-lg py-8 sm:px-8 px-4 rounded-md"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <FaRegUser className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center lg:text-3xl text-2xl font-semibold">
                        Register here
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        register={register}
                        errors={errors}
                        message="*Email is required"
                        placeHolder="Enter valid email"
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
                                <span>Register</span>
                                <span>
                                    <FaRegUser />
                                </span>
                            </>
                        )}
                    </button>
                </div>
                <p className="text-center text-sm">
                    Already have an account?
                    <Link className="font-semibold underline hover:text-black" to={'/login'}>
                        <span>SignIn</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
