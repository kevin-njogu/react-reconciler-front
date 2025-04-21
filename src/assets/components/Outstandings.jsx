import OutstandingsTable from '../shared/OutstandingsTable';
import Loader from '../shared/Loader';
import { useGetOutstanding } from '../api/transactions';

const Outstandings = () => {
    const { isPending, data, isError, error } = useGetOutstanding();

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        console.error(error.message);
        return (
            <div>
                <p>Error Loading data..</p>
            </div>
        );
    }

    if (data) {
        //console.log(data);
        return (
            <div className="flex flex-col gap-4 w-full">
                <div>
                    <h4 className="text-xl">Outstanding Items</h4>
                </div>
                <div>
                    <OutstandingsTable data={data} />
                </div>
            </div>
        );
    }
};
export default Outstandings;
