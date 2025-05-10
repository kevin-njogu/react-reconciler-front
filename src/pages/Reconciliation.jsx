import ReconciliationForm from '../components/custom/ReconciliationForm';
import UploadForm from '../components/custom/UploadForm';
import { Box, Heading } from '@chakra-ui/react';

const Reconciliation = () => {
    return (
        <Box
            w={'full'}
            h={'full'}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            flexDirection={'column'}
            gap={'4'}
        >
            <Box>
                <Heading size="md" as="h2">
                    Reconciliation Dashboard
                </Heading>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignContent={'center'}
                flexDirection={'column'}
                gap={'3'}
                w={'full'}
            >
                <UploadForm />
                <ReconciliationForm />
            </Box>
        </Box>
    );
};

export default Reconciliation;
