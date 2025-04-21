import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { toast, Zoom } from 'react-toastify';
import { useState } from 'react';
import Loader from './Loader';

const UploadForm = () => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const upload = async data => {
        const file = data?.fileupload[0];
        const fileName = file?.name.split('.')[1];
        if (fileName !== 'csv') {
            reset();
            toast('Invalid file format', { type: 'error' });
            return;
        }
        setFileName(file?.name);
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8080/api/user/upload/statement',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            // console.log("Upload successful", response?.data)
            toast(response?.data?.message, { type: 'success' });
            setLoading(false);
        } catch (error) {
            // console.error("Upload error", error)
            toast('Upload error ' + error.message, { type: 'error' });
            setLoading(false);
        } finally {
            setLoading(false);
        }
        reset();
    };

    return (
        <div className="bg-gray-50 w-full p-3 rounded-md">
            <div>
                <h5 className="mb-4">Upload Files</h5>
            </div>
            <form
                className="flex flex-col py-2 px-4 gap-5 border border-dashed border-gray-600 rounded-md"
                onSubmit={handleSubmit(upload)}
            >
                <div className="flex flex-col gap-1 justify-center items-center">
                    <input
                        type="file"
                        name="fileupload"
                        id="fileupload"
                        className="hidden"
                        {...register('fileupload', { required: true })}
                    />
                    <p className={`${fileName ? 'block' : 'hidden'} text-green-500`}>{fileName}</p>
                    <label htmlFor="fileupload" className="cursor-pointer">
                        <span>
                            <IoCloudUploadOutline className="text-4xl ml-10" />
                        </span>
                        <span>Click to upload</span>
                    </label>
                    {errors.fileupload && (
                        <p className="text-red-500 text-[8px]">Invalid file type</p>
                    )}
                </div>

                <div className="flex justify-center items-center">
                    <button type="submit" className="generalButton" disabled={loading}>
                        {loading ? <Loader /> : 'Upload Statement'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
