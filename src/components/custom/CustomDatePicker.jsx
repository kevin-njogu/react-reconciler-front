import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ setDate, initialDate, text }) => {
    return (
        <Box spaceY={'1'}>
            <Text fontSize="14px" fontWeight="normal">
                {text}
            </Text>
            <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={initialDate}
                onChange={(date) => setDate(formatDate(date))}
                maxDate={new Date()}
                required
                className="px-2 py-[11px] w-[320px] border rounded-md text-xs focus:border focus:outline-none"
            />
        </Box>
    );
};

export default CustomDatePicker;

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
};
