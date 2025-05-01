import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Loader from '../shared/Loader';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { upload } from '@/assets/api/upload';
import Button from '../shared/Button';

const UploadForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    function handleUpload(data) {
        if (data) {
            const file = data?.fileupload[0];
            const fileName = file?.name.split('.')[1];
            if (fileName !== 'csv') {
                toast('Invalid file format', { type: 'error' });
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            upload(formData, setLoading);
        }
        reset();
    }

    return (
        <div className="bg-gray-50 w-full p-3 rounded-md">
            <div>
                <h5 className="mb-2">Upload Files</h5>
            </div>
            <form onSubmit={handleSubmit(handleUpload)}>
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <label
                        htmlFor="fileupload"
                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <span>
                                <IoCloudUploadOutline className="text-4xl" />
                            </span>
                            <p className="mb-2 text-sm text-gray-500 ">
                                <span className="font-semibold">Click to upload</span>
                            </p>
                            <p className="text-xs text-gray-500">CSV (MAX.100MB)</p>
                        </div>
                        <input
                            type="file"
                            id="fileupload"
                            className="hidden"
                            {...register('fileupload', { required: true })}
                        />
                    </label>
                    {errors?.fileupload && (
                        <p className="text-red-500 text-[8px]">Invalid file type</p>
                    )}
                </div>

                <div className="flex justify-center items-center w-full mt-2">
                    <Button
                        type="submit"
                        classname="generalButton"
                        disabled={loading}
                        loader={<Loader />}
                        loading={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
