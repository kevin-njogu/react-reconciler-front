import { reconcileGateway } from '../../api/reconciliation';
import { downloadCsv } from '../../api/download';
import { useState } from 'react';
import { Box, createListCollection } from '@chakra-ui/react';
import CustomButton from '@/components/custom/CustomButton';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';

const gateways = createListCollection({
    items: [
        { label: 'Equity', value: 'equity' },
        { label: 'Mpesa', value: 'mpesa' },
    ],
});

const ReconciliationForm = () => {
    const [downloading, setDownloading] = useState(false);
    const [reconciling, setReconciling] = useState(false);

    const [gateway, setGateway] = useState('equity');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const data = { gateway: gateway, startdate: startDate, enddate: endDate };

    const reconcile = () => {
        //console.log(data);
        reconcileGateway(data, setReconciling);
    };

    const download = () => {
        //console.log(data);
        downloadCsv(data, setDownloading);
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
            <Box
                w={'full'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignContent={'center'}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignContent={'center'}
                    gap={'6'}
                >
                    <Box w={'full'}>
                        <CustomSelect
                            setGateway={setGateway}
                            text={'Select Gateway'}
                            collection={gateways}
                        />
                    </Box>

                    <Box w={'full'}>
                        <CustomDatePicker
                            setDate={setStartDate}
                            initialDate={startDate}
                            text={'Start Date'}
                        />
                    </Box>

                    <Box w={'full'}>
                        <CustomDatePicker
                            setDate={setEndDate}
                            initialDate={endDate}
                            text={'End Date'}
                        />
                    </Box>
                </Box>

                <Box display={'flex'} justifyContent={'start'} alignContent={'center'} gap={'6'}>
                    <CustomButton
                        type="submit"
                        color="#22c55e"
                        hoverbg="#16a34a"
                        hovercolor="#f0fdf4"
                        text="Reconcile"
                        loading={reconciling}
                        loadingtext="Reconciling..."
                        size={'md'}
                        onclick={reconcile}
                    />

                    <CustomButton
                        type="submit"
                        color="#22c55e"
                        hoverbg="#16a34a"
                        hovercolor="#f0fdf4"
                        text="Download"
                        loading={downloading}
                        loadingtext="Downloading..."
                        size={'md'}
                        onclick={download}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ReconciliationForm;
