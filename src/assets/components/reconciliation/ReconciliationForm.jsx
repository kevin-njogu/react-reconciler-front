import { useForm } from 'react-hook-form';
import { GoDownload } from 'react-icons/go';
import { FiRefreshCcw } from 'react-icons/fi';
import Loader from '../shared/Loader';
import { reconcileGateway } from '../../api/reconciliation';
import { downloadCsv } from '../../api/download';
import { useState } from 'react';

const ReconciliationForm = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [downloading, setDownloading] = useState(false);
    const [reconciling, setReconciling] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const reconcile = (data) => {
        if (data) {
            reconcileGateway(data, setReconciling);
        }
        reset();
    };

    const download = (data) => {
        if (data) {
            downloadCsv(data, setDownloading);
        }
        reset();
    };

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
                        disabled={reconciling}
                    >
                        <span>
                            <FiRefreshCcw />
                        </span>
                        <span>{reconciling ? <Loader /> : 'Reconcile'}</span>
                    </button>

                    <button
                        onClick={handleSubmit(download)}
                        type="submit"
                        className="generalButton"
                        disabled={downloading}
                    >
                        <span>
                            <GoDownload />
                        </span>
                        <span>{downloading ? <Loader /> : 'Download CSV'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReconciliationForm;
