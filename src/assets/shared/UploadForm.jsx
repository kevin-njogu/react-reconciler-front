import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Loader from './Loader';
import { useUpload } from '../api/upload';
import { toast } from 'react-toastify';

const UploadForm = () => {
    const { isUploading, uploadFile } = useUpload();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    function handleUpload(data) {
        const file = data?.fileupload[0];
        const fileName = file?.name.split('.')[1];
        //console.log(fileName);
        //console.log(file);
        if (fileName !== 'csv') {
            toast('Invalid file format', { type: 'error' });
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData);
        reset();
    }

    return (
        <div className="bg-gray-50 w-full p-3 rounded-md">
            <div>
                <h5 className="mb-2">Upload Files</h5>
            </div>
            <form
                // className="flex flex-col py-2 px-4 gap-5 border border-dashed border-gray-600 rounded-md"
                onSubmit={handleSubmit(handleUpload)}
            >
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <label
                        htmlFor="fileupload"
                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <span>
                                <IoCloudUploadOutline className="text-4xl" />
                            </span>
                            <p class="mb-2 text-sm text-gray-500 ">
                                <span class="font-semibold">Click to upload</span>
                            </p>
                            <p class="text-xs text-gray-500">CSV (MAX.100MB)</p>
                        </div>
                        <input
                            type="file"
                            name="fileupload"
                            id="fileupload"
                            className="hidden"
                            {...register('fileupload', { required: true })}
                        />
                    </label>
                    {errors.fileupload && (
                        <p className="text-red-500 text-[8px]">Invalid file type</p>
                    )}
                </div>

                <div className="flex justify-center items-center w-full mt-2">
                    <button type="submit" className="generalButton" disabled={isUploading}>
                        {isUploading ? <Loader /> : 'Upload Statement'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
