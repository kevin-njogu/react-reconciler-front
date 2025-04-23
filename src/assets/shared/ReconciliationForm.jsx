import { useForm } from 'react-hook-form';
import { GoDownload } from 'react-icons/go';
import { FiRefreshCcw } from 'react-icons/fi';
import Loader from './Loader';
import { useReconciliation } from '../api/reconciliation';
import { useDownload } from '../api/download';
import { useDispatch } from 'react-redux';
import { changeGateway } from '../store/slices/reconDownloadSlice';

const ReconciliationForm = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const dispatch = useDispatch();

    const { isReconciling, systemReconcile } = useReconciliation();
    const { isDownloding, downloadCsv } = useDownload();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    function reconcile(data) {
        if (data) {
            dispatch(changeGateway(data));
        }
        systemReconcile();
        reset();
    }

    function download(data) {
        if (data) {
            dispatch(changeGateway(data));
        }
        downloadCsv();
        reset();
    }

    return (
        <div className="bg-gray-50 w-full p-3 rounded-md">
            <div>
                <h5 className="mb-2">Select Date & Gateway</h5>
            </div>
            <form className="flex flex-col gap-3">
                <div className="flex flex-row gap-4 w-full justify-between items-center bg-gray-50">
                    <div className="flex flex-col text-sm w-full">
                        <label htmlFor="gateway" className="topLabel">
                            Select Gateway
                        </label>
                        <select
                            className="select"
                            name="gateway"
                            id="gateway"
                            {...register('gateway', { required: true })}
                        >
                            <option value="" disabled>
                                Choose a gateway
                            </option>
                            <option value={'equity'}>equity</option>
                            <option value={'mpesa'}>mpesa</option>
                        </select>
                        {errors.gateway && (
                            <p className="text-red-500 text-[8px]">Gateway is required</p>
                        )}
                    </div>

                    <div className="flex items-center w-full justify-between gap-2">
                        <div className="flex flex-col text-sm w-full">
                            <label htmlFor="startdate" className="topLabel">
                                StartDate
                            </label>
                            <input
                                type="date"
                                name="startdate"
                                id="startdate"
                                max={formattedDate}
                                className="dateInput"
                                {...register('startdate', { required: true })}
                            />
                            {errors.startdate && (
                                <p className="text-red-500 text-[8px]">Date is required</p>
                            )}
                        </div>

                        <div className="flex flex-col w-full text-sm">
                            <label htmlFor="enddate" className="topLabel">
                                EndDate
                            </label>
                            <input
                                type="date"
                                name="enddate"
                                max={formattedDate}
                                className="dateInput"
                                {...register('enddate', { required: true })}
                            />
                            {errors.enddate && (
                                <p className="text-red-500 text-[8px]">Date is required</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-6">
                    <button
                        onClick={handleSubmit(reconcile)}
                        type="submit"
                        className="generalButton "
                        disabled={isReconciling}
                    >
                        <span>
                            <FiRefreshCcw />
                        </span>
                        <span>{isReconciling ? <Loader /> : 'Reconcile'}</span>
                    </button>

                    <button
                        onClick={handleSubmit(download)}
                        type="submit"
                        className="generalButton"
                        disabled={isDownloding}
                    >
                        <span>
                            <GoDownload />
                        </span>
                        <span>{isDownloding ? <Loader /> : 'Download CSV'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReconciliationForm;
