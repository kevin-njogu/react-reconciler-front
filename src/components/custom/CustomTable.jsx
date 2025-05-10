import { manualReconcile } from '@/api/transactions';
import { Box, Table } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import CustomTableButton from './CustomTableButton';
import CustomPagination from './CustomPagination';

const CustomTable = ({ items, gateway }) => {
    const queryClient = useQueryClient();

    function handleManualReconcilition(id) {
        if (!id) {
            return;
        }
        const data = { trnId: id, gtw: gateway };
        manualReconcile(data, queryClient);
    }

    return (
        <Box w={'full'} display={'flex'} flexDirection={'column'} gap={'4'}>
            <Table.ScrollArea borderWidth="1px" rounded="md" height="350px">
                <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader>Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Narrative</Table.ColumnHeader>
                            <Table.ColumnHeader>Reference</Table.ColumnHeader>
                            <Table.ColumnHeader>Debit</Table.ColumnHeader>
                            <Table.ColumnHeader>Credit</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Action</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body fontSize="x-small">
                        {items?.content?.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item?.date}</Table.Cell>
                                <Table.Cell>{item?.narrative}</Table.Cell>
                                <Table.Cell>{item?.reference}</Table.Cell>
                                <Table.Cell>{item?.debit}</Table.Cell>
                                <Table.Cell>{item?.credit}</Table.Cell>
                                <Table.Cell>{item?.isReconciled}</Table.Cell>
                                <Table.Cell>
                                    {
                                        <CustomTableButton
                                            type="submit"
                                            color="#22c55e"
                                            hoverbg="#16a34a"
                                            hovercolor="#f0fdf4"
                                            text="Close"
                                            size={'sm'}
                                            id={item?.id}
                                            onclick={handleManualReconcilition}
                                        />
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>

            <CustomPagination items={items} />
        </Box>
    );
};

export default CustomTable;
