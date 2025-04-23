import OutstandingsTable from '../shared/OutstandingsTable';
import Loader from '../shared/Loader';
import { useGetOutstanding } from '../api/transactions';
import ErrorMessage from '../shared/ErrorMessage';
import { useDispatch } from 'react-redux';
import { changeGateway } from '../store/slices/outstandingSlice';

const Outstandings = () => {
    const dispatch = useDispatch();

    const { isPending, data, isError, error } = useGetOutstanding();

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        console.error(error.message);
        return <Loader />;
    }

    if (!data) {
        return <Loader />;
    }

    function handleGatewayChange(selectedGateway) {
        // const selectedGateway = e.target.value;
        dispatch(changeGateway(selectedGateway));
    }

    if (data) {
        //console.log(data);
        return (
            <div className="flex flex-col gap-4 w-full">
                <div>
                    <h4 className="text-xl">Outstanding Items</h4>
                </div>

                {/* <div className="text-sm">
                    <label htmlFor="gateway" className="topLabel">
                        Select Gateway
                    </label>

                    <select
                        className="select"
                        name="gateway"
                        id="gateway"
                        onChange={(e) => handleGatewayChange(e)}
                    >
                        <option value="" disabled>
                            choose a gateway
                        </option>
                        <option value={'equity'}>equity</option>
                        <option value={'equitywp'}>equitywp</option>
                        <option value={'mpesa'}>mpesa</option>
                        <option value={'mpesawp'}>mpesawp</option>
                    </select>
                </div> */}

                <div className="space-x-2">
                    {['equity', 'equitywp', 'mpesa', 'mpesawp'].map((btn, idx) => {
                        return (
                            <button
                                key={idx}
                                type="button"
                                className="outstandingsButton"
                                onClick={() => handleGatewayChange(btn)}
                            >
                                {btn}
                            </button>
                        );
                    })}
                </div>

                <div>
                    <OutstandingsTable data={data} />
                </div>
            </div>
        );
    }
};
export default Outstandings;
