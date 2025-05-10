import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { upload } from '@/api/upload';
import { Box, FileUpload, Heading, Icon } from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import CustomButton from '@/components/custom/CustomButton';
import { toaster } from '@/components/ui/toaster';

const UploadForm = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, reset } = useForm();

    function handleUpload(data) {
        const file = data?.files?.acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        upload(formData, setLoading);
        reset();
    }

    const handleReject = () => {
        toaster.create({ description: 'File rejected', type: 'error' });
    };

    return (
        <Box
            w={'full'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignContent={'start'}
            gap={'2'}
            backgroundColor={'gray.100'}
            padding="3"
        >
            <Box w={'full'}>
                <form onSubmit={handleSubmit(handleUpload)}>
                    <Controller
                        name="files"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                            <FileUpload.Root
                                value={value}
                                accept={['text/csv', '.csv']}
                                onFileChange={onChange}
                                onFileReject={handleReject}
                                required
                                w="4/5"
                                maxW="4/5"
                                maxFiles={1}
                                alignItems={'stretch'}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Dropzone>
                                    <Icon size="md" color="fg.muted">
                                        <LuUpload />
                                    </Icon>
                                    <FileUpload.DropzoneContent>
                                        <Box>Drag and drop files here</Box>
                                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                                    </FileUpload.DropzoneContent>
                                </FileUpload.Dropzone>
                                {/* <FileUpload.List /> */}
                            </FileUpload.Root>
                        )}
                    />

                    <CustomButton
                        type="submit"
                        color="#22c55e"
                        hoverbg="#16a34a"
                        hovercolor="#f0fdf4"
                        text="Upload Statements"
                        loading={loading}
                        loadingtext="Uploading..."
                        size={'md'}
                    />
                </form>
            </Box>
        </Box>
    );
};

export default UploadForm;
