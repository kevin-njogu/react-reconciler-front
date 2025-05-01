import OutstandingsTable from './OutstandingsTable';
import Loader from '../shared/Loader';
import { useGetOutstanding } from '../../api/transactions';
import { useDispatch } from 'react-redux';
import { changeGateway } from '../../store/slices/outstandingSlice';

const Outstandings = () => {
    const dispatch = useDispatch();

    const { isPending, data, isError, error } = useGetOutstanding();

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        console.error(error.message);
        return <p>Error loading outstanding items</p>;
    }

    if (!data) {
        return <p>Could not find any outstanding items</p>;
    }

    function handleGatewayChange(selectedGateway) {
        // const selectedGateway = e.target.value;
        dispatch(changeGateway(selectedGateway));
    }
    //console.log(data);
    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <h4 className="text-xl">Outstanding Items</h4>
            </div>

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

            <div>{data && <OutstandingsTable data={data} />}</div>
        </div>
    );
};
export default Outstandings;
