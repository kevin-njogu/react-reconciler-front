import Loader from '../components/custom/Loader';
import { useGetOutstanding } from '../api/transactions';
import { Box, createListCollection, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CustomSelect from '@/components/custom/CustomSelect';
import CustomTable from '@/components/custom/CustomTable';

const gateways = createListCollection({
    items: [
        { label: 'Equity', value: 'equity' },
        { label: 'Mpesa', value: 'mpesa' },
        { label: 'Mpesa Workpay', value: 'mpesawp' },
        { label: 'Equity Workpay', value: 'equitywp' },
    ],
});

const Outstandings = () => {
    const [gateway, setGateway] = useState('equity');
    //const [loading, setLoading] = useState(false);

    const { isPending, data, isError, error } = useGetOutstanding(gateway);

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        console.error(error.message);
    }

    return (
        <Box
            w={'full'}
            h={'full'}
            display={'flex'}
            justifyContent={'start'}
            alignContent={'center'}
            flexDirection={'column'}
            gap={'4'}
        >
            <Box>
                <Heading size="md" as="h2">
                    Outstanding Items
                </Heading>
            </Box>

            <Box w={'full'}>
                <CustomSelect setGateway={setGateway} collection={gateways} />
            </Box>

            <Box w="80vw">
                {data ? (
                    <Box w="full">{<CustomTable items={data} gateway={gateway} />}</Box>
                ) : (
                    <Text>Error loading data</Text>
                )}
            </Box>
        </Box>
    );
};
export default Outstandings;
