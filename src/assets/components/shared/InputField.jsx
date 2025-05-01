const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    placeHolder,
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                htmlFor="id"
                className={`${className ? className : ''} font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeHolder}
                className={`${
                    className ? className : ''
                } px-2 py-2 bg-transparent border outline-none rounded-md ${
                    errors[id]?.message ? 'border-red-500' : 'border-slate-700'
                }`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: `Minimun ${min} characters required` }
                        : null,
                    pattern:
                        type === 'email'
                            ? { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                            : null,
                })}
            />
            {errors[id]?.message && (
                <p className="text-[8px] font-semibold mt-0 text-red-600">{errors[id]?.message}</p>
            )}
        </div>
    );
};

export default InputField;
