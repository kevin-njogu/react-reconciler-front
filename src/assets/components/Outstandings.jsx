import OutstandingsTable from '../shared/OutstandingsTable';
import Loader from '../shared/Loader';
import { useGetOutstanding } from '../api/transactions';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../shared/ErrorMessage';

const Outstandings = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm();

    const selectedGateway = watch('gateway');

    const { isPending, data, isError, error } = useGetOutstanding(selectedGateway);

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        console.error(error.message);
        return <ErrorMessage />;
    }

    if (!data) {
        return <ErrorMessage />;
    }

    if (data) {
        //console.log(data);
        return (
            <div className="flex flex-col gap-4 w-full">
                <div>
                    <h4 className="text-xl">Outstanding Items</h4>
                </div>

                <div className="text-sm">
                    <label htmlFor="gateway" className="topLabel">
                        Select Gateway
                    </label>
                    <select
                        className="select"
                        name="gateway"
                        id="gateway"
                        {...register('gateway', { required: true })}
                    >
                        <option defaultValue="choose a gateway">choose a gateway</option>
                        <option value={'equity'}>equity</option>
                        <option value={'equitywp'}>equitywp</option>
                    </select>
                    {errors.gateway && (
                        <p className="text-red-500 text-[8px]">Gateway is required</p>
                    )}
                </div>

                <div>
                    <OutstandingsTable data={data} gateway={selectedGateway} />
                </div>
            </div>
        );
    }
};
export default Outstandings;
